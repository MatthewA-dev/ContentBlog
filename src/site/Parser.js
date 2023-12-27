function parse(element) {
  // parse p elements
  var coll = element.getElementsByTagName("p");
  for (var i = 0; i < coll.length; i++) {
    coll[i].className = "articleText";
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
