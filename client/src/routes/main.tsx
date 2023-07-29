import React from 'react'
import {
  createBrowserRouter,
} from "react-router-dom";
import ProductsPage from "../pages/products";
import CartPage from "../pages/cart";
import ProductPage from "../pages/product";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import RegistrationPage from "../pages/registration";
import MainLayout from "../components/layout/main";
import ProfilePage from "../pages/profile";
import CheckoutPage from "../pages/checkout";
import YourOrdersPage from "../pages/your_orders";
import AdminConsole from '../pages/admin_console';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <HomePage/>
      </MainLayout>
    ),
  },
  {
    path: '/products',
    element: (
      <MainLayout>
        <ProductsPage/>
      </MainLayout>
    ),
  },
  {
    path: '/product/:id',
    element: (
      <MainLayout>
        <ProductPage />
      </MainLayout>
    ),
  },
  {
    path: '/cart',
    element: (
      <MainLayout>
        <CartPage />
      </MainLayout>
    ),
  },
  {
    path: '/login',
    element: (
      <MainLayout>
        <LoginPage />
      </MainLayout>
    ),
  },
  {
    path: '/registration',
    element: (
      <MainLayout>
        <RegistrationPage />
      </MainLayout>
    ),
  },
  {
    path: '/profile',
    element: (
      <MainLayout>
        <ProfilePage />
      </MainLayout>
    ),
  },
  {
    path: '/checkout',
    element: (
      <MainLayout>
        <CheckoutPage />
      </MainLayout>
    ),
  },
  {
    path: '/your-orders',
    element: (
      <MainLayout>
        <YourOrdersPage />
      </MainLayout>
    ),
  },
  {
    path: '/admin-console',
    element: (
      <MainLayout>
        <AdminConsole />
      </MainLayout>
    ),
  },
]);