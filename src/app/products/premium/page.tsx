'use client';

import { useState } from 'react';
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import ChatBot from "@/components/chatbot/ChatBot";
import PageHeader from "@/components/layout/PageHeader";
import TossPayment from "@/components/payment/TossPayment";
import { Check, Clock, Users, BookOpen, MessageCircle, Award, RefreshCw, Star } from "lucide-react";
import ProductReview from "@/components/review/ProductReview";

export default function PremiumCoursePage() {
  const [orderId] = useState(() => `premium_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const curriculum = [
    {
      title: "베이직 코스 전체 내용",
      duration: "12시간",
      topics: ["AI 글쓰기 기초", "블로그 실전", "SEO 최적화", "수익화 가이드"],
    },
    {
      title: "고급 AI 프롬프트 작성법",
      duration: "4시간",
      topics: ["프롬프트 엔지니어링 심화", "글 품질 향상 기법", "AI와의 효율적 협업", "자동화 프롬프트 설계"],
    },
    {
      title: "멀티 플랫폼 수익화",
      duration: "4시간",
      topics: ["유튜브 스크립트 작성", "뉴스레터 운영", "전자책 출간 가이드", "온라인 강의 제작"],
    },
    {
      title: "자동화 시스템 구축",
      duration: "3시간",
      topics: ["콘텐츠 자동화 도구", "일정 관리 시스템", "분석 및 최적화 자동화", "확장 가능한 운영 구조"],
    },
    {
      title: "1:1 멘토링 프로그램",
      duration: "4회 (각 30분)",
      topics: ["개인 맞춤 전략 수립", "수익 목표 설정 및 추적", "문제 해결 컨설팅", "성장 로드맵 설계"],
    },
  ];

  const features = [
    { icon: Clock, title: "총 25시간+", description: "심화 학습 커리큘럼" },
    { icon: BookOpen, title: "35개 강의", description: "베이직 + 프리미엄 전용" },
    { icon: MessageCircle, title: "1:1 멘토링 4회", description: "전문가 직접 멘토링" },
    { icon: Users, title: "VIP 커뮤니티", description: "1년 VIP 전용 커뮤니티" },
    { icon: Award, title: "수료증 발급", description: "프리미엄 수료 인증" },
    { icon: RefreshCw, title: "평생 업데이트", description: "모든 신규 강의 무료" },
    { icon: Star, title: "우선 지원", description: "질문 우선 답변" },
  ];

  const results = [
    { label: "평균 수강 기간", value: "8주" },
    { label: "수료율", value: "91%" },
    { label: "목표 월수익", value: "300만원+" },
    { label: "수강생 만족도", value: "4.9/5" },
  ];

  const PAYMENT_AMOUNT = 497000;

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PageHeader
          title="프리미엄 코스"
          subtitle="월 300만원 이상 수익을 목표로 하는 심화 과정입니다. 1:1 멘토링과 함께 진행됩니다."
          breadcrumb={[
            { name: "상품", href: "/products" },
            { name: "프리미엄 코스", href: "/products/premium" },
          ]}
        />

        {/* Stats */}
        <section className="py-12 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {results.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-white mb-6">과정 소개</h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  프리미엄 코스는 AI 글쓰기로 본격적인 수익을 만들고자 하는 분들을 위한 심화 과정입니다.
                  베이직 코스의 모든 내용을 포함하며, 고급 기술과 멀티 플랫폼 전략을 추가로 학습합니다.
                </p>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  1:1 멘토링 4회를 통해 개인 맞춤형 전략을 수립하고, VIP 커뮤니티에서 성공한 수강생들과
                  네트워킹할 수 있습니다. 평생 업데이트를 통해 최신 트렌드를 지속적으로 학습할 수 있습니다.
                </p>

                <h3 className="text-xl font-bold text-white mb-4">이런 분께 추천합니다</h3>
                <ul className="space-y-3 mb-8">
                  {[
                    "월 300만원 이상의 수익을 목표로 하는 분",
                    "여러 플랫폼에서 동시에 수익을 만들고 싶은 분",
                    "1:1 멘토링으로 빠르게 성장하고 싶은 분",
                    "자동화 시스템을 구축하고 싶은 분",
                    "전자책, 강의 등으로 확장하고 싶은 분",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold text-white mb-4">커리큘럼</h3>
                <div className="space-y-4">
                  {curriculum.map((section, index) => (
                    <div key={section.title} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                            {index + 1}
                          </span>
                          <h4 className="font-semibold text-gray-900">{section.title}</h4>
                        </div>
                        <span className="text-sm text-gray-500">{section.duration}</span>
                      </div>
                      <ul className="space-y-1 ml-11">
                        {section.topics.map((topic) => (
                          <li key={topic} className="text-sm text-gray-600">- {topic}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
                  <div className="text-center mb-6">
                    <span className="text-sm text-gray-500">수강료</span>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-gray-900">{PAYMENT_AMOUNT.toLocaleString()}</span>
                      <span className="text-lg text-gray-500 line-through">697,000</span>
                    </div>
                    <span className="text-sm text-blue-600 font-medium">29% 할인</span>
                  </div>
                  <div className="space-y-4 mb-6">
                    {features.map((feature) => (
                      <div key={feature.title} className="flex items-center gap-3">
                        <feature.icon className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{feature.title}</div>
                          <div className="text-xs text-gray-500">{feature.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <TossPayment
                    amount={PAYMENT_AMOUNT}
                    orderId={orderId}
                    orderName="프리미엄 코스"
                    buttonText={`${PAYMENT_AMOUNT.toLocaleString()}원 결제하기`}
                  />
                  <p className="text-xs text-gray-500 text-center mt-4">
                    7일 이내 환불 가능 | 평생 수강권
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 리뷰 섹션 */}
        <div className="max-w-7xl mx-auto px-6">
          <ProductReview productId="premium" productName="프리미엄 코스" />
        </div>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
