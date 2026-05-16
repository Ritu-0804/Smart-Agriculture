from flask import Blueprint, request, jsonify
from ml.predict import recommend_crop

crop_bp = Blueprint("crop", __name__)

@crop_bp.route("/recommend-crop", methods=["POST"])
def recommend():

    try:

        data = request.json

        features = [
            float(data["nitrogen"]),
            float(data["phosphorus"]),
            float(data["potassium"]),
            float(data["temperature"]),
            float(data["humidity"]),
            float(data["ph"]),
            float(data["rainfall"])
        ]

        crop, confidence = recommend_crop(features)

        return jsonify({
            "crop": crop,
            "confidence": confidence
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500