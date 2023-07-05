const dataStorage = JSON.parse(localStorage.getItem("panier"));

// Récupère les données du produit depuis l'API
async function retrieveProductData(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    return response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des données du produit");
  }
}

/*
  Appelle la fonction pour récupérer les informations du produit
 Renvoie une erreur console si la récupération n'est pas possible
 */
// Crée l'article global qui contiendra le produit choisi
const createCardProduct = async (data) => {
  const product = await retrieveProductData(data.id);
  const cardItem = document.getElementById("cart__items");
  const articleItem = document.createElement("article");
  articleItem.setAttribute("class", "cart__item");
  articleItem.setAttribute("data-id", `${data.id}`);
  articleItem.setAttribute("data-color", `${data.color}`);
  cardItem.appendChild(articleItem);
  showImageProduct(articleItem, product.altTxt, product.imageUrl);
  showInfosItem(articleItem, product.name, data.color, product.price);
  showSettingsItem(articleItem, data.quantity);
};

// Crée la partie de modification du produit
function showSettingsItem(container, quantity) {
  const settingsItem = document.createElement("div");
  settingsItem.setAttribute("class", "cart__item__settings");
  container.appendChild(settingsItem);
  showQuantityProduct(settingsItem, quantity);
  showDeletedProduct(settingsItem);
}

//Crée la section d'informations du produit
function showInfosItem(container, name, color, price) {
  const infosItem = document.createElement("div");
  infosItem.setAttribute("class", "cart__item__content");
  container.appendChild(infosItem);
  const descriptionItem = document.createElement("div");
  descriptionItem.setAttribute("class", "cart__item__content__description");
  infosItem.appendChild(descriptionItem);
  showTitleProduct(descriptionItem, name);
  showColorProduct(descriptionItem, color);
  showPriceProduct(descriptionItem, price);
}

//Affiche l'image du produit sélectionné
function showImageProduct(container, altTxt, image) {
  const itemImg = document.createElement("div");
  itemImg.setAttribute("class", "cart__item__img");
  container.appendChild(itemImg);

  const img = document.createElement("img");
  img.setAttribute("src", image);
  img.setAttribute("alt", altTxt);
  itemImg.appendChild(img);
}

// Affiche le nom du produit sélectionné
function showTitleProduct(div, title) {
  const titleItem = document.createElement("h2");
  titleItem.innerText = title;

  div.appendChild(titleItem);
}

// Affiche la couleur choisie pour le produit sélectionné
function showColorProduct(div, color) {
  const colorItem = document.createElement("p");
  colorItem.innerText = color;

  div.appendChild(colorItem);
}

// Affiche le prix du produit sélectionné
function showPriceProduct(div, price) {
  const priceItem = document.createElement("p");
  priceItem.innerText = price + "€";

  div.appendChild(priceItem);
}

// Affiche le sélecteur de quantité avec la quantité choisie pour le produit sélectionné
function showQuantityProduct(div, quantity) {
  const settingsQuantity = document.createElement("div");
  settingsQuantity.setAttribute(
    "class",
    "cart__item__content__settings__quantity"
  );
  div.appendChild(settingsQuantity);

  const quantityItem = document.createElement("p");
  quantityItem.innerText = "Qté :";
  settingsQuantity.appendChild(quantityItem);

  const quantityInput = document.createElement("input");
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("class", "itemQuantity");
  quantityInput.setAttribute("name", "itemQuantity");
  quantityInput.setAttribute("min", "1");
  quantityInput.setAttribute("max", "100");
  quantityInput.setAttribute("value", `${quantity}`);
  settingsQuantity.appendChild(quantityInput);
}

//Affiche le bouton pour supprimer un produit
function showDeletedProduct(div) {
  const settingsDeleted = document.createElement("div");
  settingsDeleted.setAttribute(
    "class",
    "cart__item__content__settings__delete"
  );
  div.appendChild(settingsDeleted);

  const deletedProduct = document.createElement("p");
  deletedProduct.setAttribute("class", "deleteItem");
  deletedProduct.innerText = "Supprimer";
  settingsDeleted.appendChild(deletedProduct);
}

// Écoute les modifications des entrées sur la page pour chaque produit, puis met à jour leur quantité
addEventListener("input", function () {
  let quantitySelector = document.getElementsByClassName("itemQuantity");
  for (let i = 0; i < quantitySelector.length; i++) {
    quantitySelector[i].addEventListener("change", (e) => {
      let productQuantity = e.target.value;
      if (productQuantity == 0 || productQuantity >= 100) {
        console.error("La quantité doit être comprise entre 1 et 100");
        productQuantity = `${dataStorage[i].quantity}`;
      } else {
        dataStorage.map((obj) => {
          if (obj.id == dataStorage[i].id && obj.color == dataStorage[i].color) {
            obj.quantity = parseInt(productQuantity);
          }
        });
        localStorage.setItem("panier", JSON.stringify(dataStorage));
        totalRefresh();
        console.log("Quantité mise à jour");
      }
    });
  }
});

