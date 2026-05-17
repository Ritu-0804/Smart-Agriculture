import os
import joblib
import numpy as np

# Get absolute path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Model path
model_path = os.path.join(BASE_DIR, "crop_model.pkl")

# Load model
model = joblib.load(model_path)

# Crop Recommendation Function
def recommend_crop(N, P, K, temperature, humidity, ph, rainfall):

    features = np.array([
        [N, P, K, temperature, humidity, ph, rainfall]
    ])

    prediction = model.predict(features)

    return prediction[0]