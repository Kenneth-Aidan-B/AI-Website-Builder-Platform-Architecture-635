import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Default configuration - will gracefully fail if not properly configured
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "builderforge-ai.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "builderforge-ai",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "builderforge-ai.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "demo-app-id"
};

let app, auth, db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.log('Firebase not configured, demo mode will be used');
  // Create dummy objects to prevent errors
  auth = null;
  db = null;
}

export { auth, db };
export default app;