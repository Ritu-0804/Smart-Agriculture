import { useState } from "react";
import API from "../services/api";
import { FaFlask, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const nutrients = [
  {
    name: "nitrogen",
    label: "Nitrogen",
    symbol: "N",
    color: "#4ade80",
    glow: "rgba(74,222,128,0.15)",
    hint: "mg/kg",
  },
  {
    name: "phosphorus",
    label: "Phosphorus",
    symbol: "P",
    color: "#c084fc",
    glow: "rgba(192,132,252,0.15)",
    hint: "mg/kg",
  },
  {
    name: "potassium",
    label: "Potassium",
    symbol: "K",
    color: "#facc15",
    glow: "rgba(250,204,21,0.15)",
    hint: "mg/kg",
  },
];

function Fertilizer() {
  const [form, setForm] = useState({ nitrogen: "", phosphorus: "", potassium: "" });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setResult("");
      const response = await API.post("/fertilizer", form);
      setResult(response.data.recommendation);
    } catch (error) {
      console.log(error);
      alert("Error fetching fertilizer recommendation");
    } finally {
      setLoading(false);
    }
  };

  const isValid = form.nitrogen && form.phosphorus && form.potassium;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #020d05 0%, #0d0a1f 50%, #020d05 100%)",
      fontFamily: "'DM Sans', sans-serif",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 1.5rem",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        .fert-container { width: 100%; max-width: 680px; }

        .fert-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(192, 132, 252, 0.08);
          border: 1px solid rgba(192, 132, 252, 0.2);
          color: #c084fc;
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
        }

        .fert-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: white;
          margin: 0 0 0.75rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .fert-title em { color: #c084fc; font-style: italic; }

        .fert-sub {
          color: rgba(255,255,255,0.4);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 2rem 0;
        }

        .nutrients-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 540px) {
          .nutrients-grid { grid-template-columns: 1fr; }
        }

        .nutrient-field {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1.25rem;
          transition: border-color 0.2s, background 0.2s;
          position: relative;
        }

        .nutrient-field:focus-within {
          background: rgba(255,255,255,0.05);
        }

        .nutrient-symbol {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 0.75rem;
          font-family: 'Playfair Display', serif;
        }

        .nutrient-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 6px;
        }

        .nutrient-input {
          width: 100%;
          background: none;
          border: none;
          outline: none;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          padding: 0;
        }

        .nutrient-input::placeholder { color: rgba(255,255,255,0.15); }

        .nutrient-hint {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.2);
          margin-top: 4px;
        }

        .btn-submit {
          width: 100%;
          background: linear-gradient(135deg, #7c3aed, #c084fc);
          color: white;
          font-weight: 600;
          font-size: 1rem;
          padding: 14px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 0 30px rgba(192, 132, 252, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 0 50px rgba(192, 132, 252, 0.35);
        }

        .btn-submit:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
          flex-shrink: 0;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .result-card {
          margin-top: 1.5rem;
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(192, 132, 252, 0.05));
          border: 1px solid rgba(192, 132, 252, 0.2);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
        }

        .result-label {
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.75rem;
        }

        .result-value {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #c084fc;
          line-height: 1.3;
        }
      `}</style>

      <motion.div className="fert-container" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="fert-badge"><FaFlask /> Fertilizer AI</div>
        <h1 className="fert-title"><em>Fertilizer</em> Recommendation</h1>
        <p className="fert-sub">Enter your soil's NPK nutrient levels and get an AI-powered fertilizer recommendation tailored to your crop needs.</p>

        <div className="divider" />

        <form onSubmit={handleSubmit}>
          <div className="nutrients-grid">
            {nutrients.map((n) => (
              <div
                key={n.name}
                className="nutrient-field"
                style={{ borderColor: form[n.name] ? n.glow.replace("0.15", "0.3") : undefined }}
              >
                <div className="nutrient-symbol" style={{ background: n.glow, color: n.color }}>
                  {n.symbol}
                </div>
                <div className="nutrient-label">{n.label}</div>
                <input
                  type="number"
                  name={n.name}
                  placeholder="0"
                  value={form[n.name]}
                  onChange={handleChange}
                  className="nutrient-input"
                  style={{ caretColor: n.color }}
                />
                <div className="nutrient-hint">{n.hint}</div>
              </div>
            ))}
          </div>

          <button type="submit" className="btn-submit" disabled={!isValid || loading}>
            {loading ? (
              <><span className="spinner" /> Analyzing nutrients...</>
            ) : (
              <><FaFlask /> Get Recommendation</>
            )}
          </button>
        </form>

        <AnimatePresence>
          {result && (
            <motion.div
              className="result-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <FaCheckCircle style={{ color: "#c084fc", fontSize: "2rem", marginBottom: "0.75rem" }} />
              <p className="result-label">Recommended Fertilizer</p>
              <div className="result-value">{result}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Fertilizer;