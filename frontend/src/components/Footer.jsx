import { Link } from "react-router-dom";
import { FaLeaf, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      background: "rgba(2,13,5,0.95)",
      padding: "2rem 2rem",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: "linear-gradient(135deg, #16a34a, #4ade80)",
            borderRadius: 9, display: "flex", alignItems: "center",
            justifyContent: "center", color: "white", fontSize: "0.85rem",
          }}>
            <FaLeaf />
          </div>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            color: "#4ade80", fontWeight: 700, fontSize: "0.95rem",
          }}>
            Smart Agriculture
          </span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {[
            { to: "/soil", label: "Soil" },
            { to: "/crop", label: "Crops" },
            { to: "/weather", label: "Weather" },
            { to: "/fertilizer", label: "Fertilizer" },
          ].map(({ to, label }) => (
            <Link key={to} to={to} style={{
              color: "rgba(255,255,255,0.35)", fontSize: "0.8rem",
              textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#4ade80"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", margin: 0 }}>
          © {new Date().getFullYear()} Smart Agriculture AI
        </p>
      </div>
    </footer>
  );
}

export default Footer;