import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    userName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      await api.post("/auth/register", form);
      alert("Signup successful ");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setErrorMsg("Signup failed ❌");
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
    <div className="w-full flex justify-center items-center bg-gray-100 py-2">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center">{errorMsg}</p>
        )}

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-4">
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
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="userName"
              placeholder="Enter Username"
              value={form.userName}
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <hr className="flex-1" />
          <span className="text-sm text-gray-500">OR</span>
          <hr className="flex-1" />
        </div>

        {/* SOCIAL LOGIN */}
        <div className="mt-6 flex gap-4 justify-center items-center">
          <button
            onClick={handleGoogleLogin}
            className="p-2 rounded-lg hover:bg-gray-100"
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
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <img
              width="40"
              height="40"
              src="https://img.icons8.com/ios-filled/50/github.png"
              alt="github"
            />
          </button>
        </div>

        {/* LOGIN LINK */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
