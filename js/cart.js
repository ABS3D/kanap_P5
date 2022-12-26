const cart = [];

function retriEventsFromCahe() {
  const numerOfItems = localStorage.length;
  for (let i = 0; i < numerOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const itemObject = JSON.parse(item);
    cart.push(itemObject);
  }
}

function diplayItem(item) {}
