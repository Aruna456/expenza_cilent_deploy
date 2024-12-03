import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = 'http://localhost:8003';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: builder => ({
    // Get categories
    getCategories: builder.query({
      query: () => '/api/categories',
      providesTags: ['categories'],
    }),
    // Get labels
    getLabels: builder.query({
      query: () => '/api/labels',
      providesTags: ['transaction'],
    }),
    // Add new transaction
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        url: '/api/transaction',
        method: 'POST',
        body: initialTransaction,
      }),
      invalidatesTags: ['transaction'],
    }),
    // Delete record
    deleteTransaction: builder.mutation({
      query: recordId => ({
        url: '/api/transaction',
        method: 'DELETE',
        body: recordId,
      }),
      invalidatesTags: ['transaction'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetLabelsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation
} = apiSlice;

export default apiSlice;
