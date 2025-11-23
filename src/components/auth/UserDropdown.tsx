"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { User, ShoppingBag, Settings, LogOut, ChevronDown } from "lucide-react";
import Image from "next/image";

interface UserDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 transition-all"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "User"}
            width={28}
            height={28}
            className="rounded-full"
          />
        ) : (
          <div className="w-7 h-7 bg-primary/50 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        )}
        <span className="text-white text-sm font-medium max-w-[100px] truncate">
          {user.name || user.email?.split("@")[0]}
        </span>
        <ChevronDown className={`w-4 h-4 text-white transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 backdrop-blur-xl bg-white/95 border border-white/20 rounded-xl shadow-xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          <div className="py-1">
            <Link
              href="/mypage/profile"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>내 정보</span>
            </Link>
            <Link
              href="/mypage/orders"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>주문내역</span>
            </Link>
            <Link
              href="/mypage/settings"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>설정</span>
            </Link>
          </div>

          <div className="border-t border-gray-200 py-1">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>로그아웃</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
