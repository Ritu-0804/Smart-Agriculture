import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import SoilAnalysis from "./pages/SoilAnalysis";
import CropRecommendation from "./pages/CropRecommendation";
import Weather from "./pages/Weather";
import Fertilizer from "./pages/Fertilizer";
import DiseaseDetection from "./pages/DiseaseDetection";
import Chatbot from "./pages/Chatbot";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/soil"
          element={<SoilAnalysis />}
        />

        <Route
          path="/crop"
          element={<CropRecommendation />}
        />

        <Route
          path="/weather"
          element={<Weather />}
        />

        <Route
          path="/fertilizer"
          element={<Fertilizer />}
        />

        <Route
          path="/disease-detection"
          element={<DiseaseDetection />}
        />

        <Route
          path="/chatbot"
          element={<Chatbot />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;