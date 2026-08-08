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

// Fireworks

setInterval(()=>{

const x=Math.random()*canvas.width;
const y=Math.random()*canvas.height*0.5;

for(let i=0;i<80;i++){

const angle=(Math.PI*2/80)*i;
const len=20+Math.random()*60;

ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(
x+Math.cos(angle)*len,
y+Math.sin(angle)*len
);

ctx.strokeStyle=`hsl(${Math.random()*360},100%,60%)`;

ctx.lineWidth=2;

ctx.stroke();

}

setTimeout(()=>{

ctx.clearRect(0,0,canvas.width,canvas.height);

},500);

},1200);

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

        // আগের ছবি সরাবে
        slides[currentSlide].classList.remove("active");

        currentSlide++;

        // ১১ নম্বর ছবিতে পৌঁছালে
        if(currentSlide >= slides.length){

            clearInterval(slider);

            // সব লেখা দেখাবে
            lines.forEach(line => {
                line.classList.add("show");
            });

            return;
        }

        // নতুন ছবি দেখাবে
        slides[currentSlide].classList.add("active");

        // নতুন ছবির লেখা দেখাবে
        showLine(currentSlide);

    },4000);
}


function showLine(index){

    const lines = document.querySelectorAll(".line");

    // আগের লেখাগুলো মুছে ফেলবে না
    // শুধু বর্তমান ছবির লেখাটি দেখাবে

    if(lines[index]){

        setTimeout(() => {

            lines[index].classList.add("show");

        },500);

    }
}
