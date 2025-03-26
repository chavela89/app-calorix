
import { useEffect, useState } from "react";
import { useNutrition } from "@/context/NutritionContext";
import { useUser } from "@/context/UserContext";
import { CaloriesSummary } from "@/components/CaloriesSummary";
import { MacrosSummary } from "@/components/MacrosSummary";
import { WaterTracker } from "@/components/WaterTracker";
import { MealCard, FoodItem } from "@/components/MealCard";
import { AddFoodDialog } from "@/components/AddFoodDialog";
import { CoffeeIcon, UtensilsCrossedIcon, SoupIcon, CakeIcon } from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();
  const { 
    dailyNutrition, 
    totals, 
    addFood, 
    removeFood, 
    updateWater 
  } = useNutrition();
  
  const [selectedMealType, setSelectedMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack" | null>(null);
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);

  const handleAddWater = () => {
    updateWater(250); // Добавляем 250 мл воды
  };
  
  const handleRemoveWater = () => {
    updateWater(-250); // Уменьшаем на 250 мл
  };
  
  const handleOpenAddFood = (mealType: "breakfast" | "lunch" | "dinner" | "snack") => {
    setSelectedMealType(mealType);
    setIsAddFoodOpen(true);
  };
  
  const handleCloseAddFood = () => {
    setIsAddFoodOpen(false);
    setSelectedMealType(null);
  };
  
  const handleAddFood = (food: FoodItem) => {
    if (selectedMealType) {
      addFood(selectedMealType, food);
    }
  };

  // Находим завтрак, обед, ужин и перекус
  const breakfast = dailyNutrition.meals.find(meal => meal.type === "breakfast")?.foods || [];
  const lunch = dailyNutrition.meals.find(meal => meal.type === "lunch")?.foods || [];
  const dinner = dailyNutrition.meals.find(meal => meal.type === "dinner")?.foods || [];
  const snack = dailyNutrition.meals.find(meal => meal.type === "snack")?.foods || [];

  const { calorieGoal, proteinGoal, fatGoal, carbGoal, waterGoal } = user?.settings || {
    calorieGoal: 2000,
    proteinGoal: 100,
    fatGoal: 70,
    carbGoal: 250,
    waterGoal: 2500,
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Сводка калорий и макронутриентов */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-lg font-semibold">Калории</h2>
          <CaloriesSummary 
            consumed={totals.calories} 
            goal={calorieGoal} 
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Макронутриенты</h2>
          <MacrosSummary
            proteins={{
              current: totals.proteins,
              goal: proteinGoal,
            }}
            fats={{
              current: totals.fats,
              goal: fatGoal,
            }}
            carbs={{
              current: totals.carbs,
              goal: carbGoal,
            }}
          />
        </div>
      </div>

      {/* Водный баланс */}
      <WaterTracker
        current={dailyNutrition.water}
        goal={waterGoal}
        onAdd={handleAddWater}
        onRemove={handleRemoveWater}
      />

      {/* Приемы пищи */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MealCard
          title="Завтрак"
          icon={<CoffeeIcon className="h-5 w-5" />}
          foods={breakfast}
          onAddFood={() => handleOpenAddFood("breakfast")}
          onRemoveFood={(foodId) => removeFood("breakfast", foodId)}
        />
        <MealCard
          title="Обед"
          icon={<UtensilsCrossedIcon className="h-5 w-5" />}
          foods={lunch}
          onAddFood={() => handleOpenAddFood("lunch")}
          onRemoveFood={(foodId) => removeFood("lunch", foodId)}
        />
        <MealCard
          title="Ужин"
          icon={<SoupIcon className="h-5 w-5" />}
          foods={dinner}
          onAddFood={() => handleOpenAddFood("dinner")}
          onRemoveFood={(foodId) => removeFood("dinner", foodId)}
        />
        <MealCard
          title="Перекус"
          icon={<CakeIcon className="h-5 w-5" />}
          foods={snack}
          onAddFood={() => handleOpenAddFood("snack")}
          onRemoveFood={(foodId) => removeFood("snack", foodId)}
        />
      </div>

      {/* Диалог добавления продукта */}
      <AddFoodDialog
        isOpen={isAddFoodOpen}
        onClose={handleCloseAddFood}
        onAddFood={handleAddFood}
      />
    </div>
  );
}
