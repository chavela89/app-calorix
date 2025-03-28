
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeftIcon, 
  EditIcon, 
  TrophyIcon,
  BarChart3Icon,
  CalendarIcon,
  Flame,
  HeartIcon,
  SparklesIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTabValue, setActiveTabValue] = useState("stats");
  
  // Демонстрационные данные
  const stats = {
    daysActive: 67,
    streakDays: 14,
    totalCaloriesTracked: 138750,
    mealsLogged: 246,
    achievements: [
      { id: 1, name: "Первый Шаг", description: "Создать аккаунт", unlocked: true },
      { id: 2, name: "Неделя Здоровья", description: "Вести дневник 7 дней подряд", unlocked: true },
      { id: 3, name: "Мастер Питания", description: "Оставаться в пределах целей по калориям 30 дней", unlocked: false },
      { id: 4, name: "Водный Баланс", description: "Достичь цели по воде 10 дней подряд", unlocked: true },
      { id: 5, name: "Гурман", description: "Добавить 50 разных продуктов", unlocked: false },
    ],
    weightLog: [
      { date: "2023-01-01", weight: 82.5 },
      { date: "2023-01-08", weight: 81.8 },
      { date: "2023-01-15", weight: 81.0 },
      { date: "2023-01-22", weight: 80.5 },
      { date: "2023-01-29", weight: 79.8 },
    ]
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Профиль</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Профиль пользователя */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/avatar.png" alt={user.name} />
                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                variant="secondary"
              >
                <EditIcon className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            {user.isPremium && (
              <Badge className="mt-2 bg-amber-500">
                <SparklesIcon className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stats.daysActive}</p>
                  <p className="text-xs text-muted-foreground">Дней активности</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stats.streakDays}</p>
                  <p className="text-xs text-muted-foreground">Дней подряд</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium">О себе</Label>
                <div className="text-sm p-3 bg-secondary/50 rounded-md">
                  <p>Цель: Снижение веса</p>
                  <p>Активность: Умеренная</p>
                  <p>На CaloriX с: {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/settings")}
                >
                  Редактировать профиль
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Статистика и достижения */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Прогресс и достижения</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTabValue} onValueChange={setActiveTabValue}>
              <TabsList className="w-full">
                <TabsTrigger value="stats">Статистика</TabsTrigger>
                <TabsTrigger value="achievements">Достижения</TabsTrigger>
                <TabsTrigger value="weight">Вес</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stats" className="pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <CalendarIcon className="h-8 w-8 text-blue-500 mb-2" />
                        <p className="text-xl font-bold">{stats.daysActive}</p>
                        <p className="text-sm text-muted-foreground">Дней активности</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <Flame className="h-8 w-8 text-orange-500 mb-2" />
                        <p className="text-xl font-bold">{stats.totalCaloriesTracked.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Калорий отслежено</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <BarChart3Icon className="h-8 w-8 text-green-500 mb-2" />
                        <p className="text-xl font-bold">{stats.mealsLogged}</p>
                        <p className="text-sm text-muted-foreground">Приемов пищи</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <HeartIcon className="h-8 w-8 text-red-500 mb-2" />
                        <p className="text-xl font-bold">{stats.streakDays}</p>
                        <p className="text-sm text-muted-foreground">Дней подряд</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="achievements" className="pt-4">
                <div className="space-y-4">
                  {stats.achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`flex items-center p-3 rounded-lg border ${
                        achievement.unlocked 
                          ? "bg-primary/10" 
                          : "bg-muted/30 opacity-60"
                      }`}
                    >
                      <div className={`p-2 rounded-full mr-3 ${
                        achievement.unlocked 
                          ? "bg-primary/20" 
                          : "bg-muted"
                      }`}>
                        <TrophyIcon className={`h-5 w-5 ${
                          achievement.unlocked 
                            ? "text-primary" 
                            : "text-muted-foreground"
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">{achievement.name}</p>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="weight" className="pt-4">
                <div className="space-y-4">
                  <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">График изменения веса будет доступен в следующем обновлении</p>
                  </div>
                  
                  <div className="space-y-2">
                    {stats.weightLog.map((log, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <span>{new Date(log.date).toLocaleDateString()}</span>
                        <span className="font-medium">{log.weight} кг</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
