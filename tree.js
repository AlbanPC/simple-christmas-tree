// Canvas setup
const canvas = document.getElementById('christmasTreeCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Audio Setup
const audio = new Audio('/audio/jingle-bells.mp3');
let isPlaying = false;

// Initialize variables
let particles = [];
let snowflakes = [];
let lights = [];
const colors = ['#ff0000', '#ffff00', '#00ff00', '#0000ff', '#ff69b4'];

// Play/Pause Music
function toggleMusic() {
    isPlaying ? audio.pause() : audio.play();
    isPlaying = !isPlaying;
}

// Draw tree
function drawTree(x, y, width, height, levels) {
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - width / 8, y, width / 4, height / 5);

    ctx.fillStyle = '#0f5132';
    for (let i = 0; i < levels; i++) {
        const levelWidth = width - (i * width / levels);
        const levelHeight = height / levels;
        ctx.beginPath();
        ctx.moveTo(x - levelWidth / 2, y - (i + 1) * levelHeight);
        ctx.lineTo(x, y - i * levelHeight);
        ctx.lineTo(x + levelWidth / 2, y - (i + 1) * levelHeight);
        ctx.closePath();
        ctx.fill();
    }
}

// Generate snowflakes
function createSnowflakes(count) {
    for (let i = 0; i < count; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 2,
            speed: Math.random() * 1 + 0.5,
        });
    }
}

// Draw snowflakes
function drawSnowflakes() {
    ctx.fillStyle = 'white';
    snowflakes.forEach(snowflake => {
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, Math.PI * 2);
        ctx.fill();
        snowflake.y += snowflake.speed;
        if (snowflake.y > canvas.height) snowflake.y = -10;
    });
}

// Generate ornaments/lights
function createLights(count) {
    for (let i = 0; i < count; i++) {
        lights.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 200,
            y: canvas.height - 300 - Math.random() * 400,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 5 + 5,
        });
    }
}

// Draw ornaments/lights
function drawLights() {
    lights.forEach(light => {
        ctx.beginPath();
        ctx.arc(light.x, light.y, light.size, 0, Math.PI * 2);
        ctx.fillStyle = light.color;
        ctx.fill();
    });
}

// Generate particles
function createParticles(count) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 2 + 1,
            angle: Math.random() * Math.PI * 2,
        });
    }
}

// Draw particles
function drawParticles() {
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.x > canvas.width || particle.x < 0) particle.x = Math.random() * canvas.width;
    });
}

// Handle canvas gestures
let startX = 0, startY = 0, rotating = false;
canvas.addEventListener('mousedown', e => {
    rotating = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mousemove', e => {
    if (rotating) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        canvas.style.transform = `rotateY(${deltaX / 2}deg) rotateX(${-deltaY / 2}deg)`;
    }
});

canvas.addEventListener('mouseup', () => rotating = false);

// Initialize scene
function initializeScene() {
    createSnowflakes(100);
    createLights(30);
    createParticles(50);
    draw();
}

// Main draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const baseY = canvas.height - 100;
    const treeWidth = 200;
    const treeHeight = 400;
    const levels = 5;

    drawTree(centerX, baseY, treeWidth, treeHeight, levels);
    drawLights();
    drawParticles();
    drawSnowflakes();

    requestAnimationFrame(draw);
}

initializeScene();
