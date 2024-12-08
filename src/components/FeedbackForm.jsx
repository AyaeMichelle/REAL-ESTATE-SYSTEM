import React, { useState, useEffect } from 'react';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0); // For rating value
  const [comment, setComment] = useState(''); // For user's feedback
  const [submitted, setSubmitted] = useState(false); // To show submission message
  const [showModal, setShowModal] = useState(false); // For modal visibility

  // Show modal after 2 minutes (120000 ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true); // Display the modal after 2 minutes
    }, 120000); // 2 minutes in milliseconds

    // Cleanup the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please rate the platform!');
      return;
    }

    const feedbackData = {
      rating,
      comment,
    };

    // Here you can handle the feedback (e.g., send to server)
    console.log('Feedback Submitted:', feedbackData);

    setSubmitted(true); // Show submission success message
    setRating(0);
    setComment('');
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="relative max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-2xl font-semibold text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
              How Do You Find Our Platform?
            </h2>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                {/* Rating Section */}
                <div className="mb-4">
                  <p className="text-lg font-medium">Rate our platform:</p>
                  <div className="flex space-x-4 mt-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <label key={value} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          value={value}
                          checked={rating === value}
                          onChange={() => setRating(value)}
                          className="mr-2"
                        />
                        {value} Star{value > 1 && 's'}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Comment Section */}
                <div className="mb-6">
                  <label htmlFor="comment" className="block text-lg font-medium">
                    Additional Comments:
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    placeholder="Let us know what you think..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full"
                >
                  Submit Feedback
                </button>
              </form>
            ) : (
              <div className="text-center text-lg text-green-600">
                Thank you for your feedback!
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackForm;
