'use client'


import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Header } from "@/components/Header";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`antialiased`}
      >
        <div className="flex">
          <Navbar />
          <div className="w-full flex flex-col items-center overflow-hidden">
              <Header />
              
              {children}
              
          </div>
        </div>
        
        
      </body>
    </html>
  );
}
