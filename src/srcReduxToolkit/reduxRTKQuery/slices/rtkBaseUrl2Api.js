import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkBaseUrl2Api = createApi({
  reducerPath: 'rtkBaseUrl2Api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://example.com' }),
  tagTypes: ['Post', 'UNAUTHORIZED', 'UNKNOWN_ERROR'],
  endpoints: (build) => ({
    postById: build.query({
      query: (id) => `post/${id}`,
      providesTags: (result, error, id) =>
        result
          ? [{ type: 'Post', id }] // If the query is successful, provide the 'Post' tag with the corresponding ID
          : error?.status === 401
            ? ['UNAUTHORIZED'] // If the query returns an unauthorized error, provide the 'UNAUTHORIZED' tag
            : ['UNKNOWN_ERROR'], // If the query returns any other error, provide the 'UNKNOWN_ERROR' tag
    }),
    login: build.mutation({
      query: () => {
        // // Create FormData and handle headers
        // const headers = {
        //   // Specify headers as needed
        //   'Content-Type': 'multipart/form-data',
        //   Authorization: `Bearer ${token}`, // Example authorization header
        // };
        // const body = new FormData();
        // body.append('key1', 'value1');
        // body.append('key2', 'value2');
        return {
          url: `/login`,
          method: 'POST',
        };
      },
      invalidatesTags: (result) => (result ? ['UNAUTHORIZED'] : []), // If the login mutation is successful, invalidate the 'UNAUTHORIZED' tag
    }),
    refetchErroredQueries: build.mutation({
      queryFn: () => ({ data: null }),
      invalidatesTags: ['UNKNOWN_ERROR'], // Invalidate the 'UNKNOWN_ERROR' tag when this mutation is executed
    }),
  }),
});

export const { usePostByIdQuery, useLoginMutation, refetchErroredQueries } = rtkBaseUrl2Api;
