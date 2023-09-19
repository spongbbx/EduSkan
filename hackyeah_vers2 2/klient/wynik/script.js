function toggleMenu() {
    var sidemenu = document.getElementById("sidemenu");
    sidemenu.classList.toggle("active"); // Toggle the 'active' class
    const overlay = document.querySelector(".overlay");

// Check the current display style and toggle it
if (overlay.style.display === "block") {
    overlay.style.display = "none";
} else {
    overlay.style.display = "block";
}

}

const navbar = document.getElementById("menu");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    menu.classList.add("shadow");
  } else {
    menu.classList.remove("shadow");
  }
});