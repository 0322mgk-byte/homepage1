'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 임시: 로그인된 사용자는 모두 관리자로 간주 (실제 운영 시 role 확인 필요)
  const isAdmin = !!session?.user;

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && !isAdmin) {
      router.push('/');
    }
  }, [status, isAdmin, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">권한 확인 중...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
