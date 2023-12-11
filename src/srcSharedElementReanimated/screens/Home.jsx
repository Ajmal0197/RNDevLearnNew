import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { FlashList } from '@shopify/flash-list';
import { data } from '../data/ListData';
import RenderItem from '../components/RenderItem';
import RenderItemGrid from '../components/RenderItemGrid';
import AnimatedSwitch from '../components/AnimatedSwitch';

const Home = () => {
  const [isGrid, setisGrid] = useState(false);
  return (
    <LinearGradient style={styles.container} colors={['#C6FFDD', '#FBD786', '#f7797d']}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.text}>Dream Cars</Text>
          <AnimatedSwitch
            onToggleSwitch={(value) => setisGrid(value)}
            activeColor="#FF0000"
            inActiveColor="#F2F5F7"
          />
        </View>
        {!isGrid ? (
          <FlashList
            data={data}
            renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={200}
          />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item, index }) => <RenderItemGrid item={item} index={index} />}
            numColumns={2} // Adjust the number of columns as needed
            contentContainerStyle={styles.containerG}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
  },
  text: {
    fontSize: 34,
    color: '#323232',
    fontWeight: 'bold',
  },
  containerG: {
    padding: 16,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
});
