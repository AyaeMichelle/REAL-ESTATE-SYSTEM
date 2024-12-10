import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

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
        query: (userId) => ({
          url: `/users/${userId}`,
          method: 'DELETE',
        }),
      }),
      updateUserRole: builder.mutation({
        query: (userId, role) => ({
          url: `/users/${userId}`,
          method: 'PUT',
          body: { role },
        }),
        refetchOnMount: true,
        invalidatesTags: ['User'],
      }),
    }),
  });
  
  export const { useGetUserQuery, useDeleteUserMutation, useUpdateUserRoleMutation,useUpdateUserMutation} = authApi;

  export default authApi;
  