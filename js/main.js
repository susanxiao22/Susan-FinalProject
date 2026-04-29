// =========================
// FILTER FUNCTION + RESET ANIMATION
// =========================
function filterSelection(category) {
  let items = document.getElementsByClassName("art");

  for (let i = 0; i < items.length; i++) {
    // Hide everything first
    items[i].style.display = "none";

    // Show matching category
    if (category === "all" || items[i].classList.contains(category)) {
      items[i].style.display = "block";
    }
  }

  // Reset scroll animations so they replay
  resetAnimations();
}

// Reset animation state
function resetAnimations() {
  const artworks = document.querySelectorAll('.art');

  artworks.forEach(art => {
    art.classList.remove('show');
  });

  // Force reflow so animations can restart
  void document.body.offsetHeight;

  // Re-observe elements
  artworks.forEach(art => {
    observer.observe(art);
  });
}


// =========================
// LIGHTBOX
// =========================
let currentIndex = 0;
let images = [];

function openModal(imgElement) {
  const lightbox = document.getElementById("lightbox");

  // Get ALL images
  images = Array.from(document.querySelectorAll(".gallery img"));

  // Find index of clicked image
  currentIndex = images.indexOf(imgElement);

  showImage();

  lightbox.style.display = "flex";

  // accessibility: move focus into lightbox
  document.getElementById("close-btn")?.focus();
}

function showImage() {
  const img = images[currentIndex];

  document.getElementById("lightbox-img").src = img.src;
  document.getElementById("caption-title").textContent = img.dataset.title || "";
  document.getElementById("caption-year").textContent = img.dataset.year || "";
  document.getElementById("caption-medium").textContent = img.dataset.medium || "";
}

function changeImage(direction) {
  currentIndex += direction;

  // Loop around
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;

  showImage();
}

function closeModal() {
  document.getElementById("lightbox").style.display = "none";
}


// =========================
// SMOOTH SCROLL (ANCHORS)
// =========================
document.querySelectorAll("a").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    if (this.hash !== "") {
      e.preventDefault();
      document.querySelector(this.hash)?.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


// =========================
// SCROLL REVEAL ANIMATION
// =========================
const artworks = document.querySelectorAll('.art');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.1
});

// Staggered animation delay + observer setup
artworks.forEach((art, index) => {
  art.style.transitionDelay = `${index * 0.05}s`;
  observer.observe(art);
});


// =========================
// KEYBOARD CONTROLS (LIGHTBOX)
// =========================
document.addEventListener("keydown", function(e) {
  const lightbox = document.getElementById("lightbox");

  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") changeImage(1);
    if (e.key === "ArrowLeft") changeImage(-1);
    if (e.key === "Escape") closeModal();
  }
});


// =========================
// ACCESSIBLE EVENT HANDLING (WAVE FIX)
// =========================

// Gallery buttons (no inline onclick needed)
document.querySelectorAll(".art-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    openModal(img);
  });

  // allow Enter/Space activation (extra safety)
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const img = btn.querySelector("img");
      openModal(img);
    }
  });
});


// Lightbox controls
document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("close-btn");
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");
  const lightbox = document.getElementById("lightbox");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
    closeBtn.setAttribute("tabindex", "0");
  }

  if (leftArrow) {
    leftArrow.addEventListener("click", () => changeImage(-1));
    leftArrow.setAttribute("tabindex", "0");
  }

  if (rightArrow) {
    rightArrow.addEventListener("click", () => changeImage(1));
    rightArrow.setAttribute("tabindex", "0");
  }

  // click outside image closes modal (optional UX improvement)
  if (lightbox) {
    lightbox.addEventListener("click", closeModal);
    document.getElementById("lightbox-content")?.addEventListener("click", e => {
      e.stopPropagation();
    });
  }
});