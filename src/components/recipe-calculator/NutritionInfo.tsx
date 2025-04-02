
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save } from "lucide-react";
import { Ingredient } from "./IngredientSelector";

interface NutritionInfoProps {
  ingredients: Ingredient[];
  recipeName: string;
  servings: string;
  totalWeight: string;
  onSaveRecipe: () => void;
}

export function NutritionInfo({
  ingredients,
  recipeName,
  servings,
  totalWeight,
  onSaveRecipe
}: NutritionInfoProps) {
  const { translate } = useLanguage();
  const [viewMode, setViewMode] = useState<"per_serving" | "per_100g">("per_serving");
  
  // Calculate nutrition totals
  const nutritionInfo = {
    calories: ingredients.reduce((sum, item) => sum + item.calories, 0),
    protein: ingredients.reduce((sum, item) => sum + item.protein, 0),
    fat: ingredients.reduce((sum, item) => sum + item.fat, 0),
    carbs: ingredients.reduce((sum, item) => sum + item.carbs, 0),
  };
  
  // Calculate per serving nutrition
  const perServingNutrition = {
    calories: Math.round(nutritionInfo.calories / parseInt(servings || "1")),
    protein: Math.round(nutritionInfo.protein / parseInt(servings || "1") * 10) / 10,
    fat: Math.round(nutritionInfo.fat / parseInt(servings || "1") * 10) / 10,
    carbs: Math.round(nutritionInfo.carbs / parseInt(servings || "1") * 10) / 10,
  };
  
  // Calculate per 100g nutrition
  const per100gNutrition = {
    calories: Math.round(nutritionInfo.calories / parseInt(totalWeight || "1") * 100),
    protein: Math.round(nutritionInfo.protein / parseInt(totalWeight || "1") * 100 * 10) / 10,
    fat: Math.round(nutritionInfo.fat / parseInt(totalWeight || "1") * 100 * 10) / 10,
    carbs: Math.round(nutritionInfo.carbs / parseInt(totalWeight || "1") * 100 * 10) / 10,
  };
  
  // Get the correct nutrition values based on view mode
  const displayedNutrition = viewMode === "per_serving" ? perServingNutrition : per100gNutrition;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{translate("nutritional_value")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Protein */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#ddd"
                  strokeWidth="12"
                />
                {nutritionInfo.protein > 0 && (
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="12"
                    strokeDasharray={`${nutritionInfo.protein * 2.51} 251`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                )}
                
                {/* Carbs */}
                <circle
                  cx="50"
                  cy="50"
                  r="28"
                  fill="none"
                  stroke="#ddd"
                  strokeWidth="12"
                />
                {nutritionInfo.carbs > 0 && (
                  <circle
                    cx="50"
                    cy="50"
                    r="28"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="12"
                    strokeDasharray={`${nutritionInfo.carbs * 1.76} 176`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                )}
                
                {/* Fat */}
                <circle
                  cx="50"
                  cy="50"
                  r="16"
                  fill="none"
                  stroke="#ddd"
                  strokeWidth="12"
                />
                {nutritionInfo.fat > 0 && (
                  <circle
                    cx="50"
                    cy="50"
                    r="16"
                    fill="none"
                    stroke="#eab308"
                    strokeWidth="12"
                    strokeDasharray={`${nutritionInfo.fat * 1.00} 100`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{nutritionInfo.calories}</span>
                <span className="text-sm text-muted-foreground">{translate("kcal")}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center">
              <Badge className="bg-indigo-500 mb-1">{translate("protein")}</Badge>
              <span className="text-xl font-bold">{nutritionInfo.protein}g</span>
            </div>
            <div className="flex flex-col items-center">
              <Badge className="bg-yellow-500 mb-1">{translate("fat")}</Badge>
              <span className="text-xl font-bold">{nutritionInfo.fat}g</span>
            </div>
            <div className="flex flex-col items-center">
              <Badge className="bg-emerald-500 mb-1">{translate("carbs")}</Badge>
              <span className="text-xl font-bold">{nutritionInfo.carbs}g</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center gap-4">
              <Button 
                variant={viewMode === "per_serving" ? "outline" : "outline"} 
                className={`flex-1 ${viewMode === "per_serving" ? "bg-primary/10" : ""}`}
                onClick={() => setViewMode("per_serving")}
              >
                {translate("per_serving")}
              </Button>
              <Button 
                variant={viewMode === "per_100g" ? "outline" : "outline"} 
                className={`flex-1 ${viewMode === "per_100g" ? "bg-primary/10" : ""}`}
                onClick={() => setViewMode("per_100g")}
              >
                {translate("per_100g")}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>{translate("calories")}:</span>
                <span className="font-bold">{displayedNutrition.calories} {translate("kcal")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{translate("protein")}:</span>
                <span className="font-bold">{displayedNutrition.protein}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{translate("fat")}:</span>
                <span className="font-bold">{displayedNutrition.fat}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{translate("carbs")}:</span>
                <span className="font-bold">{displayedNutrition.carbs}g</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{translate("cost")}:</span>
                <span className="font-bold">42.5 ₽</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={onSaveRecipe} 
        className="w-full mt-6" 
        size="lg" 
        disabled={ingredients.length === 0 || !recipeName}
      >
        <Save className="h-4 w-4 mr-2" />
        {translate("save_recipe")}
      </Button>
    </>
  );
}
