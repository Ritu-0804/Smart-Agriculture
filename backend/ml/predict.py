import joblib
import numpy as np

model = joblib.load("ml/crop_model.pkl")

def recommend_crop(features):

    data = np.array([features])

    prediction = model.predict(data)[0]

    probability = model.predict_proba(data)

    confidence = round(
        np.max(probability) * 100,
        2
    )

    return prediction, confidence