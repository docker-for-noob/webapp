import React, {useCallback, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {helloWorldService} from "@domain/services/helloWorldServices";
import {articleService} from "@domain/services/articlesServices";
import {articleRepository} from "@infrastructure/repositories/articleRepository";
import {httpAxios} from "@infrastructure/http/helpers/httpAxios";
import {Article} from "@domain/models/Article";


function App() {
    const service = articleService(articleRepository(httpAxios));
    const [articles, setArticles] = useState<Article[]>();
    const [state,setState] = useState(0);

    const getArticles = useCallback(async () => {
            const responseArticles = await service.fetchArticles();
            setArticles(responseArticles);
    }, []);

    React.useEffect(() => {
        getArticles();
    }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

          {helloWorldService.getHelloWorld()}
          <button onClick={()=> setState(state +1 )}>Increment</button>
          <p>Incr :  {state}</p>

          {JSON.stringify(articles)}
      </header>
    </div>
  );
}

export default App;
