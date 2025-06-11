import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY, API_URL, PER_PAGE } from '../constants';
import { PexelsResponse } from './types';

export const photoAPI = createApi({
  reducerPath: 'photoAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', API_KEY);
      return headers;
    },
  }),
  tagTypes: ['Photo'],
  endpoints: (build) => ({
    fetchCuratedPhotos: build.query<
      PexelsResponse,
      { page?: number; per_page?: number }
    >({
      query: ({ page = 1, per_page = PER_PAGE }) =>
        `curated?page=${String(page)}&per_page=${String(per_page)}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.photos.push(...newItems.photos);
        currentCache.page = newItems.page;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: ['Photo'],
    }),
    searchPhotos: build.query<
      PexelsResponse,
      { query: string; page?: number; per_page?: number }
    >({
      query: ({ query, page = 1, per_page = PER_PAGE }) =>
        `search?query=${encodeURIComponent(query)}&page=${String(page)}&per_page=${String(per_page)}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.photos.push(...newItems.photos);
        currentCache.page = newItems.page;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: ['Photo'],
    }),
  }),
});

export const { useFetchCuratedPhotosQuery, useSearchPhotosQuery } = photoAPI;
