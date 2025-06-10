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

const HomeScreen = ({ navigation }) => {
  const { logout, userInfo } = useContext(AuthContext); // userInfo'yu context'ten al
  const [loads, setLoads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
  
  // navigation.addListener ile sayfa her odaklandığında veriyi yenile
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchLoads();
    });
    
    // Component ekrandan kaldırıldığında listener'ı temizle
    return unsubscribe;
  }, [navigation]);

  const handleCardPress = (item) => {
    navigation.navigate('LoadDetail', { loadId: item.id });
  };

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
        {/* Sadece SHIPPER rolündeki kullanıcı bu butonu görür */}
        {userInfo?.user_type === 'SHIPPER' && (
          <Button
            title="İlan Ekle"
            onPress={() => navigation.navigate('CreateLoad')}
          />
        )}
      </View>

      <FlatList
        data={loads}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        onRefresh={fetchLoads}
        refreshing={isLoading}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>Gösterilecek ilan bulunamadı.</Text>
          </View>
        }
      />
      
      <View style={styles.logoutButton}>
        <Button title="Çıkış Yap" onPress={logout} color="#FF6347" />
      </View>
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
  logoutButton: {
    margin: 15,
  },
});

export default HomeScreen;