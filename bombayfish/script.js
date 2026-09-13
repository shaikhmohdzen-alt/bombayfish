/* ==========================================================================
   BOMBAYFISH - CORE APPLICATION JAVASCRIPT
   College Field Project Implementation - Firebase Cloud Database Edition
   ========================================================================== */

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyCHRDNmyAPZelnn_EhY9B8zvoT6Gq9T8XE",
  authDomain: "bombayfish-a25ab.firebaseapp.com",
  databaseURL: "https://bombayfish-a25ab-default-rtdb.firebaseio.com",
  projectId: "bombayfish-a25ab",
  storageBucket: "bombayfish-a25ab.firebasestorage.app",
  messagingSenderId: "191285477869",
  appId: "1:191285477869:web:0b8e4c6bb86218236567e4"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
  try {
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
  } catch (err) {
    console.warn("Firebase initialization warning:", err);
  }
}

// --- Store Catalog (12 Authentic Mumbai Sea & Freshwater Fishes) ---
const initialProducts = [
  {
    id: "bf1",
    name: "Surmai (Kingfish)",
    category: "Sea Fish",
    badge: "Morning Catch",
    pricePerKg: 780,
    availability: "In Stock",
    image: "images/surmai.jpg",
    description: "Premium ocean Kingfish, ideal for rava fry or spicy Malvani curry."
  },
  {
    id: "bf2",
    name: "White Pomfret (Paplet)",
    category: "Sea Fish",
    badge: "Top Demand",
    pricePerKg: 950,
    availability: "In Stock",
    image: "images/pomfret.jpg",
    description: "High delicacy fish with soft texture, perfect for green masala stuffed tawa fry."
  },
  {
    id: "bf3",
    name: "Black Pomfret (Halwa)",
    category: "Sea Fish",
    badge: "Fresh Arrival",
    pricePerKg: 680,
    availability: "In Stock",
    image: "images/halwa.jpg",
    description: "Flavorful firm-fleshed fish, rich in protein and excellent for thick curries."
  },
  {
    id: "bf4",
    name: "Bangda (Mackerel)",
    category: "Sea Fish",
    badge: "Daily Choice",
    pricePerKg: 260,
    availability: "In Stock",
    image: "images/bangda.jpg",
    description: "Rich in Omega-3, classic staple coastal fish for daily spicy gravy."
  },
  {
    id: "bf5",
    name: "Rawas (Indian Salmon)",
    category: "Sea Fish",
    badge: "Boneless Fillet",
    pricePerKg: 880,
    availability: "In Stock",
    image: "images/rawas.jpg",
    description: "Boneless fillet cuts preferred by families, mild taste and high nutritional value."
  },
  {
    id: "bf6",
    name: "Bombil (Bombay Duck)",
    category: "Sea Fish",
    badge: "Mumbai Special",
    pricePerKg: 220,
    availability: "In Stock",
    image: "images/bombil.jpg",
    description: "Authentic Mumbai specialty; tender soft fish best suited for crispy rava deep fry."
  },
  {
    id: "bf7",
    name: "Kolambi (Tiger Prawns)",
    category: "Prawns & Seafood",
    badge: "Cleaned & Deveined",
    pricePerKg: 680,
    availability: "In Stock",
    image: "images/prawns.jpg",
    description: "Cleaned and deveined medium-large prawns, ready for butter garlic or koli masala."
  },
  {
    id: "bf8",
    name: "Mandeli (Golden Anchovies)",
    category: "Sea Fish",
    badge: "Dock Catch",
    pricePerKg: 180,
    availability: "In Stock",
    image: "images/mandeli.jpg",
    description: "Small flavorful fish enjoyed crisp-fried whole; popular Mumbai dock catch."
  },
  {
    id: "bf9",
    name: "Rohu (Freshwater)",
    category: "Freshwater Fish",
    badge: "Freshwater",
    pricePerKg: 280,
    availability: "In Stock",
    image: "images/rohu.jpg",
    description: "Sweetwater river carp fish, ideal for traditional mustard or tomato curry."
  },
  {
    id: "bf10",
    name: "Rani (Pink Perch)",
    category: "Sea Fish",
    badge: "Quick Cook",
    pricePerKg: 320,
    availability: "In Stock",
    image: "images/rani.jpg",
    description: "Pink-skinned mild sea fish, easy to clean and cooks quickly for light meals."
  },
  {
    id: "bf11",
    name: "Kekda (Mud Crabs)",
    category: "Prawns & Seafood",
    badge: "Live Stock",
    pricePerKg: 720,
    availability: "In Stock",
    image: "images/crab.jpg",
    description: "Fresh coastal crabs packed with sweet meat, ideal for crab masala broth."
  },
  {
    id: "bf12",
    name: "Makul (Squid / Calamari)",
    category: "Prawns & Seafood",
    badge: "Seafood Choice",
    pricePerKg: 480,
    availability: "In Stock",
    image: "images/squid.jpg",
    description: "Cleaned squid rings and tubes, excellent for spicy fry or stir-fry dishes."
  }
];

