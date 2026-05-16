import { useState } from "react";

function SoilForm({ onSubmit }) {

  const [form, setForm] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >

      {Object.keys(form).map((key) => (
        <div key={key}>

          <label className="block mb-2 capitalize text-gray-300">
            {key}
          </label>

          <input
            type="number"
            step="any"
            name={key}
            placeholder={`Enter ${key}`}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />

        </div>
      ))}

      <button className="md:col-span-2 bg-gradient-to-r from-green-500 to-emerald-700 hover:scale-105 transition duration-300 p-4 rounded-2xl text-lg font-bold shadow-xl">
        Analyze Soil
      </button>

    </form>
  );
}

export default SoilForm;