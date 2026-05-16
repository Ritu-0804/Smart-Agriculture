from flask import Flask
from flask_cors import CORS

from routes.soil_routes import soil_bp
from routes.crop_routes import crop_bp
from routes.weather_routes import weather_bp
from routes.disease_routes import disease_bp
from routes.fertilizer_routes import fertilizer_bp
app = Flask(__name__)

CORS(app)

app.register_blueprint(soil_bp)
app.register_blueprint(crop_bp)
app.register_blueprint(weather_bp)
app.register_blueprint(fertilizer_bp)
app.register_blueprint(disease_bp)
@app.route("/")
def home():
    return "Smart Agriculture Assistant Backend Running"

if __name__ == "__main__":
    app.run(debug=True)