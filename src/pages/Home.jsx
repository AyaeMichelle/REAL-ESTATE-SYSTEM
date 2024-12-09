import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import SubscriptionForm from '../components/Subscribe';
import FeedbackForm from '../components/FeedbackForm';


export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Toggle the modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=6');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=6');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=6');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % offerListings.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [offerListings.length]);
 

  return (
    <div>
    <div className="max-w-[98%] mx-auto p-5">
      {/* Unified Top Section with Two Columns */}
      <div className="flex flex-col lg:flex-row items-center h-[60vh] gap-8 p-8 rounded-top-md bg-white shadow-lg">
        {/* Left Column with Text */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
            Your trusted <span className="text-orange-400">Real Estate Partner</span> in Bulawayo
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-gray-600">
            Are you ready to start the search for your dream home? Look no further than Prop Connect.
          </p>
          <Link
            to="/search"
            className="text-xs sm:text-sm text-orange-400 font-bold hover:underline mt-4 inline-block"
          >
            Let’s get started...
          </Link>
        </div>

        {/* Right Column with Slideshow */}
        <div className="relative lg:w-1/2 h-full rounded-md overflow-hidden">
          {offerListings && offerListings.length > 0 && (
            <div
              style={{
                backgroundImage: `url(${offerListings[currentSlide].imageUrls[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
              }}
              className="transition-all duration-1000 ease-in-out"
            ></div>
          )}
        </div>
      </div>

      {/* Listings Section */}
      <div className="bg-white shadow-lg rounded-bottom-lg p-10">
        <div className="flex flex-col gap-8">
          {offerListings && offerListings.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-semibold text-slate-600">Recent offers</h2>
                <Link className="text-sm text-blue-800 hover:underline" to={'/search?offer=true'}>
                  Show more offers
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {rentListings && rentListings.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-semibold text-slate-600">Recent places for rent</h2>
                <Link className="text-sm text-blue-800 hover:underline" to={'/search?type=rent'}>
                  Show more places for rent
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {saleListings && saleListings.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-semibold text-slate-600">Recent places for sale</h2>
                <Link className="text-sm text-blue-800 hover:underline" to={'/search?type=sale'}>
                  Show more places for sale
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="my-custom-class">
       <SubscriptionForm />
      </div>
      <button
        className="fixed bottom-20 right-0 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-orange-500 transform rotate-90"
        onClick={toggleModal} // Toggle modal visibility on click
      >
        Feedback
      </button>

      {/* Show FeedbackForm Modal */}
      {showModal && <FeedbackForm closeModal={toggleModal} />} {/* Pass closeModal function */}
    
    </div>
    
  );
}
