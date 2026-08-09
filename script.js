// =====================================================
// 🎂 BIRTHDAY V5 — COMPLETE FINAL SCRIPT
// =====================================================


// =====================================================
// ELEMENTS
// =====================================================

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


// =====================================================
// VARIABLES
// =====================================================

let fireworks = [];
let sparks = [];

let fireworkRunning = false;

let currentSlide = 0;


// =====================================================
// CANVAS
// =====================================================

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// =====================================================
// LOADING
// =====================================================

window.addEventListener("load", () => {

    setTimeout(() => {

        if(loader){

            loader.style.display = "none";

        }

    }, 2000);

});


// =====================================================
// START BUTTON
// =====================================================

startBtn.addEventListener("click", () => {

    // Music
    if(music){

        music.play().catch(() => {});

    }


    // Hide welcome
    welcome.style.opacity = "0";


    setTimeout(() => {

        welcome.style.display = "none";

        countSection.style.display = "flex";

        startCount();

    }, 800);

});


// =====================================================
// COUNTDOWN
// =====================================================

function startCount(){

    let number = 1;

    count.innerHTML = number;


    const timer = setInterval(() => {

        number++;


        count.innerHTML = number;

        count.style.transform =
            "scale(1.3)";


        setTimeout(() => {

            count.style.transform =
                "scale(1)";

        },180);


        if(number >= 10){

            clearInterval(timer);


            setTimeout(() => {

                countSection.style.display =
                    "none";

                party.style.display =
                    "flex";


                startCelebration();

            },800);

        }

    },1000);

}


// =====================================================
// FIREWORK COLOR
// =====================================================

function randomColor(){

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
        Math.floor(
            Math.random() *
            colors.length
        )
    ];

}

// =====================================================
// CREATE FIREWORK ROCKET
// =====================================================

function createFirework(){

    const x =
        Math.random() *
        canvas.width;


    const targetY =
        80 +
        Math.random() *
        canvas.height *
        0.38;


    fireworks.push({

        x:x,

        y:
            canvas.height + 20,

        targetY:
            targetY,

        speed:
            7 +
            Math.random() * 4,

        color:
            randomColor()

    });

}


// =====================================================
// FIREWORK EXPLOSION
// =====================================================

function explode(f){

    const cover =
        document.getElementById(
            "blackCover"
        );


    // =================================================
    // BLAST হলে PHOTO দেখা যাবে
    // =================================================

    if(cover){

        cover.style.opacity =
            "0";


        // Blast শেষ হলে আবার BLACK

        setTimeout(() => {

            cover.style.opacity =
                "1";

        },700);

    }


    // =================================================
    // MAIN PARTICLES
    // =================================================

    const particleCount = 130;


    for(
        let i = 0;
        i < particleCount;
        i++
    ){

        const angle =
            (Math.PI * 2 / particleCount) *
            i;


        const speed =
            2 +
            Math.random() * 5.5;


        sparks.push({

            x:f.x,

            y:f.y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life:1,

            decay:
                0.008 +
                Math.random() *
                0.014,

            gravity:
                0.045,

            color:
                f.color,

            size:
                1 +
                Math.random() *
                2.5

        });

    }


    // =================================================
    // WHITE SPARKS
    // =================================================

    for(
        let i = 0;
        i < 35;
        i++
    ){

        const angle =
            Math.random() *
            Math.PI * 2;


        const speed =
            1 +
            Math.random() * 4;


        sparks.push({

            x:f.x,

            y:f.y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life:1,

            decay:
                0.018,

            gravity:
                0.03,

            color:
                "#ffffff",

            size:
                1

        });

    }

}


// =====================================================
// GOLDEN RAIN
// =====================================================

