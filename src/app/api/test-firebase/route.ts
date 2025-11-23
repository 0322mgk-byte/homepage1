import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    // Firebase 클라이언트 SDK로 users 컬렉션 읽기
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);

    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // orders 컬렉션도 읽기
    const ordersRef = collection(db, 'orders');
    const ordersSnapshot = await getDocs(ordersRef);

    const orders = ordersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      success: true,
      message: 'Firebase 연결 성공',
      usersCount: users.length,
      users: users,
      ordersCount: orders.length,
      orders: orders,
    });
  } catch (error) {
    console.error('Firebase 테스트 오류:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    // 테스트 사용자 생성
    const usersRef = collection(db, 'users');
    const testUser = {
      email: 'test@example.com',
      name: '테스트 사용자',
      role: 'user',
      status: 'active',
      provider: 'test',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    const docRef = await addDoc(usersRef, testUser);

    return NextResponse.json({
      success: true,
      message: '테스트 사용자 생성 성공',
      userId: docRef.id,
      user: testUser,
    });
  } catch (error) {
    console.error('Firebase 쓰기 테스트 오류:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
