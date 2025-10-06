document.addEventListener('DOMContentLoaded', () => {

    // --- Contagem Regressiva ---
    const countDownDate = new Date("Oct 18, 2025 11:00:00").getTime();
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        if (distance < 0) {
            clearInterval(interval);
            const countdownEl = document.getElementById("countdown");
            if(countdownEl) countdownEl.innerHTML = "<h2>A festa já começou!</h2>";
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (daysEl && hoursEl && minutesEl && secondsEl) {
            daysEl.innerText = String(days).padStart(2, '0');
            hoursEl.innerText = String(hours).padStart(2, '0');
            minutesEl.innerText = String(minutes).padStart(2, '0');
            secondsEl.innerText = String(seconds).padStart(2, '0');
        }

    }, 1000);

    // --- LÓGICA DO BOTÃO DE SOM ---
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggleButton = document.getElementById('music-toggle');
    const soundOnIcon = document.querySelector('.icon-sound-on');
    const soundOffIcon = document.querySelector('.icon-sound-off');

    if (musicToggleButton) {
        // Tenta tocar a música na primeira interação do usuário com a página
        const playMusicOnFirstInteraction = () => {
            if (backgroundMusic && backgroundMusic.paused) {
                backgroundMusic.play().then(() => {
                    soundOnIcon.classList.remove('hidden');
                    soundOffIcon.classList.add('hidden');
                }).catch(error => {
                    console.log("Autoplay inicial bloqueado.");
                });
            }
            document.body.removeEventListener('click', playMusicOnFirstInteraction);
        };
        document.body.addEventListener('click', playMusicOnFirstInteraction);

        // Adiciona a funcionalidade de play/pause ao botão
        musicToggleButton.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                soundOnIcon.classList.remove('hidden');
                soundOffIcon.classList.add('hidden');
            } else {
                backgroundMusic.pause();
                soundOnIcon.classList.add('hidden');
                soundOffIcon.classList.remove('hidden');
            }
        });
    }

    // --- CARROSSEL DE FOTOS COM EFEITO FADE ---
    const photos = ['ana1.png', 'ana2.png', 'ana3.png'];
    let currentPhotoIndex = 0;
    
    const imageElement1 = document.getElementById('carousel-image-1');
    const imageElement2 = document.getElementById('carousel-image-2');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const counterElement = document.querySelector('.carousel-counter');

    let isImage1Active = true;
    let slideshowInterval;

    function updateCarousel(manual = false) {
        if (!imageElement1 || !counterElement) return;

        if (manual) {
            clearInterval(slideshowInterval);
        }

        counterElement.textContent = `${currentPhotoIndex + 1} / ${photos.length}`;
        
        if (isImage1Active) {
            imageElement2.src = photos[currentPhotoIndex];
            imageElement1.classList.remove('active');
            imageElement2.classList.add('active');
        } else {
            imageElement1.src = photos[currentPhotoIndex];
            imageElement2.classList.remove('active');
            imageElement1.classList.add('active');
        }
        isImage1Active = !isImage1Active;

        if (manual) {
            slideshowInterval = setInterval(autoAdvance, 5000);
        }
    }

    function autoAdvance() {
        currentPhotoIndex = (currentPhotoIndex < photos.length - 1) ? currentPhotoIndex + 1 : 0;
        updateCarousel();
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex > 0) ? currentPhotoIndex - 1 : photos.length - 1;
            updateCarousel(true);
        });

        nextButton.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex < photos.length - 1) ? currentPhotoIndex + 1 : 0;
            updateCarousel(true);
        });
    }

    updateCarousel();
    slideshowInterval = setInterval(autoAdvance, 5000);

    // --- Efeito de Brilho (Sparkle) no Clique ---
    const sparkleContainer = document.getElementById('sparkle-container');
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('.card') || e.target.closest('.music-toggle')) {
            return;
        }
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkleContainer.appendChild(sparkle);
        sparkle.style.left = `${e.clientX}px`;
        sparkle.style.top = `${e.clientY}px`;
        const size = Math.random() * 15 + 10;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.addEventListener('animationend', () => {
            sparkle.remove();
        });
    });
});