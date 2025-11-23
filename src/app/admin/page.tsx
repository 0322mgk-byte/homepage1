'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, ShoppingCart, DollarSign, UserPlus, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// 임시 데이터
const metrics = [
  {
    title: '총 사용자',
    value: '12,847',
    change: 12.5,
    icon: Users,
    color: 'blue' as const,
  },
  {
    title: '오늘 신규 가입',
    value: '48',
    change: 8.2,
    icon: UserPlus,
    color: 'green' as const,
  },
  {
    title: '총 주문 수',
    value: '3,241',
    change: -2.4,
    icon: ShoppingCart,
    color: 'purple' as const,
  },
  {
    title: '총 매출',
    value: '1.2억',
    change: 15.3,
    icon: DollarSign,
    color: 'orange' as const,
  },
];

const monthlyRevenue = [
  { month: '1월', revenue: 4200 },
  { month: '2월', revenue: 5100 },
  { month: '3월', revenue: 4800 },
  { month: '4월', revenue: 6200 },
  { month: '5월', revenue: 5900 },
  { month: '6월', revenue: 7100 },
  { month: '7월', revenue: 8500 },
  { month: '8월', revenue: 7800 },
  { month: '9월', revenue: 9200 },
  { month: '10월', revenue: 10500 },
  { month: '11월', revenue: 11200 },
  { month: '12월', revenue: 12800 },
];

const productSales = [
  { name: '무료 특강', sales: 4200 },
  { name: '베이직', sales: 1850 },
  { name: '프리미엄', sales: 890 },
  { name: '기업 교육', sales: 120 },
];

const recentUsers = [
  { id: '1', name: '김철수', email: 'kim@example.com', date: '2024-01-15' },
  { id: '2', name: '이영희', email: 'lee@example.com', date: '2024-01-15' },
  { id: '3', name: '박민수', email: 'park@example.com', date: '2024-01-14' },
  { id: '4', name: '정수진', email: 'jung@example.com', date: '2024-01-14' },
  { id: '5', name: '최동훈', email: 'choi@example.com', date: '2024-01-13' },
];

const recentOrders = [
  { id: 'ORD-001', customer: '김철수', product: '베이직 코스', amount: 197000, status: 'paid', date: '2024-01-15' },
  { id: 'ORD-002', customer: '이영희', product: '프리미엄 코스', amount: 497000, status: 'paid', date: '2024-01-15' },
  { id: 'ORD-003', customer: '박민수', product: '베이직 코스', amount: 197000, status: 'shipping', date: '2024-01-14' },
  { id: 'ORD-004', customer: '정수진', product: '베이직 코스', amount: 197000, status: 'delivered', date: '2024-01-14' },
  { id: 'ORD-005', customer: '최동훈', product: '프리미엄 코스', amount: 497000, status: 'paid', date: '2024-01-13' },
];

const colorMap = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  purple: 'bg-purple-50 text-purple-600',
  orange: 'bg-orange-50 text-orange-600',
};

const statusMap: Record<string, { label: string; color: string }> = {
  paid: { label: '결제완료', color: 'bg-blue-100 text-blue-700' },
  shipping: { label: '배송중', color: 'bg-purple-100 text-purple-700' },
  delivered: { label: '배송완료', color: 'bg-green-100 text-green-700' },
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-sm text-gray-500">최근 업데이트: 방금 전</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${colorMap[metric.color]}`}>
                <metric.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{Math.abs(metric.change)}%</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            <p className="text-sm text-gray-500 mt-1">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">월별 매출</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6b7280" />
                <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString()}만원`, '매출']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ fill: '#2563eb', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Sales Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">상품별 판매량</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productSales} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#6b7280" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="#6b7280" width={80} />
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString()}건`, '판매량']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                />
                <Bar dataKey="sales" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">최근 가입자</h2>
            <Link href="/admin/users" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              전체보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentUsers.map((user) => (
              <div key={user.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <span className="text-sm text-gray-500">{user.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">최근 주문</h2>
            <Link href="/admin/orders" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              전체보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-500">{order.id}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusMap[order.status].color}`}>
                    {statusMap[order.status].label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.product}</p>
                  </div>
                  <span className="font-semibold text-gray-900">{order.amount.toLocaleString()}원</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-4">빠른 액션</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/users"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Users className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">사용자 관리</span>
          </Link>
          <Link
            href="/admin/products"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">상품 관리</span>
          </Link>
          <Link
            href="/admin/orders"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <DollarSign className="w-6 h-6 text-green-600" />
            <span className="text-sm font-medium text-gray-700">주문 관리</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <TrendingUp className="w-6 h-6 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">시스템 설정</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
