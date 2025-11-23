'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, ShoppingBag, Settings, LogOut, Shield } from 'lucide-react';
import { signOut } from 'next-auth/react';

const sidebarItems = [
  {
    title: '마이페이지',
    href: '/mypage',
    icon: Home,
  },
  {
    title: '내 정보',
    href: '/mypage/profile',
    icon: User,
  },
  {
    title: '주문내역',
    href: '/mypage/orders',
    icon: ShoppingBag,
  },
  {
    title: '설정',
    href: '/mypage/settings',
    icon: Settings,
  },
];

export default function SidebarNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/mypage') {
      return pathname === '/mypage';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="space-y-1">
      {sidebarItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              active
                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.title}</span>
          </Link>
        );
      })}

      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-700 hover:text-red-600 hover:bg-red-50 w-full"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">로그아웃</span>
      </button>

      {/* 관리자 메뉴 */}
      <div className="pt-4 mt-4 border-t border-gray-200">
        <Link
          href="/admin"
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-purple-600 hover:bg-purple-50"
        >
          <Shield className="w-5 h-5" />
          <span className="font-medium">관리자</span>
        </Link>
      </div>
    </nav>
  );
}
