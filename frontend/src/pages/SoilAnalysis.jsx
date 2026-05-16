import { useState } from "react";
import SoilForm from "../components/SoilForm";
import API from "../services/api";
import { FaLeaf, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function SoilAnalysis() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setResult(null);
      const response = await API.post("/recommend-crop", formData);
      setResult(response.data);
    } catch (error) {
      console.log(error);
      alert("Prediction Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #020d05 0%, #041a0b 50%, #061208 100%)",
      fontFamily: "'DM Sans', sans-serif",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 1.5rem",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        .soil-card {
          width: 100%;
          max-width: 700px;
        }

        .soil-header {
          margin-bottom: 2.5rem;
        }

        .soil-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(74, 222, 128, 0.08);
          border: 1px solid rgba(74, 222, 128, 0.2);
          color: #4ade80;
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
        }

        .soil-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: white;
          margin: 0 0 0.75rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .soil-title em {
          color: #4ade80;
          font-style: italic;
        }

        .soil-sub {
          color: rgba(255,255,255,0.4);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 2rem 0;
        }

        .spinner-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 2rem;
          color: rgba(255,255,255,0.5);
          font-size: 0.875rem;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(74, 222, 128, 0.15);
          border-top-color: #4ade80;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .result-card {
          background: linear-gradient(135deg, rgba(22, 163, 74, 0.1), rgba(74, 222, 128, 0.05));
          border: 1px solid rgba(74, 222, 128, 0.2);
          border-radius: 20px;
          padding: 2rem;
          margin-top: 2rem;
          text-align: center;
        }

        .result-icon {
          color: #4ade80;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .result-label {
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.5rem;
        }

        .result-crop {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #4ade80;
          margin-bottom: 0.75rem;
        }

        .confidence-bar-wrap {
          max-width: 300px;
          margin: 0 auto;
        }

        .confidence-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
          margin-bottom: 6px;
        }

        .confidence-bar {
          height: 6px;
          background: rgba(255,255,255,0.08);
          border-radius: 3px;
          overflow: hidden;
        }

        .confidence-fill {
          height: 100%;
          background: linear-gradient(90deg, #16a34a, #4ade80);
          border-radius: 3px;
          transition: width 1s ease;
        }
      `}</style>

      <motion.div className="soil-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="soil-header">
          <div className="soil-badge"><FaLeaf /> Soil Intelligence</div>
          <h1 className="soil-title">Soil <em>Analysis</em></h1>
          <p className="soil-sub">Enter your soil parameters below and let AI recommend the ideal crop for maximum yield.</p>
        </div>

        <div className="divider" />

        <SoilForm onSubmit={handleSubmit} />

        <AnimatePresence>
          {loading && (
            <motion.div className="spinner-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="spinner" />
              Analyzing soil composition...
            </motion.div>
          )}

          {!loading && result && (
            <motion.div className="result-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
              <div className="result-icon"><FaCheckCircle /></div>
              <p className="result-label">Best Crop Recommendation</p>
              <div className="result-crop">{result.crop}</div>
              <div className="confidence-bar-wrap">
                <div className="confidence-label">
                  <span>Confidence</span>
                  <span>{result.confidence}%</span>
                </div>
                <div className="confidence-bar">
                  <div className="confidence-fill" style={{ width: `${result.confidence}%` }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default SoilAnalysis;