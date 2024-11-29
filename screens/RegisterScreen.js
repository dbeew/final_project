import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { initializeApp } from '@firebase/app';
import { useNavigation } from '@react-navigation/native';
import logo from "../assets/gallary/logo.png";
import app from '../database/firebaseAuth';
import db from '../database/firebaseCloud';
import { doc, setDoc } from 'firebase/firestore'; // เปลี่ยนจาก addDoc เป็น setDoc

const auth = getAuth(app);

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [isLoading, setIsLoading] = useState(false); // สถานะการโหลด

  const handleSignUp = async () => {
    setIsLoading(true); // เริ่มการโหลด
    try {
      // สมัครสมาชิกด้วยอีเมลและรหัสผ่าน
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      console.log('User registered successfully!');

      // ใช้ setDoc เพื่อกำหนด documentId ให้ตรงกับ uid
      const userDocRef = doc(db, 'react-project-users', uid); // ใช้ uid เป็น documentId
      await setDoc(userDocRef, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        uid: uid,
      });

      Keyboard.dismiss();

      // รอให้การโหลดเสร็จสิ้นก่อนนำทางไปยัง LoginScreen
      setTimeout(() => {
        setIsLoading(false); // หยุดการโหลด
        navigation.navigate('LoginScreen');
      }, 2000); // ตั้งเวลาโหลด 2 วินาที
    } catch (error) {
      console.error('Registration error:', error.message);
      setIsLoading(false);
      Alert.alert('ข้อผิดพลาด', 'บัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.imageLogo} />
      <TextInput 
        style={styles.input}
        value={firstname}
        onChangeText={setFirstname}
        placeholder='Firstname'
        autoCapitalize='sentences'
      />
      <TextInput 
        style={styles.input}
        value={lastname}
        onChangeText={setLastname}
        placeholder='Lastname'
        autoCapitalize='sentences'
      />
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder='Email'
        autoCapitalize='none'
      />
      <TextInput 
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder='Password'
        autoCapitalize='none'
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title={"Sign Up"} onPress={handleSignUp} color='#3C695F' />
      </View>

      {/* แสดง ActivityIndicator ขณะโหลด */}
      {isLoading && (
        <ActivityIndicator size="large" color="#3C695F" style={styles.loader} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: '#FFFFFF',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  imageLogo: {
    width: 170,
    height: 170,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisterScreen;
