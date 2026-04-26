export interface Artisan {
  id: string;
  name: string;
  tribe: string;
  story: string;
  photoUrl: string;
  location: string;
  rating: number;
  joinedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Textiles' | 'Woodwork' | 'Art' | 'Organic' | 'Jewelry';
  artisanId: string;
  images: string[];
  stock: number;
  impactScore: string;
}

export interface Order {
  id: string;
  buyerId: string;
  productId: string;
  quantity: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  total: number;
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  address?: string;
}
