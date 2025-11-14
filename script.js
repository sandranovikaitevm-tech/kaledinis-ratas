const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin");
const result = document.getElementById("result");
const music = document.getElementById("music");
const ctx = wheel.getContext("2d");

const prizes = [
  "🎁 Saldainiai",
  "🎅 Mandarinas",
  "🎄 Karšta kakava",
  "⭐ Poilsio minutė",
  "❄ Kalėdinė užduotis",
  "🎉 Staigmena"
];

let startAngle = 0;
const arc = (2 * Math.PI) / prizes.length;

function drawWheel() {
  for (let i = 0; i < prizes.length; i++) {
    const angle = startAngle + i * arc;

    // spalvos
    ctx.fillStyle = i % 2 === 0 ? "#ff9999" : "#ffcccc";
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, angle, angle + arc);
    ctx.lineTo(200, 200);
    ctx.fill();

    // tekstas
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "bold 18px Comic Sans MS";
    ctx.fillText(prizes[i], 180, 10);
    ctx.restore();
  }
}

drawWheel();

spinBtn.onclick = function () {
  music.play();
  
  let spinAngle = Math.random() * 3000 + 2000;
  let duration = 3000;
  let start = Date.now();

  let interval = setInterval(function () {
    let time = Date.now() - start;
    if (time >= duration) {
      clearInterval(interval);
      let index = Math.floor(prizes.length - (startAngle % (2 * Math.PI)) / arc) % prizes.length;
      result.textContent = "🎉 Laimėjai: " + prizes[index] + "!";
      return;
    }
    startAngle += (spinAngle / duration) * 0.1;
    ctx.clearRect(0, 0, wheel.width, wheel.height);
    drawWheel();
  }, 10);
};
