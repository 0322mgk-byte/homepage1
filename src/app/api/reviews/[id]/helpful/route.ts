import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';

// POST: 도움됨 카운트 증가
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const { id: reviewId } = await params;

    if (!reviewId) {
      return NextResponse.json({ error: '리뷰 ID가 필요합니다.' }, { status: 400 });
    }

    // 리뷰 존재 여부 확인
    const reviewRef = doc(db, 'reviews', reviewId);
    const reviewSnap = await getDoc(reviewRef);

    if (!reviewSnap.exists()) {
      return NextResponse.json({ error: '리뷰를 찾을 수 없습니다.' }, { status: 404 });
    }

    // 도움됨 카운트 증가
    await updateDoc(reviewRef, {
      helpful: increment(1),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('도움됨 업데이트 오류:', error);
    return NextResponse.json({ error: '업데이트에 실패했습니다.' }, { status: 500 });
  }
}
