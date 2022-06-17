import { initializeApp } from "firebase/app";

import { 
    getAuth,                        // authentication 설정
    signInWithEmailAndPassword,     // email 로그인
    createUserWithEmailAndPassword, // email 회원가입
    deleteUser,                     // user 삭제
    onAuthStateChanged,
    signOut
  } from 'firebase/auth';

import {
  getDatabase,
  ref,
  child,
  set,
  push,
  onValue,
  get,
  update,
  query,
  equalTo,
  orderByChild,
  orderByKey,
  orderByValue,
  startAt,
  endAt
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBoOUL86RuOr8Wc81RrXxnoLorszr1-bzk",
  authDomain: "babilkey.firebaseapp.com",
  databaseURL: "https://babilkey-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "babilkey",
  storageBucket: "babilkey.appspot.com",
  messagingSenderId: "280198663302",
  appId: "1:280198663302:web:c9c429dcc79cc6888ad507"
};

const app = initializeApp(firebaseConfig);

//auth
export const auth = getAuth(app);
export const createUserEmail = createUserWithEmailAndPassword;
export const signInEmail = signInWithEmailAndPassword;
export const authDeleteUser = deleteUser;
export const _onAuthStateChanged = onAuthStateChanged;
export const _signOut = signOut;

//RTDB
export const db = getDatabase(app);
export const dbRef = ref;
export const dbChild = child;
export const dbSet = set;
export const dbPush = push;
export const dbOnValue = onValue;
export const dbGet = get;
export const dbUpdate = update;
export const dbQuery = query;
export const queryEqualTo = equalTo;
export const queryOrderByChild = orderByChild;
export const queryOrderByKey = orderByKey;
export const queryOrderByValue = orderByValue;
export const queryStartAt = startAt;
export const queryEndAt = endAt;
