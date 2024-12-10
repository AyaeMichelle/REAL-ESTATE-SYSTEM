import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ListingsChart = ({ listings }) => {
  // Step 1: Normalize and group listings by local date
  const groupedData = listings.reduce((acc, listing) => {
    // Convert createdAt to the local date string (e.g., "YYYY-MM-DD")
    const date = new Date(listing.createdAt)
      .toLocaleDateString("en-CA"); // Ensure "YYYY-MM-DD" format
    if (!acc[date]) {
      acc[date] = 0; // Initialize count for the date
    }
    acc[date] += 1; // Increment count for the date
    return acc;
  }, {});

  // Step 2: Transform grouped data into an array for the chart
  const data = Object.keys(groupedData)
    .map((date) => ({ date, count: groupedData[date] }))
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

  return (
    <div className="bg-white p-4 shadow rounded-md">
      <h2 className="text-lg font-semibold pb-2">Listings Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
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
