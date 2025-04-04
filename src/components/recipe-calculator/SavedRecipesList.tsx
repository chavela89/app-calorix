
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContextFixed";

interface SavedRecipesListProps {
  onLoadRecipe: (recipe: any) => void;
}

export function SavedRecipesList({ onLoadRecipe }: SavedRecipesListProps) {
  const { translate } = useLanguage();
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);

  useEffect(() => {
    // Load saved recipes from localStorage when component mounts
    const savedRecipesStr = localStorage.getItem('savedRecipes');
    if (savedRecipesStr) {
      setSavedRecipes(JSON.parse(savedRecipesStr));
    }
  }, []);

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
              <Button variant="ghost" size="sm" onClick={() => onLoadRecipe(recipe)}>
                {translate("load_recipe")}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
