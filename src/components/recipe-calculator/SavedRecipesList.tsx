
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { toast } from "@/components/ui/use-toast";

interface SavedRecipe {
  id: number;
  name: string;
  ingredients: Array<any>;
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

interface SavedRecipesListProps {
  onLoadRecipe: (recipe: SavedRecipe) => void;
}

export function SavedRecipesList({ onLoadRecipe }: SavedRecipesListProps) {
  const { translate } = useLanguage();
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);

  useEffect(() => {
    // Load saved recipes from localStorage when component mounts
    const savedRecipesStr = localStorage.getItem('savedRecipes');
    if (savedRecipesStr) {
      try {
        const parsedRecipes = JSON.parse(savedRecipesStr);
        setSavedRecipes(parsedRecipes);
      } catch (error) {
        console.error("Error parsing saved recipes:", error);
        setSavedRecipes([]);
      }
    }
  }, []);

  const handleLoadRecipe = (recipe: SavedRecipe) => {
    onLoadRecipe(recipe);
    toast({
      title: translate("recipe_loaded"),
      description: recipe.name
    });
  };

  if (savedRecipes.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translate("saved_recipes")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {savedRecipes.slice(0, 5).map(recipe => (
            <div key={recipe.id} className="flex justify-between items-center p-2 bg-muted rounded-md">
              <span>{recipe.name}</span>
              <Button variant="ghost" size="sm" onClick={() => handleLoadRecipe(recipe)}>
                {translate("load_recipe")}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
