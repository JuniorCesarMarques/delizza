import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import { Toaster } from "react-hot-toast";
import ModalProvider from "@/app/contexts/ModalContext";
import Modal from "@/components/Modal";

import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
import { CartProvider } from "@/context/cart/cartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Delizza",
  description: "Pizzas Preparadas com Amor",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <ReactQueryProvider>
            <ModalProvider>
              <Header />
              <div className="pt-20 pb-40">
                {children}
                <Toaster position="top-right" />
              </div>
              <Modal />
              <Navbar />
            </ModalProvider>
          </ReactQueryProvider>
        </CartProvider>
      </body>
    </html>
  );
}
