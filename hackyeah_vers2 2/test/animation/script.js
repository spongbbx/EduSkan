const animatedElement = document.querySelector('.animated-element');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animatedElement.classList.add('show');
            observer.unobserve(animatedElement); // Zatrzymaj obserwację po animacji
        }
    });
});

observer.observe(animatedElement);
