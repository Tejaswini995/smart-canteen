
const checkoutForm =
  document.getElementById("checkoutForm");

const orderTotal =
  document.getElementById("orderTotal");

const confirmation =
  document.getElementById("confirmation");

orderTotal.textContent = getTotal();

checkoutForm.addEventListener("submit", event => {
  event.preventDefault();

  const studentName = document
    .getElementById("studentName")
    .value.trim();

  const pickupTime = document
    .getElementById("pickupTime")
    .value;

  const cart = getCart();

  if (!studentName || !pickupTime) {
    alert("Please complete all fields.");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const order = {
    id: crypto.randomUUID(),
    studentName: studentName,
    pickupTime: pickupTime,
    items: cart,
    total: getTotal(),
    status: "Pending",
    createdAt: new Date().toISOString()
  };

  const orders = JSON.parse(
    localStorage.getItem("orders") || "[]"
  );

  orders.push(order);

  localStorage.setItem(
    "orders",
    JSON.stringify(orders)
  );

  localStorage.removeItem("cart");

  checkoutForm.hidden = true;
  confirmation.innerHTML = "";

  const message = document.createElement("h2");
  message.textContent = "Order Placed Successfully!";

  const id = document.createElement("p");
  id.textContent = `Order ID: ${order.id}`;

  const link = document.createElement("a");
  link.href = "tracking.html";
  link.textContent = "Track Your Order";

  confirmation.append(message, id, link);
});
