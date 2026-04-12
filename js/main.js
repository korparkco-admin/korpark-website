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

  // ---- Scroll Progress Bar ----
  var progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', function() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';
    });
  }

  // ---- Image Slider ----
  document.querySelectorAll('.slider-container').forEach(function(slider) {
    var track = slider.querySelector('.slider-track');
    var images = track.querySelectorAll('img');
    var prevBtn = slider.querySelector('.slider-prev');
    var nextBtn = slider.querySelector('.slider-next');
    var dotsContainer = slider.querySelector('.slider-dots');
    var currentSlide = 0;
    var total = images.length;
    var autoPlayTimer;

    // Create dots
    for (var i = 0; i < total; i++) {
      var dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('data-index', i);
      dot.addEventListener('click', function() {
        goToSlide(parseInt(this.getAttribute('data-index')));
      });
      dotsContainer.appendChild(dot);
    }

    function goToSlide(index) {
      currentSlide = index;
      track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
      var dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach(function(d, i) {
        d.classList.toggle('active', i === currentSlide);
      });
    }

    prevBtn.addEventListener('click', function() {
      goToSlide((currentSlide - 1 + total) % total);
      resetAutoPlay();
    });

    nextBtn.addEventListener('click', function() {
      goToSlide((currentSlide + 1) % total);
      resetAutoPlay();
    });

    function resetAutoPlay() {
      clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(function() {
        goToSlide((currentSlide + 1) % total);
      }, 4000);
    }

    // Auto play
    autoPlayTimer = setInterval(function() {
      goToSlide((currentSlide + 1) % total);
    }, 4000);

    // Touch swipe support
    var startX = 0;
    track.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; });
    track.addEventListener('touchend', function(e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextBtn.click();
        else prevBtn.click();
      }
    });
  });
});

// ========== 거금도 트레킹 지도 ==========
function initTrekMap() {
  var mapEl = document.getElementById('trekMap');
  if (!mapEl || mapEl._leaflet_id) return;

  var map = L.map('trekMap', { center: [34.393, 127.080], zoom: 12 });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  var trailCoords = [
    [34.4060, 127.0808],[34.4080, 127.0700],[34.4080, 127.0625],
    [34.4050, 127.0550],[34.4000, 127.0500],[34.3950, 127.0490],
    [34.3900, 127.0550],[34.3880, 127.0700],[34.3925, 127.0852],
    [34.3850, 127.1020],[34.3920, 127.1050],[34.4020, 127.1050],
    [34.4060, 127.0950],[34.4060, 127.0808]
  ];
  L.polyline(trailCoords, { color: '#4a9ab4', weight: 4, opacity: 0.85 }).addTo(map);

  var colorMap = { camp:'#f59e0b', photo:'#ef4444', rest:'#10b981', spot:'#4a9ab4', summit:'#8b5cf6' };
  var points = [
    { lat:34.4060, lng:127.0808, label:'🏕', type:'camp',   title:'코리아파크 (출발)', desc:'금산면 돈청길 25-17' },
    { lat:34.4080, lng:127.0625, label:'①',  type:'photo',  title:'거금대교 전망',     desc:'일몰 포토스폿' },
    { lat:34.3920, lng:127.1050, label:'②',  type:'spot',   title:'신흥항',            desc:'드론 낚시 체험 포인트' },
    { lat:34.3850, lng:127.1020, label:'③',  type:'rest',   title:'익금해수욕장',      desc:'여름 해수욕 · 서핑' },
    { lat:34.4020, lng:127.1050, label:'④',  type:'spot',   title:'풍남항',            desc:'낚시 챌린지 포인트' },
    { lat:34.3925, lng:127.0852, label:'⛰', type:'summit', title:'적대봉 정상 592m',  desc:'제주도 조망 · 왕복 4시간' }
  ];

  points.forEach(function(p) {
    var icon = L.divIcon({
      className: '',
      html: '<div style="background:' + colorMap[p.type] + ';color:white;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,.3);border:2px solid white;">' + p.label + '</div>',
      iconSize: [34, 34], iconAnchor: [17, 17]
    });
    L.marker([p.lat, p.lng], { icon: icon }).addTo(map)
      .bindPopup('<b>' + p.title + '</b><br><small>' + p.desc + '</small>');
  });

  document.querySelectorAll('.trek-point').forEach(function(el) {
    el.addEventListener('click', function() {
      document.querySelectorAll('.trek-point').forEach(function(e) { e.classList.remove('active'); });
      el.classList.add('active');
      map.flyTo([parseFloat(el.dataset.lat), parseFloat(el.dataset.lng)], 15, { duration: 1.2 });
    });
  });
}

var _trekObserver = new IntersectionObserver(function(entries) {
  if (entries[0].isIntersecting) {
    initTrekMap();
    _trekObserver.disconnect();
  }
}, { threshold: 0.1 });

var _trekMapEl = document.getElementById('trekMap');
if (_trekMapEl) _trekObserver.observe(_trekMapEl);
// ========================================
