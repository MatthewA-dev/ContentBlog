import ArticleList from "./articles/ArticleList.js";
import React, { useState, useEffect } from "react";
import { parse, load } from "./Parser.js";

function Articles() {
  const [articleMeta, updateArticleMeta] = useState(undefined);
  const [article, updateArticle] = useState(undefined);
  useEffect(() => {
    if (articleMeta) {
      load(articleMeta.main)
        .then((text) => {
          var temp_article = document.createElement("div");
          temp_article.innerHTML = text;
          updateArticle(parse(temp_article));
        })
        .catch((err) => {
          console.log("Error " + err);
          updateArticle(undefined);
        });
    } else {
      updateArticle(undefined);
    }
  }, [article, articleMeta]);

  const render = () => {
    if (articleMeta && article) {
      // check if undefined
      return <div dangerouslySetInnerHTML={{ __html: article.innerHTML }}></div>;
    }
    return <ArticleList updateMeta={updateArticleMeta} />;
  };
  return <div className="main">{render()}</div>;
}

export default Articles;
