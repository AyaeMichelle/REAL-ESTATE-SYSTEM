import React, { useState } from "react";
import { useAllListingsQuery, useDeleteListingMutation } from "../redux/auth/listingApi";
import { FaBath, FaBed, FaCar, FaCouch, FaTag } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsCalendarEvent } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";
import { Link } from 'react-router-dom';

const ManageListings = () => {
  const [query, setQuery] = useState({ search: "", category: "" });
  const [limit, setLimit] = useState(8); // Initialize limit to show 8 listings
  const { data, error, isLoading, refetch } = useAllListingsQuery(query);
  const listings = data?.listings || [];
  const [deleteListing] = useDeleteListingMutation();
 

  console.log("Listings data:", listings); 

  const handleDelete = async (id) => {
    try {
      const confirmation = window.confirm("Are you sure you want to delete this listing?");
      if (confirmation) {
        const response = await deleteListing(id).unwrap();
        alert("Listing successfully deleted"); // Show success message
        refetch(); // Refetch listings after deletion
      }
    } catch (error) {
      console.error("Failed to delete listing:", error);
    }
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("Error loading listings:", error);
    return <div>Error loading listings.</div>;
  }

  // Sort listings by recently added (assume listings have a 'createdAt' field)
  const sortedListings = [...listings].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Limit listings to the current limit
  const visibleListings = sortedListings.slice(0, limit);

  const handleShowMore = () => {
    setLimit((prevLimit) => prevLimit + 8); // Increase limit by 8
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {visibleListings.map((listing) => {
          const formattedDate = listing.createdAt
            ? formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true })
            : "Date not available";

          return (
            <div
              key={listing.id}
              className="relative bg-white rounded-lg shadow-md overflow-hidden group"
            >
              {/* Listing Image with Black Overlay */}
              <div className="relative">
                <img
                  src={listing.imageUrls[0] || "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"}
                  alt="listing cover"
                  className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-top text-white text-lg font-bold">
                  <p className="truncate w-full">{listing.name}</p>
                </div>
              </div>

              {/* Listing Status */}
              {listing.status && (
                <span
                  className={`absolute top-2 right-2 px-3 py-1 rounded-full text-white text-xs font-semibold ${listing.status.trim().toLowerCase() === "sold" ? "bg-red-600" : "bg-orange-500"}`}
                >
                  {listing.status}
                </span>
              )}

              {/* Overlay Buttons */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center gap-4">
              <Link to={`/update-listing/${listing._id}`}>
                      <button className="px-4 py-2 bg-green-700 text-white font-semibold rounded-lg shadow hover:bg-green-800">Edit</button>
                </Link>
               <button
                 onClick={() => handleDelete(listing._id)}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600"
                >
                   Delete
                 </button>
                </div>

              {/* Listing Details */}
              <div className="p-4 flex justify-between items-center text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <FaBed className="text-blue-500" />
                  <span>{listing.bedrooms || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaBath className="text-blue-500" />
                  <span>{listing.bathrooms || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCar className="text-blue-500" />
                  <span>{listing.parking ? "Yes" : "No"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCouch className="text-blue-500" />
                  <span>{listing.furnished ? "Yes" : "No"}</span>
                </div>
              </div>

              {/* New Information: Address, Property Type, and Date */}
              <div className="px-4 pb-4 text-gray-600 text-xs">
                {/* Location */}
                <div className="flex items-center gap-1">
                  <MdLocationOn className="text-green-700" />
                  <span>{listing.address}</span>
                </div>
                {/* Property Type */}
                <div className="flex items-center gap-1">
                  <FaTag className="text-orange-700" />
                  <span>{listing.propertyType || "Type not available"}</span>
                </div>
                {/* Date */}
                <div className="flex items-center gap-1">
                  <BsCalendarEvent className="text-orange-300" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More Button */}
      {limit < listings.length && (
        <div className="text-center mt-6">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-orange-400 text-white font-semibold rounded-lg shadow hover:bg-orange-600"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageListings;
