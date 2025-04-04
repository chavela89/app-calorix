
import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { CalendarIcon, BookOpenIcon, PlusIcon, SaveIcon, Trash2Icon, CheckCircleIcon, Coffee, UtensilsCrossed, ChefHat, IceCream } from "lucide-react";
import { FoodSearch } from "@/components/FoodSearch";
import { useNutrition, FoodItem } from "@/context/NutritionContext";
import { toast } from "@/components/ui/use-toast";
import { MealCard } from "@/components/MealCard";

export default function Planner() {
  const { translate, language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("day");
  const { addFoodToMeal, removeFoodFromMeal, meals } = useNutrition();
  const [shoppingItems, setShoppingItems] = useState([
    { id: 1, name: language === "ru" ? "Куриная грудка (500г)" : "Chicken breast (500g)", checked: true },
    { id: 2, name: language === "ru" ? "Овощи для салата" : "Vegetables for salad", checked: false },
    { id: 3, name: language === "ru" ? "Рис бурый (1кг)" : "Brown rice (1kg)", checked: false },
    { id: 4, name: language === "ru" ? "Йогурт греческий (4 шт)" : "Greek yogurt (4 pcs)", checked: false },
    { id: 5, name: language === "ru" ? "Бананы (6 шт)" : "Bananas (6 pcs)", checked: false }
  ]);
  const [newShoppingItem, setNewShoppingItem] = useState("");
  const [shoppingLists, setShoppingLists] = useState<{id: number, name: string, items: any[]}[]>([]);
  const [showNewMealDialog, setShowNewMealDialog] = useState(false);
  const [newMealName, setNewMealName] = useState("");
  const [newMealTime, setNewMealTime] = useState("");
  const [editingMealInfo, setEditingMealInfo] = useState<{day: string, mealType: string} | null>(null);
  const [showSavedLists, setShowSavedLists] = useState(false);

  // Meal icons
  const mealIcons = {
    breakfast: <Coffee className="h-5 w-5 text-orange-500" />,
    lunch: <UtensilsCrossed className="h-5 w-5 text-green-500" />,
    dinner: <ChefHat className="h-5 w-5 text-blue-500" />,
    snack: <IceCream className="h-5 w-5 text-purple-500" />
  };

  // Демо-данные для планировщика
  const mealPlan = [
    {
      mealType: "breakfast",
      label: translate("breakfast"),
      time: "08:00",
      items: [
        { id: "1", name: language === "ru" ? "Овсяная каша" : "Oatmeal", calories: 150, proteins: 5, fats: 3, carbs: 27, amount: 100, unit: "г" },
        { id: "2", name: language === "ru" ? "Банан" : "Banana", calories: 105, proteins: 1.3, fats: 0.4, carbs: 27, amount: 100, unit: "г" },
        { id: "3", name: language === "ru" ? "Миндальное молоко" : "Almond milk", calories: 30, proteins: 1, fats: 2.5, carbs: 1, amount: 100, unit: "мл" }
      ]
    },
    {
      mealType: "lunch",
      label: translate("lunch"),
      time: "13:00",
      items: [
        { id: "4", name: language === "ru" ? "Куриная грудка" : "Chicken breast", calories: 165, proteins: 31, fats: 3.6, carbs: 0, amount: 100, unit: "г" },
        { id: "5", name: language === "ru" ? "Рис бурый" : "Brown rice", calories: 110, proteins: 2.5, fats: 0.9, carbs: 23, amount: 100, unit: "г" },
        { id: "6", name: language === "ru" ? "Овощной салат" : "Vegetable salad", calories: 45, proteins: 1, fats: 0.2, carbs: 10, amount: 100, unit: "г" }
      ]
    },
    {
      mealType: "dinner",
      label: translate("dinner"),
      time: "19:00",
      items: [
        { id: "7", name: language === "ru" ? "Лосось" : "Salmon", calories: 180, proteins: 22, fats: 10, carbs: 0, amount: 100, unit: "г" },
        { id: "8", name: language === "ru" ? "Киноа" : "Quinoa", calories: 120, proteins: 4, fats: 1.9, carbs: 22, amount: 100, unit: "г" },
        { id: "9", name: language === "ru" ? "Брокколи" : "Broccoli", calories: 55, proteins: 2.6, fats: 0.4, carbs: 11, amount: 100, unit: "г" }
      ]
    },
    {
      mealType: "snack",
      label: translate("snack"),
      time: "16:00",
      items: [
        { id: "10", name: language === "ru" ? "Греческий йогурт" : "Greek yogurt", calories: 100, proteins: 10, fats: 2, carbs: 8, amount: 100, unit: "г" },
        { id: "11", name: language === "ru" ? "Черника" : "Blueberries", calories: 45, proteins: 0.6, fats: 0.2, carbs: 11, amount: 100, unit: "г" }
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
        totals.protein += item.proteins || 0;
        totals.fat += item.fats || 0;
        totals.carbs += item.carbs || 0;
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
  const handleAddFood = (mealType: string) => {
    toast({
      title: translate("add_food"),
      description: `${translate("to")} ${translate(mealType)}`,
    });
  };

  // Handle food selection from search
  const handleFoodSelect = (food: any, mealType: string) => {
    const newFood: FoodItem = {
      id: Math.random().toString(36).substring(7),
      name: food.name,
      calories: food.calories,
      proteins: food.proteins || food.protein || 0,
      fats: food.fats || food.fat || 0,
      carbs: food.carbs || 0,
      amount: 100,
      unit: language === "ru" ? "г" : "g"
    };
    
    addFoodToMeal(mealType, newFood);
    
    toast({
      title: translate("food_added"),
      description: `${food.name} ${translate("added_to")} ${translate(mealType)}`,
    });
  };

  // Handler for removing a food item
  const handleRemoveFood = (mealType: string, foodId: string) => {
    removeFoodFromMeal(mealType, foodId);
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

  const toggleShoppingItemCheck = (id: number) => {
    setShoppingItems(
      shoppingItems.map(item => 
        item.id === id ? {...item, checked: !item.checked} : item
      )
    );
  };

  const handleSaveList = () => {
    const newList = {
      id: Date.now(),
      name: `${language === "ru" ? "Список" : "List"} ${shoppingLists.length + 1}`,
      items: [...shoppingItems]
    };
    
    setShoppingLists([...shoppingLists, newList]);
    
    toast({
      title: translate("save_list"),
      description: language === "ru" ? "Список покупок сохранен" : "Shopping list saved",
    });
    
    // Show saved lists after saving
    setShowSavedLists(true);
  };

  const handleAddNewMeal = () => {
    setShowNewMealDialog(true);
  };

  const createNewMeal = () => {
    if (newMealName.trim()) {
      toast({
        title: translate("add_meal"),
        description: language === "ru" ? "Добавлен новый прием пищи" : "New meal added",
      });
      
      setShowNewMealDialog(false);
      setNewMealName("");
      setNewMealTime("");
    }
  };

  // Handler for week view meal plan
  const handleWeekdayMealClick = (day: string, mealType: string) => {
    setEditingMealInfo({ day, mealType });
    
    toast({
      title: `${translate(mealType)} - ${day}`,
      description: language === "ru" ? "Редактирование питания" : "Editing meal plan",
    });
  };

  // Handler for month view day selection
  const handleMonthDayClick = (day: number) => {
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
                <MealCard 
                  key={index}
                  title={meal.label}
                  time={meal.time}
                  icon={mealIcons[meal.mealType as keyof typeof mealIcons]}
                  foods={meal.items as FoodItem[]}
                  onAddFood={() => handleAddFood(meal.mealType)}
                  onRemoveFood={(id) => handleRemoveFood(meal.mealType, id)}
                />
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
                  <CardTitle className="flex justify-between items-center">
                    {translate("shopping_list")}
                    {shoppingLists.length > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowSavedLists(!showSavedLists)}
                      >
                        {showSavedLists ? translate("hide_lists") : translate("show_lists")}
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {showSavedLists && shoppingLists.length > 0 && (
                    <div className="mb-4 space-y-2 border-b pb-4">
                      <h3 className="font-medium">{language === "ru" ? "Сохраненные списки" : "Saved Lists"}</h3>
                      {shoppingLists.map(list => (
                        <div key={list.id} className="flex justify-between items-center">
                          <span>{list.name} ({list.items.length})</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setShoppingItems(list.items);
                              setShowSavedLists(false);
                              toast({
                                title: language === "ru" ? "Список загружен" : "List loaded",
                              });
                            }}
                          >
                            {language === "ru" ? "Загрузить" : "Load"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
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
                        onClick={handleAddNewMeal}
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

      {/* New Meal Dialog */}
      <Dialog open={showNewMealDialog} onOpenChange={setShowNewMealDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{translate("add_meal")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="mealName">{language === "ru" ? "Название приема пищи" : "Meal Name"}</Label>
              <Input 
                id="mealName" 
                value={newMealName} 
                onChange={(e) => setNewMealName(e.target.value)}
                placeholder={language === "ru" ? "Например: Полдник" : "Example: Afternoon Snack"}
              />
            </div>
            <div>
              <Label htmlFor="mealTime">{language === "ru" ? "Время" : "Time"}</Label>
              <Input 
                id="mealTime" 
                value={newMealTime} 
                onChange={(e) => setNewMealTime(e.target.value)}
                placeholder="15:00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewMealDialog(false)}>
              {language === "ru" ? "Отмена" : "Cancel"}
            </Button>
            <Button onClick={createNewMeal}>
              {language === "ru" ? "Создать" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Week Day Meal Edit Dialog */}
      {editingMealInfo && (
        <Dialog open={!!editingMealInfo} onOpenChange={() => setEditingMealInfo(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingMealInfo.day} - {translate(editingMealInfo.mealType)}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>{language === "ru" ? "Продукты" : "Foods"}</Label>
                <div className="mt-2 space-y-2">
                  {mealPlan.find(m => m.mealType === editingMealInfo.mealType)?.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <span>{item.calories} {translate("kcal")}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <Label>{language === "ru" ? "Добавить продукт" : "Add Food"}</Label>
                <FoodSearch 
                  onSelectFood={(food) => {
                    handleFoodSelect(food, editingMealInfo.mealType);
                    toast({
                      title: translate("food_added"),
                      description: `${food.name} ${translate("added_to")} ${translate(editingMealInfo.mealType)}`,
                    });
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setEditingMealInfo(null)}>
                {language === "ru" ? "Готово" : "Done"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
