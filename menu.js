const foodContainer =
  document.getElementById("foodContainer");

const searchFood =
  document.getElementById("searchFood");

const categoryFilter =
  document.getElementById("categoryFilter");

function renderFood() {
  const search = searchFood.value.toLowerCase();
  const category = categoryFilter.value;

  const filtered = foodItems.filter(food => {
    const matchesName =
      food.name.toLowerCase().includes(search);

    const matchesCategory =
      category === "All" ||
      food.category === category;

    return matchesName && matchesCategory;
  });

  foodContainer.innerHTML = "";

  filtered.forEach(food => {
    const card = document.createElement("article");
    card.className = "food-card";

    const title = document.createElement("h3");
    title.textContent = food.name;

    const price = document.createElement("p");
    price.textContent = `₹${food.price}`;

    const button = document.createElement("button");
    button.textContent = food.available
      ? "Add to Cart"
      : "Unavailable";

    button.disabled = !food.available;

    button.addEventListener("click", () => {
      addToCart(food);
    });

    card.append(title, price, button);
    foodContainer.appendChild(card);
  });
}

searchFood.addEventListener("input", renderFood);
categoryFilter.addEventListener("change", renderFood);

renderFood();