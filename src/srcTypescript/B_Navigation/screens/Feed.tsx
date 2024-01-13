import { Button, StyleSheet, Text, } from 'react-native'
import React, { } from 'react'
import StyleProvider from './StyleContext'
import MyComp from './MyComp'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '..'

// Define an interface for the props expected by the Home component
interface FeedScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Feed'>, // Navigation prop specific to the 'Home' screen
}

const Feed = ({ navigation }: FeedScreenProps) => {
    return (
        <StyleProvider>
            <Button title='Go To Product List' onPress={() => navigation.navigate('ProductScreen')} />
            <MyComp />
        </StyleProvider>
    )
}

export default Feed

const styles = StyleSheet.create({})