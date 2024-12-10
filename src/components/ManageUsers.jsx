import React, { useState } from 'react';
import { useDeleteUserMutation, useGetUserQuery } from '../redux/auth/authApi';
import { MdModeEdit } from 'react-icons/md';
import UpdateUserModal from './UpdateUserModal';

export default function ManageUsers() {
  const [query, setQuery] = useState({ search: "", category: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, isLoading, refetch } = useGetUserQuery(query);
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    try {
      const confirmation = window.confirm("Are you sure you want to delete this user?");
      if (confirmation) {
        await deleteUser(id).unwrap();
        alert("User deleted successfully");
        refetch();
      }
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user); // Update selected user state
    setIsModalOpen(true); // Open the modal
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching users</p>;

  // Default to an empty array if data is not valid
  const users = Array.isArray(data) ? data : data?.users || [];

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Edit</th>
            <th className="border px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id || user._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{user?.email}</td>
              <td className="border px-4 py-2">
                <span
                  className={`rounded-full py-1 px-3 ${
                    user?.role === "admin" ? "bg-orange-400 text-white" : "bg-amber-300"
                  }`}
                >
                  {user?.role}
                </span>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="flex items-center gap-1 text-blue-600"
                >
                  <MdModeEdit /> Edit
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(user?._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* Show the UpdateUserModal when the modal is open */}
      {isModalOpen && selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}  // Close the modal when clicked
          onRoleUpdate={refetch}      // Call handleRoleUpdate to refetch the user list
        />
      )}
    </div> 
       
  );
}
