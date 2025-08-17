const cursor = document.getElementById("icecream-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;

  createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");

  const size = Math.random() * 8 + 6;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;

  // More dynamic offset for realism
  const offsetX = Math.random() * 20 - 10;
  const offsetY = Math.random() * 10 + 25;

  sparkle.style.left = `${x + offsetX}px`;
  sparkle.style.top = `${y + offsetY}px`;

  // Vibrant sparkle color
  const hue = Math.floor(Math.random() * 360);
  sparkle.style.background = `radial-gradient(circle, hsl(${hue}, 100%, 85%) 0%, transparent 70%)`;
  sparkle.style.boxShadow = `0 0 10px hsl(${hue}, 100%, 70%)`;

  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1400);
}


const canvas = document.getElementById("sprinkleCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const sprinkleColors = ["#ffc1cc", "#fceabb", "#d1c4e9", "#f8bbd0", "#b2ebf2", "#c8e6c9"];
const frostColor = "rgba(255, 255, 255, 0.8)";
const sprinkleCount = 100;
const frostCount = 60;
const accumulation = [];

class Particle {
  constructor(isFrost = false) {
    this.isFrost = isFrost;
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * canvas.width;
    this.y = initial ? Math.random() * canvas.height : -10;
    this.radius = this.isFrost ? 1 + Math.random() * 1.2 : 2 + Math.random() * 2;
    this.color = this.isFrost ? frostColor : sprinkleColors[Math.floor(Math.random() * sprinkleColors.length)];
    this.vx = (Math.random() - 0.5) * (this.isFrost ? 0.3 : 0.6);
    this.vy = this.isFrost ? 0.5 + Math.random() * 0.5 : 0.8 + Math.random() * 1.5;
    this.opacity = 1;
    this.fade = false;
  }

  update() {
    if (this.fade) {
      this.opacity -= 0.01;
      if (this.opacity <= 0) this.reset();
      return;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Accumulate if at bottom
    if (this.y > canvas.height - this.radius - 2) {
      accumulation.push({ x: this.x, y: canvas.height - this.radius - 2, radius: this.radius, color: this.color, ttl: 300 });
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

const particles = [
  ...Array.from({ length: sprinkleCount }, () => new Particle(false)),
  ...Array.from({ length: frostCount }, () => new Particle(true))
];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw and update particles
  for (let p of particles) {
    p.update();
    p.draw();
  }

  // Draw and fade accumulation layer
  for (let i = accumulation.length - 1; i >= 0; i--) {
    const a = accumulation[i];
    ctx.beginPath();
    ctx.globalAlpha = a.ttl / 300;
    ctx.fillStyle = a.color;
    ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    a.ttl -= 1;
    if (a.ttl <= 0) accumulation.splice(i, 1); // remove faded ones
  }

  requestAnimationFrame(animate);
}

animate();



// Ice Cream Flavors Data
const flavors = [
    {
        id: 1,
        name: "Mango Icecream ",
        description: "A refreshing and creamy ice cream bursting with the sweet, tropical taste of ripe mangoes",
        price: 60,
        category: "classic",
        image: "https://sandhyahariharan.co.uk/wp-content/uploads/2018/05/mango-ice-cream-1-of-3-min-500x500.jpg",
        popular: true,
        gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    },
    {
        id: 2,
        name: "Rasamalai",
        description: "A rich and delicate Indian dessert made of soft, spongy cheese balls soaked in fragrant saffron and cardamom-infused sweetened milk",
        price: 350,
        category: "premium",
        image: "https://palatesdesire.com/wp-content/uploads/2022/09/Rasmalai-recipe@palates-desire-500x500.jpg",
        popular: true,
        gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    },
    {
        id: 3,
        name: "Vanilla Dream",
        description: "Classic Madagascar vanilla with real vanilla bean specks and a touch of cream",
        price: 150,
        category: "classic",
        image: "https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=400",
        popular:false,
        gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    },
    {
        id: 4,
        name: "Vanilla Cone",
        description: "A classic crispy cone filled with smooth, creamy vanilla ice cream for a timeless treat",
        price: 90,
        category: "classic",
        image: "https://www.chocolatemoosey.com/wp-content/uploads/2015/08/Caramel-Waffle-Cone-Ice-Cream-7998.jpg",
        popular: false,
        gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    },
     {
        id: 5,
        name: "Chocolate Cone",
        description: "A crunchy cone filled with rich, creamy chocolate ice cream for a decadent delight",
        price: 90,
        category: "classic",
        image: "https://media.istockphoto.com/id/487960671/photo/homemade-dark-chocolate-ice-cream-cone.jpg?s=612x612&w=0&k=20&c=gx_PFLq0yc4Jdey1AVOVzWAtqZ5SnzGIVkTs57T0g5o=",
        popular: true,
        gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    },
    {
        id: 6,
        name: "Butterscotch Cone",
        description: "A crispy cone filled with smooth butterscotch ice cream, swirled with caramel and crunchy bits for a sweet, nutty treat",
        price: 90,
        category: "classic",
        image: "https://www.cookwithmanali.com/wp-content/uploads/2014/11/Indian-Butterscotch-Ice-Cream-No-Churn.jpg",
        popular: false,
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    },
    {
        id: 7,
        name: "Strawberry Cone",
        description: "A crunchy cone filled with creamy strawberry ice cream, bursting with fruity sweetness and a refreshing flavor",
        price: 90,
        category: "classic",
        image: "https://i.pinimg.com/736x/2f/39/3e/2f393e1fbbfa247a533d411a3254a01c.jpg",
        popular: false,
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    },
    {
        id: 8,
        name: "Black Current",
        description: "A creamy delight infused with the bold, tangy flavor of blackcurrants, offering a perfect balance of sweet and tart",
        price: 180,
        category: "premium",
        image: "https://content.jdmagicbox.com/quickquotes/images_main/black-currant-ice-cream-jar-802298016-9t7e612q.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit",
        popular: true,
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    },
    {
        id: 9,
        name: "Choclate Ice Cream Shakes",
        description: "A rich and creamy chocolate milkshake made with velvety chocolate ice cream, blended to perfection for a cool, indulgent treat",
        price: 110,
        category: "classic",
        image: "https://www.queensleeappetit.com/wp-content/uploads/2018/09/Brownie-Milkshake.jpg",
        popular: false,
        gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)"
    },
    {
        id: 10,
        name: "Vanilla Ice Cream Shakes",
        description: "A smooth and creamy vanilla ice cream shake, blended to perfection for a classic, cool, and refreshing treat",
        price:110,
        category: "classic",
        image: "https://www.allrecipes.com/thmb/uzxCGTc-5WCUZnZ7BUcYcmWKxjo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-48974-vanilla-milkshake-hero-4x3-c815295c714f41f6b17b104e7403a53b.jpg",
        popular: true,
        gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)"
    },
    {
        id: 11,
        name: "Strawberry Ice Cream Shakes",
        description: "A rich and fruity shake made with creamy strawberry ice cream, offering a refreshing burst of sweet berry flavor",
        price: 110,
        category: "classic",
        image: "https://www.butteredsideupblog.com/wp-content/uploads/2023/06/How-to-Make-a-Strawberry-Milkshake-Without-Ice-Cream-17-scaled.jpg",
        popular: true,
        gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)"
    },
    
    {
        id: 12,
        name: "Mango Kulfi",
        description: "A traditional frozen Indian dessert made with creamy mango-flavored milk, slow-cooked and set on sticks for a rich, fruity indulgence",
        price: 70,
        category: "classic",
        image: "https://www.secondrecipe.com/wp-content/uploads/2021/05/mango-kulfi.jpg",
        popular: false,
        gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)"
    },
    {
        id: 13,
        name: "Chocolate Fudge",
        description: "Rich Belgian chocolate with swirls of dark fudge and cocoa nibs",
        price: 210,
        category: "classic",
        image: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400",
        popular: true,
        gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)"
    },
    {
        id: 14,
        name: "Mango Icecream Cake",
        description: "A luscious layered dessert combining soft cake and creamy mango ice cream, bursting with tropical flavor in every bite",
        price: 840,
        category: "classic",
        image: "https://i.pinimg.com/736x/d9/ba/fd/d9bafd3b55260557e7748b431385141d.jpg",
        popular: false,
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    },

    {
        id: 15,
        name: "Strawberry Bliss",
        description: "Fresh strawberries with cream, made from locally sourced organic berries",
        price: 240,
        category: "classic",
        image: "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=400",
        popular: false,
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    },
    {
        id: 15,
        name: "Pistachio Gelato",
        description: "Authentic Italian pistachio gelato with imported Sicilian pistachios",
        price: 250,
        category: "premium",
        image: "https://www.lambsearsandhoney.com/wp-content/uploads/2016/12/untitled-3387-500x498.jpg",
        popular: true,
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    },
    {
        id: 16,
        name: "Salted Caramel",
        description: "Sweet caramel ice cream with a hint of sea salt and caramel ribbons",
        price: 180,
        category: "premium",
        image: "https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=400",
        popular: true,
        gradient: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)"
    },
    {
        id:17,
        name: "Mint Chocolate Chip",
        description: "Cool mint ice cream with premium dark chocolate chips throughout",
        price: 170,
        category: "classic",
        image: "https://www.simplystacie.net/wp-content/uploads/2018/06/Mint-Chocolate-Chip-Ice-Cream-LOW-RES-33.jpg",
        popular: false,
        gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"
    },
    {
        id: 18,
        name: "Lavender Honey",
        description: "Delicate lavender ice cream with organic wildflower honey swirls",
        price: 210,
        category: "premium",
        image: "https://tastykitchen.com/recipes/wp-content/uploads/sites/2/2012/08/Lavender-Honey-Ice-Cream-by-Wanna-Be-A-Country-Cleaver-410x273.jpeg",
        popular: true,
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        id: 19,
        name: "Pumpkin Spice",
        description: "Seasonal favorite with real pumpkin, cinnamon, nutmeg, and warm spices",
        price: 230,
        category: "seasonal",
        image: "https://screamingforicecream.com/wp-content/uploads/2024/09/pumpkin-spice-ice-cream-featured.jpg",
        popular: false,
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
        id: 20,
        name: "Eggnog Delight",
        description: "Holiday special with rich eggnog flavor, rum essence, and nutmeg",
        price: 210,
        category: "seasonal",
        image: "https://www.thedailymeal.com/img/gallery/transform-eggnog-into-a-savory-delight-with-one-crispy-garnish/l-intro-1701788078.jpg",
        popular: false,
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        id: 21,
        name: "Cookies & Cream",
        description: "Vanilla ice cream loaded with crushed chocolate sandwich cookies",
        price: 150,
        category: "classic",
        image: "https://i.pinimg.com/564x/44/c5/02/44c50249c6dd23480ee1b4831416f7b0.jpg",
        popular: true,
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        id: 22,
        name: "Mango Sorbet",
        description: "Refreshing mango sorbet made with tropical Alphonso mangoes",
        price: 190,
        category: "seasonal",
        image: "https://www.kikkoman.eu/fileadmin/_processed_/9/f/csm_1034-recipe-page-The-easiest-2-ingredient-mango-sorbet_desktop_442d318d1c.jpg",
        popular: false,
        gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    },
    {
        id: 23,
        name: "Rocky Road",
        description: "Chocolate ice cream with marshmallows, almonds, and fudge chunks",
        price: 170,
        category: "premium",
        image: "https://www.cookiemadness.net/wp-content/uploads/2022/06/rocky-road-1200.jpg",
        popular: true,
        gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)"
    }
];

