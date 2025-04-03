
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PremiumBanner() {
  const navigate = useNavigate();
  
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
            Откройте все возможности CaloriX
          </h3>
          <p className="text-sm opacity-90">
            Разблокируйте мощные функции для улучшения отслеживания питания
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="text-right mb-3 md:mb-0 md:mr-4">
            <p className="text-xl font-bold">399₽/месяц</p>
            <p className="text-sm opacity-90">или 3999₽/год</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              onClick={handleGetPremium} 
              className="bg-white text-purple-700 hover:bg-gray-100 whitespace-nowrap font-medium"
            >
              Перейти на премиум
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLearnMore}
              className="border-2 border-white text-white hover:bg-white/20 whitespace-nowrap font-medium"
            >
              Подробнее
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
