'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { User, Plus, Trash2 } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  isDefault: boolean;
}

// 임시 주소 데이터
const initialAddresses: Address[] = [
  {
    id: '1',
    name: '집',
    address: '서울특별시 강남구 테헤란로 123',
    detailAddress: '101동 1001호',
    zipCode: '06234',
    isDefault: true,
  },
];

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    phone: '',
    birthDate: '',
  });

  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    detailAddress: '',
    zipCode: '',
    isDefault: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // 실제로는 API 호출
    setIsEditing(false);
    alert('저장되었습니다.');
  };

  const handleAddAddress = () => {
    const address: Address = {
      id: Date.now().toString(),
      ...newAddress,
    };
    setAddresses((prev) => [...prev, address]);
    setNewAddress({
      name: '',
      address: '',
      detailAddress: '',
      zipCode: '',
      isDefault: false,
    });
    setShowAddressModal(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">내 정보</h1>

      {/* 기본 정보 수정 */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">기본 정보</h2>
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {isEditing ? '저장' : '수정'}
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* 프로필 이미지 */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="프로필"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-gray-400" />
              )}
            </div>
            {isEditing && (
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                이미지 변경
              </button>
            )}
          </div>

          {/* 입력 필드들 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이름
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{session?.user?.name || '-'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                전화번호
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="010-0000-0000"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{formData.phone || '-'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                생년월일
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{formData.birthDate || '-'}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 계정 정보 */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">계정 정보</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <p className="text-gray-900">{session?.user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">이메일은 변경할 수 없습니다</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors">
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>

      {/* 주소 관리 */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">배송지 관리</h2>
          <button
            onClick={() => setShowAddressModal(true)}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <Plus className="w-4 h-4" />
            새 주소 추가
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div key={address.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-900">{address.name}</span>
                      {address.isDefault && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                          기본 배송지
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">[{address.zipCode}]</p>
                    <p className="text-gray-600">
                      {address.address} {address.detailAddress}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        기본으로 설정
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              등록된 배송지가 없습니다
            </div>
          )}
        </div>
      </div>

      {/* 주소 추가 모달 */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">새 주소 추가</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  배송지명
                </label>
                <input
                  type="text"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="예: 집, 회사"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  우편번호
                </label>
                <input
                  type="text"
                  value={newAddress.zipCode}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, zipCode: e.target.value }))}
                  placeholder="12345"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  주소
                </label>
                <input
                  type="text"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, address: e.target.value }))}
                  placeholder="기본 주소"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  상세 주소
                </label>
                <input
                  type="text"
                  value={newAddress.detailAddress}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, detailAddress: e.target.value }))}
                  placeholder="상세 주소"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={newAddress.isDefault}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, isDefault: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <label htmlFor="isDefault" className="text-sm text-gray-700">
                  기본 배송지로 설정
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddressModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleAddAddress}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
