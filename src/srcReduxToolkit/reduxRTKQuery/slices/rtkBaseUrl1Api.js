/* eslint-disable no-nested-ternary */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setRTKCreatedDataAction } from './cakeSlice';

const bodyUpdateCart = JSON.stringify({
  merge: true, // this will include existing products in the cart
  products: [
    {
      id: 9,
      quantity: 1,
    },
  ],
});

// RTK Query "tags" usage flow:
// 1. Define "tagTypes"
// 2. "providesTags" in query(this will be used to recall api call when invalidatesTags is called)
// 3. Call "invalidatesTags" in mutation(this will call "providedTags" queries)

// Define an API slice using RTK Query
export const rtkBaseUrl1Api = createApi({
  reducerPath: 'rtkBaseUrl1Api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/carts' }), // Replace with your API base URL
  tagTypes: ['Cart', 'CartById', 'UNAUTHORIZED', 'UNKNOWN_ERROR'], // mention all tags here that to be used in `providesTags`/"invalidateTags" of `endpoints` below
  endpoints: (builder) => ({
    // Define endpoint for fetching data
    getCarts: builder.query({
      query: () => `/`,
      // forceRefetch: true, // will always call api
      providesTags: ['Cart'], // will be called again when invalidatesTags=["Cart"] is called
      transformResponse: (response, meta, arg) => {
        console.log('getCarts getCarts RESPONSE', response);
        return response;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log('getCarts getCarts ERROR', response);
        return response;
      },
    }),

    // The query accepts a number and returns a Cart
    getCartById: builder.query({
      // note: an optional `queryFn` may be used in place of `query`
      query: (cartId) => ({ url: `/${cartId}` }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response, meta, arg) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: (result, error, id) =>
        result
          ? [{ type: 'CartById', id }]
          : error?.status === 401
            ? ['UNAUTHORIZED']
            : ['UNKNOWN_ERROR'],
      // The 2nd parameter is the destructured `QueryLifecycleApi`
      async onQueryStarted(
        arg,
        { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry, updateCachedData }
      ) {
        console.log('getStategetState', getState()?.cake);
      },
    }),
    // Define endpoint for creating new user
    createCart: builder.mutation({
      query: (body) => ({
        url: '/add',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }),
      invalidatesTags: ['Cart'], // invalidates/refetch all queries with the tag 'Carts'
      transformResponse: (response, meta, arg) => {
        console.log('transformResponsetransformResponse', response?.products);
        return response;
      },
      // The 2nd parameter is the destructured `QueryLifecycleApi`
      async onQueryStarted(
        arg,
        { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry, updateCachedData }
      ) {
        console.log('onQueryStartedonQueryStarted000', arg, getState()?.cake);
      },
      // The 2nd parameter is the destructured `QueryCacheLifecycleApi`
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
          updateCachedData,
        }
      ) {
        console.log('onCacheEntryAddedonCacheEntryAdded111', arg, getState()?.cake);
        dispatch(setRTKCreatedDataAction(arg)); // will store response in cake slice state
      },
    }),

    // Define endpoint for updating user
    updateCart: builder.mutation({
      query: (body = bodyUpdateCart) => ({
        url: `${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, body) => [{ type: 'CartById', id: body?.id }],
    }),
    // Define endpoint for deleting user
    deleteCart: builder.mutation({
      query: (userId) => ({
        url: `${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in React components
export const {
  useGetCartsQuery,
  useGetCartByIdQuery,
  useCreateCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
} = rtkBaseUrl1Api;
