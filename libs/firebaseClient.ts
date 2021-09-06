import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

if (typeof window !== 'undefined' && !getApps().length) {
  initializeApp({
    apiKey: 'APIKEY',
    authDomain: 'myproject-123.firebaseapp.com',
    databaseURL: 'https://myproject-123.firebaseio.com',
    projectId: 'myproject-123',
    storageBucket: 'myproject-123.appspot.com',
    messagingSenderId: '123412341234',
    appId: '1:1234123412341234:web:1234123421342134d',
  });

  getAuth().setPersistence({ type: 'SESSION' });
}
