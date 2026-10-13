
import React, { useEffect, useMemo, useState } from 'react';
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import AdminPanel from './AdminPanel.jsx';
import { supabase } from './supabaseClient.js';

const menu = [
  {
    category: 'Signatures',
    title: 'Signature Hot',
    image: 'signature-hot',
    items: [
      ['Salted Caramel', 90],
      ['Spanish Latte', 95],
      ['Caramel Macchiato', 90],
      ['Coconut Spice Latte', 90],
      ['Dark Mocha', 90],
      ['White Mocha', 90],
      ['Hot Mexican Mocha', 95],
      ['Banana Bread Latte', 90]
    ]
  },
  {
    category: 'Coffee',
    title: 'Coffee',
    image: 'coffee',
    items: [
      ['Espresso', 50],
      ['Espresso Cream', 60],
      ['Flat White', 70],
      ['Cortado', 65],
      ['White Americano', 70],
      ['Americano', 60],
      ['Espresso Affogato', 60],
      ['Latte', 80],
      ['Cappuccino', 75],
      ['Turkish Coffee · Single', 35],
      ['Turkish Coffee · Double', 50]
    ]
  },
  {
    category: 'Coffee',
    title: 'Hot Chocolate',
    image: 'hot-chocolate',
    items: [
      ['Hot Chocolate · Dark', 70],
      ['Hot Chocolate · White', 70],
      ['Strawberry White', 75],
      ['Hot Cream Brulee', 80],
      ['Hot Chocolate', 80],
      ['Marshmallow', null]
    ]
  },
  {
    category: 'Tea & Matcha',
    title: 'Hot Drinks',
    image: 'hot-drinks',
    items: [
      ['Tea', 30],
      ['Flavored Tea', 40],
      ['Herb Tea', 40]
    ]
  },
  {
    category: 'Tea & Matcha',
    title: 'Matcha Cloud',
    image: 'matcha',
    items: [
      ['Classic Matcha', 70],
      ['Strawberry Matcha', 90],
      ['Orange Honey Matcha', 80],
      ['Coconut Spice Matcha', 90]
    ]
  },
  {
    category: 'Tea & Matcha',
    title: 'Boba Tea',
    image: 'boba',
    items: [
      ['Classic Boba', 70],
      ['Boba Latte', 80],
      ['Mango Peach Boba', 75]
    ]
  },
  {
    category: 'Cold Drinks',
    title: 'Ice Signature',
    image: 'ice-signature',
    items: [
      ['Ice Fruit Americano', 85],
      ['Ice Mocha · Dark', 85],
      ['Ice Mocha · White', 85],
      ['Ice Caramel Macchiato', 85],
      ['Ice Spanish Latte', 90],
      ['Ice Coconut Latte', 90],
      ['Salt Butter Scotch Latte', 85]
    ]
  },
  {
    category: 'Cold Drinks',
    title: 'Ice Tea',
    image: 'ice-tea',
    items: [
      ['Peach Tea', 60],
      ['Lemon Mint Tea', 60],
      ['Passion Tea', 60],
      ['Pina Colada', 60],
      ['Pink Lemon Cloud', 80],
      ['Pink Choco Cloud', 85]
    ]
  },
  {
    category: 'Cold Drinks',
    title: 'Mojito & Soda',
    image: 'mojito',
    items: [
      ['Passion Fruit', 80],
      ['Cherry Lemon', 80],
      ['Ocean Pineapple Cloud', 75],
      ['Red Bull', 95],
      ['Soda', 50],
      ['Water', 15]
    ]
  },
  {
    category: 'Cold Drinks',
    title: 'Fresh & Cocktail',
    image: 'fresh-cocktail',
    items: [
      ['Mango Juice', 75],
      ['Orange Juice', 75],
      ['Strawberry Juice', 70],
      ['Velvet Blend', 80],
      ['Citrus Mix', 70],
      ['Guava', 70]
    ]
  },
  {
    category: 'Cold Drinks',
    title: 'Shake',
    image: 'shake',
    items: [
      ['Shake Oreo', 85],
      ['Shake Salted Caramel', 80],
      ['Shake Nutella', 80],
      ['Shake Strawberry', 85],
      ['Shake Pistachio', 80]
    ]
  },
  {
    category: 'Cold Drinks',
    title: 'Frappe',
    image: 'frappe',
    items: [
      ['Frappe Classic', 65],
      ['Frappe Nutella', 75],
      ['Frappe Salted Caramel', 70],
      ['Frappe Kinder', 70]
    ]
  },
  {
    category: 'Food & Sweets',
    title: 'Sandwiches',
    image: 'sandwiches',
    items: [
      ['Mediterranean', 115],
      ['Turkey Sandwich', 90],
      ['Four Cheese Melt', 110],
      ['Salami Sandwich', 105],
      ['Melt Chicken Sandwich', 125]
    ]
  },
  {
    category: 'Food & Sweets',
    title: 'Salade',
    image: 'salad',
    items: [
      ['Greek Salad', 90],
      ['Green Salad', 80],
      ['Caesar Salad', 125]
    ]
  },
  {
    category: 'Food & Sweets',
    title: 'Dessert',
    image: 'dessert',
    items: [
      ['Cheese Cake · Nutella', 125],
      ['Cheese Cake · Blueberry', 120],
      ['Cheese Cake · Pistachio', 120],
      ['Cheese Cake · Lotus', 120],
      ['San Sebastian · Nutella', 125],
      ['San Sebastian · Lotus', 120],
      ['San Sebastian · Pistachio', 120],
      ['Chocolate Fudge Cake', 110],
      ['English Cake', 70],
      ['Honey Cake', 105],
      ['Tiramisu', 110],
      ['Molten Chocolate', 110],
      ['Cookie · Salted', 70],
      ['Cookie · Nutella', 75],
      ['Brownies', 70],
      ['Cinnamon · Nutella', 110],
      ['Cinnamon · Pistachio', 115],
      ['Cinnamon · Lotus', 105],
      ['Cinnamon · Classic', 100]
    ]
  },
  {
    category: 'Food & Sweets',
    title: 'Croissant',
    image: 'croissant',
    items: [
      ['Plain Croissant', 60],
      ['Chocolate Croissant', 75],
      ['Cheese Croissant', 75],
      ['Turkey Croissant', 85]
    ]
  },
  {
    category: 'Food & Sweets',
    title: 'Waffle',
    image: 'waffle',
    items: [
      ['Waffle · Nutella', 70],
      ['Waffle · Pistachio', 70],
      ['Waffle · Blueberry', 75],
      ['Waffle · Lotus', 75],
      ['Waffle · Fruits', 75]
    ]
  },
  {
    category: 'Food & Sweets',
    title: 'Pancake',
    image: 'pancake',
    items: [
      ['Pancake · Nutella', 70],
      ['Pancake · Pistachio', 70],
      ['Pancake · Blueberry', 75],
      ['Pancake · Lotus', 75]
    ]
  },
  {
    category: 'Extras',
    title: 'Extras',
    image: 'extras',
    items: [
      ['Boba', 32],
      ['Milk', 30],
      ['Espresso', 35],
      ['Sauce', 35],
      ['Whipped Cream', 30]
    ]
  },
  {
    category: 'Extras',
    title: 'Filter Brewing',
    image: 'filter-brewing',
    items: [
      ['V60', 105],
      ['Aeropress', 105]
    ]
  }
];

