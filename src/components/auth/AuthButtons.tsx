"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import UserDropdown from "./UserDropdown";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center space-x-4">
        <div className="w-16 h-8 bg-white/10 rounded animate-pulse" />
      </div>
    );
  }

  if (session?.user) {
    return <UserDropdown user={session.user} />;
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/login"
        className="text-gray-300 hover:text-white font-medium transition-colors"
      >
        로그인
      </Link>
      <Link
        href="/signup"
        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-medium px-4 py-2 rounded-lg transition-all shadow-sm"
      >
        회원가입
      </Link>
    </div>
  );
}
