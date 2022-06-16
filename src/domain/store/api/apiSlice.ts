import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {PLACEHOLDER_ARTICLES_URL} from "../../constants/api";
import {ArticleDTO} from "../../../infrastructure/http/dto/ArticleDTO";

export const ApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (builder) => ({
        getAllArticles: builder.query<ArticleDTO,void>({
            query: () => PLACEHOLDER_ARTICLES_URL,
        }),
    }),
})

export const { useGetAllArticlesQuery } = ApiSlice
