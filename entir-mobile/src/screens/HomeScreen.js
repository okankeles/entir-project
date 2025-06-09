import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { getAllLoads } from '../services/loadService';
import LoadCard from '../components/LoadCard';

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);
  const [loads, setLoads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoads = async () => {
      try {
        setIsLoading(true); // Veri çekmeye başlarken yüklemeyi başlat
        setError(null); // Eski hataları temizle
        const data = await getAllLoads();
        setLoads(data);
      } catch (err) {
        setError('İlanlar yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoads();
  }, []); // Boş dizi, bu useEffect'in sadece component ilk render edildiğinde çalışmasını sağlar.

  // Herhangi bir ilana tıklandığında çalışacak fonksiyon
  const handleCardPress = (item) => {
    Alert.alert('İlan Detayı', `Seçilen ilan ID: ${item.id}\nNereden: ${item.origin}`);
    // Gelecekte bu fonksiyon, kullanıcıyı ilanın detay sayfasına yönlendirecek.
  };

  // FlatList'in her bir satırını nasıl oluşturacağını belirleyen fonksiyon
  const renderItem = ({ item }) => (
    <LoadCard item={item} onPress={() => handleCardPress(item)} />
  );

  // Veri yüklenirken gösterilecek arayüz
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  // Hata durumunda gösterilecek arayüz
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        {/* Hata durumunda tekrar deneme butonu eklemek iyi bir pratiktir */}
        <Button title="Tekrar Dene" onPress={() => useEffect.fetchLoads()} />
      </View>
    );
  }

  // Veri başarıyla çekildiğinde gösterilecek ana arayüz
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aktif İlanlar</Text>
        <Button title="Çıkış Yap" onPress={logout} color="#FF6347" />
      </View>

      <FlatList
        data={loads}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }} // Listenin sonuna biraz boşluk ekle
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>Gösterilecek ilan bulunamadı.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default HomeScreen;