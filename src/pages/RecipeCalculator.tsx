
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  BookIcon, 
  ChevronLeftIcon, 
  CalculatorIcon, 
  UtensilsIcon,
  PercentIcon,
  ClockIcon,
  UsersIcon
} from "lucide-react";
import { IngredientSelector } from "@/components/recipe-calculator/IngredientSelector";
import { NutritionInfo } from "@/components/recipe-calculator/NutritionInfo";
import { RecipeForm } from "@/components/recipe-calculator/RecipeForm";
import { useLanguage } from "@/context/LanguageContextFixed";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { foodDatabase } from "@/data/foodDatabase";

// Define the Ingredient interface that matches what IngredientSelector expects
interface Ingredient {
  id: number;
  foodId: number;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export default function RecipeCalculator() {
  const { translate, language } = useLanguage();
  const navigate = useNavigate();
  
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [activeTab, setActiveTab] = useState("ingredients");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [servings, setServings] = useState("4");
  const [prepTime, setPrepTime] = useState("30");
  const [cookingTime, setCookingTime] = useState("45");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [totalWeight, setTotalWeight] = useState("1000");

  // Обработчик сохранения рецепта
  const handleSaveRecipe = () => {
    navigate("/recipes");
  };

  // Обработчик загрузки сохраненного рецепта
  const handleLoadRecipe = (recipe: any) => {
    if (recipe) {
      setRecipeName(recipe.name);
      if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
        setIngredients(recipe.ingredients);
      }
      setServings(recipe.servings.toString());
      setTotalWeight(recipe.totalWeight.toString());
      
      // Показываем уведомление об успешной загрузке
      toast({
        title: translate("recipe_loaded"),
        description: recipe.name
      });
    }
  };

  // Функция для обновления веса
  const handleUpdateTotalWeight = () => {
    // Расчет общего веса ингредиентов
    const total = ingredients.reduce((sum, ing) => sum + ing.amount, 0);
    setTotalWeight(total.toString());
  };

  // Обновляем общий вес при изменении ингредиентов
  useEffect(() => {
    handleUpdateTotalWeight();
  }, [ingredients]);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon" 
            className="mr-2"
            onClick={() => navigate("/recipes")}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">{translate("recipe_calculator")}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{translate("recipe_name")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Input 
                placeholder={translate("enter_recipe_name")}
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4" />
                    {translate("servings")}
                  </Label>
                  <Input 
                    type="number" 
                    min="1" 
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4" />
                    {translate("preparation_time")} ({translate("min")})
                  </Label>
                  <Input 
                    type="number" 
                    min="0" 
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <UtensilsIcon className="h-4 w-4" />
                    {translate("cooking_time")} ({translate("min")})
                  </Label>
                  <Input 
                    type="number" 
                    min="0" 
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ingredients" className="flex items-center gap-2">
                <BookIcon className="h-4 w-4" />
                {translate("ingredients")}
              </TabsTrigger>
              <TabsTrigger value="recipe" className="flex items-center gap-2">
                <CalculatorIcon className="h-4 w-4" />
                {translate("recipe")}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ingredients" className="space-y-6 mt-6">
              <IngredientSelector 
                foodDatabase={foodDatabase}
                ingredients={ingredients}
                setIngredients={setIngredients}
              />
            </TabsContent>

            <TabsContent value="recipe" className="space-y-6 mt-6">
              <RecipeForm 
                recipeName={recipeName}
                setRecipeName={setRecipeName}
                servings={servings}
                setServings={setServings}
                totalWeight={totalWeight}
                setTotalWeight={setTotalWeight}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <NutritionInfo 
            ingredients={ingredients} 
            recipeName={recipeName}
            servings={servings}
            totalWeight={totalWeight}
            onSaveRecipe={handleSaveRecipe}
            onLoadRecipe={handleLoadRecipe}
          />
        </div>
      </div>
    </div>
  );
}
