var canvas = document.getElementById("canvas");
canvas.height = window.innerHeight / 1.3;
canvas.width = window.innerWidth / 1.4;
var bound = canvas.getBoundingClientRect();
var c = canvas.getContext("2d");

var xlim = canvas.width;
var ylim = canvas.height;

var color = document.getElementById("color");
var radius = document.getElementById("radius");

var mouse = {
  x: 0,
  y: 0,
  down: false,
};

var stroke = [];

function draw() {
  c.beginPath();
  c.fillStyle = color.value;
  c.arc(
    mouse.x,
    mouse.y,
    Math.abs(Number(radius.value)),
    0,
    Math.PI * 2,
    false
  );
  c.fill();
  c.closePath();
}

function erase() {
  color.value = "#ffffff";
}

function eraseWhole() {
  c.clearRect(0, 0, xlim, ylim);
}

addEventListener("mousemove", (e) => {
  mouse.x = e.clientX - bound.left;
  mouse.y = e.clientY - bound.top;

  if (mouse.down) {
    stroke.push({
      x: mouse.x,
      y: mouse.y,
    });
    draw();
  }
});

addEventListener("mousedown", (e) => {
  mouse.down = true;
});
addEventListener("mouseup", (e) => {
  mouse.down = false;
  for (var i = 0; i < stroke.length - 1; i++) {
    c.beginPath();
    c.strokeStyle = color.value;
    c.lineWidth = Number(radius.value) * 2;
    c.moveTo(stroke[i].x, stroke[i].y);
    c.lineTo(stroke[i + 1].x, stroke[i + 1].y);
    c.stroke();
    c.closePath();
  }
  stroke = [];
});

function saveCanvas() {
  var canvas = document.getElementById("canvas");
  var link = document.createElement("a");
  link.download = "my-drawing.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function importImage(event) {
  const file = event.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = function() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  img.src = URL.createObjectURL(file);
}