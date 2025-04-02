
import { useState } from "react";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Ingredient type definition
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

// Food database item definition
interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

interface IngredientSelectorProps {
  foodDatabase: FoodItem[];
  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
}

export function IngredientSelector({ 
  foodDatabase,
  ingredients,
  setIngredients
}: IngredientSelectorProps) {
  const { translate } = useLanguage();
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [amount, setAmount] = useState("100");
  const [unit, setUnit] = useState("г");

  // Add ingredient function
  const addIngredient = () => {
    if (selectedIngredient && amount) {
      const ingredient = foodDatabase.find(food => food.name === selectedIngredient);
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

  // Remove ingredient function
  const removeIngredient = (id: number) => {
    setIngredients(ingredients.filter(item => item.id !== id));
  };

  return (
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
                  {foodDatabase.map(food => (
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
  );
}
