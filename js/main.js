// JS scripts placed here
// Filter Function
function filterSelection(category) {
  let items = document.getElementsByClassName("art");

  for (let i = 0; i < items.length; i++) {
    items[i].style.display = "none";

    if (category === "all" || items[i].classList.contains(category)) {
      items[i].style.display = "block";
    }
  }
}

// Lightbox
function openModal(src) {
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightbox-img").src = src;
}

function closeModal() {
  document.getElementById("lightbox").style.display = "none";
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