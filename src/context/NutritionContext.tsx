
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "./UserContext";

// Define types
export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  amount?: number;
  unit?: string;
  servingSize?: number;
}

export interface Meal {
  id: string;
  type: MealType;
  time: string;
  foods: FoodItem[];
}

export interface DailyNutrition {
  date: string;
  meals: Meal[];
  water: number;
}

type NutritionContextType = {
  todayNutrition: DailyNutrition;
  getNutritionForDate: (date: string) => DailyNutrition;
  addFoodToMeal: (mealType: MealType, food: FoodItem) => void;
  removeFoodFromMeal: (mealType: MealType, foodId: string) => void;
  updateWaterIntake: (amount: number) => void;
  getTotalCalories: (date?: string) => number;
  getTotalProteins: (date?: string) => number;
  getTotalFats: (date?: string) => number;
  getTotalCarbs: (date?: string) => number;
};

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

export const NutritionProvider = ({ children }: { children: ReactNode }) => {
  const today = new Date().toISOString().split("T")[0];
  const { user } = useUser();
  
  // Records nutrition data by date
  const [nutritionData, setNutritionData] = useState<Record<string, DailyNutrition>>({});
  
  // Initialize data from localStorage when component mounts
  useEffect(() => {
    if (user) {
      const savedData = localStorage.getItem(`calorix_nutrition_${user.id}`);
      if (savedData) {
        try {
          setNutritionData(JSON.parse(savedData));
        } catch (error) {
          console.error("Failed to parse nutrition data:", error);
        }
      }
    }
  }, [user]);
  
  // Save data to localStorage when it changes
  useEffect(() => {
    if (user && Object.keys(nutritionData).length > 0) {
      localStorage.setItem(`calorix_nutrition_${user.id}`, JSON.stringify(nutritionData));
    }
  }, [nutritionData, user]);
  
  // Get nutrition data for a specific date
  const getNutritionForDate = (date: string): DailyNutrition => {
    if (!nutritionData[date]) {
      return {
        date,
        meals: [],
        water: 0,
      };
    }
    return nutritionData[date];
  };
  
  // Add food to a meal
  const addFoodToMeal = (mealType: MealType, food: FoodItem) => {
    setNutritionData(prev => {
      // Get today's data or create new entry
      const todayData = prev[today] || {
        date: today,
        meals: [],
        water: 0,
      };
      
      // Find the meal or create a new one
      let meal = todayData.meals.find(m => m.type === mealType);
      
      if (meal) {
        // Update existing meal
        meal.foods = [...meal.foods, { ...food, id: food.id || uuidv4() }];
      } else {
        // Create new meal
        const newMeal: Meal = {
          id: uuidv4(),
          type: mealType,
          time: new Date().toISOString(),
          foods: [{ ...food, id: food.id || uuidv4() }],
        };
        todayData.meals = [...todayData.meals, newMeal];
      }
      
      // Return updated data
      return {
        ...prev,
        [today]: todayData,
      };
    });
  };
  
  // Remove food from a meal
  const removeFoodFromMeal = (mealType: MealType, foodId: string) => {
    setNutritionData(prev => {
      const todayData = prev[today];
      if (!todayData) return prev;
      
      const updatedMeals = todayData.meals.map(meal => {
        if (meal.type === mealType) {
          return {
            ...meal,
            foods: meal.foods.filter(food => food.id !== foodId),
          };
        }
        return meal;
      });
      
      return {
        ...prev,
        [today]: {
          ...todayData,
          meals: updatedMeals,
        },
      };
    });
  };
  
  // Update water intake
  const updateWaterIntake = (amount: number) => {
    setNutritionData(prev => {
      const todayData = prev[today] || {
        date: today,
        meals: [],
        water: 0,
      };
      
      return {
        ...prev,
        [today]: {
          ...todayData,
          water: Math.max(0, todayData.water + amount),
        },
      };
    });
  };
  
  // Calculate total calories
  const getTotalCalories = (date: string = today): number => {
    const dayData = getNutritionForDate(date);
    return dayData.meals.reduce(
      (total, meal) => 
        total + meal.foods.reduce(
          (mealTotal, food) => mealTotal + (food.calories * (food.servingSize || 1)), 
          0
        ), 
      0
    );
  };
  
  // Calculate total proteins
  const getTotalProteins = (date: string = today): number => {
    const dayData = getNutritionForDate(date);
    return dayData.meals.reduce(
      (total, meal) => 
        total + meal.foods.reduce(
          (mealTotal, food) => mealTotal + (food.proteins * (food.servingSize || 1)), 
          0
        ), 
      0
    );
  };
  
  // Calculate total fats
  const getTotalFats = (date: string = today): number => {
    const dayData = getNutritionForDate(date);
    return dayData.meals.reduce(
      (total, meal) => 
        total + meal.foods.reduce(
          (mealTotal, food) => mealTotal + (food.fats * (food.servingSize || 1)), 
          0
        ), 
      0
    );
  };
  
  // Calculate total carbs
  const getTotalCarbs = (date: string = today): number => {
    const dayData = getNutritionForDate(date);
    return dayData.meals.reduce(
      (total, meal) => 
        total + meal.foods.reduce(
          (mealTotal, food) => mealTotal + (food.carbs * (food.servingSize || 1)), 
          0
        ), 
      0
    );
  };
  
  const todayNutrition = getNutritionForDate(today);
  
  return (
    <NutritionContext.Provider
      value={{
        todayNutrition,
        getNutritionForDate,
        addFoodToMeal,
        removeFoodFromMeal,
        updateWaterIntake,
        getTotalCalories,
        getTotalProteins,
        getTotalFats,
        getTotalCarbs,
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
