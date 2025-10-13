import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { AuthProvider } from "@/context/auth-context";

import { cookies } from "next/headers";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monitor",
  description: "Monitor de Microsservicos",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="pt">
      <body className={inter.className}>
        <AuthProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
              <main className="flex min-w-0 overflow-hidden">
              <SidebarTrigger />
                {children}
              </main>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
