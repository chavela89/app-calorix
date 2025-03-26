
import { useState } from "react";
import { useUser, User } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Separator } from "@/components/ui/separator";
import { toast } from '@/hooks/use-toast';
import { ChevronLeftIcon, SaveIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user, updateUser } = useUser();
  const { currentTheme, setTheme, themes } = useTheme();
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Partial<User>>(user || {
    name: "",
    email: "",
    settings: {
      calorieGoal: 2000,
      proteinGoal: 120,
      fatGoal: 65,
      carbGoal: 250,
      waterGoal: 2500,
    }
  });
  
  const [notifications, setNotifications] = useState({
    meals: true,
    water: true,
    daily: true,
    goals: true,
  });
  
  const [units, setUnits] = useState({
    metric: true, // true = метрическая, false = имперская
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSettingsChange = (name: keyof User['settings'], value: number) => {
    setFormData(prev => ({
      ...prev,
      settings: {
        ...prev.settings!,
        [name]: value,
      }
    }));
  };

  const handleSave = () => {
    if (user) {
      updateUser(formData);
      toast({
        title: "Настройки сохранены",
        description: "Ваши изменения были успешно сохранены.",
      });
    }
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
        <h1 className="text-2xl font-bold">Настройки</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-4 md:w-[400px]">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="goals">Цели</TabsTrigger>
          <TabsTrigger value="appearance">Внешний вид</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Личная информация</CardTitle>
              <CardDescription>
                Обновите свою личную информацию и контактные данные.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Label>Единицы измерения</Label>
                <div className="flex items-center justify-between">
                  <span>Метрическая система (кг, см)</span>
                  <Switch
                    checked={units.metric}
                    onCheckedChange={(checked) => setUnits({ metric: checked })}
                  />
                </div>
              </div>
              
              <Button onClick={handleSave} className="w-full md:w-auto">
                <SaveIcon className="mr-2 h-4 w-4" />
                Сохранить изменения
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Цели питания</CardTitle>
              <CardDescription>
                Настройте свои ежедневные цели потребления калорий и нутриентов.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="calorieGoal">Калории</Label>
                  <span className="text-sm font-medium">{formData.settings?.calorieGoal} ккал</span>
                </div>
                <Slider
                  id="calorieGoal"
                  min={1000}
                  max={5000}
                  step={50}
                  value={[formData.settings?.calorieGoal || 2000]}
                  onValueChange={(value) => handleSettingsChange('calorieGoal', value[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="proteinGoal">Белки</Label>
                  <span className="text-sm font-medium">{formData.settings?.proteinGoal} г</span>
                </div>
                <Slider
                  id="proteinGoal"
                  min={50}
                  max={300}
                  step={5}
                  value={[formData.settings?.proteinGoal || 120]}
                  onValueChange={(value) => handleSettingsChange('proteinGoal', value[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="fatGoal">Жиры</Label>
                  <span className="text-sm font-medium">{formData.settings?.fatGoal} г</span>
                </div>
                <Slider
                  id="fatGoal"
                  min={20}
                  max={150}
                  step={5}
                  value={[formData.settings?.fatGoal || 65]}
                  onValueChange={(value) => handleSettingsChange('fatGoal', value[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="carbGoal">Углеводы</Label>
                  <span className="text-sm font-medium">{formData.settings?.carbGoal} г</span>
                </div>
                <Slider
                  id="carbGoal"
                  min={50}
                  max={500}
                  step={10}
                  value={[formData.settings?.carbGoal || 250]}
                  onValueChange={(value) => handleSettingsChange('carbGoal', value[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="waterGoal">Вода</Label>
                  <span className="text-sm font-medium">{formData.settings?.waterGoal} мл</span>
                </div>
                <Slider
                  id="waterGoal"
                  min={1000}
                  max={5000}
                  step={100}
                  value={[formData.settings?.waterGoal || 2500]}
                  onValueChange={(value) => handleSettingsChange('waterGoal', value[0])}
                />
              </div>
              
              <Button onClick={handleSave} className="w-full md:w-auto">
                <SaveIcon className="mr-2 h-4 w-4" />
                Сохранить цели
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Внешний вид</CardTitle>
              <CardDescription>
                Настройте внешний вид приложения под свои предпочтения.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Тема оформления</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      onClick={() => setTheme(theme.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        currentTheme === theme.id ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <div
                        className="w-full h-12 rounded-md mb-2"
                        style={{ backgroundColor: theme.color }}
                      />
                      <div className="text-sm font-medium text-center">{theme.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label>Язык интерфейса</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                  {languages.map((lang) => (
                    <div
                      key={lang.id}
                      onClick={() => setLanguage(lang.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        currentLanguage === lang.id ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <div className="text-sm font-medium text-center">{lang.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Уведомления</CardTitle>
              <CardDescription>
                Настройте, какие уведомления вы хотите получать.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Напоминания о приёме пищи</p>
                    <p className="text-sm text-muted-foreground">
                      Получайте напоминания о запланированных приёмах пищи
                    </p>
                  </div>
                  <Switch
                    checked={notifications.meals}
                    onCheckedChange={(checked) => setNotifications({...notifications, meals: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Питьевой режим</p>
                    <p className="text-sm text-muted-foreground">
                      Напоминания о необходимости пить воду
                    </p>
                  </div>
                  <Switch
                    checked={notifications.water}
                    onCheckedChange={(checked) => setNotifications({...notifications, water: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Ежедневная сводка</p>
                    <p className="text-sm text-muted-foreground">
                      Получайте итоги дня в конце дня
                    </p>
                  </div>
                  <Switch
                    checked={notifications.daily}
                    onCheckedChange={(checked) => setNotifications({...notifications, daily: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Достижение целей</p>
                    <p className="text-sm text-muted-foreground">
                      Уведомления о достижении или превышении целей
                    </p>
                  </div>
                  <Switch
                    checked={notifications.goals}
                    onCheckedChange={(checked) => setNotifications({...notifications, goals: checked})}
                  />
                </div>
              </div>
              
              <Button onClick={handleSave} className="w-full md:w-auto">
                <SaveIcon className="mr-2 h-4 w-4" />
                Сохранить настройки
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
