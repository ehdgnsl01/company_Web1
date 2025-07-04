import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Client-side Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID!,
};

// Prevent multiple initializations
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Exports
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
