'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { User, ShoppingBag, Settings, CreditCard, Bell, HelpCircle, ChevronRight } from 'lucide-react';

// 임시 데이터
const recentOrders = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001234',
    orderDate: '2024-01-15',
    productName: '베이직 코스',
    status: 'delivered',
    amount: 197000,
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-001235',
    orderDate: '2024-01-20',
    productName: '프리미엄 코스',
    status: 'paid',
    amount: 497000,
  },
];

const quickActions = [
  { title: '내 정보 관리', href: '/mypage/profile', icon: User },
  { title: '주문/배송 조회', href: '/mypage/orders', icon: ShoppingBag },
  { title: '설정', href: '/mypage/settings', icon: Settings },
  { title: '고객센터', href: '#', icon: HelpCircle },
];

const getStatusLabel = (status: string) => {
  const statusMap: Record<string, { label: string; color: string }> = {
    pending: { label: '결제대기', color: 'text-yellow-600 bg-yellow-50' },
    paid: { label: '결제완료', color: 'text-blue-600 bg-blue-50' },
    shipping: { label: '배송중', color: 'text-purple-600 bg-purple-50' },
    delivered: { label: '배송완료', color: 'text-green-600 bg-green-50' },
    cancelled: { label: '취소됨', color: 'text-red-600 bg-red-50' },
  };
  return statusMap[status] || { label: status, color: 'text-gray-600 bg-gray-50' };
};

export default function MypagePage() {
  const { data: session } = useSession();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  return (
    <div className="space-y-6">
      {/* 사용자 정보 요약 카드 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt="프로필"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">
              {session?.user?.name || '사용자'}님, 안녕하세요
            </h1>
            <p className="text-gray-600">{session?.user?.email}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-gray-500">일반 회원</span>
              <span className="text-sm text-gray-500">가입일: 2024.01.01</span>
            </div>
          </div>
          <Link
            href="/mypage/profile"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            프로필 수정
          </Link>
        </div>
      </div>

      {/* 대시보드 위젯들 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 최근 주문 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">최근 주문</h2>
            <Link
              href="/mypage/orders"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              전체보기
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => {
                const statusInfo = getStatusLabel(order.status);
                return (
                  <div key={order.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">{order.orderNumber}</span>
                      <span className="text-sm text-gray-500">{formatDate(order.orderDate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{order.productName}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {order.amount.toLocaleString()}원
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-gray-500">
                주문 내역이 없습니다
              </div>
            )}
          </div>
        </div>

        {/* 포인트/알림 */}
        <div className="space-y-6">
          {/* 포인트 현황 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">포인트 현황</h2>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">0</span>
              <span className="text-gray-600">P</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">사용 가능한 포인트가 없습니다</p>
          </div>

          {/* 알림 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">알림</h2>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">새로운 알림이 없습니다</p>
          </div>
        </div>
      </div>

      {/* 빠른 액션 버튼들 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-4">빠른 메뉴</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <action.icon className="w-6 h-6 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{action.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
