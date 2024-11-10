// src/api/postsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the postsApi slice with RTK Query
export const postsApi = createApi({
  // Unique key for the API slice in Redux state
  reducerPath: 'postsApi',

  // Configure base query settings, including the base URL for all requests
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),

  // Define cache tag types for automatic cache invalidation
  tagTypes: ['Posts'],

  // Define API endpoints (queries and mutations)
  endpoints: (builder) => ({
    // Query to fetch a paginated list of posts
    getPosts: builder.query({
      // URL and parameters for paginated posts
      query: ({ page = 1, limit = 10 }) => `/posts?_page=${page}&_limit=${limit}`,

      // Tagging posts to automatically refresh this cache when needed
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Posts', id })), { type: 'Posts', id: 'LIST' }]
          : [{ type: 'Posts', id: 'LIST' }],
    }),

    // Query to fetch a single post by its ID
    getPostById: builder.query({
      // Define query with post ID in the URL path
      query: (id) => `/posts/${id}`,

      // Tag individual post by ID for selective cache invalidation
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),

    // Mutation to create a new post
    createPost: builder.mutation({
      // Configure the POST request details and payload
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),

      // Invalidate all posts (paginated list) to refresh after creating a post
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),

    // Mutation to update an existing post by its ID
    updatePost: builder.mutation({
      // Define the PUT request with post ID and updated data in the payload
      query: ({ id, ...updatedData }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: updatedData,
      }),

      // Invalidate cache for both the updated post and the paginated list
      invalidatesTags: (result, error, { id }) => [
        { type: 'Posts', id },
        { type: 'Posts', id: 'LIST' },
      ],
    }),

    // Mutation to delete a post by its ID
    deletePost: builder.mutation({
      // Define the DELETE request with post ID in the URL path
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),

      // Invalidate cache for the deleted post and the paginated list
      invalidatesTags: (result, error, id) => [
        { type: 'Posts', id },
        { type: 'Posts', id: 'LIST' },
      ],
    }),
  }),
});

// Export generated hooks for each endpoint to use them in components
export const {
  useGetPostsQuery, // Use this when you want data to be fetched automatically as the component mounts or when the query parameters change.
  useLazyGetPostsQuery, // Use this when you need more control over when the query runs, such as in response to a user action (e.g., clicking a button), conditional fetching, or specific events.
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
