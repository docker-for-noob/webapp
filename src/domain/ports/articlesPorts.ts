import { Article } from "../models/Article";
import {ArticleDTO} from "../../infrastructure/http/dto/ArticleDTO";
import {Http} from "./Http";
import {AxiosPromise} from "axios";

export interface IArticlesRepository {
  getAllArticle: (client: Http) => Promise<AxiosPromise< ArticleDTO[]>>;
}

export interface IArticlesService {
  fetchArticles: () => Promise<AxiosPromise< Article[]>>;
}
