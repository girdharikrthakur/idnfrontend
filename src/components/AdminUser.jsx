import { useEffect, useState } from "react";
import { getUsers } from "../api/adminApis";

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUser = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="bg-gray- p-3 sm:p-6 bg-gray-600">
      <div className="bg-white shadow rounded p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Users</h2>

        {loading && users.length === 0 ? (
          <p className="text-center">Loading...</p>
        ) : Array.isArray(users) && users.length === 0 ? (
          <div className="bg-blue-100 p-4 text-center rounded">
            <h3 className="font-bold">No User Available</h3>
            <p className="text-sm text-gray-500">Create new User</p>
          </div>
        ) : (
          // ✅ Responsive wrapper
          <div className="w-full overflow-x-auto">
            <table className="min-w-[600px] w-full border border-gray-200 text-xs sm:text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 sm:px-4 py-2 border">ID</th>
                  <th className="px-2 sm:px-4 py-2 border">Username</th>
                  <th className="px-2 sm:px-4 py-2 border">Email</th>
                  <th className="px-2 sm:px-4 py-2 border">Role</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="text-center">
                    <td className="px-2 sm:px-4 py-2 border">{user.id}</td>

                    <td className="px-2 sm:px-4 py-2 border">
                      {user.userName || "N/A"}
                    </td>

                    <td className="px-2 sm:px-4 py-2 border break-all">
                      {user.email}
                    </td>

                    <td className="px-2 sm:px-4 py-2 border">
                      {user.role.replace("ROLE_", "")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
