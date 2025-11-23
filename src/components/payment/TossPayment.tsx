'use client';

import { useState } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';

interface TossPaymentProps {
  amount: number;
  orderName: string;
  orderId: string;
  customerName?: string;
  customerEmail?: string;
  onSuccess?: () => void;
  onFail?: (error: string) => void;
  buttonText?: string;
  buttonClassName?: string;
}

// API 개별 연동 키
const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'test_ck_d46qopOB89ObE0OeMB7aVZmM75y0';

// 토스페이먼츠 SDK v1에서 지원하는 결제 메서드 타입
type TossPaymentMethod = '카드' | '카카오페이' | '토스페이' | '계좌이체' | '가상계좌' | '휴대폰';

interface PaymentMethodOption {
  label: string;
  minAmount: number;
  method: TossPaymentMethod;
}

const paymentMethods: PaymentMethodOption[] = [
  { label: '신용/체크카드', minAmount: 100, method: '카드' },
  { label: '카카오페이', minAmount: 100, method: '카카오페이' },
  { label: '토스페이', minAmount: 100, method: '토스페이' },
  { label: '계좌이체', minAmount: 200, method: '계좌이체' },
  { label: '가상계좌', minAmount: 200, method: '가상계좌' },
  { label: '휴대폰 결제', minAmount: 100, method: '휴대폰' },
];

export default function TossPayment({
  amount,
  orderName,
  orderId,
  customerName = '고객',
  customerEmail,
  onSuccess,
  onFail,
  buttonText = '결제하기',
  buttonClassName,
}: TossPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePayment = async () => {
    setIsLoading(true);
    const selectedMethod = paymentMethods[selectedIndex];

    try {
      const tossPayments = await loadTossPayments(CLIENT_KEY);

      // 결제 요청 (v1 SDK) - 카카오페이 등 간편결제를 위해 any 타입 단언 사용
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (tossPayments as any).requestPayment(selectedMethod.method, {
        amount,
        orderId,
        orderName,
        customerName,
        customerEmail,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });

      onSuccess?.();
    } catch (error) {
      console.error('결제 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '결제 중 오류가 발생했습니다.';

      // 사용자가 취소한 경우
      if (errorMessage.includes('USER_CANCEL') || errorMessage.includes('취소') || errorMessage.includes('PAY_PROCESS_CANCELED')) {
        // 취소는 에러로 처리하지 않음
      } else {
        onFail?.(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const defaultClassName = 'w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  // 선택한 결제수단의 최소 금액 확인
  const selectedMethod = paymentMethods[selectedIndex];
  const isAmountValid = amount >= selectedMethod.minAmount;

  return (
    <div className="space-y-4">
      {/* 결제 수단 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">결제 수단 선택</label>
        <div className="grid grid-cols-2 gap-2">
          {paymentMethods.map((method, index) => (
            <button
              key={method.method}
              type="button"
              onClick={() => setSelectedIndex(index)}
              disabled={amount < method.minAmount}
              className={`p-3 text-sm rounded-lg border-2 transition-all ${
                selectedIndex === index
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : amount < method.minAmount
                  ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              {method.label}
              {amount < method.minAmount && (
                <span className="block text-xs text-gray-400">({method.minAmount}원 이상)</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 결제 금액 표시 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">결제 금액</span>
          <span className="text-xl font-bold text-gray-900">{amount.toLocaleString()}원</span>
        </div>
      </div>

      {/* 결제 버튼 */}
      <button
        onClick={handlePayment}
        disabled={isLoading || !isAmountValid}
        className={buttonClassName || defaultClassName}
      >
        {isLoading ? '처리 중...' : `${selectedMethod.label}로 ${amount.toLocaleString()}원 결제`}
      </button>

      <p className="text-xs text-gray-500 text-center">
        결제는 토스페이먼츠를 통해 안전하게 처리됩니다.
      </p>
    </div>
  );
}

// 간단한 결제 버튼 컴포넌트 (바로 카드 결제)
export function SimplePaymentButton({
  amount,
  orderName,
  orderId,
  customerName = '고객',
  customerEmail,
  onSuccess,
  onFail,
  buttonText = '결제하기',
  buttonClassName,
}: TossPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const tossPayments = await loadTossPayments(CLIENT_KEY);

      await tossPayments.requestPayment('카드', {
        amount,
        orderId,
        orderName,
        customerName,
        customerEmail,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });

      onSuccess?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '결제 중 오류가 발생했습니다.';
      onFail?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultClassName = 'w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className={buttonClassName || defaultClassName}
    >
      {isLoading ? '처리 중...' : buttonText}
    </button>
  );
}
