'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, X, MessageSquare, Loader2 } from 'lucide-react';

interface Order {
  id: string;
  orderId: string;
  productName: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  paymentMethod: string;
  createdAt: string;
}

const statusOptions = [
  { value: 'all', label: '전체' },
  { value: 'paid', label: '결제완료' },
  { value: 'cancelled', label: '취소' },
  { value: 'refunded', label: '환불' },
];

const periodOptions = [
  { value: '1', label: '1개월' },
  { value: '3', label: '3개월' },
  { value: '6', label: '6개월' },
  { value: '12', label: '1년' },
];

const getStatusLabel = (status: string) => {
  const statusMap: Record<string, { label: string; color: string }> = {
    pending: { label: '결제대기', color: 'text-yellow-600 bg-yellow-50' },
    paid: { label: '결제완료', color: 'text-blue-600 bg-blue-50' },
    cancelled: { label: '취소됨', color: 'text-red-600 bg-red-50' },
    refunded: { label: '환불됨', color: 'text-gray-600 bg-gray-50' },
  };
  return statusMap[status] || { label: status, color: 'text-gray-600 bg-gray-50' };
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('3');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // API에서 주문 데이터 가져오기
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        if (data.orders) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('주문 조회 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== 'all' && order.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">주문내역</h1>

      {/* 필터 */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">기간</label>
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">상태</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 주문 목록 */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* 테이블 헤더 (데스크톱) */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
          <div className="col-span-3">주문번호 / 주문일</div>
          <div className="col-span-3">상품정보</div>
          <div className="col-span-2">결제수단</div>
          <div className="col-span-2 text-center">주문상태</div>
          <div className="col-span-2 text-right">결제금액</div>
        </div>

        {/* 주문 목록 */}
        <div className="divide-y divide-gray-100">
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => {
              const statusInfo = getStatusLabel(order.status);
              return (
                <div key={order.id} className="p-4 hover:bg-gray-50">
                  {/* 데스크톱 뷰 */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-3">
                      <p className="font-medium text-gray-900 font-mono text-sm">{order.orderId}</p>
                      <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="col-span-3">
                      <p className="font-medium text-gray-900">{order.productName}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className={`text-sm px-3 py-1 rounded-full ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="col-span-2 text-right">
                      <p className="font-semibold text-gray-900">
                        {order.amount.toLocaleString()}원
                      </p>
                    </div>
                  </div>

                  {/* 모바일 뷰 */}
                  <div className="md:hidden space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 font-mono text-sm">{order.orderId}</p>
                        <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                      </div>
                      <span className={`text-sm px-3 py-1 rounded-full ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{order.productName}</p>
                        <p className="text-sm text-gray-500">{order.paymentMethod}</p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {order.amount.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center text-gray-500">주문 내역이 없습니다</div>
          )}
        </div>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-md font-medium ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
