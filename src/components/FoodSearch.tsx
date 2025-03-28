
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
  const { translate } = useLanguage();

  // Sample food database
  const foodDatabase: FoodItem[] = [
    { id: "1", name: "Куриная грудка", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { id: "2", name: "Рис бурый", calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
    { id: "3", name: "Гречка", calories: 143, protein: 5.7, carbs: 25, fat: 1.5 },
    { id: "4", name: "Творог 5%", calories: 121, protein: 18, carbs: 3.3, fat: 5 },
    { id: "5", name: "Яблоко", calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
    { id: "6", name: "Банан", calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    { id: "7", name: "Овсянка", calories: 379, protein: 13, carbs: 68, fat: 7 },
    { id: "8", name: "Яйцо куриное", calories: 155, protein: 13, carbs: 1.1, fat: 11 },
    { id: "9", name: "Лосось", calories: 208, protein: 20, carbs: 0, fat: 13 },
    { id: "10", name: "Молоко 3.2%", calories: 61, protein: 3.2, carbs: 4.7, fat: 3.2 },
    { id: "11", name: "Греческий йогурт", calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
    { id: "12", name: "Киноа", calories: 120, protein: 4.4, carbs: 21, fat: 1.9 },
    { id: "13", name: "Авокадо", calories: 160, protein: 2, carbs: 8.5, fat: 14.7 },
    { id: "14", name: "Чечевица", calories: 116, protein: 9, carbs: 20, fat: 0.4 },
    { id: "15", name: "Курага", calories: 241, protein: 3.4, carbs: 55, fat: 0.5 },
    { id: "16", name: "Миндаль", calories: 576, protein: 21, carbs: 22, fat: 49 },
    { id: "17", name: "Цветная капуста", calories: 25, protein: 1.9, carbs: 5, fat: 0.3 },
    { id: "18", name: "Брокколи", calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
    { id: "19", name: "Тунец консервированный", calories: 103, protein: 23, carbs: 0, fat: 0.7 },
    { id: "20", name: "Говядина", calories: 250, protein: 26, carbs: 0, fat: 17 },
  ];

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      
      // Simulate API call delay
      const timeoutId = setTimeout(() => {
        const filteredResults = foodDatabase.filter(food => 
          food.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
    }
  }, [query]);

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
                      {food.calories} kcal | {food.protein}g {translate("protein")} | 
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
