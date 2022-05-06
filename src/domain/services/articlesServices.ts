import {IArticlesRepository, IArticlesService} from "../ports/articlesPorts";



export const articleService = (repository: IArticlesRepository): IArticlesService => ({
     fetchArticles: () => {
       return  repository.getArticles()
    }
  });

