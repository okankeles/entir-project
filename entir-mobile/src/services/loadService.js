import axios from 'axios';
import { getToken } from '../utils/storage';

// Backend API'mizin ana adresi
const API_URL = 'http://10.0.2.2:3000/loads';

// Korumalı endpoint'lere istek atmak için bir axios instance'ı oluşturalım.
// Bu instance, her isteğin başına otomatik olarak "Bearer TOKEN" hedefini ekleyecek.
const apiClient = axios.create({
  baseURL: 'http://10.0.2.2:3000',
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);


/**
 * Tüm yük ilanlarını getiren fonksiyon
 */
export const getAllLoads = async () => {
  try {
    const response = await apiClient.get('/loads');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch loads:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Belirli bir ID'ye sahip yük ilanını getiren fonksiyon
 * @param {number} id - Yük ID'si
 */
export const getLoadById = async (id) => {
  try {
    const response = await apiClient.get(`/loads/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch load ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Belirli bir ID'ye sahip yük ilanını getiren fonksiyon
 * @param {object} loadData - Yük ID'si
 */
export const createLoad = async (loadData) => {
  try {
    //  apiClient, token'i otomatik olarak ekleyecek
    const response = await apiClient.post('/loads', loadData);
    return response.data;
  } catch (error) {
    console.error('Failed to create load:', error.response?.data || error.message);
    throw error;
  } 
};