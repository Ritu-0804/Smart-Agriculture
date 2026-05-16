import {
  FaTemperatureHigh,
  FaWind,
  FaTint,
  FaCloudSun
} from "react-icons/fa";

function WeatherCard({ weather }) {

  return (
    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl text-center hover:scale-105 transition duration-300">

      <div className="flex justify-center mb-6">
        <div className="bg-blue-500/20 p-5 rounded-full">
          <FaCloudSun className="text-6xl text-yellow-300" />
        </div>
      </div>

      <h2 className="text-4xl font-bold text-blue-300 mb-10">
        Live Weather Report
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-black/20 p-6 rounded-2xl">
          <FaTemperatureHigh className="text-4xl text-red-400 mx-auto mb-3" />

          <h3 className="text-lg font-semibold">
            Temperature
          </h3>

          <p className="text-2xl mt-2">
            {weather.temperature}°C
          </p>
        </div>

        <div className="bg-black/20 p-6 rounded-2xl">
          <FaTint className="text-4xl text-cyan-300 mx-auto mb-3" />

          <h3 className="text-lg font-semibold">
            Humidity
          </h3>

          <p className="text-2xl mt-2">
            {weather.humidity}%
          </p>
        </div>

        <div className="bg-black/20 p-6 rounded-2xl">
          <FaWind className="text-4xl text-green-300 mx-auto mb-3" />

          <h3 className="text-lg font-semibold">
            Wind Speed
          </h3>

          <p className="text-2xl mt-2">
            {weather.wind_speed} km/h
          </p>
        </div>

      </div>

      <p className="mt-8 text-green-300 text-xl font-semibold">
        {weather.condition}
      </p>

    </div>
  );
}

export default WeatherCard;