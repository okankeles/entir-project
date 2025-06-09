import React, { createContext, useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { getToken, storeToken, removeToken } from '../utils/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Başlangıç kontrolü için

  const login = async (token) => {
    setIsLoading(true);
    await storeToken(token);
    setUserToken(token);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    await removeToken();
    setUserToken(null);
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      setUserToken(token);
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};