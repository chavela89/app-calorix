
import { Badge } from "@/components/ui/badge";
import { CircleDollarSignIcon, UsersIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContextFixed";

interface Ingredient {
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

interface RecipeCostProps {
  ingredients: Ingredient[];
  servings: string;
}

export function RecipeCost({ ingredients, servings }: RecipeCostProps) {
  const { translate } = useLanguage();
  
  const calculateTotalCost = () => {
    // Improved cost calculation
    return ingredients.reduce((total, ingredient) => {
      // Base cost for each ingredient (in real app, this would come from a database)
      const baseCost = 25; // base cost per 100g
      return total + (ingredient.amount / 100) * baseCost;
    }, 0).toFixed(0);
  };

  return (
    <div className="flex justify-between items-center pt-2 border-t">
      <div className="flex items-center">
        <CircleDollarSignIcon className="h-5 w-5 text-muted-foreground mr-2" />
        <div>
          <p className="text-sm font-medium">{translate("cost")}:</p>
          <p className="text-lg font-semibold">{calculateTotalCost()} ₽</p>
        </div>
      </div>
      
      <Badge variant="secondary" className="flex items-center gap-1">
        <UsersIcon className="h-4 w-4" />
        {parseInt(servings) || 1} {translate("servings")}
      </Badge>
    </div>
  );
}
