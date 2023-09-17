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

     // Schowaj przycisk "analyze"
    document.getElementById("analyze").style.display = "none";
    
    // Pokaż element "preloader"
    var preloader = document.getElementById("preloader");
    preloader.style.display = "block";
    preloader.style.position = "relative";
    preloader.style.visibility = "visible";
    
    // Zmiana marginesu
    document.querySelector(".loading-circle").style.marginTop = "7%";
    document.querySelector(".loading-circle").style.opacity = "100%";
  

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

// Get references to all .author and .o-col-2 elements
const authorElements = document.querySelectorAll('.author');
const oCol1Elements = document.querySelectorAll('.o-col-1');
const oCol2Elements = document.querySelectorAll('.o-col-2');
const rowceleElements = document.querySelectorAll('.cele');

let animationTriggered = false; // Flag to track if the animation has been triggered

// Function to check if at least one .author element is in the viewport
function isAuthorInViewport() {
    return Array.from(authorElements).some(element => {
        const rect = element.getBoundingClientRect();
        return (
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    });
}

// Function to add the animation class to .author element when it's in the viewport
function handleScroll() {
    // Check if the animation has already been triggered or if .author element is in the viewport
    if (!animationTriggered && isAuthorInViewport()) {
        authorElements.forEach((element) => {
            if (!element.classList.contains('appear-on-scroll')) {
                element.classList.add('appear-on-scroll');
            }
        });

        // Set the flag to true to prevent further triggering
        animationTriggered = true;
    }

    // Check if .o-col-2 element is in the viewport
    if (isOCol2InViewport()) {
        oCol1Elements.forEach((element) => {
            if (!element.classList.contains('appear-on-scroll')) {
                element.classList.add('appear-on-scroll');
            }
        });
        
        oCol2Elements.forEach((element) => {
            if (!element.classList.contains('appear-on-scroll')) {
                element.classList.add('appear-on-scroll');
            }
        });
    }

    if (isRowceleInViewport()) {
        rowceleElements.forEach((element) => {
            if (!element.classList.contains('appear-on-scroll')) {
                element.classList.add('appear-on-scroll');
            }
        });
        
        rowceleElements.forEach((element) => {
            if (!element.classList.contains('appear-on-scroll')) {
                element.classList.add('appear-on-scroll');
            }
        });
    }
}
// Function to check if .o-col-2 element is in the viewport
function isOCol2InViewport() {
    return Array.from(oCol2Elements).some(element => {
        const rect = element.getBoundingClientRect();
        return (
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    });
}

function isRowceleInViewport() {
    return Array.from(rowceleElements).some(element => {
        const rect = element.getBoundingClientRect();
        return (
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    });
}
// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);

// Trigger the animation for elements already in the viewport on page load
window.addEventListener('load', handleScroll);

// Manually trigger the scroll event on page load to check initial state
window.dispatchEvent(new Event('scroll'));

