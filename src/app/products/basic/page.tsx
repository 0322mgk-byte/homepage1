'use client';

import { useState } from 'react';
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import ChatBot from "@/components/chatbot/ChatBot";
import PageHeader from "@/components/layout/PageHeader";
import TossPayment from "@/components/payment/TossPayment";
import { Check, Clock, Users, BookOpen, MessageCircle, Award, RefreshCw } from "lucide-react";
import ProductReview from "@/components/review/ProductReview";

export default function BasicCoursePage() {
  const [orderId] = useState(() => `basic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const curriculum = [
    {
      title: "AI 글쓰기 기초 (무료 특강 포함)",
      duration: "2시간",
      topics: ["AI 글쓰기 개론", "ChatGPT 기본 활용법", "수익화 전략 이해"],
    },
    {
      title: "블로그 글쓰기 실전",
      duration: "4시간",
      topics: ["네이버 블로그 최적화", "티스토리 운영 전략", "키워드 리서치 방법", "글 구조화 기법"],
    },
    {
      title: "SEO 최적화 전략",
      duration: "2시간",
      topics: ["검색엔진 작동 원리", "제목과 본문 최적화", "이미지 SEO", "내부 링크 전략"],
    },
    {
      title: "수익화 실전 가이드",
      duration: "3시간",
      topics: ["애드센스 승인 전략", "제휴 마케팅 기초", "수익 극대화 방법", "세금 및 정산 안내"],
    },
    {
      title: "실전 과제 및 피드백",
      duration: "1시간",
      topics: ["5개 실전 과제 수행", "1:1 피드백 2회", "포트폴리오 구성"],
    },
  ];

  const features = [
    { icon: Clock, title: "총 12시간", description: "체계적인 단계별 강의" },
    { icon: BookOpen, title: "20개 강의", description: "실전 위주 커리큘럼" },
    { icon: MessageCircle, title: "1:1 피드백 2회", description: "전문가의 직접 피드백" },
    { icon: Users, title: "평생 커뮤니티", description: "수강생 전용 커뮤니티" },
    { icon: Award, title: "수료증 발급", description: "이력서 첨부 가능" },
    { icon: RefreshCw, title: "1년 업데이트", description: "신규 강의 무료 제공" },
  ];

  const results = [
    { label: "평균 수강 기간", value: "4주" },
    { label: "수료율", value: "94%" },
    { label: "목표 월수익", value: "100만원+" },
    { label: "수강생 만족도", value: "4.8/5" },
  ];

  // 테스트용 결제 금액 (실제 배포 시 197000으로 변경)
  const PAYMENT_AMOUNT = 200; // 계좌이체 최소 금액에 맞춤

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PageHeader
          title="베이직 코스"
          subtitle="본격적인 수익형 글쓰기를 시작하는 기본 과정입니다. 실전 위주의 커리큘럼으로 구성되어 있습니다."
          breadcrumb={[
            { name: "상품", href: "/products" },
            { name: "베이직 코스", href: "/products/basic" },
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
                  베이직 코스는 AI 글쓰기로 실제 수익을 만들기 시작하는 분들을 위한 과정입니다.
                  무료 특강의 내용을 포함하며, 실전에서 바로 적용할 수 있는 기술을 집중적으로 다룹니다.
                </p>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  총 20개 강의, 12시간 분량으로 구성되어 있으며, 평균 4주 내에 수료할 수 있습니다.
                  1:1 피드백을 통해 실제 작성한 글에 대한 전문가 조언을 받을 수 있습니다.
                </p>

                <h3 className="text-xl font-bold text-white mb-4">이런 분께 추천합니다</h3>
                <ul className="space-y-3 mb-8">
                  {[
                    "무료 특강 후 본격적으로 시작하고 싶은 분",
                    "블로그로 월 100만원 이상 수익을 목표로 하는 분",
                    "체계적인 커리큘럼으로 배우고 싶은 분",
                    "전문가 피드백을 받고 싶은 분",
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
                <div className="bg-white border-2 border-blue-600 rounded-lg p-6 sticky top-24">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                    인기
                  </div>
                  <div className="text-center mb-6 pt-2">
                    <span className="text-sm text-gray-500">수강료</span>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-gray-900">{PAYMENT_AMOUNT.toLocaleString()}</span>
                      <span className="text-lg text-gray-500 line-through">297,000</span>
                    </div>
                    <span className="text-sm text-red-600 font-medium">테스트 결제 (200원)</span>
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
                    orderName="베이직 코스"
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
          <ProductReview productId="basic" productName="베이직 코스" />
        </div>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
