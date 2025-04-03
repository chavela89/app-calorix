
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

interface IngredientSelectorProps {
  foodDatabase: Array<{ id: number; name: string; calories: number; protein: number; fat: number; carbs: number }>;
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

export function IngredientSelector({ 
  foodDatabase, 
  ingredients, 
  setIngredients 
}: IngredientSelectorProps) {
  const { translate, language } = useLanguage();
  const [selectedFoodId, setSelectedFoodId] = useState<string>('');
  const [amount, setAmount] = useState<string>('100');
  const [unit, setUnit] = useState<string>('g');

  const handleAddIngredient = () => {
    const foodId = parseInt(selectedFoodId);
    if (!foodId) {
      toast({
        title: translate("error"),
        description: translate("select_ingredient"),
        variant: "destructive"
      });
      return;
    }

    const foodItem = foodDatabase.find((food) => food.id === foodId);
    if (!foodItem) return;

    const amountValue = parseInt(amount);
    if (!amountValue || amountValue <= 0) {
      toast({
        title: translate("error"),
        description: translate("enter_valid_amount"),
        variant: "destructive"
      });
      return;
    }

    const newIngredient: Ingredient = {
      id: Date.now(), // уникальный id для ингредиента
      name: foodItem.name,
      amount: amountValue,
      unit: unit,
      calories: foodItem.calories,
      protein: foodItem.protein,
      fat: foodItem.fat,
      carbs: foodItem.carbs
    };

    setIngredients([...ingredients, newIngredient]);
    setSelectedFoodId('');
    setAmount('100');
  };

  const removeIngredient = (id: number) => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  };

  // Список единиц измерения
  const units = [
    { value: "g", label: { en: "grams", ru: "грамм" } },
    { value: "ml", label: { en: "milliliters", ru: "миллилитров" } },
    { value: "tbsp", label: { en: "tbsp", ru: "ст.л" } },
    { value: "tsp", label: { en: "tsp", ru: "ч.л" } },
    { value: "piece", label: { en: "piece", ru: "штука" } },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translate("ingredients")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="ingredient">{translate("ingredient")}</Label>
              <Select 
                value={selectedFoodId} 
                onValueChange={setSelectedFoodId}
              >
                <SelectTrigger>
                  <SelectValue placeholder={translate("select_ingredient")} />
                </SelectTrigger>
                <SelectContent>
                  {foodDatabase.map((food) => (
                    <SelectItem key={food.id} value={food.id.toString()}>
                      {food.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="amount">{translate("quantity")}</Label>
              <Input 
                id="amount" 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="unit">{translate("unit")}</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {language === 'en' ? unit.label.en : unit.label.ru}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="button" 
            onClick={handleAddIngredient}
            className="w-full flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            {translate("add_ingredients")}
          </Button>

          <div className="space-y-2">
            {ingredients.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                {translate("no_ingredients_added")}
              </p>
            )}

            {ingredients.map((ingredient) => (
              <div 
                key={ingredient.id}
                className="flex justify-between items-center p-3 bg-muted rounded-md"
              >
                <div>
                  <p className="font-medium">{ingredient.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {ingredient.amount} {ingredient.unit} • {ingredient.calories * (ingredient.amount / 100)} {translate("kcal")}
                  </p>
                </div>
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={() => removeIngredient(ingredient.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
