
import { Product } from '../contexts/CartContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    description: 'Premium wireless headphones with noise cancellation and 20-hour battery life.',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a',
    description: 'Track your fitness, receive notifications, and more with this smartwatch.',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Smartphone',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    description: 'Latest smartphone with high-resolution camera and powerful processor.',
    category: 'Electronics'
  },
  {
    id: '4',
    name: 'Laptop',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    description: 'Ultra-thin laptop with 16GB RAM and 512GB SSD storage.',
    category: 'Electronics'
  },
  {
    id: '5',
    name: 'Running Shoes',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    description: 'Comfortable running shoes with advanced cushioning technology.',
    category: 'Fashion'
  },
  {
    id: '6',
    name: 'Backpack',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    description: 'Spacious backpack with multiple compartments and water-resistant material.',
    category: 'Fashion'
  },
  {
    id: '7',
    name: 'Coffee Maker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1521302200778-33c7b67c7df8',
    description: 'Automatic coffee maker with timer and multiple brewing options.',
    category: 'Home'
  },
  {
    id: '8',
    name: 'Desk Lamp',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1534281368595-8fdf1faa3a08',
    description: 'Adjustable desk lamp with multiple brightness levels.',
    category: 'Home'
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'Electronics', name: 'Electronics' },
  { id: 'Fashion', name: 'Fashion' },
  { id: 'Home', name: 'Home' }
];
