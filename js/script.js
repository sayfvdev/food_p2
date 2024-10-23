// modal
const dialog = document.querySelector('dialog')
const openBtn = document.querySelector('.btn_white')
const closeBtn = dialog.querySelector('.modal__close')

openBtn.onclick = () => {
    dialog.showModal()
}

closeBtn.onclick = () => {
    dialog.close()
}

// tabs
const tabs = document.querySelectorAll('.tabcontent');
const tabButtons = document.querySelectorAll('.tabheader__items .tabheader__item');

tabsShow(0);

function tabsShow(n) {
    tabs.forEach(tab => tab.classList.add('hide', 'fade'));
    tabs[n].classList.remove('hide');
}

tabButtons.forEach((btn, idx) => {
    btn.onclick = () => {
        tabButtons.forEach(btn => btn.classList.remove('tabheader__item_active'));
        btn.classList.add('tabheader__item_active');
        tabsShow(idx);
    };
});


// slides
const slides = document.querySelectorAll('.offer__slide');
const prev = document.querySelector('.offer__slider-prev');
const next = document.querySelector('.offer__slider-next');
const current = document.querySelector('#current');
const total = document.querySelector('#total');
let slideIndex = 0;
total.innerHTML = slides.length < 10 ? `0${slides.length}` : slides.length;

slideShow();

function slideShow(n) {
    if (n > slides.length - 1) {
        slideIndex = 0;
    }

    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    current.innerHTML = slideIndex + 1 < 10 ? `0${slideIndex + 1}` : slideIndex + 1;

    slides.forEach(slide => slide.classList.add('hide', 'fade'));
    slides[slideIndex].classList.remove('hide');
}

next.onclick = () => {
    slideShow(++slideIndex);
};

prev.onclick = () => {
    slideShow(--slideIndex);
};


// timer

const deadline = "2024-10-24 18:10";

function getRemainingTime(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date()),
        days = Math.floor((t / 1000) / 60 / 60 / 24),
        hours = Math.floor((t / 1000) / 60 / 60 % 24),
        minutes = Math.floor((t / 1000) / 60 % 60),
        seconds = Math.floor((t / 1000) % 60);

    return { t, days, hours, minutes, seconds };
}

function setTimer(endTime, selector) {
    const t = document.querySelector(selector),
        days = t.querySelector("#days"),
        hours = t.querySelector("#hours"),
        minutes = t.querySelector("#minutes"),
        seconds = t.querySelector("#seconds");

    const interval = setInterval(updateTime, 1000);

    function updateTime() {
        const t = getRemainingTime(endTime);

        days.innerHTML = String(t.days).padStart(2, '0');
        hours.innerHTML = String(t.hours).padStart(2, '0');
        minutes.innerHTML = String(t.minutes).padStart(2, '0');
        seconds.innerHTML = String(t.seconds).padStart(2, '0');

        if (t.t <= 0) {
            clearInterval(interval);
            startConfetti();
        }
    }
    updateTime();
}

function startConfetti() {
    let end = Date.now() + 15 * 1000;
    let colors = ['#54ed39', '#ff0000'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

setTimer(deadline, ".timer");








