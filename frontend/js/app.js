/* Explorer Merchandise - Main Application Script */

// --- AUTH GUARD SYSTEM ---
// Homepage is free to browse. All other actions require login.
(function () {
  'use strict';

  var isLoggedIn = !!(localStorage.getItem('token') || sessionStorage.getItem('adminAuth'));
  var isHomePage = window.location.pathname === '/' ||
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname.endsWith('/');
  var isLoginPage = window.location.pathname.endsWith('login.html');
  var isRegisterPage = window.location.pathname.endsWith('register.html');

  window.isUserLoggedIn = function () {
    return !!(localStorage.getItem('token') || sessionStorage.getItem('adminAuth'));
  };

  window.requireAuth = function (action) {
    if (window.isUserLoggedIn()) return true;

    if (window.showToast) {
      window.showToast('Please login to ' + (action || 'continue'), 'error');
    }
    sessionStorage.setItem('redirectAfterLogin', window.location.href);
    setTimeout(function () {
      window.location.href = 'login.html';
    }, 1200);
    return false;
  };

  // Protected pages: redirect to login if not authenticated
  var protectedPages = ['checkout.html', 'favourites.html', 'contact.html', 'admin.html'];
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  if (protectedPages.indexOf(currentPage) > -1 && !window.isUserLoggedIn()) {
    sessionStorage.setItem('redirectAfterLogin', window.location.href);
    window.location.href = 'login.html';
  }
})();

