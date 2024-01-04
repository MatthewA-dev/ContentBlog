import React from "react";

function ArticleCard(props) {
  const data = props.data;
  return (
    <div className="articleCard" onClick={() => props.update(data)}>
      <img className="coverCard" src={data.cover} alt="cover" />
      <div className="container">
        <div>
          <h1>{data.title}</h1>
          <h3>
            {data.author} • {data.date}
          </h3>
        </div>
      </div>
    </div>
  );
}
//<img className="cover"src={"\\" + data.cover}></img>
export default ArticleCard;
