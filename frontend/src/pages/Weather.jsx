import { useEffect, useState } from "react";
import API from "../services/api";
import WeatherCard from "../components/WeatherCard";
import { FaCloudSun } from "react-icons/fa";
import { motion } from "framer-motion";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const response = await API.get("/weather");
      setWeather(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #020d05 0%, #021524 50%, #020d05 100%)",
      fontFamily: "'DM Sans', sans-serif",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 1.5rem",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        .weather-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(96, 165, 250, 0.08);
          border: 1px solid rgba(96, 165, 250, 0.2);
          color: #60a5fa;
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
        }

        .weather-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: white;
          margin: 0 0 0.75rem;
          letter-spacing: -0.02em;
        }

        .weather-title em { color: #60a5fa; font-style: italic; }

        .weather-sub {
          color: rgba(255,255,255,0.4);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 3rem;
        }

        .weather-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: rgba(255,255,255,0.4);
          font-size: 0.875rem;
        }

        .weather-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(96, 165, 250, 0.15);
          border-top-color: #60a5fa;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <motion.div style={{ textAlign: "center", maxWidth: 680, width: "100%" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="weather-badge"><FaCloudSun /> Live Weather</div>
        <h1 className="weather-title"><em>Real-Time</em> Weather</h1>
        <p className="weather-sub">Current weather conditions to help you plan your farming activities and irrigation schedule.</p>

        {loading && (
          <div className="weather-loading">
            <div className="weather-spinner" />
            Fetching weather data...
          </div>
        )}

        {!loading && weather && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <WeatherCard weather={weather} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Weather;