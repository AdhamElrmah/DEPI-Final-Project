import React, { useState, useEffect, useCallback } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../UI/select";
import ConfirmDialog from "../UI/ConfirmDialog";
import { getAllUsers, updateUser, deleteUser } from "../../lib/getUsers";

export default function UsersManagement({ user }) {
  const [message, setMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingUserId, setPendingUserId] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      const data = await getAllUsers(user.token);
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setMessage({ type: "error", text: "Failed to fetch users" });
    }
  }, [user.token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUser(userId, { role: newRole }, user.token);
      setMessage({ type: "success", text: "User role updated successfully!" });
      await fetchUsers();
    } catch (err) {
      setMessage({
        type: "error",
        text: err?.response?.data?.error || "Failed to update user role",
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId, user.token);
      setMessage({ type: "success", text: "User deleted successfully!" });
      await fetchUsers();
    } catch (err) {
      setMessage({
        type: "error",
        text: err?.response?.data?.error || "Failed to delete user",
      });
    }
  };

  const openDeleteConfirm = (userId) => {
    setPendingUserId(userId);
    setConfirmOpen(true);
  };

  return (
    <div>
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Manage Users</h2>

        <ConfirmDialog
          open={confirmOpen}
          setOpen={(v) => {
            setConfirmOpen(v);
            if (!v) setPendingUserId(null);
          }}
          title="Delete User"
          description={
            users.find((u) => u.id === pendingUserId)
              ? `Are you sure you want to delete ${
                  users.find((u) => u.id === pendingUserId).name
                }? This action cannot be undone.`
              : "Are you sure you want to delete this user? This action cannot be undone."
          }
          onConfirm={() => {
            if (pendingUserId) handleDeleteUser(pendingUserId);
          }}
          confirmText="Delete"
          cancelText="Cancel"
        />

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {u.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {u.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Select
                        value={u.role}
                        onValueChange={(value) => handleRoleChange(u.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {u.id !== user.id && (
                        <button
                          onClick={() => openDeleteConfirm(u.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

