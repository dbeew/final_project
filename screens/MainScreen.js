import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { getAuth, auth, signOut } from '@firebase/auth';
import { initializeApp } from '@firebase/app';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';

import app from '../database/firebaseAuth';


const MainScreen = () => {
    const [userEmail, setUserEmail] = useState('');
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

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
            <Text>Welcome!!</Text> 
            <Text>{userEmail}</Text>
            <Button title={"Sign out"} onPress={handleSignOut}  color='#A91B0D' />

            {isLoading && (
                <ActivityIndicator size="large" color="#3C695F" style={styles.loader} />
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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

export default MainScreen;