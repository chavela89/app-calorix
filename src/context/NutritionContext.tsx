
import React, { createContext, useContext, useEffect, useState } from "react";
import { FoodItem } from "@/components/MealCard";
import { useUser } from "./UserContext";
import { v4 as uuidv4 } from "uuid";
import { useMemo } from "react";

export interface Meal {
  id: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  time: string;
  foods: FoodItem[];
}

export interface DailyNutrition {
  date: string;
  meals: Meal[];
  water: number;
}

type NutritionContextType = {
  dailyNutrition: DailyNutrition;
  currentDate: string;
  addFood: (mealType: Meal["type"], food: FoodItem) => void;
  removeFood: (mealType: Meal["type"], foodId: string) => void;
  updateWater: (amount: number) => void;
  changeDate: (date: string) => void;
  totals: {
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
  };
};

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

export const NutritionProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [nutritionData, setNutritionData] = useState<Record<string, DailyNutrition>>({});

  // Инициализация данных при первой загрузке
  useEffect(() => {
    const savedData = localStorage.getItem("calorix_nutrition_data");
    
    if (savedData) {
      try {
        setNutritionData(JSON.parse(savedData));
      } catch (err) {
        console.error("Failed to parse nutrition data:", err);
      }
    }
  }, []);

  // Получение или создание данных для текущего дня
  const dailyNutrition = useMemo(() => {
    if (!nutritionData[currentDate]) {
      return {
        date: currentDate,
        meals: [
          { id: uuidv4(), type: "breakfast", time: "08:00", foods: [] },
          { id: uuidv4(), type: "lunch", time: "13:00", foods: [] },
          { id: uuidv4(), type: "dinner", time: "19:00", foods: [] },
          { id: uuidv4(), type: "snack", time: "16:00", foods: [] },
        ],
        water: 0,
      };
    }
    
    return nutritionData[currentDate];
  }, [nutritionData, currentDate]);

  // Вычисление общих показателей питания
  const totals = useMemo(() => {
    const allFoods = dailyNutrition.meals.flatMap((meal) => meal.foods);
    
    return {
      calories: allFoods.reduce((sum, food) => sum + food.calories, 0),
      proteins: allFoods.reduce((sum, food) => sum + food.proteins, 0),
      fats: allFoods.reduce((sum, food) => sum + food.fats, 0),
      carbs: allFoods.reduce((sum, food) => sum + food.carbs, 0),
    };
  }, [dailyNutrition]);

  // Сохранение данных при их изменении
  useEffect(() => {
    localStorage.setItem("calorix_nutrition_data", JSON.stringify(nutritionData));
  }, [nutritionData]);

  // Добавление продукта в прием пищи
  const addFood = (mealType: Meal["type"], food: FoodItem) => {
    setNutritionData((prev) => {
      const currentDay = prev[currentDate] || dailyNutrition;
      const updatedMeals = currentDay.meals.map((meal) => {
        if (meal.type === mealType) {
          return {
            ...meal,
            foods: [...meal.foods, { ...food, id: uuidv4() }],
          };
        }
        return meal;
      });
      
      return {
        ...prev,
        [currentDate]: {
          ...currentDay,
          meals: updatedMeals,
        },
      };
    });
  };

  // Удаление продукта из приема пищи
  const removeFood = (mealType: Meal["type"], foodId: string) => {
    setNutritionData((prev) => {
      const currentDay = prev[currentDate] || dailyNutrition;
      const updatedMeals = currentDay.meals.map((meal) => {
        if (meal.type === mealType) {
          return {
            ...meal,
            foods: meal.foods.filter((food) => food.id !== foodId),
          };
        }
        return meal;
      });
      
      return {
        ...prev,
        [currentDate]: {
          ...currentDay,
          meals: updatedMeals,
        },
      };
    });
  };

  // Обновление информации о воде
  const updateWater = (amount: number) => {
    setNutritionData((prev) => {
      const currentDay = prev[currentDate] || dailyNutrition;
      
      return {
        ...prev,
        [currentDate]: {
          ...currentDay,
          water: Math.max(0, currentDay.water + amount),
        },
      };
    });
  };

  // Изменение текущей даты
  const changeDate = (date: string) => {
    setCurrentDate(date);
  };

  return (
    <NutritionContext.Provider
      value={{
        dailyNutrition,
        currentDate,
        addFood,
        removeFood,
        updateWater,
        changeDate,
        totals,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (context === undefined) {
    throw new Error("useNutrition must be used within a NutritionProvider");
  }
  return context;
};
