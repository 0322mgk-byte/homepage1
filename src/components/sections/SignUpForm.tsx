'use client';

import { useState, FormEvent } from 'react';
import { CheckCircle, Send } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { submitToGoogleSheet, FormData } from '@/services/googleSheetService';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function SignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await submitToGoogleSheet(formData);
      if (response.success) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '' });
      } else {
        setStatus('error');
        setErrorMessage(response.message);
      }
    } catch {
      setStatus('error');
      setErrorMessage('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  if (status === 'success') {
    return (
      <section id="signup-form" className="py-20 px-4 bg-background-secondary">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-background rounded-2xl p-10 border border-green-500/30">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">신청 완료!</h3>
            <p className="text-text-secondary">
              입력하신 연락처로 특강 안내를 보내드립니다.
              <br />
              카카오톡 메시지를 확인해주세요.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="signup-form" className="py-20 px-4 bg-background-secondary">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-accent">무료</span> 특강 신청
          </h2>
          <p className="text-text-secondary">
            지금 신청하시면 AI 글쓰기 템플릿을 무료로 드립니다
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-background rounded-2xl p-8 border border-gray-800"
        >
          <div className="space-y-5">
            <Input
              label="이름"
              type="text"
              placeholder="홍길동"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="연락처 (카카오톡 알림용)"
              type="tel"
              placeholder="010-1234-5678"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Input
              label="이메일 (강의 자료 발송용)"
              type="email"
              placeholder="email@example.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {status === 'error' && (
            <p className="mt-4 text-sm text-red-500 text-center">{errorMessage}</p>
          )}

          <Button
            type="submit"
            className="w-full mt-6"
            size="lg"
            isLoading={status === 'loading'}
          >
            <Send className="w-5 h-5 mr-2" />
            무료 특강 신청하기
          </Button>

          <p className="mt-4 text-xs text-text-secondary text-center">
            신청 시 <span className="text-primary underline cursor-pointer">개인정보처리방침</span>에 동의하게 됩니다.
          </p>
        </form>
      </div>
    </section>
  );
}
