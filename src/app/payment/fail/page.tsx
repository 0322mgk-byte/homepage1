import { Metadata } from 'next';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '결제 실패 | AI MONEY',
  description: '결제가 실패했습니다.',
};

interface PageProps {
  searchParams: Promise<{
    code?: string;
    message?: string;
    orderId?: string;
  }>;
}

export default async function PaymentFailPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { code, message, orderId } = params;

  return (
    <>
      <Navigation />
      <main className="min-h-screen flex items-center justify-center py-16">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">결제에 실패했습니다</h1>
            <p className="text-gray-600 mb-6">
              결제 처리 중 문제가 발생했습니다.
              다시 시도하시거나, 문제가 계속되면 고객센터로 문의해 주세요.
            </p>

            {(code || message) && (
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6 text-left">
                {code && (
                  <>
                    <div className="text-sm text-red-600 mb-1">오류 코드</div>
                    <div className="text-red-800 font-mono text-sm mb-2">{code}</div>
                  </>
                )}
                {message && (
                  <>
                    <div className="text-sm text-red-600 mb-1">오류 메시지</div>
                    <div className="text-red-800 text-sm">{message}</div>
                  </>
                )}
              </div>
            )}

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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
