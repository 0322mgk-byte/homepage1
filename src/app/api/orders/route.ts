import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

// 주문 데이터 타입
export interface Order {
  id: string;
  orderId: string;
  userId: string;
  userEmail: string;
  userName: string;
  productName: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  paymentMethod: string;
  paymentKey?: string;
  createdAt: string;
  updatedAt: string;
}

// GET: 주문 목록 조회
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';

    // Firebase에서 주문 데이터 조회
    const ordersRef = collection(db, 'orders');
    let q;

    if (isAdmin) {
      // 관리자: 모든 주문 조회
      q = query(ordersRef);
    } else {
      // 일반 사용자: 본인 주문만 조회
      q = query(ordersRef, where('userEmail', '==', session.user.email));
    }

    const snapshot = await getDocs(q);
    let orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];

    // 클라이언트 사이드에서 정렬 (복합 인덱스 없이)
    orders = orders.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('주문 조회 오류:', error);
    return NextResponse.json({ error: '주문 조회에 실패했습니다.' }, { status: 500 });
  }
}

// POST: 새 주문 생성
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const body = await request.json();
    const { orderId, productName, amount, paymentMethod, paymentKey } = body;

    const newOrder: Omit<Order, 'id'> = {
      orderId,
      userId: session.user.email,
      userEmail: session.user.email,
      userName: session.user.name || '고객',
      productName,
      amount,
      status: 'paid',
      paymentMethod,
      paymentKey,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Firebase에 주문 데이터 저장
    const docRef = await addDoc(collection(db, 'orders'), newOrder);

    return NextResponse.json({
      success: true,
      order: { id: docRef.id, ...newOrder }
    });
  } catch (error) {
    console.error('주문 생성 오류:', error);
    return NextResponse.json({ error: '주문 생성에 실패했습니다.' }, { status: 500 });
  }
}
