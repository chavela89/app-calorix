
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider, EnhancedLanguageProvider } from "@/context/LanguageContextFixed"; // Using our fixed language context
import { UserProvider } from "@/context/UserContext";
import { NutritionProvider } from "@/context/NutritionContext";
import AppRoutes from "./AppRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <EnhancedLanguageProvider>
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
        </EnhancedLanguageProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
