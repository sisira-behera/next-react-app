
export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Ultralight Kinetic Running Shoes',
    category: 'Footwear',
    price: '$120.00',
    image: '',
    isNew: true,
  },
  {
    id: '2',
    name: 'Minimalist Leather Smart Watch',
    category: 'Accessories',
    price: '$199.00',
    image: '',
  },
  {
    id: '3',
    name: 'Ergonomic Matte Noise-Canceling Headphones',
    category: 'Electronics',
    price: '$299.00',
    image: '',
  },
  {
    id: '4',
    name: 'Waterproof Canvas Explore Backpack',
    category: 'Travel Gear',
    price: '$85.00',
    image: '' // This will be used for demo'file.svg',
  },
];