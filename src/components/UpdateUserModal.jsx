import React, { useState } from 'react';
import { useUpdateUserRoleMutation } from '../redux/auth/authApi';

export default function UpdateUserModal({ user, onClose, onRoleUpdate }) {
    console.log('Modal props:', user);
    const [role, setRole] = useState(user?.role);

    const [updateUserRole] = useUpdateUserRoleMutation();

    const handleUpdateRole = async () => {
        try {
            // Ensure userId is correctly passed as a string
            const userId = user?._id;
    
            if (!userId) {
                alert("User ID is missing. Cannot update the role.");
                return;
            }
    
            // Update the role via the API
            await updateUserRole({ userId, role }).unwrap();
    
            alert("User role updated successfully");
            onRoleUpdate();
            onClose();
        } catch (error) {
            console.error("Failed to update user role", error);
            alert("Error updating role. Please try again.");
        }
    };
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-96 max-w-full'>
                <h2 className='text-2xl font-semibold mb-6 text-center'>Edit User</h2>
                <div className='mb-6'>
                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                    <input
                        type="text"
                        value={user?.email}
                        readOnly
                        className='mt-1 w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none'
                    />
                </div>
                <div className='mb-6'>
                    <label className='block text-sm font-medium text-gray-700'>Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className='mt-1 w-full bg-orange-200 border border-gray-300 rounded-md py-2 px-4 focus:outline-none'
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className='flex justify-between'>
                    <button onClick={onClose} className='bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-400'>
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateRole}
                        disabled={role === user?.role}
                        className={`bg-orange-400 text-white px-6 py-2 rounded-lg hover:bg-orange-300 ${role === user?.role ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
