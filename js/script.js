fetch("http://localhost:3000/api/products/")
  .then((res) => res.jason)
  .then((data) => addProducts(data));

function addProducts(donnees) {
  const id = donnees[0]._id;

  const anchor = makeAnchor(id);
  appendChildren(anchor);
}

function makeAnchor(id) {
  const anchor = document.createElement("a");
  anchor.href = "./product.html" + id;
  return anchor;
}

function appendChildren(anchor) {
  const items = document.querySelector("#items");
  if (items != null) {
    items.appendChild(anchor);
  }
}

function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}
