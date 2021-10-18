// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
//import { firestore } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'
import {  getFirestore, collection, getDocs  } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt_8_xWyk2bFakexqfM7ZkXFTRCx42OKI",
  authDomain: "touche-1c021.firebaseapp.com",
  projectId: "touche-1c021",
  storageBucket: "touche-1c021.appspot.com",
  messagingSenderId: "166127349399",
  appId: "1:166127349399:web:3ff697a006ca3cfdc2c3d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
stop()
while (true){
      const querySnapshot = await getDocs(collection(db, "touche_data"));
      var device_id = 0
      querySnapshot.forEach((doc) => {
          device_id = doc.data().device_id
          console.log(`${doc.id} => ${device_id}`);
      });
      if (device_id==2){
          play()
      }else{
          stop()
      }
      await new Promise(r => setTimeout(r, 2000));
}