"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import ChatBot from "@/components/chatbot/ChatBot";
import PageHeader from "@/components/layout/PageHeader";
import { Check, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: string[];
  popular?: boolean;
  category: string;
}

const products: Product[] = [
  {
    id: "free",
    name: "무료 특강",
    description: "AI 글쓰기의 기초를 배우는 입문 과정입니다. 수강료 없이 시작할 수 있습니다.",
    price: 0,
    features: [
      "AI 글쓰기 기초 이론 (2시간)",
      "ChatGPT 활용 기본법",
      "수익화 전략 소개",
      "Q&A 세션 1회",
      "커뮤니티 접근권 (30일)",
    ],
    category: "기본형",
  },
  {
    id: "basic",
    name: "베이직 코스",
    description: "본격적인 수익형 글쓰기를 시작하는 기본 과정입니다. 실전 위주의 커리큘럼으로 구성되어 있습니다.",
    price: 197000,
    originalPrice: 297000,
    features: [
      "무료 특강 전체 내용 포함",
      "실전 블로그 글쓰기 (20강, 10시간)",
      "SEO 최적화 전략",
      "수익화 실전 가이드",
      "1:1 피드백 2회",
      "수료증 발급",
      "평생 수강권",
    ],
    popular: true,
    category: "기본형",
  },
  {
    id: "premium",
    name: "프리미엄 코스",
    description: "월 300만원 이상 수익을 목표로 하는 심화 과정입니다. 1:1 멘토링과 함께 진행됩니다.",
    price: 497000,
    originalPrice: 697000,
    features: [
      "베이직 코스 전체 내용 포함",
      "고급 AI 프롬프트 작성법 (10강)",
      "멀티 플랫폼 수익화 전략",
      "자동화 시스템 구축 가이드",
      "1:1 멘토링 4회",
      "VIP 커뮤니티 접근권 (1년)",
      "실시간 전략 업데이트",
    ],
    category: "프리미엄",
  },
  {
    id: "enterprise",
    name: "기업 교육",
    description: "기업 맞춤형 AI 콘텐츠 교육 프로그램입니다. 인원과 일정에 따라 협의 가능합니다.",
    price: 0,
    features: [
      "기업 맞춤형 커리큘럼 설계",
      "현장 또는 온라인 진행",
      "수강 인원 무제한",
      "전담 강사 배정",
      "교육 자료 제공",
      "수료증 일괄 발급",
      "사후 관리 지원",
    ],
    category: "엔터프라이즈",
  },
];

const comparisonFeatures = [
  { name: "강의 시간", free: "2시간", basic: "12시간", premium: "25시간+" },
  { name: "강의 자료", free: "PDF 1종", basic: "PDF 5종", premium: "PDF 10종+" },
  { name: "1:1 피드백", free: "-", basic: "2회", premium: "4회" },
  { name: "커뮤니티 접근", free: "30일", basic: "평생", premium: "평생 + VIP" },
  { name: "수료증", free: "-", basic: "O", premium: "O" },
  { name: "실전 과제", free: "-", basic: "5개", premium: "10개" },
  { name: "업데이트 제공", free: "-", basic: "1년", premium: "평생" },
];

const faqs = [
  {
    q: "코스는 어떻게 진행되나요?",
    a: "모든 코스는 온라인으로 진행됩니다. 수강 신청 후 즉시 강의에 접근할 수 있으며, 베이직/프리미엄 코스는 평생 수강권이 제공됩니다.",
  },
  {
    q: "환불 정책은 어떻게 되나요?",
    a: "수강 시작 후 7일 이내, 전체 강의의 30% 미만 수강 시 전액 환불이 가능합니다. 7일 이후 또는 30% 이상 수강 시 환불이 제한됩니다.",
  },
  {
    q: "1:1 피드백은 어떻게 받나요?",
    a: "베이직/프리미엄 코스 수강생은 전용 예약 시스템을 통해 원하는 시간에 1:1 피드백 세션을 예약할 수 있습니다. 세션은 30분간 진행됩니다.",
  },
  {
    q: "수료증은 어떻게 발급되나요?",
    a: "전체 커리큘럼의 80% 이상을 수강하고 과제를 제출하면 PDF 수료증이 자동 발급됩니다. 취업/이직 시 활용 가능합니다.",
  },
  {
    q: "기업 교육은 어떻게 신청하나요?",
    a: "하단 문의 버튼을 통해 연락주시면 담당자가 24시간 내 회신드립니다. 교육 인원, 일정, 장소 등을 협의하여 맞춤 견적을 제공합니다.",
  },
];

export default function ProductsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const formatPrice = (price: number) => {
    if (price === 0) return "무료";
    return `₩${price.toLocaleString()}`;
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PageHeader
          title="상품 소개"
          subtitle="입문자부터 전문가까지, 목표에 맞는 교육 프로그램을 선택하세요. 모든 유료 과정은 평생 수강권을 제공합니다."
          breadcrumb={[{ name: "상품", href: "/products" }]}
        />

        {/* Product Grid */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`relative bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${
                    product.popular ? "border-blue-600 ring-1 ring-blue-600" : "border-gray-200"
                  }`}
                >
                  {product.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                      인기
                    </div>
                  )}
                  <div className="mb-4">
                    <span className="text-xs text-gray-500 font-medium">{product.category}</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1">{product.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 min-h-[48px]">{product.description}</p>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {product.id === "enterprise" ? "협의" : formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ₩{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {product.features.slice(0, 5).map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                    {product.features.length > 5 && (
                      <li className="text-sm text-gray-400">
                        +{product.features.length - 5}개 더
                      </li>
                    )}
                  </ul>
                  <Link
                    href={`/products/${product.id}`}
                    className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg font-medium transition-colors ${
                      product.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    상세보기
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 lg:py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                상품 비교
              </h2>
              <p className="text-gray-400 text-lg">
                각 코스별 제공 내용을 비교해보세요
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">기능</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">무료 특강</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900 bg-blue-50">베이직</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">프리미엄</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={feature.name} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-4 px-6 text-gray-900 font-medium">{feature.name}</td>
                      <td className="py-4 px-6 text-center text-gray-600">{feature.free}</td>
                      <td className="py-4 px-6 text-center text-gray-900 bg-blue-50/50">{feature.basic}</td>
                      <td className="py-4 px-6 text-center text-gray-600">{feature.premium}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-4 px-6 font-bold text-gray-900">가격</td>
                    <td className="py-4 px-6 text-center font-bold text-gray-900">무료</td>
                    <td className="py-4 px-6 text-center font-bold text-blue-600 bg-blue-50/50">₩197,000</td>
                    <td className="py-4 px-6 text-center font-bold text-gray-900">₩497,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                자주 묻는 질문
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between py-4 px-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">{faq.q}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="py-16 lg:py-24 bg-gray-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              무료 특강으로 시작해보세요
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              AI 글쓰기가 처음이라면 무료 특강부터 경험해보세요. 부담 없이 시작할 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products/free"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                무료 특강 신청
              </Link>
              <Link
                href="/products/enterprise"
                className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                기업 교육 문의
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
