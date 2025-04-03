
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, BookOpenIcon, PlusIcon, SaveIcon, Trash2Icon, CheckCircleIcon } from "lucide-react";
import { FoodSearch } from "@/components/FoodSearch";
import { useNutrition, FoodItem } from "@/context/NutritionContext";
import { toast } from "@/components/ui/use-toast";

export default function Planner() {
  const { translate, language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("day");
  const { addFoodToMeal } = useNutrition();
  const [shoppingItems, setShoppingItems] = useState([
    { id: 1, name: language === "ru" ? "Куриная грудка (500г)" : "Chicken breast (500g)", checked: true },
    { id: 2, name: language === "ru" ? "Овощи для салата" : "Vegetables for salad", checked: false },
    { id: 3, name: language === "ru" ? "Рис бурый (1кг)" : "Brown rice (1kg)", checked: false },
    { id: 4, name: language === "ru" ? "Йогурт греческий (4 шт)" : "Greek yogurt (4 pcs)", checked: false },
    { id: 5, name: language === "ru" ? "Бананы (6 шт)" : "Bananas (6 pcs)", checked: false }
  ]);
  const [newShoppingItem, setNewShoppingItem] = useState("");

  // Демо-данные для планировщика
  const mealPlan = [
    {
      mealType: "breakfast",
      label: translate("breakfast"),
      time: "08:00",
      items: [
        { name: language === "ru" ? "Овсяная каша" : "Oatmeal", calories: 150, protein: 5, fat: 3, carbs: 27 },
        { name: language === "ru" ? "Банан" : "Banana", calories: 105, protein: 1.3, fat: 0.4, carbs: 27 },
        { name: language === "ru" ? "Миндальное молоко" : "Almond milk", calories: 30, protein: 1, fat: 2.5, carbs: 1 }
      ]
    },
    {
      mealType: "lunch",
      label: translate("lunch"),
      time: "13:00",
      items: [
        { name: language === "ru" ? "Куриная грудка" : "Chicken breast", calories: 165, protein: 31, fat: 3.6, carbs: 0 },
        { name: language === "ru" ? "Рис бурый" : "Brown rice", calories: 110, protein: 2.5, fat: 0.9, carbs: 23 },
        { name: language === "ru" ? "Овощной салат" : "Vegetable salad", calories: 45, protein: 1, fat: 0.2, carbs: 10 }
      ]
    },
    {
      mealType: "dinner",
      label: translate("dinner"),
      time: "19:00",
      items: [
        { name: language === "ru" ? "Лосось" : "Salmon", calories: 180, protein: 22, fat: 10, carbs: 0 },
        { name: language === "ru" ? "Киноа" : "Quinoa", calories: 120, protein: 4, fat: 1.9, carbs: 22 },
        { name: language === "ru" ? "Брокколи" : "Broccoli", calories: 55, protein: 2.6, fat: 0.4, carbs: 11 }
      ]
    },
    {
      mealType: "snack",
      label: translate("snack"),
      time: "16:00",
      items: [
        { name: language === "ru" ? "Греческий йогурт" : "Greek yogurt", calories: 100, protein: 10, fat: 2, carbs: 8 },
        { name: language === "ru" ? "Черника" : "Blueberries", calories: 45, protein: 0.6, fat: 0.2, carbs: 11 }
      ]
    }
  ];

  const dayLabels = language === "ru" ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthDays = Array.from({ length: 35 }, (_, i) => i - 3); // Пример для отображения календарного месяца

  const formatDate = (date = new Date()) => {
    return new Intl.DateTimeFormat(language === "ru" ? 'ru-RU' : 'en-US', { 
      day: 'numeric', 
      month: language === "ru" ? 'long' : 'long', 
      year: 'numeric' 
    }).format(date);
  };

  // Расчет общих макронутриентов за день
  const calculateDailyTotals = () => {
    let totals = { calories: 0, protein: 0, fat: 0, carbs: 0 };
    
    mealPlan.forEach(meal => {
      meal.items.forEach(item => {
        totals.calories += item.calories;
        totals.protein += item.protein;
        totals.fat += item.fat;
        totals.carbs += item.carbs;
      });
    });
    
    return totals;
  };

  const dailyTotals = calculateDailyTotals();

  // Шаблоны питания для выбора
  const mealTemplates = [
    { id: 1, name: language === "ru" ? "Стандартное питание" : "Standard diet", description: language === "ru" ? "Сбалансированное питание для поддержания веса" : "Balanced diet for weight maintenance" },
    { id: 2, name: language === "ru" ? "Низкоуглеводная диета" : "Low-carb diet", description: language === "ru" ? "Диета с ограничением углеводов для похудения" : "Diet with limited carbs for weight loss" },
    { id: 3, name: language === "ru" ? "Высокобелковая диета" : "High-protein diet", description: language === "ru" ? "Для набора мышечной массы и интенсивных тренировок" : "For muscle gain and intensive training" },
    { id: 4, name: language === "ru" ? "Вегетарианский план" : "Vegetarian plan", description: language === "ru" ? "Сбалансированный план без мяса" : "Balanced plan without meat" },
    { id: 5, name: language === "ru" ? "Кето-диета" : "Keto diet", description: language === "ru" ? "Высокожировая и низкоуглеводная диета" : "High-fat and low-carb diet" },
  ];

  // Function to handle adding a food item to a meal plan
  const handleAddFood = (mealType) => {
    toast({
      title: translate("add_food"),
      description: `${translate("to")} ${translate(mealType)}`,
    });
  };

  // Handle food selection from search
  const handleFoodSelect = (food, mealType) => {
    const newFood = {
      id: Math.random().toString(36).substring(7),
      name: food.name,
      calories: food.calories,
      proteins: food.protein,
      fats: food.fat,
      carbs: food.carbs,
      amount: 100,
      unit: "g"
    };
    
    addFoodToMeal(mealType, newFood);
    
    toast({
      title: translate("food_added"),
      description: `${food.name} ${translate("added_to")} ${translate(mealType)}`,
    });
  };

  // Handler for removing a food item
  const handleRemoveFood = (mealType, itemIndex) => {
    // In a real app, you would remove the item from the state/database
    toast({
      title: translate("item_deleted"),
      description: `${translate("item_removed_from_meal")}`,
    });
  };

  // Shopping list handlers
  const handleAddShoppingItem = () => {
    if (newShoppingItem.trim()) {
      setShoppingItems([
        ...shoppingItems,
        { id: Date.now(), name: newShoppingItem, checked: false }
      ]);
      setNewShoppingItem("");
      
      toast({
        title: translate("add_item"),
        description: `${newShoppingItem} ${language === "ru" ? "добавлен в список" : "added to list"}`,
      });
    }
  };

  const toggleShoppingItemCheck = (id) => {
    setShoppingItems(
      shoppingItems.map(item => 
        item.id === id ? {...item, checked: !item.checked} : item
      )
    );
  };

  const handleSaveList = () => {
    toast({
      title: translate("save_list"),
      description: language === "ru" ? "Список покупок сохранен" : "Shopping list saved",
    });
  };

  const handleAddNewMeal = () => {
    toast({
      title: translate("add_meal"),
      description: language === "ru" ? "Добавлен новый прием пищи" : "New meal added",
    });
  };

  // Handler for week view meal plan
  const handleWeekdayMealClick = (day, mealType) => {
    toast({
      title: `${translate(mealType)} - ${day}`,
      description: language === "ru" ? "Редактирование питания" : "Editing meal plan",
    });
  };

  // Handler for month view day selection
  const handleMonthDayClick = (day) => {
    if (day > 0 && day <= 30) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
      setActiveTab("day");
      
      toast({
        description: language === "ru" ? `Выбрано: ${day} ${formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)).split(' ')[1]}` : 
          `Selected: ${formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}`,
      });
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">{translate("meal_planner")}</h1>
        
        <div className="flex flex-wrap items-center gap-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="day">{translate("day")}</TabsTrigger>
              <TabsTrigger value="week">{translate("week")}</TabsTrigger>
              <TabsTrigger value="month">{translate("month")}</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            {formatDate(currentDate)}
          </Button>
          
          <Select defaultValue="template1">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={translate("select_template")} />
            </SelectTrigger>
            <SelectContent>
              {mealTemplates.map(template => (
                <SelectItem key={template.id} value={`template${template.id}`}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main tabs content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="day">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              {mealPlan.map((meal, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-medium">{meal.label} • {meal.time}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleAddFood(meal.mealType)}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="divide-y">
                      {meal.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="py-2 flex justify-between items-center">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.calories} {translate("kcal")} • {item.protein}g {translate("protein")} • 
                              {item.fat}g {translate("fat")} • {item.carbs}g {translate("carbs")}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveFood(meal.mealType, itemIndex)}
                            >
                              <Trash2Icon className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="py-2">
                        <FoodSearch 
                          onSelectFood={(food) => handleFoodSelect(food, meal.mealType)}
                          placeholder={`${translate("add_food")} ${translate("to")} ${meal.label}`}
                        />
                      </div>
                      
                      <div className="py-2 text-center">
                        <Button 
                          variant="ghost" 
                          className="w-full" 
                          size="sm"
                          onClick={() => handleAddFood(meal.mealType)}
                        >
                          <PlusIcon className="h-4 w-4 mr-2" />
                          {translate("add_food")}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button className="w-full" onClick={handleAddNewMeal}>
                <PlusIcon className="h-4 w-4 mr-2" />
                {translate("add_meal")}
              </Button>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{translate("daily_nutrition")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>{translate("calories")}</span>
                        <span>{dailyTotals.calories} / 2200 {translate("kcal")}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${Math.min(100, (dailyTotals.calories / 2200) * 100)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>{translate("protein")}</span>
                        <span>{dailyTotals.protein.toFixed(1)} / 130g</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${Math.min(100, (dailyTotals.protein / 130) * 100)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>{translate("fat")}</span>
                        <span>{dailyTotals.fat.toFixed(1)} / 70g</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500 rounded-full" 
                          style={{ width: `${Math.min(100, (dailyTotals.fat / 70) * 100)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>{translate("carbs")}</span>
                        <span>{dailyTotals.carbs.toFixed(1)} / 220g</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full" 
                          style={{ width: `${Math.min(100, (dailyTotals.carbs / 220) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{translate("shopping_list")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input 
                        placeholder={translate("add_item")} 
                        value={newShoppingItem} 
                        onChange={(e) => setNewShoppingItem(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddShoppingItem()}
                      />
                      <Button size="sm" variant="secondary" onClick={handleAddShoppingItem}>
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      {shoppingItems.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => toggleShoppingItemCheck(item.id)}
                        >
                          <CheckCircleIcon className={`h-5 w-5 ${item.checked ? 'text-green-500' : 'text-muted-foreground'}`} />
                          <span className={item.checked ? 'text-muted-foreground line-through' : ''}>{item.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        variant="outline" 
                        className="w-full gap-2"
                        onClick={handleSaveList}
                      >
                        <SaveIcon className="h-4 w-4" />
                        {translate("save_list")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="week">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-7 gap-4">
                {dayLabels.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="font-medium mb-4">{day}</div>
                    
                    <div className="space-y-3">
                      {mealPlan.map((meal, mealIndex) => (
                        <div 
                          key={mealIndex} 
                          className="bg-muted/50 p-3 rounded-md text-xs cursor-pointer hover:bg-muted transition"
                          onClick={() => handleWeekdayMealClick(day, meal.mealType)}
                        >
                          <div className="font-medium">{meal.label}</div>
                          <div className="text-muted-foreground mt-1">
                            {meal.items.length} {translate("items")}
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleAddNewMeal()}
                      >
                        <PlusIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-7 gap-4">
                {dayLabels.map((day, index) => (
                  <div key={index} className="text-center font-medium">{day}</div>
                ))}
                
                {monthDays.map((day, index) => (
                  <div 
                    key={index} 
                    className={`h-24 border rounded-md p-2 ${
                      day < 1 || day > 30 ? 'text-muted-foreground bg-muted/20' : 'cursor-pointer hover:bg-muted/50'
                    } ${day === 15 ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleMonthDayClick(day)}
                  >
                    <div className="flex justify-between">
                      <span>{day > 0 && day <= 30 ? day : ''}</span>
                      {day === 15 && <div className="h-2 w-2 bg-primary rounded-full"></div>}
                    </div>
                    
                    {day > 0 && day <= 30 && day % 3 === 0 && (
                      <div className="mt-2">
                        <div className="text-xs bg-green-500/20 text-green-700 p-1 rounded mt-1">
                          {translate("planned")}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
