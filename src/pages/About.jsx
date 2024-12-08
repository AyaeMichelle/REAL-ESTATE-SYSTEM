import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import SubscriptionForm from '../components/Subscribe';
import { FaBuilding, FaBullhorn, FaClipboardCheck, FaFileInvoiceDollar, FaHandshake, FaHome, FaRocket, FaSearchLocation, FaUsers } from 'react-icons/fa';

export default function About() {
  return (
    <div>
      {/* Background Image Section */}
      <div
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('./images/About.jpg')",
        }}
      >
        {/* Overlay for darkening the background */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Text overlay */}
        <h1 className="relative z-10 text-white font-bold text-3xl lg:text-5xl text-center">
          About <span className='text-orange-400'>PropConnect</span>
        </h1>
      </div>

      {/* Main Content Section with 10% margin */}
      <div className="mx-auto max-w-[90%]">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 mt-10">
          {/* Left Section: Text */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Your Trusted Partner in Real Estate Bulawayo</h2>
            <p className="text-slate-700 mb-6">
              Welcome to PropConnect, your trusted partner in real estate solutions. We are passionate about transforming the property search experience.
              With a focus on transparency, innovation, and customer satisfaction, we aim to bridge the gap between property seekers and owners, all while removing unnecessary third-party intermediaries.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mb-4">Connecting You to Your Dream Property</h2>
            <p className="text-slate-700">
              Whether you are searching for your dream home, looking for a rental property, or investing from abroad,
              <span className="text-orange-400"> PropConnect</span> is here to simplify the process and build trust in the real estate market.
              Together, we are shaping a better future for property transactions in Bulawayo.
            </p>
          </div>

          {/* Right Section: Image */}
          <div className="rounded-lg overflow-hidden">
            <img
              src="./images/Connecting.jpg"
              alt="Modern House"
              className="w-full object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
          {/* Left Section: Image */}
          <div className="rounded-lg overflow-hidden">
            <img
              src="./images/mission.jpg"
              alt="Business Meeting"
              className="w-full object-cover"
            />
          </div>

          {/* Right Section: Text */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
            <p className="text-slate-700 mb-6">
              Our mission is to revolutionize Bulawayo's real estate market by providing a transparent platform that connects property seekers directly with property owners.
              We aim to eliminate the inefficiencies and excessive fees associated with traditional real estate processes, empowering both local and diaspora users to access credible property listings and make informed decisions with ease and confidence.
            </p>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Goals</h2>
            <ul className="list-disc list-inside text-slate-700">
              <li><strong>Enhance Accessibility:</strong> Provide a centralized platform that offers comprehensive, credible, and up-to-date property listings for both local and diaspora users.</li>
              <li><strong>Eliminate Unnecessary Intermediaries:</strong> Facilitate direct communication between property seekers and property owners to reduce reliance on third-party agents, thereby lowering costs and minimizing delays.</li>
              <li><strong>Adapt and Innovate:</strong> Continuously improve our platform by integrating user feedback and adopting the latest advancements in technology to meet the evolving needs of our users.</li>
            </ul>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="max-w-full py-12">
          <div className="max-w-[90%] mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-4">Our Values</h2>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-0.5 bg-orange-400"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <FaHandshake className="mx-auto text-4xl text-orange-400 mb-4" />
                <h3 className="text-xl font-semibold text-slate-700">Integrity</h3>
                <p className="text-slate-600">
                  We believe in honest, transparent dealings that prioritize the needs and concerns of our clients.
                </p>
              </div>
              <div className="text-center">
                <FaRocket className="mx-auto text-4xl text-orange-400 mb-4" />
                <h3 className="text-xl font-semibold text-slate-700">Innovation</h3>
                <p className="text-slate-600">
                  We are committed to using cutting-edge technology to streamline and simplify the real estate process.
                </p>
              </div>
              <div className="text-center">
                <FaUsers className="mx-auto text-4xl text-orange-400 mb-4" />
                <h3 className="text-xl font-semibold text-slate-700">Customer-Centricity</h3>
                <p className="text-slate-600">
                  Our customers' needs are at the heart of everything we do, and we work tirelessly to meet their expectations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Team Section */}
        {/* Our Services Section */}
<div className="w-full py-16">
  <div className="max-w-[90%] mx-auto">
    {/* Section Title */}
    <h2 className="text-4xl font-bold text-slate-800 text-center mb-6">Our Services</h2>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-0.5 bg-orange-400"></div>
            </div>
    <p className="text-center text-slate-600 mb-12">
      Tailored solutions for property seekers and owners to meet their unique needs.
    </p>

    {/* Property Seekers */}
    <div className="mb-16">
      <h3 className="text-3xl font-semibold text-slate-800 text-center mb-8">For Property Seekers</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Service Card */}
        <div className="border rounded-lg p-6 text-center shadow-sm">
          <FaHome className="text-5xl text-orange-500 mb-4 mx-auto" />
          <h4 className="text-xl font-semibold text-slate-800 mb-2">Property Sales</h4>
          <p className="text-slate-600">
            Personalized services to guide you through the property-buying process.
          </p>
        </div>
        <div className="border rounded-lg p-6 text-center shadow-sm">
          <FaSearchLocation className="text-5xl text-orange-500 mb-4 mx-auto" />
          <h4 className="text-xl font-semibold text-slate-500 mb-2">Property Search</h4>
          <p className="text-slate-600">
            Explore a wide range of properties tailored to your preferences and budget.
          </p>
        </div>
        <div className="border rounded-lg p-6 text-center shadow-sm">
          <FaClipboardCheck className="text-5xl text-orange-500 mb-4 mx-auto" />
          <h4 className="text-xl font-semibold text-slate-800 mb-2">Verified Listings</h4>
          <p className="text-slate-600">
            Access reliable and verified property listings for hassle-free transactions.
          </p>
        </div>
      </div>
    </div>

    {/* Property Owners */}
    <div>
      <h3 className="text-3xl font-semibold text-slate-500 text-center mb-8">For Property Owners</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Service Card */}
        <div className="border rounded-lg p-6 text-center shadow-sm">
          <FaBuilding className="text-5xl text-orange-500 mb-4 mx-auto" />
          <h4 className="text-xl font-semibold text-slate-500 mb-2">Property Management</h4>
          <p className="text-slate-600">
            Professional management to ensure your property is well-maintained and profitable.
          </p>
        </div>
        <div className="border rounded-lg p-6 text-center shadow-sm">
          <FaFileInvoiceDollar className="text-5xl text-orange-500 mb-4 mx-auto" />
          <h4 className="text-xl font-semibold text-slate-800 mb-2">Property Valuation</h4>
          <p className="text-slate-600">
            Accurate and reliable valuation services to maximize your investment returns.
          </p>
        </div>
        <div className="border rounded-lg p-6 text-center shadow-sm">
          <FaBullhorn className="text-5xl text-orange-500 mb-4 mx-auto" />
          <h4 className="text-xl font-semibold text-slate-800 mb-2">Marketing Services</h4>
          <p className="text-slate-600">
            Reach potential buyers and tenants with our effective marketing strategies.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>
          {/* Feedback Form */}  
    <div className="bg-gray-100 py-12">  
      <div className="max-w-[90%] mx-auto">  
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-6">We Value Your Feedback</h2>  
        <p className="text-center text-slate-600 mb-8">  
          Help us improve by sharing your thoughts, suggestions, or concerns.  
        </p>  
        <FeedbackForm />  
      </div>  
    </div>  

    {/* Subscription Form */}  
    <div className="bg-white py-12">  
      <div className="max-w-[90%] mx-auto">  
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-6">Stay Connected</h2>  
        <p className="text-center text-slate-600 mb-8">  
          Subscribe to receive updates on the latest properties, trends, and news in real estate.  
        </p>  
        <SubscriptionForm />  
      </div>  
    </div>  
  </div>  
  

       
   
  );
}
