
import { useState } from "react";
import { Bell, Moon, Sun, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import SupabaseStatus from "../status/SupabaseStatus";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const TopNavbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search data assets, models..." 
            className="w-full pl-10"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <SupabaseStatus />
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" onClick={() => {}}>
                <Bell size={18} />
                <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>إشعارات</p>
              <p className="text-xs text-muted-foreground">Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isDarkMode ? "وضع النهار" : "وضع الليل"}</p>
              <p className="text-xs text-muted-foreground">{isDarkMode ? "Light Mode" : "Dark Mode"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                      <User size={16} />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>الملف الشخصي</p>
                <p className="text-xs text-muted-foreground">User Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>الملف الشخصي (Profile)</DropdownMenuItem>
            <DropdownMenuItem>إعدادات الحساب (Account Settings)</DropdownMenuItem>
            <DropdownMenuItem>تسجيل الخروج (Sign out)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopNavbar;
