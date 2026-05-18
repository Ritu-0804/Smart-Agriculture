import { motion } from "framer-motion";
import { FaLeaf, FaSeedling, FaCloudSun, FaFlask, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <FaLeaf />,
    color: "#4ade80",
    glow: "rgba(74,222,128,0.2)",
    title: "Soil Analysis",
    desc: "Analyze NPK levels, pH, and fertility in real-time using AI-driven predictions.",
    to: "/soil",
  },
  {
    icon: <FaSeedling />,
    color: "#facc15",
    glow: "rgba(250,204,21,0.2)",
    title: "Crop Recommendation",
    desc: "Get intelligent crop suggestions tailored to your soil and climate conditions.",
    to: "/crop",
  },
  {
    icon: <FaCloudSun />,
    color: "#60a5fa",
    glow: "rgba(96,165,250,0.2)",
    title: "Live Weather",
    desc: "Real-time weather data and forecasts to plan your farming schedule smartly.",
    to: "/weather",
  },
  {
    icon: <FaFlask />,
    color: "#c084fc",
    glow: "rgba(192,132,252,0.2)",
    title: "Fertilizer Guide",
    desc: "Get customized fertilizer recommendations based on your crop and soil data.",
    to: "/fertilizer",
  },
];

const stats = [
  { value: "95%", label: "Prediction Accuracy" },
  { value: "12+", label: "Crop Types Supported" },
  { value: "Real-time", label: "Weather Updates" },
  { value: "AI", label: "Powered Analysis" },
];

function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #020d05 0%, #041a0b 40%, #061208 100%)",
      fontFamily: "'DM Sans', sans-serif",
      color: "white",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        .home-noise {
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.4;
        }

        .glow-orb {
          position: fixed; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
        }

        .hero-section {
          position: relative; z-index: 1;
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 6rem 2rem 4rem;
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(74,222,128,0.08);
          border: 1px solid rgba(74,222,128,0.2);
          color: #4ade80; padding: 6px 16px; border-radius: 100px;
          font-size: 0.8rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 2rem;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 7vw, 5.5rem); font-weight: 700;
          line-height: 1.1; max-width: 900px; margin: 0 auto 1.5rem;
          color: white; letter-spacing: -0.02em;
        }

        .hero-title em { font-style: italic; color: #4ade80; }

        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.2rem); color: rgba(255,255,255,0.5);
          max-width: 560px; margin: 0 auto 3rem; line-height: 1.7; font-weight: 400;
        }

        .hero-cta {
          display: flex; gap: 1rem; flex-wrap: wrap;
          justify-content: center; margin-bottom: 5rem;
        }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #16a34a, #4ade80);
          color: white; font-weight: 600; font-size: 0.95rem;
          padding: 14px 28px; border-radius: 14px; text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 0 30px rgba(74,222,128,0.25); letter-spacing: 0.01em;
        }

        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(74,222,128,0.4); }

        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: rgba(255,255,255,0.7);
          font-weight: 500; font-size: 0.95rem;
          padding: 14px 28px; border-radius: 14px; text-decoration: none;
          border: 1px solid rgba(255,255,255,0.1); transition: all 0.25s ease;
        }

        .btn-secondary:hover { border-color: rgba(255,255,255,0.25); color: white; transform: translateY(-2px); }

        .stats-row {
          display: flex; gap: 3rem; justify-content: center; flex-wrap: wrap;
          padding: 2.5rem 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          margin: 0 -2rem;
        }

        .stat-item { text-align: center; }

        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 700; color: #4ade80; line-height: 1;
        }

        .stat-label {
          font-size: 0.75rem; color: rgba(255,255,255,0.4);
          text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px;
        }

        .features-section {
          position: relative; z-index: 1;
          padding: 6rem 2rem; max-width: 1200px; margin: 0 auto;
        }

        .section-label {
          text-align: center; font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #4ade80; margin-bottom: 1rem;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem); font-weight: 700;
          text-align: center; color: white; margin-bottom: 1rem; letter-spacing: -0.02em;
        }

        .section-desc {
          text-align: center; color: rgba(255,255,255,0.4);
          font-size: 1rem; max-width: 520px; margin: 0 auto 4rem; line-height: 1.7;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 2rem;
          text-decoration: none; color: white;
          transition: all 0.3s ease; display: flex;
          flex-direction: column; gap: 1rem;
          position: relative; overflow: hidden; cursor: pointer;
        }

        .feature-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--glow) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s; border-radius: 20px;
        }

        .feature-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.12); }
        .feature-card:hover::before { opacity: 1; }

        .feature-icon {
          width: 48px; height: 48px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center; font-size: 1.25rem;
        }

        .feature-title { font-size: 1.1rem; font-weight: 600; color: white; margin: 0; }

        .feature-desc {
          font-size: 0.875rem; color: rgba(255,255,255,0.45);
          line-height: 1.6; margin: 0; flex: 1;
        }

        .feature-link {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.8rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.06em; margin-top: 0.5rem;
        }

        @media (max-width: 640px) {
          .stats-row { gap: 1.5rem; }
          .features-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="home-noise" />
      <div className="glow-orb" style={{ width: 600, height: 600, background: "rgba(22,163,74,0.12)", top: -200, left: -200 }} />
      <div className="glow-orb" style={{ width: 400, height: 400, background: "rgba(74,222,128,0.06)", top: "30%", right: -100 }} />

      {/* Hero */}
      <section className="hero-section">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="hero-badge"><FaLeaf /> AI-Powered Farming</div>
        </motion.div>

        <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          Farm <em>Smarter</em> with<br />Intelligent Agriculture
        </motion.h1>

        <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }}>
          Analyze soil, predict the best crops, and make data-driven farming decisions powered by artificial intelligence.
        </motion.p>

        <motion.div className="hero-cta" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Link to="/soil" className="btn-primary">Analyze Soil <FaArrowRight /></Link>
          <Link to="/weather" className="btn-secondary">Live Weather <FaCloudSun /></Link>
        </motion.div>

        <motion.div className="stats-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="features-section">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">Everything Your Farm Needs</h2>
          <p className="section-desc">From soil to harvest — AI tools designed for modern farmers.</p>
        </motion.div>

        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div
              key={f.to}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link to={f.to} className="feature-card" style={{ "--glow": f.glow }}>
                <div className="feature-icon" style={{ background: f.glow, color: f.color }}>{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
                <div className="feature-link" style={{ color: f.color }}>
                  Explore <FaArrowRight style={{ fontSize: "0.7rem" }} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;