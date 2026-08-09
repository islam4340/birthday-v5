// ==========================
// Birthday V5 - FINAL SCRIPT
// ==========================


// ==========================
// Elements
// ==========================

const loader = document.getElementById("loader");
const welcome = document.getElementById("welcome");
const countSection = document.getElementById("countSection");
const party = document.getElementById("party");

const startBtn = document.getElementById("startBtn");
const count = document.getElementById("count");
const music = document.getElementById("music");

const hearts = document.getElementById("hearts");
const petals = document.getElementById("petals");
const balloons = document.getElementById("balloons");

const slides = document.querySelectorAll(".slide");

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");


// ==========================
// Firework Variables
// ==========================

let fireworks = [];
let sparks = [];

let fireworkRunning = false;

let currentSlide = 0;


// ==========================
// Canvas Size
// ==========================

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// ==========================
// Loading
// ==========================

window.addEventListener("load", () => {

    setTimeout(() => {

        if (loader) {
            loader.style.display = "none";
        }

    }, 2000);

});


// ==========================
// Surprise Button
// ==========================

startBtn.addEventListener("click", () => {

    // Music
    if (music) {

        music.play().catch(() => {
            console.log("Music blocked until user interaction.");
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

                startCelebration();

            }, 800);

        }

    }, 1000);

}


// ==========================
// Firework Color
// ==========================

function randomColor() {

    const colors = [
        "#ff3030",
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
// Create Rocket
// ==========================

function createFirework() {

    const x =
        Math.random() * canvas.width;


    const targetY =
        80 +
        Math.random() *
        canvas.height *
        0.38;


    fireworks.push({

        x: x,

        y: canvas.height + 20,

        targetY: targetY,

        speed:
            7 +
            Math.random() * 4,

        color:
            randomColor()

    });

}


// ==========================
// Create Flash Overlay
// ==========================

function createFlashOverlay(){

    let overlay =
        document.getElementById("fireworkFlash");

    if(overlay){
        return overlay;
    }

    overlay =
        document.createElement("div");

    overlay.id =
        "fireworkFlash";

    overlay.style.position =
        "fixed";

    overlay.style.inset =
        "0";

    overlay.style.zIndex =
        "4";

    overlay.style.pointerEvents =
        "none";

    // কালো থাকবে
    overlay.style.background =
        "#000";

    // শুরু থেকেই কালো
    overlay.style.opacity =
        "1";

    overlay.style.display =
        "block";

    party.appendChild(overlay);

    return overlay;

}


// ==========================
// Firework Explosion
// ==========================
function explode(f){

    // =========================
    // Photo ON during blast
    // =========================

    const flash =
        document.getElementById("fireworkFlash");

    if(flash){

        flash.style.opacity = "0";

        setTimeout(() => {

            flash.style.opacity = "1";

        }, 650);

    }


    // =========================
    // Main Explosion
    // =========================

    const particleCount = 110;

    for(let i = 0; i < particleCount; i++){

        const angle =
            (Math.PI * 2 / particleCount) * i;

        const speed =
            2 + Math.random() * 5;

        sparks.push({

            x:f.x,
            y:f.y,

            vx:
                Math.cos(angle) * speed,

            vy:
                Math.sin(angle) * speed,

            life:1,

            decay:
                0.009 +
                Math.random() * 0.015,

            gravity:0.045,

            color:f.color,

            size:
                1 +
                Math.random() * 2.5

        });

    }


    // =========================
    // White Sparks
    // =========================

    for(let i = 0; i < 30; i++){

        const angle =
            Math.random() * Math.PI * 2;

        const speed =
            1 + Math.random() * 4;

        sparks.push({

            x:f.x,
            y:f.y,

            vx:
                Math.cos(angle) * speed,

            vy:
                Math.sin(angle) * speed,

            life:1,

            decay:0.018,

            gravity:0.03,

            color:"#ffffff",

            size:1

        });

    }

}  
// ==========================
// Golden Falling Sparks
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
                Math.random() > 0.3
                    ? "#ffd700"
                    : "#ffffff",

            size:
                1 +
                Math.random() * 2

        });

    }

}


// ==========================
// Firework Animation
// ==========================

function animateFireworks() {

    // IMPORTANT:
    // Clear canvas completely.
    // This keeps photos clear.

    ctx.clearRect(
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

        const f =
            fireworks[i];


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

        ctx.shadowBlur =
            15;

        ctx.shadowColor =
            f.color;

        ctx.fill();


        ctx.shadowBlur =
            0;


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

        ctx.globalAlpha =
            0.4;

        ctx.lineWidth =
            2;

        ctx.stroke();

        ctx.globalAlpha =
            1;


        // Explosion

        if (f.y <= f.targetY) {

            explode(f);

            fireworks.splice(i, 1);

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

        const s =
            sparks[i];


        s.x += s.vx;

        s.y += s.vy;


        s.vy +=
            s.gravity;


        s.vx *=
            0.99;


        s.life -=
            s.decay;


        if (s.life <= 0) {

            sparks.splice(i, 1);

            continue;

        }


        // Spark

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

        ctx.shadowBlur =
            10;

        ctx.shadowColor =
            s.color;

        ctx.fill();


        ctx.shadowBlur =
            0;

        ctx.globalAlpha =
            1;

    }


    requestAnimationFrame(
        animateFireworks
    );

}


// ==========================
// Start Fireworks
// ==========================

function startRealFireworks() {

    if (fireworkRunning) {
        return;
    }


    fireworkRunning =
        true;


    // Start canvas

    animateFireworks();


    // First rocket

    setTimeout(() => {

        createFirework();

    }, 500);


    // More rockets

    setInterval(() => {

        createFirework();

    }, 1200);


    // Golden rain

    setInterval(() => {

        createRain();

    }, 70);

}


// ==========================
// Hearts
// ==========================

function startHearts() {

    setInterval(() => {

        const h =
            document.createElement("div");


        h.className =
            "heart";


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


        p.className =
            "petal";


        p.innerHTML =
            "🌹";


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


        b.className =
            "balloon";


        b.innerHTML =
            "🎈";


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
// Celebration
// ==========================

function startCelebration() {

    startHearts();

    startPetals();

    startBalloons();

    startRealFireworks();

    startSlider();

}


// ==========================
// Photo Slider
// ==========================

function startSlider() {

    const lines =
        document.querySelectorAll(".line");

    const from =
        document.querySelector(".from");


    currentSlide = 0;


    // First photo

    if (slides.length > 0) {

        slides[0]
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


                // Show all lines

                lines.forEach(line => {

                    line.classList.add("show");

                });


                // Signature

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


            // Matching line

            showLine(currentSlide);


        }, 4000);

}


// ==========================
// Show Line
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
