import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface Rating {
    count: number;
    rate: number;
}

interface DataProp {
    item: {
        category: string;
        description: string;
        id: number;
        image: string;
        price: number;
        rating: Rating | any;
        title: string;
    }, index: number
}

const ProductItem = ({ item, index }: DataProp) => {
    return (
        <View style={{ padding: 16 }}>
            <Text>{index}</Text>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
            <Text>{item.title}</Text>
            <Text>{item.category}</Text>
            <Text>${item.price}</Text>
            <Text>Rating: {item.rating.rate} ({item.rating.count} reviews)</Text>
        </View>
    )
}

export default ProductItem

const styles = StyleSheet.create({})