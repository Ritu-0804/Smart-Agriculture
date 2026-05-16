# Smart Agriculture Assistant 🌾🤖

An AI-powered Smart Agriculture web application that helps farmers and agriculture enthusiasts make better farming decisions using Machine Learning, Weather Forecasting, and AI-powered tools.

---

# 🚀 Features

## 🌱 Soil Analysis
- Analyze soil nutrients
- Input Nitrogen, Phosphorus, Potassium values
- Smart soil recommendations

---

## 🌾 Crop Recommendation System
- Predict the best crop based on soil conditions
- Machine Learning powered predictions
- Trained using real agriculture datasets

---

## 🌦 Weather Forecast
- Live weather information
- Temperature
- Wind speed
- Farming-friendly weather insights

---

## 🧪 Fertilizer Recommendation
- Suggests suitable fertilizers
- Based on soil nutrient deficiency
- Organic and chemical fertilizer suggestions

---

## 🌿 Plant Disease Detection
- Upload crop leaf images
- AI predicts plant diseases
- Built using TensorFlow + MobileNetV2
- ~80% validation accuracy

---

## 🤖 AI Farming Chatbot
- AI assistant for farming queries
- Built using Groq API + Llama models
- Answers agriculture-related questions instantly

---

# 🛠 Tech Stack

## Frontend
- React.js
- Tailwind CSS
- React Router
- Framer Motion

---

## Backend
- Flask
- Python
- REST APIs

---

## Machine Learning / AI
- TensorFlow
- Keras
- MobileNetV2
- Scikit-learn
- NumPy
- Pandas

---

# 📂 Project Structure

```bash
Smart Agriculture Assistant/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│
├── backend/
│   ├── routes/
│   ├── ml/
│   ├── disease_model/
│   ├── app.py
│   └── requirements.txt

# ⚙️ Complete Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/smart-agriculture-assistant.git
```

---

# 🔧 Backend Setup

## Navigate to Backend Folder

```bash
cd backend
```

---

## Create Virtual Environment

### Windows

```bash
python -m venv venv
```

### Activate Virtual Environment

```bash
venv\Scripts\activate
```

---

## Install Python Dependencies

```bash
pip install -r requirements.txt
```

---

## Run Flask Backend Server

```bash
python app.py
```

Backend will run on:

```bash
http://127.0.0.1:5000
```

---

# 💻 Frontend Setup

## Open New Terminal

Navigate to frontend folder:

```bash
cd frontend
```

---

## Install Node Modules

```bash
npm install
```

---

## Install Additional Frontend Packages

```bash
npm install react-router-dom axios tailwindcss framer-motion react-icons
```

---

## Run React Frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# 🤖 AI Disease Detection Model Setup

## Navigate to Disease Model Folder

```bash
cd backend/disease_model
```

---

## Install AI Dependencies

```bash
pip install tensorflow pillow numpy matplotlib
```

---

## Train Disease Detection Model

```bash
python train_disease_model.py
```

After training completes:

```bash
Disease model trained successfully!
```

Generated files:

```bash
disease_model.h5
class_names.txt
```

---

# 🌦 Weather API Setup

1. Create free account at:

https://openweathermap.org/api

2. Generate API key

3. Add API key inside backend weather route file.

---

# 🤖 Chatbot API Setup

1. Create free Groq account:

https://console.groq.com

2. Generate API key

3. Paste API key inside chatbot popup.

---

# ✅ Project Ready

Now open:

```bash
http://localhost:5173
```

Enjoy the Smart Agriculture Assistant 🌾🤖
