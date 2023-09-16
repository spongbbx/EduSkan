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

analyze_button = document.getElementById('analyze');

analyze_button.addEventListener('click', (e) => {
    const education_status = document.getElementById('education_status').value;
    const future_plans = document.getElementById('future_plans').value;
    const hobby = document.getElementById('hobby').value;
    const about_me = document.getElementById('about_me').value;
    
    console.log('Sending request...');

    // tu sie zaczyna wysylanie requesta, tu powinny byc jakies animacje jak chcecie czy cos

    fetch('http://localhost:5000/chatgpt', {
        method: 'POST',
        body: JSON.stringify({
            education_status,
            future_plans,
            hobby,
            about_me
        }),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
    .then((res) => res.json())
    .then((json) => {
        console.log(json)

        // bot odpowiedzial, odpowiedz bota to json.answer
    });
});