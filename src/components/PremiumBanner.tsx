
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContextFixed";

export function PremiumBanner() {
  const { user } = useUser();
  const { translate } = useLanguage();
  const navigate = useNavigate();
  
  // Если пользователь уже имеет премиум-подписку, не показываем баннер
  if (user?.isPremium) {
    return null;
  }
  
  const handleGetPremium = () => {
    navigate('/premium');
  };
  
  const handleLearnMore = () => {
    navigate('/premium');
  };

  return (
    <Card className="bg-gradient-to-r from-violet-500 to-purple-700 text-white shadow-lg mb-6 overflow-visible">
      <CardContent className="flex flex-col md:flex-row justify-between items-center p-6">
        <div className="space-y-2 mb-4 md:mb-0">
          <h3 className="text-xl font-bold flex items-center">
            <SparklesIcon className="h-5 w-5 mr-2" />
            {translate("unlock_features")}
          </h3>
          <p className="text-sm opacity-90">
            {translate("premium_description")}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="text-right mb-3 md:mb-0 md:mr-4">
            <p className="text-xl font-bold">{translate("monthly_price")}</p>
            <p className="text-sm opacity-90">{translate("yearly_price")}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              onClick={handleGetPremium} 
              className="bg-white text-purple-700 hover:bg-gray-100 whitespace-nowrap font-medium"
            >
              {translate("go_premium")}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLearnMore}
              className="border-2 border-white text-white hover:bg-white/20 whitespace-nowrap font-medium"
            >
              {translate("learn_more")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
