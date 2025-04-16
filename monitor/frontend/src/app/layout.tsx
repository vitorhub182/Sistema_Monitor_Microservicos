
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientRootLayout from "@/components/client-root-layout";
//import { SidebarProvider } from "@/context/sidebar-context";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "@/components/ui/toaster";

import { cookies } from "next/headers"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monitor",
  description: "Monitor de Microsservicos",
};

export default async function Layout({ children }: { children: React.ReactNode }) {

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main>
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
//          <SidebarProvider>
//            <ClientRootLayout>
//              {children}
//              <Toaster />
//            </ClientRootLayout>
//          </SidebarProvider>