// Global Variables
let cart = [];
let currentFlavor = null;
let currentQuantity = 1;
let currentSize = 'small';
let currentPrice = 4.99;
let isLoading = false;

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const flavorsGrid = document.getElementById('flavors-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const orderModal = document.getElementById('order-modal');
const cartModal = document.getElementById('cart-modal');
const loadingSpinner = document.getElementById('loading-spinner');
const successMessage = document.getElementById('success-message');
const newsletterForm = document.getElementById('newsletter-form');
const contactForm = document.getElementById('contact-form');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadFlavors();
    animateStats();
    updateCartDisplay();
    initParallax();
    createFloatingElements();
    setupIntersectionObserver();
    setupCursorEffects();
}

function setupEventListeners() {
    // Navigation
    window.addEventListener('scroll', handleScroll);
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => filterFlavors(btn.dataset.filter));
    });
    
    // Cart button
    cartBtn.addEventListener('click', openCartModal);
    
    // Modal close events
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeAllModals();
        }
    });
    
    // Size selector events
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('size-btn') || e.target.closest('.size-btn')) {
            const sizeBtn = e.target.classList.contains('size-btn') ? e.target : e.target.closest('.size-btn');
            selectSize(sizeBtn);
        }
    });
    
    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.getElementById('about').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function handleKeyboardNavigation(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        closeAllModals();
    }
    
    // Quick cart access with 'C' key
    if (e.key === 'c' || e.key === 'C') {
        if (!e.target.matches('input, textarea')) {
            openCartModal();
        }
    }
}

