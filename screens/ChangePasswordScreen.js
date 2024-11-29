import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Button, ScrollView, ActivityIndicator } from 'react-native';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc } from 'firebase/firestore';
import { MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons';

import db from '../database/firebaseCloud'; // Firestore configuration

const ChangePasswordScreen = () => {
    const navigation = useNavigation();
    
    // State for the inputs
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            setError("รหัสผ่านใหม่และรหัสผ่านยืนยันไม่ตรงกัน");
            return;
        }

        const user = getAuth().currentUser;
        if (!user) return;

        setIsLoading(true);

        try {
            // Reauthenticate the user
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            // Update password in Firebase Auth
            await updatePassword(user, newPassword);

            // Update user password in Firestore (replace old password with the new one)
            const userDocRef = doc(db, 'react-project-users', user.uid);
            await updateDoc(userDocRef, {
                password: newPassword,  // Replace the old password with the new one in Firestore
                passwordUpdatedAt: new Date(),
            });

            setIsLoading(false);
            navigation.goBack();
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <MaterialIcons name="password" size={35} color="#3C695F" style={styles.icon} />
            <Text style={styles.title}>เปลี่ยนรหัสผ่านของคุณ</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="รหัสผ่านปัจจุบัน"
                    secureTextEntry
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="รหัสผ่านใหม่"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="ยืนยันรหัสผ่าน"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            {isLoading && (
                <ActivityIndicator size="large" color="#3C695F" style={styles.loader} />
            )}

            <View style={styles.changePasswordButton}>
                <Button 
                    title={'เปลี่ยนรหัสผ่าน'}
                    onPress={handlePasswordChange}
                    color="#FFFFFF"
                    disabled={isLoading}
                />
            </View>

            <View style={styles.cancelButton}>
                <Button title="ยกเลิก" onPress={() => navigation.goBack()} color="#0A5C36" />
            </View>
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
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginBottom: 12,
    },
    inputContainer: {
        width: '90%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    input: {
        height: 50,
        fontSize: 16,
        color: '#333',
    },
    changePasswordButton: {
        width: '50%',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#0A5C36',
        borderColor: '#0A5C36',
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
    },
    cancelButton: {
        width: '50%',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#0A5C36',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
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

export default ChangePasswordScreen;
