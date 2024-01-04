import React, { useState } from "react";
import Header from "./site/Header";
import Home from "./site/Home";
import Articles from "./site/Articles";
import AboutMe from "./site/AboutMe";

function App() {
  const [page, setPage] = useState("home");
  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "articles":
        return <Articles />;
      case "aboutme":
        return <AboutMe />;
      default:
        return <p>An error occured</p>;
    }
  };
  return (
    <div>
      <Header updatePage={setPage} />
      <div className="full">{renderPage()}</div>
    </div>
  );
}

export default App;
