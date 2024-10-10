'use client'


import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    
        <div className="flex">
          <Navbar />
          <div className="w-full flex flex-col items-center overflow-hidden">
              <Header />
                {children}
                <Toaster />
          </div>
        </div>
        
        
      
  );
}