function handleScroll() {
    const scrollY = window.scrollY;
    
    // Navbar scroll effect
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Parallax effects
    updateParallax();
    
    // Hide/show scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (scrollY > 200) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

function loadFlavors(filter = 'all') {
    if (isLoading) return;
    
    showLoading();
    isLoading = true;
    
    setTimeout(() => {
        const filteredFlavors = filter === 'all' 
            ? flavors 
            : flavors.filter(flavor => flavor.category === filter);
        
        flavorsGrid.innerHTML = '';
        
        filteredFlavors.forEach((flavor, index) => {
            const flavorCard = createFlavorCard(flavor);
            flavorsGrid.appendChild(flavorCard);
            
            // Staggered animation
            setTimeout(() => {
                flavorCard.style.opacity = '1';
                flavorCard.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        hideLoading();
        isLoading = false;
        
        // Trigger intersection observer for new cards
        setupIntersectionObserver();
    }, 800);
}

function createFlavorCard(flavor) {
    const card = document.createElement('div');
    card.className = 'flavor-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    const popularBadge = flavor.popular ? '<div class="popular-badge">Popular ⭐</div>' : '';
    
    card.innerHTML = `
        ${popularBadge}
        <div class="flavor-image">
            <img src="${flavor.image}" alt="${flavor.name}" loading="lazy">
            <div class="image-overlay" style="background: ${flavor.gradient}"></div>
        </div>
        <div class="flavor-info">
            <h3 class="flavor-name">${flavor.name}</h3>
            <p class="flavor-description">${flavor.description}</p>
            <div class="flavor-price">From &nbsp ₹${flavor.price}</div>
            <div class="flavor-actions">
                <button class="btn btn-primary btn-small" onclick="orderFlavor(${flavor.id})">
                    <span>Order Now</span>
                    <i class="fas fa-shopping-cart"></i>
                </button>
                <button class="btn btn-secondary btn-small" onclick="addToCartQuick(${flavor.id})">
                    <span>Quick Add</span>
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
    `;
    
    // Enhanced hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-20px) scale(1.02)';
        card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
    });
    
    // Click to order
    card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
            orderFlavor(flavor.id);
        }
    });
    
    return card;
}

