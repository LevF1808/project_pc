/* Навигация и Мобильное Меню */
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const dropdowns = document.querySelectorAll(".dropdown");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");

            if (!navLinks.classList.contains("active")) {
                dropdowns.forEach(dropdown => dropdown.classList.remove("active"));
            }
        });

        document.addEventListener("click", (e) => {
            if (!e.target.closest(".navbar") && navLinks.classList.contains("active")) {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
                dropdowns.forEach(dropdown => dropdown.classList.remove("active"));
            }
        });
    }

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector("a");
        if (trigger) {
            trigger.addEventListener("click", (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdowns.forEach(other => {
                        if (other !== dropdown) other.classList.remove("active");
                    });
                    dropdown.classList.toggle("active");
                }
            });
        }
    });

    /* Переключатель Темы */
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        const themeIcon = themeBtn.querySelector('.theme-icon');

        function applyTheme() {
            if (localStorage.getItem('theme') === 'dark' ||
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark-theme');
                if (themeIcon) themeIcon.textContent = '☽';
            } else {
                document.documentElement.classList.remove('dark-theme');
                if (themeIcon) themeIcon.textContent = '☼';
            }
        }

        applyTheme();

        themeBtn.addEventListener("click", () => {
            document.documentElement.classList.toggle('dark-theme');
            const isDark = document.documentElement.classList.contains('dark-theme');
            if (themeIcon) themeIcon.textContent = isDark ? '☽' : '☼';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (!localStorage.getItem('theme')) applyTheme();
        });
    }

    /* Слайдер 1 (PC компоненты) */
    const slides = document.querySelectorAll(".slide");
    if (slides.length > 0) {
        let currentSlideIndex = 0;
        const nextBtn = document.querySelector(".next-btn");
        const prevBtn = document.querySelector(".prev-btn");

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove("active-slide"));
            if (index >= slides.length) currentSlideIndex = 0;
            else if (index < 0) currentSlideIndex = slides.length - 1;
            else currentSlideIndex = index;
            slides[currentSlideIndex].classList.add("active-slide");
        }

        if (nextBtn) nextBtn.addEventListener("click", () => showSlide(currentSlideIndex + 1));
        if (prevBtn) prevBtn.addEventListener("click", () => showSlide(currentSlideIndex - 1));
        showSlide(0);
    }

    /* Слайдер 2 (Компьютеры - Автоматический) */
    const slides_2 = document.querySelectorAll(".slide_2");
    if (slides_2.length > 0) {
        let currentSlideIndex_2 = 0;
        const nextBtn_2 = document.querySelector(".next-btn_2");
        const prevBtn_2 = document.querySelector(".prev-btn_2");
        let slideInterval_2;

        function showSlide_2(index) {
            slides_2.forEach(slide => slide.classList.remove("active-slide_2"));
            if (index >= slides_2.length) currentSlideIndex_2 = 0;
            else if (index < 0) currentSlideIndex_2 = slides_2.length - 1;
            else currentSlideIndex_2 = index;
            slides_2[currentSlideIndex_2].classList.add("active-slide_2");
        }

        function startAutoSlide_2() {
            slideInterval_2 = setInterval(() => showSlide_2(currentSlideIndex_2 + 1), 8000);
        }

        function stopAutoSlide_2() {
            clearInterval(slideInterval_2);
        }

        if (nextBtn_2) {
            nextBtn_2.addEventListener("click", () => {
                showSlide_2(currentSlideIndex_2 + 1);
                stopAutoSlide_2();
                startAutoSlide_2();
            });
        }

        if (prevBtn_2) {
            prevBtn_2.addEventListener("click", () => {
                showSlide_2(currentSlideIndex_2 - 1);
                stopAutoSlide_2();
                startAutoSlide_2();
            });
        }

        const sliderContainer_2 = document.querySelector(".slider-container_2");
        if (sliderContainer_2) {
            sliderContainer_2.addEventListener('mouseenter', stopAutoSlide_2);
            sliderContainer_2.addEventListener('mouseleave', startAutoSlide_2);
        }

        showSlide_2(0);
        startAutoSlide_2();
    }

    /* Кнопка "Наверх" */
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.style.display = window.pageYOffset > 50 ? 'flex' : 'none';
        });

        scrollTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    /* Прогресс-бар чтения */
    const progressBar = document.getElementById('progress');
    if (progressBar) {
        function updateProgress() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = (document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
        }
        window.addEventListener('scroll', updateProgress);
        window.addEventListener('touchmove', updateProgress);
    }

    /* Кнопки Подсказок */
    const hintButtons = document.querySelectorAll('.hint-btn');
    const hintContents = document.querySelectorAll('.hint-content');

    if (hintButtons.length > 0) {
        hintButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const content = hintContents[index];
                const isActive = content.classList.contains('active');

                if (isActive) {
                    content.classList.remove('active');
                    button.classList.remove('active');
                    button.textContent = '?';
                } else {
                    content.classList.add('active');
                    button.classList.add('active');
                    button.textContent = '✕';
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.hint-btn') && !e.target.closest('.hint-content')) {
                hintContents.forEach((content, index) => {
                    if (content.classList.contains('active')) {
                        content.classList.remove('active');
                        hintButtons[index].classList.remove('active');
                        hintButtons[index].textContent = '?';
                    }
                });
            }
        });
    }

    /* Информационные блоки (Аккордеон) */
    const infoSections = document.querySelectorAll('.info');
    if (infoSections.length > 0) {
        infoSections.forEach(section => {
            section.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('opened');
            });
        });

        document.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('nav')) return;
            infoSections.forEach(section => section.classList.remove('opened'));
        });

        function handleAnchor() {
            const hash = window.location.hash;
            if (hash && hash !== '#') {
                try {
                    const target = document.querySelector(hash);
                    if (target && target.classList.contains('info')) {
                        infoSections.forEach(s => s.classList.remove('opened'));
                        target.classList.add('opened');
                        target.classList.remove('target-flash');
                        void target.offsetWidth;
                        target.classList.add('target-flash');
                        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } catch (e) { console.log(e); }
            }
        }

        window.addEventListener('hashchange', handleAnchor);
        if (window.location.hash) {
            history.replaceState("", document.title, window.location.pathname + window.location.search);
            window.scrollTo(0, 0);
        }
    }

    /* Фильтр сокетов в форме */
    const brendSelect = document.getElementById('brend');
    const soketSelect = document.getElementById('soket');
    if (brendSelect && soketSelect) {
        const allSockets = Array.from(soketSelect.options);

        function filterSockets() {
            const selectedBrend = brendSelect.value;
            soketSelect.innerHTML = '';
            allSockets.forEach(option => {
                const val = parseInt(option.value);
                if (selectedBrend === '1' && [1, 2, 3].includes(val)) soketSelect.appendChild(option);
                else if (selectedBrend === '2' && [4, 5].includes(val)) soketSelect.appendChild(option);
            });
        }

        brendSelect.addEventListener('change', filterSockets);
        filterSockets();
    }

    /* Авто-скролл к результату */
    const resultArea = document.getElementById('result_area');
    if (resultArea) {
        resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Инициализация ленты Тьюринга при загрузке
    if (document.getElementById('main-tape')) {
        renderTape();
    }
});

