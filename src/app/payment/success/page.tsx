'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import Link from 'next/link';

interface PaymentResult {
  success: boolean;
  payment?: {
    paymentKey: string;
    orderId: string;
    orderName: string;
    amount: number;
    status: string;
    method: string;
    approvedAt: string;
  };
  error?: string;
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);

  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');

  useEffect(() => {
    const confirmPayment = async () => {
      if (!orderId || !paymentKey || !amount) {
        setStatus('error');
        setPaymentResult({ success: false, error: '필수 정보가 누락되었습니다.' });
        return;
      }

      try {
        const response = await fetch('/api/payment/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId,
            paymentKey,
            amount: Number(amount),
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // 주문 데이터 저장
          await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: data.payment.orderId,
              productName: data.payment.orderName,
              amount: data.payment.amount,
              paymentMethod: data.payment.method,
              paymentKey: data.payment.paymentKey,
            }),
          });

          setStatus('success');
          setPaymentResult(data);
        } else {
          setStatus('error');
          setPaymentResult({ success: false, error: data.error || '결제 승인에 실패했습니다.' });
        }
      } catch {
        setStatus('error');
        setPaymentResult({ success: false, error: '결제 처리 중 오류가 발생했습니다.' });
      }
    };

    confirmPayment();
  }, [orderId, paymentKey, amount]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
      {status === 'loading' && (
        <>
          <Loader2 className="w-16 h-16 text-blue-500 mx-auto mb-6 animate-spin" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">결제 처리 중</h1>
          <p className="text-gray-600">잠시만 기다려 주세요...</p>
        </>
      )}

      {status === 'success' && paymentResult?.payment && (
        <>
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">결제가 완료되었습니다</h1>
          <p className="text-gray-600 mb-6">
            수강 신청이 성공적으로 처리되었습니다.
            등록하신 이메일로 수강 안내를 보내드립니다.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">주문번호</div>
                <div className="text-gray-900 font-mono text-sm break-all">
                  {paymentResult.payment.orderId}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">상품명</div>
                <div className="text-gray-900">{paymentResult.payment.orderName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">결제금액</div>
                <div className="text-gray-900 font-semibold">
                  {paymentResult.payment.amount.toLocaleString()}원
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">결제수단</div>
                <div className="text-gray-900">{paymentResult.payment.method}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">결제일시</div>
                <div className="text-gray-900">
                  {new Date(paymentResult.payment.approvedAt).toLocaleString('ko-KR')}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/mypage/orders"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              주문내역 확인
            </Link>
            <Link
              href="/"
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </>
      )}

      {status === 'error' && (
        <>
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">결제 승인 실패</h1>
          <p className="text-gray-600 mb-6">
            {paymentResult?.error || '결제 처리 중 문제가 발생했습니다.'}
          </p>

          <div className="space-y-3">
            <Link
              href="/products"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              다시 시도하기
            </Link>
            <Link
              href="/"
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
      <Loader2 className="w-16 h-16 text-blue-500 mx-auto mb-6 animate-spin" />
      <h1 className="text-2xl font-bold text-gray-900 mb-4">로딩 중</h1>
      <p className="text-gray-600">잠시만 기다려 주세요...</p>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen flex items-center justify-center py-16">
        <div className="max-w-md mx-auto px-6 text-center">
          <Suspense fallback={<LoadingFallback />}>
            <PaymentSuccessContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
