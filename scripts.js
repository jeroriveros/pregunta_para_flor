// Background music setup
document.addEventListener("DOMContentLoaded", function () {
    const bgMusic = document.getElementById('bgMusic');
    const pantallaInicial = document.getElementById('pantallaInicial');
    const collage = document.querySelector('.collage');
    const step1 = document.querySelector('#step1');
    const step2 = document.querySelector('#step2');
    const particles = document.getElementById('particles');

    const startExperience = () => {
        bgMusic.volume = 0.3;
        bgMusic.play();

        pantallaInicial.style.display = 'none';
        collage.style.display = 'grid';
        step1.style.display = 'block';
        particles.style.display = 'block';
    };

    pantallaInicial.addEventListener('click', startExperience);
    pantallaInicial.addEventListener('touchstart', startExperience);

    // Step navigation
    const startBtn = document.querySelector('#startBtn');

    startBtn.addEventListener('click', function () {
        step1.style.display = 'none';
        step2.style.display = 'block';
    });

    // Yes button action
    const yesBtn = document.querySelector('#yesBtn');
    yesBtn.addEventListener('click', function () {
        step2.innerHTML = `
            <div style="text-align: center; margin-top: 20%;">
                <h1 style="color: #fff; font-size: 2.5rem;">¡Gracias por aceptar! 💖</h1>
                <p style="color: #fff; font-size: 1.2rem;">Prometo cuidarte y tratarte como te mereces. Gracias por ser mi compañera. Te quiero mucho 💞</p>
                <p style="color: #ffg; font-size: 1.5rem;">13/12/2024 💘</p>
            </div>`;
    });

    // No button behavior
    const noBtn = document.querySelector('#noBtn');
    noBtn.addEventListener('mouseover', function () {
        const randomX = parseInt(Math.random() * 90);
        const randomY = parseInt(Math.random() * 90);
        noBtn.style.setProperty('top', randomY + '%');
        noBtn.style.setProperty('left', randomX + '%');
        noBtn.style.setProperty('transform', `translate(-${randomX}%, -${randomY}%)`);
        noBtn.innerText = "¡Vamos, presiona 'Sí'!";
    });

    // Particles effect
    const ctx = particles.getContext('2d');
    particles.width = window.innerWidth;
    particles.height = window.innerHeight;

    let particleArray = [];
    const colors = ['#ff69b4', '#ffe4e1', '#fff', '#ff1493'];

    class Particle {
        constructor(x, y, size, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.velocityX = (Math.random() - 0.5) * 2;
            this.velocityY = (Math.random() - 0.5) * 2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            this.x += this.velocityX;
            this.y += this.velocityY;
            if (this.x > particles.width || this.x < 0) this.velocityX *= -1;
            if (this.y > particles.height || this.y < 0) this.velocityY *= -1;
            this.draw();
        }
    }

    function initParticles() {
        particleArray = [];
        for (let i = 0; i < 50; i++) {
            const size = Math.random() * 5 + 2;
            const x = Math.random() * particles.width;
            const y = Math.random() * particles.height;
            const color = colors[Math.floor(Math.random() * colors.length)];
            particleArray.push(new Particle(x, y, size, color));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, particles.width, particles.height);
        particleArray.forEach(particle => particle.update());
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
});