// --- Local Storage Data Setup ---
function initData() {
  try {
    const stored = JSON.parse(localStorage.getItem("bf_products"));
    if (!stored || !Array.isArray(stored) || stored.length < 12 || !stored[0].badge) {
      localStorage.setItem("bf_products", JSON.stringify(initialProducts));
    }
  } catch (e) {
    localStorage.setItem("bf_products", JSON.stringify(initialProducts));
  }

  try {
    if (!localStorage.getItem("bf_cart")) {
      localStorage.setItem("bf_cart", JSON.stringify([]));
    }
  } catch (e) {
    console.warn("Storage warning:", e);
  }
}

initData();

// --- Helper Functions ---
function getProducts() {
  try {
    const prods = JSON.parse(localStorage.getItem("bf_products"));
    return Array.isArray(prods) ? prods : initialProducts;
  } catch (e) {
    return initialProducts;
  }
}

function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem("bf_cart"));
    return Array.isArray(cart) ? cart : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem("bf_cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Failed to save cart to localStorage", e);
  }
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const badge = document.getElementById("cartCount");
  if (badge) {
    const totalQty = cart.reduce((acc, item) => acc + (parseInt(item.quantity) || 1), 0);
    badge.innerText = totalQty;
  }
}

// --- Navigation Toggle ---
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  const toggleBtn = document.getElementById("mobileMenuToggle");
  const navLinks = document.getElementById("navLinks");
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});

// --- Product Cards Grid Renderer ---
function renderProductGrid(containerId, productsList) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  if (!productsList || productsList.length === 0) {
    container.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 30px;'>No fish found matching your criteria.</p>";
    return;
  }

  productsList.forEach((prod) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <span class="card-badge">${prod.badge || 'Fresh Catch'}</span>
      <div class="product-img-wrapper">
        <img src="${prod.image}" alt="${prod.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=800&q=80';">
      </div>
      <div class="product-info">
        <span class="product-category">${prod.category}</span>
        <h3 class="product-title">${prod.name}</h3>
        <p class="product-desc">${prod.description}</p>
        <div class="product-bottom">
          <div>
            <div class="product-price">₹${prod.pricePerKg} / kg</div>
            <span class="stock-tag">${prod.availability}</span>
          </div>
          <a href="product-details.html?id=${prod.id}" class="btn btn-outline" style="padding: 6px 14px; font-size: 0.85rem; border-radius: 10px;">View</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// --- Cart Addition ---
function addToCart(productId, weightKg, prepOption, quantity) {
  const products = getProducts();
  const product = products.find((p) => p.id === productId);
  if (!product) {
    alert("Product not found!");
    return;
  }

  const weight = parseFloat(weightKg);
  const qty = parseInt(quantity) || 1;

  if (isNaN(weight) || weight <= 0) {
    alert("Please enter a valid weight in kg.");
    return;
  }

  const cart = getCart();
  const calculatedPrice = Math.round(product.pricePerKg * weight * qty);

  const cartItem = {
    cartItemId: Date.now().toString(),
    productId: product.id,
    name: product.name,
    pricePerKg: product.pricePerKg,
    weightKg: weight,
    prepOption: prepOption || "Cleaned & Gutted",
    quantity: qty,
    totalPrice: calculatedPrice,
    image: product.image
  };

  cart.push(cartItem);
  saveCart(cart);
  alert(`Added to cart: ${product.name} (${weight} kg x ${qty}) - ₹${calculatedPrice}`);
}