import React, { useState } from "react";
import { useAllListingsQuery, useDeleteListingMutation } from "../redux/auth/listingApi";
import { FaBath, FaBed, FaCar, FaCouch, FaTag } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsCalendarEvent } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";

const ManageListings = () => {
  const [query, setQuery] = useState({ search: "", category: "" });
  const [limit, setLimit] = useState(8); // Initialize limit to show 8 listings
  const { data: listings = [], error, isLoading } = useAllListingsQuery(query);
  const [deleteListing] = useDeleteListingMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [modalType, setModalType] = useState(""); // "edit" or "delete"

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
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

  const handleModal = (listing, type) => {
    setSelectedListing(listing);
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (modalType === "delete") {
      deleteListing(selectedListing.id); // Trigger delete mutation
    } else if (modalType === "edit") {
      console.log("Edit component triggered for:", selectedListing); // Replace with navigation to update listing component
    }
    setIsModalOpen(false);
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
                  src={
                    listing.imageUrls[0] ||
                    "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
                  }
                  alt="listing cover"
                  className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-lg font-bold">
                  <p className="truncate w-full">{listing.name}</p>
                </div>
              </div>

              {/* Listing Status */}
              {listing.status && (
                <span
                  className={`absolute top-2 right-2 px-3 py-1 rounded-full text-white text-xs font-semibold ${
                    listing.status.trim().toLowerCase() === "sold"
                      ? "bg-red-600"
                      : "bg-orange-500"
                  }`}
                >
                  {listing.status}
                </span>
              )}

              {/* Overlay Buttons */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center gap-4">
                <button
                  onClick={() => handleModal(listing, "edit")}
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleModal(listing, "delete")}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600"
                >
                  Delete
                </button>
              </div>

              {/* Listing Details */}
              <div className="p-4 flex justify-between items-center text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <FaBed className="text-blue-500" />
                  <span>{listing.beds || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaBath className="text-blue-500" />
                  <span>{listing.baths || 0}</span>
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
                  <MdLocationOn className="h-4 w-4 text-green-700" />
                  <p className="text-sm text-gray-600 truncate w-full">{listing.address}</p>
                </div>

                {/* Property Type */}
                <div className="flex items-center gap-1">
                  <FaTag className="h-4 w-4 text-orange-400" />
                  <p className="text-sm text-gray-600 font-semibold">
                    {listing.propertyType || "Type not available"}
                  </p>
                </div>

                {/* Date */}
                <div className="flex items-center gap-1 mt-1">
                  <BsCalendarEvent className="h-4 w-4 text-orange-200" />
                  <p className="text-xs text-gray-500">{formattedDate}</p>
                </div>
              </div>

              {/* Bed and Bath Info */}
              <div className="text-slate-700 flex gap-4 mt-2">
                <div className="font-bold text-xs">
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds`
                    : `${listing.bedrooms} bed`}
                </div>
                <div className="font-bold text-xs">
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths`
                    : `${listing.bathrooms} bath`}
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
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600"
          >
            Show More
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {modalType === "delete"
                ? "Are you sure you want to delete this listing?"
                : "Are you sure you want to edit this listing?"}
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 rounded-lg text-white ${
                  modalType === "delete" ? "bg-red-500" : "bg-blue-500"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageListings;
