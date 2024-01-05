import React, { useState, useEffect } from "react";
import Articles from "./site/Articles";

function App() {
  const queryParameters = new URLSearchParams(window.location.search);
  var temp = queryParameters.get("main");
  const [main, setMain] = useState(null);
  useEffect(() => {
    if (temp) {
      setMain(temp);
      window.history.replaceState(null, null, window.location.href.split("?")[0]);
    }
  }, [temp]);
  return (
    <div>
      <div className="full">
        <Articles main={main} />;
      </div>
    </div>
  );
}

export default App;
