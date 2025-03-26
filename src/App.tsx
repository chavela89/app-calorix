
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { UserProvider } from "@/context/UserContext";
import { NutritionProvider } from "@/context/NutritionContext";
import { Navbar } from "@/components/Navbar";

// Страницы
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import Planner from "./pages/Planner";
import Recipes from "./pages/Recipes";
import RecipeCalculator from "./pages/RecipeCalculator";
import Progress from "./pages/Progress";
import Community from "./pages/Community";
import Premium from "./pages/Premium";
import { useUser } from "./context/UserContext";

const queryClient = new QueryClient();

// Защищенный роут
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

const AppRoutes = () => {
  const { user } = useUser();
  
  return (
    <>
      {user && <Navbar />}
      <div className="min-h-screen bg-background" style={{ backgroundColor: 'var(--background-color, white)' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Основные страницы */}
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
          <Route path="/planner" element={<PrivateRoute><Planner /></PrivateRoute>} />
          <Route path="/recipes" element={<PrivateRoute><Recipes /></PrivateRoute>} />
          <Route path="/recipe-calculator" element={<PrivateRoute><RecipeCalculator /></PrivateRoute>} />
          <Route path="/progress" element={<PrivateRoute><Progress /></PrivateRoute>} />
          <Route path="/community" element={<PrivateRoute><Community /></PrivateRoute>} />
          
          {/* Пользовательские страницы */}
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/premium" element={<PrivateRoute><Premium /></PrivateRoute>} />
          
          {/* Страница 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <NutritionProvider>
            <TooltipProvider>
              <BrowserRouter>
                <AppRoutes />
                <Toaster />
                <Sonner />
              </BrowserRouter>
            </TooltipProvider>
          </NutritionProvider>
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
