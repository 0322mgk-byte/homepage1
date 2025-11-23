import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let app: App;

// Firebase Admin 초기화
if (!getApps().length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && privateKey) {
    app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  } else {
    // 환경변수가 없으면 기본 초기화
    app = initializeApp({
      projectId: 'toktokmedia',
    });
  }
} else {
  app = getApps()[0];
}

// Firestore Admin
export const adminDb = getFirestore(app);

// Firebase Auth Admin
export const adminAuth = getAuth(app);

export default app;
