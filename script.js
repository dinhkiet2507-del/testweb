/* =================================
   PARTICLE BACKGROUND
================================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
    x: null,
    y: null,
    radius: 150
};

/* =================================
   CANVAS RESIZE
================================= */

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createParticles();
}

window.addEventListener("resize", resizeCanvas);

/* =================================
   PARTICLE CLASS
================================= */

class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size =
            Math.random() * 2 + 0.5;

        this.speedX =
            (Math.random() - 0.5) * 0.5;

        this.speedY =
            (Math.random() - 0.5) * 0.5;

        this.opacity =
            Math.random() * 0.5 + 0.2;
    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        /* Chạm cạnh trái/phải */
        if (
            this.x < 0 ||
            this.x > canvas.width
        ) {
            this.speedX *= -1;
        }

        /* Chạm cạnh trên/dưới */
        if (
            this.y < 0 ||
            this.y > canvas.height
        ) {
            this.speedY *= -1;
        }

        /* Tương tác với chuột */
        if (
            mouse.x !== null &&
            mouse.y !== null
        ) {

            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {

                const angle =
                    Math.atan2(dy, dx);

                const force =
                    (mouse.radius - distance)
                    / mouse.radius;

                const moveX =
                    Math.cos(angle) * force * 2;

                const moveY =
                    Math.sin(angle) * force * 2;

                this.x += moveX;
                this.y += moveY;
            }
        }
    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(100, 200, 255, ${this.opacity})`;

        ctx.fill();
    }
}

/* =================================
   CREATE PARTICLES
================================= */

function createParticles() {

    particles = [];

    const area =
        canvas.width * canvas.height;

    const numberOfParticles =
        Math.min(
            120,
            Math.floor(area / 12000)
        );

    for (
        let i = 0;
        i < numberOfParticles;
        i++
    ) {

        particles.push(
            new Particle()
        );
    }
}

/* =================================
   CONNECT PARTICLES
================================= */

function connectParticles() {

    const maxDistance = 120;

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (
                distance < maxDistance
            ) {

                const opacity =
                    1 -
                    distance / maxDistance;

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(80, 170, 255, ${opacity * 0.15})`;

                ctx.lineWidth = 1;

                ctx.stroke();
            }
        }
    }
}

/* =================================
   ANIMATION LOOP
================================= */

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        particles[i].update();
        particles[i].draw();
    }

    connectParticles();

    requestAnimationFrame(animate);
}

/* =================================
   MOUSE
================================= */

window.addEventListener(
    "mousemove",
    function (event) {

        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }
);

window.addEventListener(
    "mouseleave",
    function () {

        mouse.x = null;
        mouse.y = null;
    }
);

/* =================================
   TOUCH
================================= */

window.addEventListener(
    "touchmove",
    function (event) {

        if (event.touches.length > 0) {

            mouse.x =
                event.touches[0].clientX;

            mouse.y =
                event.touches[0].clientY;
        }
    },
    {
        passive: true
    }
);

window.addEventListener(
    "touchend",
    function () {

        mouse.x = null;
        mouse.y = null;
    }
);

/* =================================
   START
================================= */

resizeCanvas();
animate();