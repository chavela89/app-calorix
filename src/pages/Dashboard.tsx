
import { useEffect, useState } from "react";
import { useNutrition, FoodItem } from "@/context/NutritionContext";
import { useUser } from "@/context/UserContext";
import { CaloriesSummary } from "@/components/CaloriesSummary";
import { MacrosSummary } from "@/components/MacrosSummary";
import { WaterTracker } from "@/components/WaterTracker";
import { MealCard } from "@/components/MealCard";
import { AddFoodDialog } from "@/components/AddFoodDialog";
import { CoffeeIcon, UtensilsCrossedIcon, SoupIcon, CakeIcon } from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();
  const { 
    todayNutrition, 
    getTotalCalories,
    getTotalProteins,
    getTotalFats,
    getTotalCarbs,
    addFoodToMeal, 
    removeFoodFromMeal, 
    updateWaterIntake 
  } = useNutrition();
  
  const [selectedMealType, setSelectedMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack" | null>(null);
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);

  const handleAddWater = () => {
    updateWaterIntake(250); // Добавляем 250 мл воды
  };
  
  const handleRemoveWater = () => {
    updateWaterIntake(-250); // Уменьшаем на 250 мл
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
      addFoodToMeal(selectedMealType, food);
    }
  };

  // Создаем объект для тотальных значений
  const totals = {
    calories: getTotalCalories(),
    proteins: getTotalProteins(),
    fats: getTotalFats(),
    carbs: getTotalCarbs()
  };

  // Находим завтрак, обед, ужин и перекус
  const breakfast = todayNutrition.meals.find(meal => meal.type === "breakfast")?.foods || [];
  const lunch = todayNutrition.meals.find(meal => meal.type === "lunch")?.foods || [];
  const dinner = todayNutrition.meals.find(meal => meal.type === "dinner")?.foods || [];
  const snack = todayNutrition.meals.find(meal => meal.type === "snack")?.foods || [];

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
        current={todayNutrition.water}
        goal={waterGoal}
        onAdd={handleAddWater}
        onRemove={handleRemoveWater}
      />

      {/* Приемы пищи */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MealCard
          title="Завтрак"
          icon={<CoffeeIcon className="h-5 w-5" />}
          foods={breakfast as any[]}
          onAddFood={() => handleOpenAddFood("breakfast")}
          onRemoveFood={(foodId) => removeFoodFromMeal("breakfast", foodId)}
        />
        <MealCard
          title="Обед"
          icon={<UtensilsCrossedIcon className="h-5 w-5" />}
          foods={lunch as any[]}
          onAddFood={() => handleOpenAddFood("lunch")}
          onRemoveFood={(foodId) => removeFoodFromMeal("lunch", foodId)}
        />
        <MealCard
          title="Ужин"
          icon={<SoupIcon className="h-5 w-5" />}
          foods={dinner as any[]}
          onAddFood={() => handleOpenAddFood("dinner")}
          onRemoveFood={(foodId) => removeFoodFromMeal("dinner", foodId)}
        />
        <MealCard
          title="Перекус"
          icon={<CakeIcon className="h-5 w-5" />}
          foods={snack as any[]}
          onAddFood={() => handleOpenAddFood("snack")}
          onRemoveFood={(foodId) => removeFoodFromMeal("snack", foodId)}
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
