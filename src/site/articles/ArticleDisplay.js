import React, { useEffect } from "react";

function ArticleDisplay(props) {
  const header = props.header;
  const main = props.main;
  return (
    <div>
      <div className="articleHeader">
        <h1 className="title">{header.title}</h1>
        <h3 className="subheader">
          {header.author} • {header.date}
        </h3>
        <img src={header.cover} className="coverImage" alt="cover" />
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: main.innerHTML }}></div>
    </div>
  );
}

export default ArticleDisplay;
