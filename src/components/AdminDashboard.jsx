import React, { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { FaHome, FaRegComment } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { useGetUserQuery } from "../redux/auth/authApi";
import { useTotalReviewsCountQuery } from "../redux/auth/reviewApi";
import { useTotalListingsCountQuery, useGetListingsQuery } from "../redux/auth/listingApi"; // Import useGetListingsQuery
import ListingsChart from "./ListingsChart";

const Dashboard = () => {
  const [query, setQuery] = useState({ search: "", category: "" });

  // Fetch users data
  const { data: users = {}, isLoading: usersLoading } = useGetUserQuery(query);
  const adminCounts = users.users?.filter((user) => user.role === "admin").length;

  // Fetch total listings count
  const { data: listingsCountData = {}, isLoading: listingsCountLoading, error: listingsCountError } = useTotalListingsCountQuery();

  // Fetch total reviews count
  const { data: ReviewsCountData = {}, isLoading: ReviewsCountLoading, error: ReviewsCountError } = useTotalReviewsCountQuery();

  // Fetch listings data for the chart
  const { data: listings = [], isLoading: listingsLoading } = useGetListingsQuery();

  if (usersLoading || listingsCountLoading || ReviewsCountLoading || listingsLoading) {
    return <p>Loading...</p>;
  }

  // Handle errors
  if (listingsCountError || ReviewsCountError) {
    return <p>Error fetching data</p>;
  }

  // Extract count from the data
  const totalListingsCount = listingsCountData || 0;
  const totalReviewsCount = ReviewsCountData?.count || 0;

  return (
    <div className="space-y-6">
      <div className="bg-bgPrimary p-5">
        <h1>Hi, Admin!</h1>
        <p>Welcome to the admin dashboard</p>
        <p>Here you can manage users, listings, admins, and reviews</p>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-col md:flex-row justify-center gap-8 pt-8">
        {/* Users Card */}
        <div className="bg-green-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
          <FiUsers className="size-8 text-orange-500" />
          <p>{users.users?.length} Users</p> {/* Display the total users count */}
        </div>

        {/* Listings Card */}
        <div className="bg-slate-600 py-6 w-full text-white rounded-sm space-y-1 flex flex-col items-center">
          <FaHome className="size-8 text-orange-500" />
          <p>{totalListingsCount} Listings</p> {/* Display total listings count */}
        </div>

        {/* Admins Card */}
        <div className="bg-green-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
          <RiAdminLine className="size-8 text-orange-500" />
          <p>
            {adminCounts} Admin{adminCounts !== 1 ? "s" : ""}
          </p>{" "}
          {/* Display the count of admins */}
        </div>

        {/* Feedbacks Card */}
        <div className="bg-slate-600 py-6 w-full text-white rounded-sm space-y-1 flex flex-col items-center">
          <FaRegComment className="size-8 text-orange-500" />
          <p>{totalReviewsCount} Feedbacks</p> {/* Display total reviews count */}
        </div>
      </div>

      {/* Graphs and Charts */}
      <div className="pt-5 pb-5">
        <ListingsChart listings={listings} /> {/* Pass the fetched listings data */}
      </div>
    </div>
  );
};

export default Dashboard;
