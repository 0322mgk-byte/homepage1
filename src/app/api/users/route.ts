import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, where, doc, setDoc } from 'firebase/firestore';

// 사용자 데이터 타입
export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLoginAt?: string;
}

// GET: 사용자 목록 조회 (관리자 전용)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    // Firebase에서 사용자 데이터 조회
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as User[];

    return NextResponse.json({ users });
  } catch (error) {
    console.error('사용자 조회 오류:', error);
    return NextResponse.json({ error: '사용자 조회에 실패했습니다.' }, { status: 500 });
  }
}

// POST: 새 사용자 생성 (로그인 시 자동 생성)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, image } = body;

    if (!email) {
      return NextResponse.json({ error: '이메일이 필요합니다.' }, { status: 400 });
    }

    // 이미 존재하는 사용자인지 확인
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // 기존 사용자: 마지막 로그인 시간 업데이트
      const existingUser = snapshot.docs[0];
      const userRef = doc(db, 'users', existingUser.id);
      await setDoc(userRef, {
        ...existingUser.data(),
        lastLoginAt: new Date().toISOString(),
      }, { merge: true });

      return NextResponse.json({
        success: true,
        user: { id: existingUser.id, ...existingUser.data() },
        isNew: false,
      });
    }

    // 새 사용자 생성
    const newUser: Omit<User, 'id'> = {
      email,
      name: name || '사용자',
      image,
      role: 'user',
      status: 'active',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'users'), newUser);

    return NextResponse.json({
      success: true,
      user: { id: docRef.id, ...newUser },
      isNew: true,
    });
  } catch (error) {
    console.error('사용자 생성 오류:', error);
    return NextResponse.json({ error: '사용자 생성에 실패했습니다.' }, { status: 500 });
  }
}
