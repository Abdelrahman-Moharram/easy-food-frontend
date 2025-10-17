import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-950 text-gray-400 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* النص */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} YourCompany. All rights reserved.
        </p>

        {/* روابط التنقّل */}
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-white text-sm transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-white text-sm transition-colors">
            Terms
          </Link>
          <Link to="/contact" className="hover:text-white text-sm transition-colors">
            Contact
          </Link>
        </div>

        {/* السوشيال ميديا */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link to="#" className="hover:text-white"><Facebook size={18} /></Link>
          <Link to="#" className="hover:text-white"><Twitter size={18} /></Link>
          <Link to="#" className="hover:text-white"><Instagram size={18} /></Link>
          <Link to="#" className="hover:text-white"><Linkedin size={18} /></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
