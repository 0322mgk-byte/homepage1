'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';

interface NotificationSettings {
  emailOrder: boolean;
  emailShipping: boolean;
  emailMarketing: boolean;
  smsNotification: boolean;
  pushNotification: boolean;
}

interface PrivacySettings {
  privacyPolicy: boolean;
  marketingConsent: boolean;
  thirdPartyConsent: boolean;
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailOrder: true,
    emailShipping: true,
    emailMarketing: false,
    smsNotification: false,
    pushNotification: true,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    privacyPolicy: true,
    marketingConsent: false,
    thirdPartyConsent: false,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePrivacyChange = (key: keyof PrivacySettings) => {
    if (key === 'privacyPolicy') return; // 필수 동의는 변경 불가
    setPrivacy((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveNotifications = () => {
    alert('알림 설정이 저장되었습니다.');
  };

  const handleSavePrivacy = () => {
    alert('개인정보 설정이 저장되었습니다.');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText === '회원탈퇴') {
      // 실제로는 API 호출 후 로그아웃
      alert('회원탈퇴가 완료되었습니다.');
      signOut({ callbackUrl: '/' });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">설정</h1>

      {/* 알림 설정 */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">알림 설정</h2>
          <p className="text-sm text-gray-500 mt-1">수신할 알림을 선택하세요</p>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">이메일 알림</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div>
                  <span className="text-gray-700">주문 알림</span>
                  <p className="text-sm text-gray-500">주문 확인 및 상태 변경 알림</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.emailOrder}
                  onChange={() => handleNotificationChange('emailOrder')}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <span className="text-gray-700">배송 알림</span>
                  <p className="text-sm text-gray-500">배송 시작 및 완료 알림</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.emailShipping}
                  onChange={() => handleNotificationChange('emailShipping')}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <span className="text-gray-700">마케팅 알림</span>
                  <p className="text-sm text-gray-500">이벤트, 프로모션 등 마케팅 정보</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.emailMarketing}
                  onChange={() => handleNotificationChange('emailMarketing')}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">기타 알림</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div>
                  <span className="text-gray-700">SMS 알림</span>
                  <p className="text-sm text-gray-500">문자 메시지 수신</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.smsNotification}
                  onChange={() => handleNotificationChange('smsNotification')}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <span className="text-gray-700">푸시 알림</span>
                  <p className="text-sm text-gray-500">앱/브라우저 푸시 알림</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.pushNotification}
                  onChange={() => handleNotificationChange('pushNotification')}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSaveNotifications}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
            >
              알림 설정 저장
            </button>
          </div>
        </div>
      </div>

      {/* 개인정보 설정 */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">개인정보 설정</h2>
          <p className="text-sm text-gray-500 mt-1">개인정보 수집 및 활용 동의를 관리합니다</p>
        </div>
        <div className="p-6 space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">개인정보 처리방침 동의</span>
              <span className="text-red-500 ml-1">(필수)</span>
              <p className="text-sm text-gray-500">서비스 이용을 위한 필수 동의</p>
            </div>
            <input
              type="checkbox"
              checked={privacy.privacyPolicy}
              disabled
              className="w-5 h-5 rounded border-gray-300 text-blue-600 bg-gray-100"
            />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">마케팅 정보 수신 동의</span>
              <span className="text-gray-400 ml-1">(선택)</span>
              <p className="text-sm text-gray-500">이벤트, 혜택 등 마케팅 정보 수신</p>
            </div>
            <input
              type="checkbox"
              checked={privacy.marketingConsent}
              onChange={() => handlePrivacyChange('marketingConsent')}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <span className="text-gray-700">제3자 정보제공 동의</span>
              <span className="text-gray-400 ml-1">(선택)</span>
              <p className="text-sm text-gray-500">파트너사 정보 공유 동의</p>
            </div>
            <input
              type="checkbox"
              checked={privacy.thirdPartyConsent}
              onChange={() => handlePrivacyChange('thirdPartyConsent')}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </label>

          <div className="pt-4">
            <button
              onClick={handleSavePrivacy}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
            >
              개인정보 설정 저장
            </button>
          </div>
        </div>
      </div>

      {/* 계정 관리 */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">계정 관리</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <span className="font-medium text-gray-900">비밀번호 변경</span>
              <p className="text-sm text-gray-500">계정 보안을 위해 주기적으로 변경하세요</p>
            </div>
            <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors">
              변경하기
            </button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <span className="font-medium text-gray-900">이메일 변경</span>
              <p className="text-sm text-gray-500">로그인에 사용되는 이메일을 변경합니다</p>
            </div>
            <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors">
              변경하기
            </button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <span className="font-medium text-red-600">회원탈퇴</span>
              <p className="text-sm text-gray-500">
                탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다
              </p>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-sm bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-md transition-colors"
            >
              탈퇴하기
            </button>
          </div>
        </div>
      </div>

      {/* 회원탈퇴 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">회원탈퇴</h3>
            <p className="text-gray-600 mb-4">
              정말 탈퇴하시겠습니까? 탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
            </p>
            <p className="text-sm text-gray-500 mb-2">
              탈퇴를 원하시면 아래에 &quot;회원탈퇴&quot;를 입력하세요.
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="회원탈퇴"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== '회원탈퇴'}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:cursor-not-allowed"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
