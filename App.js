import React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer, TouchableOpacity, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import LoginScreen from './screens/LoginScreen'; // นำเข้าหน้า เข้าสู่ระบบ
import RegisterScreen from './screens/RegisterScreen'; // หน้า สมัครสมาชิก
import splash_screen from './screens/splash_screen';// นำเข้าหน้า splash logo ตอนเปิดแอป
import MainScreen from './screens/MainScreen';
import MapScreen from './screens/MapScreen';
import CameraScreen from './screens/CameraScreen';
import AccountScreen from './screens/AccountScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import EditAccountScreen from './screens/EditAccountScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#0A5C36', // เปลี่ยนสีพื้นหลังของแท็บ
        },
        tabBarActiveTintColor: 'white', // สีของแท็บที่เปิดใช้งาน
        headerShown: true, // เปิดการแสดง header สำหรับ Tab
      }}
    >
      <Tab.Screen
          name="Home"
          component={MainScreen}
          options={() => {
            const navigation = useNavigation();
            return {
            tabBarLabel: 'หน้าหลัก',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
            headerTitle: 'หน้าหลัก', // ตั้งค่าหัวข้อของหน้า Home
            headerStyle: {
              backgroundColor: '#0A5C36', // ตั้งค่าพื้นหลังของ header
            },
            headerTintColor: '#fff', // ตั้งค่าสีตัวอักษรใน header
            headerTitleStyle: {
              fontWeight: 'bold', // ตั้งค่าฟอนต์ของ header
            },
            headerRight: () => (
              <MaterialIcons
                name="account-circle" 
                size={30} 
                color="white" 
                style={{ marginRight: 20 }} 
                onPress={() => navigation.navigate('AccountScreen')}
              />
            ),
          };
        }}
      />
      <Tab.Screen 
          name="Camera"
          component={CameraScreen}
          options={() => {
            const navigation = useNavigation();
            return {
            tabBarLabel: 'ถ่ายภาพ',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="camera-alt" color={color} size={size} />
            ),
            headerTitle: 'ถ่ายภาพ', // ตั้งค่าหัวข้อของหน้า Camera
            headerStyle: {
              backgroundColor: '#0A5C36', // ตั้งค่าพื้นหลังของ header
            },
            headerTintColor: '#fff', // ตั้งค่าสีตัวอักษรใน header
            headerTitleStyle: {
              fontWeight: 'bold', // ตั้งค่าฟอนต์ของ header
            },
            headerRight: () => (
              <MaterialIcons
                name="account-circle" 
                size={30} 
                color="white" 
                style={{ marginRight: 20 }} 
                onPress={() => navigation.navigate('AccountScreen')}
              />
            ),
          };
        }}
      />
      <Tab.Screen 
          name="Map"
          component={MapScreen}
          options={() => {
            const navigation = useNavigation();
            return {
            tabBarLabel: 'แผนที่โรค',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="map" color={color} size={size} />
            ),
            headerTitle: 'แผนที่โรค', // ตั้งค่าหัวข้อของหน้า Map
            headerStyle: {
              backgroundColor: '#0A5C36', // ตั้งค่าพื้นหลังของ header
            },
            headerTintColor: '#fff', // ตั้งค่าสีตัวอักษรใน header
            headerTitleStyle: {
              fontWeight: 'bold', // ตั้งค่าฟอนต์ของ header
            },
            headerRight: () => (
              <MaterialIcons
                name="account-circle" 
                size={30} 
                color="white" 
                style={{ marginRight: 20 }} 
                onPress={() => navigation.navigate('AccountScreen')}
              />
            )
          };
        }}
      />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0A5C36',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <Stack.Screen 
        name="splash_screen" // ชื่อ screen สำหรับ splash
        component={splash_screen} // ใช้ SplashScreen
        options={{ headerShown: false }} // ปิดการแสดง header
      />

      <Stack.Screen 
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: 'เข้าสู่ระบบ', headerLeft: null}}
      />

      <Stack.Screen 
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ title: 'สมัครสมาชิก'}}
      />

      <Stack.Screen 
        name="AccountScreen"
        component={AccountScreen}
        options={({ navigation }) => ({
          headerTitle: 'บัญชี',
          headerStyle: {
            backgroundColor: '#0A5C36',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitle: 'หน้าหลัก',
        })}
      />

      <Stack.Screen 
        name="EditAccountScreen"
        component={EditAccountScreen}
        options={({ navigation }) => ({
          headerTitle: 'ชื่อ & อีเมล',
          headerStyle: {
            backgroundColor: '#0A5C36',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitle: 'บัญชี',
        })}
      />

      <Stack.Screen 
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={({ navigation }) => ({
          headerTitle: 'รหัสผ่าน',
          headerStyle: {
            backgroundColor: '#0A5C36',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitle: 'บัญชี',
        })}
      />

      <Stack.Screen 
        name="MainScreen"
        component={MyTabs} // แสดง Tab Navigator ในหน้า MainScreen
        options={{ headerShown: false, headerLeft: null, //ปิดการทำงานปุ่มย้อนกลับ
          gestureEnabled: false, // ทำให้ปัดขวาเพื่อกลับไปหน้า login ไม่ได้
          
          headerRight: () => (
            <MaterialIcons
              name="account-circle" 
              size={30} 
              color="white" 
              style={{ marginRight: 20 }} 
            />
          )
        }}
      />
      <Stack.Screen 
        name="MapScreen"
        component={MapScreen}
        options={{ title: 'แผนที่', headerLeft: null}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
