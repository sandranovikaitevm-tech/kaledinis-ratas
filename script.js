const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin");
const result = document.getElementById("result");
const ctx = wheel.getContext("2d");
const music = document.getElementById("music");

const prizes = ["🎁 Dovana", "🎄 Kalėdų stebuklas", "☕ Karštas šokoladas", "🎅 Sveikinimas nuo Kalėdų Senelio", "🍪 Kalėdinis sausainis", "⭐ Noras išsipildys"];
const colors = ["#ff9999", "#99ff99", "#9999ff", "#ffff99", "#ffcc99", "#cc99ff"];

let startAngle = 0;
const arc = Math.PI / (prizes.length / 2);

function drawWheel() {
  for (let i = 0; i < prizes.length; i++) {
    const angle = startAngle + i * arc;
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, angle, angle + arc);
    ctx.fill();
    ctx.save();
    ctx.fillStyle = "#000";
    ctx.translate(200 + Math.cos(angle + arc / 2) * 100, 200 + Math.sin(angle + arc / 2) * 100);
    ctx.rotate(angle + arc / 2 + Math.PI / 2);
    ctx.fillText(prizes[i], -ctx.measureText(prizes[i]).width / 2, 0);
    ctx.restore();
  }
}

drawWheel();

spinBtn.addEventListener("click", () => {
  music.play();
  let spinTime = 3000 + Math.random() * 3000;
  const spinAngle = Math.random() * 360 + 1080;
  const spinRadians = (spinAngle * Math.PI) / 180;

  let start = Date.now();
  const spin = () => {
    let progress = (Date.now() - start) / spinTime;
    if (progress < 1) {
      startAngle += spinRadians / (spinTime / 16);
      drawWheel();
      requestAnimationFrame(spin);
    } else {
      music.pause();
      const winningIndex = Math.floor(prizes.length - ((startAngle % (2 * Math.PI)) / arc)) % prizes.length;
      result.textContent = "🎉 " + prizes[winningIndex] + " 🎉";
    }
  };
  spin();
});