function filterFlavors(filter) {
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    // Load filtered flavors
    loadFlavors(filter);
    
    // Show success message
    const filterName = filter === 'all' ? 'All Flavors' : filter.charAt(0).toUpperCase() + filter.slice(1);
    showSuccessMessage(`Showing ${filterName} 🍦`);
}

function orderFlavor(flavorId) {
    currentFlavor = flavors.find(f => f.id === flavorId);
    if (!currentFlavor) return;

    // Reset modal state
    currentQuantity = 1;
    currentSize = 'small';

    // Dynamically calculate prices
    const smallPrice = currentFlavor.price;
    const mediumPrice = smallPrice + 30;
    const largePrice = smallPrice + 60;

    // Update size buttons with new prices
    document.querySelector('.size-btn[data-size="small"]').dataset.price = smallPrice;
    document.querySelector('.size-btn[data-size="small"] .size-price').textContent = `₹${smallPrice}`;

    document.querySelector('.size-btn[data-size="medium"]').dataset.price = mediumPrice;
    document.querySelector('.size-btn[data-size="medium"] .size-price').textContent = `₹${mediumPrice}`;

    document.querySelector('.size-btn[data-size="large"]').dataset.price = largePrice;
    document.querySelector('.size-btn[data-size="large"] .size-price').textContent = `₹${largePrice}`;

    // Set default price
    currentPrice = smallPrice;

    // Update modal content
    updateOrderModal();
    openOrderModal();
}


function updateOrderModal() {
  if (!currentFlavor) return;

  const selectedFlavorDiv = document.getElementById('selected-flavor');
  selectedFlavorDiv.innerHTML = `
    <div class="order-item">
      <div class="order-item-image-wrapper">
        <img src="${currentFlavor.image}" alt="${currentFlavor.name}" class="order-item-image">
      </div>
      <div class="order-item-details">
        <h4>${currentFlavor.name}</h4>
        <p>${currentFlavor.description}</p>
      </div>
    </div>
  `;

  document.getElementById('quantity').textContent = currentQuantity;
  updateTotalPrice();
}


