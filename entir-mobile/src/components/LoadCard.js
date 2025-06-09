import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// item prop'u olarak bir 'load' objesi alacak
const LoadCard = ({ item, onPress }) => {
  // Yükü veren kişinin adını güvenli bir şekilde alalım
  const shipperName = item.shipper ? item.shipper.full_name : 'Bilinmiyor';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.origin}>{item.origin}</Text>
        <Text style={styles.arrow}>➔</Text>
        <Text style={styles.destination}>{item.destination}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailText}>Ağırlık: {item.weight} ton</Text>
        <Text style={styles.detailText}>Durum: {item.status}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.shipper}>İlan Sahibi: {shipperName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  origin: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  destination: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  arrow: {
    fontSize: 20,
    marginHorizontal: 10,
    color: '#007BFF',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  shipper: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'right',
    fontStyle: 'italic',
  },
});

export default LoadCard;