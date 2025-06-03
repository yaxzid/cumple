document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById('openGiftBtn');
    const container = document.getElementById('container');
    const overlay = document.getElementById('overlay');
    const fondoNegro = document.getElementById('fondoNegro');
    const giftCard = document.getElementById('giftCard');

    const music = document.getElementById('music');
    const soundBlow = document.getElementById('soundBlow');
    const btnSoplar = document.getElementById('btnSoplar');
    const torta = document.getElementById('torta');
    const beforeSoplar = document.querySelector('.before-soplar');
    const afterSoplar = document.querySelector('.after-soplar');



    const img = document.querySelector('.draggable-img');
  let isDragging = false;
  let offset = { x: 0, y: 0 };

  if (!/Mobi|Android/i.test(navigator.userAgent)) {
    img.addEventListener('mousedown', startDrag);
      img.addEventListener('touchstart', startDragTouch);
  }



  function startDrag(e) {
    isDragging = true;
    offset.x = e.clientX - img.offsetLeft;
    offset.y = e.clientY - img.offsetTop;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  }

  function startDragTouch(e) {
    isDragging = true;
    const touch = e.touches[0];
    offset.x = touch.clientX - img.offsetLeft;
    offset.y = touch.clientY - img.offsetTop;
    document.addEventListener('touchmove', dragTouch);
    document.addEventListener('touchend', stopDrag);
  }

  function drag(e) {
    if (isDragging) {
      img.style.left = (e.clientX - offset.x) + 'px';
      img.style.top = (e.clientY - offset.y) + 'px';
    }
  }

  function dragTouch(e) {
    if (isDragging) {
      const touch = e.touches[0];
      img.style.left = (touch.clientX - offset.x) + 'px';
      img.style.top = (touch.clientY - offset.y) + 'px';
    }
  }

  function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', dragTouch);
    document.removeEventListener('touchend', stopDrag);
  }

    // Abrir la tarjeta regalo
    btn.addEventListener('click', () => {
        container.style.display = 'none';
        fondoNegro.classList.add('activo');
        overlay.classList.remove('hidden');
        overlay.classList.add('active');
        giftCard.classList.add('dropIn');

        music.play();

        setTimeout(() => {
            const giftImg = document.querySelector('.gift-img');
            if (giftImg) giftImg.classList.add('visible');
        }, 2000);
    });

    // Al hacer click en la tarjeta para abrir/cerrar (girar)
    giftCard.addEventListener('click', () => {
        giftCard.classList.toggle('open');
        afterSoplar.classList.add("hidden");

    });

    // Al "soplar" la torta
    btnSoplar.addEventListener("click", () => {
        soundBlow.play();

        torta.classList.add("fade-out");
        btnSoplar.disabled = true;
        btnSoplar.innerText = "🥳 ¡Listo!";

        beforeSoplar.classList.add("hidden");
        afterSoplar.classList.remove("hidden");
        img.classList.remove("hidden");

        // Hacer el "flip" de la tarjeta con delay
        setTimeout(() => {
            giftCard.classList.remove("open");
            setTimeout(() => {
                giftCard.classList.add("open");
            }, 300);
        }, 600);

        // Cambiar gif a jpg después de 5 seg (si aplica)
        setTimeout(() => {
            const gif = document.querySelector('img[src="fondotarje.gif"]');
            if (gif) gif.src = 'fondotarje.jpg';
        }, 5000);
    });

    // --- Confetti code (sin cambios) ---
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    let W, H;
    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const confettiCount = 150;
    const confetti = [];

    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    class ConfettiParticle {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * -H;
            this.size = randomRange(5, 10);
            this.speed = randomRange(1, 3);
            this.angle = Math.random() * 2 * Math.PI;
            this.color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
            this.swing = randomRange(0.02, 0.05);
        }
        update() {
            this.y += this.speed;
            this.x += Math.sin(this.angle) * 2;
            this.angle += this.swing;
            if (this.y > H) {
                this.y = -this.size;
                this.x = Math.random() * W;
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.size, this.size * 0.4);
            ctx.fill();
        }
    }

    for (let i = 0; i < confettiCount; i++) {
        confetti.push(new ConfettiParticle());
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        confetti.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
});
