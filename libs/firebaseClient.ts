import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

if (typeof window !== 'undefined' && !getApps().length) {
  initializeApp({
    apiKey: 'AIzaSyB4j38FVuw6336v-UUdV8mHB6RtG9rrV5g',
    authDomain: 'AIzaSyB4j38FVuw6336v-UUdV8mHB6RtG9rrV5g',
    // databaseURL: 'https://myproject-123.firebaseio.com',
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: 'nextjs-auth-ssr.appspot.com',
    messagingSenderId: '902801314391',
    appId: '1:902801314391:web:603e3755ee30d0a3364912',
  });

  getAuth().setPersistence({ type: 'SESSION' });
}
