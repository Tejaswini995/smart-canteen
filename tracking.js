
const trackingForm =
  document.getElementById("trackingForm");

const trackingResult =
  document.getElementById("trackingResult");

trackingForm.addEventListener("submit", event => {
  event.preventDefault();

  const orderId = document
    .getElementById("orderId")
    .value.trim();

  const orders = JSON.parse(
    localStorage.getItem("orders") || "[]"
  );

  const order = orders.find(
    item => item.id === orderId
  );

  trackingResult.innerHTML = "";

  if (!order) {
    trackingResult.textContent =
      "Order not found. Check your Order ID.";
    return;
  }

  const heading = document.createElement("h2");
  heading.textContent = `Status: ${order.status}`;

  const name = document.createElement("p");
  name.textContent = `Student: ${order.studentName}`;

  const pickup = document.createElement("p");
  pickup.textContent =
    `Requested Pickup Time: ${order.pickupTime}`;

  const total = document.createElement("p");
  total.textContent = `Total: ₹${order.total}`;

  trackingResult.append(
    heading, name, pickup, total
  );
});
