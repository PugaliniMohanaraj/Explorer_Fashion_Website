'use strict';

const API_URL = 'http://localhost:5000/api/getData';
const GRID_ID = 'product-grid';

const DEFAULT_PRODUCTS = [
  // ── MEN ─────────────────────────────────────────
  {
    id: 'elegant-linen-blazer',
    name: 'Elegant Linen Blazer',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    category: 'men'
  },
  {
    id: 'tailored-chino-trousers',
    name: 'Tailored Chino Trousers',
    price: 4750,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80',
    category: 'men'
  },
  {
    id: 'classic-cotton-shirt',
    name: 'Classic Cotton Shirt',
    price: 3900,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
    category: 'men'
  },
  {
    id: 'denim-jacket-men',
    name: 'Denim Jacket',
    price: 6200,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80',
    category: 'men'
  },
  {
    id: 'formal-black-trousers',
    name: 'Formal Black Trousers',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80',
    category: 'men'
  },
  {
    id: 'navy-polo-shirt',
    name: 'Navy Polo Shirt',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&q=80',
    category: 'men'
  },
  {
    id: 'slim-fit-suit',
    name: 'Slim Fit Suit',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80',
    category: 'men'
  },
  {
    id: 'casual-henley-tee',
    name: 'Casual Henley Tee',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    category: 'men'
  },
  {
    id: 'bomber-jacket',
    name: 'Bomber Jacket',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&q=80',
    category: 'men'
  },
  {
    id: 'khaki-shorts',
    name: 'Khaki Cargo Shorts',
    price: 3100,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&q=80',
    category: 'men'
  },
  {
    id: 'leather-belt-men',
    name: 'Premium Leather Belt',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    category: 'men'
  },
  {
    id: 'wool-overcoat',
    name: 'Wool Overcoat',
    price: 14500,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80',
    category: 'men'
  },

  // ── WOMEN ───────────────────────────────────────
  {
    id: 'silk-evening-dress',
    name: 'Silk Evening Dress',
    price: 12200,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&q=80',
    category: 'women'
  },
  {
    id: 'floral-summer-dress',
    name: 'Floral Summer Dress',
    price: 5800,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80',
    category: 'women'
  },
  {
    id: 'elegant-maxi-skirt',
    name: 'Elegant Maxi Skirt',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=400&q=80',
    category: 'women'
  },
  {
    id: 'cashmere-cardigan',
    name: 'Cashmere Cardigan',
    price: 9800,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cead0e2?w=400&q=80',
    category: 'women'
  },
  {
    id: 'fitted-blazer-women',
    name: 'Fitted Blazer',
    price: 8900,
    image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=400&q=80',
    category: 'women'
  },
  {
    id: 'satin-blouse',
    name: 'Satin Blouse',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&q=80',
    category: 'women'
  },
  {
    id: 'high-waist-jeans',
    name: 'High Waist Jeans',
    price: 5200,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80',
    category: 'women'
  },
  {
    id: 'cocktail-dress',
    name: 'Cocktail Party Dress',
    price: 11500,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
    category: 'women'
  },
  {
    id: 'linen-wide-leg-pants',
    name: 'Linen Wide Leg Pants',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80',
    category: 'women'
  },
  {
    id: 'wrap-midi-dress',
    name: 'Wrap Midi Dress',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=400&q=80',
    category: 'women'
  },
  {
    id: 'cropped-denim-jacket',
    name: 'Cropped Denim Jacket',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&q=80',
    category: 'women'
  },
  {
    id: 'pleated-palazzo',
    name: 'Pleated Palazzo Pants',
    price: 4900,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80',
    category: 'women'
  },

  // ── KIDS ────────────────────────────────────────
  {
    id: 'casual-kids-set',
    name: 'Casual Kids Set',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80',
    category: 'kids'
  },
  {
    id: 'kids-denim-overalls',
    name: 'Kids Denim Overalls',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=80',
    category: 'kids'
  },
  {
    id: 'girls-party-dress',
    name: 'Girls Party Dress',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&q=80',
    category: 'kids'
  },
  {
    id: 'boys-polo-set',
    name: 'Boys Polo & Shorts Set',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&q=80',
    category: 'kids'
  },
  {
    id: 'kids-hoodie',
    name: 'Kids Pullover Hoodie',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&q=80',
    category: 'kids'
  },
  {
    id: 'girls-floral-skirt',
    name: 'Girls Floral Skirt',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&q=80',
    category: 'kids'
  },
  {
    id: 'boys-formal-suit',
    name: 'Boys Formal Suit',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&q=80',
    category: 'kids'
  },
  {
    id: 'kids-raincoat',
    name: 'Kids Colorful Raincoat',
    price: 2900,
    image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=400&q=80',
    category: 'kids'
  },
  {
    id: 'kids-jogger-set',
    name: 'Kids Jogger Set',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&q=80',
    category: 'kids'
  },
  {
    id: 'girls-summer-romper',
    name: 'Girls Summer Romper',
    price: 2600,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&q=80',
    category: 'kids'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById(GRID_ID);
  if (!grid) return;

  const filterButtons = document.querySelectorAll('.filter-bar__btn');

  fetchProducts();
  initFilters(filterButtons);

  async function fetchProducts() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const products = await response.json();
      if (products && products.length > 0) {
        const merged = [...products, ...DEFAULT_PRODUCTS];
        const unique = merged.filter((p, i, arr) => arr.findIndex(x => x.id === p.id || x.name === p.name) === i);
        renderProducts(unique);
      } else {
        renderProducts(DEFAULT_PRODUCTS);
      }
    } catch (error) {
      renderProducts(DEFAULT_PRODUCTS);
    }
  }

  function renderProducts(products) {
    if (!products || products.length === 0) {
      grid.innerHTML = `
        <div class="catalog__empty">
          <i class="fas fa-box-open"></i>
          <h3>No products available</h3>
          <p>New items are on the way. Stay tuned!</p>
        </div>`;
      return;
    }

    grid.innerHTML = products.map(product => {
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
