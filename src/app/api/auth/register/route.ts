import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "비밀번호는 6자 이상이어야 합니다." },
        { status: 400 }
      );
    }

    const user = await registerUser(email, password, name);

    return NextResponse.json({
      success: true,
      message: "회원가입이 완료되었습니다.",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "회원가입 중 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
