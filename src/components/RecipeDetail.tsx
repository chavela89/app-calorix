
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ClockIcon, 
  ChefHatIcon, 
  UtensilsIcon, 
  FlameIcon, 
  HeartIcon,
  PlusIcon,
  Share2Icon,
  PrinterIcon
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export interface RecipeDetailProps {
  recipe: {
    id: number;
    name: string;
    description: string;
    image: string;
    prepTime: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    rating: number;
    reviews: number;
    category: string;
    tags: string[];
    steps?: string[];
    ingredients?: { name: string; amount: string }[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RecipeDetail({ recipe, isOpen, onClose }: RecipeDetailProps) {
  const { translate } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Demo data for recipe details when not provided
  const defaultIngredients = [
    { name: translate("chicken_breast"), amount: "400g" },
    { name: translate("olive_oil"), amount: "2 " + translate("tbsp") },
    { name: translate("salt"), amount: translate("to_taste") },
    { name: translate("black_pepper"), amount: translate("to_taste") },
    { name: translate("garlic"), amount: "3 " + translate("cloves") },
    { name: translate("lemon"), amount: "1" },
    { name: translate("rosemary"), amount: "2 " + translate("sprigs") },
  ];
  
  const defaultSteps = [
    translate("recipe_step_1"),
    translate("recipe_step_2"),
    translate("recipe_step_3"),
    translate("recipe_step_4"),
    translate("recipe_step_5"),
  ];
  
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? translate("removed_from_favorites") : translate("added_to_favorites"),
      description: isFavorite 
        ? translate("recipe_removed_from_favorites") 
        : translate("recipe_added_to_favorites"),
    });
  };
  
  const handleAddToDiary = () => {
    toast({
      title: translate("added_to_diary"),
      description: translate("recipe_added_to_diary"),
    });
    onClose();
  };
  
  const handleShareRecipe = () => {
    toast({
      title: translate("share_recipe"),
      description: translate("recipe_share_success"),
    });
  };
  
  const handlePrintRecipe = () => {
    toast({
      title: translate("print_recipe"),
      description: translate("recipe_print_started"),
    });
  };
  
  if (!recipe) return null;
  
  const ingredients = recipe.ingredients || defaultIngredients;
  const steps = recipe.steps || defaultSteps;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{recipe.name}</DialogTitle>
          <DialogDescription>
            {recipe.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Recipe image */}
          <div className="aspect-video w-full overflow-hidden rounded-md">
            <img 
              src={recipe.image} 
              alt={recipe.name} 
              className="h-full w-full object-cover"
            />
          </div>
          
          {/* Recipe info */}
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
              <span>{recipe.prepTime} {translate("min")}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FlameIcon className="h-4 w-4 text-orange-500" />
              <span>{recipe.calories} {translate("kcal")}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <ChefHatIcon className="h-4 w-4 text-muted-foreground" />
              <span>{translate("medium")}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <UtensilsIcon className="h-4 w-4 text-muted-foreground" />
              <span>4 {translate("servings")}</span>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {translate(tag)}
              </Badge>
            ))}
          </div>
          
          {/* Nutrition */}
          <div className="grid grid-cols-3 gap-4 mt-6 border-t border-b py-4">
            <div className="text-center">
              <div className="text-lg font-medium">{recipe.protein}g</div>
              <div className="text-sm text-muted-foreground">{translate("protein")}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium">{recipe.carbs}g</div>
              <div className="text-sm text-muted-foreground">{translate("carbs")}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium">{recipe.fat}g</div>
              <div className="text-sm text-muted-foreground">{translate("fat")}</div>
            </div>
          </div>
          
          {/* Ingredients */}
          <div>
            <h3 className="text-lg font-medium mb-3">{translate("ingredients")}</h3>
            <ul className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex justify-between">
                  <span>{ingredient.name}</span>
                  <span className="text-muted-foreground">{ingredient.amount}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Instructions */}
          <div>
            <h3 className="text-lg font-medium mb-3">{translate("instructions")}</h3>
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm">
                    {index + 1}
                  </div>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleFavorite}
              className={isFavorite ? "text-red-500" : ""}
            >
              <HeartIcon className="h-4 w-4 mr-2" />
              {isFavorite ? translate("remove_from_favorites") : translate("add_to_favorites")}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleShareRecipe}
            >
              <Share2Icon className="h-4 w-4 mr-2" />
              {translate("share")}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrintRecipe}
            >
              <PrinterIcon className="h-4 w-4 mr-2" />
              {translate("print")}
            </Button>
          </div>
          
          <Button onClick={handleAddToDiary}>
            <PlusIcon className="h-4 w-4 mr-2" />
            {translate("add_to_diary")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
