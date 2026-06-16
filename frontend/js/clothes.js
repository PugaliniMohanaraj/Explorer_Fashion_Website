'use strict';

const API_URL = 'http://localhost:5000/api/getClothes';
const GRID_ID = 'clothes-grid';

const DEFAULT_CLOTHES = [
  // ── SAREES ──────────────────────────────────────
  {
    id: 'silk-bridal-saree',
    name: 'Silk Bridal Saree',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80',
    category: 'sarees'
  },
  {
    id: 'cotton-handloom-saree',
    name: 'Cotton Handloom Saree',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80',
    category: 'sarees'
  },
  {
    id: 'georgette-party-saree',
    name: 'Georgette Party Saree',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&q=80',
    category: 'sarees'
  },
  {
    id: 'banarasi-silk-saree',
    name: 'Banarasi Silk Saree',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=400&q=80',
    category: 'sarees'
  },
  {
    id: 'chiffon-casual-saree',
    name: 'Chiffon Casual Saree',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1583391733981-8b530c4a0456?w=400&q=80',
    category: 'sarees'
  },
  {
    id: 'embroidered-net-saree',
    name: 'Embroidered Net Saree',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1609748340878-e457650b4ada?w=400&q=80',
    category: 'sarees'
  },

  // ── FROCKS / DRESSES ────────────────────────────
  {
    id: 'custom-wedding-gown',
    name: 'Custom Wedding Gown',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
    category: 'frocks'
  },
  {
    id: 'bridesmaid-frock',
    name: 'Bridesmaid Frock',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&q=80',
    category: 'frocks'
  },
  {
    id: 'anarkali-frock',
    name: 'Anarkali Frock',
    price: 9800,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
    category: 'frocks'
  },
  {
    id: 'kids-birthday-frock',
    name: 'Kids Birthday Frock',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&q=80',
    category: 'frocks'
  },
  {
    id: 'flared-party-frock',
    name: 'Flared Party Frock',
    price: 8200,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80',
    category: 'frocks'
  },
  {
    id: 'layered-gown',
    name: 'Layered Evening Gown',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80',
    category: 'frocks'
  },

  // ── SHIRTS / FORMAL ─────────────────────────────
  {
    id: 'custom-formal-shirt',
    name: 'Custom Formal Shirt',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
    category: 'shirts'
  },
  {
    id: 'linen-casual-shirt',
    name: 'Linen Casual Shirt',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80',
    category: 'shirts'
  },
  {
    id: 'silk-party-shirt',
    name: 'Silk Party Shirt',
    price: 6200,
    image: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400&q=80',
    category: 'shirts'
  },
  {
    id: 'mandarin-collar-shirt',
    name: 'Mandarin Collar Shirt',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=400&q=80',
    category: 'shirts'
  },
  {
    id: 'printed-hawaiian-shirt',
    name: 'Printed Hawaiian Shirt',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=400&q=80',
    category: 'shirts'
  },
  {
    id: 'oxford-button-down',
    name: 'Oxford Button-Down',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=400&q=80',
    category: 'shirts'
  },

  // ── SUITS / JEANS ───────────────────────────────
  {
    id: 'bespoke-wedding-suit',
    name: 'Bespoke Wedding Suit',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80',
    category: 'suits'
  },
  {
    id: 'three-piece-suit',
    name: 'Three-Piece Business Suit',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80',
    category: 'suits'
  },
  {
    id: 'custom-tailored-jeans',
    name: 'Custom Tailored Jeans',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&q=80',
    category: 'suits'
  },
  {
    id: 'formal-tuxedo',
    name: 'Formal Tuxedo',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&q=80',
    category: 'suits'
  },
  {
    id: 'linen-summer-suit',
    name: 'Linen Summer Suit',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&q=80',
    category: 'suits'
  },
  {
    id: 'casual-blazer-set',
    name: 'Casual Blazer Set',
    price: 14500,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    category: 'suits'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById(GRID_ID);
  if (!grid) return;

  const filterButtons = document.querySelectorAll('.filter-bar__btn');

  fetchClothes();
  initFilters(filterButtons);

  async function fetchClothes() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const clothes = await response.json();
      if (clothes && clothes.length > 0) {
        const merged = [...clothes, ...DEFAULT_CLOTHES];
        const unique = merged.filter((p, i, arr) => arr.findIndex(x => x.id === p.id || x.name === p.name) === i);
        renderClothes(unique);
      } else {
        renderClothes(DEFAULT_CLOTHES);
      }
    } catch (error) {
      renderClothes(DEFAULT_CLOTHES);
    }
  }

  function renderClothes(clothes) {
    if (!clothes || clothes.length === 0) {
      grid.innerHTML = `
        <div class="catalog__empty">
          <i class="fas fa-scissors"></i>
          <h3>No items available</h3>
          <p>New tailoring options are on the way. Stay tuned!</p>
        </div>`;
      return;
    }

    grid.innerHTML = clothes.map(product => {
      const category = (product.category || 'all').toLowerCase();
      const name = product.name || product.Items || 'Product';
      const price = product.price || product.Price || 0;
      const image = product.image || product.Image || product.Img || product.img || '';
      const id = product.id || product.Id || name.toLowerCase().replace(/\s+/g, '-');

      const productData = JSON.stringify({ id, name, price, image }).replace(/"/g, '&quot;');

      return `
        <div class="product-card" data-category="${category}">
          <div class="product-card__image-wrapper">
            <img src="${image}" alt="${name}" class="product-card__image" loading="lazy" />
            <button class="product-card__wishlist" aria-label="Add to wishlist">
              <i class="far fa-heart"></i>
            </button>
          </div>
          <div class="product-card__info">
            <h3 class="product-card__name">${name}</h3>
            <p class="product-card__price">LKR ${Number(price).toLocaleString()}.00</p>
            <button class="product-card__cart btn btn--primary js-add-cart" data-product='${productData}'>
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
        </div>`;
    }).join('');

    initCartButtons();
    initWishlistButtons();
  }

  function initFilters(buttons) {
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('filter-bar__btn--active'));
        btn.classList.add('filter-bar__btn--active');

        const filter = btn.dataset.filter;
        const cards = grid.querySelectorAll('.product-card');

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('product-card--hidden');
          } else {
            card.classList.add('product-card--hidden');
          }
        });
      });
    });
  }

  function initCartButtons() {
    grid.querySelectorAll('.product-card__cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const productData = JSON.parse(e.currentTarget.dataset.product);
        addToCart(productData, e.currentTarget);
      });
    });
  }

  function initWishlistButtons() {
    grid.querySelectorAll('.product-card__wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (window.requireAuth && !window.requireAuth('add to favourites')) return;

        const icon = btn.querySelector('i');
        const card = btn.closest('.product-card');
        const name = card.querySelector('.product-card__name')?.textContent || 'Product';
        const priceText = card.querySelector('.product-card__price')?.textContent || '0';
        const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
        const image = card.querySelector('img')?.src || '';
        const id = name.toLowerCase().replace(/\s+/g, '-');

        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        const exists = favourites.findIndex(f => f.id === id);

        if (exists > -1) {
          favourites.splice(exists, 1);
          icon.classList.remove('fas');
          icon.classList.add('far');
          btn.style.color = '';
          if (window.showToast) window.showToast('Removed from favourites', 'info');
        } else {
          favourites.push({ id, name, price, image });
          icon.classList.remove('far');
          icon.classList.add('fas');
          btn.style.color = '#e74c3c';
          if (window.showToast) window.showToast(name + ' added to favourites!', 'success');
        }

        localStorage.setItem('favourites', JSON.stringify(favourites));
      });
    });
  }

  function addToCart(product, btn) {
    if (window.requireAuth && !window.requireAuth('add items to cart')) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated'));

    if (btn) {
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Added!';
      btn.style.background = '#2ecc71';
      btn.style.borderColor = '#2ecc71';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 1500);
    }

    if (window.showToast) {
      window.showToast(product.name + ' added to cart!', 'success');
    } else {
      const toast = document.getElementById('toast');
      if (toast) {
        toast.textContent = product.name + ' added to cart!';
        toast.classList.add('toast--visible');
        setTimeout(() => toast.classList.remove('toast--visible'), 2500);
      }
    }
  }
});