function openOrderModal() {
    orderModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    const firstInput = orderModal.querySelector('button, input, select, textarea');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

function closeOrderModal() {
    orderModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showOrderModal(flavor) {
    currentFlavor = flavor;
    currentQuantity = 1;
    currentSize = 'small';
    currentPrice = flavor.prices['small']; // 👈 base price
    
    // ✅ Update size buttons with proper data-price
    document.querySelector('[data-size="small"]').dataset.price = flavor.prices['small'];
    document.querySelector('[data-size="medium"]').dataset.price = flavor.prices['small'] + 30;
    document.querySelector('[data-size="large"]').dataset.price = flavor.prices['small'] + 60;

    updateTotalPrice();
}

function openCartModal() {
    updateCartModal();
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    const firstInput = cartModal.querySelector('button, input, select, textarea');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

function closeCartModal() {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function closeAllModals() {
    orderModal.classList.remove('active');
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeQuantity(change) {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
        currentQuantity = newQuantity;
        document.getElementById('quantity').textContent = currentQuantity;
        updateTotalPrice();
        
        // Add pulse animation
        const quantitySpan = document.getElementById('quantity');
        quantitySpan.style.animation = 'quantityPulse 0.3s ease';
        setTimeout(() => {
            quantitySpan.style.animation = '';
        }, 300);
    }
}


function selectSize(sizeBtn) {
    // Remove active class from all size buttons
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected button
    sizeBtn.classList.add('active');
    
    // Update current size and price
    currentSize = sizeBtn.dataset.size;
    currentPrice = parseFloat(sizeBtn.dataset.price);
    
    updateTotalPrice();
}

function updateTotalPrice() {
    const total = (currentPrice * currentQuantity).toFixed(2);
    document.getElementById('total-price').textContent = total;
}


function updateTotalPrice() {
    const total = (currentPrice * currentQuantity).toFixed(2);
    document.getElementById('total-price').textContent = total;
}

function addToCart() {
    if (!currentFlavor) return;

    const cartItem = {
        id: Date.now(),
        flavorId: currentFlavor.id,
        name: currentFlavor.name,
        image: currentFlavor.image,
        size: currentSize,
        quantity: currentQuantity,
        price: currentPrice, // ✅ updated by selectSize()
        total: currentPrice * currentQuantity
    };

    cart.push(cartItem);
    updateCartDisplay();
    closeOrderModal();
    showSuccessMessage(`${currentFlavor.name} (${currentSize}) added to cart! 🛒`);

    cartBtn.style.animation = 'cartBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    setTimeout(() => {
        cartBtn.style.animation = '';
    }, 600);

    createMiniCelebration();
}


function addToCartQuick(flavorId) {
    const flavor = flavors.find(f => f.id === flavorId);
    if (!flavor) return;

    const basePrice = flavor.price; // This is the small size price
    const size = 'small';
    const quantity = 1;

    const cartItem = {
        id: Date.now(),
        flavorId: flavor.id,
        name: flavor.name,
        image: flavor.image,
        size: size,
        quantity: quantity,
        price: basePrice,
        total: basePrice * quantity
    };

    cart.push(cartItem);
    updateCartDisplay();
    showSuccessMessage(`${flavor.name} (Small) added to cart! 🛒`);

    // Animate cart button
    cartBtn.style.animation = 'cartBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    setTimeout(() => {
        cartBtn.style.animation = '';
    }, 600);

    createMiniCelebration();
}

function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById("cart-count");
    const cartItemsContainer = document.getElementById("cart-items"); // your cart item list container
    const cartTotalDisplay = document.getElementById("cart-total");   // this is the span for ₹total

    // Update cart count bubble
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    if (totalItems > 0) {
        cartCount.style.animation = 'cartBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            cartCount.style.animation = '';
        }, 500);
    }

    // Update cart items
    cartItemsContainer.innerHTML = '';
    let grandTotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price}</span>
            <input type="number" value="${item.quantity}" min="1" onchange="changeQuantity(${item.id}, this.value)">
            <span>₹${itemTotal.toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // ✅ Update total price in the correct <span id="cart-total">
    cartTotalDisplay.textContent = grandTotal.toFixed(2);
}


