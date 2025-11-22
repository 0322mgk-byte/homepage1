import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
// 기존 폼 URL과 동일하게 사용 (통합 Apps Script)
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

// Google Sheets에 대화 내용 저장
async function saveToSheets(sessionId: string, role: string, message: string, ip: string) {
  if (!GOOGLE_SCRIPT_URL) return;

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, role, message, ip, type: "chat" }),
    });
  } catch (error) {
    console.error("Failed to save chat to sheets:", error);
  }
}

const SYSTEM_PROMPT = `당신은 "AI MONEY" 무료 특강의 친절한 상담 도우미입니다.

## 특강 정보
- 특강명: AI 활용 수익형 글쓰기 무료 특강
- 대상: AI를 활용해 글쓰기로 수익을 만들고 싶은 분
- 특징: 하루 30분 투자로 월 500만 원 수익 달성 가능
- 참여자: 12,000명 이상이 선택한 검증된 특강

## 커리큘럼
1. AI 글쓰기 기초와 수익화 전략
2. ChatGPT를 활용한 콘텐츠 제작
3. 스토리텔링 기법과 독자 심리
4. 블로그/SNS 수익화 실전 가이드
5. 자동화 시스템 구축 방법

## 응답 가이드라인
- 친근하고 따뜻한 어조로 응답하세요
- 특강의 가치와 혜택을 자연스럽게 안내하세요
- 구체적인 질문에는 명확하게 답변하세요
- 신청을 고민하는 분에게는 부담 없이 참여할 수 있음을 안내하세요
- 답변은 간결하게 2-3문장으로 작성하세요
- 한국어로 응답하세요`;

export async function POST(req: NextRequest) {
  try {
    const { message, history, sessionId } = await req.json();

    // 사용자 IP 가져오기
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    // 사용자 메시지 저장
    await saveToSheets(sessionId || "unknown", "user", message, ip);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // AI 응답 저장
    await saveToSheets(sessionId || "unknown", "model", text, ip);

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "메시지 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
