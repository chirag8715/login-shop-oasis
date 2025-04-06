
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// Define shapes of the cart items from the database
interface CartItemFromDB {
  id: string;
  quantity: number;
  product_id: string;
  products: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
  }
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser, isAuthenticated } = useAuth();

  // Fetch cart items from Supabase when user is authenticated
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!currentUser) {
        setItems([]);
        return;
      }

      setIsLoading(true);

      try {
        const { data: cartItems, error } = await supabase
          .from('cart_items')
          .select(`
            id, 
            quantity,
            product_id,
            products(
              id, 
              name, 
              price, 
              image, 
              description, 
              category
            )
          `)
          .eq('user_id', currentUser.id);

        if (error) {
          console.error('Error fetching cart:', error);
          toast.error('Failed to load your cart');
          return;
        }

        if (cartItems) {
          const formattedItems = cartItems.map((item: CartItemFromDB) => ({
            product: {
              id: item.product_id,
              name: item.products.name,
              price: item.products.price,
              image: item.products.image,
              description: item.products.description,
              category: item.products.category
            },
            quantity: item.quantity
          }));
          
          setItems(formattedItems);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while loading your cart');
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchCartItems();
    } else {
      setItems([]);
    }
  }, [currentUser, isAuthenticated]);

  const addItem = async (product: Product, quantity: number = 1) => {
    if (!currentUser) {
      toast.error('Please log in to add items to your cart');
      return;
    }

    const existingItem = items.find(item => item.product.id === product.id);
    const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

    try {
      if (existingItem) {
        // Update existing cart item
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: newQuantity })
          .eq('user_id', currentUser.id)
          .eq('product_id', product.id);

        if (error) throw error;
        
        setItems(prevItems =>
          prevItems.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
        
        toast.success(`Updated: ${product.name} quantity`);
      } else {
        // Add new cart item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: currentUser.id,
            product_id: product.id,
            quantity
          });

        if (error) throw error;
        
        setItems(prevItems => [...prevItems, { product, quantity }]);
        toast.success(`Added to cart: ${product.name}`);
      }
    } catch (error: any) {
      console.error('Error updating cart:', error);
      toast.error(error.message || 'Failed to update cart');
    }
  };

  const removeItem = async (productId: string) => {
    if (!currentUser) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', currentUser.id)
        .eq('product_id', productId);

      if (error) throw error;
      
      const itemToRemove = items.find(item => item.product.id === productId);
      if (itemToRemove) {
        toast.info(`Removed from cart: ${itemToRemove.product.name}`);
      }
      
      setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    } catch (error: any) {
      console.error('Error removing item:', error);
      toast.error(error.message || 'Failed to remove item from cart');
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!currentUser) return;
    
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', currentUser.id)
        .eq('product_id', productId);

      if (error) throw error;
      
      setItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    } catch (error: any) {
      console.error('Error updating quantity:', error);
      toast.error(error.message || 'Failed to update quantity');
    }
  };

  const clearCart = async () => {
    if (!currentUser) return;
    
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', currentUser.id);

      if (error) throw error;
      
      setItems([]);
      toast.info("Cart has been cleared");
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      toast.error(error.message || 'Failed to clear cart');
    }
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isLoading
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
