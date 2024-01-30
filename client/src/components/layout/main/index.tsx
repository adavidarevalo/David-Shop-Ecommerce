import React, { ReactNode } from 'react'
import Footer from './footer';
import { Navbar } from './navbar';
import ChatbotComponent from './chatbot';

interface Props {
    children: ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ChatbotComponent />
    </>
  );
}
