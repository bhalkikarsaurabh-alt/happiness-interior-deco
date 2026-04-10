/* ═══════════════════════════════════════════
   FOREVER-LUXE HOME™ — INTERACTIONS
═══════════════════════════════════════════ */

'use strict';

/* ── STICKY NAV ── */
const stickyNav       = document.getElementById('stickyNav');
const scrollIndicator = document.getElementById('scrollIndicator');
const heroSection     = document.getElementById('hero');

window.addEventListener('scroll', () => {
  const heroH = heroSection ? heroSection.offsetHeight : 600;
  if (window.scrollY > heroH * 0.6) {
    stickyNav.classList.add('visible');
  } else {
    stickyNav.classList.remove('visible');
  }
  if (window.scrollY > 100 && scrollIndicator) {
    scrollIndicator.classList.add('hidden');
  }
}, { passive: true });

/* ── MOBILE NAV ── */
const hamburger    = document.getElementById('hamburger');
const heroHamburger= document.getElementById('heroHamburger');
const mobileNav    = document.getElementById('mobileNav');

function openMobileNav() { mobileNav.classList.add('open'); document.body.style.overflow = 'hidden'; }
window.closeMobileNav = function() { mobileNav.classList.remove('open'); document.body.style.overflow = ''; };
if (hamburger)     hamburger.addEventListener('click', openMobileNav);
if (heroHamburger) heroHamburger.addEventListener('click', openMobileNav);

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ── PORTFOLIO DRAG SCROLL ── */
const gallery = document.getElementById('portfolioGallery');
if (gallery) {
  let isDragging = false, startX = 0, scrollLeft = 0;
  gallery.addEventListener('mousedown', e => {
    isDragging = true;
    gallery.classList.add('dragging');
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });
  document.addEventListener('mouseup',   () => { isDragging = false; gallery.classList.remove('dragging'); });
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x    = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1.5;
    gallery.scrollLeft = scrollLeft - walk;
  });
}

/* ── PORTFOLIO MODAL ── */
const modalData = [
  { img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85&fm=webp', title: 'The Sharma Residence', meta: '4BHK · Kalyani Nagar · Completed Q3 2024', quote: '"Every detail felt considered. Like it was always meant to be this way."' },
  { img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85&fm=webp', title: 'The Mehta Suite', meta: '3BHK · Koregaon Park · Completed Q1 2024', quote: '"We were in Singapore the whole time. Came home to perfection."' },
  { img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85&fm=webp', title: 'Arora Penthouse', meta: '4BHK · Baner · Completed Q4 2023', quote: '"The kitchen alone made us fall in love again."' },
  { img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85&fm=webp', title: 'The Kapoor Home', meta: '3BHK · Viman Nagar · Completed Q2 2024', quote: '"No stress. No surprises. Exactly on time."' },
  { img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85&fm=webp', title: 'Gupta Residency', meta: '2BHK · Aundh · Completed Q1 2025', quote: '"Feels like a 4BHK villa. Impossible, yet here we are."' },
];
const modalOverlay = document.getElementById('modalOverlay');
const modalImg     = document.getElementById('modalImg');
const modalTitle   = document.getElementById('modalTitle');
const modalMeta    = document.getElementById('modalMeta');
const modalQuote   = document.getElementById('modalQuote');

window.openModal = function(i) {
  const d = modalData[i];
  modalImg.src       = d.img;
  modalImg.alt       = d.title;
  modalTitle.textContent = d.title;
  modalMeta.textContent  = d.meta;
  modalQuote.textContent = d.quote;
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};
window.closeModal = function() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
};
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeExitPopup(); } });

/* ── BEFORE / AFTER SLIDER ── */
const baSlider  = document.getElementById('baSlider');
const baDivider = document.getElementById('baDivider');
if (baSlider && baDivider) {
  const baAfter = baSlider.querySelector('.ba-after');
  let active = false;

  function setPosition(x) {
    const rect  = baSlider.getBoundingClientRect();
    let   pos   = (x - rect.left) / rect.width;
    pos = Math.min(Math.max(pos, 0.04), 0.96);
    const pct = pos * 100;
    baDivider.style.left    = pct + '%';
    baAfter.style.clipPath  = `inset(0 ${100 - pct}% 0 0)`;
  }

  baSlider.addEventListener('mousedown',  e => { active = true; setPosition(e.clientX); });
  document.addEventListener('mouseup',    ()  => { active = false; });
  document.addEventListener('mousemove',  e => { if (active) setPosition(e.clientX); });
  baSlider.addEventListener('touchstart', e => { active = true; setPosition(e.touches[0].clientX); }, { passive: true });
  document.addEventListener('touchend',   ()  => { active = false; });
  document.addEventListener('touchmove',  e => { if (active) setPosition(e.touches[0].clientX); }, { passive: true });
}

/* ── TABS ── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById('tab-' + btn.dataset.tab);
    if (target) target.classList.add('active');
  });
});

/* ── FAQ ACCORDION ── */
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item   = q.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── BOOKING FORM ── */
window.handleSubmit = function(e) {
  e.preventDefault();
  const form    = document.getElementById('bookingForm');
  const success = document.getElementById('formSuccess');
  form.style.opacity    = '0';
  form.style.transition = 'opacity 0.3s';
  setTimeout(() => {
    form.style.display   = 'none';
    success.style.display = 'block';
    success.style.opacity = '0';
    requestAnimationFrame(() => {
      success.style.transition = 'opacity 0.4s';
      success.style.opacity    = '1';
    });
  }, 300);
  // Scroll to booking section to show success
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth', block: 'center' });
};

/* ── MOBILE BOTTOM BAR (hide when form visible) ── */
const mobileBar    = document.getElementById('mobileBottomBar');
const bookingForm  = document.getElementById('booking');
if (mobileBar && bookingForm) {
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) mobileBar.style.display = 'none';
      else mobileBar.style.display = '';
    });
  }, { threshold: 0.3 });
  barObserver.observe(bookingForm);
}

/* ── EXIT INTENT POPUP ── */
let exitShown = false;
window.closeExitPopup = function() {
  document.getElementById('exitPopup').classList.remove('active');
  document.body.style.overflow = '';
};
if (window.innerWidth > 768) {
  document.addEventListener('mouseleave', e => {
    if (e.clientY < 30 && !exitShown) {
      exitShown = true;
      setTimeout(() => {
        document.getElementById('exitPopup').classList.add('active');
      }, 300);
    }
  });
}

/* ── COUNTER ANIMATION FOR STATS ── */
function animateCounter(el, target, suffix, duration) {
  const isFloat = target % 1 !== 0;
  const start   = performance.now();
  function update(now) {
    const t   = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const val  = isFloat ? (target * ease).toFixed(1) : Math.round(target * ease);
    el.textContent = (suffix === '₹0' ? '₹' + val : val) + (suffix && suffix !== '₹0' ? suffix : '');
    if (t < 1) requestAnimationFrame(update);
    else el.textContent = suffix === '₹0' ? '₹0' : val + (suffix || '');
  }
  requestAnimationFrame(update);
}

const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      const nums = statsBar.querySelectorAll('.stat-number');
      const data = [
        { val: 85,  suffix: '',    duration: 1400 },
        { val: 0,   suffix: '₹0', duration: 800  },
        { val: 4.9, suffix: '',   duration: 1400 },
        { val: 4,   suffix: '',   duration: 1000 },
      ];
      nums.forEach((el, i) => {
        if (data[i]) animateCounter(el, data[i].val, data[i].suffix, data[i].duration);
      });
      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });
  statsObserver.observe(statsBar);
}

/* ── SMOOTH ANCHOR LINKS ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
