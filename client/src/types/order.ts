export interface Order {
  shippingAddress: ShippingAddress;
  _id: string;
  user: string;
  username: string;
  email: string;
  orderItems: OrderItem[];
  paymentMethod: string;
  shippingPrice: number;
  totalPrice: number;
  isDelivered: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface OrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  _id: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
