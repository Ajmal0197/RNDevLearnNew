import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DrawerListType} from '../data/data';

type Props = {
  item: DrawerListType;
};

const DrawerItem = ({item}: Props) => {
  return (
    <TouchableOpacity onPress={()=>alert(item.name)} style={styles.container}>
      <Image source={item.icon} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default DrawerItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  image: {
    width: 26,
    height: 26,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
});
