
import { useEffect, useState } from "react";
import { useNutrition, FoodItem } from "@/context/NutritionContext";
import { useUser } from "@/context/UserContext";
import { CaloriesSummary } from "@/components/CaloriesSummary";
import { MacrosSummary } from "@/components/MacrosSummary";
import { WaterTracker } from "@/components/WaterTracker";
import { MealCard } from "@/components/MealCard";
import { AddFoodDialog } from "@/components/AddFoodDialog";
import { Calendar } from "@/components/ui/calendar";
import { 
  CoffeeIcon, 
  UtensilsCrossedIcon, 
  SoupIcon, 
  CakeIcon, 
  CalendarIcon, 
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  MicIcon,
  PlusCircleIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState<string>("meals");

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
    calorieGoal: 2200,
    proteinGoal: 150,
    fatGoal: 73,
    carbGoal: 220,
    waterGoal: 2500,
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Заголовок и дата */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Дневник питания</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="flex items-center gap-2 h-8 px-3">
            <CalendarIcon className="h-4 w-4" />
            <span className="text-sm">
              {selectedDate 
                ? format(selectedDate, "EEEE, d MMMM", { locale: ru }) 
                : "сегодня"}
            </span>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
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
          />
        </Card>
        
        <Card className="p-6 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Макронутриенты</h2>
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
        </Card>
      </div>

      {/* Поиск продуктов и быстрое добавление приемов пищи */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <Tabs defaultValue="meals" onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="meals" className="flex-1">Приемы пищи</TabsTrigger>
              <TabsTrigger value="analytics" className="flex-1">Аналитика</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {activeTab === "meals" ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 lg:col-span-2 space-y-6">
              {/* Поиск продуктов */}
              <div className="relative">
                <Input 
                  placeholder="Найти продукт..." 
                  className="pl-10 pr-10"
                  onClick={() => setIsAddFoodOpen(true)}
                  readOnly
                />
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <MicIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
              
              {/* Быстрое добавление */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button 
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleOpenAddFood("breakfast")}
                >
                  <CoffeeIcon className="h-4 w-4 mr-2" /> Завтрак
                </Button>
                <Button 
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleOpenAddFood("lunch")}
                >
                  <UtensilsCrossedIcon className="h-4 w-4 mr-2" /> Обед
                </Button>
                <Button 
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleOpenAddFood("dinner")}
                >
                  <SoupIcon className="h-4 w-4 mr-2" /> Ужин
                </Button>
                <Button 
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleOpenAddFood("snack")}
                >
                  <CakeIcon className="h-4 w-4 mr-2" /> Перекус
                </Button>
              </div>

              {/* Недавно добавленные */}
              <div>
                <h3 className="text-md font-semibold mb-3">Недавно добавленные</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Куриная грудка</div>
                    <div className="text-sm text-muted-foreground">120 ккал</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Гречка</div>
                    <div className="text-sm text-muted-foreground">150 ккал</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Творог 5%</div>
                    <div className="text-sm text-muted-foreground">90 ккал</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Яблоко</div>
                    <div className="text-sm text-muted-foreground">70 ккал</div>
                  </div>
                </div>
              </div>

              {/* Приемы пищи */}
              <MealCard
                title="Завтрак"
                icon={<CoffeeIcon className="h-5 w-5 text-orange-400" />}
                foods={breakfast}
                onAddFood={() => handleOpenAddFood("breakfast")}
                onRemoveFood={(foodId) => removeFoodFromMeal("breakfast", foodId)}
                time="08:30"
              />
              <MealCard
                title="Обед"
                icon={<UtensilsCrossedIcon className="h-5 w-5 text-orange-400" />}
                foods={lunch}
                onAddFood={() => handleOpenAddFood("lunch")}
                onRemoveFood={(foodId) => removeFoodFromMeal("lunch", foodId)}
                time="13:00"
              />
              <MealCard
                title="Ужин"
                icon={<SoupIcon className="h-5 w-5 text-orange-400" />}
                foods={dinner}
                onAddFood={() => handleOpenAddFood("dinner")}
                onRemoveFood={(foodId) => removeFoodFromMeal("dinner", foodId)}
                time="19:00"
              />
              <MealCard
                title="Перекус"
                icon={<CakeIcon className="h-5 w-5 text-orange-400" />}
                foods={snack}
                onAddFood={() => handleOpenAddFood("snack")}
                onRemoveFood={(foodId) => removeFoodFromMeal("snack", foodId)}
              />
            </div>

            {/* Водный баланс */}
            <div className="col-span-1 lg:col-span-1">
              <WaterTracker
                current={todayNutrition.water}
                goal={waterGoal}
                onAdd={handleAddWater}
                onRemove={handleRemoveWater}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Калории по дням</h2>
              <div className="h-64 flex items-center justify-center">
                <p className="text-muted-foreground">График калорий будет доступен в ближайшем обновлении</p>
              </div>
            </Card>
          </div>
          
          <div className="col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Распределение нутриентов</h2>
              <div className="h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Статистика будет доступна в ближайшем обновлении</p>
              </div>
            </Card>
          </div>
        </div>
      )}

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
