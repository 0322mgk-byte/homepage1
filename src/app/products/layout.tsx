import { Metadata } from "next";

export const metadata: Metadata = {
  title: "상품소개 | AI MONEY",
  description: "AI MONEY의 교육 프로그램을 확인하세요. 무료 특강부터 프리미엄 코스까지, 목표에 맞는 과정을 선택할 수 있습니다.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
