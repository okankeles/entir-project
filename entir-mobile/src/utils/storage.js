import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'entir_access_token';

// Token'ı kaydetme fonksiyonu
export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error('Failed to save the token to storage', e);
  }
};

// Token'ı okuma fonksiyonu
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.error('Failed to fetch the token from storage', e);
    return null;
  }
};

// Token'ı silme fonksiyonu (çıkış yaparken kullanacağız)
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error('Failed to remove the token from storage', e);
  }
};