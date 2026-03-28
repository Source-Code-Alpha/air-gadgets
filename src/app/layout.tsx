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
        className={`${inter.className} min-h-screen text-white antialiased`}
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0f1d32 40%, #0a1628 70%, #111833 100%)",
        }}
      >
        {/* Animated background grid overlay */}
        <div
          className="pointer-events-none fixed inset-0 z-0 bg-grid opacity-100"
          aria-hidden="true"
        />
        {/* Floating orbs for ambient light */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div className="orb orb-blue" style={{ width: "500px", height: "500px", top: "10%", left: "-5%" }} />
          <div className="orb orb-purple" style={{ width: "400px", height: "400px", top: "60%", right: "-5%" }} />
          <div className="orb orb-cyan" style={{ width: "350px", height: "350px", bottom: "10%", left: "30%" }} />
        </div>

        <div className="relative z-10">
          <Providers>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
