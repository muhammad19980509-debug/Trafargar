document.addEventListener('DOMContentLoaded', () => {
    // Navigation DOM Elements
    const burgerBtn = document.getElementById('burgerBtn');
    const closeBtn = document.getElementById('closeBtn');
    const navMenu = document.getElementById('navMenu');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const consultBtn = document.getElementById('consultBtn');

    // Drawer Open Function
    function openMenu() {
        navMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Drawer Close Function
    function closeMenu() {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners for Mobile Navigation
    if (burgerBtn) burgerBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Active state switcher and auto-close drawer on selection
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            closeMenu();
        });
    });

    // Escape key listener to close menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Interactive Ripple Click Effect for Button Fill
    consultBtn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        const diameter = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${diameter}px`;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Scroll bo'lganda elementlarni tekshiradigan IntersectionObserver
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Elementning 15% qismi ko'rinsa animatsiya ishga tushadi
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Elementlarni ketma-ketlikda mayin chiqarish uchun kechikish (delay)
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 100);

                // Bir marta chiqqandan so'ng kuzatishni to'xtatamiz
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // "Learn More" tugmasi uchun dynamic funksionallik
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    let expanded = false;

    learnMoreBtn.addEventListener('click', () => {
        expanded = !expanded;

        if (expanded) {
            learnMoreBtn.textContent = 'Show less';
            // Tugma bosilganda qo'shimcha xabar ko'rsatish
            alert("Barcha xizmatlar ko'rsatildi!");
        } else {
            learnMoreBtn.textContent = 'Learn more';
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {

    // 1. Анимации выезда элементов при прокрутке (Scroll Animation)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Элемент появляется, когда виден на 20%
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Отключаем наблюдение после первого появления
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));


    // 2. Интерактивная функциональность кнопок
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            alert("Вы переходите на страницу с подробной информацией о провайдерах!");
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Имитация скачивания файла или перехода на загрузку приложения
            alert("Загрузка приложения Trafalgar начата!");
        });
    }

});
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsWrapper = document.getElementById('dotsWrapper');

    let currentIndex = 0;
    let autoSlideInterval;

    // Dynamic nuqtalarni (dots) yaratish
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsWrapper.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Slaydni ko'rsatish funksiyasi
    function showSlide(index, direction = 'next') {
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev-exit');
            if (i === currentIndex) {
                slide.classList.add('prev-exit');
            }
        });

        dots.forEach(dot => dot.classList.remove('active'));

        currentIndex = index;

        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    // Keyingi slayd
    function nextSlide() {
        const newIndex = (currentIndex + 1) % slides.length;
        showSlide(newIndex, 'next');
    }

    // Oldingi slayd
    function prevSlide() {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(newIndex, 'prev');
    }

    // Muayyan slaydga o'tish
    function goToSlide(index) {
        if (index === currentIndex) return;
        showSlide(index);
        resetAutoSlide();
    }

    // Avto-slayder (5 soniyada almashinadi)
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event listenerlar
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Avto-slaydni boshlash
    startAutoSlide();
});
document.addEventListener('DOMContentLoaded', () => {

  // 1. Skroll qilinganda chapdan, o'ngdan va pastdan chiqib kelish animatsiyasi
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px', // Ekran pastiga 50px yetmasdan ishga tushadi
    threshold: 0.15
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // Bir marta chiqqandan keyin observerni o'chiramiz
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    scrollObserver.observe(element);
  });


  // 2. "View all" tugmasi bosilganda kartochkalar qo'shish funksionalligi
  const viewAllBtn = document.getElementById('viewAllBtn');
  const articlesGrid = document.querySelector('.articles-grid');

  // Qo'shimcha maqolalar ma'lumotlari
  const newArticles = [
    {
      img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
      alt: 'Vaccination process',
      title: 'Modern vaccination techniques and safety protocols',
      text: 'Exploring the newest advancements in safety during international vaccine deployment...'
    },
    {
      img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600',
      alt: 'Digital health',
      title: 'Telemedicine: The future of remote patient care',
      text: 'How online consultancies are reshaping general healthcare accessibility world-wide...'
    },
    {
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
      alt: 'Mental wellness',
      title: 'Mental wellbeing in the fast-paced modern day',
      text: 'Strategies to maintain balance and avoid burnout using everyday practical steps...'
    }
  ];

  let isExpanded = false;

  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      if (!isExpanded) {
        // Yangi kartochkalarni hosil qilish
        newArticles.forEach((article, index) => {
          const card = document.createElement('article');
          card.className = `article-card animate-on-scroll slide-bottom show`;
          card.style.transitionDelay = `${index * 0.15}s`; // Navbatma-navbat chiqishi uchun delay

          card.innerHTML = `
            <div class="card-image">
              <img src="${article.img}" alt="${article.alt}">
            </div>
            <div class="card-body">
              <h3 class="card-title">${article.title}</h3>
              <p class="card-text">${article.text}</p>
              <a href="#" class="read-more-link">
                <span>Read more</span>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6H15M15 6L10 1M15 6L10 11" stroke="#458FF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          `;

          articlesGrid.appendChild(card);
        });

        viewAllBtn.innerText = 'Show less';
        isExpanded = true;
      } else {
        // Qo'shilgan kartochkalarni qayta olib tashlash
        const addedCards = articlesGrid.querySelectorAll('.article-card:nth-child(n+4)');
        addedCards.forEach(card => card.remove());

        viewAllBtn.innerText = 'View all';
        isExpanded = false;

        // Sektsiya tepasiga ohista skroll qilish
        document.querySelector('.articles-section').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

});
document.addEventListener('DOMContentLoaded', () => {

  // 1. Skroll qilinganda chiqib keluvchi animatsiyalar (Intersection Observer)
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // Bir marta ko'ringach kuzatishni to'xtatish
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => scrollObserver.observe(el));


  // 2. Havolalarni bosganda ohista skroll yoki bosish hodisalarini kuzatish
  const footerLinks = document.querySelectorAll('.footer-links a');

  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Agar bo'sh '#' bo'lsa sahifa tepasiga ohista qaytarish
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  });

});