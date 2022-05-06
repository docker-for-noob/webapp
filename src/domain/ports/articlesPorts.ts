import {Article} from "../models/Article";

export interface IArticlesRepository {
    getArticles: () => Promise<Article[]>;
}

export interface IArticlesService{
    fetchArticles: () => Promise<Article[]>;
}

