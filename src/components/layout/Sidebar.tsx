
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Database, 
  FileStack,
  Network,
  Settings,
  Home,
  Cable,
  ShieldCheck,
  Layers,
  BookOpen,
  ListTodo
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/", icon: <Home size={20} /> },
  { name: "Data Catalog", path: "/data-catalog", icon: <Database size={20} /> },
  { name: "Data Lineage", path: "/data-lineage", icon: <Network size={20} /> },
  { name: "Architecture", path: "/architecture", icon: <Layers size={20} /> },
  { name: "Governance", path: "/governance", icon: <ShieldCheck size={20} /> },
  { name: "Workflows", path: "/workflows", icon: <ListTodo size={20} /> },
  { name: "Connectors", path: "/connectors", icon: <Cable size={20} /> },
  { name: "Documentation", path: "/docs", icon: <BookOpen size={20} /> },
  { name: "Settings", path: "/settings", icon: <Settings size={20} /> }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-card border-r border-border h-screen">
      <div className="h-16 flex items-center justify-center border-b border-border">
        <h1 className="font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          EV Data Hub
        </h1>
      </div>
      <div className="px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary hover:text-secondary-foreground"
              )}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
