import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/context/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Air Gadgets - Smart Home Technology",
  description:
    "Premium smart home gadgets and automation systems. Elevate your home with cutting-edge technology from Air Gadgets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-[#0a0a0a] text-white antialiased`}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
