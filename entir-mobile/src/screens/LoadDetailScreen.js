import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getLoadById } from '../services/loadService';

// route.params aracılığıyla bir önceki ekrandan gelen verileri alırız
const LoadDetailScreen = ({ route }) => {
  const { loadId } = route.params; // HomeScreen'den gönderdiğimiz ID'yi alıyoruz

  const [load, setLoad] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoadDetail = async () => {
      if (!loadId) {
        setError('Geçersiz ilan IDsi.');
        setIsLoading(false);
        return;
      }
      try {
        const data = await getLoadById(loadId);
        setLoad(data);
      } catch (err) {
        setError('İlan detayı yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoadDetail();
  }, [loadId]); // loadId değiştiğinde bu useEffect tekrar çalışır.

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error || !load) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error || 'İlan bulunamadı.'}</Text>
      </View>
    );
  }
  
  // Veri başarıyla yüklendiğinde gösterilecek arayüz
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{load.origin}</Text>
        <Text style={styles.arrow}>➔</Text>
        <Text style={styles.title}>{load.destination}</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.detailLabel}>Açıklama:</Text>
        <Text style={styles.detailValue}>{load.description}</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.detailLabel}>Ağırlık:</Text>
        <Text style={styles.detailValue}>{load.weight} ton</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.detailLabel}>Durum:</Text>
        <Text style={styles.detailValue}>{load.status}</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.detailLabel}>İlan Sahibi:</Text>
        <Text style={styles.detailValue}>{load.shipper?.full_name || 'Bilinmiyor'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    header: {
        padding: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    title: { fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center' },
    arrow: { fontSize: 24, color: '#007BFF', marginHorizontal: 10 },
    detailCard: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        marginTop: 15,
        padding: 15,
        borderRadius: 8,
    },
    detailLabel: { fontSize: 14, color: 'gray', marginBottom: 5 },
    detailValue: { fontSize: 16, color: '#333' },
    errorText: { color: 'red' },
});

export default LoadDetailScreen;