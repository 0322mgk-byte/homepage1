'use client';

import { useState } from 'react';
import { Save, Globe, CreditCard, Bell, Server, Database, HardDrive, CheckCircle, AlertCircle } from 'lucide-react';

interface SiteSettings {
  siteName: string;
  logoUrl: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  instagram: string;
  youtube: string;
  blog: string;
}

interface PaymentSettings {
  tossPayments: boolean;
  kakaoPay: boolean;
  naverPay: boolean;
  bankTransfer: boolean;
  feeRate: number;
}

interface NotificationSettings {
  adminOrderAlert: boolean;
  adminUserSignup: boolean;
  adminRefundRequest: boolean;
  customerOrderConfirm: boolean;
  customerShipping: boolean;
  customerDelivery: boolean;
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'site' | 'payment' | 'notification' | 'system'>('site');

  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: 'AI 활용 수익형 글쓰기',
    logoUrl: '/logo.png',
    contactEmail: 'support@example.com',
    contactPhone: '02-1234-5678',
    address: '서울특별시 강남구 테헤란로 123',
    instagram: 'https://instagram.com/example',
    youtube: 'https://youtube.com/@example',
    blog: 'https://blog.example.com',
  });

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    tossPayments: true,
    kakaoPay: false,
    naverPay: false,
    bankTransfer: true,
    feeRate: 3.5,
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    adminOrderAlert: true,
    adminUserSignup: true,
    adminRefundRequest: true,
    customerOrderConfirm: true,
    customerShipping: true,
    customerDelivery: true,
  });

  const systemInfo = {
    serverStatus: 'healthy',
    dbStatus: 'healthy',
    lastBackup: '2024-01-15 03:00:00',
    serverUptime: '15일 23시간',
    dbSize: '256 MB',
    storageUsed: '2.3 GB / 10 GB',
  };

  const handleSaveSiteSettings = () => {
    alert('사이트 설정이 저장되었습니다.');
  };

  const handleSavePaymentSettings = () => {
    alert('결제 설정이 저장되었습니다.');
  };

  const handleSaveNotificationSettings = () => {
    alert('알림 설정이 저장되었습니다.');
  };

  const tabs = [
    { id: 'site', label: '사이트 설정', icon: Globe },
    { id: 'payment', label: '결제 설정', icon: CreditCard },
    { id: 'notification', label: '알림 설정', icon: Bell },
    { id: 'system', label: '시스템 정보', icon: Server },
  ] as const;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">시스템 설정</h1>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Site Settings */}
          {activeTab === 'site' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">기본 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      사이트명
                    </label>
                    <input
                      type="text"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      로고 URL
                    </label>
                    <input
                      type="text"
                      value={siteSettings.logoUrl}
                      onChange={(e) => setSiteSettings({ ...siteSettings, logoUrl: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">연락처 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      이메일
                    </label>
                    <input
                      type="email"
                      value={siteSettings.contactEmail}
                      onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      전화번호
                    </label>
                    <input
                      type="tel"
                      value={siteSettings.contactPhone}
                      onChange={(e) => setSiteSettings({ ...siteSettings, contactPhone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      주소
                    </label>
                    <input
                      type="text"
                      value={siteSettings.address}
                      onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">소셜 미디어</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instagram
                    </label>
                    <input
                      type="url"
                      value={siteSettings.instagram}
                      onChange={(e) => setSiteSettings({ ...siteSettings, instagram: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      YouTube
                    </label>
                    <input
                      type="url"
                      value={siteSettings.youtube}
                      onChange={(e) => setSiteSettings({ ...siteSettings, youtube: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      블로그
                    </label>
                    <input
                      type="url"
                      value={siteSettings.blog}
                      onChange={(e) => setSiteSettings({ ...siteSettings, blog: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={handleSaveSiteSettings}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  사이트 설정 저장
                </button>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">결제 방법</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">토스페이먼츠</span>
                        <p className="text-sm text-gray-500">카드, 계좌이체, 가상계좌</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={paymentSettings.tossPayments}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, tossPayments: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">카카오페이</span>
                        <p className="text-sm text-gray-500">카카오페이 간편결제</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={paymentSettings.kakaoPay}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, kakaoPay: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">네이버페이</span>
                        <p className="text-sm text-gray-500">네이버페이 간편결제</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={paymentSettings.naverPay}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, naverPay: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">무통장입금</span>
                        <p className="text-sm text-gray-500">계좌 직접 입금</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={paymentSettings.bankTransfer}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, bankTransfer: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">수수료 설정</h3>
                <div className="max-w-xs">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    결제 수수료율 (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={paymentSettings.feeRate}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, feeRate: parseFloat(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">PG사 수수료율을 입력하세요</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={handleSavePaymentSettings}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  결제 설정 저장
                </button>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notification' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">관리자 알림</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700">신규 주문 알림</span>
                      <p className="text-sm text-gray-500">새로운 주문이 들어오면 알림을 받습니다</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.adminOrderAlert}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, adminOrderAlert: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700">회원가입 알림</span>
                      <p className="text-sm text-gray-500">새로운 회원이 가입하면 알림을 받습니다</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.adminUserSignup}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, adminUserSignup: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700">환불 요청 알림</span>
                      <p className="text-sm text-gray-500">환불 요청이 들어오면 알림을 받습니다</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.adminRefundRequest}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, adminRefundRequest: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">고객 알림</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700">주문 확인 메일</span>
                      <p className="text-sm text-gray-500">주문 완료 시 고객에게 확인 메일을 발송합니다</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.customerOrderConfirm}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, customerOrderConfirm: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700">배송 시작 알림</span>
                      <p className="text-sm text-gray-500">배송 시작 시 고객에게 알림을 발송합니다</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.customerShipping}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, customerShipping: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700">배송 완료 알림</span>
                      <p className="text-sm text-gray-500">배송 완료 시 고객에게 알림을 발송합니다</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.customerDelivery}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, customerDelivery: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={handleSaveNotificationSettings}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  알림 설정 저장
                </button>
              </div>
            </div>
          )}

          {/* System Info */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">서버 상태</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Server className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-900">서버 상태</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {systemInfo.serverStatus === 'healthy' ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-green-600 font-medium">정상</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <span className="text-red-600 font-medium">오류</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">업타임: {systemInfo.serverUptime}</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Database className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-900">데이터베이스</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {systemInfo.dbStatus === 'healthy' ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-green-600 font-medium">정상</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <span className="text-red-600 font-medium">오류</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">크기: {systemInfo.dbSize}</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <HardDrive className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-900">스토리지</span>
                    </div>
                    <p className="text-gray-900 font-medium">{systemInfo.storageUsed}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '23%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">백업 정보</h3>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">최근 백업</p>
                      <p className="text-sm text-gray-500">{systemInfo.lastBackup}</p>
                    </div>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors">
                      수동 백업
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">시스템 관리</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">캐시 초기화</p>
                      <p className="text-sm text-gray-500">시스템 캐시를 초기화합니다</p>
                    </div>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors">
                      초기화
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">로그 다운로드</p>
                      <p className="text-sm text-gray-500">최근 7일간의 시스템 로그를 다운로드합니다</p>
                    </div>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors">
                      다운로드
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
