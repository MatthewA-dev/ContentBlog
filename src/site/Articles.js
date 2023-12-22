import ArticleList from "../articles/ArticleList.js";
import React, {useState} from 'react';

function Articles(){
    const [isReadingArticle, updateIsReadingArticle] = useState(false);
    const [currentArticle, updateCurrentArticle] = useState(null);
    return (
        <div className="main">
            <ArticleList/>
        </div>   
    );
}

export default Articles;