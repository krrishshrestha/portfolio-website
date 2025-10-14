// Simple typing animation
const text = "Website under development...";
const subtitle = document.querySelector(".subtitle");
let index = 0;

function typeEffect() {
  if (index < text.length) {
    subtitle.innerHTML = text.slice(0, index + 1) + '<span class="cursor">|</span>';
    index++;
    setTimeout(typeEffect, 80);
  }
}

window.onload = typeEffect;
