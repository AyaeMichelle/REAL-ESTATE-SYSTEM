import { NavLink} from "react-router-dom";
import { FaUserCog,FaSignOutAlt, FaTrashAlt} from "react-icons/fa"; // Icon for Admin section
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  logOutUserStart,
  logOutUserSuccess,
  logOutUserFailure,
} from "../redux/user/userSlice";

export default function UserSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
   // React Router's navigation hook

  // Handle Logout
  const handleLogOut = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        dispatch(logOutUserStart());
        const res = await fetch('/api/auth/logout');
        const data = await res.json();
        if (data.success === false) {
          dispatch(logOutUserFailure(data.message));
          return;
        }
        dispatch(logOutUserSuccess(data));
      } catch (error) {
        dispatch(logOutUserFailure(error.message));
      }
    }
  };
// Handle Delete User
const handleDeleteUser = async () => {
  if (
    window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    )
  ) {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
      // Redirect to a sign up page
      window.location.href = "/sign-up";
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }
};


  return (
    <div className="flex-grow">
    <div className="flex justify-between h-full">
      {/* Sidebar */}
      <div className="flex flex-col w-72 p-4 border-r border-gray-300">
        {/* Admin Avatar and Title */}
        <div className="flex flex-col items-center mb-6">
          <FaUserCog className="text-gray-600 text-4xl" />
          <h2 className="text-lg font-bold text-orange-400 mt-2">
            User Dashboard
          </h2>
        </div>
        <hr className="border-t-2 border-orange-400 mb-4" />

        {/* Sidebar Links */}
        <NavLink
          to="/dashboard?tab=profile"
          className="p-1 text-gray-700 mb-1 hover:text-orange-400"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard?tab=create-listing"
          className="p-1 text-gray-700 mb-1 hover:text-orange-400"
        >
          Create Listings
        </NavLink>
        <NavLink
          to="/dashboard?tab=show-listings"
          className="p-1 text-gray-700 mb-1 hover:text-orange-400"
        >
          Show Listings
        </NavLink>
        
        {/* Profile Section */}
        <div className="mt-auto ">
        <div className="flex flex-col items-center mt-auto mb-4">
          <img
            src={currentUser?.avatar || "https://via.placeholder.com/80"}
            alt="Profile"
            className="w-16 h-16 rounded-full mb-2"
          />
          <p className="text-gray-700">{currentUser?.username}</p>
          <p className="text-gray-500 text-sm">{currentUser?.email}</p>
        </div>

        {/* Logout and Delete Buttons */}
        <div className="grid grid-cols-2 gap-6">
        <button
          onClick={handleLogOut}
          className="w-full px-1 bg-gray-800 text-white rounded flex items-center justify-start gap-2 text-sm"
        >
          <FaSignOutAlt className="text-lg" />
          Logout
        </button>
        <button
          onClick={handleDeleteUser}
          className="w-full  px-2 bg-red-600 text-white rounded flex items-center justify-start gap-2 text-sm"
>
          <FaTrashAlt className="text-lg" /> {/* Adjust the icon size as needed */}
          Delete Account
        </button>
      </div>
      </div>
    </div>
   </div>
   </div>
  );
}
