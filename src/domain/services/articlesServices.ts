import { IArticlesRepository, IArticlesService } from "../ports/articlesPorts";

interface Props {
  articlesRepository: IArticlesRepository;
}

export const articleService = ({
  articlesRepository,
}: Props): IArticlesService => ({
  fetchArticles: () => {
    return articlesRepository.getArticles();
  },
});
