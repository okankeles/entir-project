import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import LoadDetailScreen from '../screens/LoadDetailScreen';
import CreateLoadScreen from '../screens/CreateLoadScreen'; // Yeni ekranı import et
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { userToken } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {userToken ? (
        // Giriş yapılmışsa, bu ekran grubunu göster
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Aktif İlanlar' }}
          />
          <Stack.Screen
            name="LoadDetail"
            component={LoadDetailScreen}
            options={{ title: 'İlan Detayı' }}
          />
          <Stack.Screen
            name="CreateLoad"
            component={CreateLoadScreen}
            options={{ title: 'Yeni İlan Oluştur' }}
          />
        </>
      ) : (
        // Giriş yapılmamışsa, sadece bu ekranı göster
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;