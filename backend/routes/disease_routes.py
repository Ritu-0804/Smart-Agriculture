from flask import Blueprint, request, jsonify
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

disease_bp = Blueprint("disease", __name__)

# Load trained model
model = load_model(
    "disease_model/disease_model.h5"
)

# Load class names
with open(
    "disease_model/class_names.txt"
) as f:

    class_names = [line.strip() for line in f.readlines()]

@disease_bp.route(
    "/predict-disease",
    methods=["POST"]
)
def predict_disease():

    try:

        image = request.files["image"]

        img = Image.open(image).convert("RGB")

        img = img.resize((224, 224))

        img_array = np.array(img)

        img_array = img_array / 255.0

        img_array = np.expand_dims(
            img_array,
            axis=0
        )

        prediction = model.predict(img_array)

        predicted_index = np.argmax(prediction)

        confidence = float(
            prediction[0][predicted_index]
        ) * 100

        disease = class_names[predicted_index]

        return jsonify({
            "disease": disease,
            "confidence": round(confidence, 2)
        })

    except Exception as e:

        print(e)

        return jsonify({
            "error": "Prediction failed"
        }), 500