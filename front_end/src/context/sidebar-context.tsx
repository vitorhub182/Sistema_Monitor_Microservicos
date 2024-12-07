"use client";

import { createContext, useContext, useState } from 'react';

interface SidebarContextProps {
  isSidebarVisible: boolean;
  showSidebar: () => void;
  hideSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const showSidebar = () => setSidebarVisible(true);
  const hideSidebar = () => setSidebarVisible(false);

  return (
    <SidebarContext.Provider value={{ isSidebarVisible, showSidebar, hideSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
