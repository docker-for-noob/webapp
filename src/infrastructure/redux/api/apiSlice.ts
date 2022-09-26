import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PLACEHOLDER_ARTICLES_URL } from "./endpoint";
import { ArticleDTO } from "./ArticleDTO";
import { REHYDRATE } from "redux-persist/es/constants";

export const apiSlice = createApi({
  reducerPath: "api",
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getAllArticles: builder.query<ArticleDTO, void>({
      query: () => PLACEHOLDER_ARTICLES_URL,
    }),
    updateArticles: builder.mutation<ArticleDTO, void>({
      query: ({ id, ...patch }: any) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
  }),
});

export const { useGetAllArticlesQuery } = apiSlice;

const updateArticles = apiSlice.endpoints.updateArticles;
