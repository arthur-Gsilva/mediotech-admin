import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
    title: "Dashboards",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body  suppressHydrationWarning>
        <div className="flex">
          <Navbar />
          <div className="w-full">
              <Header />
              {children}
          </div>
        </div>
        
        
      </body>
    </html>
  );
}
