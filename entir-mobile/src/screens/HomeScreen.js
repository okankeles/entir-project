import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { getAllLoads } from '../services/loadService';
import LoadCard from '../components/LoadCard';

// Component artık 'navigation' prop'unu alıyor.
// Bu prop, React Navigation tarafından otomatik olarak sağlanır.
const HomeScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const [loads, setLoads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Bu fonksiyon, component ilk render edildiğinde çalışır ve
  // API'den ilanları çeker.
  const fetchLoads = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllLoads();
      setLoads(data);
    } catch (err) {
      setError('İlanlar yüklenirken bir hata oluştu.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLoads();
  }, []);

  // Herhangi bir ilana tıklandığında çalışacak fonksiyon
  const handleCardPress = (item) => {
    // 'LoadDetail' ekranına git ve parametre olarak 'loadId' gönder.
    // 'loadId' key'i, LoadDetailScreen'de route.params.loadId olarak alınacak.
    navigation.navigate('LoadDetail', { loadId: item.id });
  };

  // FlatList'in her bir satırını nasıl oluşturacağını belirleyen fonksiyon
  const renderItem = ({ item }) => (
    <LoadCard item={item} onPress={() => handleCardPress(item)} />
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tekrar Dene" onPress={fetchLoads} />
      </View>
    );
  }

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
        contentContainerStyle={{ paddingBottom: 20 }}
        // Yenilemek için aşağı çekme özelliği (Pull to Refresh)
        onRefresh={fetchLoads}
        refreshing={isLoading}
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