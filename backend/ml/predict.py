import joblib
import numpy as np

import os
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "crop_model.pkl")

model = joblib.load(model_path)

def recommend_crop(features):

    data = np.array([features])

    prediction = model.predict(data)[0]

    probability = model.predict_proba(data)

    confidence = round(
        np.max(probability) * 100,
        2
    )

    return prediction, confidence