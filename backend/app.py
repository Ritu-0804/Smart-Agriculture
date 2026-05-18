from flask import Flask
from flask_cors import CORS

# Routes
from routes.soil_routes import soil_bp
from routes.crop_routes import crop_bp
from routes.weather_routes import weather_bp
from routes.fertilizer_routes import fertilizer_bp
# from routes.disease_routes import disease_bp

app = Flask(__name__)

# Enable CORS
CORS(app)

# Register Blueprints
app.register_blueprint(soil_bp)
app.register_blueprint(crop_bp)
app.register_blueprint(weather_bp)
app.register_blueprint(fertilizer_bp)
# app.register_blueprint(disease_bp)

# Home Route
@app.route("/")
def home():
    return {
        "message": "Smart Agriculture Assistant Backend Running 🚀"
    }

# Run App
if __name__ == "__main__":

    import os

    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port
    )a