function CropCard({ crop, confidence }) {
  return (
    <div className="bg-white/10 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
      <h2 className="text-2xl font-bold text-green-300">
        {crop}
      </h2>

      <p className="mt-2">
        Confidence: {confidence}%
      </p>
    </div>
  );
}

export default CropCard;