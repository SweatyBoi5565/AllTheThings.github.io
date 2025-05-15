const whiteContainer = document.getElementById("white-keys");
const blackContainer = document.getElementById("black-keys");

const openSettingsButtons = document.querySelectorAll("[data-settings-target]");
const closeSettingsButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

const volumeSlider = document.getElementById('volume-slider');
let currentVolume = volumeSlider ? parseFloat(volumeSlider.value) : 1;

const notes = [
  "C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1",
  "A1", "A#1", "B1", "C2", "C#2", "D2", "D#2", "E2"
];

const blackNotes = ["C#1", "D#1", "F#1", "G#1", "A#1", "C#2", "D#2"];

let whiteKeyIndex = 0;

notes.forEach((note, i) => {
  const isBlack = blackNotes.includes(note);
  const noteNum = i;

  if (!isBlack) {
    const whiteKey = document.createElement("div");
    whiteKey.classList.add("key", "white-key");
    whiteKey.dataset.note = noteNum;
    whiteKey.addEventListener("click", () => playNote(noteNum));
    whiteContainer.appendChild(whiteKey);
    whiteKeyIndex++;
  } else {
    const blackKey = document.createElement("div");
    blackKey.classList.add("key", "black-key");
    blackKey.dataset.note = noteNum;
    blackKey.style.left = `${(whiteKeyIndex * 80) - 20}px`;
    blackKey.addEventListener("click", () => playNote(noteNum));
    blackContainer.appendChild(blackKey);
  }
});

function playNote(noteNumber) {
  const audio = new Audio(`notes/${noteNumber}.m4a`);
  audio.play();
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
    
    const pitchSlider = document.getElementById('pitch-slider');
    const volumeSlider = document.getElementById('volume-slider');
    
    let currentPitch = pitchSlider ? parseFloat(pitchSlider.value) : 1;
    let currentVolume = volumeSlider ? parseFloat(volumeSlider.value) : 1;
    
    if (pitchSlider) {
      pitchSlider.addEventListener('input', () => {
        currentPitch = parseFloat(pitchSlider.value);
      });
    }
    
    if (volumeSlider) {
      volumeSlider.addEventListener('input', () => {
        currentVolume = parseFloat(volumeSlider.value);
      });
    }
    
    function playNote(noteNumber) {
      const audio = new Audio(`notes/${noteNumber}.m4a`);
      audio.playbackRate = currentPitch;
      audio.volume = currentVolume;
      audio.play();
    }
    
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

function darkModeFunction() {
  document.body.classList.toggle("dark-mode");
}

if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
        currentVolume = parseFloat(volumeSlider.value);
    });
}

function playNote(noteNumber) {
    const audio = new Audio(`notes/${noteNumber}.m4a`);
    audio.volume = currentVolume;
    audio.play();
}