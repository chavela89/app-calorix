
import React from "react";
import { useLanguage } from "@/context/LanguageContextFixed";

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface RecentlyAddedFoodsProps {
  onFoodSelection: (food: FoodItem) => void;
}

export function RecentlyAddedFoods({ onFoodSelection }: RecentlyAddedFoodsProps) {
  const { translate } = useLanguage();
  
  const recentFoods = [
    {
      id: "1", 
      name: translate("chicken_breast"), 
      calories: 165, 
      protein: 31, 
      carbs: 0, 
      fat: 3.6
    },
    {
      id: "3", 
      name: translate("buckwheat"), 
      calories: 143, 
      protein: 5.7, 
      carbs: 25, 
      fat: 1.5
    },
    {
      id: "4", 
      name: translate("cottage_cheese"), 
      calories: 121, 
      protein: 18, 
      carbs: 3.3, 
      fat: 5
    },
    {
      id: "5", 
      name: translate("apple"), 
      calories: 52, 
      protein: 0.3, 
      carbs: 14, 
      fat: 0.2
    }
  ];

  return (
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-3">{translate("recently_added")}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {recentFoods.map((food) => (
          <div 
            key={food.id}
            className="p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
            onClick={() => onFoodSelection(food)}
          >
            <div className="font-medium">{food.name}</div>
            <div className="text-sm text-muted-foreground">{food.calories} kcal</div>
          </div>
        ))}
      </div>
    </div>
  );
}
