import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  description: string;
  image: string;
}

const ProductListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      fetch('http://192.168.100.203:3000/products')  // Atualize o IP ou endpoint correto
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erro ao buscar produtos:', error);
          setLoading(false);
        });
    }, 3000);
  }, []);

  const renderProduct = ({ item }: { item: Product }) => {
    return (
      <View style={styles.productContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>Preço: {item.price}</Text>
          <Text style={styles.productBrand}>Marca: {item.brand}</Text>
          <Text style={styles.productDescription}>Descrição: {item.description}</Text>

          {/* Botão "Avaliar" usando TouchableOpacity */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EvaluationForm', { productId: item.id })}
          >
            <Text style={styles.buttonText}>Avaliar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 120,
    marginRight: 10,
    
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  productBrand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ProductListScreen;
