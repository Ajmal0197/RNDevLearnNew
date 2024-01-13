import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ProductItem from './ProductItem';

interface Rating {
  count: number;
  rate: number;
}

interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating | any;
  title: string;
}

//It's a concise way to both destructure an object in the function parameter and enforce the expected types of its properties.
const renderItem = ({ item, index }: { item: Product, index: number }) => (
  <View style={{ padding: 16 }}>
    <Text>{index}</Text>
    <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
    <Text>{item.title}</Text>
    <Text>{item.category}</Text>
    <Text>${item.price}</Text>
    <Text>Rating: {item.rating.rate} ({item.rating.count} reviews)</Text>
  </View>
);

const ProductScreen = () => {
  const [products, setProducts] = useState<Product[]>([])
  const ref = useRef<FlatList>(null)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json() as Promise<Product[]> | any) // By using as Promise<Product[]>, you are explicitly telling TypeScript that the result of res.json() is a Promise that resolves to an array of Product objects.
      .then((json) => {
        console.log(json);
        setProducts(json)
      });
  }, []);


  return (
    <View>
      <Text style={{ alignSelf: 'center', backgroundColor: 'pink', padding: 10, }}>ProductScreen</Text>
      <FlatList
        ref={ref}
        data={products}
        renderItem={({ item, index }: { item: Product, index: number }) => <ProductItem item={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
