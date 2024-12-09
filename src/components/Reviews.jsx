import React from 'react';
import { useAllReviewsQuery, useDeleteReviewMutation } from '../redux/auth/reviewApi';

export default function Reviews() {
  const { data, error, isLoading } = useAllReviewsQuery();
  const [deleteReview] = useDeleteReviewMutation(); // Get the delete function

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>Error loading reviews: {error.message}</div>;
  }

  const handleDelete = async (reviewId) => {
    try {
      await deleteReview(reviewId); // Call delete review API
      alert('Review deleted successfully');
    } catch (err) {
      console.error('Failed to delete review:', err);
      alert('Error deleting review');
    }
  };

  return (
    <div>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">All Reviews</h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full bg-transparent border-collapse table-auto">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs text-blueGray-500 font-semibold text-left border-b">No.</th>
                    <th className="px-6 py-3 text-xs text-blueGray-500 font-semibold text-left border-b">Name</th>
                    <th className="px-6 py-3 text-xs text-blueGray-500 font-semibold text-left border-b">Rating</th>
                    <th className="px-6 py-3 text-xs text-blueGray-500 font-semibold text-left border-b">Comment</th>
                    <th className="px-6 py-3 text-xs text-blueGray-500 font-semibold text-left border-b">Submitted At</th>
                    <th className="px-6 py-3 text-xs text-blueGray-500 font-semibold text-left border-b">Visit Purpose</th>
                    <th className="px-6 py-3 text-xs text-blueGray-500 font-semibold text-left border-b">Visit Success</th>
                    <th className="px-6 py-3 text-xs text-blueGray-500 font-semibold text-left border-b">Contact</th>
                    <th className="px-6 py-3 text-xs text-blueGray-500 font-semibold text-left border-b">Phone</th>
                    <th className="px-6 py-3 text-xs text-blueGray-500 font-semibold text-left border-b hidden md:table-cell">Actions</th> {/* Hidden on smaller screens */}
                  </tr>
                </thead>

                <tbody>
                  {data?.reviews &&
                    data.reviews.map((review, index) => (
                      <tr key={review._id}>
                        <td className="border-t-0 px-6 py-4 text-left text-blueGray-700">{index + 1}</td>
                        <td className="border-t-0 px-6 py-4">{review.name}</td>
                        <td className="border-t-0 px-6 py-4">{review.rating}</td>
                        <td className="border-t-0 px-6 py-4">{review.comment}</td>
                        <td className="border-t-0 px-6 py-4">{new Date(review.submittedAt).toLocaleDateString()}</td>
                        <td className="border-t-0 px-6 py-4">{review.visitPurpose}</td>
                        <td className="border-t-0 px-6 py-4">{review.visitSuccess}</td>
                        <td className="border-t-0 px-6 py-4">{review.contact ? 'Yes' : 'No'}</td>
                        <td className="border-t-0 px-6 py-4">{review.phone}</td>
                        <td className="border-t-0 px-6 py-4 hidden md:table-cell">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(review._id)} // Call the delete function
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
