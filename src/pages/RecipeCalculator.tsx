
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import custom components
import { RecipeForm } from "@/components/recipe-calculator/RecipeForm";
import { IngredientSelector, Ingredient } from "@/components/recipe-calculator/IngredientSelector";
import { NutritionInfo } from "@/components/recipe-calculator/NutritionInfo";

// Demo food database
const FOOD_DATABASE = [
  { id: 1, name: "Куриная грудка", calories: 165, protein: 31, fat: 3.6, carbs: 0 },
  { id: 2, name: "Рис бурый", calories: 110, protein: 2.5, fat: 0.9, carbs: 23 },
  { id: 3, name: "Овсянка", calories: 150, protein: 5, fat: 3, carbs: 27 },
  { id: 4, name: "Яйцо", calories: 70, protein: 6, fat: 5, carbs: 0 },
  { id: 5, name: "Лосось", calories: 180, protein: 22, fat: 10, carbs: 0 },
  { id: 6, name: "Брокколи", calories: 55, protein: 2.6, fat: 0.4, carbs: 11 },
  { id: 7, name: "Говядина", calories: 185, protein: 26, fat: 9, carbs: 0 },
  { id: 8, name: "Творог", calories: 98, protein: 18, fat: 1.1, carbs: 3 },
  { id: 9, name: "Картофель", calories: 77, protein: 2, fat: 0.1, carbs: 17 },
  { id: 10, name: "Помидор", calories: 22, protein: 1, fat: 0.2, carbs: 4.8 },
];

export default function RecipeCalculator() {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  
  // Recipe form state
  const [recipeName, setRecipeName] = useState("");
  const [servings, setServings] = useState("4");
  const [totalWeight, setTotalWeight] = useState("1000");
  
  // Ingredients state
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  // Save recipe handler
  const saveRecipe = () => {
    // Save recipe logic would go here
    alert(translate("recipe_saved_successfully"));
    navigate("/recipes");
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/recipes")}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{translate("recipe_calculator")}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <RecipeForm
            recipeName={recipeName}
            setRecipeName={setRecipeName}
            servings={servings}
            setServings={setServings}
            totalWeight={totalWeight}
            setTotalWeight={setTotalWeight}
          />
          
          <IngredientSelector
            foodDatabase={FOOD_DATABASE}
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        </div>

        <div className="space-y-6">
          <NutritionInfo
            ingredients={ingredients}
            recipeName={recipeName}
            servings={servings}
            totalWeight={totalWeight}
            onSaveRecipe={saveRecipe}
          />
        </div>
      </div>
    </div>
  );
}
