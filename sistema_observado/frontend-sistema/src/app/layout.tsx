
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend",
  description: "Sistema Observado",
};

export default async function Layout({ children }: { children: React.ReactNode }) {


 
  return (
    <html lang="en">
      <body >
        <main>
         {children}
        </main>
      </body>
    </html>
  );
}
