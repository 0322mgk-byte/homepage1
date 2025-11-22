'use client';

import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-10 px-4 bg-background border-t border-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-white font-bold">AI</span>
          <span className="text-accent font-bold">MONEY</span>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-6 mb-6">
          <a
            href="#"
            className="text-sm text-text-secondary hover:text-white transition-colors"
          >
            이용약관
          </a>
          <a
            href="#"
            className="text-sm text-text-secondary hover:text-white transition-colors"
          >
            개인정보처리방침
          </a>
        </div>

        {/* Company Info */}
        <div className="text-center text-xs text-text-secondary space-y-1">
          <p>주식회사 에이아이머니 | 대표: 홍길동</p>
          <p>사업자등록번호: 123-45-67890</p>
          <p className="pt-2">© 2024 AI MONEY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
