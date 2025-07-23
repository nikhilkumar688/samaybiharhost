import React from "react";
import { Link } from "react-router-dom";
import {
  FaInfoCircle,
  FaLink,
  FaHome,
  FaRegNewspaper,
  FaPhoneAlt,
  FaEnvelope,
  FaUserFriends,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  return (
    <div className="bg-[#000a4d] text-white py-8">
      <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaInfoCircle className="text-white text-xl transition duration-300 hover:scale-110 hover:animate-bounce" />
            <h2 className="text-lg font-semibold">About Us</h2>
          </div>
          <p className="text-gray-400 text-sm">
            समय के साथ, बिहार की बात — हम लाते हैं आपके लिए ताज़ा, विश्वसनीय और
            ज़मीनी खबरें, जो रखती हैं आपको हर पल जुड़े बिहार की धड़कनों से।
          </p>

          {/* Logo */}
          <Link to="/" className="block mt-[30px]  ">
            <img
              src="/logo.svg"
              alt="Samay Bihar Logo"
              className="h-12 w-auto animate-pulse"
            />
          </Link>
        </div>

        {/* Quick Links */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaLink className="text-white text-xl transition duration-300 hover:scale-110 hover:animate-bounce" />
            <h2 className="text-lg font-semibold">Quick Links</h2>
          </div>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2 group">
              <FaHome className="text-sm transition group-hover:scale-110 group-hover:text-white" />
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2 group">
              <FaUserFriends className="text-sm transition group-hover:scale-110 group-hover:text-white" />
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li className="flex items-center gap-2 group">
              <FaRegNewspaper className="text-sm transition group-hover:scale-110 group-hover:text-white" />
              <Link to="/news" className="hover:text-white">
                News Articles
              </Link>
            </li>
            <li className="flex items-center gap-2 group">
              <FaPhoneAlt className="text-sm transition group-hover:scale-110 group-hover:text-white" />
              <Link to="/" className="hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineMail className="text-white text-xl transition duration-300 hover:scale-110 hover:animate-bounce" />
            <h2 className="text-lg font-semibold">
              📩 संपर्क करें | Contact Us
            </h2>
          </div>
          <p className="text-gray-400 text-sm">
            अगर आपके पास कोई सुझाव या सवाल है, तो कृपया हमें ईमेल करें:
          </p>
          <div className="flex items-center gap-2 mt-2 group">
            <FaEnvelope className="text-blue-300 text-sm transition group-hover:scale-110" />
            <a
              href="mailto:support@samaybihar.in"
              className="underline text-blue-300 hover:text-white"
            >
              support@samaybihar.in
            </a>
          </div>
          <p className="text-gray-400 mt-4">
            हम आपके सुझावों का स्वागत करते हैं और जल्द उत्तर देने का प्रयास
            करेंगे।
          </p>
        </div>
      </div>

      {/* Social Media and copyright */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-200 text-sm">
        <p className="mb-4">Follow Us on :</p>
        <div className="flex justify-center flex-wrap gap-6 text-white text-center text-[13px] sm:text-sm">
          {[
            { href: "#", icon: <FaFacebookF />, label: "Facebook" },
            { href: "#", icon: <FaTwitter />, label: "Twitter" },
            { href: "#", icon: <FaInstagram />, label: "Instagram" },
            { href: "#", icon: <FaYoutube />, label: "YouTube" },
            { href: "#", icon: <FaLinkedinIn />, label: "LinkedIn" },
            { href: "#", icon: <FaWhatsapp />, label: "WhatsApp" },
            { href: "#", icon: <FaTelegramPlane />, label: "Telegram" },
          ].map(({ href, icon, label }, idx) => (
            <a
              key={idx}
              href={href}
              className="flex flex-col items-center space-y-1 text-gray-300 hover:text-white transition-transform transform hover:scale-110"
              title={label}
            >
              <div className="text-xl">{icon}</div>
              <span>{label}</span>
            </a>
          ))}
        </div>
        <p className="mt-4">
          &copy;{new Date().getFullYear()} समय-Bihar || All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
