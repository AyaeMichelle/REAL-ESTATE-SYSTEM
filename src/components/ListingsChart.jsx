import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const formatData = (listings = []) => {
  console.log("Listings Data:", listings); // Debugging the input

  // Group listings by date
  const groupedByDate = listings.reduce((acc, listing) => {
    const date = new Date(listing.CreatedAt).toLocaleDateString(); // Debug: Replace with simple date formatting
    if (!acc[date]) {
      acc[date] = { posts: 0, views: 0 };
    }
    acc[date].posts += 1;
    acc[date].views += listing.listingViews || 0;
    return acc;
  }, {});

  const formattedData = Object.entries(groupedByDate).map(([date, { posts, views }]) => ({
    name: date,
    pv: views,
    posts,
  }));

  console.log("Formatted Data:", formattedData); // Debugging the output
  return formattedData;
};

const ListingsChart = ({ listings }) => {
  const data = formatData(listings);
  console.log("Chart Data:", data); // Final data passed to the chart

  return (
    <div className="p-6 bg-slate-600 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Listings Chart!</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="posts" // Make sure this matches the data property
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ListingsChart;
