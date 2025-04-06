
import React from 'react';
import { useCart, Product } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="py-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <span className="font-bold text-ecommerce-blue">${product.price.toFixed(2)}</span>
        </div>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <span className="text-xs mt-2 inline-block bg-gray-100 rounded-full px-2 py-1">
          {product.category}
        </span>
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <Button 
          className="w-full" 
          onClick={() => addItem(product)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
