import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Reanimated from './1_Reanimated'
import GestureHandler from './2_GestureHandler'

const index = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
     {!true?<Reanimated/>:<GestureHandler/>}
    </GestureHandlerRootView>
  )
}

export default index

const styles = StyleSheet.create({})