import { Metadata } from "next";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import ChatBot from "@/components/chatbot/ChatBot";
import PageHeader from "@/components/layout/PageHeader";
import { Users, BookOpen, Award, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "회사소개 | AI MONEY",
  description: "AI MONEY는 2019년 설립된 AI 기반 콘텐츠 교육 전문 기업입니다. 12,000명 이상의 수강생에게 검증된 교육을 제공합니다.",
};

export default function AboutPage() {
  const companyInfo = [
    { label: "설립연도", value: "2019년", icon: Clock },
    { label: "누적 수강생", value: "12,000+", icon: Users },
    { label: "교육 과정", value: "15개 과정", icon: BookOpen },
    { label: "수료율", value: "94%", icon: Award },
  ];

  const values = [
    {
      title: "실용성",
      description: "이론보다 실무 중심의 교육을 제공합니다. 수강 후 바로 적용 가능한 내용만 다룹니다.",
    },
    {
      title: "검증된 방법론",
      description: "실제 성과를 낸 방법론만 교육합니다. 모든 커리큘럼은 현업 전문가가 검토합니다.",
    },
    {
      title: "지속적 지원",
      description: "수강 후에도 커뮤니티를 통해 지속적인 피드백과 업데이트를 제공합니다.",
    },
    {
      title: "합리적 가격",
      description: "양질의 교육을 합리적인 가격에 제공합니다. 무료 특강으로 먼저 경험해보세요.",
    },
  ];

  const timeline = [
    { year: "2019", event: "AI MONEY 설립, 첫 번째 온라인 강의 출시" },
    { year: "2020", event: "수강생 1,000명 달성, 프리미엄 코스 런칭" },
    { year: "2021", event: "수강생 5,000명 달성, 기업 교육 서비스 시작" },
    { year: "2022", event: "수강생 8,000명 달성, 오프라인 세미나 개최" },
    { year: "2023", event: "수강생 10,000명 달성, AI 글쓰기 전문 과정 신설" },
    { year: "2024", event: "수강생 12,000명 달성, 해외 수강생 서비스 시작" },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PageHeader
          title="회사소개"
          subtitle="AI MONEY는 2019년 설립된 AI 기반 콘텐츠 교육 전문 기업입니다. 실용적이고 검증된 교육으로 수강생의 성공을 돕습니다."
          breadcrumb={[{ name: "회사소개", href: "/about" }]}
        />

        {/* Company Overview */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  회사 개요
                </h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  AI MONEY는 누구나 AI를 활용해 온라인에서 수익을 창출할 수 있도록 돕는
                  교육 전문 기업입니다. 2019년 설립 이후 12,000명 이상의 수강생에게
                  검증된 교육을 제공해왔습니다.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  복잡한 기술을 쉽게 설명하고, 실제로 적용 가능한 실전 노하우를
                  전달하는 것이 저희의 강점입니다. 수강생 중심의 교육으로
                  94%의 높은 수료율을 기록하고 있습니다.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {companyInfo.map((info) => (
                  <div
                    key={info.label}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                  >
                    <info.icon className="w-8 h-8 text-blue-600 mb-3" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {info.value}
                    </div>
                    <div className="text-gray-600 text-sm">{info.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 lg:py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">미션</h3>
                <p className="text-gray-600 leading-relaxed">
                  글쓰기 경험이 없어도, 마케팅 지식이 없어도 누구나 AI를 활용해
                  온라인에서 안정적인 수익을 만들 수 있도록 실용적인 교육을 제공합니다.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">비전</h3>
                <p className="text-gray-600 leading-relaxed">
                  2025년까지 국내 AI 콘텐츠 교육 분야 1위 기업이 되어,
                  50,000명 이상의 수강생이 부수입을 만들 수 있도록 지원하겠습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                핵심 가치
              </h2>
              <p className="text-gray-400 text-lg">
                AI MONEY가 교육에서 가장 중요하게 생각하는 가치입니다
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 lg:py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                연혁
              </h2>
              <p className="text-gray-400 text-lg">
                AI MONEY의 성장 과정입니다
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-700 hidden md:block" />
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div
                    key={item.year}
                    className={`flex items-center gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm inline-block">
                        <div className="text-blue-600 font-bold text-lg mb-1">{item.year}</div>
                        <div className="text-gray-600">{item.event}</div>
                      </div>
                    </div>
                    <div className="hidden md:flex w-4 h-4 bg-blue-600 rounded-full flex-shrink-0 relative z-10" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              교육 문의
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              기업 교육, 단체 수강 등 문의사항이 있으시면 연락주세요.
            </p>
            <a
              href="/#signup-form"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              무료 특강 신청하기
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
