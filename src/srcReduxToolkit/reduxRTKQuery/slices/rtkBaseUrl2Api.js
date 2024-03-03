import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setArrayOfRtkDataAction } from './cakeSlice';

export const rtkBaseUrl2Api = createApi({
  reducerPath: 'rtkBaseUrl2Api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.example.com' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (formData, { dispatch, getState }) => {
        // Access Redux store and dispatch actions if needed
        const token = getState().cake.myName; // Example of accessing state
        dispatch(setArrayOfRtkDataAction(['A', 'B', 'C', 'D', 'E'])); // Example of dispatching an action

        // Create FormData and handle headers
        const headers = {
          // Specify headers as needed
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Example authorization header
        };
        const body = new FormData();
        body.append('key1', 'value1');
        body.append('key2', 'value2');

        // Return fetch options
        return {
          url: '/users',
          method: 'POST', // or 'GET', 'PUT', 'DELETE', etc.
          headers,
          body,
        };
      },
      responseHandler: async (response) => {
        // Modify the response data as needed
        const data = await response.json();
        // Example response modification (add additional property)
        return { ...data, customProperty: 'value' };
      },
    }),
  }),
});

export const { useGetUsersQuery } = rtkBaseUrl2Api;
