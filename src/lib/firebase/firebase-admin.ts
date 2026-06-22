import { initializeApp, getApps, cert } from "firebase-admin/app";
import * as admin from 'firebase-admin';

const privateKey = process.env.FIREBASE_ADMIN_KEY?.replace(/"/g, '').replace(/\\n/g, '\n')

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
    databaseURL: process.env.FIREBASE_ADMIN_DB_URL,
  });
} 

export const authAdmin = admin.auth()
export const dbAdmin = admin.database()

