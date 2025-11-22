'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { XCircle, AlertTriangle, Search } from 'lucide-react';

const revenueData = [
  { month: '1월', revenue: 0 },
  { month: '2월', revenue: 50 },
  { month: '3월', revenue: 120 },
  { month: '4월', revenue: 250 },
  { month: '5월', revenue: 380 },
  { month: '6월', revenue: 510 },
];

const painPoints = [
  {
    icon: XCircle,
    title: '완벽주의의 함정',
    description: '"완벽한 글을 써야 해"라는 생각이 시작조차 막습니다.',
  },
  {
    icon: AlertTriangle,
    title: '주제 선정 실패',
    description: '수익이 나는 주제와 그렇지 않은 주제의 차이를 모릅니다.',
  },
  {
    icon: Search,
    title: '단순 AI 검색',
    description: 'ChatGPT에 "글 써줘"라고만 하면 누구나 쓰는 글이 나옵니다.',
  },
];

export default function Story() {
  return (
    <section className="py-20 px-4 bg-background-secondary">
      <div className="max-w-5xl mx-auto">
        {/* Success Story */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            평범한 직장인이{' '}
            <span className="text-accent">월 500만 원</span>을 만들기까지
          </h2>
          <p className="text-text-secondary text-lg">
            0원에서 시작한 6개월간의 수익화 여정
          </p>
        </div>

        {/* Revenue Chart */}
        <div className="bg-background rounded-2xl p-6 mb-16 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">월별 수익 추이 (만원)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value: number) => [`${value}만원`, '수익']}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6B46C1"
                  strokeWidth={3}
                  dot={{ fill: '#FFD700', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#FFD700' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pain Points */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            왜 대부분 <span className="text-red-500">실패</span>할까요?
          </h2>
          <p className="text-text-secondary text-lg">
            글쓰기로 수익화에 실패하는 3가지 이유
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-6 border border-gray-800 hover:border-red-500/50 transition-colors"
            >
              <point.icon className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{point.title}</h3>
              <p className="text-text-secondary text-sm">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
