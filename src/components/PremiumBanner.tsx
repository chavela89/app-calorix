
import { useUser } from "@/context/UserContext";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { SparklesIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useLanguage, useEnhancedLanguage } from "@/context/LanguageContextFixed";
import { useNavigate } from "react-router-dom";

export function PremiumBanner() {
  const { user } = useUser();
  const [dismissed, setDismissed] = useState(false);
  const { translate } = useLanguage();
  const { isEnglish } = useEnhancedLanguage();
  const navigate = useNavigate();

  if (user?.isPremium || dismissed) {
    return null;
  }

  const handlePremiumClick = () => {
    navigate("/premium");
  };

  const handleLearnMoreClick = () => {
    navigate("/premium");
  };

  return (
    <Card className="relative bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 overflow-hidden p-4 mb-6">
      <button
        className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        onClick={() => setDismissed(true)}
        aria-label={isEnglish ? "Close" : "Закрыть"}
      >
        <XIcon className="h-4 w-4" />
      </button>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-shrink-0 bg-amber-200 dark:bg-amber-700 p-3 rounded-full">
          <SparklesIcon className="h-6 w-6 text-amber-600 dark:text-amber-300" />
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <h3 className="font-semibold text-lg mb-1">
            {translate("upgrade_to_premium")}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {translate("premium_description")}
          </p>
          <div className="flex gap-2 justify-center md:justify-start">
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
              onClick={handlePremiumClick}
            >
              {translate("go_premium")}
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleLearnMoreClick}
            >
              {translate("learn_more")}
            </Button>
          </div>
        </div>

        <div className="flex-shrink-0 text-center">
          <div className="text-2xl font-bold">
            {isEnglish ? "$5" : "399₽"}<span className="text-sm font-normal">/{translate("monthly")}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {isEnglish ? "or $42/year" : "или 3999₽/год"}
          </div>
        </div>
      </div>
    </Card>
  );
}
