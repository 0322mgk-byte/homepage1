'use client';

import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import ChatBot from "@/components/chatbot/ChatBot";
import PageHeader from "@/components/layout/PageHeader";
import { Check, Clock, Users, BookOpen, MessageCircle } from "lucide-react";
import ProductReview from "@/components/review/ProductReview";

export default function FreeCoursePage() {
  const curriculum = [
    {
      title: "AI 글쓰기 기초 이론",
      duration: "40분",
      topics: ["AI 글쓰기란 무엇인가", "글쓰기 수익화의 원리", "성공 사례 분석"],
    },
    {
      title: "ChatGPT 활용 기본법",
      duration: "50분",
      topics: ["효과적인 프롬프트 작성법", "글쓰기에 최적화된 설정", "실습: 첫 번째 글 작성"],
    },
    {
      title: "수익화 전략 소개",
      duration: "30분",
      topics: ["블로그 수익화 구조", "SNS 수익화 방법", "다음 단계 안내"],
    },
  ];

  const features = [
    { icon: Clock, title: "총 2시간", description: "핵심만 담은 압축 강의" },
    { icon: Users, title: "커뮤니티 접근권", description: "30일간 수강생 커뮤니티 이용" },
    { icon: BookOpen, title: "강의 자료", description: "PDF 자료 1종 제공" },
    { icon: MessageCircle, title: "Q&A 세션", description: "1회 실시간 질의응답" },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PageHeader
          title="무료 특강"
          subtitle="AI 글쓰기의 기초를 배우는 입문 과정입니다. 수강료 없이 시작할 수 있습니다."
          breadcrumb={[
            { name: "상품", href: "/products" },
            { name: "무료 특강", href: "/products/free" },
          ]}
        />

        {/* Overview */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-white mb-6">과정 소개</h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  무료 특강은 AI 글쓰기가 처음인 분들을 위한 입문 과정입니다.
                  글쓰기 경험이 없어도, AI를 처음 사용해보는 분도 쉽게 따라할 수 있도록 구성했습니다.
                </p>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  총 2시간의 강의를 통해 AI 글쓰기의 기본 개념과 수익화 가능성을 이해할 수 있습니다.
                  무료 특강 후 베이직 코스나 프리미엄 코스로 진행할지 결정하시면 됩니다.
                </p>

                <h3 className="text-xl font-bold text-white mb-4">이런 분께 추천합니다</h3>
                <ul className="space-y-3 mb-8">
                  {[
                    "AI 글쓰기가 무엇인지 궁금한 분",
                    "블로그나 SNS로 수익을 만들고 싶은 분",
                    "유료 과정 수강 전 미리 체험해보고 싶은 분",
                    "적은 시간 투자로 새로운 기술을 배우고 싶은 분",
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
                    <div className="text-4xl font-bold text-gray-900">무료</div>
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
                  <a
                    href="/#signup-form"
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    무료로 시작하기
                  </a>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    신청 후 즉시 수강 가능합니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 리뷰 섹션 */}
        <div className="max-w-7xl mx-auto px-6">
          <ProductReview productId="free" productName="무료 특강" />
        </div>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
