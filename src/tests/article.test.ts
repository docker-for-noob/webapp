import {articleService} from "../domain/services/articlesServices";

const axios = require("axios");
import {mockedArticleData} from "../mocks/MockArticle";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter';
import {articlesRepository} from "../infrastructure/repositories/articleRepository";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mock = new MockAdapter(axios);

test("Fetch article with Mock axios ", () => {

    const service = articleService({articlesRepository});

    axios.get.mockResolvedValue({
        data: mockedArticleData,
    });



    service.fetchArticles().then((articles) => {
        expect(articles).toBe(mockedArticleData);
    });
});
