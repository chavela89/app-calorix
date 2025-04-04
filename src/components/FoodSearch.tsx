
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, MicIcon, BarcodeIcon } from "lucide-react";
import { VoiceSearch } from "@/components/VoiceSearch"; 
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { foodDatabase } from "@/data/foodDatabase";
import { useLanguage } from "@/context/LanguageContextFixed";
import { 
  Command, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "@/components/ui/command";

interface FoodSearchProps {
  onSelectFood: (food: any) => void;
  placeholder?: string;
}

export function FoodSearch({ onSelectFood, placeholder }: FoodSearchProps) {
  const { translate, language } = useLanguage();
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleVoiceResult = (result: string) => {
    setSearchTerm(result);
    setIsSearching(true);
    setShowVoiceSearch(false);
  };

  const handleBarcodeResult = (barcode: string) => {
    // Placeholder for barcode scanning result
    // In a real app would search for the product using this barcode
    const mockProduct = foodDatabase[Math.floor(Math.random() * foodDatabase.length)];
    onSelectFood(mockProduct);
    setShowBarcodeScanner(false);
  };

  const filteredFoods = searchTerm.trim() 
    ? foodDatabase.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleFoodSelection = (food: any) => {
    onSelectFood(food);
    setSearchTerm("");
    setIsSearching(false);
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value.trim()) {
                setIsSearching(true);
              } else {
                setIsSearching(false);
              }
            }}
            onFocus={() => {
              if (searchTerm.trim()) {
                setIsSearching(true);
              }
            }}
            placeholder={placeholder || translate("search_food_or_scan")}
            className="pl-9"
          />
        </div>
        
        {showVoiceSearch ? (
          <VoiceSearch 
            onResult={handleVoiceResult}
            onClose={() => setShowVoiceSearch(false)}
          />
        ) : (
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowVoiceSearch(true)}
          >
            <MicIcon className="h-4 w-4" />
          </Button>
        )}
        
        {showBarcodeScanner ? (
          <BarcodeScanner 
            onScan={handleBarcodeResult}
            onClose={() => setShowBarcodeScanner(false)}
          />
        ) : (
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowBarcodeScanner(true)}
          >
            <BarcodeIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {isSearching && (
        <Command className="absolute top-full left-0 right-0 mt-1 z-10 border rounded-md bg-background shadow-md">
          <CommandInput 
            placeholder={translate("search_food")}
            value={searchTerm}
            onValueChange={setSearchTerm}
            className="border-none focus:ring-0"
          />
          <CommandList>
            <CommandEmpty>{translate("no_results")}</CommandEmpty>
            <CommandGroup>
              {filteredFoods.map((food) => (
                <CommandItem 
                  key={food.id}
                  onSelect={() => handleFoodSelection(food)}
                  className="cursor-pointer"
                >
                  <div className="flex justify-between items-center w-full">
                    <span>{food.name}</span>
                    <span className="text-muted-foreground text-sm">{food.calories} {translate("kcal")}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      )}
    </div>
  );
}
