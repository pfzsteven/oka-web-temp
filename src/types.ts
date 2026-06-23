export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  iconName: string; // Name of Lucide icon or code key
  category: "Climate" | "Security" | "Energy" | "Lighting";
  specs: string[];
  stock: number;
}

export interface CartItem {
  id: string; // unique item cart key (usually same as product.id)
  product: Product;
  quantity: number;
}

export interface CustomerCase {
  id: string;
  customerName: string;
  role: string;
  location: string;
  title: string;
  content: string;
  rating: number;
  productsUsed: string[];
  metrics: string; // e.g., "50% heating saved" or "Full automation"
  avatarSeed: string; // custom visual color representation
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
