import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaCar, FaCouch } from 'react-icons/fa'; // Import icons

const ShowListings = ({ listings, error, onDeleteListing }) => {
  if (error) {
    return <p className="text-red-500">Error fetching listings. Please try again later.</p>;
  }

  // Check if listings is an array and has elements
  if (!Array.isArray(listings) || listings.length === 0) {
    return <p className="text-center">No listings available.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Listings</h2>
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
                <th className="py-3 px-6 text-left">Action</th> {/* Updated columns */}
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
                  <td className="py-3 px-6 flex flex-col items-center space-y-2">
                    <button
                      onClick={() => {
                        if (onDeleteListing) onDeleteListing(listing._id);
                        else console.log("onDeleteListing function not available");
                      }}
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