const categories = [
  'All',
  'Signatures',
  'Coffee',
  'Tea & Matcha',
  'Cold Drinks',
  'Food & Sweets',
  'Extras'
];

function Brand({ footer = false }) {
  return (
    <a
      className={footer ? 'footer-brand' : 'brand'}
      href="#home"
      aria-label="Kopi Specialty Coffee home"
    >
      <img
        src="/assets/kopi-logo.jpg"
        alt="Kopi Specialty Coffee fox logo"
      />
    </a>
  );
}

function MenuCard({ section, term }) {
  const items = section.items.filter(
    ([name]) =>
      name.toLowerCase().includes(term) ||
      section.title.toLowerCase().includes(term)
  );

  if (!items.length) return null;

  return (
    <article className="menu-card">
      <header className="card-head">
        <div className="card-title">
          <h3>{section.title}</h3>

          <span className="card-count">
            {String(items.length).padStart(2, '0')} ITEMS
          </span>
        </div>

        <MenuArt type={section.image} />
      </header>

      {items.map(([name, price, available, imageUrl]) => (
        <div className={`menu-item${imageUrl ? ' has-image' : ''}`} key={name}>
          {imageUrl && <img className="menu-item-image" src={imageUrl} alt="" loading="lazy" />}
        <span className={`item-name${available === false ? ' item-unavailable' : ''}`}>
          {name}
          {available === false && <small>Unavailable</small>}
        </span>

          <span className="item-price">
            {price === null ? (
              '—'
            ) : (
              <>
                {price} <small>L.E</small>
              </>
            )}
          </span>
        </div>
      ))}
    </article>
  );
}

