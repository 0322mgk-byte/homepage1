'use client';

import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Eye, X, RefreshCw, Loader2 } from 'lucide-react';

type OrderStatus = 'pending' | 'paid' | 'preparing' | 'shipping' | 'delivered' | 'cancelled' | 'refunded';

interface Order {
  id: string;
  orderNumber: string;
  customer: { name: string; email: string; phone: string };
  product: string;
  amount: number;
  status: OrderStatus;
  orderDate: string;
  paymentMethod?: string;
}

const statusOptions: { value: string; label: string }[] = [
  { value: 'all', label: '전체 상태' },
  { value: 'pending', label: '결제 대기' },
  { value: 'paid', label: '결제 완료' },
  { value: 'preparing', label: '배송 준비' },
  { value: 'shipping', label: '배송중' },
  { value: 'delivered', label: '배송 완료' },
  { value: 'cancelled', label: '취소' },
  { value: 'refunded', label: '환불' },
];

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: '결제 대기', color: 'bg-yellow-100 text-yellow-700' },
  paid: { label: '결제 완료', color: 'bg-blue-100 text-blue-700' },
  preparing: { label: '배송 준비', color: 'bg-indigo-100 text-indigo-700' },
  shipping: { label: '배송중', color: 'bg-purple-100 text-purple-700' },
  delivered: { label: '배송 완료', color: 'bg-green-100 text-green-700' },
  cancelled: { label: '취소', color: 'bg-red-100 text-red-700' },
  refunded: { label: '환불', color: 'bg-gray-100 text-gray-700' },
};

const nextStatus: Record<string, OrderStatus> = {
  paid: 'preparing',
  preparing: 'shipping',
  shipping: 'delivered',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('30');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const ordersPerPage = 20;

  // API에서 주문 데이터 가져오기
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders?admin=true');
        const data = await response.json();
        if (data.orders) {
          // API 응답을 관리자 페이지 형식에 맞게 변환
          const formattedOrders: Order[] = data.orders.map((order: {
            id: string;
            orderId: string;
            productName: string;
            amount: number;
            status: OrderStatus;
            paymentMethod: string;
            createdAt: string;
            userEmail?: string;
            userName?: string;
          }) => ({
            id: order.id,
            orderNumber: order.orderId,
            customer: {
              name: order.userName || '고객',
              email: order.userEmail || '',
              phone: '',
            },
            product: order.productName,
            amount: order.amount,
            status: order.status,
            orderDate: new Date(order.createdAt).toISOString().split('T')[0],
            paymentMethod: order.paymentMethod,
          }));
          setOrders(formattedOrders);
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
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      // TODO: Firebase 연동 시 실제 API 호출
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        if (selectedOrder?.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      }
    } catch (error) {
      console.error('상태 변경 오류:', error);
    }
  };

  const handleCancel = (orderId: string) => {
    if (confirm('정말 이 주문을 취소하시겠습니까?')) {
      handleStatusChange(orderId, 'cancelled');
    }
  };

  const handleRefund = (orderId: string) => {
    if (confirm('정말 이 주문을 환불 처리하시겠습니까?')) {
      handleStatusChange(orderId, 'refunded');
    }
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">주문 관리</h1>
        <span className="text-sm text-gray-500">총 {filteredOrders.length}건</span>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="주문번호, 고객명 검색..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7">최근 7일</option>
              <option value="30">최근 30일</option>
              <option value="90">최근 90일</option>
              <option value="365">최근 1년</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">주문번호</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">고객</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">상품</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">주문일</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-700">금액</th>
              <th className="text-center py-4 px-6 text-sm font-medium text-gray-700">상태</th>
              <th className="text-center py-4 px-6 text-sm font-medium text-gray-700">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-4 px-6 font-mono text-sm text-gray-900">{order.orderNumber}</td>
                <td className="py-4 px-6">
                  <div>
                    <p className="font-medium text-gray-900">{order.customer.name}</p>
                    <p className="text-sm text-gray-500">{order.customer.email}</p>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">{order.product}</td>
                <td className="py-4 px-6 text-gray-500">{order.orderDate}</td>
                <td className="py-4 px-6 text-right font-semibold text-gray-900">
                  {order.amount === 0 ? '무료' : `${order.amount.toLocaleString()}원`}
                </td>
                <td className="py-4 px-6 text-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${statusMap[order.status].color}`}>
                    {statusMap[order.status].label}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="상세보기"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    {nextStatus[order.status] && (
                      <button
                        onClick={() => handleStatusChange(order.id, nextStatus[order.status])}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        title="다음 단계"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    )}
                    {['paid', 'preparing'].includes(order.status) && (
                      <button
                        onClick={() => handleCancel(order.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="취소"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = currentPage <= 3 ? i + 1 : currentPage + i - 2;
            if (page > totalPages) return null;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">주문 상세</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${statusMap[selectedOrder.status].color}`}>
                {statusMap[selectedOrder.status].label}
              </span>
            </div>

            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">주문 정보</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">주문번호</span>
                    <span className="font-mono text-gray-900">{selectedOrder.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">주문일</span>
                    <span className="text-gray-900">{selectedOrder.orderDate}</span>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">고객 정보</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">이름</span>
                    <span className="text-gray-900">{selectedOrder.customer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">이메일</span>
                    <span className="text-gray-900">{selectedOrder.customer.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">연락처</span>
                    <span className="text-gray-900">{selectedOrder.customer.phone}</span>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">상품 정보</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">상품명</span>
                    <span className="text-gray-900">{selectedOrder.product}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">결제금액</span>
                    <span className="font-semibold text-gray-900">
                      {selectedOrder.amount === 0 ? '무료' : `${selectedOrder.amount.toLocaleString()}원`}
                    </span>
                  </div>
                </div>
              </div>

              {selectedOrder.paymentMethod && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">결제 정보</h4>
                  <p className="text-gray-900">{selectedOrder.paymentMethod}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              {nextStatus[selectedOrder.status] && (
                <button
                  onClick={() => handleStatusChange(selectedOrder.id, nextStatus[selectedOrder.status])}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                >
                  {statusMap[nextStatus[selectedOrder.status]].label}로 변경
                </button>
              )}
              {['paid', 'preparing'].includes(selectedOrder.status) && (
                <button
                  onClick={() => handleCancel(selectedOrder.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg"
                >
                  주문 취소
                </button>
              )}
              {selectedOrder.status === 'delivered' && (
                <button
                  onClick={() => handleRefund(selectedOrder.id)}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg"
                >
                  환불 처리
                </button>
              )}
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