(function () {
  'use strict';

  // --- NAVBAR SCROLL EFFECT ---
  const navbar = document.querySelector('.navbar') || document.querySelector('.header');
  if (navbar) {
    function handleScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --- MOBILE MENU TOGGLE ---
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    navMenu.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });

    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // --- DROPDOWN HANDLING ---
  const dropdowns = document.querySelectorAll('.nav__item--dropdown');
  dropdowns.forEach(function (dropdown) {
    const link = dropdown.querySelector('.nav__link--dropdown');
    const menu = dropdown.querySelector('.nav__dropdown');
    if (link && menu) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        dropdown.classList.toggle('open');
        link.setAttribute('aria-expanded', dropdown.classList.contains('open'));
      });
    }
  });

  // --- CART BADGE ---
  function updateCartBadge() {
    var badges = document.querySelectorAll('.cart-badge');
    var cart = [];
    try { cart = JSON.parse(localStorage.getItem('cart')) || []; } catch (e) {}
    var count = cart.reduce(function (sum, item) { return sum + (item.quantity || 1); }, 0);
    badges.forEach(function (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }
  updateCartBadge();
  window.addEventListener('cart-updated', updateCartBadge);

  // --- SCROLL ANIMATIONS ---
  var animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    animatedElements.forEach(function (el) { observer.observe(el); });
  }

  // --- TOAST NOTIFICATIONS ---
  window.showToast = function (message, type) {
    type = type || 'success';
    var toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    toast.innerHTML = '<span class="toast__message">' + message + '</span><button class="toast__close">&times;</button>';
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('toast--visible'); });
    toast.querySelector('.toast__close').addEventListener('click', function () { removeToast(toast); });
    setTimeout(function () { removeToast(toast); }, 3500);
  };

  function removeToast(toast) {
    toast.classList.remove('toast--visible');
    setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
  }

  // --- SMOOTH SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- NEWSLETTER FORM ---
  var newsletterForm = document.querySelector('.newsletter__form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = this.querySelector('input[type="email"]');
      if (input && input.value) {
        window.showToast('Thank you for subscribing!', 'success');
        input.value = '';
      }
    });
  }

  // --- SEARCH OVERLAY ---
  // Create search overlay dynamically
  var searchBtn = document.querySelector('.nav__search-btn') || document.querySelector('[aria-label="Search"]');
  if (searchBtn) {
    var searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.innerHTML = '<div class="search-overlay__container">'
      + '<button class="search-overlay__close" aria-label="Close search"><i class="fas fa-times"></i></button>'
      + '<h2 class="search-overlay__title">What are you looking for?</h2>'
      + '<form class="search-overlay__form" id="search-form">'
      + '<div class="search-overlay__input-wrap">'
      + '<i class="fas fa-magnifying-glass"></i>'
      + '<input type="text" class="search-overlay__input" id="search-input" placeholder="Search products, categories..." autocomplete="off">'
      + '</div>'
      + '</form>'
      + '<div class="search-overlay__suggestions">'
      + '<span>Popular:</span>'
      + '<a href="product.html">Quick Clothing</a>'
      + '<a href="product01.html">Custom Tailoring</a>'
      + '<a href="about.html">About Us</a>'
      + '</div>'
      + '</div>';
    document.body.appendChild(searchOverlay);

    searchBtn.addEventListener('click', function (e) {
      e.preventDefault();
      searchOverlay.classList.add('active');
      setTimeout(function () { document.getElementById('search-input').focus(); }, 100);
    });

    searchOverlay.querySelector('.search-overlay__close').addEventListener('click', function () {
      searchOverlay.classList.remove('active');
    });

    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) searchOverlay.classList.remove('active');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
      }
    });

    var searchForm = document.getElementById('search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var query = document.getElementById('search-input').value.trim().toLowerCase();
        if (!query) return;
        if (query.includes('tailoring') || query.includes('sewing') || query.includes('custom')) {
          window.location.href = 'product01.html';
        } else {
          window.location.href = 'product.html';
        }
      });
    }
  }

  // --- BACK TO TOP ---
  var backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- CONTACT FORM ---
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      window.showToast('Message sent! We\'ll get back to you soon.', 'success');
      this.reset();
    });
  }

  // --- HOMEPAGE ADD TO CART (static featured products) ---
  var addCartButtons = document.querySelectorAll('.js-add-cart');
  addCartButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      handleAddToCart(this);
    });
  });

  function handleAddToCart(btn) {
    // Auth guard: require login to add to cart
    if (!window.requireAuth('add items to cart')) return;

    var card = btn.closest('.product-card') || btn.closest('article');
    if (!card) return;

    var nameEl = card.querySelector('.product-card__name') || card.querySelector('h3');
    var priceEl = card.querySelector('.product-card__price') || card.querySelector('p');
    var imgEl = card.querySelector('img');

    var productName = nameEl ? nameEl.textContent.trim() : 'Product';
    var priceText = priceEl ? priceEl.textContent : '0';
    var priceVal = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
    var imgSrc = imgEl ? imgEl.src : '';

    var product = {
      id: btn.dataset.product || productName.toLowerCase().replace(/\s+/g, '-'),
      name: productName,
      price: priceVal,
      image: imgSrc,
      quantity: 1
    };

    var cart = [];
    try { cart = JSON.parse(localStorage.getItem('cart')) || []; } catch (ex) {}
    var existing = cart.findIndex(function (item) { return item.id === product.id; });
    if (existing > -1) {
      cart[existing].quantity += 1;
    } else {
      cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated'));

    var originalText = btn.textContent;
    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
    btn.style.background = '#2ecc71';
    btn.style.color = '#fff';
    btn.style.borderColor = '#2ecc71';
    setTimeout(function () {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 1500);

    window.showToast(product.name + ' added to cart!', 'success');
  }
})();

// Fallback: event delegation for add-to-cart (catches dynamically rendered buttons too)
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.js-add-cart');
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();

  // Auth guard: require login to add to cart
  if (!window.requireAuth('add items to cart')) return;

  var card = btn.closest('.product-card') || btn.closest('article');
  if (!card) return;

  var nameEl = card.querySelector('.product-card__name') || card.querySelector('h3');
  var priceEl = card.querySelector('.product-card__price') || card.querySelector('p');
  var imgEl = card.querySelector('img');

  var productName = nameEl ? nameEl.textContent.trim() : 'Product';
  var priceText = priceEl ? priceEl.textContent : '0';
  var priceVal = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
  var imgSrc = imgEl ? imgEl.src : '';

  var product = {
    id: btn.dataset.product || productName.toLowerCase().replace(/\s+/g, '-'),
    name: productName,
    price: priceVal,
    image: imgSrc,
    quantity: 1
  };

  var cart = [];
  try { cart = JSON.parse(localStorage.getItem('cart')) || []; } catch (ex) {}
  var existing = cart.findIndex(function (item) { return item.id === product.id; });
  if (existing > -1) {
    cart[existing].quantity += 1;
  } else {
    cart.push(product);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cart-updated'));

  var originalText = btn.textContent;
  btn.innerHTML = '<i class="fas fa-check"></i> Added!';
  btn.style.background = '#2ecc71';
  btn.style.color = '#fff';
  btn.style.borderColor = '#2ecc71';
  setTimeout(function () {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.style.color = '';
    btn.style.borderColor = '';
  }, 1500);

  if (window.showToast) {
    window.showToast(product.name + ' added to cart!', 'success');
  }
});

