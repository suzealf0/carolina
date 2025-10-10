document.addEventListener('DOMContentLoaded', () => {
    const ransomEffect = () => {
        const elements = document.querySelectorAll('.ransom-effect');
        const styleClasses = ['s1', 's2', 's3', 's4', 's5', 's6'];
        elements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            let classIndex = Math.floor(Math.random() * styleClasses.length);
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char === ' ') { element.innerHTML += ' '; }
                else {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.className = styleClasses[classIndex];
                    element.appendChild(span);
                    let nextClassIndex = Math.floor(Math.random() * styleClasses.length);
                    while (nextClassIndex === classIndex) {
                        nextClassIndex = Math.floor(Math.random() * styleClasses.length);
                    }
                    classIndex = nextClassIndex;
                }
            }
        });
    };
    ransomEffect();

    const countDownDate = new Date("Oct 18, 2025 18:30:00").getTime();
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        if (distance < 0) {
            clearInterval(interval);
            document.getElementById("countdown").innerHTML = "<h2>A festa já começou!</h2>";
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }, 1000);

    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggleButton = document.getElementById('music-toggle');
    const soundOnIcon = document.querySelector('.icon-sound-on');
    const soundOffIcon = document.querySelector('.icon-sound-off');
    if (musicToggleButton) {
        const playMusicOnFirstInteraction = () => {
            if (backgroundMusic && backgroundMusic.paused) {
                backgroundMusic.play().then(() => {
                    soundOnIcon.classList.remove('hidden');
                    soundOffIcon.classList.add('hidden');
                }).catch(error => { console.log("Autoplay bloqueado."); });
            }
            document.body.removeEventListener('click', playMusicOnFirstInteraction);
        };
        document.body.addEventListener('click', playMusicOnFirstInteraction);
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
        if (manual) clearInterval(slideshowInterval);
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
        if (manual) slideshowInterval = setInterval(autoAdvance, 5000);
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
    if (photos.length > 0 && imageElement1) {
        updateCarousel();
        slideshowInterval = setInterval(autoAdvance, 5000);
    }
});