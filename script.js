
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");
const result = document.getElementById("result");

const emojis = ["🎅","❄️","🌲","🧦","🎁","🔔"];
let startAngle = 0;
let spinning = false;

function drawWheel(){
    const sections = 6;
    const arc = Math.PI * 2 / sections;
    for(let i=0;i<sections;i++){
        ctx.beginPath();
        by ctx.fillStyle = i%2==0 ? "#ffecd2" : "#ffe4e1";
        ctx.moveTo(200,200);
        ctx.arc(200,200,200,startAngle + i*arc, startAngle + (i+1)*arc);
        ctx.fill();
        ctx.save();
        ctx.translate(200,200);
        ctx.rotate(startAngle + i*arc + arc/2);
        ctx.textAlign="center";
        ctx.font="40px Arial";
        ctx.fillStyle="#000";
        ctx.fillText(emojis[i],120,10);
        ctx.restore();
    }
}

function spinWheel(){
    if(spinning) return;
    spinning = true;
    let spinTime = 3000;
    let spinAngle = Math.random()*8 + 10;
    let start = performance.now();

    function animate(t){
        let progress = t - start;
        let angle = easeOut(progress, 0, spinAngle, spinTime);
        startAngle = angle;
        ctx.clearRect(0,0,400,400);
        drawWheel();

        if(progress < spinTime){
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            let finalDeg = startAngle % (2*Math.PI);
            let index = Math.floor((6 - (finalDeg / (2*Math.PI)) * 6) % 6);
            let number = index + 1;
            let name = getHiddenName(number);

// Jei Sandra išsuko savo vardą (numeris 1)
if (name === "Sandra") {
    result.innerHTML = "😅 Ups! Išsukai savo vardą – bandyk dar kartą!";
    // Pašaliname Sandra iš “panaudotų”, kad neužsifiksuotų
    usedNumbers = usedNumbers.filter(n => n !== 1);
    localStorage.setItem("usedNumbers", JSON.stringify(usedNumbers));
    return; // nebevykdome toliau
}

result.innerHTML = "🎉 Sustojai ties: " + emojis[index] + "<br><b>" + name + "</b>";
        }
    }
    requestAnimationFrame(animate);
}

function easeOut(t, b, c, d){
    t/=d; t--; return c*(t*t*t + 1) + b;
}

drawWheel();
spinBtn.onclick = spinWheel;
