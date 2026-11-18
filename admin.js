
function getOrders() {
  return JSON.parse(
    localStorage.getItem("orders") || "[]"
  );
}

function updateOrderStatus(orderId, status) {
  const orders = getOrders();

  const order = orders.find(
    item => item.id === orderId
  );

  if (!order) return;

  order.status = status;

  localStorage.setItem(
    "orders",
    JSON.stringify(orders)
  );

  displayOrders();
}

function displayOrders() {
  const orders = getOrders();
  const container =
    document.getElementById("adminOrders");

  container.innerHTML = "";

  document.getElementById("totalOrders")
    .textContent = orders.length;

  document.getElementById("pendingOrders")
    .textContent = orders.filter(
      order => order.status === "Pending"
    ).length;

  document.getElementById("readyOrders")
    .textContent = orders.filter(
      order => order.status === "Ready"
    ).length;

  if (orders.length === 0) {
    container.textContent = "No orders yet.";
  }

  orders.forEach(order => {
    const card = document.createElement("article");
    card.className = "order-card";

    const heading = document.createElement("h3");
    heading.textContent = order.studentName;

    const id = document.createElement("p");
    id.textContent = `Order ID: ${order.id}`;

    const total = document.createElement("p");
    total.textContent = `Total: ₹${order.total}`;

    const select = document.createElement("select");

    ["Pending", "Preparing", "Ready", "Collected"]
      .forEach(status => {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        select.appendChild(option);
      });

    select.value = order.status;

    select.addEventListener("change", () => {
      updateOrderStatus(order.id, select.value);
    });

    card.append(heading, id, total, select);
    container.appendChild(card);
  });
}

displayOrders();

function getAvailability() {
  return JSON.parse(
    localStorage.getItem("foodAvailability") || "{}"
  );
}

function displayAvailability() {
  const container =
    document.getElementById("availabilityList");

  const availability = getAvailability();
  container.innerHTML = "";

  foodItems.forEach(food => {
    const row = document.createElement("div");
    row.className = "availability-row";

    const label = document.createElement("label");
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked =
      availability[food.id] ?? food.available;

    checkbox.addEventListener("change", () => {
      const settings = getAvailability();
      settings[food.id] = checkbox.checked;

      localStorage.setItem(
        "foodAvailability",
        JSON.stringify(settings)
      );
    });

    label.append(checkbox, ` ${food.name}`);
    row.appendChild(label);
    container.appendChild(row);
  });
}

displayAvailability();
