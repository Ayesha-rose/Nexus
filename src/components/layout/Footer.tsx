import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-md mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Nexus. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link to="/terms-of-service" className="text-gray-500 hover:text-gray-900">
              Terms of Service
            </Link>
            <Link to="/privacy-policy" className="text-gray-500 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link to="/cookie-policy" className="text-gray-500 hover:text-gray-900">
              Cookie Policy
            </Link>
            <Link to="/contact-us" className="text-gray-500 hover:text-gray-900">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};