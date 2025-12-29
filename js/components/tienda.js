import { allProducts } from "../data/allProducts.js";
import { productCard } from "./productCard.js";

let activeCategory = "all";

export function initStorePage() {
  const container = document.getElementById("productsContainer");
  const countEl = document.getElementById("count");
  const clearBtn = document.getElementById("clearFilters");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (!container) return;

  render(allProducts);

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.category;

      filterButtons.forEach(b => b.classList.remove("active", "bg-pink-600", "text-white"));
      btn.classList.add("active", "bg-pink-600", "text-white");

      applyFilters();
    });
  });

  clearBtn.addEventListener("click", () => {
    activeCategory = "all";
    filterButtons.forEach(b => b.classList.remove("active", "bg-pink-600", "text-white"));
    filterButtons[0].classList.add("active", "bg-pink-600", "text-white");
    clearBtn.classList.add("hidden");
    render(allProducts);
  });

  function applyFilters() {
    let filtered = allProducts;

    if (activeCategory !== "all") {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    clearBtn.classList.toggle("hidden", activeCategory === "all");

    render(filtered);
  }

  function render(list) {
    container.innerHTML = list.map(productCard).join("");
    countEl.textContent = list.length;
  }
}
