
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { Bell, Moon, Sun, LogIn } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import NotificationBell, { NotificationItem } from "@/components/NotificationBell";

const Header = () => {
  const { theme, setTheme } = useTheme();
 const storedUser = localStorage.getItem('user');
 
const user = storedUser ? JSON.parse(storedUser).user : null;
console.log('User from localStorage:', user);
  return (
    <>
      <div className="w-full bg-gradient-to-r from-forthtech-red to-purple-600 py-1">
        <div className="container px-4 flex justify-center">
          <Badge variant="outline" className="bg-transparent text-white border-0 px-3">
            Centralized educational robotics platform , welcome {user ? user.firstName : 'Guest'}!

          </Badge>
        </div>
      </div>
      <header className="w-full border-b border-gray-200 bg-white dark:bg-forthtech-dark dark:border-gray-800">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center">
              {theme === "dark" ? (
                <img 
                  src="/lovable-uploads/43686a65-c0b6-4a4a-9cb3-528d13a6f8bb.png" 
                  alt="ForthTech Logo" 
                  className="h-8"
                />
              ) : (
                <img 
                  src="/lovable-uploads/73bbfc84-6e83-4ed3-a174-ce2af9492858.png" 
                  alt="ForthTech Logo" 
                  className="h-8"
                />
              )}
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link to="/marketplace" className="text-sm font-medium transition-colors hover:text-forthtech-red">
                Marketplace
              </Link>
              <Link to="/learning-hub" className="text-sm font-medium transition-colors hover:text-forthtech-red">
                Learning Hub
              </Link>
              <Link to="/community" className="text-sm font-medium transition-colors hover:text-forthtech-red">
                Community
              </Link>
              <Link to="/remote-lab" className="text-sm font-medium transition-colors hover:text-forthtech-red">
                Remote Lab
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
<NotificationBell />


            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
           {user ? (
  <Button
    variant="outline"
    size="sm"
    className="hidden md:flex"
    onClick={() => {
      localStorage.removeItem('user');
      toast.success('Logged out successfully!', {
        className: 'border-l-4 border-green-500 text-base p-4 shadow-lg',
        style: {
          background: '#f0fff4',
          color: '#22543d',
          fontSize: '1.1rem',
        },
        duration: 3000
      });

      // Optional: Give toast some time to show before reload/navigation
      setTimeout(() => {
        window.location.reload(); // or use navigate('/login') if using react-router
      }, 1000);
    }}
  >
    Logout
  </Button>
) : (
  <Link to="/login">
    <Button variant="outline" size="sm" className="hidden md:flex">
      <LogIn className="h-4 w-4 mr-2" />
      Login
    </Button>
  </Link>
)}

            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