// Pour chaque produit, si un clic est effectué sur le bouton de suppression, le supprimer
document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById("cart__items");
  
    cartItemsContainer.addEventListener("click", function(e) {
      if (e.target.classList.contains("deleteItem")) {
        const articleDOM = e.target.closest("article");
        const productId = articleDOM.getAttribute("data-id");
        const productColor = articleDOM.getAttribute("data-color");
        const productIndex = dataStorage.findIndex(
          (obj) => obj.id == productId && obj.color == productColor
        );
  
        if (productIndex !== -1) {
          dataStorage.splice(productIndex, 1);
          articleDOM.remove();
          if (localStorage) {
            localStorage.setItem("panier", JSON.stringify(dataStorage));
          } else {
            localStorage.clear();
          }
          totalRefresh();
          console.log("Produit supprimé du panier");
          location.reload();
        }
      }
    });
  });
  
  


  

// Affiche la valeur actuelle du nombre total d'articles et le prix total
const totalRefresh = async () => {
  let totalCartPrice = 0;
  let totalCartQty = 0;
  if (localStorage.length != 0) {
    for (let i = 0; i < dataStorage.length; i++) {
      let itemStorage = dataStorage[i];
      const product = await retrieveProductData(itemStorage.id);
      totalCartPrice +=
        parseInt(itemStorage.quantity) * parseInt(product.price);
      totalCartQty += parseInt(itemStorage.quantity);
    }
  }
  const totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerText = totalCartQty;
  const totalPrice = document.getElementById("totalPrice");
  totalPrice.innerText = totalCartPrice;
};

// Affiche un message d'erreur s'il y a un champ incorrect dans le formulaire
function showErrorMsg(errorId, nameField) {
  let errorContainer = document.getElementById(`${errorId}`);
  errorContainer.innerHTML = `${nameField} est invalide`;
}

const globalRegex = new RegExp("^[A-Za-zéèêëàâîïôöûü-]+$");

// Vérifie si le champ "prénom" du formulaire correspond à l'expression régulière définie
function verifyFirstName(prenom) {
  let fieldIsCorrect = false;
  if (globalRegex.test(prenom)) {
    fieldIsCorrect = true;
  } else {
    showErrorMsg("firstNameErrorMsg", "Prénom");
  }
  return fieldIsCorrect;
}

// Vérifie si le champ "nom" du formulaire correspond à l'expression régulière définie
function verifyLastName(nom) {
  let fieldIsCorrect = false;
  if (globalRegex.test(nom)) {
    fieldIsCorrect = true;
  } else {
    showErrorMsg("lastNameErrorMsg", "Nom");
  }
  return fieldIsCorrect;
}

// Vérifie si le champ "adresse" du formulaire correspond à l'expression régulière définie
function verifyAddress(adresse) {
  let fieldIsCorrect = false;
  const adresseRegex = new RegExp("([0-9]*)?([a-zA-Z]*)");
  if (adresseRegex.test(adresse)) {
    fieldIsCorrect = true;
  } else {
    showErrorMsg("addressErrorMsg", "Adresse");
  }
  return fieldIsCorrect;
}

//Vérifie si le champ "ville" du formulaire correspond à l'expression régulière définie
function verifyCity(ville) {
  let fieldIsCorrect = false;
  if (globalRegex.test(ville)) {
    fieldIsCorrect = true;
  } else {
    showErrorMsg("cityErrorMsg", "Ville");
  }
  return fieldIsCorrect;
}

//Vérifie si le champ "email" du formulaire correspond à l'expression régulière définie
function verifyEmail(email) {
  let fieldIsCorrect = false;
  if (
    email.match(
      /[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,24}/
    )
  ) {
    fieldIsCorrect = true;
  } else {
    showErrorMsg("emailErrorMsg", "Email");
  }
  return fieldIsCorrect;
}

// Envoie une requête à l'API contenant toutes les informations saisies et redirige vers la page de confirmation
function sendRequestToApi(body) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        console.error("Une erreur est survenue lors de la commande");
      }
    })
    .then((order) => {
      localStorage.clear();
      const id = order.orderId;
      window.location.href = `confirmation.html?id=${id}`;
    })
    .catch((error) => {
      console.error("Une erreur est survenue lors de la commande", error);
    });
}

// Écoute l'événement de soumission, puis vérifie les champs du formulaire et exécute la procédure de confirmation
addEventListener("submit", function (e) {
  e.preventDefault();
  const prenom = e.target.firstName.value;
  const nom = e.target.lastName.value;
  const adresse = e.target.address.value;
  const ville = e.target.city.value;
  const email = e.target.email.value;
  if (
    verifyFirstName(prenom) &&
    verifyLastName(nom) &&
    verifyAddress(adresse) &&
    verifyCity(ville) &&
    verifyEmail(email)
  ) {
    sendRequestToApi(createBodyRequest(prenom, nom, adresse, ville, email));
  } else {
    console.error("Tous les champs ne sont pas correctement remplis");
  }
});

//Crée l'objet à envoyer dans le corps de la requête
function createBodyRequest(prenom, nom, adresse, ville, mail) {
  const idProducts = dataStorage.map((obj) => obj.id);
  const bodyContent = {
    contact: {
      firstName: prenom,
      lastName: nom,
      address: adresse,
      city: ville,
      email: mail,
    },
    products: idProducts,
  };
  return bodyContent;
}

// Fonction globale qui récupère les données de localStorage pour afficher les produits sur la page
function displayProducts() {
  if (localStorage.length !== 0) {
    dataStorage.forEach((item) => {
      createCardProduct(item);
    });
  }
  totalRefresh();
}

displayProducts();


