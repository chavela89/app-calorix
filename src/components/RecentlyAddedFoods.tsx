
import React from "react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { useNutrition, FoodItem } from "@/context/NutritionContext";

interface RecentlyAddedFoodsProps {
  onFoodSelection: (food: FoodItem) => void;
}

export function RecentlyAddedFoods({ onFoodSelection }: RecentlyAddedFoodsProps) {
  const { translate, language } = useLanguage();
  const { recentlyAddedFoods } = useNutrition();
  
  // Fallback to default foods if no recently added foods
  const defaultFoods: FoodItem[] = [
    {
      id: "1", 
      name: translate("chicken_breast"), 
      calories: 165, 
      proteins: 31, 
      carbs: 0, 
      fats: 3.6,
      amount: 100,
      unit: language === "ru" ? "г" : "g"
    },
    {
      id: "3", 
      name: translate("buckwheat"), 
      calories: 143, 
      proteins: 5.7, 
      carbs: 25, 
      fats: 1.5,
      amount: 100,
      unit: language === "ru" ? "г" : "g"
    },
    {
      id: "4", 
      name: translate("cottage_cheese"), 
      calories: 121, 
      proteins: 18, 
      carbs: 3.3, 
      fats: 5,
      amount: 100,
      unit: language === "ru" ? "г" : "g"
    },
    {
      id: "5", 
      name: translate("apple"), 
      calories: 52, 
      proteins: 0.3, 
      carbs: 14, 
      fats: 0.2,
      amount: 100,
      unit: language === "ru" ? "г" : "g"
    }
  ];

  const foodsToDisplay = recentlyAddedFoods.length > 0 ? recentlyAddedFoods : defaultFoods;

  return (
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-3">{translate("recently_added")}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {foodsToDisplay.map((food) => (
          <div 
            key={food.id}
            className="p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
            onClick={() => onFoodSelection(food)}
          >
            <div className="font-medium">{food.name}</div>
            <div className="text-sm text-muted-foreground">{food.calories} {translate("kcal")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
