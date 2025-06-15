
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isRaining = true;
let rainAreaHeight = window.innerHeight / 2;
let snowAreaHeight = window.innerHeight;

function randomNum(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function RainDrops(x, y, endy, velocity, opacity) {
    this.x = x;
    this.y = y;
    this.endy = endy;
    this.velocity = velocity;
    this.opacity = opacity;

    this.draw = function() {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x, this.y - this.endy);
        c.lineWidth = 1;
        c.strokeStyle = "rgba(255, 255, 255, " + this.opacity + ")";
        c.stroke();
    };

    this.update = function() {
        let rainEnd = window.innerHeight + 100;
        if (this.y >= rainEnd) {
            this.y = randomNum(-500, 0);
        } else {
            this.y += this.velocity;
        }
        this.draw();
    };
}

function SnowFlake(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = "rgba(255, 255, 255, 0.8)";
        c.fill();
        c.closePath();
    };

    this.update = function() {
        if (this.y >= window.innerHeight + this.radius) {
            this.y = -this.radius;
            this.x = Math.random() * window.innerWidth;
        } else {
            this.y += this.velocity;
        }
        this.draw();
    };
}

let rainArray = [];
let snowArray = [];

function createRain() {
    rainArray = [];
    for (let i = 0; i < 140; i++) {
        let rainXLocation = Math.random() * window.innerWidth;
        let rainYLocation = Math.random() * -500;
        let randomRainHeight = randomNum(10, 2);
        let randomSpeed = randomNum(20, 0.2);
        let randomOpacity = Math.random() * 0.55;
        rainArray.push(new RainDrops(rainXLocation, rainYLocation, randomRainHeight, randomSpeed, randomOpacity));
    }
}

function createSnow() {
    snowArray = [];
    for (let i = 0; i < 140; i++) {
        let snowXLocation = Math.random() * window.innerWidth;
        let snowYLocation = Math.random() * -500;
        let randomSnowRadius = randomNum(5, 2);
        let randomSpeed = randomNum(2, 0.5);
        snowArray.push(new SnowFlake(snowXLocation, snowYLocation, randomSnowRadius, randomSpeed));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (isRaining) {
        rainArray.forEach(rain => rain.update());
    } else {
        snowArray.forEach(snow => snow.update());
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    rainAreaHeight = window.innerHeight / 2;
    snowAreaHeight = window.innerHeight;
});

document.getElementById('weatherToggle').addEventListener('change', (e) => {
    isRaining = !e.target.checked;
    document.querySelector('.toggle-circle').style.backgroundImage = isRaining 
        ? "url('дождь.jpg')" 
        : "url('ama.jpg')";
});

createRain();
createSnow();
animate();