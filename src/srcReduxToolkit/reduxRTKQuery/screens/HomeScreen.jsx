import React, { useEffect } from 'react';
import { View, Text, Button, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  useGetCartsQuery,
  useGetCartByIdQuery,
  useCreateCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
} from '../slices/rtkBaseUrl1Api'; // Adjust the import path accordingly

const HomeScreen = () => {
  // Example: Fetching all carts
  const { data: carts, isLoading, isError, refetch } = useGetCartsQuery(); // will be called on screenmount called due to refetch provided in useeffect
  useEffect(() => {
    // Fetch carts when component mounts
    refetch(); // Manually trigger a refetch of all carts data
  }, []);
  useEffect(() => {
    if (carts) {
      console.log('cartscarts', carts);
    }
  }, [carts]);

  // OR
  // Example: Fetching a specific cart by ID
  // const { data: post, isFetching, isLoading } = useGetPostQuery(id, { pollingInterval: 3000, refetchOnMountOrArgChange: true, skip: false })
  // In "useGetPostQuery", pollingInterval sets the interval for automatic data polling, refetchOnMountOrArgChange triggers a refetch when the component mounts or argument changes, and skip controls whether the query should be skipped initially.
  const {
    data: cartById,
    isLoading: isLoadingCartById,
    isError: isErrorCartById,
  } = useGetCartByIdQuery(11, { refetchOnMountOrArgChange: true, skip: false }); // Passing the cart ID (1 in this example) to fetch a specific cart; refetchOnMountOrArgChange will be called on ID change or screen mount

  // Example: Creating a new cart
  // Mutation syntax:   const [updatePost, result] = useUpdatePostMutation()
  const [createCart, { data: createdData, isLoading: isCreatingCart }] = useCreateCartMutation();
  useEffect(() => {
    if (createdData) {
      console.log('createdDatacreatedData', createdData);
    }
  }, [createdData]);

  // Example: Updating a cart
  const [updateCart, { isLoading: isUpdatingCart }] = useUpdateCartMutation();

  // Example: Deleting a cart
  const [deleteCart, { isLoading: isDeletingCart }] = useDeleteCartMutation();

  if (isLoading || isLoadingCartById || isCreatingCart || isUpdatingCart || isDeletingCart) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || isErrorCartById) {
    return <Text>Error fetching data.</Text>;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
          <Button
            title="Create Cart"
            onPress={() =>
              createCart(
                JSON.stringify({
                  userId: 1,
                  products: [
                    {
                      id: 1,
                      quantity: 1,
                    },
                    {
                      id: 50,
                      quantity: 2,
                    },
                  ],
                })
              )
            }
          />
          <Button
            title="Update Cart"
            onPress={() =>
              updateCart(
                JSON.stringify({
                  merge: true, // this will include existing products in the cart
                  products: [
                    {
                      id: 1,
                      quantity: 1,
                    },
                  ],
                })
              )
            }
          />
          <Button
            title="Delete Cart"
            onPress={() => {
              deleteCart(1);
              refetch();
            }}
          />
          <Text>All Carts: {JSON.stringify(carts)}</Text>
          <Text>Cart by ID: {JSON.stringify(cartById)}</Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;
