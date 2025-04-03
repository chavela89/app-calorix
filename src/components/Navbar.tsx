
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeSelector } from "@/components/ThemeSelector";
import { useUser } from "@/context/UserContext";
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
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const routes = [
    {
      href: "/",
      label: "Дневник питания",
      icon: <UtensilsCrossedIcon className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />,
      activeColor: "text-blue-600",
    },
    {
      href: "/analytics",
      label: "Аналитика",
      icon: <LineChartIcon className="h-4 w-4 md:h-5 md:w-5 text-green-500" />,
      activeColor: "text-green-600",
    },
    {
      href: "/planner",
      label: "Планировщик питания",
      icon: <CalendarIcon className="h-4 w-4 md:h-5 md:w-5 text-purple-500" />,
      activeColor: "text-purple-600",
    },
    {
      href: "/recipes",
      label: "Рецепты",
      icon: <BookOpenIcon className="h-4 w-4 md:h-5 md:w-5 text-orange-500" />,
      activeColor: "text-orange-600",
    },
    {
      href: "/progress",
      label: "Прогресс",
      icon: <BarChart2Icon className="h-4 w-4 md:h-5 md:w-5 text-pink-500" />,
      activeColor: "text-pink-600",
    },
    {
      href: "/community",
      label: "Сообщество",
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
            <svg 
              viewBox="0 0 24 24" 
              className="h-6 w-6 text-orange-500" 
              fill="currentColor"
            >
              <path d="M11.9999 2C6.47774 2 2 6.47774 2 12.0001C2 17.5223 6.47774 22 11.9999 22C17.5222 22 22 17.5223 22 12.0001C22 6.47774 17.5222 2 11.9999 2ZM11.9999 20.0001C7.58883 20.0001 4 16.4112 4 12.0001C4 7.58883 7.58883 4 11.9999 4C16.4111 4 20 7.58883 20 12.0001C20 16.4112 16.4111 20.0001 11.9999 20.0001Z" opacity="0.4"/>
              <path d="M12 6.94922C9.93 6.94922 8.25 8.62922 8.25 10.6992C8.25 12.7142 9.84 14.3592 11.95 14.4192C11.98 14.4192 12.02 14.4192 12.04 14.4192C12.06 14.4192 12.09 14.4192 12.11 14.4192C12.12 14.4192 12.13 14.4192 12.13 14.4192C14.15 14.3492 15.74 12.7142 15.75 10.6992C15.75 8.62922 14.07 6.94922 12 6.94922Z"/>
              <path d="M17.8794 16.0603C16.1694 14.7203 13.6194 13.9903 11.9994 13.9903C10.3794 13.9903 7.83941 14.7203 6.11941 16.0603C5.30941 16.6803 4.86941 17.4803 4.86941 18.3303C4.86941 19.1803 5.30941 19.9703 6.11941 20.5803C7.83941 21.9203 10.3894 22.6503 12.0094 22.6503C13.6294 22.6503 16.1694 21.9203 17.8894 20.5803C18.6994 19.9603 19.1394 19.1703 19.1394 18.3103C19.1294 17.4603 18.6894 16.6803 17.8794 16.0603Z"/>
            </svg>
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
          <span className="sr-only">Переключение меню</span>
        </Button>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeSelector />
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
                  <span>Профиль</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Настройки</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/premium" className="flex items-center">
                  <SparklesIcon className="mr-2 h-4 w-4" />
                  <span>Премиум</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="flex items-center">
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>Выйти</span>
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
