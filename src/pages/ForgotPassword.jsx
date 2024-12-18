import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Standalone function to handle API call
  const handleForgotPassword = async (email) => {
    const response = await fetch("http://localhost:3000/api/auth/forgot/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Something went wrong");
    }
  };

  // Main submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state
    setError(null);
    setMessage(null);

    try {
      await handleForgotPassword(email); // Call the standalone function
      setMessage("Password reset email sent successfully! Please check your inbox.");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        {/* Image Section */}
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img 
            src="./images/keys.jpg" 
            alt="key"  
            className="w-full rounded-2xl" 
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={handleSubmit}>
            <input  
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email address"
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don't have an account?
                <Link to="/sign-up" className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1">
                  Register
                </Link>
              </p>
              <p>
                <Link to="/log-in" className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">
                  Log in instead
                </Link>
              </p>
            </div>
            <button 
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Password"}
            </button>
            {message && <p className="text-green-500 mt-5">{message}</p>}
            {error && <p className="text-red-500 mt-5">{error}</p>}
            <div className="my-4 items-center flex before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
