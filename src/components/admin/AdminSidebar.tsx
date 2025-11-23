'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Users, Package, ShoppingCart, Settings, Home } from 'lucide-react';

const adminMenuItems = [
  {
    title: '대시보드',
    href: '/admin',
    icon: BarChart3,
  },
  {
    title: '사용자 관리',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: '상품 관리',
    href: '/admin/products',
    icon: Package,
  },
  {
    title: '주문 관리',
    href: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    title: '시스템 설정',
    href: '/admin/settings',
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <Home className="w-4 h-4" />
          <span className="text-sm">사이트로 돌아가기</span>
        </Link>

        <nav className="space-y-1">
          {adminMenuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
