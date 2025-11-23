"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkles, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(error ? "로그인에 실패했습니다." : "");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setErrorMessage(result.error);
      setIsLoading(false);
    } else {
      router.push(callbackUrl);
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl });
  };

  return (
    <div className="w-full max-w-md">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">로그인</h1>
          <p className="text-gray-400">계정에 로그인하세요</p>
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
            Google로 계속하기
          </button>
          <button
            onClick={() => handleSocialLogin("kakao")}
            className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#FDD800] text-gray-900 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <Image src="/kakao.svg" alt="Kakao" width={20} height={20} />
            카카오로 계속하기
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

        {/* Email Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
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
                placeholder="••••••••"
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white font-medium py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="text-primary hover:text-primary/80 font-medium">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}

function LoginFormFallback() {
  return (
    <div className="w-full max-w-md">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl animate-pulse">
        <div className="text-center mb-8">
          <div className="h-8 bg-white/10 rounded w-32 mx-auto mb-2" />
          <div className="h-4 bg-white/10 rounded w-48 mx-auto" />
        </div>
        <div className="space-y-4">
          <div className="h-12 bg-white/10 rounded" />
          <div className="h-12 bg-white/10 rounded" />
          <div className="h-12 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
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

      {/* Login Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