function MenuArt({ type }) {
  const drawings = {
    'signature-hot': (
      <>
        <path d="M55 39h48l-5 51H61z" />
        <path
          d="M103 48h10a12 12 0 0 1 0 24h-12"
          fill="none"
        />
        <path d="M61 50h39" className="art-detail" />
        <path
          d="M70 29c-8-8 8-10 0-19M86 29c-8-8 8-10 0-19"
          className="art-steam"
        />
      </>
    ),

    coffee: (
      <>
        <path d="M48 43h50l-5 47H54z" />
        <path
          d="M98 52h10a11 11 0 0 1 0 22h-12"
          fill="none"
        />
        <path d="M54 52h43" className="art-detail" />
        <path
          d="M62 33c-7-8 8-10 1-18M81 33c-7-8 8-10 1-18"
          className="art-steam"
        />
      </>
    ),

    'hot-chocolate': (
      <>
        <path d="M47 47h52l-5 43H53z" />
        <path
          d="M99 55h9a10 10 0 0 1 0 20h-11"
          fill="none"
        />
        <path d="M55 57h35" className="art-cream" />
        <path
          d="M67 39c-8-8 8-10 0-18"
          className="art-steam"
        />
        <circle cx="70" cy="62" r="3" className="art-chip" />
        <circle cx="82" cy="69" r="3" className="art-chip" />
      </>
    ),

    'hot-drinks': (
      <>
        <path d="M57 42c-5-13 11-22 25-19 13 2 19 11 17 22l-3 29H62z" />
        <path
          d="M98 48h15l13-13M59 48H46L36 39"
          fill="none"
        />
        <path d="M68 28c4-10 20-10 27 0" fill="none" />
        <path d="M65 74h37" className="art-detail" />
      </>
    ),

    matcha: (
      <>
        <path d="M49 56q31-25 62 0l-7 28q-24 18-48 0z" />
        <path d="M55 58q25 13 50 0" fill="none" />
        <path
          d="M79 54c-1-19 13-26 24-29-1 16-8 27-24 29z"
          className="art-leaf"
        />
        <path d="M80 53l15-17" className="art-leaf-line" />
      </>
    ),

    boba: (
      <>
        <path d="M57 37h48l-7 57H64z" />
        <path d="M57 44h48M62 50h37" className="art-detail" />
        <path d="M85 36l13-24" className="art-straw" />
        <circle cx="72" cy="79" r="3" className="art-boba" />
        <circle cx="83" cy="84" r="3" className="art-boba" />
        <circle cx="94" cy="77" r="3" className="art-boba" />
        <circle cx="75" cy="90" r="3" className="art-boba" />
        <circle cx="91" cy="89" r="3" className="art-boba" />
      </>
    ),

    'ice-signature': (
      <>
        <path d="M59 36h48l-7 58H66z" />
        <path d="M59 44h48M64 51h38" className="art-detail" />
        <path d="M87 36l11-23" className="art-straw" />
        <path
          d="M72 63l9-8 8 9-8 9zM91 76l7-6 6 8-7 6z"
          className="art-ice"
        />
      </>
    ),

    'ice-tea': (
      <>
        <path d="M60 39h45l-4 52H64z" />
        <path
          d="M57 39h50v8H57zM68 34h34"
          className="art-detail"
        />
        <path d="M83 34l13-23" className="art-straw" />
        <path d="M70 68q14-12 28 0v16H70z" className="art-fruit" />
      </>
    ),

    mojito: (
      <>
        <path d="M57 39h48l-6 55H64z" />
        <path d="M57 46h48" className="art-detail" />
        <path d="M84 39l14-27" className="art-straw" />
        <path
          d="M74 57c-13-8-8-22 0-27 8 8 10 17 0 27zM91 65c-1-13 10-19 19-17-2 11-8 17-19 17z"
          className="art-leaf"
        />
        <circle cx="79" cy="79" r="5" className="art-fruit" />
      </>
    ),

    'fresh-cocktail': (
      <>
        <path d="M58 38h48l-7 56H65z" />
        <path d="M58 45h48" className="art-detail" />
        <path d="M85 38l12-25" className="art-straw" />
        <circle cx="73" cy="65" r="9" className="art-citrus" />
        <path
          d="M73 56v18M64 65h18M67 59l12 12M79 59 67 71"
          className="art-citrus-line"
        />
      </>
    ),

    shake: (
      <>
        <path d="M62 34h40l-5 60H67z" />
        <path d="M61 43h42M64 49h36" className="art-detail" />
        <path d="M82 34l10-22" className="art-straw" />
        <path d="M65 34q17-19 34 0" className="art-cream" />
        <circle cx="83" cy="25" r="4" className="art-cherry" />
      </>
    ),

    frappe: (
      <>
        <path d="M59 36h47l-6 58H66z" />
        <path d="M59 44h47" className="art-detail" />
        <path d="M85 36l12-24" className="art-straw" />
        <path d="M64 37q20-24 40 0" className="art-cream" />
        <circle cx="78" cy="31" r="4" className="art-chip" />
        <circle cx="90" cy="27" r="4" className="art-chip" />
      </>
    ),

    sandwiches: (
      <>
        <path d="M47 73 79 33l34 40z" />
        <path d="m54 69 26-30 27 30z" className="art-bread" />
        <path d="m54 69 26-30 27 30" fill="none" />
        <path
          d="M58 65q21-8 43 0M62 72q17-5 34 0"
          className="art-filling"
        />
      </>
    ),

    salad: (
      <>
        <path d="M42 63q38 46 76 0z" />
        <path d="M49 63q31-37 62 0" />
        <path
          d="M65 58c-10-15-1-24 8-27 8 11 4 22-8 27zM82 58c1-17 13-21 22-18-1 12-8 19-22 18z"
          className="art-leaf"
        />
        <circle cx="75" cy="62" r="5" className="art-tomato" />
        <circle cx="94" cy="64" r="4" className="art-tomato" />
      </>
    ),

    dessert: (
      <>
        <path d="M50 48h58v34H50z" />
        <path d="M50 48q29-27 58 0" className="art-cream" />
        <path d="M50 60h58M50 72h58" className="art-cake-line" />
        <path d="M74 47q5-15 15-13 9 2 7 12" className="art-berry" />
        <circle cx="86" cy="34" r="5" className="art-berry" />
      </>
    ),

    croissant: (
      <>
        <path d="M43 72q15-34 34-27 9 2 14 14 10-18 24-10 14 11-4 35-15-13-29 1-20 7-39-13z" />
        <path
          d="M59 70q10-18 20-17M71 79q12-20 23-18M91 83q8-17 18-18"
          fill="none"
          className="art-pastry-line"
        />
      </>
    ),

    waffle: (
      <>
        <rect x="48" y="39" width="65" height="51" rx="9" />
        <path
          d="M64 40v48M80 40v48M97 40v48M51 56h59M51 73h59"
          className="art-waffle-line"
        />
        <path d="M54 37q26-10 52 0" className="art-cream" />
      </>
    ),

    pancake: (
      <>
        <ellipse cx="80" cy="82" rx="40" ry="12" />
        <path d="M42 75q38-16 76 0l-4 9q-34 13-68 0z" />
        <path d="M47 64q33-16 66 0l-3 10q-30 12-60 0z" />
        <path d="M54 54q26-15 53 0l-3 10q-24 10-47 0z" />
        <path d="M59 52q23-8 43 0" className="art-syrup" />
        <circle cx="81" cy="46" r="7" className="art-berry" />
      </>
    ),

    extras: (
      <>
        <path d="M47 47h25l-3 42H50zM83 39h25l-4 50H86z" />
        <path d="M49 57h21M85 51h21" className="art-detail" />
        <path d="M54 47v-9h11v9M90 39v-9h11v9" className="art-syrup" />
        <circle cx="63" cy="72" r="4" className="art-boba" />
        <circle cx="96" cy="70" r="4" className="art-boba" />
      </>
    ),

    'filter-brewing': (
      <>
        <path d="M57 42h46l-15 27h-16z" />
        <path d="M80 69v20M63 91h39" fill="none" />
        <path d="M69 42q11-16 22 0" className="art-filter" />
        <path d="M80 54v13" className="art-drip" />
        <path d="M61 94h39l-4 8H65z" />
      </>
    )
  };

  return (
    <div className="menu-photo" aria-hidden="true">
      <svg viewBox="0 0 160 120" role="presentation">
        <ellipse
          cx="80"
          cy="101"
          rx="47"
          ry="7"
          className="art-shadow"
        />

        <g className={`menu-art art-${type}`}>
          {drawings[type] || drawings.coffee}
        </g>

        <path
          d="M25 28c5-9 13-9 18 0M123 86c4-6 9-6 13 0"
          className="art-sparkle"
        />
      </svg>
    </div>
  );
}

