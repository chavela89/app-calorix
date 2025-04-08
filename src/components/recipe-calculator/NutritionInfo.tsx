
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { SaveIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { MacroNutritionDisplay } from "./MacroNutritionDisplay";
import { NutritionTabs } from "./NutritionTabs";
import { RecipeCost } from "./RecipeCost";
import { SavedRecipesList } from "./SavedRecipesList";

export interface Ingredient {
  id: number;
  foodId: string;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface SavedRecipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  servings: number;
  totalWeight: number;
  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  createdAt: string;
  instructions?: string[];
  recipeDescription?: string;
  selectedTags?: string[];
  prepTime?: string;
  cookingTime?: string;
}

interface NutritionInfoProps {
  ingredients: Ingredient[];
  recipeName: string;
  servings: string;
  totalWeight: string;
  instructions?: string[];
  recipeDescription?: string;
  selectedTags?: string[];
  prepTime?: string;
  cookingTime?: string;
  onSaveRecipe: () => void;
  onLoadRecipe: (recipe: SavedRecipe) => void;
}

export function NutritionInfo({ 
  ingredients, 
  recipeName, 
  servings, 
  totalWeight, 
  instructions,
  recipeDescription,
  selectedTags,
  prepTime,
  cookingTime,
  onSaveRecipe,
  onLoadRecipe
}: NutritionInfoProps) {
  const { translate, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"per_serving" | "per_100g">("per_serving");
  
  const calculateTotalNutrition = () => {
    return ingredients.reduce(
      (acc, ingredient) => {
        acc.calories += ingredient.calories;
        acc.protein += ingredient.protein;
        acc.fat += ingredient.fat;
        acc.carbs += ingredient.carbs;
        return acc;
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0 }
    );
  };

  const calculatePerServing = () => {
    const total = calculateTotalNutrition();
    const servingCount = parseInt(servings) || 1;
    
    return {
      calories: total.calories / servingCount,
      protein: total.protein / servingCount,
      fat: total.fat / servingCount,
      carbs: total.carbs / servingCount
    };
  };

  const calculatePer100g = () => {
    const total = calculateTotalNutrition();
    const weight = parseInt(totalWeight) || 1000;
    
    return {
      calories: (total.calories / weight) * 100,
      protein: (total.protein / weight) * 100,
      fat: (total.fat / weight) * 100,
      carbs: (total.carbs / weight) * 100
    };
  };

  const nutrition = activeTab === "per_serving" ? calculatePerServing() : calculatePer100g();

  const handleSaveRecipe = () => {
    if (!recipeName.trim()) {
      toast({
        title: language === "ru" ? "Ошибка" : "Error",
        description: language === "ru" ? "Введите название рецепта" : "Enter recipe name",
        variant: "destructive"
      });
      return;
    }

    const newRecipe: SavedRecipe = {
      id: Date.now(),
      name: recipeName,
      ingredients,
      servings: parseInt(servings) || 1,
      totalWeight: parseInt(totalWeight) || 1000,
      nutrition: calculateTotalNutrition(),
      createdAt: new Date().toISOString(),
      instructions,
      recipeDescription,
      selectedTags,
      prepTime,
      cookingTime
    };

    // Получаем существующие рецепты из localStorage
    const savedRecipesStr = localStorage.getItem('savedRecipes');
    const savedRecipes = savedRecipesStr ? JSON.parse(savedRecipesStr) : [];
    
    // Добавляем новый рецепт и сохраняем обратно в localStorage
    const updatedRecipes = [...savedRecipes, newRecipe];
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
    
    // Вызываем переданный обработчик
    onSaveRecipe();
    
    toast({
      title: translate("recipe_saved_successfully"),
      description: recipeName
    });
  };

  const handleLoadRecipe = (recipe: SavedRecipe) => {
    onLoadRecipe(recipe);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{translate("nutritional_value")}</CardTitle>
        </CardHeader>
        <CardContent>
          {ingredients.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              {translate("no_ingredients_added")}
            </p>
          ) : (
            <div className="space-y-6">
              <MacroNutritionDisplay 
                calories={nutrition.calories}
                protein={nutrition.protein}
                fat={nutrition.fat}
                carbs={nutrition.carbs}
              />

              <NutritionTabs 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                nutrition={nutrition}
              />
              
              <RecipeCost 
                ingredients={ingredients} 
                servings={servings} 
              />
            </div>
          )}
        </CardContent>
      </Card>

      <SavedRecipesList onLoadRecipe={handleLoadRecipe} />

      <Button 
        onClick={handleSaveRecipe}
        className="w-full flex items-center gap-2"
        disabled={ingredients.length === 0}
      >
        <SaveIcon className="h-4 w-4" />
        {translate("save_recipe")}
      </Button>
    </div>
  );
}
