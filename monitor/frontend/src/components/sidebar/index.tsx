"use client";
import { 
  LucideIcon,
  House,
  CircleUserRound,
  Bell,
  LockKeyhole,
  UserCheck,
  Ticket,
  Waypoints,
  LogOut } from "lucide-react";

  import SidebarItem from "./item";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";

interface ISidebarItem {
  name: string;
  path: string;
  icon: LucideIcon;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const logout: ISidebarItem[] = [
  {
    name: "Logout",
    path: "/login",
    icon: LogOut,
  }
]
const items: ISidebarItem[] = [
  {
    name: "Usuarios",
    path: "/usuarios",
    icon: CircleUserRound,
  },
  {
    name: "Grafos",
    path: "/grafo/",
    icon: Waypoints,
    items: [
      {
        name: "Grafo Livre",
        path: "/grafo/livre",
      },
    ],
  },
  {
    name: "Conta",
    path: "/settings/",
    icon: LockKeyhole,
    items: [
      {
        name: "Meu Perfil",
        path: "/settings/curriculum",
      },
    ],
  },
];
interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const {isAdmin} = useAuth();

  const [username, setUsername] = useState('');
  useEffect(() => {

    const username = sessionStorage.getItem('username');
    if (username) {
        setUsername(username);
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-10 p-4">
      <div className="flex flex-col space-y-10 w-full">
        <img className="h-20 w-fit" src="/logo-expanded.png" alt="Logo" />
        <div className="text-left font-bold">
          Portal do {isAdmin === false ? 'Visualizador' : 'Administrador'}: {username}
        </div>
        <div className="flex flex-col space-y-2">
          {items.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          {logout.map((item, index) => (
            <SidebarItem key={index} item={item} onClick={onLogout} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;