import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ListingsChart = ({ listings }) => {
  // Get the current date and the earliest listing date
  const currentDate = new Date();
  const firstListingDate = new Date(Math.min(...listings.map(listing => new Date(listing.createdAt))));

  // Generate an array of dates between the first listing date and today
  const dateRange = [];
  for (let d = new Date(firstListingDate); d <= currentDate; d.setDate(d.getDate() + 1)) {
    dateRange.push(new Date(d).toISOString().split("T")[0]); // Format: YYYY-MM-DD
  }

  // Aggregate listings by date
  const data = dateRange.map((date) => {
    const count = listings.filter((listing) => new Date(listing.createdAt).toISOString().split("T")[0] === date).length;
    return { date, count };
  });

  // Filter out dates with zero listings
  const filteredData = data.filter((entry) => entry.count > 0);

  // Sort data by date
  filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-white p-4 shadow rounded-md">
      <h2 className="text-lg font-semibold pb-2">Listings Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]} />
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ListingsChart;
