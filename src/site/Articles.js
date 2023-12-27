import ArticleList from "./articles/ArticleList.js";
import React, { useState, useEffect } from "react";
import { parse, load } from "./Parser.js";

const article = undefined;

function Articles() {
  const [articleMeta, updateArticleMeta] = useState(undefined);

  useEffect(() => {
    if (articleMeta) {
      load(articleMeta.main)
        .then((text) => {
          article = document.createElement("div");
          article.innerHTML = text;
          article = parse(article);
        })
        .catch((err) => {
          console.log("Error " + err);
          article = undefined;
        });
    } else {
      article = undefined;
    }
  }, [articleMeta]);

  const render = () => {
    if (isReadingArticle) {
      return currentArticle;
    }
    return <ArticleList updateMeta={updateArticleMeta} />;
  };
  return <div className="main">{render()}</div>;
}

export default Articles;
