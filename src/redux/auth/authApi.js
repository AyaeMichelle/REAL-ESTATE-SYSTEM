import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      refetchOnMount: true,
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,  // Correct the URL format
        method: 'PUT',
        body: { role },  // Pass the role in the request body
      }),
      refetchOnMount: true,
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useUpdateUserMutation,
} = authApi;

export default authApi;
