function filterSelection(category) {
  let items = document.getElementsByClassName("art");

  for (let i = 0; i < items.length; i++) {
    items[i].style.display = "none";

    if (category === "all" || items[i].classList.contains(category)) {
      items[i].style.display = "block";
    }
  }

  resetAnimations();
}

function resetAnimations() {
  const artworks = document.querySelectorAll('.art');

  artworks.forEach(art => {
    art.classList.remove('show');
  });

  void document.body.offsetHeight;

  artworks.forEach(art => {
    observer.observe(art);
  });
}

let currentIndex = 0;
let images = [];

function openModal(imgElement) {
  const lightbox = document.getElementById("lightbox");

  images = Array.from(document.querySelectorAll(".gallery img"));

  currentIndex = images.indexOf(imgElement);

  showImage();

  lightbox.style.display = "flex";

  document.querySelector(".top-bar")?.classList.add("hide");

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

  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;

  showImage();
}

function closeModal() {
  document.getElementById("lightbox").style.display = "none";
  document.querySelector(".top-bar")?.classList.remove("hide");
}

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

artworks.forEach((art, index) => {
  art.style.transitionDelay = `${index * 0.05}s`;
  observer.observe(art);
});

document.addEventListener("keydown", function(e) {
  const lightbox = document.getElementById("lightbox");

  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") changeImage(1);
    if (e.key === "ArrowLeft") changeImage(-1);
    if (e.key === "Escape") closeModal();
  }
});

document.querySelectorAll(".art-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    openModal(img);
  });

  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const img = btn.querySelector("img");
      openModal(img);
    }
  });
});

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

  if (lightbox) {
    lightbox.addEventListener("click", closeModal);
    document.getElementById("lightbox-content")?.addEventListener("click", e => {
      e.stopPropagation();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const popup = document.getElementById("thank-you-popup");
  const closePopupBtn = document.getElementById("close-popup-btn");

  if (!form || !popup) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const button = form.querySelector("button");

    button.classList.add("button-loading");

    setTimeout(() => {
      button.classList.remove("button-loading");

      popup.classList.remove("hidden");
      form.reset();
    }, 1200);
  });

  if (closePopupBtn) {
    closePopupBtn.addEventListener("click", () => {
      popup.classList.add("hidden");
    });
  }

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.add("hidden");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const button = form.querySelector("button");

  if (!button) return;

  button.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.offsetX - radius}px`;
    circle.style.top = `${e.offsetY - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  });
});