/* ========================================
   ENHANCED FEATURES
   ======================================== */

// --- PRELOADER ---
(function () {
  var preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.innerHTML = '<div class="preloader__spinner"></div>';
  document.body.prepend(preloader);

  window.addEventListener('load', function () {
    setTimeout(function () {
      preloader.classList.add('hidden');
      setTimeout(function () { preloader.remove(); }, 500);
    }, 400);
  });
})();

// --- SCROLL PROGRESS BAR ---
(function () {
  var progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  }, { passive: true });
})();

// --- DARK MODE TOGGLE ---
(function () {
  var toggle = document.createElement('button');
  toggle.className = 'dark-mode-toggle';
  toggle.setAttribute('aria-label', 'Toggle dark mode');
  toggle.innerHTML = '<i class="fas fa-moon"></i>';
  document.body.appendChild(toggle);

  var isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark-mode');
    toggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  toggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    var dark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', dark);
    toggle.innerHTML = dark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });
})();

// --- FLOATING WHATSAPP BUTTON ---
(function () {
  var whatsapp = document.createElement('a');
  whatsapp.className = 'whatsapp-float';
  whatsapp.href = 'https://wa.me/94765857882';
  whatsapp.target = '_blank';
  whatsapp.rel = 'noopener noreferrer';
  whatsapp.setAttribute('aria-label', 'Chat on WhatsApp');
  whatsapp.innerHTML = '<i class="fab fa-whatsapp"></i>';
  document.body.appendChild(whatsapp);
})();

// --- ANNOUNCEMENT BAR ---
(function () {
  var header = document.querySelector('.header') || document.querySelector('header');
  if (!header || document.querySelector('.announcement-bar')) return;

  var bar = document.createElement('div');
  bar.className = 'announcement-bar';
  bar.innerHTML = '<div class="announcement-bar__content">'
    + '<span class="announcement-bar__item"><i class="fas fa-truck"></i> Free Shipping on Orders Over LKR 5,000</span>'
    + '<span class="announcement-bar__item"><i class="fas fa-tag"></i> Use Code EXPLORE10 for 10% Off</span>'
    + '<span class="announcement-bar__item"><i class="fas fa-scissors"></i> Custom Tailoring Available</span>'
    + '<span class="announcement-bar__item"><i class="fas fa-redo"></i> Easy Returns Within 7 Days</span>'
    + '<span class="announcement-bar__item"><i class="fas fa-truck"></i> Free Shipping on Orders Over LKR 5,000</span>'
    + '<span class="announcement-bar__item"><i class="fas fa-tag"></i> Use Code EXPLORE10 for 10% Off</span>'
    + '<span class="announcement-bar__item"><i class="fas fa-scissors"></i> Custom Tailoring Available</span>'
    + '<span class="announcement-bar__item"><i class="fas fa-redo"></i> Easy Returns Within 7 Days</span>'
    + '</div>';
  header.parentNode.insertBefore(bar, header);
})();

// --- PARALLAX HERO EFFECT ---
(function () {
  var hero = document.querySelector('.hero__background img') || document.querySelector('.hero__image');
  if (!hero) return;

  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY;
    if (scrolled < 800) {
      hero.style.transform = 'translateY(' + (scrolled * 0.3) + 'px) scale(1.1)';
    }
  }, { passive: true });
})();

