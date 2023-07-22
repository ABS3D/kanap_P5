document.addEventListener("DOMContentLoaded", function () {
  const orderIdElement = document.getElementById("orderId");

  const orderId = retrieveOrderIdFromStorage(); 

  orderIdElement.textContent = orderId;
});

function retrieveOrderIdFromStorage() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}
