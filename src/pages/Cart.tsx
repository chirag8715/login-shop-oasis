
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, ArrowRight, Trash } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart: React.FC = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold mb-8">Your Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
              <h2 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h2>
              <p className="mt-1 text-sm text-gray-500">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button
                className="mt-6"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium">Cart Items ({totalItems})</h2>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500"
                        onClick={clearCart}
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        Clear Cart
                      </Button>
                    </div>
                    <div className="divide-y">
                      {items.map(item => (
                        <CartItem key={item.product.id} item={item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-green-500">Free</span>
                      </div>
                      <div className="border-t pt-4 flex justify-between font-medium">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => navigate('/checkout')}
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/shop')}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
