import CropCard from "../components/CropCard";
import { FaSeedling } from "react-icons/fa";
import { motion } from "framer-motion";

function CropRecommendation() {
  const crops = [
    { crop: "Rice", confidence: 95 },
    { crop: "Wheat", confidence: 90 },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #020d05 0%, #041a0b 50%, #061208 100%)",
      fontFamily: "'DM Sans', sans-serif",
      color: "white",
      padding: "4rem 2rem",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        .cr-header {
          max-width: 700px;
          margin: 0 auto 3rem;
          text-align: center;
        }

        .cr-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(250, 204, 21, 0.08);
          border: 1px solid rgba(250, 204, 21, 0.2);
          color: #facc15;
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
        }

        .cr-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: white;
          margin: 0 0 0.75rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .cr-title em { color: #facc15; font-style: italic; }

        .cr-sub {
          color: rgba(255,255,255,0.4);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .cr-grid {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        @media (max-width: 640px) {
          .cr-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <motion.div className="cr-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="cr-badge"><FaSeedling /> AI Recommendation</div>
        <h1 className="cr-title"><em>Recommended</em> Crops</h1>
        <p className="cr-sub">Based on your soil analysis and climate data, here are the best crops for your land.</p>
      </motion.div>

      <div className="cr-grid">
        {crops.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <CropCard crop={item.crop} confidence={item.confidence} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CropRecommendation;