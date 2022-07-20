import { IArticlesRepository } from "../../domain/ports/articlesPorts";
import { Http } from "../../domain/ports/Http";
import { PLACEHOLDER_ARTICLES_URL } from "../../domain/constants/api";
import { ArticleDTO } from "../http/dto/ArticleDTO";

export const articleRepository = (client: Http): IArticlesRepository => ({
  getArticles: async () => {
    return await client
      .get<ArticleDTO[]>(PLACEHOLDER_ARTICLES_URL)
      .then((response) => response)
      .catch((error) => console.log(error));
  },
});
