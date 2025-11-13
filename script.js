const names = {
  1: "Sandra",
  2: "Raimonda",
  3: "Stanislovas",
  4: "Darius",
  5: "Ramunė",
  6: "Andrius"
};

let activeNumbers = [1,2,3,4,5,6];
const wheel = document.getElementById("wheel");
const ctx = wheel.getContext("2d");
const result = document.getElementById("result");
const btn = document.getElementById("spin");
const music = document.getElementById("music");

let angle = 0;
const colors = ["#ff6666","#66ff66","#6666ff","#ffff66","#66ffff","#ff66ff"];

function drawWheel() {
  const step = (2 * Math.PI) / 6;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(200,200);
    ctx.fillStyle = colors[i];
    ctx.arc(200,200,200,i*step,(i+1)*step);
    ctx.fill();
    ctx.save();
    ctx.translate(200,200);
    ctx.rotate(i*step + step/2);
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.fillText(i+1, 100, 10);
    ctx.restore();
  }
}
drawWheel();

btn.onclick = () => {
  if (activeNumbers.length === 0) {
    result.innerText = "🎁 Visi vardai jau išsukti!";
    return;
  }

  music.play();
  btn.disabled = true;
  let spinAngle = Math.random() * 360 + 1080;
  angle += spinAngle;
  let selected = Math.floor(((angle % 360) / 60));
  let num = 6 - selected;
  if (num === 7) num = 1;
  while (!activeNumbers.includes(num)) {
    num = num % 6 + 1;
  }
  setTimeout(() => {
    result.innerText = `🎄 Tu išsukai: ${names[num]} 🎁`;
    activeNumbers = activeNumbers.filter(n => n !== num);
    btn.disabled = false;
  }, 3000);
};

// ❄️ Sniegas
for (let i = 0; i < 30; i++) {
  let snow = document.createElement("div");
  snow.classList.add("snowflake");
  snow.textContent = "❄";
  snow.style.left = Math.random()*100 + "vw";
  snow.style.animationDuration = 5 + Math.random()*10 + "s";
  snow.style.fontSize = 10 + Math.random()*20 + "px";
  document.body.appendChild(snow);
}
