
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeSelector } from "./ThemeSelector";
import { LanguageSelector } from "./LanguageSelector";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Apple,
  LayoutDashboardIcon,
  LineChartIcon,
  ListChecksIcon,
  PieChartIcon,
  Settings2Icon,
  UtensilsIcon,
  UserIcon,
  UsersIcon,
  BookOpenIcon,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const { user, logout } = useUser();
  const { translate } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    { path: "/", label: translate("diary"), icon: <UtensilsIcon className="h-5 w-5" /> },
    { path: "/analytics", label: translate("analytics"), icon: <LineChartIcon className="h-5 w-5" /> },
    { path: "/planner", label: translate("planner"), icon: <ListChecksIcon className="h-5 w-5" /> },
    { path: "/recipes", label: translate("recipes"), icon: <BookOpenIcon className="h-5 w-5" /> },
    { path: "/progress", label: translate("progress"), icon: <PieChartIcon className="h-5 w-5" /> },
    { path: "/community", label: translate("community"), icon: <UsersIcon className="h-5 w-5" /> },
  ];

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo and brand */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Apple className="h-6 w-6 text-orange-500" />
            <span>CaloriX</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <div className="flex flex-col items-center">
                {item.icon}
                <span className="mt-1">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Mobile navigation */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full py-4">
                <div className="flex items-center mb-6">
                  <Apple className="h-6 w-6 text-orange-500 mr-2" />
                  <span className="font-bold text-xl">CaloriX</span>
                </div>
                
                <nav className="space-y-2 flex-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location.pathname === item.path
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
                
                <div className="pt-4 border-t mt-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <ThemeSelector />
                    <LanguageSelector />
                  </div>
                  
                  {user ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/avatar.png" alt={user.name} />
                          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{user.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={logout}>
                        {translate("logout")}
                      </Button>
                    </div>
                  ) : (
                    <Button asChild size="sm" variant="default" className="w-full">
                      <Link to="/login">{translate("login")}</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}

        {/* User menu, theme, language */}
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <LanguageSelector />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.png" alt={user.name} />
                    <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{translate("my_account")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="flex w-full items-center">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>{translate("profile")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="flex w-full items-center">
                    <Settings2Icon className="mr-2 h-4 w-4" />
                    <span>{translate("settings")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/premium" className="flex w-full items-center">
                    <span className="mr-2 text-amber-500">✨</span>
                    <span>{translate("premium")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  {translate("logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" variant="default">
              <Link to="/login">{translate("login")}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
