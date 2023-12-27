function parse(element) {
  // parse parse parse
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
