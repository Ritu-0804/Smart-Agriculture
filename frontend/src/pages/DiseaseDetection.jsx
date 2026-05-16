import { useState } from "react";
import API from "../services/api";
import { FaBug, FaUpload, FaCheckCircle, FaImage } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function DiseaseDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleImageChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);
    try {
      setLoading(true);
      const response = await API.post("/predict-disease", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (error) {
      console.log(error);
      alert("Prediction failed");
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

        .dd-container { width: 100%; max-width: 680px; }

        .dd-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(248, 113, 113, 0.08);
          border: 1px solid rgba(248, 113, 113, 0.2);
          color: #f87171;
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
        }

        .dd-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          color: white;
          margin: 0 0 0.75rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .dd-title em { color: #f87171; font-style: italic; }

        .dd-sub {
          color: rgba(255,255,255,0.4);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .drop-zone {
          border: 2px dashed rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 3rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          background: rgba(255,255,255,0.02);
        }

        .drop-zone.dragging,
        .drop-zone:hover {
          border-color: rgba(248, 113, 113, 0.4);
          background: rgba(248, 113, 113, 0.04);
        }

        .drop-zone input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }

        .drop-icon {
          font-size: 2.5rem;
          color: rgba(255,255,255,0.2);
          margin-bottom: 1rem;
        }

        .drop-text {
          color: rgba(255,255,255,0.5);
          font-size: 0.9rem;
        }

        .drop-hint {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.25);
          margin-top: 6px;
        }

        .preview-section {
          margin-top: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1.25rem;
        }

        .preview-img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 12px;
          border: 2px solid rgba(248,113,113,0.3);
          flex-shrink: 0;
        }

        .preview-info h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: white;
          margin: 0 0 4px;
        }

        .preview-info p {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
          margin: 0;
        }

        .btn-detect {
          width: 100%;
          margin-top: 1.25rem;
          background: linear-gradient(135deg, #dc2626, #f87171);
          color: white;
          font-weight: 600;
          font-size: 1rem;
          padding: 14px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 0 30px rgba(248, 113, 113, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-detect:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 0 50px rgba(248, 113, 113, 0.35);
        }

        .btn-detect:disabled {
          opacity: 0.5;
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
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .result-card {
          margin-top: 1.5rem;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(248, 113, 113, 0.05));
          border: 1px solid rgba(248, 113, 113, 0.2);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
        }

        .result-label {
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.5rem;
        }

        .result-disease {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #f87171;
          margin-bottom: 1rem;
        }

        .confidence-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          max-width: 300px;
          margin: 0 auto;
        }

        .conf-bar {
          flex: 1;
          height: 6px;
          background: rgba(255,255,255,0.08);
          border-radius: 3px;
          overflow: hidden;
        }

        .conf-fill {
          height: 100%;
          background: linear-gradient(90deg, #dc2626, #f87171);
          border-radius: 3px;
        }

        .conf-pct {
          font-size: 0.875rem;
          font-weight: 600;
          color: #f87171;
          white-space: nowrap;
        }
      `}</style>

      <motion.div className="dd-container" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="dd-badge"><FaBug /> Disease Detection</div>
        <h1 className="dd-title">Plant <em>Disease</em> Scanner</h1>
        <p className="dd-sub">Upload a photo of your plant leaf and our AI will instantly identify any diseases and provide treatment recommendations.</p>

        <div
          className={`drop-zone ${dragging ? "dragging" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div className="drop-icon"><FaImage /></div>
          <p className="drop-text">Drag & drop a leaf image or <strong style={{ color: "#f87171" }}>browse</strong></p>
          <p className="drop-hint">JPG, PNG, WEBP — max 10MB</p>
        </div>

        <AnimatePresence>
          {preview && (
            <motion.div className="preview-section" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <img src={preview} alt="Preview" className="preview-img" />
              <div className="preview-info">
                <h4>Image Ready</h4>
                <p>Click "Detect Disease" to analyze</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button className="btn-detect" onClick={handleUpload} disabled={!image || loading}>
          {loading ? (
            <><span className="spinner" /> Analyzing...</>
          ) : (
            <><FaBug /> Detect Disease</>
          )}
        </button>

        <AnimatePresence>
          {result && (
            <motion.div className="result-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <FaCheckCircle style={{ color: "#f87171", fontSize: "2rem", marginBottom: "0.75rem" }} />
              <p className="result-label">Detected Condition</p>
              <div className="result-disease">{result.disease}</div>
              <div className="confidence-row">
                <div className="conf-bar">
                  <div className="conf-fill" style={{ width: `${result.confidence}%` }} />
                </div>
                <span className="conf-pct">{result.confidence}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default DiseaseDetection;