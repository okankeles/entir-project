import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    // Global state'i ve AsyncStorage'ı temizlemek için
    // AuthContext'ten gelen logout fonksiyonunu çağırıyoruz.
    logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ana Sayfa</Text>
      <Text style={styles.subtitle}>Başarıyla giriş yaptınız!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Çıkış Yap" onPress={handleLogout} color="#FF6347" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '60%',
  },
});

export default HomeScreen;