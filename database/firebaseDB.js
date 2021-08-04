import firebase from 'firebase/app'
import firestore from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDd882a_m3KfL0BfW0uOF1JxeOhiJcNDk",
  authDomain: "citihack-1b35c.firebaseapp.com",
  databaseURL: "https://citihack-1b35c.firebaseio.com",
  projectId: "citihack-1b35c",
  storageBucket: "citihack-1b35c.appspot.com",
  messagingSenderId: "428520291226",
  appId: "1:428520291226:android:e9a90a7499a411f8749823",
};


firebase.initializeApp(firebaseConfig);
firebase.firestore()
export default firebase;