function updateCartModal() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-light);">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p style="font-size: 1.2rem;">Your cart is empty</p>
                <p>Add some delicious ice cream to get started!</p>
            </div>
        `;
        cartTotalSpan.textContent = '0.00';
        return;
    }

    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.total !== undefined ? item.total : item.price * item.quantity;
        total += itemTotal;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.style.animationDelay = `${index * 0.1}s`;

        cartItemDiv.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Size: ${item.size.charAt(0).toUpperCase() + item.size.slice(1)} | Qty: ${item.quantity}</p>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="cart-item-price">₹${itemTotal.toFixed(2)}</div>
                <button class="remove-btn" onclick="removeFromCart(${index})" title="Remove item">
    <i class="fas fa-trash-alt"></i>
</button>

            </div>
        `;

        cartItemsDiv.appendChild(cartItemDiv);
    });

    cartTotalSpan.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        const removedItem = cart[index]; // 👈 Get item before removing
        cart.splice(index, 1);           // Remove item
        updateCartModal();               // Update cart UI
        updateCartDisplay();             // Update cart count badge

        // Show message with item name
        showSuccessMessage(`Removed "${removedItem.name}" from cart 🗑️`);
    }
}


function checkout() {
  const nameInput = document.getElementById('input-customer-name');
  const phoneInput = document.getElementById('input-customer-phone');

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name) {
    alert('Please enter your name');
    nameInput.focus();
    return;
  }
  if (!phone.match(/^\d{10}$/)) {
    alert('Please enter a valid 10-digit phone number');
    phoneInput.focus();
    return;
  }

  const currentCart = [...cart];

  showSuccessMessage(`Order confirmed! Thank you, ${name}.`);

  createCelebrationEffect();

  generateStyledInvoice(currentCart, name, phone);

  cart = [];
  updateCartDisplay();
    document.getElementById('input-customer-name').value = '';
  document.getElementById('input-customer-phone').value = '';
  closeCartModal();
}

function generateStyledInvoice(cartData, customerName, customerPhone) {
  document.getElementById('customer-name').textContent = customerName || "N/A";
  document.getElementById('customer-phone').textContent = customerPhone || "N/A";

  // build invoice table as before...
  // (rest of your invoice HTML generation code)
  
  const content = document.getElementById('invoice-content');
  const modal = document.getElementById('invoice-modal');
  if (!content || !modal) return;

  let html = `
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <thead style="background-color: #f8f8f8;">
        <tr>
          <th>Flavor</th>
          <th>Size</th>
          <th>Qty</th>
          <th>Price (₹)</th>
          <th>Total (₹)</th>
        </tr>
      </thead>
      <tbody>
  `;

  let grandTotal = 0;
  cartData.forEach(item => {
    html += `
      <tr>
        <td>${item.name}</td>
        <td>${item.size}</td>
        <td>${item.quantity}</td>
        <td>${item.price.toFixed(2)}</td>
        <td>${item.total.toFixed(2)}</td>
      </tr>
    `;
    grandTotal += item.total;
  });

  html += `
      </tbody>
      <tfoot>
        <tr style="background-color: #ffe0e0;">
          <td colspan="4"><strong>Grand Total</strong></td>
          <td><strong>₹${grandTotal.toFixed(2)}</strong></td>
        </tr>
      </tfoot>
    </table>
  `;

  content.innerHTML = html;
  modal.style.display = 'flex';
}


function closeInvoiceModal() {
  document.getElementById('invoice-modal').style.display = 'none';
}

