import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaWhatsapp } from 'react-icons/fa'; // WhatsApp icon
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaHome,
  FaBuilding,
  FaTree,
  FaCheck,
  FaTimes,
  FaBriefcase,
  FaStore,
  FaEye,
} from 'react-icons/fa';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading,] = useState(false);
  const [error,] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [views,] = useState(0);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        setListing(data);
        // Increment views after setting listing
        await fetch(`/api/listing/views/increment/${params.listingId}`, { method: 'POST' });
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const getWhatsAppLink = (phoneNumber) => {
    const formattedPhone = phoneNumber.replace(/\D/g, ''); // Clean up the phone number
    return `https://wa.me/${formattedPhone}`;
  };

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
{error && (
  <p className='text-center my-7 text-2xl'>Something went wrong!</p>
)}
{listing && !loading && !error && (
  <div>
    {/* Swiper Section */}
    {listing.imageUrls && (
      <Swiper navigation className="rounded-lg shadow-md overflow-hidden">
        {listing.imageUrls.map((url) => (
          <SwiperSlide key={url}>
            <div
              className="h-[400px] sm:h-[550px] bg-cover bg-center"
              style={{
                backgroundImage: `url(${url})`,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    )}
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[10%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}

          {/* Content Section */}
          <div className="bg-white p-6 mt-6 rounded-lg shadow-lg max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Map */}
              <div className="w-full h-[300px] sm:h-[400px] bg-gray-200 rounded-lg">
                <iframe
                  title="Google Maps"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    listing.address
                  )}&output=embed`}
                  className="w-full h-full rounded-lg"
                  loading="lazy"
                ></iframe>
              </div>

              {/* Right Column: Details */}
              <div className="flex flex-col gap-6">
                <p className="text-2xl font-semibold">
                  {listing.name} - ${' '}
                  {listing.offer
                    ? listing.discountPrice.toLocaleString('en-US')
                    : listing.regularPrice.toLocaleString('en-US')}
                  {listing.type === 'rent' && ' / month'}
                </p>
                <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
                  <FaMapMarkerAlt className="text-green-700" />
                  {listing.address}
                </p>
                <div className="flex gap-4">
                  <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                  </p>
                  {listing.offer && (
                    <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                      ${+listing.regularPrice - +listing.discountPrice} OFF
                    </p>
                  )}
                </div>

                <div className="flex gap-4 items-center text-sm text-slate-800 font-semibold">
                  {/* Property Status */}
                  <p className="flex items-center gap-2">
                    {listing.status === 'available' && (
                      <>
                        <FaCheck className="text-green-700" />
                        <span>Available</span>
                      </>
                    )}
                    {listing.status === 'sold' && (
                      <>
                        <FaTimes className="text-red-700" />
                        <span>Sold</span>
                      </>
                    )}
                  </p>

                  {/* Property Type */}
                  <p className="flex items-center gap-2">
                    {listing.propertyType === 'house' && (
                      <>
                        <FaHome className="text-blue-700" />
                        <span>House</span>
                      </>
                    )}
                    {listing.propertyType === 'apartment' && (
                      <>
                        <FaBuilding className="text-purple-700" />
                        <span>Apartment</span>
                      </>
                    )}
                    {listing.propertyType === 'land' && (
                      <>
                        <FaTree className="text-green-700" />
                        <span>Land</span>
                      </>
                    )}
                      {listing.propertyType === 'flat' && (
                      <>
                      <FaBuilding className="text-orange-700" />
                      <span>Flat</span>
                      </>
                      )}
                     {listing.type === 'office' && (
                      <>
                     <FaBriefcase className="text-gray-700" />
                    <span>Office</span>
                     </>
                     )}
                      {listing.propertyType === 'commercial' && (
                      <>
                     <FaStore className="text-teal-700" />
                     <span>Commercial Property</span>
                     </>
                      )}
                  </p>
                </div>

                <p className="text-slate-800">
                  <span className="font-semibold text-black">Description - </span>
                  {listing.description}
                </p>

                <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                  <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaBed className="text-lg" />
                    {listing.bedrooms > 1
                      ? `${listing.bedrooms} beds `
                      : `${listing.bedrooms} bed `}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaBath className="text-lg" />
                    {listing.bathrooms > 1
                      ? `${listing.bathrooms} baths `
                      : `${listing.bathrooms} bath `}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaParking className="text-lg" />
                    {listing.parking ? 'Parking spot' : 'No Parking'}
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaChair className="text-lg" />
                    {listing.furnished ? 'Furnished' : 'Unfurnished'}
                  </li>
                </ul>

                {/* Views */}
                <div className="mt-6 flex justify-between items-center">
                  <p className="flex items-center gap-2 text-gray-600">
                    <FaEye /> {views || 0} Views
                  </p>
                </div>
                {listing.phoneNumber && (
  <div className='flex items-center gap-2 mt-3'>
    <FaWhatsapp className='h-5 w-5 text-green-500' />
    <a
      href={getWhatsAppLink(listing.phoneNumber)}
      target='_blank'
      rel='noopener noreferrer'
      className='text-sm text-green-600 hover:underline truncate'
    >
      {listing.phoneNumber}
    </a>
  </div>
)}
                {/* Contact Button */}
                {currentUser && listing.userRef !== currentUser._id && !contact && (
                  <button
                    onClick={() => setContact(true)}
                    className="mt-6 bg-slate-700 text-white px-6 py-3 rounded-lg uppercase hover:bg-slate-800"
                  >
                    Contact landlord
                  </button>
                )}
                {contact && <Contact listing={listing} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
