import { useSearchParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import api from "../api/axios"

function CompleteRegistration() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const token = params.get("token")

  const [form, setForm] = useState({
    username: "",
    password: "",   // ✅ FIXED
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await api.post("/auth/complete", {
        ...form,
        token: token,
      })

      console.log("Response:", res.data) // 🔥 debug

      localStorage.setItem("accessToken", res.data.accessToken)
      navigate("/dashboard")

    } catch (error) {
      console.error("Full error:", error)

      // 🔥 show backend message if available
      if (error.response) {
        alert(error.response.data?.message || "Registration failed ❌")
      } else {
        alert("Server not reachable ❌")
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-[400px]">

        <h2 className="text-xl font-bold mb-4">
          Complete Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="password"   // ✅ FIXED (important)
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Complete Registration
          </button>

        </form>
      </div>
    </div>
  )
}

export default CompleteRegistration

