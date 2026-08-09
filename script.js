// ==========================
// Birthday V5 - Complete Script
// ==========================


// ==========================
// Elements
// ==========================

const loader = document.getElementById("loader");
const flashOverlay = document.createElement("div");

flashOverlay.id = "flashOverlay";

flashOverlay.style.cssText = `
    position:fixed;
    inset:0;
    z-index:4;
    pointer-events:none;
    background:
        radial-gradient(
            circle at center,
            rgba(255,255,255,.95),
            rgba(120,210,255,.75) 35%,
            rgba(0,0,0,1) 75%
        );
    opacity:1;
    display:none;
    transition:opacity .18s ease;
`;
const welcome = document.getElementById("welcome");
const countSection = document.getElementById("countSection");
const party = document.getElementById("party");

const startBtn = document.getElementById("startBtn");
const count = document.getElementById("count");

const music = document.getElementById("music");


// ==========================
// Loading Screen
// ==========================

window.onload = () => {

    setTimeout(() => {

        if (loader) {
            loader.style.display = "none";
        }

    }, 2000);

};


// ==========================
// Start Button
// ==========================

startBtn.addEventListener("click", () => {

    // Music
    if (music) {

        music.play().catch(() => {
            console.log("Music could not autoplay.");
        });

    }


    // Hide welcome
    welcome.style.opacity = "0";


    setTimeout(() => {

        welcome.style.display = "none";

        countSection.style.display = "flex";

        startCount();

    }, 800);

});


// ==========================
// Countdown
// ==========================

function startCount() {

    let number = 1;

    count.innerHTML = number;


    const timer = setInterval(() => {

        number++;


        count.style.transform = "scale(1.3)";


        setTimeout(() => {

            count.style.transform = "scale(1)";

        }, 180);


        count.innerHTML = number;


        if (number >= 10) {

            clearInterval(timer);


            setTimeout(() => {

                countSection.style.display = "none";

                party.style.display = "flex";


                // Start celebration
                startCelebration();


            }, 800);

        }

    }, 1000);

}


// ==========================
// Celebration Elements
// ==========================

const hearts = document.getElementById("hearts");
const petals = document.getElementById("petals");
const balloons = document.getElementById("balloons");

const slides = document.querySelectorAll(".slide");


// ==========================
// Fireworks Canvas
// ==========================

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");


function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}


resizeCanvas();


window.addEventListener("resize", () => {

    resizeCanvas();

});


// ==========================
// Realistic Fireworks
// ==========================

let fireworks = [];
let sparks = [];

let fireworkRunning = false;


// ==========================
// Firework Colors
// ==========================

function randomColor() {

    const colors = [

        "#ff3b3b",
        "#ffd700",
        "#00eaff",
        "#ff4fd8",
        "#7cff4f",
        "#ffffff",
        "#ff8c00"

    ];

    return colors[
        Math.floor(Math.random() * colors.length)
    ];

}


// ==========================
// Create Firework Rocket
// ==========================

function createFirework() {

    const x =
        Math.random() * canvas.width;


    const targetY =
        70 +
        Math.random() *
        canvas.height *
        0.40;


    fireworks.push({

        x: x,

        y: canvas.height + 20,

        targetY: targetY,

        speed:
            7 +
            Math.random() * 4,

        color:
            randomColor(),

        exploded: false

    });

}


// ==========================
// Firework Explosion
// ==========================

function explode(f){

    // =========================
    // Bright Photo Flash
    // =========================

    if(flashOverlay){

        // প্রথমে কালো থেকে হঠাৎ উজ্জ্বল
        flashOverlay.style.transition =
            "opacity .12s ease";

        flashOverlay.style.opacity = "0";


        // অল্প সময় পর আবার কালো
        setTimeout(() => {

            flashOverlay.style.transition =
                "opacity .6s ease";

            flashOverlay.style.opacity = "1";

        }, 650);

    }


    // =========================
    // Explosion Particles
    // =========================

    const particleCount = 110;


    for(let i = 0; i < particleCount; i++){

        const angle =
            (Math.PI * 2 / particleCount) * i;


        const speed =
            2 + Math.random() * 5;


        sparks.push({

            x: f.x,

            y: f.y,

            vx:
                Math.cos(angle) * speed,

            vy:
                Math.sin(angle) * speed,

            life: 1,

            decay:
                0.009 +
                Math.random() * 0.015,

            gravity: 0.045,

            color: f.color,

            size:
                1 +
                Math.random() * 2.5

        });

    }


    // =========================
    // Extra White Sparks
    // =========================

    for(let i = 0; i < 30; i++){

        const angle =
            Math.random() *
            Math.PI * 2;


        const speed =
            1 +
            Math.random() * 4;


        sparks.push({

            x: f.x,

            y: f.y,

            vx:
                Math.cos(angle) * speed,

            vy:
                Math.sin(angle) * speed,

            life: 1,

            decay: 0.018,

            gravity: 0.03,

            color: "#ffffff",

            size: 1

        });

    }

}


    // Extra small white sparks

    for (let i = 0; i < 25; i++) {

        const angle =
            Math.random() *
            Math.PI * 2;


        const speed =
            1 +
            Math.random() * 3;


        sparks.push({

            x: f.x,

            y: f.y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life: 1,

            decay: 0.02,

            gravity: 0.03,

            color: "#ffffff",

            size: 1

        });

    }

}


// ==========================
// Falling Golden Spark Shower
// ==========================

function createRain() {

    for (let i = 0; i < 4; i++) {

        sparks.push({

            x:
                Math.random() *
                canvas.width,

            y: -10,

            vx:
                (Math.random() - 0.5) *
                0.8,

            vy:
                2 +
                Math.random() * 3,

            life: 1,

            decay:
                0.005 +
                Math.random() * 0.008,

            gravity: 0.018,

            color:
                Math.random() > 0.35
                    ? "#ffd700"
                    : "#ffffff",

            size:
                1 +
                Math.random() * 2

        });

    }

}


