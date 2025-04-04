
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart, PieChart, Line, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from "@/context/LanguageContextFixed";
import { useUser } from "@/context/UserContext";
import { CalendarIcon, ArrowUpIcon, ArrowDownIcon, BarChart3Icon } from "lucide-react";

export default function Analytics() {
  const { translate, language } = useLanguage();
  const [period, setPeriod] = useState("week");
  const { user } = useUser();

  // Демо-данные для графиков
  const weeklyData = {
    calories: [
      { name: language === "ru" ? "Пн" : "Mon", calories: 1850 },
      { name: language === "ru" ? "Вт" : "Tue", calories: 2100 },
      { name: language === "ru" ? "Ср" : "Wed", calories: 1950 },
      { name: language === "ru" ? "Чт" : "Thu", calories: 2200 },
      { name: language === "ru" ? "Пт" : "Fri", calories: 1800 },
      { name: language === "ru" ? "Сб" : "Sat", calories: 2300 },
      { name: language === "ru" ? "Вс" : "Sun", calories: 2050 },
    ],
    macro: [
      { name: language === "ru" ? "Пн" : "Mon", protein: 110, fat: 70, carbs: 210 },
      { name: language === "ru" ? "Вт" : "Tue", protein: 120, fat: 75, carbs: 230 },
      { name: language === "ru" ? "Ср" : "Wed", protein: 115, fat: 65, carbs: 200 },
      { name: language === "ru" ? "Чт" : "Thu", protein: 125, fat: 80, carbs: 240 },
      { name: language === "ru" ? "Пт" : "Fri", protein: 105, fat: 60, carbs: 190 },
      { name: language === "ru" ? "Сб" : "Sat", protein: 130, fat: 85, carbs: 250 },
      { name: language === "ru" ? "Вс" : "Sun", protein: 118, fat: 73, carbs: 220 },
    ],
    caloriesBurned: [
      { name: language === "ru" ? "Пн" : "Mon", value: 350 },
      { name: language === "ru" ? "Вт" : "Tue", value: 450 },
      { name: language === "ru" ? "Ср" : "Wed", value: 320 },
      { name: language === "ru" ? "Чт" : "Thu", value: 500 },
      { name: language === "ru" ? "Пт" : "Fri", value: 380 },
      { name: language === "ru" ? "Сб" : "Sat", value: 600 },
      { name: language === "ru" ? "Вс" : "Sun", value: 420 },
    ]
  };

  const monthlyData = {
    calories: [
      { name: "1", calories: 1950 },
      { name: "5", calories: 2000 },
      { name: "10", calories: 2150 },
      { name: "15", calories: 1900 },
      { name: "20", calories: 2050 },
      { name: "25", calories: 2200 },
      { name: "30", calories: 2100 },
    ],
    macro: [
      { name: "1", protein: 105, fat: 68, carbs: 205 },
      { name: "5", protein: 112, fat: 72, carbs: 215 },
      { name: "10", protein: 125, fat: 78, carbs: 235 },
      { name: "15", protein: 110, fat: 65, carbs: 195 },
      { name: "20", protein: 118, fat: 70, carbs: 210 },
      { name: "25", protein: 127, fat: 82, carbs: 240 },
      { name: "30", protein: 122, fat: 75, carbs: 225 },
    ],
    caloriesBurned: [
      { name: "1", value: 370 },
      { name: "5", value: 420 },
      { name: "10", value: 490 },
      { name: "15", value: 380 },
      { name: "20", value: 450 },
      { name: "25", value: 510 },
      { name: "30", value: 480 },
    ]
  };

  const yearlyData = {
    calories: [
      { name: language === "ru" ? "Янв" : "Jan", calories: 2000 },
      { name: language === "ru" ? "Фев" : "Feb", calories: 2100 },
      { name: language === "ru" ? "Мар" : "Mar", calories: 2050 },
      { name: language === "ru" ? "Апр" : "Apr", calories: 1950 },
      { name: language === "ru" ? "Май" : "May", calories: 2150 },
      { name: language === "ru" ? "Июн" : "Jun", calories: 2200 },
      { name: language === "ru" ? "Июл" : "Jul", calories: 2300 },
      { name: language === "ru" ? "Авг" : "Aug", calories: 2250 },
      { name: language === "ru" ? "Сен" : "Sep", calories: 2100 },
      { name: language === "ru" ? "Окт" : "Oct", calories: 2000 },
      { name: language === "ru" ? "Ноя" : "Nov", calories: 1950 },
      { name: language === "ru" ? "Дек" : "Dec", calories: 2050 },
    ],
    macro: [
      { name: language === "ru" ? "Янв" : "Jan", protein: 115, fat: 70, carbs: 220 },
      { name: language === "ru" ? "Фев" : "Feb", protein: 120, fat: 75, carbs: 230 },
      { name: language === "ru" ? "Мар" : "Mar", protein: 118, fat: 73, carbs: 225 },
      { name: language === "ru" ? "Апр" : "Apr", protein: 110, fat: 68, carbs: 215 },
      { name: language === "ru" ? "Май" : "May", protein: 125, fat: 78, carbs: 235 },
      { name: language === "ru" ? "Июн" : "Jun", protein: 128, fat: 80, carbs: 240 },
      { name: language === "ru" ? "Июл" : "Jul", protein: 135, fat: 85, carbs: 250 },
      { name: language === "ru" ? "Авг" : "Aug", protein: 130, fat: 82, carbs: 245 },
      { name: language === "ru" ? "Сен" : "Sep", protein: 120, fat: 75, carbs: 230 },
      { name: language === "ru" ? "Окт" : "Oct", protein: 115, fat: 70, carbs: 220 },
      { name: language === "ru" ? "Ноя" : "Nov", protein: 110, fat: 68, carbs: 215 },
      { name: language === "ru" ? "Дек" : "Dec", protein: 118, fat: 73, carbs: 225 },
    ],
    caloriesBurned: [
      { name: language === "ru" ? "Янв" : "Jan", value: 400 },
      { name: language === "ru" ? "Фев" : "Feb", value: 420 },
      { name: language === "ru" ? "Мар" : "Mar", value: 410 },
      { name: language === "ru" ? "Апр" : "Apr", value: 390 },
      { name: language === "ru" ? "Май" : "May", value: 430 },
      { name: language === "ru" ? "Июн" : "Jun", value: 440 },
      { name: language === "ru" ? "Июл" : "Jul", value: 460 },
      { name: language === "ru" ? "Авг" : "Aug", value: 450 },
      { name: language === "ru" ? "Сен" : "Sep", value: 420 },
      { name: language === "ru" ? "Окт" : "Oct", value: 400 },
      { name: language === "ru" ? "Ноя" : "Nov", value: 390 },
      { name: language === "ru" ? "Дек" : "Dec", value: 410 },
    ]
  };

  // Выбор данных на основе периода
  const getDataForPeriod = () => {
    switch(period) {
      case "month":
        return monthlyData;
      case "year":
        return yearlyData;
      default:
        return weeklyData;
    }
  };

  const periodData = getDataForPeriod();

  const mealDistributionData = [
    { name: translate("breakfast"), value: 25 },
    { name: translate("lunch"), value: 35 },
    { name: translate("dinner"), value: 30 },
    { name: translate("snack"), value: 10 },
  ];

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

  const topFoodsData = [
    { name: translate("chicken_breast"), calories: 520 },
    { name: translate("oatmeal"), calories: 420 },
    { name: translate("rice"), calories: 380 },
    { name: translate("apple"), calories: 310 },
    { name: translate("banana"), calories: 290 },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col items-start gap-4 mb-6">
        <h1 className="text-3xl font-bold">{translate("analytics")}</h1>
        <div className="bg-muted p-1 rounded-md">
          <Button
            variant={period === "week" ? "default" : "ghost"}
            className="px-4 py-2 rounded-md text-sm"
            onClick={() => setPeriod("week")}
          >
            {translate("weekly")}
          </Button>
          <Button
            variant={period === "month" ? "default" : "ghost"}
            className="px-4 py-2 rounded-md text-sm"
            onClick={() => setPeriod("month")}
          >
            {translate("monthly")}
          </Button>
          <Button
            variant={period === "year" ? "default" : "ghost"}
            className="px-4 py-2 rounded-md text-sm"
            onClick={() => setPeriod("year")}
          >
            {translate("yearly")}
          </Button>
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
                  data={periodData.calories}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="calories" stroke="#8884d8" activeDot={{ r: 8 }} name={translate("calories")} />
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
                  data={periodData.macro}
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
                  data={periodData.caloriesBurned}
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
