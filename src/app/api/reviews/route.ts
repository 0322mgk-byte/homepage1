import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

// 리뷰 데이터 타입
export interface Review {
  id: string;
  productId: string;
  productName: string;
  userId: string;
  userName: string;
  userEmail: string;
  userImage?: string;
  rating: number;
  content: string;
  images?: string[];
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

// GET: 리뷰 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: '상품 ID가 필요합니다.' }, { status: 400 });
    }

    // Firebase에서 리뷰 데이터 조회
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, where('productId', '==', productId));

    const snapshot = await getDocs(q);
    let reviews = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Review[];

    // 클라이언트 사이드에서 정렬 (최신순)
    reviews = reviews.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('리뷰 조회 오류:', error);
    return NextResponse.json({ error: '리뷰 조회에 실패했습니다.' }, { status: 500 });
  }
}

// POST: 새 리뷰 생성
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const body = await request.json();
    const { productId, productName, rating, content, images } = body;

    // 유효성 검사
    if (!productId || !productName) {
      return NextResponse.json({ error: '상품 정보가 필요합니다.' }, { status: 400 });
    }
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: '별점은 1~5 사이여야 합니다.' }, { status: 400 });
    }
    if (!content || content.trim().length < 10) {
      return NextResponse.json({ error: '리뷰는 최소 10자 이상이어야 합니다.' }, { status: 400 });
    }

    // 중복 리뷰 확인
    const reviewsRef = collection(db, 'reviews');
    const existingQuery = query(
      reviewsRef,
      where('productId', '==', productId),
      where('userEmail', '==', session.user.email)
    );
    const existingSnapshot = await getDocs(existingQuery);

    if (!existingSnapshot.empty) {
      return NextResponse.json({ error: '이미 이 상품에 리뷰를 작성하셨습니다.' }, { status: 400 });
    }

    const newReview: Omit<Review, 'id'> = {
      productId,
      productName,
      userId: session.user.email,
      userName: session.user.name || '익명 사용자',
      userEmail: session.user.email,
      userImage: session.user.image || undefined,
      rating,
      content: content.trim(),
      images: images || [],
      helpful: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Firebase에 리뷰 데이터 저장
    const docRef = await addDoc(collection(db, 'reviews'), newReview);

    return NextResponse.json({
      success: true,
      review: { id: docRef.id, ...newReview }
    });
  } catch (error) {
    console.error('리뷰 생성 오류:', error);
    return NextResponse.json({ error: '리뷰 작성에 실패했습니다.' }, { status: 500 });
  }
}
