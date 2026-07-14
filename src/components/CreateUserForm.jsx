import { useState } from "react";
import api from "../api/axios";

export default function CreateUserForm({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    userName: "",
    role: "USER",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const meaasgeElement = document.getElementById("alert");
    try {
      await api.post("/api/admin/adduser", form);
      onSuccess();
      meaasgeElement.innerHTML = "User Created Successfully";
      onClose();
    } catch (err) {
      meaasgeElement.innerHTML = "Error in Creating user";
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-opacity-70 z-40 backdrop-blur-lg"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="fixed z-50 top-1/2 left-1/2 bg-white p-6 rounded shadow-2xl w-[90%] max-w-md transform -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()} // prevent close
      >
        <p id="alert" className="text-orange-500 text-xs text-center"></p>
        <h1 className="text-lg font-bold mb-4">Create User</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={form.userName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="USER">ROLE_USER</option>
            <option value="ADMIN">ROLE_ADMIN</option>
            <option value="ADMIN">ROLE_AUTHOR</option>
            <option value="ADMIN">ROLE_MODERATOR</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-3 py-2 bg-orange-500 text-white rounded"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
