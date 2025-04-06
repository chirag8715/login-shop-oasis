
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ecommerce-blue text-white mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ShopCart</h3>
            <p className="text-sm text-gray-300">
              Your one-stop shop for all your shopping needs.
              Quality products at affordable prices.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/shop" className="hover:text-white">Shop</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white">Cart</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-300">
              123 Shopping Street<br />
              Cartville, SC 12345<br />
              contact@shopcart.example
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} ShopCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
