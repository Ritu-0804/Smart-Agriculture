from flask import Blueprint, request, jsonify

soil_bp = Blueprint("soil", __name__)

@soil_bp.route("/predict-soil", methods=["POST"])
def predict_soil():

    data = request.json

    ph = float(data["ph"])

    if ph < 5:
        fertility = "Low Fertility"
    elif ph < 7:
        fertility = "Medium Fertility"
    else:
        fertility = "High Fertility"

    return jsonify({
        "fertility": fertility
    })