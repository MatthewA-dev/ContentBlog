import ArticleList from "./articles/ArticleList.js";
import ArticleDisplay from "./articles/ArticleDisplay.js";
import React, { useState, useEffect } from "react";
import { parse, load } from "./Parser.js";

function Articles(props) {
  const [articleMeta, updateArticleMeta] = useState(undefined);
  const [article, updateArticle] = useState(undefined);
  useEffect(() => {
    if (props.main) {
      updateArticleMeta({ main: decodeURIComponent(props.main) });
    }
  }, [props.main]);

  useEffect(() => {
    if (articleMeta) {
      load(articleMeta.main)
        .then((text) => {
          var temp_article = document.createElement("div");
          temp_article.innerHTML = text;
          updateArticle(parse(temp_article, articleMeta.main));
        })
        .catch((err) => {
          console.log("Error " + err);
          updateArticle(undefined);
        });
    } else {
      updateArticle(undefined);
    }
  }, [articleMeta]);

  const back = () => {
    updateArticleMeta(undefined);
    updateArticle(undefined);
  };

  const render = () => {
    if (articleMeta && article) {
      // check if undefined
      return <ArticleDisplay header={articleMeta} main={article} back={back} />;
    }
    return <ArticleList updateMeta={updateArticleMeta} />;
  };
  return <div className="main">{render()}</div>;
}

export default Articles;
