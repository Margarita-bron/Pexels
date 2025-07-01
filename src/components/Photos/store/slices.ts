import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY, PER_PAGE } from '../constants';
import {
  IParameters,
  IPatch,
  ISearchParameters,
  PexelsResponse,
} from './types';

const TagType = {
  Photo: 'Photo',
};

const baseApi = createApi({
  reducerPath: 'photoAPI',
  tagTypes: Object.values(TagType),
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      headers.set('Authorization', API_KEY);
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const photoAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchCuratedPhotos: build.query<PexelsResponse, IParameters>({
      query: ({ page = 1, per_page = PER_PAGE, orientation, size, color }) => {
        let url = `/v1/curated?page=${String(page)}&per_page=${String(per_page)}`;
        if (orientation) url += `&orientation=${orientation}`;
        if (size) url += `&size=${size}`;
        if (color) url += `&color=${color}`;
        return url;
      },
      providesTags: Object.values(TagType),
    }),
    postPhoto: build.mutation<string, IPatch>({
      query: ({ id, ...patch }) => ({
        url: `post/${String(id)}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (error) => (error ? [] : [TagType.Photo]),
    }),
    searchPhotos: build.query<PexelsResponse, ISearchParameters>({
      query: ({
        query,
        page = 1,
        per_page = PER_PAGE,
        orientation,
        size,
        color,
      }) => {
        let url = `/v1/search?query=${encodeURIComponent(query)}&page=${String(page)}&per_page=${String(per_page)}`;
        if (orientation) url += `&orientation=${orientation}`;
        if (size) url += `&size=${size}`;
        if (color) url += `&color=${color}`;
        return url;
      },
      providesTags: Object.values(TagType),
    }),
  }),
});

export const { useFetchCuratedPhotosQuery, useSearchPhotosQuery } = photoAPI;
