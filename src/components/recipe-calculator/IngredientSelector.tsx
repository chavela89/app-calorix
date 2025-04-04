
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { FoodItem } from "@/context/NutritionContext";

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

interface IngredientSelectorProps {
  foodDatabase: FoodItem[];
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

export function IngredientSelector({ 
  foodDatabase, 
  ingredients, 
  setIngredients 
}: IngredientSelectorProps) {
  const { translate, language } = useLanguage();
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("100");
  const [unit, setUnit] = useState<string>(language === "ru" ? "г" : "g");
  
  // Units available for selection
  const units = language === "ru" 
    ? ["г", "кг", "мл", "л", "шт", "ст.л", "ч.л", "стакан"] 
    : ["g", "kg", "ml", "l", "pcs", "tbsp", "tsp", "cup"];
  
  const handleAddIngredient = () => {
    if (!selectedFood) return;
    
    const food = foodDatabase.find(f => f.id === selectedFood);
    if (!food) return;
    
    const amountNum = parseFloat(amount) || 0;
    
    // Calculate nutrition based on amount
    const scaleFactor = amountNum / 100; // Assuming database values are per 100g/ml
    
    const newIngredient: Ingredient = {
      id: Date.now(),
      foodId: food.id,
      name: food.name,
      amount: amountNum,
      unit: unit,
      calories: Math.round(food.calories * scaleFactor),
      protein: parseFloat((food.proteins * scaleFactor).toFixed(1)),
      fat: parseFloat((food.fats * scaleFactor).toFixed(1)),
      carbs: parseFloat((food.carbs * scaleFactor).toFixed(1))
    };
    
    setIngredients(prev => [...prev, newIngredient]);
    
    // Reset form
    setSelectedFood(null);
    setAmount("100");
  };
  
  const handleRemoveIngredient = (id: number) => {
    setIngredients(prev => prev.filter(ing => ing.id !== id));
  };
  
  const totalCalories = ingredients.reduce((sum, ing) => sum + ing.calories, 0);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{translate("ingredients")}</h3>
      
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-5">
          <label className="text-sm font-medium">
            {translate("select_ingredient")}
          </label>
          <Select 
            value={selectedFood || ''} 
            onValueChange={(value) => setSelectedFood(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={translate("select_ingredient")} />
            </SelectTrigger>
            <SelectContent>
              {foodDatabase.map(food => (
                <SelectItem key={food.id} value={food.id}>
                  {food.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="col-span-3">
          <label className="text-sm font-medium">
            {translate("quantity")}
          </label>
          <Input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        
        <div className="col-span-3">
          <label className="text-sm font-medium">
            {translate("unit")}
          </label>
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {units.map(u => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="col-span-1 flex items-end">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-full" 
            onClick={handleAddIngredient}
            disabled={!selectedFood}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {ingredients.length > 0 ? (
        <div className="space-y-2 mt-4">
          {ingredients.map(ingredient => (
            <div key={ingredient.id} className="flex justify-between items-center p-2 border rounded">
              <div>
                <p className="font-medium">{ingredient.name}</p>
                <p className="text-sm text-muted-foreground">
                  {ingredient.amount} {ingredient.unit} • {ingredient.calories} {translate("kcal")}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleRemoveIngredient(ingredient.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <div className="flex justify-between font-medium p-2">
            <span>{translate("total")}</span>
            <span>{totalCalories} {translate("kcal")}</span>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          {translate("no_ingredients_added")}
        </div>
      )}
    </div>
  );
}
