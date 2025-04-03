
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { 
  SaveIcon, 
  CircleDollarSignIcon,  
  BuildingIcon
} from "lucide-react";

interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

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
  const [activeTab, setActiveTab] = useState<"per_serving" | "per_100g">("per_serving");
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);

  useEffect(() => {
    // Загружаем сохраненные рецепты из localStorage при монтировании
    const savedRecipesStr = localStorage.getItem('savedRecipes');
    if (savedRecipesStr) {
      setSavedRecipes(JSON.parse(savedRecipesStr));
    }
  }, []);

  const calculateTotalNutrition = () => {
    return ingredients.reduce(
      (acc, ingredient) => {
        acc.calories += ingredient.calories * (ingredient.amount / 100);
        acc.protein += ingredient.protein * (ingredient.amount / 100);
        acc.fat += ingredient.fat * (ingredient.amount / 100);
        acc.carbs += ingredient.carbs * (ingredient.amount / 100);
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

  const calculateTotalCost = () => {
    // Placeholder for cost calculation
    return ingredients.length * 25;
  };

  const nutrition = activeTab === "per_serving" ? calculatePerServing() : calculatePer100g();

  const handleSaveRecipe = () => {
    if (!recipeName.trim()) {
      toast({
        title: translate("error"),
        description: translate("recipe_name_required"),
        variant: "destructive"
      });
      return;
    }

    const newRecipe = {
      id: Date.now(),
      name: recipeName,
      ingredients,
      servings: parseInt(servings) || 1,
      totalWeight: parseInt(totalWeight) || 1000,
      nutrition: calculateTotalNutrition(),
      createdAt: new Date().toISOString()
    };

    // Сохраняем рецепт в localStorage
    const updatedRecipes = [...savedRecipes, newRecipe];
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
    setSavedRecipes(updatedRecipes);
    
    // Вызываем переданный обработчик
    onSaveRecipe();
  };

  const handleLoadRecipe = (recipe: any) => {
    // Заглушка для функции загрузки рецепта
    toast({
      title: translate("recipe_loaded"),
      description: recipe.name
    });
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
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "per_serving" | "per_100g")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="per_serving">{translate("per_serving")}</TabsTrigger>
                  <TabsTrigger value="per_100g">{translate("per_100g")}</TabsTrigger>
                </TabsList>
                <TabsContent value="per_serving" className="pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{translate("calories")}</p>
                      <p className="text-2xl font-bold">{Math.round(nutrition.calories)} {translate("kcal")}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{translate("protein")}</p>
                      <p className="text-2xl font-bold">{nutrition.protein.toFixed(1)}g</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{translate("carbs")}</p>
                      <p className="text-2xl font-bold">{nutrition.carbs.toFixed(1)}g</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{translate("fat")}</p>
                      <p className="text-2xl font-bold">{nutrition.fat.toFixed(1)}g</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="per_100g" className="pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{translate("calories")}</p>
                      <p className="text-2xl font-bold">{Math.round(nutrition.calories)} {translate("kcal")}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{translate("protein")}</p>
                      <p className="text-2xl font-bold">{nutrition.protein.toFixed(1)}g</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{translate("carbs")}</p>
                      <p className="text-2xl font-bold">{nutrition.carbs.toFixed(1)}g</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{translate("fat")}</p>
                      <p className="text-2xl font-bold">{nutrition.fat.toFixed(1)}g</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <div className="flex items-center">
                  <CircleDollarSignIcon className="h-5 w-5 text-muted-foreground mr-2" />
                  <div>
                    <p className="text-sm font-medium">{translate("cost")}</p>
                    <p className="text-lg font-semibold">{calculateTotalCost()} ₽</p>
                  </div>
                </div>
                
                <Badge variant="secondary" className="flex items-center gap-1">
                  <BuildingIcon className="h-4 w-4" />
                  {parseInt(servings) || 1} {translate("servings")}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {savedRecipes.length > 0 && (
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
      )}

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
