
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeSelector } from "@/components/ThemeSelector";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContextFixed";
import { useUser } from "@/context/UserContext";
import {
  LayoutDashboardIcon,
  LineChartIcon,
  CalendarIcon,
  BookOpenIcon,
  BarChart2Icon,
  UsersIcon,
  SettingsIcon,
  MenuIcon,
  XIcon,
  UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { translate } = useLanguage();
  const { user } = useUser();
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const routes = [
    {
      href: "/",
      label: translate("dashboard"),
      icon: <LayoutDashboardIcon className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />,
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

  // Проверяем, активен ли текущий маршрут
  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">CaloriX</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {routes.map((route, index) => (
              <Link
                key={index}
                to={route.href}
                className={cn(
                  "flex items-center gap-2 transition-colors hover:text-foreground/80",
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
          <span className="sr-only">Toggle Menu</span>
        </Button>
        
        <div className="flex items-center md:hidden">
          <Link to="/" className="font-bold">
            CaloriX
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden items-center gap-2 md:flex">
            <ThemeSelector />
            <LanguageSelector />
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label={translate("my_account")}
            className="rounded-full"
            asChild
          >
            <Link to="/profile">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserIcon className="h-4 w-4" />
                </div>
              )}
            </Link>
          </Button>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMobileNavOpen && (
        <div className="container pb-3 pt-1 md:hidden">
          <nav className="grid grid-cols-3 gap-2">
            {routes.map((route, index) => (
              <Link
                key={index}
                to={route.href}
                onClick={() => setIsMobileNavOpen(false)}
                className={cn(
                  "flex flex-col items-center rounded-md p-3 text-center text-xs transition-colors hover:bg-muted",
                  isActive(route.href)
                    ? `font-medium ${route.activeColor} bg-muted`
                    : "text-foreground/60"
                )}
              >
                {route.icon}
                <span className="mt-1">{route.label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsMobileNavOpen(false);
              }}
              asChild
            >
              <Link to="/settings">
                <SettingsIcon className="mr-2 h-4 w-4" />
                {translate("settings")}
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <ThemeSelector />
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
