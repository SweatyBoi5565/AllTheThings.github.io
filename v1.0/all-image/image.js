const openSettingsButtons = document.querySelectorAll("[data-settings-target]");
const closeSettingsButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

const slider = document.getElementById('brightness-slider');
const image = document.querySelector('.container img');


window.onload = function() {
  window.scrollTo(0, 0);
};


function darkModeFunction() {
  document.body.classList.toggle("dark-mode");
}

function refreshPage() {
  window.location.reload();
}

openSettingsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const settings = document.querySelector(button.dataset.settingsTarget);
    openSettings(settings);
  });
});

overlay.addEventListener('click', () => {
    const settings = document.querySelectorAll('.settings.active')
    settings.forEach(settings => {
        closeSettings(settings)
    })
})


closeSettingsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const settings = button.closest(".settings");
    closeSettings(settings);
  });
});

function openSettings(settings) {
  if (settings == null) return;
  settings.classList.add("active");
  overlay.classList.add("active");
}

function closeSettings(settings) {
  if (settings == null) return;
  settings.classList.remove("active");
  overlay.classList.remove("active");
}

const imageContainers = [
  document.getElementById('images-container1'),
  document.getElementById('images-container2'),
  document.getElementById('images-container3')
];

slider.addEventListener('input', () => {
  const brightnessValue = slider.value + '%';
  imageContainers.forEach(container => {
    if (container) {
      container.style.filter = `brightness(${brightnessValue})`;
    }
  });
});