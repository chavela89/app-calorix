
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2Icon, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FoodItem } from "@/context/NutritionContext";
import { useLanguage } from "@/context/LanguageContextFixed";
import { toast } from "@/components/ui/use-toast";

interface MealCardProps {
  title: string;
  icon: React.ReactNode;
  foods: FoodItem[];
  onAddFood: () => void;
  onRemoveFood: (id: string) => void;
  time?: string;
  totalCalories?: number;
  actionComponent?: React.ReactNode;
}

export function MealCard({ 
  title, 
  icon, 
  foods, 
  onAddFood, 
  onRemoveFood, 
  time,
  totalCalories,
  actionComponent
}: MealCardProps) {
  const { translate, language } = useLanguage();
  const mealTotalCalories = totalCalories || foods.reduce((sum, food) => sum + food.calories, 0);

  const handleRemoveFood = (id: string) => {
    // Call the parent function to remove the food
    onRemoveFood(id);
    
    // Show confirmation toast
    toast({
      title: translate("item_deleted"),
      description: translate("item_removed_from_meal"),
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {icon}
          <div className="flex flex-col items-start">
            <span>{title}</span>
            {time && <span className="text-xs text-muted-foreground">{time}</span>}
          </div>
          <span className="text-sm font-normal text-muted-foreground ml-2">
            {mealTotalCalories} {translate("kcal")}
          </span>
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost" onClick={onAddFood} className="h-8 w-8 p-0">
            <PlusIcon className="h-4 w-4" />
          </Button>
          {actionComponent || (
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {foods.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            {translate("no_planned_meals")}
          </div>
        ) : (
          <div className="space-y-2">
            {foods.map((food) => (
              <div
                key={food.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-none"
              >
                <div className="flex-1">
                  <div className="font-medium">{food.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {food.amount || '--'} {food.unit || translate("g")}
                  </div>
                </div>
                <div className="text-right mr-4">
                  <div>{food.calories} {translate("kcal")}</div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleRemoveFood(food.id)}
                  className="h-8 w-8"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
        
        {foods.length > 0 && (
          <Button 
            variant="ghost" 
            className="w-full mt-4 text-muted-foreground hover:text-foreground"
            onClick={onAddFood}
          >
            <PlusIcon className="h-4 w-4 mr-2" /> {translate("add_food")}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
