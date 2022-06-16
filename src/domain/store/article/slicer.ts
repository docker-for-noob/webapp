import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ArticleDTO} from "../../../infrastructure/http/dto/ArticleDTO";
import {articleService} from "../../services/articlesServices";
import {articlesRepository} from "../../../infrastructure/repositories/articleRepository";
import {Article} from "../../models/Article";

const initialState: Article[] = [];

export const retrieveArticle = createAsyncThunk(
    "article/retrieve",
    async (httpAxios) => {
        const res = await articleService({articlesRepository}).fetchArticles()
        return res.data;
    }
);

const ArticleSlice = createSlice({
    name: 'articleStore',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(retrieveArticle.fulfilled, (state, action) => {
            return [...action.payload]
        })
    },
});

export const {} = ArticleSlice.actions;

export default ArticleSlice.reducer;