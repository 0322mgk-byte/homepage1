'use client';

import { Zap, PenTool, Layers } from 'lucide-react';

const modules = [
  {
    icon: Zap,
    title: '팔리는 구조 공식',
    description: '심리학 기반의 검증된 글쓰기 템플릿을 배웁니다. 후킹부터 클로징까지, 독자가 행동하게 만드는 공식을 익힙니다.',
    highlight: '심리학 기반 템플릿',
  },
  {
    icon: PenTool,
    title: 'AI 프롬프트 엔지니어링',
    description: 'AI가 "당신처럼" 글을 쓰게 만드는 프롬프트 기법. 기계적인 글이 아닌, 인간적인 감성이 담긴 글을 만듭니다.',
    highlight: '인간적인 글쓰기',
  },
  {
    icon: Layers,
    title: '원소스 멀티유즈 전략',
    description: '하나의 콘텐츠를 블로그, 인스타그램, 유튜브 스크립트로 확장하는 방법. 최소 노력으로 최대 수익을 만듭니다.',
    highlight: '다채널 확장',
  },
];

export default function Curriculum() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            무료 특강에서 배우는{' '}
            <span className="text-primary">3가지 핵심</span>
          </h2>
          <p className="text-text-secondary text-lg">
            90분 안에 글쓰기 수익화의 전체 그림을 그릴 수 있습니다
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <div
              key={index}
              className="group bg-background-secondary rounded-xl p-6 border border-gray-800
                hover:border-primary/50 hover:bg-background-secondary/80
                transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-4
                group-hover:scale-110 transition-transform duration-300">
                <module.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="inline-block text-xs text-accent font-semibold bg-accent/10 px-2 py-1 rounded mb-3">
                {module.highlight}
              </span>
              <h3 className="text-xl font-semibold text-white mb-3">{module.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{module.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
