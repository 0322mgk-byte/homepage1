import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// GET: 단일 사용자 조회
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

    // Firebase에서 사용자 데이터 조회
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    const user = { id: docSnap.id, ...docSnap.data() };

    return NextResponse.json({ user });
  } catch (error) {
    console.error('사용자 조회 오류:', error);
    return NextResponse.json({ error: '사용자 조회에 실패했습니다.' }, { status: 500 });
  }
}

// PATCH: 사용자 정보 업데이트
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
    const { role, status, name } = body;

    // 업데이트할 필드만 추출
    const updateData: Record<string, string> = {};
    if (role) updateData.role = role;
    if (status) updateData.status = status;
    if (name) updateData.name = name;
    updateData.updatedAt = new Date().toISOString();

    // Firebase에서 사용자 정보 업데이트
    const docRef = doc(db, 'users', id);
    await updateDoc(docRef, updateData);

    return NextResponse.json({ success: true, userId: id, ...updateData });
  } catch (error) {
    console.error('사용자 업데이트 오류:', error);
    return NextResponse.json({ error: '사용자 업데이트에 실패했습니다.' }, { status: 500 });
  }
}

// DELETE: 사용자 삭제
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

    // Firebase에서 사용자 삭제
    const docRef = doc(db, 'users', id);
    await deleteDoc(docRef);

    return NextResponse.json({ success: true, userId: id });
  } catch (error) {
    console.error('사용자 삭제 오류:', error);
    return NextResponse.json({ error: '사용자 삭제에 실패했습니다.' }, { status: 500 });
  }
}
