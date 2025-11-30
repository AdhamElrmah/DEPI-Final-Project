import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../UI/select";
import { Button } from "../UI/button";
import ConfirmDialog from "../UI/ConfirmDialog";
import { getAllUsers, updateUser, deleteUser } from "../../lib/getUsers";

export default function UsersManagement() {
  const { user } = useAuth();
  const [message, setMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingUserId, setPendingUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
                {users
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((u) => (
                  <tr key={u.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {u.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {u.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {u.id !== user.id && (
                        <Select
                          value={u.role}
                          onValueChange={(value) => {
                            const userId = u.id || u._id; // Use _id as fallback
                            if (userId) {
                              handleRoleChange(userId, value);
                            } else {
                              console.error("User has no ID:", u);
                            }
                          }}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {u.id !== user.id && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteConfirm(u.id)}
                          className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        >
                          Remove
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {users.length > itemsPerPage && (
            <div className="flex justify-center mt-6 gap-2 pb-5">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="px-4 py-2 text-sm text-gray-600">
                Page {currentPage} of {Math.ceil(users.length / itemsPerPage)}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(Math.ceil(users.length / itemsPerPage), p + 1)
                  )
                }
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
