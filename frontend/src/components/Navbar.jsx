import { Link, useLocation } from "react-router-dom";
import { FaLeaf, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/soil", label: "Soil" },
  { to: "/crop", label: "Crops" },
  { to: "/weather", label: "Weather" },
  { to: "/fertilizer", label: "Fertilizer" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(5, 20, 10, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(74, 222, 128, 0.12);
          padding: 0 2rem;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'DM Sans', sans-serif;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .brand-icon {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, #16a34a, #4ade80);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 20px rgba(74, 222, 128, 0.3);
        }

        .brand-icon svg { color: white; font-size: 18px; }

        .brand-text h1 {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem; font-weight: 700;
          color: #4ade80; letter-spacing: 0.01em;
          line-height: 1; margin: 0;
        }

        .brand-text p {
          font-size: 0.65rem; color: rgba(255,255,255,0.4);
          margin: 2px 0 0; letter-spacing: 0.08em; text-transform: uppercase;
        }

        .nav-links {
          display: flex; align-items: center; gap: 2px;
          list-style: none; margin: 0; padding: 0;
        }

        .nav-links a {
          text-decoration: none; color: rgba(255,255,255,0.6);
          font-size: 0.875rem; font-weight: 500;
          padding: 6px 14px; border-radius: 8px;
          transition: all 0.2s ease; position: relative;
          letter-spacing: 0.02em;
        }

        .nav-links a:hover { color: #4ade80; background: rgba(74,222,128,0.08); }

        .nav-links a.active {
          color: #4ade80; background: rgba(74,222,128,0.12);
        }

        .nav-links a.active::after {
          content: ''; position: absolute;
          bottom: -1px; left: 50%; transform: translateX(-50%);
          width: 16px; height: 2px;
          background: #4ade80; border-radius: 2px;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: 1px solid rgba(74,222,128,0.2);
          color: #4ade80; width: 38px; height: 38px;
          border-radius: 10px; cursor: pointer;
          align-items: center; justify-content: center;
          font-size: 16px; transition: all 0.2s;
        }

        .mobile-toggle:hover { background: rgba(74,222,128,0.1); }

        .mobile-menu {
          display: none; position: fixed;
          top: 68px; left: 0; right: 0;
          background: rgba(5, 18, 10, 0.97);
          border-bottom: 1px solid rgba(74,222,128,0.12);
          padding: 1rem; flex-direction: column; gap: 4px; z-index: 99;
        }

        .mobile-menu.open { display: flex; }

        .mobile-menu a {
          text-decoration: none; color: rgba(255,255,255,0.7);
          font-size: 0.9rem; font-weight: 500;
          padding: 10px 16px; border-radius: 10px; transition: all 0.2s;
        }

        .mobile-menu a:hover, .mobile-menu a.active {
          background: rgba(74,222,128,0.1); color: #4ade80;
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .mobile-toggle { display: flex; }
          .navbar { padding: 0 1.25rem; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />

      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon"><FaLeaf /></div>
          <div className="brand-text">
            <h1>Smart Agriculture</h1>
            <p>AI Farming Assistant</p>
          </div>
        </Link>

        <ul className="nav-links">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className={location.pathname === to ? "active" : ""}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={location.pathname === to ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Navbar;