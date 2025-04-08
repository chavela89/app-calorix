
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContextFixed";
import { toast } from "@/components/ui/use-toast";
import { useNutrition } from "@/context/NutritionContext";
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
  const { translate, language } = useLanguage();
  const { addFoodToMeal } = useNutrition();
  const [isFavorite, setIsFavorite] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  
  // Загружаем избранные рецепты при монтировании
  useEffect(() => {
    if (recipe && isOpen) {
      const favoritesStr = localStorage.getItem('favoriteRecipes');
      const favorites = favoritesStr ? JSON.parse(favoritesStr) : [];
      setIsFavorite(favorites.some((favRecipe: any) => favRecipe.id === recipe.id));
    }
  }, [recipe, isOpen]);

  // Если рецепт не выбран, не показываем диалог
  if (!recipe) {
    return null;
  }

  // Обработчик добавления/удаления из избранного
  const handleAddToFavorites = () => {
    const favoritesStr = localStorage.getItem('favoriteRecipes');
    const favorites = favoritesStr ? JSON.parse(favoritesStr) : [];
    
    if (isFavorite) {
      // Удаляем из избранного
      const updatedFavorites = favorites.filter((favRecipe: any) => favRecipe.id !== recipe.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      toast({
        title: translate("removed_from_favorites"),
        description: recipe.name
      });
    } else {
      // Добавляем в избранное
      const updatedFavorites = [...favorites, recipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
      setIsFavorite(true);
      toast({
        title: translate("added_to_favorites"),
        description: recipe.name
      });
    }
  };

  // Обработчик функции поделиться
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: `${recipe.name} - ${recipe.description || ''}`,
        url: window.location.href
      }).then(() => {
        toast({
          title: translate("recipe_shared"),
          description: recipe.name
        });
      }).catch(error => {
        console.error('Error sharing:', error);
        // Запасной вариант, если navigator.share не сработал
        copyToClipboard();
      });
    } else {
      // Запасной вариант для браузеров, не поддерживающих Web Share API
      copyToClipboard();
    }
  };

  // Вспомогательная функция для копирования ссылки в буфер обмена
  const copyToClipboard = () => {
    const recipeUrl = window.location.href;
    navigator.clipboard.writeText(recipeUrl).then(() => {
      toast({
        title: translate("recipe_shared"),
        description: translate("link_copied_to_clipboard")
      });
    }).catch(err => {
      console.error('Failed to copy URL: ', err);
    });
  };

  // Обработчик функции печати
  const handlePrint = () => {
    toast({
      title: translate("preparing_for_print"),
      description: recipe.name
    });
    
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast({
          title: translate("error"),
          description: "Не удалось открыть окно печати",
          variant: "destructive"
        });
        return;
      }
      
      const content = printRef.current;
      
      if (content) {
        printWindow.document.write('<html><head><title>' + recipe.name + '</title>');
        printWindow.document.write('<style>');
        printWindow.document.write(`
          body { font-family: system-ui, sans-serif; line-height: 1.5; padding: 20px; max-width: 800px; margin: 0 auto; }
          h1 { font-size: 24px; margin-bottom: 10px; }
          h2 { font-size: 18px; margin: 20px 0 10px; }
          .recipe-image { max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0; }
          .recipe-info { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 20px 0; }
          .recipe-info-item { padding: 10px; background: #f5f5f5; border-radius: 8px; text-align: center; }
          .recipe-info-item-title { font-size: 12px; color: #666; }
          .recipe-info-item-value { font-weight: bold; }
          .nutrition { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 20px 0; }
          .nutrition-item { padding: 10px; background: #f5f5f5; border-radius: 8px; text-align: center; }
          .ingredients-list { margin: 0; padding: 0 0 0 20px; }
          .ingredients-list li { margin-bottom: 8px; }
          .instructions-list { margin: 0; padding: 0 0 0 20px; }
          .instructions-list li { margin-bottom: 12px; }
        `);
        printWindow.document.write('</style></head><body>');
        
        // Заголовок
        printWindow.document.write('<h1>' + recipe.name + '</h1>');
        
        // Изображение
        if (recipe.image) {
          printWindow.document.write('<img src="' + recipe.image + '" alt="' + recipe.name + '" class="recipe-image" />');
        }
        
        // Информация о рецепте
        printWindow.document.write('<div class="recipe-info">');
        printWindow.document.write(`
          <div class="recipe-info-item">
            <div class="recipe-info-item-value">${recipe.prepTime} ${translate("min")}</div>
            <div class="recipe-info-item-title">${translate("preparation_time")}</div>
          </div>
          <div class="recipe-info-item">
            <div class="recipe-info-item-value">${recipe.difficulty || translate("medium")}</div>
            <div class="recipe-info-item-title">${translate("difficulty")}</div>
          </div>
          <div class="recipe-info-item">
            <div class="recipe-info-item-value">${recipe.calories} ${translate("kcal")}</div>
            <div class="recipe-info-item-title">${translate("calories")}</div>
          </div>
          <div class="recipe-info-item">
            <div class="recipe-info-item-value">${recipe.servings || 4} ${translate("servings")}</div>
            <div class="recipe-info-item-title">${translate("servings")}</div>
          </div>
        `);
        printWindow.document.write('</div>');
        
        // Пищевая ценность
        printWindow.document.write('<h2>' + translate("nutritional_value") + '</h2>');
        printWindow.document.write('<div class="nutrition">');
        printWindow.document.write(`
          <div class="nutrition-item">
            <div>${recipe.protein}г</div>
            <div>${translate("protein")}</div>
          </div>
          <div class="nutrition-item">
            <div>${recipe.carbs}г</div>
            <div>${translate("carbs")}</div>
          </div>
          <div class="nutrition-item">
            <div>${recipe.fat}г</div>
            <div>${translate("fat")}</div>
          </div>
        `);
        printWindow.document.write('</div>');
        
        // Ингредиенты
        printWindow.document.write('<h2>' + translate("ingredients") + '</h2>');
        printWindow.document.write('<ul class="ingredients-list">');
        [
          { name: translate("chicken"), amount: "400g" },
          { name: translate("olive_oil"), amount: `2 ${translate("tbsp")}` },
          { name: translate("salt"), amount: translate("to_taste") },
          { name: translate("black_pepper"), amount: translate("to_taste") },
          { name: translate("garlic"), amount: `3 ${translate("cloves")}` },
          { name: translate("lemon"), amount: "1" },
          { name: translate("rosemary"), amount: `2 ${translate("sprigs")}` }
        ].forEach(ingredient => {
          printWindow.document.write('<li><strong>' + ingredient.name + ':</strong> ' + ingredient.amount + '</li>');
        });
        printWindow.document.write('</ul>');
        
        // Инструкции
        printWindow.document.write('<h2>' + translate("instructions") + '</h2>');
        printWindow.document.write('<ol class="instructions-list">');
        [1, 2, 3, 4, 5].forEach((step) => {
          printWindow.document.write('<li>' + translate(`recipe_step_${step}`) + '</li>');
        });
        printWindow.document.write('</ol>');
        
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
        }, 500);
      }
    } catch (error) {
      console.error("Printing error:", error);
      toast({
        title: translate("error"),
        description: "Ошибка при подготовке к печати",
        variant: "destructive"
      });
    }
  };

  // Обработчик добавления в дневник
  const handleAddToDiary = () => {
    // Создаем объект пищи из рецепта
    const foodItem = {
      id: `recipe-${recipe.id}`,
      name: recipe.name,
      calories: recipe.calories || 0,
      proteins: recipe.protein || 0,
      carbs: recipe.carbs || 0,
      fats: recipe.fat || 0,
      amount: 1,
      unit: translate("serving")
    };
    
    // Добавляем в прием пищи (по умолчанию обед)
    addFoodToMeal('lunch', foodItem);
    
    toast({
      title: translate("added_to_diary"),
      description: recipe.name
    });
    
    // Закрываем диалог после добавления
    onClose();
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

        <div className="space-y-6" id="recipe-for-print" ref={printRef}>
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
              className={`rounded-full ${isFavorite ? 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600' : ''}`}
            >
              <HeartIcon className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
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
