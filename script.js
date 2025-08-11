let cartCount = 0;
const cartCountEl = document.getElementById("cart-count");
const productList = document.getElementById("product-list");

// Fetch products from JSON file
fetch("products.json")
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      // Create card container
      const card = document.createElement("div");
      card.classList.add("product-card");

      // Product image
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      card.appendChild(img);

      // Product name
      const name = document.createElement("h3");
      name.textContent = product.name;
      card.appendChild(name);

      // Price
      const price = document.createElement("p");
      price.classList.add("price");
      price.textContent = `$${product.price.toFixed(2)}`;
      card.appendChild(price);

      // Add to cart button
      const button = document.createElement("button");
      button.classList.add("add-to-cart");
      button.textContent = "Add to Cart";
      button.addEventListener("click", () => {
        cartCount++;
        cartCountEl.textContent = cartCount;
      });
      card.appendChild(button);

      // Append card to the list
      productList.appendChild(card);
    });
  })
  .catch(error => console.error("Error loading products:", error));
