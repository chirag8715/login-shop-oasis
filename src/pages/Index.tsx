
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="relative bg-ecommerce-blue text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="md:w-2/3">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Welcome to ShopCart
              </h1>
              <p className="mt-6 text-xl max-w-3xl">
                Discover the best products at unbeatable prices. Start shopping today!
              </p>
              <div className="mt-10">
                {isAuthenticated ? (
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/shop')}
                    className="bg-accent hover:bg-accent/90"
                  >
                    Start Shopping
                  </Button>
                ) : (
                  <div className="space-x-4">
                    <Button 
                      size="lg" 
                      onClick={() => navigate('/login')}
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-ecommerce-blue"
                    >
                      Login
                    </Button>
                    <Button 
                      size="lg" 
                      onClick={() => navigate('/register')}
                      className="bg-accent hover:bg-accent/90"
                    >
                      Register Now
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose ShopCart?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-ecommerce-blue text-4xl font-bold mb-4">01</div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">We offer only the highest quality products from trusted brands.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-ecommerce-blue text-4xl font-bold mb-4">02</div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Quick and reliable delivery to your doorstep.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-ecommerce-blue text-4xl font-bold mb-4">03</div>
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-gray-600">Your personal information is always protected with us.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
