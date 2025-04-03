
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeSelector } from "@/components/ThemeSelector";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useUser } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContextFixed";
import {
  UtensilsCrossedIcon,
  LineChartIcon,
  CalendarIcon,
  BookOpenIcon,
  BarChart2Icon,
  UsersIcon,
  MenuIcon,
  XIcon,
  LogOutIcon,
  UserIcon,
  SettingsIcon,
  SparklesIcon,
  AppleIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user, logout } = useUser();
  const { translate } = useLanguage();
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const routes = [
    {
      href: "/",
      label: translate("dashboard"),
      icon: <UtensilsCrossedIcon className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />,
      activeColor: "text-blue-600",
    },
    {
      href: "/analytics",
      label: translate("analytics"),
      icon: <LineChartIcon className="h-4 w-4 md:h-5 md:w-5 text-green-500" />,
      activeColor: "text-green-600",
    },
    {
      href: "/planner",
      label: translate("planner"),
      icon: <CalendarIcon className="h-4 w-4 md:h-5 md:w-5 text-purple-500" />,
      activeColor: "text-purple-600",
    },
    {
      href: "/recipes",
      label: translate("recipes"),
      icon: <BookOpenIcon className="h-4 w-4 md:h-5 md:w-5 text-orange-500" />,
      activeColor: "text-orange-600",
    },
    {
      href: "/progress",
      label: translate("progress"),
      icon: <BarChart2Icon className="h-4 w-4 md:h-5 md:w-5 text-pink-500" />,
      activeColor: "text-pink-600",
    },
    {
      href: "/community",
      label: translate("community"),
      icon: <UsersIcon className="h-4 w-4 md:h-5 md:w-5 text-cyan-500" />,
      activeColor: "text-cyan-600",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex items-center">
          <Link to="/" className="mr-8 flex items-center space-x-2">
            <AppleIcon className="h-6 w-6 text-orange-500" />
            <span className="font-bold">CaloriX</span>
          </Link>
          <nav className="flex items-center space-x-8">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                className={cn(
                  "flex items-center gap-2 text-sm transition-colors hover:text-foreground/80",
                  isActive(route.href)
                    ? `font-medium ${route.activeColor}`
                    : "text-foreground/60"
                )}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        >
          {isMobileNavOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          <span className="sr-only">{translate("toggle_menu")}</span>
        </Button>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeSelector />
          <LanguageSelector />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <UserIcon className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>{translate("profile")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>{translate("settings")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/premium" className="flex items-center">
                  <SparklesIcon className="mr-2 h-4 w-4" />
                  <span>{translate("premium")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="flex items-center">
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>{translate("logout")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isMobileNavOpen && (
        <div className="md:hidden">
          <nav className="grid grid-cols-2 gap-2 p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                onClick={() => setIsMobileNavOpen(false)}
                className={cn(
                  "flex flex-col items-center rounded-lg p-3 text-center hover:bg-accent",
                  isActive(route.href)
                    ? `font-medium ${route.activeColor} bg-accent`
                    : "text-muted-foreground"
                )}
              >
                {route.icon}
                <span className="mt-1 text-xs">{route.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
