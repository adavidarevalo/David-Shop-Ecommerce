import React, { ReactNode } from 'react'
import Footer from './footer';
import { Navbar } from './navbar';

interface Props {
    children: ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
