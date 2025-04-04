
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  amount: number;
  unit: string;
}

export interface DailyLog {
  date: string;
  meals: {
    breakfast: FoodItem[];
    lunch: FoodItem[];
    dinner: FoodItem[];
    snack: FoodItem[];
    [key: string]: FoodItem[];
  };
  water: number;
}

interface NutritionContextType {
  dailyLogs: Record<string, DailyLog>;
  currentDayLog: DailyLog;
  meals: {
    breakfast: FoodItem[];
    lunch: FoodItem[];
    dinner: FoodItem[];
    snack: FoodItem[];
    [key: string]: FoodItem[];
  };
  waterIntake: number;
  selectedDate: Date;
  recentlyAddedFoods: FoodItem[];
  addFoodToMeal: (mealType: string, food: FoodItem) => void;
  removeFoodFromMeal: (mealType: string, foodId: string) => void;
  updateFoodInMeal: (mealType: string, foodId: string, updatedFood: Partial<FoodItem>) => void;
  setWaterIntake: (amount: number) => void;
  setSelectedDate: (date: Date) => void;
  dailyCalories: number;
  dailyProtein: number;
  dailyFat: number;
  dailyCarbs: number;
  favoriteFoods: FoodItem[];
  addToFavorites: (food: FoodItem) => void;
  removeFromFavorites: (foodId: string) => void;
}

const defaultMeals = {
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: []
};

const getFormattedDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const createEmptyDayLog = (date: Date): DailyLog => {
  return {
    date: getFormattedDate(date),
    meals: { ...defaultMeals },
    water: 0
  };
};

const NutritionContext = createContext<NutritionContextType | null>(null);

export const NutritionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyLogs, setDailyLogs] = useState<Record<string, DailyLog>>({});
  const [recentlyAddedFoods, setRecentlyAddedFoods] = useState<FoodItem[]>([]);
  const [favoriteFoods, setFavoriteFoods] = useState<FoodItem[]>([]);

  // Ensure we have a log for the current date
  useEffect(() => {
    const dateKey = getFormattedDate(selectedDate);
    if (!dailyLogs[dateKey]) {
      setDailyLogs(prev => ({
        ...prev,
        [dateKey]: createEmptyDayLog(selectedDate)
      }));
    }
  }, [selectedDate, dailyLogs]);

  const currentDayLog = dailyLogs[getFormattedDate(selectedDate)] || createEmptyDayLog(selectedDate);

  // Function to add a food item to a specific meal
  const addFoodToMeal = (mealType: string, food: FoodItem) => {
    const dateKey = getFormattedDate(selectedDate);
    
    // Ensure the food has an ID
    const foodWithId = {
      ...food,
      id: food.id || uuidv4()
    };
    
    setDailyLogs(prev => {
      const dayLog = prev[dateKey] || createEmptyDayLog(selectedDate);
      const updatedMeals = {
        ...dayLog.meals,
        [mealType]: [...(dayLog.meals[mealType] || []), foodWithId]
      };
      
      return {
        ...prev,
        [dateKey]: {
          ...dayLog,
          meals: updatedMeals
        }
      };
    });
    
    // Add to recently added foods if not already there
    setRecentlyAddedFoods(prev => {
      // Remove if already exists to avoid duplicates
      const filteredFoods = prev.filter(item => item.id !== foodWithId.id);
      // Add to the beginning of the array
      return [foodWithId, ...filteredFoods].slice(0, 5);
    });
  };

  // Function to remove a food item from a meal
  const removeFoodFromMeal = (mealType: string, foodId: string) => {
    const dateKey = getFormattedDate(selectedDate);
    
    setDailyLogs(prev => {
      const dayLog = prev[dateKey];
      if (!dayLog) return prev;
      
      const updatedMeals = {
        ...dayLog.meals,
        [mealType]: dayLog.meals[mealType].filter(food => food.id !== foodId)
      };
      
      return {
        ...prev,
        [dateKey]: {
          ...dayLog,
          meals: updatedMeals
        }
      };
    });
  };

  // Function to update a food item in a meal
  const updateFoodInMeal = (mealType: string, foodId: string, updatedFood: Partial<FoodItem>) => {
    const dateKey = getFormattedDate(selectedDate);
    
    setDailyLogs(prev => {
      const dayLog = prev[dateKey];
      if (!dayLog) return prev;
      
      const updatedMeals = {
        ...dayLog.meals,
        [mealType]: dayLog.meals[mealType].map(food => 
          food.id === foodId ? { ...food, ...updatedFood } : food
        )
      };
      
      return {
        ...prev,
        [dateKey]: {
          ...dayLog,
          meals: updatedMeals
        }
      };
    });
  };

  // Function to set water intake
  const setWaterIntake = (amount: number) => {
    const dateKey = getFormattedDate(selectedDate);
    
    setDailyLogs(prev => {
      const dayLog = prev[dateKey] || createEmptyDayLog(selectedDate);
      
      return {
        ...prev,
        [dateKey]: {
          ...dayLog,
          water: amount
        }
      };
    });
  };

  // Function to add a food to favorites
  const addToFavorites = (food: FoodItem) => {
    setFavoriteFoods(prev => {
      // Remove if already exists to avoid duplicates
      const filteredFoods = prev.filter(item => item.id !== food.id);
      // Add to the list
      return [...filteredFoods, food];
    });
  };

  // Function to remove a food from favorites
  const removeFromFavorites = (foodId: string) => {
    setFavoriteFoods(prev => prev.filter(food => food.id !== foodId));
  };

  // Calculate daily nutritional totals
  const allMeals = Object.values(currentDayLog.meals).flat();
  const dailyCalories = allMeals.reduce((sum, food) => sum + food.calories, 0);
  const dailyProtein = allMeals.reduce((sum, food) => sum + food.proteins, 0);
  const dailyFat = allMeals.reduce((sum, food) => sum + food.fats, 0);
  const dailyCarbs = allMeals.reduce((sum, food) => sum + food.carbs, 0);
  const waterIntake = currentDayLog.water;

  return (
    <NutritionContext.Provider
      value={{
        dailyLogs,
        currentDayLog,
        meals: currentDayLog.meals,
        waterIntake,
        selectedDate,
        recentlyAddedFoods,
        addFoodToMeal,
        removeFoodFromMeal,
        updateFoodInMeal,
        setWaterIntake,
        setSelectedDate,
        dailyCalories,
        dailyProtein,
        dailyFat,
        dailyCarbs,
        favoriteFoods,
        addToFavorites,
        removeFromFavorites
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (context === null) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};
