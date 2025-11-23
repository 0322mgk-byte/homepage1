'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { Sparkles, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthButtons from '../auth/AuthButtons';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: '홈' },
    { href: '/about', label: '회사소개' },
    { href: '/products', label: '상품' },
  ];

  // 로그인 상태일 때 마이페이지 메뉴 추가
  const navLinksWithMypage = session?.user
    ? [...navLinks, { href: '/mypage', label: '마이페이지' }]
    : navLinks;

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-xl bg-background/70 border-b border-white/10 shadow-lg'
          : 'backdrop-blur-md bg-background/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold"
          >
            <Sparkles className="w-6 h-6 text-accent" />
            <span className="text-white">AI</span>
            <span className="text-accent">MONEY</span>
          </Link>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinksWithMypage.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  isActiveLink(link.href)
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Auth Buttons (Desktop) */}
          <div className="hidden md:block">
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              {navLinksWithMypage.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-medium transition-colors px-2 py-2 ${
                    isActiveLink(link.href)
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                {session?.user ? (
                  <>
                    <Link
                      href="/mypage/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-300 hover:text-white font-medium transition-colors px-2 py-2"
                    >
                      내 정보
                    </Link>
                    <Link
                      href="/mypage/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-300 hover:text-white font-medium transition-colors px-2 py-2"
                    >
                      주문내역
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        signOut({ callbackUrl: '/' });
                      }}
                      className="text-red-400 hover:text-red-300 font-medium transition-colors px-2 py-2 text-left"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-300 hover:text-white font-medium transition-colors px-2 py-2"
                    >
                      로그인
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-medium px-4 py-2 rounded-lg transition-all text-center"
                    >
                      회원가입
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
