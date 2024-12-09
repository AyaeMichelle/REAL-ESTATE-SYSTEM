import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/reviews', // Base URL for your API
    credentials: 'include', // This ensures cookies are sent along with requests if needed
  }),
  tagTypes: ['Reviews'], // Define tags for cache invalidation
  endpoints: (builder) => ({
    // Define the query for fetching all reviews
    allReviews: builder.query({
      query: () => ({
        url: '/all', // Endpoint for getting all reviews
        method: 'GET',
      }),
      providesTags: ['Reviews'],
    }),

    // Define the query for fetching review count
    totalReviewsCount: builder.query({
      query: () => ({
        url: '/count', // Endpoint for getting review count
        method: 'GET',
      }),
      providesTags: ['Reviews'],
    }),

    // Define the mutation for deleting a review
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/${reviewId}`, // Delete review by ID
        method: 'DELETE',
      }),
      // Invalidate the 'Reviews' cache to ensure the reviews list is updated
      // after deletion
      invalidatesTags: ['Reviews'],
    }),
  }),
});

export const { useAllReviewsQuery, useTotalReviewsCountQuery, useDeleteReviewMutation } = reviewApi;

export default reviewApi;
