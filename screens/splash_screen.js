import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from "react-native";
import splash from "../assets/gallary/splash.png"; // เปลี่ยนเป็น path ที่ถูกต้อง
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('LoginScreen'); // เปลี่ยนไปที่หน้า login หลังจาก 5 วินาที
        }, 3000); // ตั้งเวลาเป็น 5000 มิลลิวินาที (5 วินาที)

        return () => clearTimeout(timer); // เคลียร์ timeout ถ้า component ถูก unmounted
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View>
                <Image source={splash}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#FFFFFF'
    }
});
