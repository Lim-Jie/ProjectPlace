// firebaseAdmin.js
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: "YOUR_CLIENT_EMAIL",
      privateKey: "YOUR_PRIVATE_KEY".replace(/\\n/g, '\n'),
    }),
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  });
}

const db = admin.firestore();

export { db };
