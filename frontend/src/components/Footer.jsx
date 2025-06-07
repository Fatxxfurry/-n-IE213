import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 bg-opacity-90 border-t border-emerald-800 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">
              About E-Commerce
            </h3>
            <p className="text-gray-300 text-sm">
              Your one-stop shop for quality products. Discover a wide range of
              items with seamless shopping experience.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/category/all"
                  className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-emerald-400" />
                support@ecommerce.com
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-emerald-400" />
                +84 123 456 789
              </li>
              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-emerald-400" />
                123 Linh Trung, Thu Duc, Vietnam
              </li>
            </ul>
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
