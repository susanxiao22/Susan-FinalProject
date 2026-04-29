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
function openModal(src) {
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightbox-img").src = src;
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