import React, { useState, useEffect } from 'react';
import ArticleCard from "./ArticleCard.js";



function loadArticles(setter){
    fetch("/articles.json").then(function(res) {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    }).then((data) => {
        setter(data)
    }).catch(
        (error) => console.log(error)
    )
}

function ArticleList(){
    const [articles, setArticles] = useState([]);
    useEffect(() => {loadArticles(setArticles)},[]);


    // todo: add loading / error
    return (
        <div>
            {articles.map((element) => <ArticleCard data={element} />)}
        </div>);
}

export default ArticleList;