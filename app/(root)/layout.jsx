import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/providers";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wanderlust",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
          <NavBar />
          {children}
          <Footer/>
          <Toaster position="top-center" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
