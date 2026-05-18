import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SoilAnalysis from "./pages/SoilAnalysis";
import CropRecommendation from "./pages/CropRecommendation";
import Weather from "./pages/Weather";
import Fertilizer from "./pages/Fertilizer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/soil" element={<SoilAnalysis />} />
        <Route path="/crop" element={<CropRecommendation />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/fertilizer" element={<Fertilizer />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;