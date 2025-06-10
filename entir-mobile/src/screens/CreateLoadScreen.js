import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { createLoad } from '../services/loadService'; // Bu fonksiyonu birazdan oluşturacağız

const CreateLoadScreen = ({ navigation }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateLoad = async () => {
    if (!origin || !destination || !weight || !description) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    setIsLoading(true);
    try {
      const loadData = {
        origin,
        destination,
        weight: parseFloat(weight), // Gelen metni sayıya çevir
        description,
      };
      await createLoad(loadData);
      Alert.alert('Başarılı', 'İlanınız başarıyla oluşturuldu!');
      navigation.goBack(); // Bir önceki ekrana (Ana Sayfa'ya) dön
    } catch (error) {
      Alert.alert('Hata', 'İlan oluşturulurken bir sorun oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nereden?</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: İstanbul, Tuzla"
        value={origin}
        onChangeText={setOrigin}
      />

      <Text style={styles.label}>Nereye?</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: Ankara, Sincan"
        value={destination}
        onChangeText={setDestination}
      />

      <Text style={styles.label}>Ağırlık (ton)</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: 22.5"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Açıklama</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Yük detayları, araç tipi vb."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <Button title="İlanı Oluştur" onPress={handleCreateLoad} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Android için metni yukarıdan başlatır
    paddingTop: 15,
  },
});

export default CreateLoadScreen;