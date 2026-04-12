// KorPark - korpark.com
document.addEventListener('DOMContentLoaded', function() {

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active');
    });
  });

  // Navbar scroll effect
  var navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active nav link on scroll
  var sections = document.querySelectorAll('.section, .flow-section, .contact-section, .hero');
  var navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function() {
    var current = '';
    sections.forEach(function(section) {
      var sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(function(item) {
      item.classList.remove('active');
      if (item.getAttribute('href') === '#' + current) {
        item.classList.add('active');
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 64,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll reveal animation
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .zone-card, .package-card, .info-box, .flow-step, a.flow-step').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add revealed class styles
  var style = document.createElement('style');
  style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // ---- Counter Animation ----
  function animateCounter(el) {
    var target = el.getAttribute('data-count');
    if (!target) {
      var text = el.textContent.trim();
      if (/^\d+$/.test(text)) target = parseInt(text);
      else return;
    } else {
      target = parseInt(target);
    }
    var duration = 1500;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.hero-stat .number').forEach(function(el) {
    var text = el.textContent.trim();
    if (/^\d+$/.test(text)) {
      el.setAttribute('data-count', text);
      el.textContent = '0';
      counterObserver.observe(el);
    }
  });

  // ---- Gallery Lightbox ----
  var lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'lightbox-overlay';
  lightboxOverlay.innerHTML = '<div class="lightbox-content"><img src="" alt=""><button class="lightbox-close">&times;</button><button class="lightbox-prev">&#10094;</button><button class="lightbox-next">&#10095;</button></div>';
  document.body.appendChild(lightboxOverlay);

  var lightboxImg = lightboxOverlay.querySelector('img');
  var lightboxClose = lightboxOverlay.querySelector('.lightbox-close');
  var lightboxPrev = lightboxOverlay.querySelector('.lightbox-prev');
  var lightboxNext = lightboxOverlay.querySelector('.lightbox-next');
  var galleryImages = [];
  var currentIndex = 0;

  document.querySelectorAll('.photo-grid img, .photo-row img').forEach(function(img) {
    galleryImages.push(img.src);
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      currentIndex = galleryImages.indexOf(this.src);
      lightboxImg.src = this.src;
      lightboxOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', function(e) {
    if (e.target === lightboxOverlay) closeLightbox();
  });

  lightboxPrev.addEventListener('click', function(e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
  });

  lightboxNext.addEventListener('click', function(e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
  });

  document.addEventListener('keydown', function(e) {
    if (!lightboxOverlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });

  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});
