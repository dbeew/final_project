import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Button, ScrollView } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons';

import ChangePasswordScreen from './ChangePasswordScreen';
import EditAccountScreen from './EditAccountScreen';

import app from '../database/firebaseAuth';
import db from '../database/firebaseCloud';

const AccountScreen = () => {
    const [userEmail, setUserEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [passwordUpdatedAt, setPasswordUpdatedAt] = useState(null);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = getAuth().currentUser;
            if (user) {
                setUserEmail(user.email);
            }
    
            // ตรวจสอบข้อมูลผู้ใช้จาก Firestore
            const userDocRef = doc(db, 'react-project-users', user.uid);
            try {
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log("User Data from Firestore:", userData);  // ดูข้อมูลในคอนโซล
    
                    // ตรวจสอบฟิลด์ firstname และ lastname
                    setFirstname(userData.firstname || 'ไม่มีข้อมูลชื่อ');
                    setLastname(userData.lastname || 'ไม่มีข้อมูลนามสกุล');
                    setPasswordUpdatedAt(userData.passwordUpdatedAt || null);
                } else {
                    console.log('ไม่มีข้อมูลผู้ใช้ใน Firestore');
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
        // เพิ่มการฟังเมื่อเข้าสู่หน้านี้
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUserData();
        });
    
        // ทำการ clean up เมื่อ component ถูก unmount
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const auth = getAuth(app);
        const user = auth.currentUser;

        if(user) {
            setUserEmail(user.email);
        }
    }, []);

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            const auth = getAuth(app);
            await signOut(auth);
            console.log('User sign out', {userEmail});
            setTimeout(() => {
                setIsLoading(false);
                navigation.navigate('LoginScreen');
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>บัญชี</Text>
            <TouchableOpacity style={styles.infoBox} onPress={() => navigation.navigate('EditAccountScreen')}>
                <View style={styles.headerRow}>
                    <Text style={styles.header}>ชื่อ & อีเมล</Text>

                    <MaterialCommunityIcons name="account-outline" size={24} color="#3C695F" style={styles.icon} />
                </View>
                
                {/* ข้อความชื่อและอีเมล */}
                <View style={styles.infoContent}>
                    <View style={styles.textContainer}>
                        <Text style={styles.userInfo}>{firstname} {lastname}</Text>
                        <Text style={styles.userInfo}>{userEmail}</Text>
                    </View>                    
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.infoBox} onPress={() => navigation.navigate('ChangePasswordScreen')}>
                <View style={styles.headerRow}>
                    <Text style={styles.header}>รหัสผ่าน</Text>

                    <MaterialIcons name="password" size={24} color="#3C695F" style={styles.icon} />
                </View>

                <View style={styles.infoContent}>
                    <View style={styles.textContainer}>
                        <Text style={styles.userInfo}>{passwordUpdatedAt ? `อัปเดตล่าสุด ${passwordUpdatedAt.toDate().toLocaleDateString('th-TH', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        })}` : '*********'}</Text>
                    </View>                    
                </View>
            </TouchableOpacity>

            <View style={styles.signOutButton}>
                <Button title="ลงชื่อออก" style={styles.buttonText} onPress={handleSignOut} color="#FFFFFF" />
            </View>

            {isLoading && (
                <ActivityIndicator size="large" color="#3C695F" style={styles.loader} />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
    },
    signOutButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#FF3B30',
        borderRadius: 25,
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 16,
        backgroundColor: '#FF3B30',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    userInfo: {
        fontSize: 14,
        marginBottom: 10,
        color: '#9d9da0',
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
    infoBox: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        marginBottom: 20,
        borderRadius: 10,
        width: '90%',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginBottom: 12,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoContent: {
        flexDirection: 'row',  // จัดให้ข้อความและไอคอนอยู่ข้างๆ กัน
        justifyContent: 'space-between',  // จัดให้ข้อความอยู่ทางซ้ายและไอคอนอยู่ขวา
        alignItems: 'center',  // จัดตำแหน่งให้อยู่ในแนวเดียวกัน
    },
    textContainer: {
        flex: 1,  // ทำให้ข้อความขยายไปทางซ้ายเต็มพื้นที่
    },
    icon: {
        marginLeft: 10,  // ระยะห่างระหว่างข้อความและไอคอน
        marginBottom: 10,
    },
    headerRow: {
        flexDirection: 'row',  // จัดให้ข้อความและไอคอนอยู่ข้างๆ กัน
        justifyContent: 'space-between',  // จัดให้ข้อความอยู่ทางซ้ายและไอคอนอยู่ขวา
        alignItems: 'center',  // จัดตำแหน่งให้อยู่ในแนวเดียวกัน
    },
});

export default AccountScreen;
