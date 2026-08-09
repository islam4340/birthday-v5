// ==========================
// Birthday V5 - Part 1
// ==========================

const loader=document.getElementById("loader");
const welcome=document.getElementById("welcome");
const countSection=document.getElementById("countSection");
const party=document.getElementById("party");

const startBtn=document.getElementById("startBtn");
const count=document.getElementById("count");

const music=document.getElementById("music");

window.onload=()=>{

setTimeout(()=>{

loader.style.display="none";

},2000);

};

startBtn.addEventListener("click",()=>{

music.play();

welcome.style.opacity="0";

setTimeout(()=>{

welcome.style.display="none";

countSection.style.display="flex";

startCount();

},800);

});

function startCount(){

let number=1;

count.innerHTML=number;

const timer=setInterval(()=>{

number++;

count.style.transform="scale(1.3)";

setTimeout(()=>{

count.style.transform="scale(1)";

},180);

count.innerHTML=number;

if(number>=10){

clearInterval(timer);

setTimeout(()=>{

countSection.style.display="none";

party.style.display="flex";

music.play();

startCelebration();

},800);

}

},1000);

}
// ==========================
// Celebration Effects
// ==========================

const hearts=document.getElementById("hearts");
const petals=document.getElementById("petals");
const balloons=document.getElementById("balloons");

const slides=document.querySelectorAll(".slide");

const canvas=document.getElementById("fireworks");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

});

function startCelebration(){

// Hearts
setInterval(()=>{

const h=document.createElement("div");

h.className="heart";

h.innerHTML=["❤️","💖","💕","💗"][Math.floor(Math.random()*4)];

h.style.left=Math.random()*100+"%";

h.style.fontSize=(20+Math.random()*25)+"px";

hearts.appendChild(h);

setTimeout(()=>h.remove(),10000);

},300);

// Roses
setInterval(()=>{

const p=document.createElement("div");

p.className="petal";

p.innerHTML="🌹";

p.style.left=Math.random()*100+"%";

petals.appendChild(p);

setTimeout(()=>p.remove(),10000);

},700);

// Balloons
setInterval(()=>{

const b=document.createElement("div");

b.className="balloon";

b.innerHTML="🎈";

b.style.left=Math.random()*100+"%";

b.style.fontSize=(35+Math.random()*20)+"px";

balloons.appendChild(b);

setTimeout(()=>b.remove(),12000);

},900);

// ==========================
// Realistic Fireworks
// ==========================

let fireworks = [];
let sparks = [];
let fireworkRunning = false;

function randomColor(){

    const colors = [
        "#ff3b3b",
        "#ffd700",
        "#00eaff",
        "#ff4fd8",
        "#7cff4f",
        "#ffffff"
    ];

    return colors[Math.floor(Math.random() * colors.length)];

}


// Create Firework
function createFirework(){

    const x = Math.random() * canvas.width;
    const targetY = 80 + Math.random() * canvas.height * 0.4;

    fireworks.push({

        x: x,
        y: canvas.height + 10,

        targetY: targetY,

        speed: 8 + Math.random() * 3,

        color: randomColor(),

        exploded: false

    });

}


// Explosion
function explode(f){

    const particleCount = 100;

    for(let i = 0; i < particleCount; i++){

        const angle =
            (Math.PI * 2 / particleCount) * i;

        const speed =
            2 + Math.random() * 5;

        sparks.push({

            x: f.x,
            y: f.y,

            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,

            life: 1,

            decay: 0.012 + Math.random() * 0.015,

            gravity: 0.045,

            color: f.color,

            size: 1 + Math.random() * 2

        });

    }

}


// Falling Spark Shower
function createRain(){

    for(let i = 0; i < 5; i++){

        sparks.push({

            x: Math.random() * canvas.width,

            y: -10,

            vx: (Math.random() - 0.5) * 0.8,

            vy: 2 + Math.random() * 3,

            life: 1,

            decay: 0.006 + Math.random() * 0.008,

            gravity: 0.02,

            color: Math.random() > 0.5
                ? "#ffd700"
                : "#ffffff",

            size: 1 + Math.random() * 2

        });

    }

}


// Animation
function animateFireworks(){

    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0,0,canvas.width,canvas.height);


    // Rockets
    fireworks.forEach((f,index)=>{

        if(!f.exploded){

            f.y -= f.speed;

            ctx.beginPath();

            ctx.arc(
                f.x,
                f.y,
                2,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = f.color;

            ctx.fill();

            // Trail

            ctx.beginPath();

            ctx.moveTo(f.x,f.y);

            ctx.lineTo(
                f.x,
                f.y + 20
            );

            ctx.strokeStyle =
                f.color;

            ctx.globalAlpha = 0.4;

            ctx.stroke();

            ctx.globalAlpha = 1;


            // Explosion point

            if(f.y <= f.targetY){

                explode(f);

                f.exploded = true;

                fireworks.splice(index,1);

            }

        }

    });


    // Sparks

    sparks.forEach((s,index)=>{

        s.x += s.vx;
        s.y += s.vy;

        s.vy += s.gravity;

        s.vx *= 0.99;

        s.life -= s.decay;


        if(s.life <= 0){

            sparks.splice(index,1);

            return;

        }


        ctx.beginPath();

        ctx.arc(
            s.x,
            s.y,
            s.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = s.color;

        ctx.globalAlpha = s.life;

        ctx.fill();

        ctx.globalAlpha = 1;

    });


    requestAnimationFrame(
        animateFireworks
    );

}


// Start Fireworks
function startRealFireworks(){

    if(fireworkRunning) return;

    fireworkRunning = true;

    animateFireworks();


    // Random fireworks

    setInterval(()=>{

        createFirework();

    },900);


    // Golden rain

    setInterval(()=>{

        createRain();

    },80);

}

// Photo Story
startSlider();

  }
// ==========================
// Photo + Message Story
// ==========================

let currentSlide = 0;

function startSlider(){

    const lines = document.querySelectorAll(".line");

    // প্রথম ছবি
    slides[currentSlide].classList.add("active");

    // প্রথম লেখা
    showLine(0);

    const slider = setInterval(() => {

        slides[currentSlide].classList.remove("active");

        currentSlide++;

        // ১১ নম্বর ছবিতে পৌঁছালে এখানেই থামবে
        if(currentSlide >= slides.length){

            clearInterval(slider);

            currentSlide = slides.length - 1;

            slides[currentSlide].classList.add("active");

            // সব ১১টি লেখা দেখাবে
            lines.forEach(line => {
                line.classList.add("show");
            });

          document.querySelector(".from").classList.add("show");
            return;
        }

        // পরের ছবি
        slides[currentSlide].classList.add("active");

        // সেই ছবির লেখা
        showLine(currentSlide);

    },4000);
}


function showLine(index){

    const lines = document.querySelectorAll(".line");

    if(lines[index]){

        setTimeout(() => {
            lines[index].classList.add("show");
        },500);

    }

}
