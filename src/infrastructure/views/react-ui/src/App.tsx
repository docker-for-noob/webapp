import React, {useEffect, useState} from 'react';
import './App.css';
import {HelloWorldService} from "@domain/services/helloWorldServices";
import {articleService} from "@domain/services/articlesServices";
import {articleRepository} from "@infrastructure/repositories/articleRepository";
import {httpAxios} from "@infrastructure/http/helpers/httpAxios";
import {Article} from "@domain/models/Article";
import {HelloWorldRepository} from "@infrastructure/repositories/helloWorldRepository";


type AppState = {
    articles: Article[];
    count : number;
}

function App() {
    const articleServices = articleService({
        articlesRepository: articleRepository(httpAxios)
    });
    const helloWorldServices = new HelloWorldService(
        new HelloWorldRepository()
    );

    const [state,setState] = useState<AppState>({
        articles: [],
        count: 0
    });

    const getArticles = async () => {
        const responseArticles = await articleServices.fetchArticles();
        setState({...state, articles: responseArticles});
    };

    useEffect(() => {
        getArticles();
    });


    return (
        <div className="App">
            <header className="App-header">

                {helloWorldServices.getHelloWorld()}
                <button onClick={() => setState({...state, count: state.count + 1})}>Increment</button>
                <p>Increment : {state.count}</p>

                {JSON.stringify(state.articles)}
            </header>
        </div>
    );
}

export default App;