// ==========================
// Fireworks Animation
// ==========================

function animateFireworks() {

    // Slight fade instead of full clear
    ctx.fillStyle =
        "rgba(0,0,0,0.15)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // ======================
    // Rockets
    // ======================

    for (
        let i = fireworks.length - 1;
        i >= 0;
        i--
    ) {

        const f = fireworks[i];


        if (!f.exploded) {

            f.y -= f.speed;


            // Rocket glow

            ctx.beginPath();

            ctx.arc(
                f.x,
                f.y,
                2.5,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                f.color;

            ctx.shadowBlur = 15;

            ctx.shadowColor =
                f.color;

            ctx.fill();

            ctx.shadowBlur = 0;


            // Rocket trail

            ctx.beginPath();

            ctx.moveTo(
                f.x,
                f.y
            );

            ctx.lineTo(
                f.x,
                f.y + 25
            );


            ctx.strokeStyle =
                f.color;

            ctx.globalAlpha = 0.4;

            ctx.lineWidth = 2;

            ctx.stroke();

            ctx.globalAlpha = 1;


            // Explosion

            if (f.y <= f.targetY) {

                explode(f);

                f.exploded = true;

                fireworks.splice(i, 1);

            }

        }

    }


    // ======================
    // Sparks
    // ======================

    for (
        let i = sparks.length - 1;
        i >= 0;
        i--
    ) {

        const s = sparks[i];


        s.x += s.vx;

        s.y += s.vy;


        // Gravity

        s.vy += s.gravity;


        // Air resistance

        s.vx *= 0.99;


        // Fade

        s.life -= s.decay;


        if (s.life <= 0) {

            sparks.splice(i, 1);

            continue;

        }


        // Spark glow

        ctx.beginPath();

        ctx.arc(
            s.x,
            s.y,
            s.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            s.color;

        ctx.globalAlpha =
            s.life;

        ctx.shadowBlur = 10;

        ctx.shadowColor =
            s.color;

        ctx.fill();


        ctx.shadowBlur = 0;

        ctx.globalAlpha = 1;

    }


    requestAnimationFrame(
        animateFireworks
    );

}


// ==========================
// Start Fireworks
// ==========================

function startRealFireworks(){

    if(fireworkRunning){
        return;
    }

    fireworkRunning = true;

    document.body.appendChild(flashOverlay);

    flashOverlay.style.display = "block";
    flashOverlay.style.opacity = "1";

    animateFireworks();

    setInterval(()=>{
        createFirework();
    },900);

    setInterval(()=>{
        createRain();
    },70);
}


// ==========================
// Hearts
// ==========================

function startHearts() {

    setInterval(() => {

        const h =
            document.createElement("div");


        h.className = "heart";


        h.innerHTML = [
            "❤️",
            "💖",
            "💕",
            "💗"
        ][
            Math.floor(
                Math.random() * 4
            )
        ];


        h.style.left =
            Math.random() * 100 + "%";


        h.style.fontSize =
            20 +
            Math.random() * 25 +
            "px";


        hearts.appendChild(h);


        setTimeout(() => {

            h.remove();

        }, 10000);

    }, 300);

}


// ==========================
// Roses
// ==========================

function startPetals() {

    setInterval(() => {

        const p =
            document.createElement("div");


        p.className = "petal";


        p.innerHTML = "🌹";


        p.style.left =
            Math.random() * 100 + "%";


        petals.appendChild(p);


        setTimeout(() => {

            p.remove();

        }, 10000);

    }, 700);

}


// ==========================
// Balloons
// ==========================

function startBalloons() {

    setInterval(() => {

        const b =
            document.createElement("div");


        b.className = "balloon";


        b.innerHTML = "🎈";


        b.style.left =
            Math.random() * 100 + "%";


        b.style.fontSize =
            35 +
            Math.random() * 20 +
            "px";


        balloons.appendChild(b);


        setTimeout(() => {

            b.remove();

        }, 12000);

    }, 900);

}


// ==========================
// Celebration Start
// ==========================

function startCelebration() {

    // Start effects

    startHearts();

    startPetals();

    startBalloons();


    // Start realistic fireworks

    startRealFireworks();


    // Start photo story

    startSlider();

}


// ==========================
// Photo Story
// ==========================

let currentSlide = 0;


function startSlider() {

    const lines =
        document.querySelectorAll(".line");


    const from =
        document.querySelector(".from");


    // First photo

    if (slides.length > 0) {

        slides[currentSlide]
            .classList.add("active");

    }


    // First message

    showLine(0);


    const slider =
        setInterval(() => {


            if (slides.length === 0) {

                clearInterval(slider);

                return;

            }


            slides[currentSlide]
                .classList.remove("active");


            currentSlide++;


            // Last photo

            if (
                currentSlide >=
                slides.length
            ) {

                clearInterval(slider);


                currentSlide =
                    slides.length - 1;


                slides[currentSlide]
                    .classList.add("active");


                // Show all messages

                lines.forEach(line => {

                    line.classList.add("show");

                });


                // Show signature

                if (from) {

                    setTimeout(() => {

                        from.classList.add("show");

                    }, 700);

                }


                return;

            }


            // Next photo

            slides[currentSlide]
                .classList.add("active");


            // Show matching message

            showLine(currentSlide);


        }, 4000);

}


// ==========================
// Show Message
// ==========================

function showLine(index) {

    const lines =
        document.querySelectorAll(".line");


    if (lines[index]) {

        setTimeout(() => {

            lines[index]
                .classList.add("show");

        }, 500);

    }

    }
