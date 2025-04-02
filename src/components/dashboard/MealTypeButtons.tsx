
import React from "react";
import { Button } from "@/components/ui/button";
import { CoffeeIcon, UtensilsCrossedIcon, SoupIcon, CakeIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContextFixed";

interface MealTypeButtonsProps {
  onSelectMeal: (mealType: "breakfast" | "lunch" | "dinner" | "snack") => void;
}

export function MealTypeButtons({ onSelectMeal }: MealTypeButtonsProps) {
  const { translate } = useLanguage();
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
      <Button 
        variant="outline"
        className="justify-start"
        onClick={() => onSelectMeal("breakfast")}
      >
        <CoffeeIcon className="h-4 w-4 mr-2" /> {translate("breakfast")}
      </Button>
      <Button 
        variant="outline"
        className="justify-start"
        onClick={() => onSelectMeal("lunch")}
      >
        <UtensilsCrossedIcon className="h-4 w-4 mr-2" /> {translate("lunch")}
      </Button>
      <Button 
        variant="outline"
        className="justify-start"
        onClick={() => onSelectMeal("dinner")}
      >
        <SoupIcon className="h-4 w-4 mr-2" /> {translate("dinner")}
      </Button>
      <Button 
        variant="outline"
        className="justify-start"
        onClick={() => onSelectMeal("snack")}
      >
        <CakeIcon className="h-4 w-4 mr-2" /> {translate("snack")}
      </Button>
    </div>
  );
}
