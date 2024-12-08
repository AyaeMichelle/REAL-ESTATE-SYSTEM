import axios from "axios";
import { useState } from "react";

const SubscriptionForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/subscribe", formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-black text-white py-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Subscribe to get the latest listings
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto"
      >
        <div>
          <label className="block text-left mb-2" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full md:w-72 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>
        <div>
          <label className="block text-left mb-2" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@domain.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full md:w-72 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>
        <div>
          <label className="block text-left mb-2" htmlFor="phone">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="082 333 4444"
            value={formData.phone}
            onChange={handleChange}
            className="w-full md:w-72 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-12 pt-0 max-h-12 mt-8 border border-gray-300 rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 w-full md:w-80"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
