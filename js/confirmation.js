document.addEventListener("DOMContentLoaded", function () {
  const orderIdElement = document.getElementById("orderId");

  const orderId = retrieveOrderIdFromStorage(); // Récupère l'identifiant de la commande à partir des paramètres de l'URL

  orderIdElement.textContent = orderId; // Affiche l'identifiant de la commande dans l'élément HTML
});

function retrieveOrderIdFromStorage() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id"); // Récupère l'identifiant de la commande à partir des paramètres de l'URL
}
