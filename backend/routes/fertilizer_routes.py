from flask import Blueprint, request, jsonify

fertilizer_bp = Blueprint("fertilizer", __name__)

@fertilizer_bp.route("/fertilizer", methods=["POST"])
def fertilizer():

    data = request.json

    nitrogen = float(data["nitrogen"])
    phosphorus = float(data["phosphorus"])
    potassium = float(data["potassium"])

    recommendation = ""

    if nitrogen < 50:
        recommendation = "Use Urea or Organic Compost to increase Nitrogen."

    elif phosphorus < 40:
        recommendation = "Use DAP fertilizer to improve Phosphorus."

    elif potassium < 40:
        recommendation = "Use Potash fertilizer to improve Potassium."

    else:
        recommendation = "Soil nutrients are balanced. Use organic compost for maintenance."

    return jsonify({
        "recommendation": recommendation
    })