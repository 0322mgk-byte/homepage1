import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';
import AuthGuard from '@/components/auth/AuthGuard';
import SidebarNav from '@/components/mypage/SidebarNav';
import MobileNav from '@/components/mypage/MobileNav';

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <MobileNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-24">
                <SidebarNav />
              </div>
            </div>
            <div className="lg:col-span-3">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </AuthGuard>
  );
}
