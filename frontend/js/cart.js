(function () {
  'use strict';

  const CART_KEY = 'cart';
  const SHIPPING_STANDARD = 100;
  const SHIPPING_EXPRESS = 350;
  const FREE_SHIPPING_MIN = 5000;

  let currentStep = 1;
  let shippingCost = SHIPPING_STANDARD;
  let discount = 0;
  let shippingData = {};

  const steps = document.querySelectorAll('.checkout-step');
  const progressSteps = document.querySelectorAll('.progress-step');
  const progressLines = document.querySelectorAll('.progress-step__line');

  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated'));
  }

  function formatPrice(amount) {
    return 'LKR ' + Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function goToStep(step) {
    currentStep = step;
    steps.forEach(function (s) { s.classList.remove('active'); });
    document.getElementById(getStepId(step)).classList.add('active');

    progressSteps.forEach(function (ps, i) {
      ps.classList.remove('active', 'completed');
      if (i + 1 === step) ps.classList.add('active');
      else if (i + 1 < step) ps.classList.add('completed');
    });

    progressLines.forEach(function (line, i) {
      line.classList.toggle('active', i < step - 1);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function getStepId(step) {
    var ids = { 1: 'step-cart', 2: 'step-shipping', 3: 'step-payment', 4: 'step-confirm' };
    return ids[step];
  }

  // --- STEP 1: CART ---
  function renderCart() {
    var cart = getCart();
    var cartItems = document.getElementById('cart-items');
    var cartCount = document.getElementById('cart-count');
    var proceedBtn = document.getElementById('proceed-to-shipping');

    if (!cart.length) {
      cartCount.textContent = '';
      if (proceedBtn) proceedBtn.disabled = true;
      cartItems.innerHTML = '<div class="empty-cart">'
        + '<i class="fas fa-shopping-bag"></i>'
        + '<h2>Your cart is empty</h2>'
        + '<p>Discover our latest collections and find something you love.</p>'
        + '<a href="product.html" class="continue-btn"><i class="fas fa-arrow-left"></i> Browse Products</a>'
        + '</div>';
      document.querySelector('.checkout-sidebar').style.display = 'none';
      return;
    }

    document.querySelector('.checkout-sidebar').style.display = '';
    cartCount.textContent = cart.length + ' item' + (cart.length > 1 ? 's' : '');
    if (proceedBtn) proceedBtn.disabled = false;

    var html = '';
    cart.forEach(function (item, i) {
      var qty = item.quantity || 1;
      var price = Number(item.price) || 0;
      var lineTotal = price * qty;
      var img = item.img || item.image || 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=200';
      var name = item.items || item.name || 'Product';

      html += '<div class="cart-item" data-index="' + i + '">'
        + '<img class="cart-item__img" src="' + img + '" alt="' + name + '" onerror="this.src=\'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=200\'">'
        + '<div class="cart-item__details">'
        + '<span class="cart-item__name">' + name + '</span>'
        + '<span class="cart-item__price">' + formatPrice(price) + '</span>'
        + '<span class="cart-item__meta">In Stock</span>'
        + '</div>'
        + '<div class="cart-item__actions">'
        + '<div class="qty-control">'
        + '<button class="qty-btn" data-action="dec" data-index="' + i + '">−</button>'
        + '<span class="qty-value">' + qty + '</span>'
        + '<button class="qty-btn" data-action="inc" data-index="' + i + '">+</button>'
        + '</div>'
        + '<span class="cart-item__total">' + formatPrice(lineTotal) + '</span>'
        + '<button class="cart-item__remove" data-index="' + i + '"><i class="fas fa-trash"></i> Remove</button>'
        + '</div>'
        + '</div>';
    });

    cartItems.innerHTML = html;
    updateTotals();
    bindCartEvents();
  }

  function updateTotals() {
    var cart = getCart();
    var subtotal = 0;
    cart.forEach(function (item) {
      subtotal += (Number(item.price) || 0) * (item.quantity || 1);
    });

    if (subtotal >= FREE_SHIPPING_MIN) shippingCost = 0;

    var total = subtotal - discount + shippingCost;

    var subtotalEl = document.getElementById('summary-subtotal');
    var shippingEl = document.getElementById('summary-shipping');
    var totalEl = document.getElementById('summary-total');
    var discountLine = document.getElementById('discount-line');
    var discountEl = document.getElementById('summary-discount');
    var sidebarTotal = document.getElementById('sidebar-total');
    var payAmount = document.getElementById('pay-amount');

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) {
      shippingEl.textContent = shippingCost === 0 ? 'FREE' : formatPrice(shippingCost);
      shippingEl.classList.toggle('free', shippingCost === 0);
    }
    if (discount > 0 && discountLine) {
      discountLine.style.display = '';
      discountEl.textContent = '-' + formatPrice(discount);
    }
    if (totalEl) totalEl.textContent = formatPrice(total);
    if (sidebarTotal) sidebarTotal.textContent = formatPrice(total);
    if (payAmount) payAmount.textContent = formatPrice(total);

    renderSidebarItems();
  }

  function renderSidebarItems() {
    var cart = getCart();
    var containers = document.querySelectorAll('.sidebar-items');
    var html = '';
    cart.forEach(function (item) {
      var img = item.img || item.image || 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=100';
      var name = item.items || item.name || 'Product';
      var qty = item.quantity || 1;
      var price = Number(item.price) || 0;
      html += '<div class="sidebar-item">'
        + '<img class="sidebar-item__img" src="' + img + '" alt="' + name + '" onerror="this.style.background=\'var(--gray-200)\'">'
        + '<div class="sidebar-item__info"><span class="sidebar-item__name">' + name + '</span><span class="sidebar-item__qty">Qty: ' + qty + '</span></div>'
        + '<span class="sidebar-item__price">' + formatPrice(price * qty) + '</span>'
        + '</div>';
    });
    containers.forEach(function (c) { c.innerHTML = html; });
  }

  function bindCartEvents() {
    document.querySelectorAll('.qty-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var index = parseInt(this.dataset.index);
        var action = this.dataset.action;
        var cart = getCart();
        if (!cart[index]) return;
        if (action === 'inc') {
          cart[index].quantity = (cart[index].quantity || 1) + 1;
        } else {
          var curr = cart[index].quantity || 1;
          if (curr <= 1) cart.splice(index, 1);
          else cart[index].quantity = curr - 1;
        }
        saveCart(cart);
        renderCart();
      });
    });

    document.querySelectorAll('.cart-item__remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var index = parseInt(this.dataset.index);
        var cart = getCart();
        var item = this.closest('.cart-item');
        item.style.transform = 'translateX(100%)';
        item.style.opacity = '0';
        setTimeout(function () {
          cart.splice(index, 1);
          saveCart(cart);
          renderCart();
        }, 300);
      });
    });
  }

  // Proceed to shipping
  var proceedBtn = document.getElementById('proceed-to-shipping');
  if (proceedBtn) {
    proceedBtn.addEventListener('click', function () {
      if (getCart().length) goToStep(2);
    });
  }

  // Promo code
  var promoBtn = document.getElementById('promo-btn');
  if (promoBtn) {
    promoBtn.addEventListener('click', function () {
      var code = document.getElementById('promo-input').value.trim().toUpperCase();
      if (code === 'EXPLORE10') {
        var cart = getCart();
        var subtotal = 0;
        cart.forEach(function (item) { subtotal += (Number(item.price) || 0) * (item.quantity || 1); });
        discount = Math.round(subtotal * 0.1);
        updateTotals();
        if (window.showToast) window.showToast('Promo applied! 10% off', 'success');
      } else if (code === 'FREESHIP') {
        shippingCost = 0;
        updateTotals();
        if (window.showToast) window.showToast('Free shipping applied!', 'success');
      } else {
        if (window.showToast) window.showToast('Invalid promo code', 'error');
      }
    });
  }

  // --- STEP 2: SHIPPING ---
  var backToCart = document.getElementById('back-to-cart');
  if (backToCart) backToCart.addEventListener('click', function () { goToStep(1); });

  var shippingForm = document.getElementById('shipping-form');
  if (shippingForm) {
    shippingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      shippingData = {
        firstName: document.getElementById('ship-fname').value,
        lastName: document.getElementById('ship-lname').value,
        email: document.getElementById('ship-email').value,
        phone: document.getElementById('ship-phone').value,
        address: document.getElementById('ship-address').value,
        city: document.getElementById('ship-city').value,
        postal: document.getElementById('ship-postal').value,
        country: document.getElementById('ship-country').value
      };

      var method = document.querySelector('input[name="shipping-method"]:checked').value;
      if (method === 'express') shippingCost = SHIPPING_EXPRESS;
      else if (method === 'free') shippingCost = 0;
      else shippingCost = SHIPPING_STANDARD;

      updateTotals();
      renderPaymentSummary();
      goToStep(3);
    });
  }

  // Shipping option highlight
  document.querySelectorAll('.shipping-option').forEach(function (opt) {
    opt.addEventListener('click', function () {
      document.querySelectorAll('.shipping-option').forEach(function (o) { o.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  // --- STEP 3: PAYMENT ---
  var backToShipping = document.getElementById('back-to-shipping');
  if (backToShipping) backToShipping.addEventListener('click', function () { goToStep(2); });

  // Payment method switching
  document.querySelectorAll('.payment-option').forEach(function (opt) {
    opt.addEventListener('click', function () {
      document.querySelectorAll('.payment-option').forEach(function (o) { o.classList.remove('active'); });
      this.classList.add('active');
      var method = this.querySelector('input').value;
      document.getElementById('card-fields').style.display = method === 'card' ? '' : 'none';
      document.getElementById('card-preview').style.display = method === 'card' ? '' : 'none';
      document.getElementById('cod-info').style.display = method === 'cod' ? '' : 'none';
      document.getElementById('bank-info').style.display = method === 'bank' ? '' : 'none';

      var cardInputs = document.querySelectorAll('#card-fields input');
      cardInputs.forEach(function (inp) { inp.required = (method === 'card'); });
    });
  });

  // Card number formatting + live preview
  var cardNumberInput = document.getElementById('card-number');
  var cardNameInput = document.getElementById('card-name');
  var cardExpiryInput = document.getElementById('card-expiry');

  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function () {
      var val = this.value.replace(/\D/g, '').substring(0, 16);
      var formatted = val.replace(/(\d{4})/g, '$1 ').trim();
      this.value = formatted;
      document.getElementById('preview-number').textContent = formatted || '•••• •••• •••• ••••';

      var brand = document.getElementById('preview-brand');
      if (val.startsWith('4')) brand.innerHTML = '<i class="fab fa-cc-visa"></i>';
      else if (val.startsWith('5')) brand.innerHTML = '<i class="fab fa-cc-mastercard"></i>';
      else if (val.startsWith('3')) brand.innerHTML = '<i class="fab fa-cc-amex"></i>';
      else brand.innerHTML = '<i class="fab fa-cc-visa"></i>';
    });
  }

  if (cardNameInput) {
    cardNameInput.addEventListener('input', function () {
      document.getElementById('preview-name').textContent = this.value.toUpperCase() || 'YOUR NAME';
    });
  }

  if (cardExpiryInput) {
    cardExpiryInput.addEventListener('input', function () {
      var val = this.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2);
      this.value = val;
      document.getElementById('preview-expiry').textContent = val || 'MM/YY';
    });
  }

  function renderPaymentSummary() {
    var container = document.getElementById('payment-summary-details');
    if (!container) return;
    var cart = getCart();
    var subtotal = 0;
    cart.forEach(function (item) { subtotal += (Number(item.price) || 0) * (item.quantity || 1); });
    var total = subtotal - discount + shippingCost;

    container.innerHTML = '<div class="summary-line"><span>Subtotal</span><span>' + formatPrice(subtotal) + '</span></div>'
      + '<div class="summary-line"><span>Shipping</span><span>' + (shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)) + '</span></div>'
      + (discount > 0 ? '<div class="summary-line"><span>Discount</span><span class="discount-value">-' + formatPrice(discount) + '</span></div>' : '')
      + '<div class="summary-divider"></div>'
      + '<div class="summary-line summary-total"><span>Total</span><span>' + formatPrice(total) + '</span></div>';
  }

  // Payment form submit
  var paymentForm = document.getElementById('payment-form');
  if (paymentForm) {
    paymentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var payBtn = document.getElementById('pay-btn');
      payBtn.disabled = true;
      payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

      var cart = getCart();
      var orderData = {
        email_1: shippingData.email,
        phone_1: shippingData.phone,
        city_1: shippingData.city,
        address_1: shippingData.address
      };

      setTimeout(function () {
        fetch((typeof API_BASE !== 'undefined' ? API_BASE : 'http://localhost:5000/api') + '/orderdata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        }).catch(function () {});

        localStorage.removeItem(CART_KEY);
        window.dispatchEvent(new CustomEvent('cart-updated'));
        showConfirmation();
        goToStep(4);
      }, 2000);
    });
  }

  function showConfirmation() {
    var details = document.getElementById('confirmation-details');
    if (!details) return;
    var orderId = 'EXM-' + Date.now().toString(36).toUpperCase();
    details.innerHTML = '<h4>Order ID: #' + orderId + '</h4>'
      + '<p><strong>Ship to:</strong> ' + shippingData.firstName + ' ' + shippingData.lastName + '</p>'
      + '<p><strong>Email:</strong> ' + shippingData.email + '</p>'
      + '<p><strong>Phone:</strong> ' + shippingData.phone + '</p>'
      + '<p><strong>Address:</strong> ' + shippingData.address + ', ' + shippingData.city + '</p>'
      + '<p style="margin-top:16px; color: #2D6A4F; font-weight: 600;"><i class="fas fa-check-circle"></i> A confirmation email has been sent to your inbox.</p>';
  }

  // Init
  renderCart();
  goToStep(1);
})();
