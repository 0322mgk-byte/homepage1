'use client';

import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, MoreHorizontal, Eye, Edit, Trash2, Loader2 } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLoginAt?: string;
}

const roleOptions = [
  { value: 'all', label: '전체 역할' },
  { value: 'user', label: '사용자' },
  { value: 'admin', label: '관리자' },
];

const statusOptions = [
  { value: 'all', label: '전체 상태' },
  { value: 'active', label: '활성' },
  { value: 'inactive', label: '비활성' },
  { value: 'suspended', label: '정지' },
];

const statusMap: Record<string, { label: string; color: string }> = {
  active: { label: '활성', color: 'bg-green-100 text-green-700' },
  inactive: { label: '비활성', color: 'bg-gray-100 text-gray-700' },
  suspended: { label: '정지', color: 'bg-red-100 text-red-700' },
};

const roleMap: Record<string, { label: string; color: string }> = {
  user: { label: '사용자', color: 'bg-blue-100 text-blue-700' },
  admin: { label: '관리자', color: 'bg-purple-100 text-purple-700' },
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const usersPerPage = 20;

  // API에서 사용자 데이터 가져오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        if (data.users) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error('사용자 조회 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, status: newStatus as User['status'] } : u))
        );
      }
    } catch (error) {
      console.error('상태 변경 오류:', error);
    }
    setActionMenuOpen(null);
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole as User['role'] } : u))
        );
      }
    } catch (error) {
      console.error('역할 변경 오류:', error);
    }
    setActionMenuOpen(null);
  };

  const handleDelete = async (userId: string) => {
    if (confirm('정말 이 사용자를 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setUsers((prev) => prev.filter((u) => u.id !== userId));
        }
      } catch (error) {
        console.error('사용자 삭제 오류:', error);
      }
    }
    setActionMenuOpen(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">사용자 관리</h1>
        <span className="text-sm text-gray-500">총 {filteredUsers.length}명</span>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="이름, 이메일 검색..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">ID</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">이름</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">이메일</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">가입일</th>
              <th className="text-center py-4 px-6 text-sm font-medium text-gray-700">역할</th>
              <th className="text-center py-4 px-6 text-sm font-medium text-gray-700">상태</th>
              <th className="text-center py-4 px-6 text-sm font-medium text-gray-700">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-gray-500 font-mono">{user.id}</td>
                <td className="py-4 px-6 font-medium text-gray-900">{user.name}</td>
                <td className="py-4 px-6 text-gray-600">{user.email}</td>
                <td className="py-4 px-6 text-gray-500">{user.createdAt}</td>
                <td className="py-4 px-6 text-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${roleMap[user.role].color}`}>
                    {roleMap[user.role].label}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${statusMap[user.status].color}`}>
                    {statusMap[user.status].label}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="relative flex justify-center">
                    <button
                      onClick={() => setActionMenuOpen(actionMenuOpen === user.id ? null : user.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <MoreHorizontal className="w-5 h-5 text-gray-500" />
                    </button>
                    {actionMenuOpen === user.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Eye className="w-4 h-4" />
                          상세보기
                        </button>
                        <button
                          onClick={() => handleRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit className="w-4 h-4" />
                          역할 변경
                        </button>
                        <button
                          onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'suspended' : 'active')}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit className="w-4 h-4" />
                          상태 변경
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = currentPage <= 3 ? i + 1 : currentPage + i - 2;
            if (page > totalPages) return null;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">사용자 상세 정보</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">ID</label>
                <p className="font-mono text-gray-900">{selectedUser.id}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">이름</label>
                <p className="text-gray-900">{selectedUser.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">이메일</label>
                <p className="text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">역할</label>
                <p className="text-gray-900">{roleMap[selectedUser.role].label}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">상태</label>
                <p className="text-gray-900">{statusMap[selectedUser.status].label}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">가입일</label>
                <p className="text-gray-900">{selectedUser.createdAt}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">마지막 로그인</label>
                <p className="text-gray-900">{selectedUser.lastLoginAt || '-'}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedUser(null)}
              className="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
