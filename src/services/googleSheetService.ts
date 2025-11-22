export interface FormData {
  name: string;
  phone: string;
  email: string;
}

export interface SubmitResponse {
  success: boolean;
  message: string;
}

// Google Apps Script 웹 앱 URL을 여기에 입력하세요
// Apps Script 배포 후 생성되는 URL로 교체해야 합니다
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

export async function submitToGoogleSheet(data: FormData): Promise<SubmitResponse> {
  // Google Script URL이 설정되지 않은 경우 Mock 응답
  if (!GOOGLE_SCRIPT_URL) {
    console.warn('Google Script URL이 설정되지 않았습니다. Mock 응답을 반환합니다.');
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form data submitted (Mock):', data);
        resolve({
          success: true,
          message: '신청이 완료되었습니다!',
        });
      }, 1500);
    });
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // CORS 이슈 방지
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        timestamp: new Date().toISOString(),
      }),
    });

    // no-cors 모드에서는 response를 읽을 수 없으므로 성공으로 처리
    return {
      success: true,
      message: '신청이 완료되었습니다!',
    };
  } catch (error) {
    console.error('Google Sheet 저장 오류:', error);
    return {
      success: false,
      message: '오류가 발생했습니다. 다시 시도해주세요.',
    };
  }
}
