import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import SubscriptionForm from "../components/Subscribe";

// Extract ContactForm as a separate component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    let formErrors = { name: "", email: "", message: "" };

    // Name validation
    if (!formData.name) {
      formErrors.name = "Name is required.";
      isValid = false;
    }

    // Email validation (simple check for the '@' symbol)
    if (!formData.email) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    // Message validation
    if (!formData.message) {
      formErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation before submitting
    if (validateForm()) {
      console.log("Form Submitted Successfully!", formData);
      // Here you can send the form data to an API or email service
    } else {
      console.log("Form has errors. Fix them before submitting.");
    }
  };

  return (
    <form className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md"
    onSubmit={handleSubmit}>
      <div className="mb-4">
      <input
              type="text"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="mb-6">
      <textarea
              id="message"
              placeholder="Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
        {errors.message && <p className="error">{errors.message}</p>}
      </div>
      <button
  type="submit"
  className="mx-auto w-1/2 bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition"
>
  Send Message
</button>
    </form>
  );
};

export default function ContactUs() {
  return (
    <div>
      <div
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('./images/house.jpg')",
        }}
      >
        {/* Overlay for darkening the background */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Text overlay */}
        <h1 className="relative z-10 text-white font-bold text-3xl lg:text-5xl text-center">
          Contact <span className="text-orange-400">Us</span>
        </h1>
      </div>

      {/* Get In Touch Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-2">Get In Touch</h2>
        <div className="border-b-4 border-orange-500 w-20 mx-auto mb-8"></div>

        {/* Render the ContactForm component here */}
        <ContactForm />
      </div>

      {/* Contact Details */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="text-orange-500 text-4xl mb-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <h4 className="font-semibold mb-2">Address</h4>
            <p>7928/13 Sizinda</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-orange-500 text-4xl mb-4">
              <FontAwesomeIcon icon={faPhoneAlt} />
            </div>
            <h4 className="font-semibold mb-2">Phone</h4>
            <p>+263 784271845</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-orange-500 text-4xl mb-4">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <h4 className="font-semibold mb-2">Email</h4>
            <p>admin@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="w-full">
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCZtHcvtkWREata3aHNFxuj89Gh1uLVv6Y&q=7928/13+Sizinda,+Bulawayo"
          className="w-full h-96"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <div className="mt-5">
        <SubscriptionForm />
      </div>
    </div>
  );
}
