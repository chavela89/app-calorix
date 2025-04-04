
import { useState } from "react";
import { useNutrition, FoodItem } from "@/context/NutritionContext";
import { useUser } from "@/context/UserContext";
import { FoodSearch } from "@/components/FoodSearch";
import { AddFoodDialog } from "@/components/AddFoodDialog";
import { PremiumBanner } from "@/components/PremiumBanner";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContextFixed";
import { DateSelector } from "@/components/dashboard/DateSelector";
import { NutritionSummary } from "@/components/dashboard/NutritionSummary";
import { MealTypeButtons } from "@/components/dashboard/MealTypeButtons";
import { RecentlyAddedFoods } from "@/components/dashboard/RecentlyAddedFoods";
import { DailyMeals } from "@/components/dashboard/DailyMeals";
import { SidePanel } from "@/components/dashboard/SidePanel";

export default function Dashboard() {
  const { user } = useUser();
  const { translate } = useLanguage();
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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const changeDate = (days: number) => {
    if (days > 0) {
      setSelectedDate(prev => addDays(prev, days));
    } else {
      setSelectedDate(prev => subDays(prev, Math.abs(days)));
    }
  };

  const handleAddWater = () => {
    updateWaterIntake(250);
  };
  
  const handleRemoveWater = () => {
    updateWaterIntake(-250);
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

  const handleFoodSelection = (food: any) => {
    if (!selectedMealType) {
      setSelectedMealType("snack");
    }
    addFoodToMeal(selectedMealType || "snack", {
      id: food.id,
      name: food.name,
      calories: food.calories,
      proteins: food.protein || 0,
      fats: food.fat || 0,
      carbs: food.carbs || 0,
      amount: 100,
      unit: "г"
    });
    toast({
      title: translate("food_added"),
      description: `${food.name} ${translate("added_to")} ${translate(selectedMealType || "snack")}`,
    });
  };

  const totals = {
    calories: getTotalCalories(),
    proteins: getTotalProteins(),
    fats: getTotalFats(),
    carbs: getTotalCarbs()
  };

  const breakfast = todayNutrition.meals.find(meal => meal.type === "breakfast")?.foods || [];
  const lunch = todayNutrition.meals.find(meal => meal.type === "lunch")?.foods || [];
  const dinner = todayNutrition.meals.find(meal => meal.type === "dinner")?.foods || [];
  const snack = todayNutrition.meals.find(meal => meal.type === "snack")?.foods || [];

  const { calorieGoal, proteinGoal, fatGoal, carbGoal, waterGoal } = user?.settings || {
    calorieGoal: 2200,
    proteinGoal: 150,
    fatGoal: 73,
    carbGoal: 220,
    waterGoal: 2500,
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <PremiumBanner />
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{translate("diary")}</h1>
        <DateSelector 
          selectedDate={selectedDate} 
          onDateChange={changeDate}
        />
      </div>

      <NutritionSummary 
        calorieData={{
          consumed: totals.calories,
          goal: calorieGoal,
          burnedCalories: 320
        }}
        macroData={{
          proteins: { current: totals.proteins, goal: proteinGoal },
          fats: { current: totals.fats, goal: fatGoal },
          carbs: { current: totals.carbs, goal: carbGoal }
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <div className="mt-4">
            <FoodSearch 
              onSelectFood={handleFoodSelection}
              placeholder={translate("search_food_or_scan")}
            />
            
            <MealTypeButtons onSelectMeal={handleOpenAddFood} />
            
            <RecentlyAddedFoods onFoodSelection={handleFoodSelection} />

            <DailyMeals
              breakfast={breakfast}
              lunch={lunch}
              dinner={dinner}
              snack={snack}
              onAddFood={handleOpenAddFood}
              onRemoveFood={removeFoodFromMeal}
            />
          </div>
        </div>

        <SidePanel
          water={{
            current: todayNutrition.water,
            goal: waterGoal,
            onAdd: handleAddWater,
            onRemove: handleRemoveWater
          }}
          date={{
            selected: selectedDate,
            onSelect: (date) => date && setSelectedDate(date)
          }}
        />
      </div>

      <AddFoodDialog
        isOpen={isAddFoodOpen}
        onClose={handleCloseAddFood}
        onAddFood={handleAddFood}
        mealType={selectedMealType || undefined}
      />
      
      <div className="fixed bottom-6 right-6">
        <Button 
          size="lg" 
          className="rounded-full w-12 h-12 p-0 shadow-lg"
          onClick={() => setIsAddFoodOpen(true)}
        >
          <PlusCircleIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
