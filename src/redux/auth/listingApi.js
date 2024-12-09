import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const listingApi = createApi({
  reducerPath: "listingApi", // Unique reducer path
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/listing", // Base URL for your API
    credentials: "include", // Include credentials if needed
  }),
  tagTypes: ["Listing"], // Define tags for cache invalidation
  endpoints: (builder) => ({
    getListings: builder.query({
      query: () => ({
        url: "/get",
        method: "GET",
      }),
      providesTags: ["Listing"], // Use this for cache tracking
    }),
    allListings: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
      providesTags: ["Listing"],
    }),
    totalListingsCount: builder.query({
      query: () => ({
        url: "/total/count",
        method: "GET",
      }),
      providesTags: ["Listing"],
    }),
    deleteListing: builder.mutation({
      query: (listingId) => ({
        url: `/delete/${listingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Listing"], // Invalidate cache after mutation
    }),
    updateListing: builder.mutation({
      query: ({id, ...updatedData }) => ({
        url: `/update/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
    }),
    getListing: builder.query({
      query: (listingId) => ({
        url: `/get/${listingId}`,
        method: "GET",
      }),
      providesTags: ["Listing"],
    }),
  }),
});

// Export hooks for the endpoints
export const {
  useGetListingsQuery,
  useAllListingsQuery,
  useTotalListingsCountQuery,
  useDeleteListingMutation,
  useUpdateListingMutation,
  useGetListingQuery,
} = listingApi;

export default listingApi;
