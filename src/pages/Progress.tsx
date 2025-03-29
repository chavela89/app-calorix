import { useState } from "react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowDownIcon, ArrowUpIcon, TrophyIcon, CheckCircleIcon, XCircleIcon, Target, Calendar, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ProgressPage() {
  const { translate } = useLanguage();
  const [period, setPeriod] = useState("month");
  
  // Демо-данные для графиков веса
  const weightData = [
    { date: "01.01", weight: 82.5 },
    { date: "08.01", weight: 81.8 },
    { date: "15.01", weight: 81.0 },
    { date: "22.01", weight: 80.5 },
    { date: "29.01", weight: 79.8 },
    { date: "05.02", weight: 79.5 },
    { date: "12.02", weight: 79.2 },
    { date: "19.02", weight: 78.8 },
    { date: "26.02", weight: 78.3 },
  ];
  
  // Демо-данные для графиков калорий
  const calorieData = [
    { date: "Пн", target: 2200, actual: 2150 },
    { date: "Вт", target: 2200, actual: 2300 },
    { date: "Ср", target: 2200, actual: 2120 },
    { date: "Чт", target: 2200, actual: 2250 },
    { date: "Пт", target: 2200, actual: 1980 },
    { date: "Сб", target: 2200, actual: 2420 },
    { date: "Вс", target: 2200, actual: 2180 },
  ];

  // Демо-данные для достижений
  const achievements = [
    { id: 1, name: "Первый Шаг", description: "Создать аккаунт", unlocked: true },
    { id: 2, name: "Неделя Здоровья", description: "Вести дневник 7 дней подряд", unlocked: true },
    { id: 3, name: "Мастер Питания", description: "Оставаться в пределах целей по калориям 30 дней", unlocked: false },
    { id: 4, name: "Водный Баланс", description: "Достичь цели по воде 10 дней подряд", unlocked: true },
    { id: 5, name: "Гурман", description: "Добавить 50 разных продуктов", unlocked: false },
    { id: 6, name: "Стабильность", description: "Достичь целевого веса и удерживать его 14 дней", unlocked: false },
    { id: 7, name: "Белковый Эксперт", description: "Достигать белковой цели 14 дней подряд", unlocked: true },
    { id: 8, name: "Планировщик", description: "Спланировать питание на неделю вперед", unlocked: false },
  ];
  
  // Демо-данные для челленджей
  const challenges = [
    { 
      id: 1, 
      name: "Без Сахара", 
      description: "7 дней без добавленного сахара", 
      progress: 5, 
      total: 7,
      completed: false,
      startDate: "12.02.2023",
      endDate: "19.02.2023",
    },
    { 
      id: 2, 
      name: "Водный Марафон", 
      description: "Пить не менее 2.5л воды каждый день", 
      progress: 14, 
      total: 14,
      completed: true,
      startDate: "01.01.2023",
      endDate: "15.01.2023",
    },
    { 
      id: 3, 
      name: "Белковая Неделя", 
      description: "Потреблять 130г+ белка каждый день", 
      progress: 3, 
      total: 7,
      completed: false,
      startDate: "20.02.2023",
      endDate: "27.02.2023",
    },
  ];

  // Демо-данные для привычек
  const habits = [
    { id: 1, name: "Пить 8 стаканов воды", progress: 6, total: 8, streak: 12 },
    { id: 2, name: "Есть овощи с каждым приемом пищи", progress: 2, total: 3, streak: 7 },
    { id: 3, name: "Белок в каждый прием пищи", progress: 3, total: 3, streak: 15 },
    { id: 4, name: "Не есть после 19:00", progress: 0, total: 1, streak: 0 },
    { id: 5, name: "Готовить дома", progress: 1, total: 1, streak: 23 },
  ];

  // Расчет изменения веса
  const weightChange = weightData[weightData.length - 1].weight - weightData[0].weight;
  const weightChangePercent = Math.round((weightChange / weightData[0].weight) * 100 * 10) / 10;

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">{translate("progress")}</h1>
        
        <div className="bg-muted p-1 rounded-md">
          <button
            className={`px-4 py-2 rounded-md text-sm ${period === "week" ? "bg-background shadow" : ""}`}
            onClick={() => setPeriod("week")}
          >
            {translate("weekly")}
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm ${period === "month" ? "bg-background shadow" : ""}`}
            onClick={() => setPeriod("month")}
          >
            {translate("monthly")}
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm ${period === "year" ? "bg-background shadow" : ""}`}
            onClick={() => setPeriod("year")}
          >
            {translate("yearly")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{translate("current_weight")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold">{weightData[weightData.length - 1].weight}</span>
                <span className="text-lg font-medium ml-1">кг</span>
              </div>
              <div className={`flex items-center ${weightChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                {weightChange < 0 ? <ArrowDownIcon className="mr-1" /> : <ArrowUpIcon className="mr-1" />}
                <span>{Math.abs(weightChange)} кг ({Math.abs(weightChangePercent)}%)</span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{translate("target_weight")}</span>
                <span>75 кг</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>{translate("start")}: 82.5 кг</span>
                <span>{translate("left")}: {Math.max(0, weightData[weightData.length - 1].weight - 75).toFixed(1)} кг</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{translate("streak")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold">14</span>
                <span className="text-lg font-medium ml-1">{translate("days")}</span>
              </div>
              <div className="text-amber-500 flex items-center">
                <Target className="h-5 w-5 mr-1" />
                <span>{translate("best")}: 21</span>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mt-6">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-xs mb-1">{['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][index]}</div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= 4 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {index <= 4 ? <CheckCircleIcon className="h-5 w-5" /> : <XCircleIcon className="h-5 w-5" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{translate("statistics")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary mr-2" />
                  <span>{translate("active_days")}</span>
                </div>
                <span className="font-bold">67</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-green-500 mr-2" />
                  <span>{translate("tracked_calories")}</span>
                </div>
                <span className="font-bold">138,750</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <TrophyIcon className="h-5 w-5 text-amber-500 mr-2" />
                  <span>{translate("achievements")}</span>
                </div>
                <span className="font-bold">4/8</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-blue-500 mr-2" />
                  <span>{translate("goals_met")}</span>
                </div>
                <span className="font-bold">24/30</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weight" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="weight">{translate("weight")}</TabsTrigger>
          <TabsTrigger value="nutrition">{translate("nutrition")}</TabsTrigger>
          <TabsTrigger value="achievements">{translate("achievements")}</TabsTrigger>
          <TabsTrigger value="habits">{translate("habits")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weight">
          <Card>
            <CardHeader>
              <CardTitle>{translate("weight_dynamics")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weightData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      name={translate("weight")}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#82ca9d" 
                      strokeDasharray="5 5" 
                      name={translate("target")}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nutrition">
          <Card>
            <CardHeader>
              <CardTitle>{translate("calorie_goals")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={calorieData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="target" 
                      fill="#8884d8" 
                      name={translate("target_calories")}
                    />
                    <Bar 
                      dataKey="actual" 
                      fill="#82ca9d" 
                      name={translate("actual_calories")}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={achievement.unlocked ? 'border-primary' : 'opacity-70'}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`p-3 rounded-full ${
                    achievement.unlocked ? 'bg-primary/20' : 'bg-muted'
                  }`}>
                    <TrophyIcon className={`h-6 w-6 ${
                      achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    {achievement.unlocked && (
                      <Badge variant="outline" className="mt-2 text-xs">
                        {translate("unlocked")}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
            
          <div className="text-center">
            <Button variant="outline" className="mt-4">
              {translate("view_all_achievements")}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="habits" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {habits.map((habit) => (
              <Card key={habit.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{habit.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {translate("streak")}: {habit.streak} {translate("days")}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Progress value={(habit.progress / habit.total) * 100} className="flex-1 h-2" />
                    <span className="text-sm font-medium">{habit.progress}/{habit.total}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
            
          <div className="flex justify-between">
            <Button variant="outline">
              {translate("add_habit")}
            </Button>
            <Button>
              {translate("complete_all")}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
