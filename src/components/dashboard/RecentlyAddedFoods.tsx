
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
  const defaultFoods = [
    {
      id: "1", 
      name: language === "ru" ? "Куриная грудка" : "Chicken breast", 
      calories: 165, 
      proteins: 31, 
      carbs: 0, 
      fats: 3.6,
      amount: 100,
      unit: "г"
    },
    {
      id: "3", 
      name: language === "ru" ? "Гречка" : "Buckwheat", 
      calories: 143, 
      proteins: 5.7, 
      carbs: 25, 
      fats: 1.5,
      amount: 100,
      unit: "г"
    },
    {
      id: "4", 
      name: language === "ru" ? "Творог" : "Cottage cheese", 
      calories: 121, 
      proteins: 18, 
      carbs: 3.3, 
      fats: 5,
      amount: 100,
      unit: "г"
    },
    {
      id: "5", 
      name: language === "ru" ? "Яблоко" : "Apple", 
      calories: 52, 
      proteins: 0.3, 
      carbs: 14, 
      fats: 0.2,
      amount: 100,
      unit: "г"
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
