import { Button, StyleSheet, Text, View } from 'react-native'
import React, { FC, useContext } from 'react'
import { MyContextStyle } from './StyleContext'

const MyComp: FC = () => {

    const { bg, color, updateContext } = useContext(MyContextStyle);
    return (
        <View style={{ flex: 1, backgroundColor: bg, justifyContent: 'center' }}>
            <Text style={{ color: color, alignSelf: 'center' }}>MyComp</Text>
            <Button color={'yellow'} title='Change Color' onPress={() => updateContext({ bg: 'blue', color: 'yellow' })} />
        </View>
    )
}

export default MyComp

const styles = StyleSheet.create({})