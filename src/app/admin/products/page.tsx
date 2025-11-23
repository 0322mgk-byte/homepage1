'use client';

import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  status: 'active' | 'inactive' | 'discontinued';
  isVisible: boolean;
  salesCount: number;
  createdAt: string;
}

// 임시 데이터
const mockProducts: Product[] = [
  {
    id: 'free',
    name: '무료 특강',
    price: 0,
    category: '기본형',
    status: 'active',
    isVisible: true,
    salesCount: 4200,
    createdAt: '2023-01-01',
  },
  {
    id: 'basic',
    name: '베이직 코스',
    price: 197000,
    originalPrice: 297000,
    category: '기본형',
    status: 'active',
    isVisible: true,
    salesCount: 1850,
    createdAt: '2023-01-01',
  },
  {
    id: 'premium',
    name: '프리미엄 코스',
    price: 497000,
    originalPrice: 697000,
    category: '프리미엄',
    status: 'active',
    isVisible: true,
    salesCount: 890,
    createdAt: '2023-03-01',
  },
  {
    id: 'enterprise',
    name: '기업 교육',
    price: 0,
    category: '엔터프라이즈',
    status: 'active',
    isVisible: true,
    salesCount: 120,
    createdAt: '2023-06-01',
  },
];

const statusMap: Record<string, { label: string; color: string }> = {
  active: { label: '판매중', color: 'bg-green-100 text-green-700' },
  inactive: { label: '품절', color: 'bg-yellow-100 text-yellow-700' },
  discontinued: { label: '단종', color: 'bg-red-100 text-red-700' },
};

const categoryOptions = ['전체', '기본형', '프리미엄', '엔터프라이즈'];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === '전체' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleToggleVisibility = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isVisible: !p.isVisible } : p
      )
    );
  };

  const handleStatusChange = (productId: string, newStatus: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, status: newStatus as Product['status'] } : p
      )
    );
  };

  const handleDelete = (productId: string) => {
    if (confirm('정말 이 상품을 삭제하시겠습니까?')) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      );
      setEditingProduct(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">상품 관리</h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Plus className="w-5 h-5" />
          새 상품 추가
        </button>
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
                placeholder="상품명 검색..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">상품명</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">카테고리</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-700">가격</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-700">판매량</th>
              <th className="text-center py-4 px-6 text-sm font-medium text-gray-700">상태</th>
              <th className="text-center py-4 px-6 text-sm font-medium text-gray-700">노출</th>
              <th className="text-center py-4 px-6 text-sm font-medium text-gray-700">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.id}</p>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">{product.category}</td>
                <td className="py-4 px-6 text-right">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {product.price === 0 ? '무료' : `${product.price.toLocaleString()}원`}
                    </p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">
                        {product.originalPrice.toLocaleString()}원
                      </p>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6 text-right font-medium text-gray-900">
                  {product.salesCount.toLocaleString()}
                </td>
                <td className="py-4 px-6 text-center">
                  <select
                    value={product.status}
                    onChange={(e) => handleStatusChange(product.id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded-full border-0 ${statusMap[product.status].color}`}
                  >
                    <option value="active">판매중</option>
                    <option value="inactive">품절</option>
                    <option value="discontinued">단종</option>
                  </select>
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => handleToggleVisibility(product.id)}
                    className={`p-2 rounded-lg ${
                      product.isVisible
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {product.isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">상품 수정</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상품명</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">가격</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">원가</label>
                <input
                  type="number"
                  value={editingProduct.originalPrice || ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      originalPrice: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, category: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categoryOptions.filter((c) => c !== '전체').map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingProduct(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