function createRain(){

    for(
        let i = 0;
        i < 4;
        i++
    ){

        sparks.push({

            x:
                Math.random() *
                canvas.width,

            y:-10,

            vx:
                (Math.random() - 0.5) *
                0.8,

            vy:
                2 +
                Math.random() * 3,

            life:1,

            decay:
                0.005 +
                Math.random() *
                0.008,

            gravity:
                0.018,

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


// =====================================================
// FIREWORK ANIMATION
// =====================================================

function animateFireworks(){

    // Canvas transparent রাখছি
    // যাতে black cover/photo দেখা যায়

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // =================================================
    // ROCKETS
    // =================================================

    for(
        let i = fireworks.length - 1;
        i >= 0;
        i--
    ){

        const f =
            fireworks[i];


        f.y -=
            f.speed;


        // Rocket

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
            0.45;


        ctx.lineWidth =
            2;


        ctx.stroke();


        ctx.globalAlpha =
            1;


        // Explosion

        if(
            f.y <=
            f.targetY
        ){

            explode(f);

            fireworks.splice(
                i,
                1
            );

        }

    }


    // =================================================
    // SPARKS
    // =================================================

    for(
        let i = sparks.length - 1;
        i >= 0;
        i--
    ){

        const s =
            sparks[i];


        s.x +=
            s.vx;


        s.y +=
            s.vy;


        s.vy +=
            s.gravity;


        s.vx *=
            0.99;


        s.life -=
            s.decay;


        if(
            s.life <= 0
        ){

            sparks.splice(
                i,
                1
            );

            continue;

        }


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


// =====================================================
// START FIREWORKS
// =====================================================

function startRealFireworks(){

    if(fireworkRunning){
        return;
    }

    fireworkRunning = true;

    // প্রথমে photo কালো থাকবে
    slides.forEach(slide => {

        slide.style.opacity = "0.08";

    });


    animateFireworks();


    // প্রথম firework
    setTimeout(() => {

        createFirework();

    },500);


    // পরের firework
    setInterval(() => {

        createFirework();

    },1200);


    // Golden rain
    setInterval(() => {

        createRain();

    },70);

}


// =====================================================
// HEARTS
// =====================================================

function startHearts(){

    setInterval(() => {

        const h =
            document.createElement(
                "div"
            );


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
            Math.random() *
            100 +
            "%";


        h.style.fontSize =
            20 +
            Math.random() *
            25 +
            "px";


        hearts.appendChild(h);


        setTimeout(() => {

            h.remove();

        },10000);

    },300);

}


// =====================================================
// ROSES
// =====================================================

function startPetals(){

    setInterval(() => {

        const p =
            document.createElement(
                "div"
            );


        p.className =
            "petal";


        p.innerHTML =
            "🌹";


        p.style.left =
            Math.random() *
            100 +
            "%";


        petals.appendChild(p);


        setTimeout(() => {

            p.remove();

        },10000);

    },700);

}


// =====================================================
// BALLOONS
// =====================================================

function startBalloons(){

    setInterval(() => {

        const b =
            document.createElement(
                "div"
            );


        b.className =
            "balloon";


        b.innerHTML =
            "🎈";


        b.style.left =
            Math.random() *
            100 +
            "%";


        b.style.fontSize =
            35 +
            Math.random() *
            20 +
            "px";


        balloons.appendChild(b);


        setTimeout(() => {

            b.remove();

        },12000);

    },900);

}


// =====================================================
// CELEBRATION
// =====================================================

function startCelebration(){

    startHearts();

    startPetals();

    startBalloons();

    startRealFireworks();

    startSlider();

}


// =====================================================
// PHOTO SLIDER
// =====================================================

function startSlider(){

    const lines =
        document.querySelectorAll(".line");

    const from =
        document.querySelector(".from");


    // =====================================
    // শুরু হবে ১ নম্বর ছবি থেকে
    // =====================================

    currentSlide = 0;


    if(slides.length > 0){

        slides[0]
            .classList
            .add("active");

        slides[0].style.opacity = "0.08";

    }


    // প্রথম লেখা
    showLine(0);


    // =====================================
    // PHOTO SLIDER
    // =====================================

    const slider = setInterval(() => {


        // কোনো ছবি না থাকলে বন্ধ
        if(slides.length === 0){

            clearInterval(slider);

            return;

        }


        // বর্তমান ছবি সরিয়ে দাও

        slides[currentSlide]
            .classList
            .remove("active");


        currentSlide++;


        // =====================================
        // ১১ নম্বর ছবিতে পৌঁছে গেলে
        // =====================================

        if(currentSlide >= slides.length){

            clearInterval(slider);


            // শেষ ছবি = ১১ নম্বর
            currentSlide =
                slides.length - 1;


            const lastPhoto =
                slides[currentSlide];


            // =================================
            // ১১ নম্বর ছবি পুরো পরিষ্কার
            // =================================

            lastPhoto
                .classList
                .add("active");


            lastPhoto.style.transition =
                "opacity 1s ease";


            lastPhoto.style.opacity =
                "1";


            // =================================
            // সব ১১টি লেখা দেখাবে
            // =================================

            lines.forEach(line => {

                line.classList.add("show");

            });


            // =================================
            // তোমার জামাই জান
            // =================================

            if(from){

                setTimeout(() => {

                    from.classList.add("show");

                },700);

            }


            // =================================
            // ১১ নম্বর ছবিতে আর কোনো
            // কালো effect হবে না
            // =================================

            return;

        }


        // =====================================
        // পরের ছবি
        // =====================================

        slides[currentSlide]
            .classList
            .add("active");


        // নতুন ছবিও শুরুতে কালো থাকবে

        slides[currentSlide]
            .style.opacity = "0.08";


        // =====================================
        // সেই ছবির লেখা
        // =====================================

        showLine(currentSlide);


    },4000);

}


// =====================================================
// SHOW MESSAGE LINE
// =====================================================

function showLine(index){

    const lines =
        document.querySelectorAll(
            ".line"
        );


    if(
        lines[index]
    ){

        setTimeout(() => {

            lines[index]
                .classList
                .add("show");

        },500);

    }

      }
