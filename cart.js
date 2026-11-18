
function getCart() {
  return JSON.parse(
    localStorage.getItem("cart") || "[]"
  );
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(food) {
  const cart = getCart();
  const existing = cart.find(
    item => item.id === food.id
  );

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...food,
      quantity: 1
    });
  }

  saveCart(cart);
  alert(`${food.name} added to cart`);
}

function removeFromCart(id) {
  const updated = getCart().filter(
    item => item.id !== id
  );

  saveCart(updated);
  displayCart();
}

function updateQuantity(id, change) {
  const cart = getCart();
  const item = cart.find(
    food => food.id === id
  );

  if (!item) return;

  item.quantity += change;

  saveCart(
    cart.filter(food => food.quantity > 0)
  );

  displayCart();
}

function getTotal() {
  return getCart().reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );
}

function displayCart() {
  const container =
    document.getElementById("cartItems");

  if (!container) return;

  container.innerHTML = "";

  const cart = getCart();

  if (cart.length === 0) {
    container.textContent = "Your cart is empty.";
  }

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";

    const label = document.createElement("span");
    label.textContent =
      `${item.name} - ₹${item.price}`;

    const quantity = document.createElement("span");
    quantity.textContent = ` Qty: ${item.quantity} `;

    const minus = document.createElement("button");
    minus.textContent = "−";
    minus.addEventListener("click", () =>
      updateQuantity(item.id, -1)
    );

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.addEventListener("click", () =>
      updateQuantity(item.id, 1)
    );

    const remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.addEventListener("click", () =>
      removeFromCart(item.id)
    );

    row.append(label, minus, quantity, plus, remove);
    container.appendChild(row);
  });

  document.getElementById("cartTotal")
    .textContent = getTotal();
}

displayCart();
