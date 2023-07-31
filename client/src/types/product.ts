export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: string;
  rating: number;
  numberOfReviews: number;
  productIsNew: boolean;
  __v: number;
  reviews: Review[];
  updatedAt: Date;
  stock: number;
  createdAt: Date;
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  title: string;
  user: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewProduct {
  brand: Product['brand'];
  name: Product['name'];
  category: Product['category'];
  stock: Product['stock'];
  price: Product['price'];
  image: Product['image'];
  productIsNew: Product['productIsNew'];
  description: Product['description'];
}
