
import { useEffect, useState } from "react";
import { useNutrition, FoodItem } from "@/context/NutritionContext";
import { useUser } from "@/context/UserContext";
import { CaloriesSummary } from "@/components/CaloriesSummary";
import { MacrosSummary } from "@/components/MacrosSummary";
import { WaterTracker } from "@/components/WaterTracker";
import { MealCard } from "@/components/MealCard";
import { AddFoodDialog } from "@/components/AddFoodDialog";
import { PremiumBanner } from "@/components/PremiumBanner";
import { FoodSearch } from "@/components/FoodSearch";
import { MoreFoodOptionsMenu } from "@/components/MoreFoodOptionsMenu";
import { Calendar } from "@/components/ui/calendar";
import { 
  CoffeeIcon, 
  UtensilsCrossedIcon, 
  SoupIcon, 
  CakeIcon, 
  CalendarIcon, 
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addDays, subDays } from "date-fns";
import { ru } from "date-fns/locale";
import {
  Card
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";

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

  // Функция для смены даты
  const changeDate = (days: number) => {
    if (days > 0) {
      setSelectedDate(prev => addDays(prev, days));
    } else {
      setSelectedDate(prev => subDays(prev, Math.abs(days)));
    }
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();

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

  const handleNutritionAnalysis = () => {
    toast({
      title: translate("nutrition_analysis"),
      description: translate("nutrition_analysis_results"),
    });
  };

  const handleFoodSelection = (food: any) => {
    if (!selectedMealType) {
      setSelectedMealType("snack"); // Default to snack if no meal selected
    }
    addFoodToMeal(selectedMealType || "snack", {
      id: food.id,
      name: food.name,
      calories: food.calories,
      proteins: food.protein,
      fats: food.fat,
      carbs: food.carbs,
      amount: 100
    });
    toast({
      title: translate("food_added"),
      description: `${food.name} ${translate("added_to")} ${translate(selectedMealType || "snack")}`,
    });
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
    calorieGoal: 2200,
    proteinGoal: 150,
    fatGoal: 73,
    carbGoal: 220,
    waterGoal: 2500,
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Премиум баннер */}
      <PremiumBanner />
      
      {/* Заголовок и дата */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{translate("diary")}</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => changeDate(-1)}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="flex items-center gap-2 h-8 px-3">
            <CalendarIcon className="h-4 w-4" />
            <span className="text-sm">
              {isToday 
                ? translate("today") 
                : format(selectedDate, "EEEE, d MMMM", { locale: ru })}
            </span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => changeDate(1)}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Сводка калорий и макронутриентов */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 col-span-1 lg:col-span-1">
          <CaloriesSummary 
            consumed={totals.calories} 
            goal={calorieGoal}
            burnedCalories={320} 
          />
        </Card>
        
        <Card className="p-6 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">{translate("macronutrients")}</h2>
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
          <div className="mt-4">
            <Button onClick={handleNutritionAnalysis} variant="outline" className="w-full">
              {translate("nutrition_analysis")}
            </Button>
          </div>
        </Card>
      </div>

      {/* Поиск продуктов и быстрое добавление приемов пищи */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <div className="mt-4">
            {/* Поиск продуктов */}
            <FoodSearch 
              onSelectFood={handleFoodSelection}
              placeholder={translate("search_food_or_scan")}
            />
            
            {/* Быстрое добавление */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
              <Button 
                variant="outline"
                className="justify-start"
                onClick={() => handleOpenAddFood("breakfast")}
              >
                <CoffeeIcon className="h-4 w-4 mr-2" /> {translate("breakfast")}
              </Button>
              <Button 
                variant="outline"
                className="justify-start"
                onClick={() => handleOpenAddFood("lunch")}
              >
                <UtensilsCrossedIcon className="h-4 w-4 mr-2" /> {translate("lunch")}
              </Button>
              <Button 
                variant="outline"
                className="justify-start"
                onClick={() => handleOpenAddFood("dinner")}
              >
                <SoupIcon className="h-4 w-4 mr-2" /> {translate("dinner")}
              </Button>
              <Button 
                variant="outline"
                className="justify-start"
                onClick={() => handleOpenAddFood("snack")}
              >
                <CakeIcon className="h-4 w-4 mr-2" /> {translate("snack")}
              </Button>
            </div>

            {/* Недавно добавленные */}
            <div className="mt-6">
              <h3 className="text-md font-semibold mb-3">{translate("recently_added")}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div 
                  className="p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => handleFoodSelection({
                    id: "1", 
                    name: translate("chicken_breast"), 
                    calories: 165, 
                    protein: 31, 
                    carbs: 0, 
                    fat: 3.6
                  })}
                >
                  <div className="font-medium">{translate("chicken_breast")}</div>
                  <div className="text-sm text-muted-foreground">120 kcal</div>
                </div>
                <div 
                  className="p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => handleFoodSelection({
                    id: "3", 
                    name: translate("buckwheat"), 
                    calories: 143, 
                    protein: 5.7, 
                    carbs: 25, 
                    fat: 1.5
                  })}
                >
                  <div className="font-medium">{translate("buckwheat")}</div>
                  <div className="text-sm text-muted-foreground">150 kcal</div>
                </div>
                <div 
                  className="p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => handleFoodSelection({
                    id: "4", 
                    name: translate("cottage_cheese"), 
                    calories: 121, 
                    protein: 18, 
                    carbs: 3.3, 
                    fat: 5
                  })}
                >
                  <div className="font-medium">{translate("cottage_cheese")}</div>
                  <div className="text-sm text-muted-foreground">90 kcal</div>
                </div>
                <div 
                  className="p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => handleFoodSelection({
                    id: "5", 
                    name: translate("apple"), 
                    calories: 52, 
                    protein: 0.3, 
                    carbs: 14, 
                    fat: 0.2
                  })}
                >
                  <div className="font-medium">{translate("apple")}</div>
                  <div className="text-sm text-muted-foreground">70 kcal</div>
                </div>
              </div>
            </div>

            {/* Приемы пищи */}
            <div className="mt-6 space-y-6">
              <MealCard
                title={translate("breakfast")}
                icon={<CoffeeIcon className="h-5 w-5 text-orange-400" />}
                foods={breakfast}
                onAddFood={() => handleOpenAddFood("breakfast")}
                onRemoveFood={(foodId) => removeFoodFromMeal("breakfast", foodId)}
                time="08:30"
                actionComponent={<MoreFoodOptionsMenu foodId={""} mealType="breakfast" onDelete={(id) => {}} />}
              />
              <MealCard
                title={translate("lunch")}
                icon={<UtensilsCrossedIcon className="h-5 w-5 text-orange-400" />}
                foods={lunch}
                onAddFood={() => handleOpenAddFood("lunch")}
                onRemoveFood={(foodId) => removeFoodFromMeal("lunch", foodId)}
                time="13:00"
                actionComponent={<MoreFoodOptionsMenu foodId={""} mealType="lunch" onDelete={(id) => {}} />}
              />
              <MealCard
                title={translate("dinner")}
                icon={<SoupIcon className="h-5 w-5 text-orange-400" />}
                foods={dinner}
                onAddFood={() => handleOpenAddFood("dinner")}
                onRemoveFood={(foodId) => removeFoodFromMeal("dinner", foodId)}
                time="19:00"
                actionComponent={<MoreFoodOptionsMenu foodId={""} mealType="dinner" onDelete={(id) => {}} />}
              />
              <MealCard
                title={translate("snack")}
                icon={<CakeIcon className="h-5 w-5 text-orange-400" />}
                foods={snack}
                onAddFood={() => handleOpenAddFood("snack")}
                onRemoveFood={(foodId) => removeFoodFromMeal("snack", foodId)}
                actionComponent={<MoreFoodOptionsMenu foodId={""} mealType="snack" onDelete={(id) => {}} />}
              />
            </div>
          </div>
        </div>

        {/* Водный баланс */}
        <div className="col-span-1 lg:col-span-1">
          <WaterTracker
            current={todayNutrition.water}
            goal={waterGoal}
            onAdd={handleAddWater}
            onRemove={handleRemoveWater}
          />
          
          {/* Календарь */}
          <Card className="p-4 mt-6">
            <h3 className="text-md font-semibold mb-3">{translate("calendar")}</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="w-full border rounded-md"
            />
          </Card>
        </div>
      </div>

      {/* Диалог добавления продукта */}
      <AddFoodDialog
        isOpen={isAddFoodOpen}
        onClose={handleCloseAddFood}
        onAddFood={handleAddFood}
        mealType={selectedMealType || undefined}
      />
      
      {/* Плавающая кнопка добавления */}
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
