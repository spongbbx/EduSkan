function toggleMenu() {
    var sidemenu = document.getElementById("sidemenu");
    sidemenu.classList.toggle("active"); // Toggle the 'active' class
}

const navbar = document.getElementById("menu");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    menu.classList.add("shadow");
  } else {
    menu.classList.remove("shadow");
  }
});

