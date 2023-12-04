const slider = document.querySelector('#slider');
const slides = slider.querySelectorAll('.slide');

let currentSlide = 0;

setInterval(() => {
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  slides[currentSlide].style.display = 'block';
  slides[currentSlide - 1].style.display = 'none';
}, 5000);
