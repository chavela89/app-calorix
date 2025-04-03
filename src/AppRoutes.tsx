
import { useUser } from "@/context/UserContext";
import { Navbar } from "@/components/Navbar";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Pages
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

// Protected route
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

const AppRoutes = () => {
  const { user } = useUser();
  const location = useLocation();
  
  // Прокрутка страницы вверх при переходе по маршрутам
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <>
      {user && <Navbar />}
      <div className="min-h-screen bg-background" style={{ backgroundColor: 'var(--background-color, white)' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Main pages */}
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
          <Route path="/planner" element={<PrivateRoute><Planner /></PrivateRoute>} />
          <Route path="/recipes" element={<PrivateRoute><Recipes /></PrivateRoute>} />
          <Route path="/recipe-calculator" element={<PrivateRoute><RecipeCalculator /></PrivateRoute>} />
          <Route path="/progress" element={<PrivateRoute><Progress /></PrivateRoute>} />
          <Route path="/community" element={<PrivateRoute><Community /></PrivateRoute>} />
          
          {/* User pages */}
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/premium" element={<PrivateRoute><Premium /></PrivateRoute>} />
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;
