// ===== Mobile Navigation =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

if (navbar) {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Status Badge Update =====
function updateStatusBadge() {
  const statusBadge = document.querySelector('.status-badge');
  if (!statusBadge) return;

  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeInMinutes = hour * 60 + minute;

  let isOpen = false;

  // Monday - Friday: 9:30 AM - 7:00 PM
  if (day >= 1 && day <= 5) {
    isOpen = timeInMinutes >= 570 && timeInMinutes < 1140; // 9:30*60=570, 19:00*60=1140
  }
  // Saturday: 9:00 AM - 6:00 PM
  else if (day === 6) {
    isOpen = timeInMinutes >= 540 && timeInMinutes < 1080; // 9:00*60=540, 18:00*60=1080
  }
  // Sunday: 10:00 AM - 5:00 PM
  else if (day === 0) {
    isOpen = timeInMinutes >= 600 && timeInMinutes < 1020; // 10:00*60=600, 17:00*60=1020
  }

  if (isOpen) {
    statusBadge.textContent = 'Open Now';
    statusBadge.classList.remove('status-closed');
    statusBadge.classList.add('status-open');
  } else {
    statusBadge.textContent = 'Currently Closed';
    statusBadge.classList.remove('status-open');
    statusBadge.classList.add('status-closed');
  }
}

// Update status on load and every minute
updateStatusBadge();
setInterval(updateStatusBadge, 60000);

// ===== Intersection Observer for Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.service-card, .testimonial-card, .gallery-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== Active Navigation Link =====
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll('.nav-links a:not(.btn)');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinksList.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.style.color = 'var(--color-primary)';
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });

// ===== Header for Vite =====
console.log('Umi Nails & Spa website loaded successfully!');