function CafeSite() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuSections, setMenuSections] = useState(menu);
  const [activeSection, setActiveSection] = useState('home');
  const [search, setSearch] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const term = search.trim().toLowerCase();

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;

    supabase
      .from('menu_items')
      .select('name, category, section_title, art_key, price, image_url, is_available, sort_order')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled || error || !data?.length) return;
        const groups = new Map();
        data.forEach((row) => {
          const title = row.section_title || row.category;
          if (!groups.has(title)) {
            groups.set(title, {
              category: row.category,
              title,
              image: row.art_key || 'coffee',
              items: []
            });
          }
          groups.get(title).items.push([
            row.name,
            row.price,
            row.is_available,
            row.image_url
          ]);
        });
        setMenuSections(Array.from(groups.values()));
      });

    return () => { cancelled = true; };
  }, []);

  const visibleSections = useMemo(
    () =>
      menuSections.filter((section) => {
        const inCategory =
          activeCategory === 'All' ||
          section.category === activeCategory;

        const hasMatch = section.items.some(
          ([name]) =>
            name.toLowerCase().includes(term) ||
            section.title.toLowerCase().includes(term)
        );

        return inCategory && hasMatch;
      }),
    [activeCategory, term, menuSections]
  );

  const itemCount = visibleSections.reduce(
    (sum, section) =>
      sum +
      section.items.filter(
        ([name]) =>
          name.toLowerCase().includes(term) ||
          section.title.toLowerCase().includes(term)
      ).length,
    0
  );

  const closeMobileNav = () => setMobileNavOpen(false);

  useEffect(() => {
    const sectionIds = ['home', 'menu', 'about', 'locations'];

    const updateActiveSection = () => {
      let current = 'home';

      for (const id of sectionIds) {
        const section = document.getElementById(id);

        if (
          section &&
          section.getBoundingClientRect().top <= window.innerHeight * 0.36
        ) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', updateActiveSection, {
      passive: true
    });

    updateActiveSection();

    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  const handleNavClick = (section) => {
    setActiveSection(section);
    closeMobileNav();
  };

  return (
    <>
    {mobileNavOpen && (
  <div className="mobile-menu-layer">
    <button
      className="mobile-menu-backdrop"
      type="button"
      aria-label="Close navigation"
      onClick={closeMobileNav}
    />

    <nav className="mobile-menu-panel" aria-label="Mobile navigation">
      <Brand onClick={closeMobileNav} />

      <a
        className={`mobile-menu-link${activeSection === "home" ? " active" : ""}`}
        href="#home"
        onClick={() => handleNavClick("home")}
      >
        <span>Home</span>
        <span className="nav-arrow" aria-hidden="true">↗</span>
      </a>

      <a
        className={`mobile-menu-link${activeSection === "menu" ? " active" : ""}`}
        href="#menu"
        onClick={() => handleNavClick("menu")}
      >
        <span>Menu</span>
        <span className="nav-arrow" aria-hidden="true">↗</span>
      </a>

      <a
        className={`mobile-menu-link${activeSection === "about" ? " active" : ""}`}
        href="#about"
        onClick={() => handleNavClick("about")}
      >
        <span>Our story</span>
        <span className="nav-arrow" aria-hidden="true">↗</span>
      </a>

      <a
        className={`mobile-menu-link${activeSection === "locations" ? " active" : ""}`}
        href="#locations"
        onClick={() => handleNavClick("locations")}
      >
        <span>Contact &amp; Location</span>
        <span className="nav-arrow" aria-hidden="true">↗</span>
      </a>

      <a
        className="mobile-menu-view"
        href="#menu"
        onClick={() => handleNavClick("menu")}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 9h11v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9Zm11 2h2a2.5 2.5 0 0 1 0 5h-2M8 6c-1-1 1-1.5 0-2.5M12 6c-1-1 1-1.5 0-2.5" />
        </svg>
        <span>View Our Menu</span>
      </a>

      <a
        className="mobile-menu-location"
        href="#locations"
        onClick={() => handleNavClick("locations")}
      >
        <svg className="maps-marker" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 22s8-7.3 8-13A8 8 0 1 0 4 9c0 5.7 8 13 8 13Z"
            fill="#EA4335"
          />
          <circle cx="12" cy="9" r="3" fill="#fff" />
        </svg>
        <span>Contact &amp; Location</span>
      </a>
    </nav>
  </div>
)}

      <header className="site-header">
        <Brand />

        <button
          className={`menu-toggle${mobileNavOpen ? ' is-open' : ''}`}
          aria-label={
            mobileNavOpen ? 'Close navigation' : 'Open navigation'
          }
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          <span></span>
          <span></span>
        </button>

        <nav className="main-nav" aria-label="Main navigation">
          <a
            className={activeSection === 'home' ? 'active' : ''}
            href="#home"
            onClick={() => handleNavClick('home')}
          >
            Home
          </a>

          <a
            className={activeSection === 'menu' ? 'active' : ''}
            href="#menu"
            onClick={() => handleNavClick('menu')}
          >
            Menu
          </a>

          <a
            className={activeSection === 'about' ? 'active' : ''}
            href="#about"
            onClick={() => handleNavClick('about')}
          >
            Our story
          </a>

          <a
            className={activeSection === 'locations' ? 'active' : ''}
            href="#locations"
            onClick={() => handleNavClick('locations')}
          >
            Contact &amp; Location
          </a>
        </nav>

        <a className="header-cta" href="#menu">
          Find your favorite <span>↗</span>
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow">
              <i></i> KOPI SPECIALTY COFFEE
            </span>

            <h1>
              Good things
              <br />
              take <em>time.</em>
            </h1>

            <p>
              Slow mornings, good coffee, and little moments worth staying
              for. Find your new favorite in the Kopi menu.
            </p>

            <a className="primary-button" href="#menu">
              Explore the menu <span>↓</span>
            </a>

            <div className="hero-note">
              <span className="note-line"></span>
              <span>Made for your kind of day</span>
            </div>
          </div>

          <div className="hero-art">
            <div className="art-halo"></div>

            <img
              src="/assets/kopi-mascot.jpg"
              alt="Kopi's playful fox mascot enjoying a boba drink"
            />

            <span className="art-sticker">
              SIP
              <br />
              HAPPY
            </span>

            <span className="art-caption">
              A little treat
              <br />
              goes a long way
            </span>

            <span
              className="floating-bean bean-one"
              aria-hidden="true"
            ></span>

            <span
              className="floating-bean bean-two"
              aria-hidden="true"
            ></span>
          </div>

          <div className="hero-bottom">
            <span>COFFEE · SIPS · SOMETHING SWEET</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <i></i> SOMETHING FOR EVERY MOOD
              </span>

              <h2>
                The Kopi <em>menu</em>
              </h2>
            </div>

            <p>
              From your first espresso to one more bite of dessert — take
              your time and find what sounds good.
            </p>
          </div>

          <div className="menu-tools">
            <div
              className="category-tabs"
              role="tablist"
              aria-label="Menu categories"
            >
              {categories.map((category) => (
                <button
                  className="category-tab"
                  role="tab"
                  aria-selected={activeCategory === category}
                  type="button"
                  key={category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="search-box">
              <span aria-hidden="true">⌕</span>

              <input
                type="search"
                placeholder="Find a favorite…"
                aria-label="Search menu"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>

          <div className="menu-count" aria-live="polite">
            {itemCount} items ·{' '}
            {activeCategory === 'All' ? 'Full menu' : activeCategory}
          </div>

          {visibleSections.length > 0 ? (
            <div className="menu-grid">
              {visibleSections.map((section) => (
                <MenuCard
                  section={section}
                  term={term}
                  key={section.title}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              Nothing on the menu matches that search. Try another name.
            </div>
          )}
        </section>

        <section className="story-section" id="about">
          <div className="story-mark">K</div>

          <div className="story-copy">
            <span className="eyebrow">
              <i></i> A NOTE FROM KOPI
            </span>

            <h2>
              Good things
              <br />
              take <em>time.</em>
            </h2>

            <p>
              Take a pause, pick your favorite, and make a little room in
              your day for something lovely.
            </p>

            <a href="#menu" className="text-link">
              Take another look at the menu <span>↗</span>
            </a>
          </div>

          <div className="story-stamp">
            <span>MADE WITH</span>
            <strong>♡</strong>
            <span>AT KOPI</span>
          </div>
        </section>

        <section className="locations-section" id="locations">
          <div className="locations-heading">
            <span className="eyebrow">
              <i></i> LOCATIONS &amp; CONTACT
            </span>

            <h2>
              Visit us or <em>order in</em>
            </h2>

            <p>
              Drop by for your Kopi favorites, or get in touch and we’ll be
              happy to help.
            </p>
          </div>

          <div className="locations-layout">
            <div className="locations-details">
              <article className="location-card">
                <div className="location-card-heading">
                  <span className="contact-icon pin-icon">⌖</span>

                  <div>
                    <span className="footer-label">
                      KOPI SPECIALTY COFFEE
                    </span>
                    <h3>Our Location</h3>
                  </div>

                  <a
                    className="directions-button"
                    href="https://maps.google.com/?q=Kafr+El-Zayat,+El-Gharbia,+El-Geish+Street"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Directions <span>↗</span>
                  </a>
                </div>

                <p className="address-line">
                  Kafr El-Zayat, El-Gharbia, El-Geish Street
                </p>
              </article>

              <article className="location-card hotline-card">
                <div className="location-card-heading">
                  <span className="contact-icon phone-icon">⌕</span>

                  <div>
                    <span className="footer-label">CALL OR MESSAGE</span>
                    <h3>Contact Kopi</h3>
                  </div>
                </div>

               <div className="contact-rows">
  <div className="contact-row">
    <div>
      <span className="contact-type">Mobile</span>
      <a
        className="contact-number"
        href="tel:+201036202620"
      >
        01036202620
      </a>
    </div>

    <div className="contact-actions">
  <a className="call-button" href="tel:+201036202620">
    <span className="call-symbol">📞</span>
    <span>Call us</span>
  </a>

  <a
    className="chat-button"
    href="https://wa.me/201036202620"
    target="_blank"
    rel="noreferrer"
    aria-label="Chat on WhatsApp at 01036202620"
  >
    <svg
  className="wa-symbol"
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <path
    fill="currentColor"
    d="M12.04 2a9.94 9.94 0 0 0-8.53 15.05L2.1 22l5.1-1.34A10 10 0 1 0 12.04 2Zm0 18.2a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.03.8.81-2.95-.2-.31A8.16 8.16 0 1 1 12.04 20.2Zm4.48-6.11c-.25-.13-1.47-.73-1.7-.81-.23-.09-.39-.13-.55.13-.17.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.01-.39.11-.52.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.55-1.33-.76-1.83-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.42.06-.64.31-.22.25-.85.84-.85 2.04s.87 2.37.99 2.53c.12.17 1.72 2.63 4.16 3.69.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.59.21-1.09.15-1.19-.06-.1-.22-.16-.47-.29Z"
  />
</svg>
    <span>Chat</span>
  </a>
</div>
  </div>

  <div className="contact-row landline-row">
    <div>
      <span className="contact-type">Landline</span>
      <a
        className="contact-number"
        href="tel:+20402531615"
      >
        0402531615
      </a>
    </div>

    <div className="contact-actions">
      <a
        className="call-button"
        href="tel:+20402531615"
      >
        <span className="call-symbol">☎️</span>
        <span>Call us</span>
      </a>
                    </div>
                  </div>
                </div>
              </article>

              <article className="location-card social-card">
                <div>
                  <span className="footer-label">FOLLOW KOPI</span>
                  <h3>Find us online</h3>
                </div>

                
<div className="social-links">
  <a
    href="https://www.facebook.com/profile.php?id=61585373786339"
    target="_blank"
    rel="noreferrer"
    aria-label="Kopi on Facebook"
  >
    <span className="social-icon">
      <FaFacebookF />
    </span>
  </a>

  <a
    href="https://www.instagram.com/kopicafe.kz/"
    target="_blank"
    rel="noreferrer"
    aria-label="Kopi on Instagram"
  >
    <span className="social-icon instagram-icon">
      <FaInstagram />
    </span>
  </a>

  <a
    href="https://www.tiktok.com/@kopi.coffee.kz"
    target="_blank"
    rel="noreferrer"
    aria-label="Kopi on TikTok"
  >
    <span className="social-icon tiktok-icon">
      <FaTiktok />
    </span>
  </a>
</div>

              </article>
            </div>

            <div className="map-card">
              <iframe
                title="Kopi Cafe location in Kafr El-Zayat, El-Gharbia"
                src="https://maps.google.com/maps?q=Kafr%20El-Zayat%2C%20El-Gharbia%2C%20El-Geish%20Street&z=14&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              <span className="map-label">
                <i></i> KOPI · KAFR EL-ZAYAT
              </span>
            </div>
          </div>
        </section>
      </main>
<footer className="site-footer">
  <div className="footer-reference-row">
    <Brand footer />

    <nav aria-label="Footer navigation">
      <a href="#home">Home</a>
      <a href="#menu">Menu</a>
      <a href="#locations">Contact &amp; Location</a>
      <a
        href="https://www.facebook.com/profile.php?id=61585373786339"
        target="_blank"
        rel="noreferrer"
      >
        Facebook ↗
      </a>
    </nav>

    <a href="#home" className="footer-top-button">
      Back to top ↑
    </a>
  </div>

  <div className="footer-bottom">
    <div className="footer-legal">
      <span>Kafr El-Zayat · El-Gharbia</span>
      <span>
        © {new Date().getFullYear()} Kopi Specialty Coffee. All rights reserved.
      </span>
    </div>

    <a
      className="developer-credit"
      href="https://wa.me/201004365028"
      target="_blank"
      rel="noreferrer"
      aria-label="Contact Mohamed Abofard on WhatsApp"
    >
      Developed by <strong>Mohamed Abofard</strong> <i>↗</i>
    </a>
  </div>
</footer>
    </>
  );
}

function App() {
  if (window.location.pathname.replace(/\/+$/, '') === '/admin') {
    return <AdminPanel defaultMenu={menu} />;
  }
  return <CafeSite />;
}

export default App;
