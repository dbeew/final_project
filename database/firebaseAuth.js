// firebaseAuth
import { initializeApp } from 'firebase/app';

// กำหนดการตั้งค่า Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD9hxlG-lMLvYZQMH9WydwRFlK27vLmvLk",
    authDomain: "react-native-project-final.firebaseapp.com",
    projectId: "react-native-project-final",
    storageBucket: "react-native-project-final.appspot.com",
    messagingSenderId: "191672244848",
    appId: "1:191672244848:web:b4cc6f6cfb3839a665f2b5",
    measurementId: "G-ZMP0CZJ8HL"
};

// เริ่มต้น Firebase
const app = initializeApp(firebaseConfig);

// ส่งออก app เพื่อใช้งานในไฟล์อื่น
export default app;
