import React, { createContext, useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { getToken, storeToken, removeToken } from '../utils/storage';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null); // Kullanıcı rolü vb. bilgileri tutar
  const [isLoading, setIsLoading] = useState(true);

  const login = async (token) => {
    try {
      setIsLoading(true);
      await storeToken(token);
      const decodedToken = jwtDecode(token); // <-- DÜZELTİLMİŞ KULLANIM
      setUserInfo(decodedToken);
      setUserToken(token);
      setIsLoading(false);
    } catch (e) {
      console.error('Login error in context', e);
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await removeToken();
    setUserToken(null);
    setUserInfo(null); // Çıkışta kullanıcı bilgisini temizle
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      if (token) {
        const decodedToken = jwtDecode(token); // <-- DÜZELTİLMİŞ KULLANIM
        setUserInfo(decodedToken);
      }
      setUserToken(token);
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error ${e}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ userToken, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});