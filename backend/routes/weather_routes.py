from flask import Blueprint, jsonify
import requests

weather_bp = Blueprint("weather", __name__)

@weather_bp.route("/weather")
def weather():

    latitude = 28.6139
    longitude = 77.2090

    url = (
        f"https://api.open-meteo.com/v1/forecast?"
        f"latitude={latitude}&longitude={longitude}"
        f"&current=temperature_2m,relative_humidity_2m,windspeed_10m"
    )

    response = requests.get(url)

    data = response.json()

    current = data["current"]

    return jsonify({
        "temperature": current["temperature_2m"],
        "humidity": current["relative_humidity_2m"],
        "wind_speed": current["windspeed_10m"],
        "condition": "Live Weather Data"
    })