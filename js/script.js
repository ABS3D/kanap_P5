fetch("http://localhost:3000/api/products/")
  .then((response) => {
    return response.json();
  })
  .then((kanap) => {
    return produitAccueil(kanap);
  });

/*creation d'une fonction pour récupérer les données*/

function produitAccueil(array) {
  //une boucle pour recuperer les données pour chaque produit
  array.forEach((array) => {
    const id = array._id;

    // variable pour créer la balise alt
    const aHref = document.createElement("a");
    aHref.href = "./product.html?id=" + id;

    // variable pour créer la balise article
    const article = document.createElement("article");

    // donnée et détail pour l'image
    const image = document.createElement("img");
    image.src = array.imageUrl;
    image.alt = array.altTxt + " , " + array.name;

    // donnée et détail dans la balise h3
    const h3 = document.createElement("h3");
    h3.classList.add("productName");
    h3.textContent = array.name;

    // donné et détail dans la balise p
    const p = document.createElement("p");
    p.classList.add("productDescription");
    p.textContent = array.description;

    // appel de la fonction afin de montrer les enfants du parent #Items
    createTagElement(aHref, article, image, h3, p);
  });
}

/*Fonction qui permet de donner des enfants au parent #items afin
de le rendre visible dans le code html dans le DOM*/

function createTagElement(aHref, article, image, h3, p) {
  const items = document.querySelector("#items");
  if (items != null) {
    items.appendChild(aHref);
    aHref.appendChild(article);
    article.appendChild(image);
    article.appendChild(h3);
    article.appendChild(p);
  }
}
