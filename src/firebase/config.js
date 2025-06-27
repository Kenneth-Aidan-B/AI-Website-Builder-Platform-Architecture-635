import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "builderforge-ai.firebaseapp.com",
  projectId: "builderforge-ai",
  storageBucket: "builderforge-ai.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id-here"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;