import {IArticlesRepository, IArticlesService} from "../ports/articlesPorts";
import http from "../../infrastructure/http/helpers/httpAxios";

interface Props {
  articlesRepository: IArticlesRepository;
}

export const articleService = ({
articlesRepository,
                               }: Props): IArticlesService => ({
    fetchArticles: () => articlesRepository.getAllArticle(http)

});
