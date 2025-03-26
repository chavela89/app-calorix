
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FoodItem } from "./MealCard";
import { useState } from "react";
import { foodDatabase } from "@/data/foodDatabase";
import { Search } from "lucide-react";

interface AddFoodDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFood: (food: FoodItem) => void;
}

export function AddFoodDialog({ isOpen, onClose, onAddFood }: AddFoodDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [amount, setAmount] = useState(100);

  const handleSearch = () => {
    if (searchTerm.trim().length < 2) return;
    
    const results = foodDatabase
      .filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 10);

    setSearchResults(results);
  };

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood({ ...food });
    setAmount(100);
  };

  const handleAddFood = () => {
    if (!selectedFood) return;
    
    // Корректируем значения в соответствии с выбранным количеством
    const factor = amount / 100;
    const newFood = {
      ...selectedFood,
      amount,
      calories: Math.round(selectedFood.calories * factor),
      proteins: Number((selectedFood.proteins * factor).toFixed(1)),
      fats: Number((selectedFood.fats * factor).toFixed(1)),
      carbs: Number((selectedFood.carbs * factor).toFixed(1)),
    };
    
    onAddFood(newFood);
    onClose();
    
    // Сбрасываем состояние
    setSearchTerm("");
    setSearchResults([]);
    setSelectedFood(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Добавить продукт</DialogTitle>
        </DialogHeader>
        
        {!selectedFood ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Поиск продуктов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button variant="outline" onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="overflow-auto max-h-[300px]">
              {searchResults.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  {searchTerm ? "Ничего не найдено" : "Введите название продукта"}
                </div>
              ) : (
                <div className="space-y-1">
                  {searchResults.map((food) => (
                    <div
                      key={food.id}
                      className="p-2 rounded hover:bg-muted cursor-pointer"
                      onClick={() => handleSelectFood(food)}
                    >
                      <div className="font-medium">{food.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {food.calories} ккал • {food.proteins}г Б • {food.fats}г Ж • {food.carbs}г У
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 border rounded-lg bg-muted/50">
              <div className="font-medium">{selectedFood.name}</div>
              <div className="text-sm text-muted-foreground">
                На 100 {selectedFood.unit}: {selectedFood.calories} ккал • {selectedFood.proteins}г Б • {selectedFood.fats}г Ж • {selectedFood.carbs}г У
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Количество ({selectedFood.unit})</div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAmount((prev) => Math.max(10, prev - 10))}
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 1)}
                  min={1}
                  className="text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAmount((prev) => prev + 10)}
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="font-medium">Пищевая ценность на {amount} {selectedFood.unit}</div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Калории</div>
                  <div className="font-medium">{Math.round(selectedFood.calories * amount / 100)} ккал</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Белки</div>
                  <div className="font-medium">{(selectedFood.proteins * amount / 100).toFixed(1)}г</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Жиры</div>
                  <div className="font-medium">{(selectedFood.fats * amount / 100).toFixed(1)}г</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Углеводы</div>
                  <div className="font-medium">{(selectedFood.carbs * amount / 100).toFixed(1)}г</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedFood(null)}>
                Назад
              </Button>
              <Button onClick={handleAddFood}>Добавить</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
