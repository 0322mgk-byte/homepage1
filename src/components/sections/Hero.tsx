'use client';

import { Users, Star, Clock } from 'lucide-react';
import { ContainerScroll } from '../ui/ContainerScroll';
import Button from '../ui/Button';

export default function Hero() {
  const scrollToForm = () => {
    const formSection = document.getElementById('signup-form');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background Gradient Effects */}
      <div className="gradient-blur gradient-purple -top-32 -left-32" />
      <div className="gradient-blur gradient-gold top-1/2 -right-32" />

      <ContainerScroll
        titleComponent={
          <div className="relative z-10">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-2 bg-background-secondary/80 border border-primary/30 rounded-full px-4 py-2 mb-8 animate-pulse-slow">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-text-secondary">
                선착순 <span className="text-accent font-semibold">100명</span> 진행 중
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              글쓰기 재능?{' '}
              <span className="text-primary">필요 없습니다.</span>
              <br />
              <span className="text-accent">AI와 스토리텔링</span>이면 충분합니다.
            </h1>

            {/* Sub Heading */}
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              하루 30분 투자로 월급 외 수익 만들기
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-text-secondary">누적 수강생</span>
                <span className="text-white font-bold">12,000+</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                <span className="text-text-secondary">평점</span>
                <span className="text-white font-bold">4.9</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-text-secondary">무료 특강</span>
                <span className="text-white font-bold">90분</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button onClick={scrollToForm} size="lg">
              무료 특강 신청하기
            </Button>
          </div>
        }
      >
        {/* Card Content - 대본 구조화 분석 방법론 */}
        <div className="h-full w-full bg-white overflow-y-auto p-4 md:p-8">
          <div className="max-w-3xl mx-auto text-gray-900">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">대본 구조화 분석 방법론 요약</h2>

            {/* 1. 기본 분석 원칙 */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 text-gray-900">1. 기본 분석 원칙: 문단 쪼개기</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-gray-700">
                <li>대본을 분석할 때 가장 먼저 할 일은 문단을 쪼개는 것입니다.</li>
                <li>일반적으로 대본을 <strong className="text-gray-900">서론, 본론, 결론</strong>의 3가지 구간으로 크게 나눕니다.</li>
                <li>각 구간을 나눈 뒤, &ldquo;왜 이 구간에 이 말을 했을까?&rdquo;라는 질문을 던져 그 의도를 파악합니다.</li>
              </ul>
            </div>

            {/* 2. 형식 도출 */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 text-gray-900">2. &apos;형식&apos; 도출 및 소재 확장</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-gray-700">
                <li><strong className="text-gray-900">&apos;형식&apos; 정의</strong>: 후킹 문구를 분석할 때 &ldquo;왜 이런 제목을 썼을까?&rdquo;를 질문합니다.
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-600">
                    <li><strong>예시</strong>: &ldquo;우리가 알던 일반 상식이 어떤 배경(사건)으로 인해 틀렸음을 증명하기 위해&rdquo;라는 답이 나왔다면, 이것이 바로 &apos;형식&apos;이 됩니다.</li>
                  </ul>
                </li>
                <li><strong className="text-gray-900">소재 확장</strong>: 도출된 &apos;형식&apos;을 질문으로 바꾸어 새로운 소재를 발굴합니다.
                  <ul className="list-disc pl-5 mt-1 text-gray-600">
                    <li><strong>예시 질문</strong>: &ldquo;우리가 평상시에 알고 있는 상식 중에서 어떤 사건으로 인해 기준이 바뀐 게 뭐가 있을까?&rdquo;</li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* 3. 반복 분석 */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 text-gray-900">3. 반복 분석을 통한 &apos;형식&apos; 검증 (3단계)</h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm md:text-base text-gray-700">
                <li><strong className="text-gray-900">[1단계] 가설 수립</strong>: 대본 1개를 3개 문단으로 쪼개고, 각 구간의 &apos;형식&apos;을 유추해서 적어둡니다.</li>
                <li><strong className="text-gray-900">[2단계] 비교 검증</strong>: 다음 분석할 대본도 똑같이 3개 문단으로 쪼개어, 이전에 유추한 &apos;형식&apos;과 맞는지 비교합니다.</li>
                <li><strong className="text-gray-900">[3단계] 형식 확정</strong>:
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-600">
                    <li><strong>불일치 시</strong>: 다른 대본을 더 찾아봅니다.</li>
                    <li><strong>부분 일치 시</strong>: 여러 대본에서 공통으로 발견되는 점을 찾아 &apos;형식&apos;으로 확정합니다.</li>
                  </ul>
                </li>
              </ol>
            </div>

            {/* 4. 대처법 */}
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-3 text-gray-900">4. 분석이 막히거나 어려울 때 대처법</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-gray-700">
                <li><strong className="text-gray-900">의미 부여 금지</strong>: 모든 문장에 의미를 부여할 필요는 없습니다. &apos;형식&apos; 자체가 없는 구간일 수 있습니다.</li>
                <li><strong className="text-gray-900">통과 및 기록</strong>: 통찰이 안 되거나 확신이 없으면 일단 넘어갑니다.</li>
                <li><strong className="text-gray-900">&apos;너프한 구조&apos; 대응</strong>: 레퍼런스 채널의 대본 구조가 매번 바뀌어 공통점이 없다면, &apos;좋은 구조&apos;만 뽑아오고 자신만의 새로운 구조를 만듭니다.</li>
                <li><strong className="text-gray-900">최종 조치</strong>: 발견되는 구조만 우선 적어두고, 정 모르겠으면 AI에게 물어보거나 동료와 함께 분석합니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
