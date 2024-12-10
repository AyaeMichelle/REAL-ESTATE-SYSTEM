import { FaFacebook, FaTwitter, FaWhatsapp,  } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-orange-400 mb-4">Prop Connect</h2>
          <p className="text-gray-400">
            Your trusted real estate partner in Bulawayo, providing top-notch services to help you find your dream property with ease and transparency.
          </p>
          <div className="flex space-x-4 mt-4">
            {/* Facebook Link */}
            <a 
              href="https://www.facebook.com/YourFacebookPage" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-400 text-2xl"
            >
              <FaFacebook />
            </a>
            
            {/* Twitter Link */}
            <a 
              href="https://twitter.com/YourTwitterProfile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-400 text-2xl"
            >
              <FaTwitter />
            </a>
            
            {/* WhatsApp Chat Link */}
            <a 
              href="https://wa.me/263784271845"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-400 text-2xl"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-orange-400 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact-us" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>
        
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-orange-400 mb-4">Get In Touch</h3>
          <p className="text-gray-400">Email: hello@amplifiedstreet.com</p>
          <p className="text-gray-400">Address: 7928/13 Sizinda</p>
          <p className="text-gray-400">Phone: +263784271845</p>
        </div>
        
      </div>
      <div className=" border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
        <p>&copy; 2024 @ Ayanda Michelle</p>
      </div>
    </footer>
  );
}

