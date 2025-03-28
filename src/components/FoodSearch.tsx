
import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VoiceSearch } from "@/components/VoiceSearch";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { useLanguage } from "@/context/LanguageContext";

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodSearchProps {
  onSelectFood: (food: FoodItem) => void;
  placeholder?: string;
}

export function FoodSearch({ onSelectFood, placeholder }: FoodSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { translate, language } = useLanguage();

  // Sample food database with translations
  const foodDatabase: FoodItem[] = [
    { id: "1", name: language === "ru" ? "Куриная грудка" : "Chicken breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { id: "2", name: language === "ru" ? "Рис бурый" : "Brown rice", calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
    { id: "3", name: language === "ru" ? "Гречка" : "Buckwheat", calories: 143, protein: 5.7, carbs: 25, fat: 1.5 },
    { id: "4", name: language === "ru" ? "Творог 5%" : "Cottage cheese 5%", calories: 121, protein: 18, carbs: 3.3, fat: 5 },
    { id: "5", name: language === "ru" ? "Яблоко" : "Apple", calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
    { id: "6", name: language === "ru" ? "Банан" : "Banana", calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    { id: "7", name: language === "ru" ? "Овсянка" : "Oatmeal", calories: 379, protein: 13, carbs: 68, fat: 7 },
    { id: "8", name: language === "ru" ? "Яйцо куриное" : "Chicken egg", calories: 155, protein: 13, carbs: 1.1, fat: 11 },
    { id: "9", name: language === "ru" ? "Лосось" : "Salmon", calories: 208, protein: 20, carbs: 0, fat: 13 },
    { id: "10", name: language === "ru" ? "Молоко 3.2%" : "Milk 3.2%", calories: 61, protein: 3.2, carbs: 4.7, fat: 3.2 },
    { id: "11", name: language === "ru" ? "Греческий йогурт" : "Greek yogurt", calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
    { id: "12", name: language === "ru" ? "Киноа" : "Quinoa", calories: 120, protein: 4.4, carbs: 21, fat: 1.9 },
    { id: "13", name: language === "ru" ? "Авокадо" : "Avocado", calories: 160, protein: 2, carbs: 8.5, fat: 14.7 },
    { id: "14", name: language === "ru" ? "Чечевица" : "Lentils", calories: 116, protein: 9, carbs: 20, fat: 0.4 },
    { id: "15", name: language === "ru" ? "Курага" : "Dried apricots", calories: 241, protein: 3.4, carbs: 55, fat: 0.5 },
    { id: "16", name: language === "ru" ? "Миндаль" : "Almonds", calories: 576, protein: 21, carbs: 22, fat: 49 },
    { id: "17", name: language === "ru" ? "Цветная капуста" : "Cauliflower", calories: 25, protein: 1.9, carbs: 5, fat: 0.3 },
    { id: "18", name: language === "ru" ? "Брокколи" : "Broccoli", calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
    { id: "19", name: language === "ru" ? "Тунец консервированный" : "Canned tuna", calories: 103, protein: 23, carbs: 0, fat: 0.7 },
    { id: "20", name: language === "ru" ? "Говядина" : "Beef", calories: 250, protein: 26, carbs: 0, fat: 17 },
    // Adding more items
    { id: "21", name: language === "ru" ? "Тофу" : "Tofu", calories: 144, protein: 17, carbs: 3, fat: 8 },
    { id: "22", name: language === "ru" ? "Шпинат" : "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
    { id: "23", name: language === "ru" ? "Кускус" : "Couscous", calories: 112, protein: 3.8, carbs: 23, fat: 0.2 },
    { id: "24", name: language === "ru" ? "Красная чечевица" : "Red lentils", calories: 116, protein: 9, carbs: 20, fat: 0.4 },
    { id: "25", name: language === "ru" ? "Морковь" : "Carrot", calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
    { id: "26", name: language === "ru" ? "Свекла" : "Beetroot", calories: 43, protein: 1.6, carbs: 10, fat: 0.2 },
    { id: "27", name: language === "ru" ? "Перец болгарский" : "Bell pepper", calories: 31, protein: 1, carbs: 6, fat: 0.3 },
    { id: "28", name: language === "ru" ? "Курица (бедро)" : "Chicken thigh", calories: 209, protein: 19, carbs: 0, fat: 15 },
    { id: "29", name: language === "ru" ? "Картофель" : "Potato", calories: 77, protein: 2, carbs: 17, fat: 0.1 },
    { id: "30", name: language === "ru" ? "Помидоры" : "Tomatoes", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  ];

  useEffect(() => {
    // Update search results even with an empty query
    if (query === "") {
      setResults(foodDatabase.slice(0, 5)); // Show first 5 items as suggestions
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    const timeoutId = setTimeout(() => {
      const filteredResults = foodDatabase.filter(food => 
        food.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
      setIsLoading(false);
    }, 100); // Reduced delay for better responsiveness
    
    return () => clearTimeout(timeoutId);
  }, [query, language]);

  const handleVoiceResult = (transcript: string) => {
    setQuery(transcript);
  };

  const handleBarcodeResult = (barcode: string) => {
    // In a real app, you would look up the product by barcode
    // For demo purposes, let's just set a fixed product
    const mockProduct = foodDatabase[3]; // Творог 5%
    onSelectFood(mockProduct);
  };

  return (
    <div className="relative">
      <div className="flex">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder || translate("search_food")}
            className="pl-9 pr-16"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            <VoiceSearch onResult={handleVoiceResult} />
            <BarcodeScanner onScan={handleBarcodeResult} />
          </div>
        </div>
      </div>
      
      {results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg">
          <ScrollArea className="max-h-60">
            <div className="p-2">
              {results.map(food => (
                <Button
                  key={food.id}
                  variant="ghost"
                  className="w-full justify-start text-left mb-1 px-3 py-2 h-auto"
                  onClick={() => {
                    onSelectFood(food);
                    setQuery("");
                    setResults([]);
                  }}
                >
                  <div>
                    <div className="font-medium">{food.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {food.calories} {translate("kcal")} | {food.protein}g {translate("protein")} | 
                      {food.carbs}g {translate("carbs")} | {food.fat}g {translate("fat")}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
