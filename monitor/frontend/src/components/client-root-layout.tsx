"use client";

import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/sidebar';
import { useSidebar } from '@/context/sidebar-context';
import { useAuth } from '@/context/auth-context';
import  { useEffect } from 'react';

interface ClientRootLayoutProps {
  children: React.ReactNode;
}

const ClientRootLayout: React.FC<ClientRootLayoutProps> = ({ children }) => {
  const { isSidebarVisible } = useSidebar();
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/login' && pathname !== '/cadastro') {
      router.push('/login');
    }else if (isAuthenticated && pathname === '/') {
      router.push('/usuarios');
    }
  }, [isAuthenticated, router, pathname]);

  if (!isAuthenticated && pathname === '/login' || pathname === '/cadastro') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {isSidebarVisible && <Sidebar onLogout={handleLogout} />}
      <div className={`flex flex-col w-full h-full ${isSidebarVisible ? 'ml-64' : ''} p-4`}>
        {children}
      </div>
    </div>
  );
};

export default ClientRootLayout;
