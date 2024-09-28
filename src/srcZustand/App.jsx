import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { fetchItemsService } from './services/itemStoreService';
import useBasicStore from './store/useBasicStore';
import { usePersistanceStore } from './store/usePersistanceStore';

const App = () => {
  // Zustand store for basic state management
  const { items, addItem, removeItem, getItemCount } = useBasicStore();

  // Zustand persistent store for persisted data
  const { fishes, addAFish, removeAFish } = usePersistanceStore();

  useEffect(() => {
    // Fetch data and update both stores
    const fetchData = async () => {
      await fetchItemsService();
    };
    fetchData();
  }, []);

  const handleAddItem = () => {
    const newItem = { id: Date.now(), name: 'New Item' };
    addItem(newItem); // Update basic store
    addAFish(); // Update persistent store
  };

  const handleRemoveItem = (id) => {
    removeItem(id); // Remove from basic store
    removeAFish(); // Remove from persistent store
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Item List ({getItemCount()})</Text>
        <Button title="Add Item and Fish" onPress={handleAddItem} />
        <Text style={styles.subheader}>Fishes: {fishes}</Text>
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.name}</Text>
              <Button title="Remove" onPress={() => handleRemoveItem(item.id)} />
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  subheader: {
    fontSize: 18,
    marginVertical: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
