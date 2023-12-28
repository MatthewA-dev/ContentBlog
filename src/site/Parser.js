function parse(element, meta) {
  // parse p elements
  var coll = element.getElementsByTagName("p");
  for (var i = 0; i < coll.length; i++) {
    coll[i].className = "articleText";
  }
  // parse img elements
  coll = element.getElementsByTagName("img");
  for (var i = 0; i < coll.length; i++) {
    coll[i].className = "articleImg";
    console.log(coll[i].src);
    coll[i].src = meta.main.split("\\").slice(0, -1).join("\\") + "\\" + coll[i].getAttribute("img-src"); // replaces main.html in the path with the src of the img
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
