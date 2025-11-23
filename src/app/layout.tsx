import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://testlanding3.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI MONEY - AI 활용 수익형 글쓰기 무료 특강",
    template: "%s | AI MONEY",
  },
  description: "글쓰기 재능 없이 AI와 스토리텔링으로 월급 외 수익 만들기. 하루 30분 투자로 월 500만 원 수익 달성! 12,000명이 선택한 AI 글쓰기 특강에 무료로 참여하세요.",
  keywords: [
    "AI 글쓰기",
    "수익화",
    "콘텐츠 마케팅",
    "부업",
    "블로그 수익",
    "ChatGPT",
    "AI 부업",
    "글쓰기 수익",
    "스토리텔링",
    "온라인 수익",
    "무료 특강",
    "AI 활용법",
  ],
  authors: [{ name: "AI MONEY" }],
  creator: "AI MONEY",
  publisher: "AI MONEY",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "AI MONEY",
    title: "AI MONEY - AI 활용 수익형 글쓰기 무료 특강",
    description: "글쓰기 재능 없이 AI와 스토리텔링으로 월급 외 수익 만들기. 하루 30분 투자로 시작하세요!",
    images: [
      {
        url: `${siteUrl}/aiog.png`,
        width: 1200,
        height: 630,
        alt: "AI MONEY - AI 활용 수익형 글쓰기 무료 특강",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI MONEY - AI 활용 수익형 글쓰기 무료 특강",
    description: "글쓰기 재능 없이 AI와 스토리텔링으로 월급 외 수익 만들기. 하루 30분 투자로 시작하세요!",
    images: [`${siteUrl}/aiog.png`],
    creator: "@aimoney",
  },
  verification: {
    // google: "구글 서치 콘솔 인증 코드",
    // naver: "네이버 서치어드바이저 인증 코드",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="naver-site-verification" content="" />
        <meta name="google-site-verification" content="" />
      </head>
      <body className="bg-background text-white antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
