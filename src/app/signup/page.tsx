"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error);
        setIsLoading(false);
        return;
      }

      // 회원가입 성공 후 자동 로그인
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage("회원가입은 완료되었으나 로그인에 실패했습니다. 로그인 페이지로 이동해주세요.");
        setIsLoading(false);
      } else {
        router.push("/");
      }
    } catch {
      setErrorMessage("회원가입 중 오류가 발생했습니다.");
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <Sparkles className="w-6 h-6 text-accent" />
              <span className="text-white">AI</span>
              <span className="text-accent">MONEY</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Signup Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">회원가입</h1>
              <p className="text-gray-400">새 계정을 만들어주세요</p>
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {errorMessage}
              </div>
            )}

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialLogin("google")}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                Google로 시작하기
              </button>
              <button
                onClick={() => handleSocialLogin("kakao")}
                className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#FDD800] text-gray-900 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <Image src="/kakao.svg" alt="Kakao" width={20} height={20} />
                카카오로 시작하기
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-gray-500">또는</span>
              </div>
            </div>

            {/* Email Signup Form */}
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  이름
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  이메일
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  비밀번호
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="6자 이상"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  비밀번호 확인
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="비밀번호 재입력"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white font-medium py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "가입 중..." : "회원가입"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-400 text-sm">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
