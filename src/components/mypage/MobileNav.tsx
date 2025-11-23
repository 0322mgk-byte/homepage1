'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, ShoppingBag, Settings } from 'lucide-react';

const navItems = [
  { title: '홈', href: '/mypage', icon: Home },
  { title: '내 정보', href: '/mypage/profile', icon: User },
  { title: '주문내역', href: '/mypage/orders', icon: ShoppingBag },
  { title: '설정', href: '/mypage/settings', icon: Settings },
];

export default function MobileNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/mypage') {
      return pathname === '/mypage';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="lg:hidden flex border-b border-gray-200 bg-white overflow-x-auto">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-6 py-3 min-w-fit border-b-2 transition-colors ${
              active
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
