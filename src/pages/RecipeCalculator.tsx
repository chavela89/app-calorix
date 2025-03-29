import { useState } from "react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, TrashIcon, ChevronLeftIcon, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Демо продукты
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
  
  // Состояния для формы рецепта
  const [recipeName, setRecipeName] = useState("");
  const [servings, setServings] = useState("4");
  const [totalWeight, setTotalWeight] = useState("1000");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [amount, setAmount] = useState("100");
  const [unit, setUnit] = useState("г");
  const [ingredients, setIngredients] = useState<Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  }>>([]);
  
  // Расчёт пищевой ценности
  const nutritionInfo = {
    calories: ingredients.reduce((sum, item) => sum + item.calories, 0),
    protein: ingredients.reduce((sum, item) => sum + item.protein, 0),
    fat: ingredients.reduce((sum, item) => sum + item.fat, 0),
    carbs: ingredients.reduce((sum, item) => sum + item.carbs, 0),
  };
  
  const perServingNutrition = {
    calories: Math.round(nutritionInfo.calories / parseInt(servings)),
    protein: Math.round(nutritionInfo.protein / parseInt(servings) * 10) / 10,
    fat: Math.round(nutritionInfo.fat / parseInt(servings) * 10) / 10,
    carbs: Math.round(nutritionInfo.carbs / parseInt(servings) * 10) / 10,
  };
  
  const per100gNutrition = {
    calories: Math.round(nutritionInfo.calories / parseInt(totalWeight) * 100),
    protein: Math.round(nutritionInfo.protein / parseInt(totalWeight) * 100 * 10) / 10,
    fat: Math.round(nutritionInfo.fat / parseInt(totalWeight) * 100 * 10) / 10,
    carbs: Math.round(nutritionInfo.carbs / parseInt(totalWeight) * 100 * 10) / 10,
  };

  // Добавление ингредиента
  const addIngredient = () => {
    if (selectedIngredient && amount) {
      const ingredient = FOOD_DATABASE.find(food => food.name === selectedIngredient);
      if (ingredient) {
        const amountValue = parseFloat(amount);
        const newIngredient = {
          id: Date.now(),
          name: ingredient.name,
          amount: amountValue,
          unit,
          calories: Math.round(ingredient.calories * amountValue / 100),
          protein: Math.round(ingredient.protein * amountValue / 100 * 10) / 10,
          fat: Math.round(ingredient.fat * amountValue / 100 * 10) / 10,
          carbs: Math.round(ingredient.carbs * amountValue / 100 * 10) / 10,
        };
        
        setIngredients([...ingredients, newIngredient]);
        setSelectedIngredient("");
        setAmount("100");
      }
    }
  };

  // Удаление ингредиента
  const removeIngredient = (id: number) => {
    setIngredients(ingredients.filter(item => item.id !== id));
  };

  // Сохранение рецепта
  const saveRecipe = () => {
    // Здесь будет логика сохранения рецепта
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
          <Card>
            <CardHeader>
              <CardTitle>{translate("recipe_name")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="recipeName">{translate("recipe_name")}</Label>
                  <Input 
                    id="recipeName" 
                    value={recipeName} 
                    onChange={(e) => setRecipeName(e.target.value)} 
                    placeholder={translate("enter_recipe_name")}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="servings">{translate("servings")}</Label>
                    <Input 
                      id="servings" 
                      type="number" 
                      value={servings} 
                      onChange={(e) => setServings(e.target.value)} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalWeight">{translate("weight")} (g)</Label>
                    <Input 
                      id="totalWeight" 
                      type="number" 
                      value={totalWeight} 
                      onChange={(e) => setTotalWeight(e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{translate("ingredients")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-5">
                    <Label htmlFor="ingredient">{translate("ingredient")}</Label>
                    <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
                      <SelectTrigger>
                        <SelectValue placeholder={translate("select_ingredient")} />
                      </SelectTrigger>
                      <SelectContent>
                        {FOOD_DATABASE.map(food => (
                          <SelectItem key={food.id} value={food.name}>{food.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-3">
                    <Label htmlFor="amount">{translate("amount")}</Label>
                    <Input 
                      id="amount" 
                      type="number" 
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)} 
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="unit">{translate("unit")}</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="г">г</SelectItem>
                        <SelectItem value="мл">мл</SelectItem>
                        <SelectItem value="шт">шт</SelectItem>
                        <SelectItem value="ст.л">ст.л</SelectItem>
                        <SelectItem value="ч.л">ч.л</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 flex items-end">
                    <Button onClick={addIngredient} className="w-full">
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {ingredients.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{translate("ingredient")}</TableHead>
                        <TableHead>{translate("quantity")}</TableHead>
                        <TableHead className="text-right">{translate("calories")}</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ingredients.map(ingredient => (
                        <TableRow key={ingredient.id}>
                          <TableCell>{ingredient.name}</TableCell>
                          <TableCell>{ingredient.amount} {ingredient.unit}</TableCell>
                          <TableCell className="text-right">{ingredient.calories}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => removeIngredient(ingredient.id)}>
                              <TrashIcon className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    {translate("no_ingredients_added")}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
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
                  <Button variant="outline" className="flex-1 bg-primary/10">
                    {translate("per_serving")}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    {translate("per_100g")}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>{translate("calories")}:</span>
                    <span className="font-bold">{perServingNutrition.calories} {translate("kcal")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{translate("protein")}:</span>
                    <span className="font-bold">{perServingNutrition.protein}g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{translate("fat")}:</span>
                    <span className="font-bold">{perServingNutrition.fat}g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{translate("carbs")}:</span>
                    <span className="font-bold">{perServingNutrition.carbs}g</span>
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
            onClick={saveRecipe} 
            className="w-full" 
            size="lg" 
            disabled={ingredients.length === 0 || !recipeName}
          >
            <Save className="h-4 w-4 mr-2" />
            {translate("save_recipe")}
          </Button>
        </div>
      </div>
    </div>
  );
}
