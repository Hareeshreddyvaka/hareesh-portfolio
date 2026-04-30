import { ReactNode } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative text-white overflow-hidden bg-transparent min-h-screen">
      <Navbar />
      
      {/* 
        We use pointer-events-none here to let clicks pass through to 3D canvas globally, 
        but each section explicitly enables pointer events for content.
      */}
      <main className="relative z-10 flex flex-col w-full min-h-screen">
        {children}
      </main>

      <Footer />
    </div>
  );
}
