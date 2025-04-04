
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PremiumBanner } from "@/components/PremiumBanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileForm } from "@/components/UserProfileForm";
import { BarChart3, CalendarDays, List, Trophy, User2, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Profile() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Профиль</h1>

      <PremiumBanner />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* User Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-12 w-12 text-primary" />
                )}
              </div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              
              <div className="mt-4 w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Стаж</span>
                  <span className="text-sm">98 дней</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Активные дни</span>
                  <span className="text-sm">83 дня</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Достижения</span>
                  <span className="text-sm">12</span>
                </div>
              </div>
              
              <Button className="mt-6 w-full" variant="outline">Редактировать профиль</Button>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <Tabs defaultValue={activeTab} className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-2">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <List className="w-4 h-4" />
                    <span className="hidden sm:inline">Обзор</span>
                  </TabsTrigger>
                  <TabsTrigger value="stats" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Статистика</span>
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span className="hidden sm:inline">Достижения</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <User2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Данные</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Недавняя активность</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="min-w-[48px] h-12 flex items-center justify-center rounded-full bg-primary/10">
                          <CalendarDays className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Отслеживание питания</p>
                          <p className="text-sm text-muted-foreground">Вы вели дневник питания 7 дней подряд</p>
                          <p className="text-xs text-muted-foreground">Сегодня</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="min-w-[48px] h-12 flex items-center justify-center rounded-full bg-primary/10">
                          <Trophy className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Достижение разблокировано</p>
                          <p className="text-sm text-muted-foreground">Первый кулинарный рецепт</p>
                          <p className="text-xs text-muted-foreground">Вчера</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Текущие цели</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Калории</p>
                          <p className="text-sm text-muted-foreground">Ежедневная цель</p>
                        </div>
                        <p className="font-medium">{user?.settings?.calorieGoal || 2200} ккал</p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Белки</p>
                          <p className="text-sm text-muted-foreground">Ежедневная цель</p>
                        </div>
                        <p className="font-medium">{user?.settings?.proteinGoal || 150} г</p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Вес</p>
                          <p className="text-sm text-muted-foreground">Целевой вес</p>
                        </div>
                        <p className="font-medium">{user?.bodyMetrics?.targetWeight || 70} кг</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="stats" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Статистика по питанию</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-3xl font-bold">83</p>
                            <p className="text-sm text-muted-foreground">Активных дней</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-3xl font-bold">156,427</p>
                            <p className="text-sm text-muted-foreground">Отслеженных калорий</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-3xl font-bold">42</p>
                            <p className="text-sm text-muted-foreground">Достигнутых целей</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="achievements" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Достижения</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex flex-col items-center border rounded-lg p-4">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                          <Trophy className="w-8 h-8 text-green-600" />
                        </div>
                        <p className="font-medium text-center">Первая неделя</p>
                        <p className="text-xs text-muted-foreground text-center">7 дней подряд ведения дневника</p>
                        <Badge className="mt-2">Выполнено</Badge>
                      </div>
                      <div className="flex flex-col items-center border rounded-lg p-4">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                          <Trophy className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="font-medium text-center">Первый месяц</p>
                        <p className="text-xs text-muted-foreground text-center">30 дней подряд ведения дневника</p>
                        <Badge className="mt-2">Выполнено</Badge>
                      </div>
                      <div className="flex flex-col items-center border rounded-lg p-4">
                        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                          <Trophy className="w-8 h-8 text-purple-600" />
                        </div>
                        <p className="font-medium text-center">Первый рецепт</p>
                        <p className="text-xs text-muted-foreground text-center">Создание собственного рецепта</p>
                        <Badge className="mt-2">Выполнено</Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings">
                  <UserProfileForm />
                </TabsContent>
              </Tabs>
            </CardHeader>
            <CardContent className="pt-2">
              {/* Remove the duplicate TabsContent components that were here */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
