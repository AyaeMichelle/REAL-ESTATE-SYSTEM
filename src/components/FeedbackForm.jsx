import React, { useState } from "react";

const FeedbackForm = ({ closeModal }) => {
  const [rating, setRating] = useState(0); // Rating value
  const [comment, setComment] = useState(""); // User's feedback
  const [submitted, setSubmitted] = useState(false); // For showing submission message
  const [showModal, setShowModal] = useState(true); // Modal visibility (set to true to show by default)
  const [contact, setContact] = useState(""); // Contact preference ("Yes" or "No")
  const [name, setName] = useState(""); // User's name if they want to be contacted
  const [phone, setPhone] = useState(""); // User's phone number if they want to be contacted
  const [visitPurpose, setVisitPurpose] = useState(""); // Dropdown selection for purpose of visit
  const [visitSuccess, setVisitSuccess] = useState(""); // Manage radio buttons for success/failure

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
  
    const feedbackData = {
      rating,
      comment,
      visitPurpose,
      visitSuccess,
      contact: contact === "Yes", // Convert "Yes" to true, "No" to false
      name: contact === "Yes" ? name : null,
      phone: contact === "Yes" ? phone : null,
    };
    console.log('Feedback Data:', feedbackData);
  
    try {
      const response = await fetch("http://localhost:3000/api/reviews/submit", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify JSON content type
        },
        body: JSON.stringify(feedbackData), // Convert feedback data to JSON string
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Feedback Submitted:', data);
  
      setSubmitted(true); // Show submission success message
  
      // Reset form fields after submission
      setRating(0);
      setComment("");
      setVisitPurpose("");
      setVisitSuccess("");
      setContact(false);
      setName("");
      setPhone("");
  
      // Close the modal after submission
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };
  
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="relative max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-2xl font-semibold text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>

            {/* Logo */}
            <div className="text-center">
              <img
                src="./images/logo.png"
                alt="Logo"
                className="w-30 mx-auto"
              />
            </div>

            {/* Description */}
            <p className="text-lg text-center mt-2 mb-4">
              We'd love your feedback!
              <p className="text-lg text-center">Please take two minutes to help make our site better</p>
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                {/* Purpose of Visit Dropdown */}
                <div className="mb-4">
                  <label
                    htmlFor="visitPurpose"
                    className="block text-lg font-medium"
                  >
                    What was the main purpose of your visit today?
                  </label>
                  <select
                    id="visitPurpose"
                    value={visitPurpose}
                    onChange={(e) => setVisitPurpose(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                  >
                    <option value="">Please Select Option</option>
                    <option value="Search Property">Search Property</option>
                    <option value="Post Listings">Post Listings</option>
                    <option value="Explore Neighborhoods">
                      Just browsing site for fun
                    </option>
                    <option value="Contact Professional">
                      Contact a Real Estate professional
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Was the visit successful? */}
                <div className="mb-4">
                  <p className="text-lg font-medium">
                    Were you able to complete your primary purpose of visit
                    today?
                  </p>
                  <div className="flex space-x-4 mt-2">
                    <label>
                      <input
                        type="radio"
                        name="visitSuccess"
                        value="Yes"
                        checked={visitSuccess === "Yes"}
                        onChange={() => setVisitSuccess("Yes")}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="visitSuccess"
                        value="No"
                        checked={visitSuccess === "No"}
                        onChange={() => setVisitSuccess("No")}
                      />
                      No
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="visitSuccess"
                        value="Not yet done"
                        checked={visitSuccess === "Not yet done"}
                        onChange={() => setVisitSuccess("Not yet done")}
                      />
                      Not yet done
                    </label>
                  </div>
                </div>

                {/* Contact Option */}
                <div className="mb-4">
                  <p className="text-lg font-medium">
                    If we have any questions regarding your response, should we
                    contact you?
                  </p>
                  <div className="flex space-x-4 mt-2">
                    <label>
                      <input
                        type="radio"
                        name="contact"
                        value="Yes"
                        checked={contact === "Yes"}
                        onChange={() => setContact("Yes")}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="contact"
                        value="No"
                        checked={contact === "No"}
                        onChange={() => setContact("No")}
                      />
                      No
                    </label>
                  </div>
                </div>

                {contact === "Yes" && (
                  <>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-lg font-medium"
                      >
                        Your Name:
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md mt-2"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="block text-lg font-medium"
                      >
                        Your Phone Number:
                      </label>
                      <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md mt-2"
                      />
                    </div>
                  </>
                )}

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
                        {value} Star{value > 1 && "s"}
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
                  className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-700"
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
