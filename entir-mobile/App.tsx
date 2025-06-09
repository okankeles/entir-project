import React, { JSX } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';


function App(): JSX.Element {
  return (
    <AuthProvider>
      {/* NavigationContainer, uygulamanın navigasyon yapısını yönetir */}
      {/* AppNavigator, uygulamanın tüm ekranlarını ve navigasyon mantığını içerir */}
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;