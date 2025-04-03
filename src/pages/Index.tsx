
import { useLanguage } from "@/context/LanguageContextFixed";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppleIcon } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  
  // Автоматический редирект на страницу дашборда
  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center max-w-lg px-4">
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30">
            <AppleIcon className="h-16 w-16 text-orange-500" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">CaloriX</h1>
        <p className="text-xl text-muted-foreground mb-8">
          {translate("welcome_description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => navigate('/')}>
            {translate("go_to_dashboard")}
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/premium')}>
            {translate("learn_about_premium")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