/* Симулятор Машины Тьюринга */
let tape = ["B", "1", "0", "1", "0", "1", "B"];
let headIndex = 1;

window.renderTape = function() {
    const track = document.getElementById('main-tape');
    if (!track) return;
    track.innerHTML = '';

    tape.forEach((val, idx) => {
        const cell = document.createElement('div');
        cell.className = 'cell' + (idx === headIndex ? ' active' : '');
        cell.innerText = val;
        track.appendChild(cell);
    });

    const offset = (headIndex * 50) - (track.parentElement.offsetWidth / 2) + 25;
    track.style.transform = `translateX(${-offset}px)`;
    document.getElementById('read-char').innerText = tape[headIndex];
};

window.runTuringStep = function() {
    if (headIndex >= tape.length - 1) {
        document.getElementById('action-text').innerText = "Готово (HALT)";
        document.getElementById('st-val').innerText = "Стоп";
        return;
    }

    const currentVal = tape[headIndex];
    if (currentVal === "1") {
        tape[headIndex] = "0";
        document.getElementById('action-text').innerText = "Меняю 1 на 0 и иду вправо";
    } else if (currentVal === "0") {
        tape[headIndex] = "1";
        document.getElementById('action-text').innerText = "Меняю 0 на 1 и иду вправо";
    }

    headIndex++;
    document.getElementById('st-val').innerText = "Работа...";
    renderTape();
};

