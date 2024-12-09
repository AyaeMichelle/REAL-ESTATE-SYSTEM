import React, { useState } from 'react'
import { useUpdateUserRoleMutation } from '../redux/auth/authApi';

export default function UpdateUserModal({user,onClose,onRoleUpdate}) {
    const[role,setRole] =useState(user?.role);

    const [updateUserRole]=useUpdateUserRoleMutation();

    const handleUpdateRole = async () => {
        try {
            await updateUserRole({ userId: user?._id, role }).unwrap();
            alert("User role updated successfully");
            onRoleUpdate();
            onClose();
        } catch (error) {
            console.error("Failed to update user role", error);
            alert("Error updating role. Please try again.");
        }
    };
  return (
    <div className='fixed insert-0 flex items-center justify-center bg-black bg-opacity-50'> 
    <div className='bg-white p-4 rounded shadow-lg w-1/3'>
    <h2 className='text-xl mb-4'>Edit User</h2>
    <div className=' mb-4 space-y-4'>
        <label className='block text-sm font-medium text-gray-700'>Email</label>
        <input  type ="text" value={user?.email} 
        readOnly
        className='mt-1 w-full bg-orange-400 block shadow-sm sm:text-sm border-gray-300 rounded-md py-2
        px-5 focus:outline-none'
        />
    </div>
    <div>
    <div className=' mb-4 space-y-4'>
        <label className='block text-sm font-medium text-gray-700'>Role</label>

       <select value={role} onChange={(e)=> setRole(e.target.value)}
        className='mt-1 w-full bg-orange-400 block shadow-sm sm:text-sm border-gray-300 rounded-md py-2
        px-5 focus:outline-none'
        >
        <option value="user">User</option>
        <option value="admin">Admin</option>
       </select >
    </div>
    </div>
    <div className='flex justify-end pt-5'>
        <button  onClick={onClose} className='bg-gray-500 text-white px-4 rounded py-2 mr-2'> Cancel</button>
        <button 
           onClick={handleUpdateRole}
           disabled={role === user?.role}
           className={`bg-orange-400 text-white px-4 rounded py-2 mr-2 ${role === user?.role ? 'opacity-50 cursor-not-allowed' : ''}`}
           >
         Save
        </button>
    </div>

    </div>
    </div>
  )
} 
