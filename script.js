const header = document.querySelector('.site-header');
const year = document.getElementById('year');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const reveals = document.querySelectorAll('.reveal');
const portfolioCards = document.querySelectorAll('.portfolio-card');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const closeButton = document.querySelector('.lightbox-close');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach((block) => observer.observe(block));

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    portfolioCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.style.display = matches ? 'block' : 'none';
    });
  });
});

portfolioCards.forEach((card) => {
  card.addEventListener('click', () => {
    const image = card.querySelector('img');
    if (lightbox && lightboxImage && image) {
      lightboxImage.src = image.src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});

if (closeButton && lightbox) {
  closeButton.addEventListener('click', () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  });
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

const stats = document.querySelectorAll('.stat-figure');
const animateCounters = () => {
  stats.forEach((stat) => {
    const target = Number(stat.dataset.target || 0);
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = target * progress;
      let displayValue;

      if (target === 4) {
        displayValue = '4.0';
      } else if (Number.isInteger(target)) {
        displayValue = Math.round(value).toString();
      } else {
        displayValue = value.toFixed(1);
      }

      stat.textContent = displayValue;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  });
};

window.addEventListener('load', animateCounters);
