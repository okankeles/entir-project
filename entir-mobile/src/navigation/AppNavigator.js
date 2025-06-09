import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { AuthContext } from '../context/AuthContext'; // <-- YENİ IMPORT

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { userToken } = useContext(AuthContext); // Global state'ten token'ı al

  return (
    <Stack.Navigator>
      {userToken ? (
        // Eğer token varsa, sadece Ana Sayfa'yı göster
        <Stack.Screen name="MainApp" component={HomeScreen} options={{ title: 'ENTIR Ana Sayfa' }} />
      ) : (
        // Eğer token yoksa, sadece Giriş Ekranı'nı göster
        <Stack.Screen name="Auth" component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;