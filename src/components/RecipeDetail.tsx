
import { Fragment } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContextFixed";
import { toast } from "@/components/ui/use-toast";
import { 
  ClockIcon, 
  FlameIcon, 
  UtensilsIcon, 
  HeartIcon, 
  ShareIcon, 
  PrinterIcon,
  PlusIcon
} from "lucide-react";

interface RecipeDetailProps {
  recipe: any;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeDetail = ({ recipe, isOpen, onClose }: RecipeDetailProps) => {
  const { translate } = useLanguage();

  // Если рецепт не выбран, не показываем диалог
  if (!recipe) {
    return null;
  }

  // Обработчики действий
  const handleAddToFavorites = () => {
    toast({
      title: translate("added_to_favorites"),
      description: recipe.name
    });
  };

  const handleShare = () => {
    toast({
      title: translate("share"),
      description: translate("feature_coming_soon")
    });
  };

  const handlePrint = () => {
    toast({
      title: translate("print"),
      description: translate("feature_coming_soon")
    });
  };

  const handleAddToDiary = () => {
    toast({
      title: translate("add_to_diary"),
      description: translate("feature_coming_soon")
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] md:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">{recipe.name}</DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {recipe.tags && recipe.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">{translate(tag)}</Badge>
            ))}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Изображение рецепта */}
          <div className="aspect-video w-full overflow-hidden rounded-md">
            <img 
              src={recipe.image} 
              alt={recipe.name} 
              className="h-full w-full object-cover"
            />
          </div>

          {/* Основная информация */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <ClockIcon className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="font-medium">{recipe.prepTime} {translate("min")}</span>
              <span className="text-xs text-muted-foreground">{translate("preparation_time")}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <UtensilsIcon className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="font-medium">{recipe.difficulty || translate("medium")}</span>
              <span className="text-xs text-muted-foreground">{translate("difficulty")}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <FlameIcon className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="font-medium">{recipe.calories} {translate("kcal")}</span>
              <span className="text-xs text-muted-foreground">{translate("calories")}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <UtensilsIcon className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="font-medium">{recipe.servings || 4} {translate("servings")}</span>
              <span className="text-xs text-muted-foreground">{translate("servings")}</span>
            </div>
          </div>

          {/* Пищевая ценность */}
          <div>
            <h3 className="font-semibold mb-3">{translate("nutritional_value")}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-2 bg-muted/50 rounded-md">
                <div className="text-sm font-medium">{recipe.protein}g</div>
                <div className="text-xs text-muted-foreground">{translate("protein")}</div>
              </div>
              <div className="text-center p-2 bg-muted/50 rounded-md">
                <div className="text-sm font-medium">{recipe.carbs}g</div>
                <div className="text-xs text-muted-foreground">{translate("carbs")}</div>
              </div>
              <div className="text-center p-2 bg-muted/50 rounded-md">
                <div className="text-sm font-medium">{recipe.fat}g</div>
                <div className="text-xs text-muted-foreground">{translate("fat")}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Ингредиенты */}
          <div>
            <h3 className="font-semibold mb-3">{translate("ingredients")}</h3>
            <ul className="space-y-2">
              {[
                { name: translate("chicken"), amount: "400g" },
                { name: translate("olive_oil"), amount: `2 ${translate("tbsp")}` },
                { name: translate("salt"), amount: translate("to_taste") },
                { name: translate("black_pepper"), amount: translate("to_taste") },
                { name: translate("garlic"), amount: `3 ${translate("cloves")}` },
                { name: translate("lemon"), amount: "1" },
                { name: translate("rosemary"), amount: `2 ${translate("sprigs")}` }
              ].map((ingredient, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{ingredient.name}</span>
                  <span className="text-muted-foreground">{ingredient.amount}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Separator />

          {/* Инструкции */}
          <div>
            <h3 className="font-semibold mb-3">{translate("instructions")}</h3>
            <ol className="space-y-4 list-decimal list-inside">
              {[1, 2, 3, 4, 5].map((step) => (
                <li key={step} className="pl-2">
                  {translate(`recipe_step_${step}`)}
                </li>
              ))}
            </ol>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row sm:justify-between mt-6">
          <div className="flex gap-2 mb-4 sm:mb-0">
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddToFavorites}
              className="rounded-full"
            >
              <HeartIcon className="h-4 w-4" />
              <span className="sr-only">{translate("add_to_favorites")}</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              className="rounded-full"
            >
              <ShareIcon className="h-4 w-4" />
              <span className="sr-only">{translate("share")}</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrint}
              className="rounded-full"
            >
              <PrinterIcon className="h-4 w-4" />
              <span className="sr-only">{translate("print")}</span>
            </Button>
          </div>
          <Button
            onClick={handleAddToDiary}
            className="w-full sm:w-auto gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            {translate("add_to_diary")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { RecipeDetail };
