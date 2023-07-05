document.addEventListener("DOMContentLoaded", function() {
    const orderIdElement = document.getElementById("orderId");
  
    // Génération du numéro de commande (exemple : 65431343444684674)
    const orderId = generateOrderId();
  
    // Ajout du numéro de commande à l'élément <span>
    orderIdElement.textContent = orderId;
  });
  
  // Fonction pour générer un numéro de commande aléatoire
  function generateOrderId() {
    const length = 17; // Longueur du numéro de commande
    const characters = "0123456789"; // Caractères possibles pour le numéro de commande
    let orderId = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderId += characters.charAt(randomIndex);
    }
  
    return orderId;
  }
  