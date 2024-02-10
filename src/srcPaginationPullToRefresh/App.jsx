import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import usePullToRefresh from './hooks/usePullToRefresh';
import usePagination from './hooks/usePagination';

const getMovies = () => null;
const addMovies = () => null;

const INITIAL_PAGE = 0;
const App = () => {
  const dispatch = useDispatch();
  const isLoading = true;
  const { refreshing, onRefreshHandler } = usePullToRefresh({
    onRefreshFunction() {
      dispatch(getMovies(INITIAL_PAGE));
    },
  });

  const { currentPage, handleEndReached } = usePagination({
    fetchFunction: () => {
      dispatch(addMovies(currentPage + 1));
    },
    totalPages: 10,
    initialPage: INITIAL_PAGE,
  });

  return (
    // The FlatList component integrates both hooks for a seamless experience.
    <FlatList
      data={[]}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <View key={item} />}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      numColumns={2}
      ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : null}
    />
  );
};

export default App;
