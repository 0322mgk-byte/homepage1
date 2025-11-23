'use client';

import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import ChatBot from "@/components/chatbot/ChatBot";
import PageHeader from "@/components/layout/PageHeader";
import { Check, Clock, Users, BookOpen, MessageCircle, Award, Building2, Settings, Presentation } from "lucide-react";
import ProductReview from "@/components/review/ProductReview";

export default function EnterpriseCoursePage() {
  const programs = [
    {
      title: "기본 워크샵",
      duration: "1일 (8시간)",
      participants: "10-30명",
      description: "AI 글쓰기 기초와 실습을 하루 만에 경험하는 집중 워크샵",
      topics: ["AI 글쓰기 개론", "프롬프트 작성 실습", "팀별 콘텐츠 제작", "결과물 발표 및 피드백"],
    },
    {
      title: "심화 프로그램",
      duration: "2일 (16시간)",
      participants: "10-30명",
      description: "실무에 바로 적용 가능한 심화 기술을 학습하는 프로그램",
      topics: ["기본 워크샵 전체 내용", "부서별 맞춤 콘텐츠 전략", "자동화 시스템 구축", "성과 측정 및 최적화"],
    },
    {
      title: "장기 컨설팅",
      duration: "4주-12주",
      participants: "맞춤 협의",
      description: "조직 전체의 콘텐츠 역량을 체계적으로 강화하는 장기 프로그램",
      topics: ["현황 분석 및 진단", "맞춤형 교육 커리큘럼", "주간 코칭 세션", "성과 보고 및 개선"],
    },
  ];

  const features = [
    { icon: Building2, title: "맞춤형 커리큘럼", description: "업종과 목표에 맞는 교육 설계" },
    { icon: Users, title: "팀 단위 교육", description: "10명 이상 단체 교육 가능" },
    { icon: Presentation, title: "현장 출강", description: "귀사 사무실로 직접 방문 교육" },
    { icon: Settings, title: "사후 지원", description: "교육 후 3개월 무료 컨설팅" },
    { icon: BookOpen, title: "교육 자료", description: "전용 교재 및 템플릿 제공" },
    { icon: Award, title: "수료증 발급", description: "참가자 전원 수료 인증" },
  ];

  const clients = [
    "스타트업 및 중소기업",
    "마케팅 에이전시",
    "미디어 및 출판사",
    "교육 기관",
    "공공기관 및 비영리단체",
    "대기업 마케팅팀",
  ];

  const process = [
    { step: 1, title: "문의 및 상담", description: "교육 목표와 현황 파악" },
    { step: 2, title: "커리큘럼 설계", description: "맞춤형 프로그램 제안" },
    { step: 3, title: "일정 조율", description: "교육 일정 및 장소 확정" },
    { step: 4, title: "교육 진행", description: "현장 또는 온라인 교육" },
    { step: 5, title: "사후 지원", description: "피드백 및 후속 컨설팅" },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PageHeader
          title="기업 교육"
          subtitle="기업 맞춤형 AI 글쓰기 교육 프로그램입니다. 팀 단위 교육과 워크샵을 통해 조직의 콘텐츠 역량을 강화합니다."
          breadcrumb={[
            { name: "상품", href: "/products" },
            { name: "기업 교육", href: "/products/enterprise" },
          ]}
        />

        {/* Features */}
        <section className="py-12 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="text-center">
                  <feature.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-white mb-1">{feature.title}</div>
                  <div className="text-xs text-gray-400">{feature.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">교육 프로그램</h2>
              <p className="text-gray-400">조직의 규모와 목표에 맞는 프로그램을 선택하세요</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((program) => (
                <div
                  key={program.title}
                  className="bg-white border border-gray-200 rounded-lg p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{program.participants}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {program.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 lg:py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">진행 프로세스</h2>
              <p className="text-gray-400">체계적인 5단계 프로세스로 교육을 진행합니다</p>
            </div>
            <div className="grid md:grid-cols-5 gap-4">
              {process.map((item, index) => (
                <div key={item.step} className="relative">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mx-auto mb-3">
                      {item.step}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-400">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Clients */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">이런 조직에 적합합니다</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  콘텐츠 마케팅 역량을 강화하고자 하는 모든 조직에서 활용할 수 있습니다.
                  업종과 규모에 관계없이 맞춤형 프로그램을 제공합니다.
                </p>
                <ul className="space-y-3">
                  {clients.map((client) => (
                    <li key={client} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-300">{client}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">교육 문의</h3>
                <p className="text-gray-600 mb-6">
                  기업 교육에 대한 자세한 상담을 원하시면 문의해 주세요.
                  담당자가 48시간 이내에 연락드립니다.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">이메일 문의</div>
                      <div className="text-sm text-gray-500">enterprise@aimoney.co.kr</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">상담 가능 시간</div>
                      <div className="text-sm text-gray-500">평일 09:00 - 18:00</div>
                    </div>
                  </div>
                </div>
                <a
                  href="/#signup-form"
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  교육 문의하기
                </a>
                <p className="text-xs text-gray-500 text-center mt-4">
                  견적 요청 시 상세 제안서를 보내드립니다
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 리뷰 섹션 */}
        <div className="max-w-7xl mx-auto px-6">
          <ProductReview productId="enterprise" productName="기업 교육" />
        </div>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
