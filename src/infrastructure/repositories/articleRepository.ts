import {IArticlesRepository} from "../../domain/ports/articlesPorts";
import {Http} from "../../domain/ports/Http";
import {PLACEHOLDER_ARTICLES_URL} from "../../domain/constants/api";


const getAllArticle = async (client: Http) => await client.get(PLACEHOLDER_ARTICLES_URL)

export const articlesRepository: IArticlesRepository = {
    getAllArticle,
}
