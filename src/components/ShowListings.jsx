import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaCar, FaCouch } from 'react-icons/fa'; // Import icons

const ShowListings = ({ listings, error }) => {
  // Move useState to the top level
  const [userListings, setUserListings] = useState([]);

  if (error) {
    return <p className="text-red-500">Error fetching listings. Please try again later.</p>;
  }

  const handleListingDelete = async (listingId) => {
    // Show confirmation dialog
    const userConfirmed = window.confirm("Are you sure you want to delete this listing?");
    
    // Proceed only if the user clicks "OK"
    if (userConfirmed) {
      try {
        const res = await fetch(`/api/listing/delete/${listingId}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
  
        // Update the listings state to reflect the deletion
        setUserListings((prev) =>
          prev.filter((listing) => listing._id !== listingId)
        );
        alert("Listing deleted successfully!"); // Optional success message
      } catch (error) {
        console.log(error.message);
        alert("An error occurred while deleting the listing."); // Notify user of any error
      }
    } else {
      // User clicked "Cancel"
      console.log("Deletion cancelled by user.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Listings</h2>

      {/* User Listings Section */}
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4 mt-7">
          <h1 className="text-center text-2xl font-semibold">Your Listings</h1>
          {userListings.map((listing) => (
            <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Listings Table */}
      {listings.length === 0 ? (
        <p className="text-gray-500 text-center">No listings found.</p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                <th className="py-3 px-6 text-left">Property</th>
                <th className="py-3 px-6 text-left">Amenities</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {listings.map((listing) => (
                <tr key={listing._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6">
                    <div className="flex items-center">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden mr-4">
                        <Link to={`/listing/${listing._id}`}>
                          <img
                            src={listing.imageUrls[0]}
                            alt="listing cover"
                            className="h-16 w-16 object-contain"
                          />
                        </Link>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{listing.name}</h3>
                        <p className="text-gray-500">{listing.address}</p>
                        <p className="font-semibold text-green-600">${listing.regularPrice}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <FaBed className="text-gray-500" />
                        <span>{listing.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaBath className="text-gray-500" />
                        <span>{listing.bathrooms}</span>
                      </div>
                      {listing.isParking && (
                        <div className="flex items-center gap-1">
                          <FaCar className="text-gray-500" />
                          <span>{listing.parking}</span>
                        </div>
                      )}
                      {listing.isFurnished && (
                        <div className="flex items-center gap-1">
                          <FaCouch className="text-gray-500" />
                        </div>
                      )}
                    </div>
                    <p className="text-gray-500">Verified Amenities</p>
                  </td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 font-semibold rounded-full text-sm ${
                        listing.isVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {listing.isVerified ? 'Verified' : 'Not Verified'}
                    </span>
                    <p className="text-gray-500">{listing.dateAdded}</p>
                  </td>
                  <td className="py-3 px-6 flex flex-col items-center space-y-2">
                    <button
                      onClick={() => handleListingDelete(listing._id)}
                      className="text-red-700 uppercase"
                    >
                      Delete
                    </button>
                    <Link to={`/update-listing/${listing._id}`}>
                      <button className="text-green-700 uppercase">Edit</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowListings;
