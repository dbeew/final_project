import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, Alert, ActivityIndicator, Keyboard } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { initializeApp, setInitializing } from '@firebase/app';
import { useNavigation } from '@react-navigation/native';

import logo from "../assets/gallary/logo.png";
import { color } from 'react-native-elements/dist/helpers';

import app from '../database/firebaseAuth';


const auth = getAuth(app);

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();


  //ล้างข้อมูลที่กรอกเข้าสู่ระบบ
  
  useEffect(() => {
    // รีเซ็ตข้อมูลเมื่อเข้าสู่หน้าจอ
    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    // ตั้งค่าตรวจสอบการเข้าถึงหน้าจอ
    const unsubscribe = navigation.addListener('focus', resetForm);

    return unsubscribe; // คืนค่าฟังก์ชันเมื่อมีการUnmount
}, [navigation]);



  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;
      console.log('User signed in successfully!', {userEmail});
      Keyboard.dismiss();
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('MainScreen');
      }, 2000);
    } catch (error) {
      console.error('Login error:', error.message);
      setIsLoading(false);
      Alert.alert('เข้าสู่ระบบไม่สำเร็จ', 'บัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
        [{ text: 'OK' }],
        { cancelabel: false}
      );
    }
  };

  return (
    <View style={styles.container}>

      
        <Image 
          source={logo} style={styles.imageLogo}
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
        <Button title={"Sign In"} onPress={handleLogin} color='#0A5C36' />
      </View>

      <View >
        <Button title={'Need an account?'} onPress={() => navigation.navigate('RegisterScreen')} color='72CC50' />
      </View>

      {isLoading &&(
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
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
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
    color: '#0A5C36',
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
  preloader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
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

export default LoginScreen; // ส่งออก component
