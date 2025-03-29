import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChart, Line, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from "@/context/LanguageContextFixed";
import { useUser } from "@/context/UserContext";
import { CalendarIcon, ArrowUpIcon, ArrowDownIcon, BarChart3Icon } from "lucide-react";

export default function Analytics() {
  const { translate } = useLanguage();
  const [period, setPeriod] = useState("week");
  const { user } = useUser();

  // Демо-данные для графиков
  const caloriesData = [
    { name: "Пн", calories: 1850 },
    { name: "Вт", calories: 2100 },
    { name: "Ср", calories: 1950 },
    { name: "Чт", calories: 2200 },
    { name: "Пт", calories: 1800 },
    { name: "Сб", calories: 2300 },
    { name: "Вс", calories: 2050 },
  ];

  const macroData = [
    { name: "Пн", protein: 110, fat: 70, carbs: 210 },
    { name: "Вт", protein: 120, fat: 75, carbs: 230 },
    { name: "Ср", protein: 115, fat: 65, carbs: 200 },
    { name: "Чт", protein: 125, fat: 80, carbs: 240 },
    { name: "Пт", protein: 105, fat: 60, carbs: 190 },
    { name: "Сб", protein: 130, fat: 85, carbs: 250 },
    { name: "Вс", protein: 118, fat: 73, carbs: 220 },
  ];

  const mealDistributionData = [
    { name: "Завтрак", value: 25 },
    { name: "Обед", value: 35 },
    { name: "Ужин", value: 30 },
    { name: "Перекусы", value: 10 },
  ];

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

  const topFoodsData = [
    { name: "Куриная грудка", calories: 520 },
    { name: "Овсянка", calories: 420 },
    { name: "Рис", calories: 380 },
    { name: "Яблоки", calories: 310 },
    { name: "Бананы", calories: 290 },
  ];

  const caloriesBurnedData = [
    { name: "Пн", value: 350 },
    { name: "Вт", value: 450 },
    { name: "Ср", value: 320 },
    { name: "Чт", value: 500 },
    { name: "Пт", value: 380 },
    { name: "Сб", value: 600 },
    { name: "Вс", value: 420 },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col items-start gap-4 mb-6">
        <h1 className="text-3xl font-bold">{translate("analytics")}</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Потребление калорий */}
        <Card>
          <CardHeader>
            <CardTitle>{translate("calorie_consumption")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={caloriesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="calories" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Макронутриенты */}
        <Card>
          <CardHeader>
            <CardTitle>{translate("macronutrients")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={macroData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="protein" fill="#8884d8" name={translate("protein")} />
                  <Bar dataKey="fat" fill="#82ca9d" name={translate("fat")} />
                  <Bar dataKey="carbs" fill="#ffc658" name={translate("carbs")} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Распределение по приемам пищи */}
        <Card>
          <CardHeader>
            <CardTitle>{translate("meal_distribution")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mealDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {mealDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Топ продуктов */}
        <Card>
          <CardHeader>
            <CardTitle>{translate("top_foods")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={topFoodsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="calories" fill="#8884d8" name={translate("calories")} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Сожженные калории */}
        <Card>
          <CardHeader>
            <CardTitle>{translate("calories_burned")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={caloriesBurnedData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#FF8042" name={translate("burned")} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Сравнение с целями */}
        <Card>
          <CardHeader>
            <CardTitle>{translate("goals_comparison")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>{translate("calories")}</span>
                  <span className="flex items-center text-green-500">
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                    10% {translate("below_goal")}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>{translate("protein")}</span>
                  <span className="flex items-center text-amber-500">
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                    5% {translate("above_goal")}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '105%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>{translate("fat")}</span>
                  <span className="flex items-center text-red-500">
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                    15% {translate("above_goal")}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '115%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>{translate("carbs")}</span>
                  <span className="flex items-center text-blue-500">
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                    8% {translate("below_goal")}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
