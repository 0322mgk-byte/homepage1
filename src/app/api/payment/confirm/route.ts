import { NextRequest, NextResponse } from 'next/server';

const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await request.json();

    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json(
        { error: '필수 파라미터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    if (!TOSS_SECRET_KEY) {
      return NextResponse.json(
        { error: '서버 설정 오류: 시크릿 키가 없습니다.' },
        { status: 500 }
      );
    }

    // Base64 인코딩된 시크릿 키 생성
    const encryptedSecretKey = Buffer.from(`${TOSS_SECRET_KEY}:`).toString('base64');

    // 토스페이먼츠 결제 승인 API 호출
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encryptedSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: Number(amount),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data.message || '결제 승인에 실패했습니다.',
          code: data.code
        },
        { status: response.status }
      );
    }

    // 결제 성공 시 주문 정보 저장 로직 추가 가능
    // TODO: 데이터베이스에 주문 정보 저장

    return NextResponse.json({
      success: true,
      payment: {
        paymentKey: data.paymentKey,
        orderId: data.orderId,
        orderName: data.orderName,
        amount: data.totalAmount,
        status: data.status,
        method: data.method,
        approvedAt: data.approvedAt,
      },
    });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json(
      { error: '결제 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
