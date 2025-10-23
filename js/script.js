$(document).ready(function () {
    window.addEventListener("scroll", function () {
        const header = document.querySelector("header");
        header.classList.toggle("sticky", window.scrollY > 80);
    });

    var swiper = new Swiper(".swiper", {
        speed: 600,
        parallax: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // GSAP daxil edilibsə:
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.matchMedia("(max-width: 900px)").matches;

    // Başlıq animasiyası
    gsap.to(".workflow-title", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
            trigger: ".workflow",
            start: "top 80%"
        }
    });

    // Xətt animasiyası (horizontal və ya vertical)
    if (isMobile) {
        gsap.to(".workflow-line-inner", {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
                trigger: ".workflow-line",
                start: "top 80%",
                end: "bottom 20%",
                scrub: true
            }
        });
    } else {
        gsap.to(".workflow-line-inner", {
            scaleX: 1,
            ease: "true",
            scrollTrigger: {
                trigger: ".workflow-line",
                start: "top 80%",
                end: "bottom 80%",
                scrub: true
            }
        });
    }

    // Step-lərin ardıcıl görünməsi
    gsap.to(".workflow-step", {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.6,
        scrollTrigger: {
            trigger: ".workflow-line",
            start: "top 75%"
        }
    });
});

const wrapper = document.querySelector('.reviews-wrapper');

function randomizeAnimation() {
    const duration = 15 + Math.random() * 15; // 15–30 saniyə arası
    const direction = Math.random() > 0.5 ? 'normal' : 'reverse';
    // wrapper.style.animation = `scrollReviews ${duration}s linear infinite ${direction}`;
}

// Hər 20 saniyədə bir təsadüfi sürət və istiqamət dəyişsin
setInterval(randomizeAnimation, 20000);
randomizeAnimation();

(function () {
    const buttons = document.querySelectorAll('.randevu');
    const modal = document.getElementById('appointmentModal');
    const close = modal.querySelector('.eye-modal__close');
    const backdrop = modal.querySelector('.eye-modal__backdrop');
    const firstInput = modal.querySelector('input, textarea, button');

    function openModal() {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        // задержка для доступности: после рендера — фокус
        setTimeout(() => firstInput && firstInput.focus(), 50);
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Bütün .randevu düymələrinə event listener əlavə et
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    close.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });

    // Formun göndərilməsinin imitasiya hissəsi
    document.getElementById('eyeForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const button = this.querySelector('.eye-btn');
        const oldText = button.textContent;
        button.disabled = true;
        button.textContent = 'Отправка...';
        setTimeout(() => {
            button.textContent = 'Заявка отправлена ✓';
            setTimeout(() => {
                button.disabled = false;
                button.textContent = oldText;
                closeModal();
            }, 1200);
        }, 900);
    });
})();