function downloadInvoice() {
  const invoiceContent = document.querySelector('#invoice-modal .modal-content');

  if (!invoiceContent) {
    alert("Invoice content not found!");
    return;
  }

  // Clone to remove the close button and download button temporarily for PDF
  const clonedContent = invoiceContent.cloneNode(true);

  // Remove interactive elements (like close and download button)
  clonedContent.querySelector('.close')?.remove();
  clonedContent.querySelector('button')?.remove();

  // Create a wrapper to ensure PDF only includes styled content
  const wrapper = document.createElement('div');
  wrapper.style.padding = '20px';
  wrapper.style.backgroundColor = '#fff';
  wrapper.style.color = '#000';
  wrapper.appendChild(clonedContent);

  // Generate the PDF using html2pdf
const opt = {
  margin: 0,
  filename: 'invoice.pdf',
  image: { type: 'jpeg', quality: 1 }, // High quality image
  html2canvas: {
    scale: 6, // Higher scale = better resolution (4–6 is best)
    useCORS: true,
    backgroundColor: '#ffffff',
    allowTaint: false,
    logging: false,
    letterRendering: true,
    scrollY: 0 // Prevents visual offset in long pages
  },
  jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
};


  html2pdf().set(opt).from(wrapper).save();
}



    function loadImage(url) {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.src = url;
      });
    }
function showLoading() {
    loadingSpinner.classList.add('active');
}

function hideLoading() {
    loadingSpinner.classList.remove('active');
}

let successTimeout;

function showSuccessMessage(message) {
    const successText = document.getElementById('success-text');
    const successMessage = document.getElementById('success-message');

    if (!successText || !successMessage) return;

    successText.textContent = message;
    successMessage.classList.add('show');

    clearTimeout(successTimeout);
    successTimeout = setTimeout(() => {
        successMessage.classList.remove('show');
    }, 4000);
}


function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!email) return;
    
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        showSuccessMessage('Successfully subscribed to newsletter! 📧');
        e.target.reset();
    }, 1500);
}

function handleContactSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
    
    if (!name) return;
    
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        showSuccessMessage(`Thank you ${name}! We'll get back to you soon. 📞`);
        e.target.reset();
    }, 2000);
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Parallax Effects
function initParallax() {
    // Create additional parallax elements if needed
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 768) {
        // Add more floating elements for desktop
        for (let i = 0; i < 5; i++) {
            const floatingElement = document.createElement('div');
            floatingElement.className = 'parallax-element';
            floatingElement.style.cssText = `
                position: absolute;
                width: ${50 + Math.random() * 100}px;
                height: ${50 + Math.random() * 100}px;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                pointer-events: none;
                animation: floatShape ${15 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            hero.appendChild(floatingElement);
        }
    }
}

function updateParallax() {
    if (window.innerWidth <= 768) return; // Skip on mobile for performance
    
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroShapes = hero.querySelectorAll('.hero-shape');
        heroShapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Section background parallax
    const sections = document.querySelectorAll('.about, .flavors, .services, .contact');
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const bgShapes = section.querySelectorAll('.bg-shape');
            bgShapes.forEach((shape, shapeIndex) => {
                const speed = 0.02 + (shapeIndex * 0.01);
                const yPos = -(scrolled * speed);
                shape.style.transform = `translateY(${yPos}px)`;
            });
        }
    });
    
    // Floating elements parallax
    const floatingElements = document.querySelectorAll('.floating-item, .parallax-element');
    floatingElements.forEach((element, index) => {
        const speed = 0.05 + (index * 0.02);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animations for grid items
                if (entry.target.classList.contains('flavor-card') || 
                    entry.target.classList.contains('service-card') ||
                    entry.target.classList.contains('feature-card')) {
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll(`
        .flavor-card, .service-card, .feature-card, .contact-item,
        .about-text, .about-visual, .section-header
    `);
    
    elementsToObserve.forEach(el => observer.observe(el));
}

// Floating elements creation
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const emojis = ['🍦', '🍨', '🧁', '🍓', '🥜', '🌿', '🎂', '🍰', '🍫', '🍒'];
    
    for (let i = 0; i < 12; i++) {
        const floatingElement = document.createElement('div');
        floatingElement.className = 'floating-element';
        floatingElement.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        floatingElement.style.cssText = `
            position: absolute;
            font-size: ${1.5 + Math.random() * 1}rem;
            opacity: ${0.1 + Math.random() * 0.2};
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatingItem ${20 + Math.random() * 15}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
            z-index: 1;
        `;
        hero.appendChild(floatingElement);
    }
}

// Cursor effects
function setupCursorEffects() {
    if (window.innerWidth <= 768) return; // Skip on mobile
    
    let mouseX = 0;
    let mouseY = 0;
    let trailElements = [];
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create cursor trail
        if (Math.random() > 0.8) { // Reduce frequency
            createCursorTrail(mouseX, mouseY);
        }
        
        // Interactive ice cream cone
        const iceCreamContainer = document.querySelector('.ice-cream-container');
        if (iceCreamContainer) {
            const rect = iceCreamContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (mouseX - centerX) / 50;
            const deltaY = (mouseY - centerY) / 50;
            
            iceCreamContainer.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX * 0.1}deg)`;
        }
    });
    
    function createCursorTrail(x, y) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(231, 76, 60, 0.6), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: trailFade 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        trailElements.push(trail);
        
        // Limit trail elements
        if (trailElements.length > 15) {
            const oldTrail = trailElements.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
        
        setTimeout(() => {
            if (trail && trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 800);
    }
}

        

function createCelebrationEffect() {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
    const emojis = ['🍦', '🎉', '✨', '🌟', '💫','🍨', '🍧', '🍦', '🍓', '🧁'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        const isEmoji = Math.random() > 0.7;

        if (isEmoji) {
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.fontSize = `${1 + Math.random() * 1.5}rem`;
        } else {
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${8 + Math.random() * 6}px`;
            confetti.style.height = `${8 + Math.random() * 6}px`;
            confetti.style.borderRadius = '50%';
        }

        const left = Math.random() * 100;
        const wind = Math.random() * 50 - 25;
        const duration = 5 + Math.random() * 2;

        confetti.style.cssText += `
            position: fixed;
            top: -20px;
            left: ${left}vw;
            z-index: 9999;
            pointer-events: none;
            opacity: 1;
            animation: fall ${duration}s ease-in forwards;
            transform: translateX(0);
        `;

        confetti.style.setProperty('--wind', `${wind}px`);

        document.body.appendChild(confetti);

        // Remove only AFTER animation finishes + delay
        confetti.addEventListener('animationend', () => {
            confetti.style.transition = 'opacity 1s ease-out';
            confetti.style.opacity = '0';
            setTimeout(() => confetti.remove(), 1000);
        });
    }
}


// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 0.8;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    @keyframes confettiFall {
  0% {
    transform: translateX(0) translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateX(var(--wind)) translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

@keyframes fall {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) translateX(var(--wind, 0px));
    opacity: 0.8;
  }
}


    
    @keyframes miniExplode {
        0% {
            transform: scale(1) translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Enhanced hover effects */
    .btn:hover {
        animation: buttonPulse 0.3s ease;
    }
    
    @keyframes buttonPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    /* Loading animation enhancement */
    .loading-spinner.active .spinner-inner {
        animation: spin 1s linear infinite, spinGlow 2s ease-in-out infinite alternate;
    }
    
    @keyframes spinGlow {
        0%, 100% {
            box-shadow: 0 0 20px rgba(231, 76, 60, 0.3);
        }
        50% {
            box-shadow: 0 0 30px rgba(231, 76, 60, 0.6);
        }
    }
`;
document.head.appendChild(style);

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce scroll handler for better performance
window.addEventListener('scroll', debounce(handleScroll, 10));

// Preload critical images
function preloadImages() {
    const imageUrls = [
        // Add any critical image URLs here
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
preloadImages();

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Reviews slider

function setupReviewsSlider() {
    const dots = document.querySelectorAll('.dot');
    const totalReviews = document.querySelectorAll('.review-card').length;

    // Start with first review
    showReview(0);

    // Dot click handling
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            showReview(index);
        });
    });

    // Auto-rotate every 5 seconds
    setInterval(() => {
        currentReviewSlide = (currentReviewSlide + 1) % totalReviews;
        showReview(currentReviewSlide);
    }, 5000);
}

function showReview(index) {
    const reviews = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');

    reviews.forEach(review => review.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (reviews[index]) reviews[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');

    currentReviewSlide = index;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', setupReviewsSlider);


// // Global error handling
// window.addEventListener('error', (e) => {
//     console.error('Global error:', e.error);
//     showSuccessMessage('Something went wrong. Please try again. 😅');
// });

// Expose global functions for HTML onclick handlers
window.orderFlavor = orderFlavor;
window.addToCartQuick = addToCartQuick;
window.scrollToSection = scrollToSection;
window.openOrderModal = openOrderModal;
window.closeOrderModal = closeOrderModal;
window.openCartModal = openCartModal;
window.closeCartModal = closeCartModal;
window.changeQuantity = changeQuantity;
window.addToCart = addToCart;
window.checkout = checkout;