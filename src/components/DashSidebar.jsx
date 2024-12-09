import { useSelector } from "react-redux";
import AdminSidebar from "./AdminSidebar"; // Import Admin Sidebar
import UserSidebar from "./UserSidebar";   // Import User Sidebar


export default function DashSidebar() {
  const { currentUser } = useSelector((state) => state.user);

  // Conditionally render based on user role
  return (
    <div className="flex flex-col h-full p-4">
      {currentUser?.role === 'admin' ? (
        <AdminSidebar currentUser={currentUser} />
      ) : (
        <UserSidebar currentUser={currentUser} />
      )}
    </div>
  );
}
