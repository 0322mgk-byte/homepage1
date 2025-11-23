import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// POST: 이미지 업로드
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'reviews';

    if (!file) {
      return NextResponse.json({ error: '파일이 필요합니다.' }, { status: 400 });
    }

    // 파일 타입 검증
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        error: '지원하지 않는 파일 형식입니다. (JPG, PNG, GIF, WEBP만 가능)'
      }, { status: 400 });
    }

    // 파일 크기 검증 (5MB 제한)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({
        error: '파일 크기는 5MB 이하여야 합니다.'
      }, { status: 400 });
    }

    // 파일명 생성 (고유한 이름)
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split('.').pop();
    const fileName = `${folder}/${timestamp}_${randomStr}.${extension}`;

    // 파일을 ArrayBuffer로 변환
    const bytes = await file.arrayBuffer();
    const buffer = new Uint8Array(bytes);

    // Firebase Storage에 업로드
    const storageRef = ref(storage, fileName);
    const snapshot = await uploadBytes(storageRef, buffer, {
      contentType: file.type,
    });

    // 다운로드 URL 가져오기
    const downloadURL = await getDownloadURL(snapshot.ref);

    return NextResponse.json({
      success: true,
      url: downloadURL,
      fileName: fileName,
    });
  } catch (error) {
    console.error('이미지 업로드 오류:', error);
    return NextResponse.json({
      error: '이미지 업로드에 실패했습니다.'
    }, { status: 500 });
  }
}
