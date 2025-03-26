
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  amount: number;
  unit: string;
}

interface MealCardProps {
  title: string;
  icon: React.ReactNode;
  foods: FoodItem[];
  onAddFood: () => void;
  onRemoveFood: (id: string) => void;
}

export function MealCard({ title, icon, foods, onAddFood, onRemoveFood }: MealCardProps) {
  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {icon}
          <span>{title}</span>
          <span className="text-sm font-normal text-muted-foreground ml-2">
            {totalCalories} ккал
          </span>
        </CardTitle>
        <Button size="sm" variant="ghost" onClick={onAddFood}>
          <PlusIcon className="h-4 w-4 mr-1" /> Добавить
        </Button>
      </CardHeader>
      <CardContent>
        {foods.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            Нет добавленных продуктов
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
                    {food.amount} {food.unit} • {food.calories} ккал
                  </div>
                </div>
                <div className="text-sm text-right mr-4">
                  <div>{food.proteins}г Б</div>
                  <div>{food.fats}г Ж</div>
                  <div>{food.carbs}г У</div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onRemoveFood(food.id)}
                  className="h-8 w-8"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