window.resetTuring = function() {
    tape = ["B", "1", "0", "1", "0", "1", "B"];
    headIndex = 1;
    document.getElementById('action-text').innerText = "Жду запуска";
    document.getElementById('st-val').innerText = "Начало";
    renderTape();
};

/* Симулятор Квантового Бита */
let cBitState = 0;
let qState = 'superposition';
let probabilityOfOne = 0.5;

window.flipClassicBit = function() {
    cBitState = cBitState === 0 ? 1 : 0;
    const visual = document.getElementById('c-bit-visual');
    const container = visual.parentElement;

    visual.innerText = cBitState;
    container.className = cBitState === 0 ? 'bit-0' : 'bit-1';
    document.getElementById('c-log').innerText = `Состояние: ${cBitState}`;
};

window.rotateQubit = function() {
    const qWrapper = document.getElementById('q-wrapper');
    const qVisual = document.getElementById('q-bit-visual');
    const qLog = document.getElementById('q-log');
    const probFill = document.getElementById('prob-fill');

    qState = 'superposition';
    qWrapper.className = 'qubit-superposition';
    qVisual.innerText = '?';
    qVisual.style.filter = 'blur(1px)';

    probabilityOfOne = Math.random();
    const percent = Math.round(probabilityOfOne * 100);
    probFill.style.width = `${percent}%`;

    qLog.innerText = `Вращение... P(|1⟩) = ${percent}%`;
};

window.measureQubit = function() {
    if (qState !== 'superposition') {
        rotateQubit();
        setTimeout(performMeasurement, 300);
    } else {
        performMeasurement();
    }
};

function performMeasurement() {
    const qWrapper = document.getElementById('q-wrapper');
    const qVisual = document.getElementById('q-bit-visual');
    const qLog = document.getElementById('q-log');

    const randomVal = Math.random();
    const measuredValue = randomVal < probabilityOfOne ? 1 : 0;

    qState = 'measured';
    qWrapper.className = measuredValue === 1 ? 'qubit-measured-1' : 'qubit-measured-0';
    qVisual.innerText = measuredValue;
    qVisual.style.filter = 'none';

    qLog.innerText = `Измерено: |${measuredValue}⟩ (Коллапс)`;
}

/* Открытие изображений на весь экран */
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".photo_basic");

    images.forEach(img => {
        img.style.cursor = "pointer";
        img.addEventListener("click", function() {
            const overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
            overlay.style.zIndex = "9999";
            overlay.style.display = "flex";
            overlay.style.alignItems = "center";
            overlay.style.justifyContent = "center";
            overlay.style.cursor = "zoom-out";

            const fullImg = document.createElement("img");
            fullImg.src = this.src;
            fullImg.style.maxWidth = "90%";
            fullImg.style.maxHeight = "90%";
            fullImg.style.objectFit = "contain";
            fullImg.style.borderRadius = "5px";
            fullImg.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.3)";

            overlay.appendChild(fullImg);
            document.body.appendChild(overlay);

            overlay.addEventListener("click", function() {
                document.body.removeChild(overlay);
            });

            document.addEventListener("keydown", function(e) {
                if (e.key === "Escape" && document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
            });
        });
    });
});