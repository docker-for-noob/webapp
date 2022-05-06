import {IArticlesRepository} from "../../domain/ports/articlesPorts";
import {Http} from "../../domain/ports/Http";
import {ArticleDTO} from "../http/dto/ArticleDTO";

export const articleRepository = (client: Http): IArticlesRepository  => ({
    getArticles: async () => {
        return await client.get<ArticleDTO[]>("https://jsonplaceholder.typicode.com/posts")
             .then(response => response)
             .catch(error => console.log(error));
    }
});