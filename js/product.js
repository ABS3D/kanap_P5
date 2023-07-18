const url = new URL(window.location.href);
const id = url.searchParams.get("id");

//Récupère les données du produit depuis l'API
async function retrieveProductData() {
  return (await fetch(`http://localhost:3000/api/products/${id}`)).json();
}

/*Appelle la fonction pour récupérer les informations du produit
Affiche une erreur dans la console si la récupération n'est pas possible*/
const getProductData = async () => {
  try {
    return retrieveProductData();
  } catch {
    console.error("Erreur lors de la récupération des données du produit");
  }
};

//Fonction globale permettant l'affichage des différentes informations du produit sur la page
const createProductItem = async () => {
  const product = await getProductData();
  createProductImg(product.imageUrl, product.altTxt);
  createProductTitle(product.name);
  createProductDescription(product.description);
  createProductPrice(product.price);
  createProductColors(product.colors);
};

//Implémentation de l'image sur la page du produit
function createProductImg(image, altText) {
  const productItem = document.getElementsByClassName("item__img")[0];
  const productImg = document.createElement("img");
  productImg.src = image;
  productImg.alt = altText;

  productItem.appendChild(productImg);
}

//Implémentation du titre sur la page du produit
function createProductTitle(title) {
  const productName = document.getElementById("title");
  const productTitle = document.getElementsByTagName("title")[0];
  productName.innerText = title;
  productTitle.innerText = title;
}

//Implémentation du prix sur la page du produit
function createProductPrice(price) {
  const productPrice = document.getElementById("price");
  productPrice.innerText = price;
}

//Implémentation de la description sur la page du produit
function createProductDescription(description) {
  const productDescription = document.getElementById("description");
  productDescription.innerText = description;
}

//Implémentation des couleurs sur la page du produit
function createProductColors(colors) {
  const productColors = document.getElementById("colors");
  for (i = 0; i <= colors.length - 1; i++) {
    const options = document.createElement("option");
    options.value = colors[`${i}`];
    options.innerHTML = colors[`${i}`];
    productColors.appendChild(options);
  }
}

//Vérifie la compatibilité du navigateur avec le LocalStorage
function verifyCompatibility() {
  if (localStorage) {
    allSelectedOptions();
  } else {
    console.error(
      "Désolé, votre navigateur ne supporte pas le localStorage..."
    );
  }
}

//Vérifie si les champs nécessaires ont été sélectionnés
function allSelectedOptions() {
  const quantityChoose = parseInt(
    document.getElementById("quantity").value
  );
  const colors = document.getElementById("colors");
  const colorSelected = colors.options[colors.selectedIndex].value;
  if (colorSelected == "" || quantityChoose == 0) {
  } else {
    addToCart(quantityChoose, colorSelected);
  }
}

// Ajout des produits selectionés au local storage
const ajouter = async (quantity, color) => {
  let panier = JSON.parse(localStorage.getItem("panier"));
  let isExist = false;
  if (panier === null || panier === undefined) {
    panier = [];
  } else if (panier.find((item) => item.id === id && item.color == color)) {
    panier.map((obj) => {
      if (obj.id == id && obj.color == color) {
        let quantiteCourant = parseInt(obj.quantity)
        let quantiteSelected = parseInt(quantity)
        let somme = quantiteCourant + quantiteSelected
        obj.quantity = somme
        isExist = true;
      }
    });
    localStorage.setItem("panier", JSON.stringify(panier));
  }
  if (!isExist) {
    panier.push({
      id: id,
      quantity: quantity,
      color: color,
    });
  }
  localStorage.setItem("panier", JSON.stringify(panier));
};

// ecoute d'evenements pour ajouter au panier

const bouton = document.getElementById("addToCart");
if (bouton != null) {
  bouton.addEventListener("click", () => {
    const colors = document.getElementById("colors").value;
    const quantite = document.getElementById("quantity").value;
    if (
      colors == null ||
      colors === "" ||
      quantite == null ||
      quantite < 1 || // Vérification pour une quantité inférieure à 1
      quantite >= 101
    ) {
      alert("Veuillez choisir une couleur et une quantité supérieure à zéro et inférieure à 101, merci.");
      return bouton;
    } else {
      ajouter(quantite, colors);
    }
  });
}


createProductItem();
