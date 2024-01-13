import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Notes from './Notes'
import { Provider } from 'react-redux'
import store from './reduxWIthTS/store'

const index = () => {
  return (
    <Provider store={store} >
      <Notes />
    </Provider>
  )
}

export default index

const styles = StyleSheet.create({})