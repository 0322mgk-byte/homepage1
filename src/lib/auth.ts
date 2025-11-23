import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { adminAuth } from "@/lib/firebase-admin";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // Kakao Provider
    {
      id: "kakao",
      name: "Kakao",
      type: "oauth",
      authorization: {
        url: "https://kauth.kakao.com/oauth/authorize",
        params: { scope: "profile_nickname profile_image account_email" },
      },
      token: "https://kauth.kakao.com/oauth/token",
      userinfo: "https://kapi.kakao.com/v2/user/me",
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: String(profile.id),
          name: profile.kakao_account?.profile?.nickname,
          email: profile.kakao_account?.email,
          image: profile.kakao_account?.profile?.profile_image_url,
        };
      },
    },
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요.");
        }

        // Firebase에서 사용자 확인
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", credentials.email));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data();
          // 비밀번호 확인 (실제 프로덕션에서는 해시 비교 필요)
          if (userData.password === credentials.password) {
            return {
              id: snapshot.docs[0].id,
              email: userData.email,
              name: userData.name,
              image: userData.image,
            };
          }
        }

        throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      // OAuth 로그인 시 Firebase에 사용자 정보 저장/업데이트
      if (account?.provider === "google" || account?.provider === "kakao") {
        try {
          // 1. Firebase Authentication에 사용자 저장/업데이트
          if (user.email) {
            try {
              // 기존 사용자 확인
              await adminAuth.getUserByEmail(user.email);
              // 기존 사용자면 정보 업데이트
              await adminAuth.updateUser(user.id, {
                displayName: user.name || undefined,
                photoURL: user.image || undefined,
              });
              console.log("Firebase Auth 사용자 업데이트 완료:", user.email);
            } catch (authError: unknown) {
              // 사용자가 없으면 새로 생성
              const error = authError as { code?: string };
              if (error.code === "auth/user-not-found") {
                await adminAuth.createUser({
                  email: user.email,
                  displayName: user.name || "사용자",
                  photoURL: user.image || undefined,
                  emailVerified: true, // OAuth 로그인이므로 이메일 인증됨
                });
                console.log("Firebase Auth 새 사용자 생성 완료:", user.email);
              } else {
                console.error("Firebase Auth 오류:", authError);
              }
            }
          }

          // 2. Firestore에 사용자 정보 저장/업데이트
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("email", "==", user.email));
          const snapshot = await getDocs(q);

          if (snapshot.empty) {
            // 새 사용자 생성
            await addDoc(usersRef, {
              email: user.email,
              name: user.name || "사용자",
              image: user.image,
              role: "user",
              status: "active",
              provider: account.provider,
              createdAt: new Date().toISOString(),
              lastLoginAt: new Date().toISOString(),
            });
          } else {
            // 기존 사용자: 마지막 로그인 시간 업데이트
            const userDoc = doc(db, "users", snapshot.docs[0].id);
            await updateDoc(userDoc, {
              lastLoginAt: new Date().toISOString(),
              image: user.image, // 프로필 이미지 업데이트
            });
          }
        } catch (error) {
          console.error("Firebase 사용자 저장 오류:", error);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

// 회원가입 함수 (API에서 사용) - Firebase 연동
export async function registerUser(email: string, password: string, name: string) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    throw new Error("이미 등록된 이메일입니다.");
  }

  const newUser = {
    email,
    password, // 실제 프로덕션에서는 해시 처리 필요
    name,
    role: "user" as const,
    status: "active" as const,
    provider: "credentials",
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };

  const docRef = await addDoc(usersRef, newUser);
  return { id: docRef.id, email: newUser.email, name: newUser.name };
}
