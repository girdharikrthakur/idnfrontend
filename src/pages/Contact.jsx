import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveMessage } from "../api/contact";
export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await saveMessage(form);
      console.log(res.data);
      navigate("/contact");
    } catch (error) {
      setError(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="p-8 space-y-4 flex justify-center items-center min-h-full bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">
                Enter your name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium"> Enter Email</label>
              <input
                type="email"
                name="email"
                placeholder="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label>Message</label>
              <textarea
                name="message"
                placeholder="message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 h-40 focus:ring-blue-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
