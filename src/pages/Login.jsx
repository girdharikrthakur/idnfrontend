import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      console.log("Login response:", res.data);
      localStorage.setItem("accessToken", res.data.accessToken);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        document.getElementById("error").innerHTML = "Login error";
      } else {
        document.getElementById("error").innerHTML = "server not reachable";
      }
    } finally {
      setLoading(false);
    }
  };

  // OAuth Redirects
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };

  return (
    <div className="p-8 space-y-4 flex justify-center items-center min-h-full bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <p id="error"></p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 mt-8">
          <hr className="flex-1" />
          <span className="text-sm text-gray-500">OR</span>
          <hr className="flex-1" />
        </div>

        {/* SOCIAL LOGIN */}
        <div className="mt-10 flex gap-4 justify-center items-center">
          <button
            onClick={handleGoogleLogin}
            className="w-half rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
          >
            <img
              width="40"
              height="40"
              src="https://img.icons8.com/color/480/google-logo.png"
              alt="google-logo"
            />
          </button>

          <button
            onClick={handleGithubLogin}
            className="w-half rounded-lg flex items-center justify-center hover:bg-gray-100"
          >
            <img
              width="40"
              height="40"
              src="https://img.icons8.com/ios-filled/50/github.png"
              alt="github"
            />
          </button>
        </div>

        <p className="text-center text-sm p-4">
          Don't have and Account{" "}
          <Link className="text-blue-600 hover:text-blue-800" to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
