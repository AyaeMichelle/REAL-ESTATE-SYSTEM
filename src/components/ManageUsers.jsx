import { useEffect, useState } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users"); // Ensure this is your correct endpoint
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to fetch users:", response.status, errorText);
          throw new Error(`Failed to fetch users. Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    console.log(`Edit user with ID: ${userId}`);
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`/api/users/delete/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
          alert("User deleted successfully");
        } else {
          alert("Failed to delete user");
        }
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user");
      }
    }
  };
  return (
    <div className="flex-grow w-full bg-white">
      <div className="w-full max-w-full mx-auto mt-2">
        {/* Title */}
        <h2 className="text-xl font-bold mb-4">ALL USERS</h2>
        {loading && <p>Loading users...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-600 text-orange-400 uppercase text-sm leading-normal">
                  <th className="px-6 py-3 border-b border-gray-300">User No</th>
                  <th className="px-6 py-3 border-b border-gray-300">Summary</th>
                  <th className="px-6 py-3 border-b border-gray-300">Listings</th>
                  <th className="px-6 py-3 border-b border-gray-300 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 border-b border-gray-300`}
                  >
                    <td className="px-6 py-3 text-sm border-r border-gray-200">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3 text-sm border-r border-gray-200">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar || "https://via.placeholder.com/40"}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-orange-400">{user.username}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm border-r border-gray-200">
                      {user.listings || 0}
                    </td>
                    <td className="px-6 py-3 text-center">
                       
                        <div className='flex flex-col item-center'>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className='text-red-700 uppercase'
                        >
                          Delete
                        </button>
                          <button
                            onClick ={()=> handleEdit(user._id)}
                           className='text-green-700 uppercase'>Edit</button>
                      </div>
                      
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
