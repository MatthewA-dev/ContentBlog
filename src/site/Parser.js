function parse(element) {
  // get rid of head and body elements
  element.innerHTML = element.getElementByTagName("body").innerHTML;
  const p = element.getElementsByTagName("p");
  for (var i = 0; i <= p.length(); i++) {
    p[i].className = "text";
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