// --- QUICK VIEW MODAL ---
(function () {
  var modal = document.createElement('div');
  modal.className = 'quick-view-modal';
  modal.innerHTML = '<div class="quick-view__content" style="position:relative;">'
    + '<button class="quick-view__close"><i class="fas fa-times"></i></button>'
    + '<div class="quick-view__image"><img src="" alt=""></div>'
    + '<div class="quick-view__details">'
    + '<h2 class="quick-view__name"></h2>'
    + '<p class="quick-view__price"></p>'
    + '<p class="quick-view__desc">Premium quality fashion item from Explorer Merchandise. Crafted with attention to detail and made from the finest materials for lasting comfort and style.</p>'
    + '<div class="quick-view__actions">'
    + '<button class="btn btn--primary quick-view__add-cart"><i class="fas fa-shopping-cart"></i> Add to Cart</button>'
    + '<button class="btn btn--outline quick-view__add-fav"><i class="far fa-heart"></i> Favourite</button>'
    + '</div></div></div>';
  document.body.appendChild(modal);

  var currentProduct = null;

  modal.querySelector('.quick-view__close').addEventListener('click', function () {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.classList.remove('active');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') modal.classList.remove('active');
  });

  modal.querySelector('.quick-view__add-cart').addEventListener('click', function () {
    if (!currentProduct) return;
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var existing = cart.findIndex(function (item) { return item.id === currentProduct.id; });
    if (existing > -1) { cart[existing].quantity += 1; }
    else { cart.push({ id: currentProduct.id, name: currentProduct.name, price: currentProduct.price, image: currentProduct.image, quantity: 1 }); }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated'));
    if (window.showToast) window.showToast(currentProduct.name + ' added to cart!', 'success');
    modal.classList.remove('active');
  });

  modal.querySelector('.quick-view__add-fav').addEventListener('click', function () {
    if (!currentProduct) return;
    var favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    var exists = favourites.findIndex(function (f) { return f.id === currentProduct.id; });
    if (exists === -1) {
      favourites.push(currentProduct);
      localStorage.setItem('favourites', JSON.stringify(favourites));
      if (window.showToast) window.showToast(currentProduct.name + ' added to favourites!', 'success');
    } else {
      if (window.showToast) window.showToast('Already in favourites', 'info');
    }
    modal.classList.remove('active');
  });

  window.openQuickView = function (product) {
    currentProduct = product;
    modal.querySelector('.quick-view__name').textContent = product.name;
    modal.querySelector('.quick-view__price').textContent = 'LKR ' + Number(product.price).toLocaleString() + '.00';
    modal.querySelector('.quick-view__image img').src = product.image;
    modal.querySelector('.quick-view__image img').alt = product.name;
    modal.classList.add('active');
  };

  document.addEventListener('dblclick', function (e) {
    var card = e.target.closest('.product-card');
    if (!card) return;
    var name = card.querySelector('.product-card__name');
    var price = card.querySelector('.product-card__price');
    var img = card.querySelector('img');
    if (!name) return;

    var priceVal = price ? parseFloat(price.textContent.replace(/[^0-9.]/g, '')) : 0;
    window.openQuickView({
      id: name.textContent.toLowerCase().replace(/\s+/g, '-'),
      name: name.textContent,
      price: priceVal,
      image: img ? img.src : ''
    });
  });
})();

// --- ANIMATED NUMBER COUNTERS ---
(function () {
  var counters = document.querySelectorAll('.stat-counter, [data-count]');
  if (counters.length === 0) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.dataset.count || el.textContent, 10);
      if (isNaN(target)) return;

      var duration = 2000;
      var start = 0;
      var startTime = null;

      function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(animate);
        else el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
      }
      requestAnimationFrame(animate);
      el.classList.add('animated');
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { observer.observe(el); });
})();

// --- SMOOTH REVEAL ANIMATIONS FOR SECTIONS ---
(function () {
  var sections = document.querySelectorAll('.section, section');
  if (!sections.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  sections.forEach(function (sec) {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(30px)';
    sec.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(sec);
  });
})();
