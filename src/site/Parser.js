function parse(element, main) {
  element.getElementsByTagName("header")[0].style.display = "none";
  // parse img elements
  var coll = element.getElementsByTagName("img");
  for (var i = 0; i < coll.length; i++) {
    coll[i].className = "articleImg";
    coll[i].src = main.split("\\").slice(0, -1).join("\\") + "\\" + coll[i].getAttribute("img-src"); // replaces main.html in the path with the src of the img
  }
  // parse code elements

  coll = element.getElementsByTagName("code");
  for (i = 0; i < coll.length; i++) {
    if (coll[i].className === "") {
      coll[i].className = "none";
    }
    if (coll[i].hasAttribute("block")) {
      var e = coll[i];
      var pre = document.createElement("pre");
      e.innerHTML = e.innerHTML.replaceAll("<", "&lt");
      e.replaceWith(e, pre);
      pre.appendChild(e);
      pre.className = "";
    }
    coll[i].className = "language-" + coll[i].className;
  }

  // parse p elements
  coll = element.getElementsByTagName("p");
  for (i = 0; i < coll.length; i++) {
    coll[i].className = "articleText";
  }

  // parse math elements

  // coll = element.getElementsByTagName("math");
  // for (var i = 0; i < coll.length; i++) {}

  // parse headers
  for (var j = 1; j <= 6; j++) {
    coll = element.getElementsByTagName("h" + j);
    for (var i = 0; i < coll.length; i++) {
      coll[i].className = "header-h" + j;
    }
  }

  return element;
}

function load(url) {
  return fetch("/" + url.replaceAll("\\", "/"))
    .then((response) => {
      return response.text();
    })
    .catch((error) => {
      console.warn(error);
    });
}
export { parse, load };
