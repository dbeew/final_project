import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, Button, ScrollView, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import app from '../database/firebaseAuth';
import db from '../database/firebaseCloud';

const EditAccountScreen = () => {
    const navigation = useNavigation();
    const [userEmail, setUserEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            const auth = getAuth(app);
            const user = auth.currentUser;

            if (user) {
                setUserEmail(user.email);
                const userDocRef = doc(db, 'react-project-users', user.uid);

                try {
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setFirstname(userData.firstname || '');
                        setLastname(userData.lastname || '');
                    } else {
                        console.log('User data not found in Firestore');
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
            setIsLoading(false);
        };

        fetchUserData();
    }, []);

    const handleSave = async () => {
        setIsLoading(true);
        const auth = getAuth(app);
        const user = auth.currentUser;

        if (user) {
            const userDocRef = doc(db, 'react-project-users', user.uid);
            try {
                await updateDoc(userDocRef, {
                    firstname,
                    lastname
                });
                console.log('User info updated');
                navigation.goBack();
            } catch (error) {
                console.error("Error updating user data:", error);
            }
        }
        setIsLoading(false);
    };

    

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <MaterialCommunityIcons name="account-outline" size={35} color="#3C695F" style={styles.icon} />
            <Text style={styles.title}>ชื่อ & อีเมล</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="ชื่อ"
                    value={firstname}
                    onChangeText={(text) => setFirstname(text.charAt(0).toUpperCase() + text.slice(1))}
                    selectTextOnFocus={false}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="นามสกุล"
                    value={lastname}
                    onChangeText={(text) => setLastname(text.charAt(0).toUpperCase() + text.slice(1))}
                    selectTextOnFocus={false}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { backgroundColor: '#f1f1f1', color: '#888'}]}
                    placeholder="อีเมล"
                    value={userEmail}
                    editable={false} // make email field non-editable
                />
            </View>

            <View style={styles.changePasswordButton}>
                <Button 
                    title="บันทึก"
                    color="#FFFFFF"
                    onPress={handleSave}
                />
            </View>

            <View style={styles.cancelButton}>
                <Button title="ยกเลิก" onPress={() => navigation.goBack()} color="#0A5C36" />
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
    title: {
        alignItems: 'center',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 25,
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

export default EditAccountScreen;
