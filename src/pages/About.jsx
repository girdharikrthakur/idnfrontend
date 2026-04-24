import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-gray-600 text-white min-h-screen px-6 py-12">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
        >
          About IDN News
        </motion.h1>

        <p className="text-gray-300 text-lg">
          Delivering fast, reliable, and impactful news from around the world.
          IDN News is built to keep you informed with truth, clarity, and speed.
        </p>
      </section>

      {/* Divider */}
      <div className="w-24 h-1 bg-white mx-auto my-10"></div>

      {/* Mission + Vision */}
      <section className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Our Mission
          </h2>
          <p className="text-gray-300">
            To provide accurate, unbiased, and real-time news that empowers
            individuals to make informed decisions in a rapidly changing world.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-2xl font-semibold text-white mb-3">Our Vision</h2>
          <p className="text-gray-300">
            To become a trusted global platform for news, combining technology
            and journalism to deliver information without noise or
            misinformation.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          Why Choose IDN News?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">⚡ Fast Updates</h3>
            <p className="text-gray-400">
              Get real-time updates as events unfold across the globe.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">🧠 Reliable Sources</h3>
            <p className="text-gray-400">
              Verified and trusted information from credible sources.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">🌍 Global Coverage</h3>
            <p className="text-gray-400">
              Stay informed about events happening worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <section className="mt-16 text-center max-w-3xl mx-auto">
        <p className="text-lg italic text-gray-400">
          “News is not just information — it’s the power to understand the
          world.”
        </p>
      </section>
    </div>
  );
}
