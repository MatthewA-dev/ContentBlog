import React, { useEffect } from "react";
import Prism from "prismjs";

function ArticleDisplay(props) {
  const header = props.header;
  const main = props.main;
  const copy = () => {
    navigator.clipboard.writeText(window.location.href.split("?")[0] + "?main=" + encodeURIComponent(header.main));
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [main]);
  // get meta information from file (incase we are redirected or linked directly from url)
  const title = header.title ?? main.getElementsByTagName("title")[0].text;
  const cover =
    header.cover ?? header.main.split("\\").slice(0, -1).join("\\") + "\\" + main.getElementsByTagName("cover")[0].getAttribute("src").replace("/", "\\");
  const author = header.author ?? main.getElementsByTagName("author")[0].textContent;
  const date =
    header.date ??
    main.getElementsByTagName("date")[0].getAttribute("year") +
      "-" +
      main.getElementsByTagName("date")[0].getAttribute("month") +
      "-" +
      main.getElementsByTagName("date")[0].getAttribute("day");
  // builds date to year - month - day
  return (
    <div>
      <div className="articleHeader">
        <div className="btnContainer">
          <div className="backBtn" onClick={props.back}>
            Back
          </div>
          <div className="copyBtn" onClick={copy}>
            Copy Article URL to Clipboard
          </div>
        </div>
        <h1 className="title">{title}</h1>
        <h3 className="subheader">
          {author} • {date}
        </h3>
        <img src={cover} className="coverImage" alt="cover" />
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: main.innerHTML }}></div>
    </div>
  );
}

export default ArticleDisplay;
