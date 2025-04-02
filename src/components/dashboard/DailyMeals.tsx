
import React from "react";
import { MealCard } from "@/components/MealCard";
import { FoodItem } from "@/context/NutritionContext";
import { CoffeeIcon, UtensilsCrossedIcon, SoupIcon, CakeIcon } from "lucide-react";
import { MoreFoodOptionsMenu } from "@/components/MoreFoodOptionsMenu";

interface DailyMealsProps {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  dinner: FoodItem[];
  snack: FoodItem[];
  onAddFood: (mealType: "breakfast" | "lunch" | "dinner" | "snack") => void;
  onRemoveFood: (mealType: "breakfast" | "lunch" | "dinner" | "snack", foodId: string) => void;
}

export function DailyMeals({ 
  breakfast, 
  lunch, 
  dinner, 
  snack, 
  onAddFood, 
  onRemoveFood 
}: DailyMealsProps) {
  return (
    <div className="mt-6 space-y-6">
      <MealCard
        title="breakfast"
        icon={<CoffeeIcon className="h-5 w-5 text-orange-400" />}
        foods={breakfast}
        onAddFood={() => onAddFood("breakfast")}
        onRemoveFood={(foodId) => onRemoveFood("breakfast", foodId)}
        time="08:30"
        actionComponent={<MoreFoodOptionsMenu foodId={""} mealType="breakfast" onDelete={(id) => {}} />}
      />
      <MealCard
        title="lunch"
        icon={<UtensilsCrossedIcon className="h-5 w-5 text-orange-400" />}
        foods={lunch}
        onAddFood={() => onAddFood("lunch")}
        onRemoveFood={(foodId) => onRemoveFood("lunch", foodId)}
        time="13:00"
        actionComponent={<MoreFoodOptionsMenu foodId={""} mealType="lunch" onDelete={(id) => {}} />}
      />
      <MealCard
        title="dinner"
        icon={<SoupIcon className="h-5 w-5 text-orange-400" />}
        foods={dinner}
        onAddFood={() => onAddFood("dinner")}
        onRemoveFood={(foodId) => onRemoveFood("dinner", foodId)}
        time="19:00"
        actionComponent={<MoreFoodOptionsMenu foodId={""} mealType="dinner" onDelete={(id) => {}} />}
      />
      <MealCard
        title="snack"
        icon={<CakeIcon className="h-5 w-5 text-orange-400" />}
        foods={snack}
        onAddFood={() => onAddFood("snack")}
        onRemoveFood={(foodId) => onRemoveFood("snack", foodId)}
        actionComponent={<MoreFoodOptionsMenu foodId={""} mealType="snack" onDelete={(id) => {}} />}
      />
    </div>
  );
}
