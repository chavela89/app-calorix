
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

interface Meal {
  type: string;
  foods: FoodItem[];
}

interface NutritionDay {
  date: string;
  meals: Meal[];
  water: number;
}

export interface NutritionContextType {
  dailyLogs: Record<string, NutritionDay>;
  currentDayLog: NutritionDay;
  todayNutrition: {
    meals: Meal[];
    water: number;
  };
  selectedDate: Date;
  recentlyAddedFoods: FoodItem[];
  addFoodToMeal: (mealType: string, food: FoodItem) => void;
  removeFoodFromMeal: (mealType: string, foodId: string) => void;
  updateFoodInMeal: (mealType: string, foodId: string, updatedFood: Partial<FoodItem>) => void;
  updateWaterIntake: (amount: number) => void;
  setWaterIntake: (amount: number) => void;
  setSelectedDate: (date: Date) => void;
  favoriteFoods: FoodItem[];
  addToFavorites: (food: FoodItem) => void;
  removeFromFavorites: (foodId: string) => void;
  getTotalCalories: () => number;
  getTotalProteins: () => number;
  getTotalFats: () => number;
  getTotalCarbs: () => number;
}

const getFormattedDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const createEmptyDayLog = (date: Date): NutritionDay => {
  return {
    date: getFormattedDate(date),
    meals: [
      { type: 'breakfast', foods: [] },
      { type: 'lunch', foods: [] },
      { type: 'dinner', foods: [] },
      { type: 'snack', foods: [] }
    ],
    water: 0
  };
};

const NutritionContext = createContext<NutritionContextType | null>(null);

export const NutritionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyLogs, setDailyLogs] = useState<Record<string, NutritionDay>>({});
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

  // Calculate total nutrition values
  const getTotalCalories = () => {
    return currentDayLog.meals.reduce((total, meal) => {
      return total + meal.foods.reduce((mealTotal, food) => mealTotal + food.calories, 0);
    }, 0);
  };

  const getTotalProteins = () => {
    return currentDayLog.meals.reduce((total, meal) => {
      return total + meal.foods.reduce((mealTotal, food) => mealTotal + food.proteins, 0);
    }, 0);
  };

  const getTotalFats = () => {
    return currentDayLog.meals.reduce((total, meal) => {
      return total + meal.foods.reduce((mealTotal, food) => mealTotal + food.fats, 0);
    }, 0);
  };

  const getTotalCarbs = () => {
    return currentDayLog.meals.reduce((total, meal) => {
      return total + meal.foods.reduce((mealTotal, food) => mealTotal + food.carbs, 0);
    }, 0);
  };

  // Today's nutrition data formatted for easy consumption by components
  const todayNutrition = {
    meals: currentDayLog.meals,
    water: currentDayLog.water
  };

  // Function to add a food item to a specific meal
  const addFoodToMeal = (mealType: string, food: FoodItem) => {
    const dateKey = getFormattedDate(selectedDate);
    
    // Ensure the food has an ID and unit
    const foodWithId = {
      ...food,
      id: food.id || uuidv4(),
      unit: food.unit || 'г'
    };
    
    setDailyLogs(prev => {
      const dayLog = prev[dateKey] || createEmptyDayLog(selectedDate);
      const mealIndex = dayLog.meals.findIndex(meal => meal.type === mealType);
      
      if (mealIndex === -1) {
        // If meal type doesn't exist, create it
        const updatedMeals = [
          ...dayLog.meals,
          { type: mealType, foods: [foodWithId] }
        ];
        
        return {
          ...prev,
          [dateKey]: {
            ...dayLog,
            meals: updatedMeals
          }
        };
      } else {
        // If meal type exists, add food to it
        const updatedMeals = [...dayLog.meals];
        updatedMeals[mealIndex] = {
          ...updatedMeals[mealIndex],
          foods: [...updatedMeals[mealIndex].foods, foodWithId]
        };
        
        return {
          ...prev,
          [dateKey]: {
            ...dayLog,
            meals: updatedMeals
          }
        };
      }
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
      
      const mealIndex = dayLog.meals.findIndex(meal => meal.type === mealType);
      if (mealIndex === -1) return prev;
      
      const updatedMeals = [...dayLog.meals];
      updatedMeals[mealIndex] = {
        ...updatedMeals[mealIndex],
        foods: updatedMeals[mealIndex].foods.filter(food => food.id !== foodId)
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
      
      const mealIndex = dayLog.meals.findIndex(meal => meal.type === mealType);
      if (mealIndex === -1) return prev;
      
      const updatedMeals = [...dayLog.meals];
      updatedMeals[mealIndex] = {
        ...updatedMeals[mealIndex],
        foods: updatedMeals[mealIndex].foods.map(food => 
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

  // Function to update water intake (increment/decrement)
  const updateWaterIntake = (amount: number) => {
    const dateKey = getFormattedDate(selectedDate);
    
    setDailyLogs(prev => {
      const dayLog = prev[dateKey] || createEmptyDayLog(selectedDate);
      const newWaterAmount = Math.max(0, dayLog.water + amount);
      
      return {
        ...prev,
        [dateKey]: {
          ...dayLog,
          water: newWaterAmount
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

  return (
    <NutritionContext.Provider
      value={{
        dailyLogs,
        currentDayLog,
        todayNutrition,
        selectedDate,
        recentlyAddedFoods,
        addFoodToMeal,
        removeFoodFromMeal,
        updateFoodInMeal,
        setWaterIntake,
        updateWaterIntake,
        setSelectedDate,
        favoriteFoods,
        addToFavorites,
        removeFromFavorites,
        getTotalCalories,
        getTotalProteins,
        getTotalFats,
        getTotalCarbs
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
