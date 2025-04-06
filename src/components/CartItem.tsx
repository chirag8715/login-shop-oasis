
import React from 'react';
import { useCart, CartItem as CartItemType } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Trash, Minus, Plus } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex flex-col sm:flex-row items-center border-b py-4">
      <div className="w-24 h-24 sm:h-20 sm:w-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden mr-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow py-2">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
        <Button 
          variant="outline" 
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(product.id, quantity - 1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <span className="w-8 text-center">{quantity}</span>
        
        <Button 
          variant="outline" 
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(product.id, quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-red-500 ml-2"
          onClick={() => removeItem(product.id)}
        >
          <Trash className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="font-semibold text-right mt-2 sm:mt-0 sm:ml-4 min-w-[80px]">
        ${(product.price * quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
