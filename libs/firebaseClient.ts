import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  User,
  browserSessionPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  onIdTokenChanged as onIdTokenChangedFirebase,
  signOut as signOutFirebase,
} from 'firebase/auth';

let app = getApps()[0];
let auth;

const googleProvider = new GoogleAuthProvider();

if (typeof window !== 'undefined' && !app) {
  app = initializeApp({
    apiKey: 'AIzaSyB4j38FVuw6336v-UUdV8mHB6RtG9rrV5g',
    authDomain: 'nextjs-auth-ssr.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: 'nextjs-auth-ssr.appspot.com',
    messagingSenderId: '902801314391',
    appId: '1:902801314391:web:603e3755ee30d0a3364912',
  });

  (window as any).firebase = app;

  auth = getAuth(app);
  setPersistence(auth, browserSessionPersistence);
}

export function onIdTokenChanged(callback: (user: User | null) => void) {
  onIdTokenChangedFirebase(getAuth(app), async changedUser => {
    callback(changedUser);
  });
}

export async function signInWithGoogle() {
  const { user } = await signInWithPopup(getAuth(app), googleProvider);
  if (!user.email) {
    throw Error('When logging in, the user must have an email');
  }

  return { email: user.email, uid: user.uid };
}

export async function signOut() {
  await signOutFirebase(getAuth(app));
}
