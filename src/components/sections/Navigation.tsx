'use client';

import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById('signup-form');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-gray-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xl font-bold"
          >
            <Sparkles className="w-6 h-6 text-accent" />
            <span className="text-white">AI</span>
            <span className="text-accent">MONEY</span>
          </button>

          <Button onClick={scrollToForm} size="sm">
            지금 신청하기
          </Button>
        </div>
      </div>
    </nav>
  );
}
