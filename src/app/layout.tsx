'use client'

import localFont from "next/font/local";
import "./globals.css";
import { MenuContext } from "@/contexts/MenuContext";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [menu, setMenu] = useState<boolean>(false)
  const queryClient = new QueryClient();


  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MenuContext.Provider value={{menu, setMenu}}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </MenuContext.Provider>
        
      </body>
    </html>
  );
}
