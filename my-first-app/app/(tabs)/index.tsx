import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Using Expo Icons
import axios from 'axios';
import { Link } from 'expo-router';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchProducts = () => {
    axios
      .get('http://192.168.18.160:3000/api/products', {
        params: { category, minPrice, maxPrice },
      })
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  };

  useEffect(() => {
    fetchProducts();
  }, [category, minPrice, maxPrice]);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Ionicons name="cart-outline" size={36} color="#FFFFFF" />
        <View>
          <Text style={styles.title}>Welcome to the Store</Text>
          <Text style={styles.subtitle}>Find your favorite products</Text>
        </View>
      </View>

      {/* Filters Section */}
      <View style={styles.filters}>
        <Ionicons name="filter-outline" size={24} color="#4F46E5" style={styles.filterIcon} />
        <TextInput
          style={styles.input}
          placeholder="Min Price"
          value={minPrice}
          onChangeText={setMinPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Max Price"
          value={maxPrice}
          onChangeText={setMaxPrice}
          keyboardType="numeric"
        />
        <Pressable style={styles.filterButton} onPress={fetchProducts}>
          <Ionicons name="checkmark-done" size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.cardContent}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              <Link href={`/details/${item.id}`} style={styles.link}>
                <Text style={styles.linkText}>
                  View Details <Ionicons name="arrow-forward" size={14} color="#4F46E5" />
                </Text>
              </Link>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:50,
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#4F46E5',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    marginTop: 5,
    marginLeft: 10,
  },
  filters: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  filterIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#F3F4F6',
  },
  filterButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  productList: {
    padding: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  productPrice: {
    fontSize: 16,
    color: '#4F46E5',
    marginTop: 5,
    marginBottom: 10,
  },
  link: {
    marginTop: 5,
  },
  linkText: {
    color: '#4F46E5',
    textDecorationLine: 'underline',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeScreen;
