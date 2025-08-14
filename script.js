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
cart.push({ name: product.name, price: product.price });
        renderCart();
      });
      card.appendChild(button);

      // Append card to the list
      productList.appendChild(card);
    });
  })
  .catch(error => console.error("Error loading products:", error));

// Fade-in elements on scroll
const fadeElements = document.querySelectorAll('.about-inner, .review-card, .barista-inner');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});


const hamMenu = document.getElementById('ham-menu');
const sideNav = document.getElementById('side-nav');
const mainNav = document.getElementById('main-nav');

hamMenu.addEventListener('click', () => {
  hamMenu.classList.toggle('active');
  sideNav.classList.toggle('active');
  mainNav.classList.toggle('active');

  
});

const cartBox = document.getElementById('cart-box');

// cartBox.addEventListener('click', function() {
//   // cartBox.classList.toggle('active');
// });

const cartImage = document.getElementById('cart');
const closeCartBtn = document.getElementById('close-cart');

cartImage.addEventListener('click', () => {
  cartBox.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

closeCartBtn.addEventListener('click', () => {
  cartBox.classList.remove('active');
  document.body.classList.remove('no-scroll');
});

// get the scroll btn
let myButton = document.getElementById('myBtn');

// When the user scrolls down 20px from the top of the document, show the button

window.onscroll = function() {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 550 || document.documentElement.scrollTop > 550) {
    myButton.style.display = "block";
  } else {
    myButton.style.display = "none";
  }
}


// When the user clicks on the button, scroll to the top of the document

function scrollToTopFunc() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Start: adding item to the cart

let cart = []; // instead of cartCount
const cartBoxItems = document.getElementById('cart-box-items');

  // Function to render cart contents
function renderCart() {
  if (cart.length === 0) {
    cartBoxItems.innerHTML = "Your cart is currently empty.";
    return;
  }

  cartBoxItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <button class="remove-item" data-index="${index}">—</button>
      ${item.name} - $${item.price.toFixed(2)}
    </div>
  `).join("");

  // Add total at the bottom
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartBoxItems.innerHTML += `
    <div class="separator"></div>
    <div class="cart-total"><strong>Total:</strong> $${total.toFixed(2)}</div>
  `;
}

// Remove item when clicking the dash
cartBoxItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    const index = parseInt(e.target.dataset.index);
    cart.splice(index, 1);
    renderCart();
  }
});

// End: adding item to the cart