import axios from 'axios';

// Backend API'mizin ana adresi.
// Android emülatörü için localhost'a erişim adresi 'http://10.0.2.2:3000' şeklindedir.
// iOS simülatörü için 'http://localhost:3000' genellikle çalışır.
const API_URL = 'http://10.0.2.2:3000/auth'; 

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    // Başarılı olursa, dönen veriyi (içinde access_token olan obje) geri döndür
    return response.data;
  } catch (error) {
    // Hata olursa, hatayı yakala ve null döndür veya hatayı fırlat
    console.error('Login failed:', error.response?.data || error.message);
    throw error; // Hatanın ne olduğunu ekranda göstermek için fırlatmak daha iyi
  }
};

// Register fonksiyonunu da şimdiden ekleyebiliriz ama şimdilik login'e odaklanalım.