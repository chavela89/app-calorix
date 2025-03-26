
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, BookOpenIcon, PlusIcon, SaveIcon, Trash2Icon, CheckCircleIcon } from "lucide-react";

export default function Planner() {
  const { translate } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("day");

  // Демо-данные для планировщика
  const mealPlan = [
    {
      mealType: "breakfast",
      label: translate("breakfast"),
      time: "08:00",
      items: [
        { name: "Овсяная каша", calories: 150, protein: 5, fat: 3, carbs: 27 },
        { name: "Банан", calories: 105, protein: 1.3, fat: 0.4, carbs: 27 },
        { name: "Миндальное молоко", calories: 30, protein: 1, fat: 2.5, carbs: 1 }
      ]
    },
    {
      mealType: "lunch",
      label: translate("lunch"),
      time: "13:00",
      items: [
        { name: "Куриная грудка", calories: 165, protein: 31, fat: 3.6, carbs: 0 },
        { name: "Рис бурый", calories: 110, protein: 2.5, fat: 0.9, carbs: 23 },
        { name: "Овощной салат", calories: 45, protein: 1, fat: 0.2, carbs: 10 }
      ]
    },
    {
      mealType: "dinner",
      label: translate("dinner"),
      time: "19:00",
      items: [
        { name: "Лосось", calories: 180, protein: 22, fat: 10, carbs: 0 },
        { name: "Киноа", calories: 120, protein: 4, fat: 1.9, carbs: 22 },
        { name: "Брокколи", calories: 55, protein: 2.6, fat: 0.4, carbs: 11 }
      ]
    },
    {
      mealType: "snack",
      label: translate("snack"),
      time: "16:00",
      items: [
        { name: "Греческий йогурт", calories: 100, protein: 10, fat: 2, carbs: 8 },
        { name: "Черника", calories: 45, protein: 0.6, fat: 0.2, carbs: 11 }
      ]
    }
  ];

  const dayLabels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const monthDays = Array.from({ length: 35 }, (_, i) => i - 3); // Пример для отображения календарного месяца

  const formatDate = (date = new Date()) => {
    return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
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
    { id: 1, name: "Стандартное питание", description: "Сбалансированное питание для поддержания веса" },
    { id: 2, name: "Низкоуглеводная диета", description: "Диета с ограничением углеводов для похудения" },
    { id: 3, name: "Высокобелковая диета", description: "Для набора мышечной массы и интенсивных тренировок" },
    { id: 4, name: "Вегетарианский план", description: "Сбалансированный план без мяса" },
    { id: 5, name: "Кето-диета", description: "Высокожировая и низкоуглеводная диета" },
  ];

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

      <TabsContent value="day" className="mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {mealPlan.map((meal, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-medium">{meal.label} • {meal.time}</CardTitle>
                    <Button variant="ghost" size="sm">
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
                          <Button variant="ghost" size="sm">
                            <Trash2Icon className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="py-2 text-center">
                      <Button variant="ghost" className="w-full" size="sm">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        {translate("add_food")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button className="w-full">
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
                    <Input placeholder={translate("add_item")} />
                    <Button size="sm" variant="secondary">
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      <span>Куриная грудка (500г)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-muted-foreground">Овощи для салата</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-muted-foreground">Рис бурый (1кг)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-muted-foreground">Йогурт греческий (4 шт)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-muted-foreground">Бананы (6 шт)</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="w-full gap-2">
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

      <TabsContent value="week" className="mt-0">
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
                      >
                        <div className="font-medium">{meal.label}</div>
                        <div className="text-muted-foreground mt-1">
                          {meal.items.length} {translate("items")}
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="ghost" size="sm" className="w-full">
                      <PlusIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="month" className="mt-0">
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
    </div>
  );
}
