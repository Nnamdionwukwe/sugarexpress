import React, { useState, useEffect, useRef } from "react";
import {
  FaWhatsapp,
  FaClock,
  FaMapMarkerAlt,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaUtensils,
  FaBox,
  FaTruck,
  FaLeaf,
  FaFire,
  FaHamburger,
  FaGlassCheers,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { GiChickenOven, GiRiceCooker, GiNoodles, GiMeal } from "react-icons/gi";
import styles from "./LandingPage.module.css";

// ─── Menu Data ──────────────────────────────────────────────
const menuCategories = [
  {
    name: "Rice Boxes",
    icon: <GiRiceCooker />,
    items: [
      {
        name: "Sugar Coconut Rice",
        price: "₦8,500",
        desc: "Coconut Rice, Fish Chunks, Turkey Wings",
      },
      {
        name: "Loaded Native Rice",
        price: "₦7,500",
        desc: "Goat Meat, Dried Fish, Egg",
      },
      {
        name: "Jollof Fiesta",
        price: "₦11,000",
        desc: "Quarter Chicken, Plantain, Smoky Jollof",
      },
      {
        name: "White Rice & Curry",
        price: "₦6,000",
        desc: "Curry Sauce, Chicken Breast Chunks",
      },
      {
        name: "Ghanian Jollof",
        price: "₦7,000",
        desc: "Ghana Jollof, Quarter Chicken",
      },
    ],
  },
  {
    name: "Wings & Thighs",
    icon: <GiChickenOven />,
    items: [
      { name: "BBQ Wings", price: "₦5,000", desc: "" },
      { name: "Sugar Chicken Lollipop", price: "₦5,000", desc: "" },
      { name: "Faji Wings", price: "₦5,000", desc: "" },
      { name: "Lemon Pepper Wings", price: "₦5,000", desc: "" },
      { name: "Grilled Turkey", price: "₦9,000", desc: "" },
      { name: "Quarter Chicken", price: "₦5,000", desc: "" },
    ],
  },
  {
    name: "Pasta Boxes",
    icon: <GiNoodles />,
    items: [
      {
        name: "Spaghetti Fiesta",
        price: "₦11,000",
        desc: "Bell Peppers, Chunks - Beef/Chicken/Goat",
      },
      {
        name: "Smoked Penne Pasta",
        price: "₦9,000",
        desc: "Sausage, Chicken Chunks, Tomato/Cream",
      },
      {
        name: "Native Spaghetti",
        price: "₦8,000",
        desc: "Ponmo, Dried Fish, Smoked Panola",
      },
    ],
  },
  {
    name: "Wrap & Sandwich",
    icon: <FaHamburger />,
    items: [
      { name: "Beef Wrap", price: "₦7,000", desc: "" },
      { name: "Grilled Chicken Club Sandwich", price: "₦5,000", desc: "" },
    ],
  },
  {
    name: "Side Dishes",
    icon: <FaLeaf />,
    items: [
      { name: "Coleslaw", price: "₦1,000", desc: "" },
      { name: "Yam / Plantain / Fries", price: "₦1,500", desc: "" },
      { name: "Potato Wedges", price: "₦2,500", desc: "" },
    ],
  },
  {
    name: "Drinks",
    icon: <FaGlassCheers />,
    items: [
      { name: "Zobo", price: "₦1,000", desc: "" },
      { name: "Coke", price: "₦500", desc: "" },
      { name: "Sprite", price: "₦500", desc: "" },
      { name: "Fanta", price: "₦500", desc: "" },
      { name: "Water", price: "₦300", desc: "" },
      { name: "Maltina", price: "₦1,000", desc: "" },
    ],
  },
];

// ─── Combos Data ─────────────────────────────────────────────
const comboData = [
  {
    name: "Lunch Combo A",
    items: "Jollof Fiesta · Coke · Coleslaw",
    price: "₦11,500",
  },
  {
    name: "Lunch Combo B",
    items: "Loaded Native Rice · Zobo",
    price: "₦8,000",
  },
  {
    name: "Express Bowl",
    items: "White rice · Curry sauce · Chicken chunks",
    price: "₦4,500",
  },
  { name: "Pasta Combo", items: "Smoked Penne Pasta · Coke", price: "₦9,000" },
];

// ─── Office Lunch Packages ──────────────────────────────────
const officePackages = [
  {
    title: "Package A",
    desc: "Order 5 meals – Get 1 free drink on every meal",
  },
  { title: "Package B", desc: "Order 10 meals – Get 1 meal free" },
];

// ─── Delivery Areas ─────────────────────────────────────────
const deliveryAreas = [
  "Asokoro",
  "Utako",
  "Maitama",
  "Jabi",
  "Wuse 2",
  "Gwarimpa",
  "Life Camp",
  "Guezape",
  "Durimi",
  "Central Area",
  "Ketempe",
];

// ─── Main Component ──────────────────────────────────────────
const LandingPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved || "dark";
    }
    return "dark";
  });
  const navbarRef = useRef(null);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme handler
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
    }
  }, [theme]);

  // Close nav on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(e.target) &&
        isNavOpen
      ) {
        setIsNavOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isNavOpen]);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const revealElements = document.querySelectorAll(
      `.${styles.menuSection}, .${styles.comboSection}, .${styles.officeSection}, .${styles.deliverySection}`,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    revealElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      el.style.transition =
        "opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Parallax orb effect
  useEffect(() => {
    const orbs = document.querySelectorAll(`.${styles.glowOrb}`);
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      orbs.forEach((orb, i) => {
        const speed = 0.02 + i * 0.01;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // External links
  const whatsappLink = "https://wa.me/qr/ZD64ZVONWAP6H1";
  const chowdeckLink =
    "https://chowdeck.com/store/wuse/restaurants/sugar-express-wusea9lwkp";
  const glovoLink =
    "https://glovo.go.link/open?link_type=store&store_id=579134&adjust_t=s321jkn";

  return (
    <div className={styles.pageWrapper}>
      {/* Glow Orbs */}
      <div className={`${styles.glowOrb} ${styles.glowOrb1}`}></div>
      <div className={`${styles.glowOrb} ${styles.glowOrb2}`}></div>
      <div className={`${styles.glowOrb} ${styles.glowOrb3}`}></div>

      {/* ─── Navbar ─── */}
      <nav
        ref={navbarRef}
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.container}>
          <a href="#" className={styles.navbarBrand}>
            <span className={styles.brandIcon}>🍛</span>
            <span className={styles.brandName}>Sugar Express</span>
          </a>

          <ul
            className={`${styles.navbarLinks} ${isNavOpen ? styles.navbarLinksOpen : ""}`}
          >
            <li>
              <a href="#menu" onClick={closeNav}>
                Menu
              </a>
            </li>
            <li>
              <a href="#combos" onClick={closeNav}>
                Combos
              </a>
            </li>
            <li>
              <a href="#delivery" onClick={closeNav}>
                Delivery
              </a>
            </li>
            <li>
              <button
                className={`${styles.themeToggle} ${theme === "light" ? styles.themeToggleLight : ""}`}
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <span className={styles.toggleTrack}>
                  <FaSun />
                  <FaMoon />
                </span>
                <span className={styles.toggleThumb}></span>
              </button>
            </li>
            <li>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navbarCta}
                onClick={closeNav}
              >
                <FaWhatsapp /> Order Now
              </a>
            </li>
          </ul>

          <button
            className={styles.navbarHamburger}
            onClick={toggleNav}
            aria-label="Toggle navigation"
          >
            {isNavOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className={styles.hero} id="hero">
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span className={styles.pulseDot}></span>
                Open 11am – 7pm Daily
              </div>
              <h1 className={styles.heroTitle}>
                <span className={styles.highlight}>Sugar Express</span>
                <br />
                Delicious Meals,
                <br />
                Delivered to You
              </h1>
              <p className={styles.heroDesc}>
                Savor the taste of Abuja's favorite comfort food. From Jollof to
                BBQ Wings, we bring the feast to your doorstep.
              </p>
              <div className={styles.heroActions}>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btn} ${styles.btnWhatsapp}`}
                >
                  <FaWhatsapp /> Order on WhatsApp
                </a>
                <a
                  href={chowdeckLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  Order on Chowdeck
                </a>
                <a
                  href={glovoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                >
                  Order on Glovo
                </a>
              </div>
              <div className={styles.heroStats}>
                <div>
                  <div className={styles.statNumber}>11+</div>
                  <div className={styles.statLabel}>Areas Served</div>
                </div>
                <div>
                  <div className={styles.statNumber}>4.8★</div>
                  <div className={styles.statLabel}>Customer Rating</div>
                </div>
                <div>
                  <div className={styles.statNumber}>50+</div>
                  <div className={styles.statLabel}>Menu Items</div>
                </div>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroVisualOrb}></div>
              <div className={styles.heroFloatingCards}>
                <div className={styles.floatingCard}>
                  <span className={styles.floatingIcon}>
                    <GiRiceCooker />
                  </span>
                  <span className={styles.floatingText}>Jollof Fiesta</span>
                </div>
                <div className={styles.floatingCard}>
                  <span className={styles.floatingIcon}>
                    <GiChickenOven />
                  </span>
                  <span className={styles.floatingText}>BBQ Wings</span>
                </div>
                <div className={styles.floatingCard}>
                  <span className={styles.floatingIcon}>
                    <FaHamburger />
                  </span>
                  <span className={styles.floatingText}>Beef Wrap</span>
                </div>
                <div className={styles.floatingCard}>
                  <span className={styles.floatingIcon}>
                    <FaGlassCheers />
                  </span>
                  <span className={styles.floatingText}>Zobo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Menu ─── */}
      <section className={styles.menuSection} id="menu">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>🍽️ Our Menu</span>
            <h2 className={styles.sectionTitle}>Explore Our Dishes</h2>
            <p className={styles.sectionSub}>
              Made fresh daily with premium ingredients.
            </p>
          </div>

          {menuCategories.map((category, idx) => (
            <div key={idx} className={styles.menuCategory}>
              <h3 className={styles.categoryTitle}>
                <span className={styles.categoryIcon}>{category.icon}</span>
                {category.name}
              </h3>
              <div className={styles.menuGrid}>
                {category.items.map((item, i) => (
                  <div key={i} className={styles.menuItem}>
                    <div className={styles.menuItemContent}>
                      <h4>{item.name}</h4>
                      {item.desc && <p>{item.desc}</p>}
                    </div>
                    <span className={styles.menuPrice}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Combos ─── */}
      <section className={styles.comboSection} id="combos">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>🔥 Combo Deals</span>
            <h2 className={styles.sectionTitle}>Perfect Combinations</h2>
            <p className={styles.sectionSub}>
              Save more with our specially curated combos.
            </p>
          </div>

          <div className={styles.comboGrid}>
            {comboData.map((combo, idx) => (
              <div key={idx} className={styles.comboCard}>
                <h3>{combo.name}</h3>
                <p>{combo.items}</p>
                <span className={styles.comboPrice}>{combo.price}</span>
              </div>
            ))}
          </div>

          <div className={styles.officeSection}>
            <h3 className={styles.officeTitle}>Office Lunch Package</h3>
            <div className={styles.officeGrid}>
              {officePackages.map((pkg, idx) => (
                <div key={idx} className={styles.officeCard}>
                  <h4>{pkg.title}</h4>
                  <p>{pkg.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Delivery ─── */}
      <section className={styles.deliverySection} id="delivery">
        <div className={styles.container}>
          <div className={styles.deliveryGrid}>
            <div className={styles.deliveryInfo}>
              <span className={styles.sectionTag}>🚚 Delivery</span>
              <h2>We Deliver to Your Doorstep</h2>
              <p>
                Enjoy our meals anywhere in Abuja. We serve from 11am – 7pm
                every day.
              </p>
              <div className={styles.areasList}>
                {deliveryAreas.map((area, idx) => (
                  <span key={idx} className={styles.areaTag}>
                    {area}
                  </span>
                ))}
              </div>
              <div className={styles.deliveryPartners}>
                <span>Order via:</span>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
                <a
                  href={chowdeckLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chowdeck
                </a>
                <a href={glovoLink} target="_blank" rel="noopener noreferrer">
                  Glovo
                </a>
              </div>
              <div className={styles.deliveryNote}>
                <FaClock /> Orders are delivered within 45–60 minutes.
              </div>
              <div className={styles.vatNote}>* Prices are VAT exclusive.</div>
            </div>
            <div className={styles.deliveryMap}>
              <div className={styles.mapPlaceholder}>
                <FaMapMarkerAlt className={styles.mapIcon} />
                <p>Serving Abuja</p>
                <small>
                  Asokoro, Utako, Maitama, Jabi, Wuse 2, Gwarimpa, Life Camp,
                  Guezape, Durimi, Central Area, Ketempe
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={styles.ctaBanner}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <h2>Ready to Order?</h2>
            <p>
              Craving something delicious? Order now and we'll bring it straight
              to you.
            </p>
            <div className={styles.ctaButtons}>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnWhatsapp}`}
              >
                <FaWhatsapp /> Order on WhatsApp
              </a>
              <a
                href={chowdeckLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                Order on Chowdeck
              </a>
              <a
                href={glovoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                Order on Glovo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <span className={styles.brandIcon}>🍛</span>

              <img className={styles.brandLogo} src="/logo.jpg" />
              <span>Sugar Express</span>
            </div>
            <div className={styles.footerCopy}>
              &copy; 2026 Sugar Express — Abuja's Favorite Meals
            </div>
            <div className={styles.footerSocials}>
              <a href="#" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
