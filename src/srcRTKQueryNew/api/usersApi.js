// src/api/usersApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the Redux auth state
      const { token } = getState().auth;

      // If the token exists, set it in the Authorization header
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      // Optional: include credentials if needed by the API
      headers.set('credentials', 'include');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Fetch user profile with token in Authorization header
    getUserProfile: builder.query({
      query: () => '/auth/me',
    }),
  }),
});

export const { useGetUserProfileQuery } = usersApi;
