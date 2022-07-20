import { articleService } from "../domain/services/articlesServices";
import { articleRepository } from "../infrastructure/repositories/articleRepository";
import { httpAxios } from "../infrastructure/http/helpers/httpAxios";
const axios = require("axios");
import { mockedArticleData } from "../mocks/MockArticle";

jest.mock("axios");

test("Fetch article with Mock axios ", () => {
  const service = articleService({
    articlesRepository: articleRepository(httpAxios),
  });
  axios.get.mockResolvedValue({
    data: mockedArticleData,
  });

  service.fetchArticles().then((articles) => {
    expect(articles).toBe(mockedArticleData);
  });
});
