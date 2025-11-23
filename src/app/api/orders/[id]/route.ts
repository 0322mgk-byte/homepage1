import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// GET: 단일 주문 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    // Firebase에서 주문 데이터 조회
    const docRef = doc(db, 'orders', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: '주문을 찾을 수 없습니다.' }, { status: 404 });
    }

    const order = { id: docSnap.id, ...docSnap.data() };

    return NextResponse.json({ order });
  } catch (error) {
    console.error('주문 조회 오류:', error);
    return NextResponse.json({ error: '주문 조회에 실패했습니다.' }, { status: 500 });
  }
}

// PATCH: 주문 상태 업데이트
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const body = await request.json();
    const { status } = body;

    // Firebase에서 주문 상태 업데이트
    const docRef = doc(db, 'orders', id);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, orderId: id, status });
  } catch (error) {
    console.error('주문 업데이트 오류:', error);
    return NextResponse.json({ error: '주문 업데이트에 실패했습니다.' }, { status: 500 });
  }
}

// DELETE: 주문 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    // Firebase에서 주문 삭제
    const docRef = doc(db, 'orders', id);
    await deleteDoc(docRef);

    return NextResponse.json({ success: true, orderId: id });
  } catch (error) {
    console.error('주문 삭제 오류:', error);
    return NextResponse.json({ error: '주문 삭제에 실패했습니다.' }, { status: 500 });
  }
}
