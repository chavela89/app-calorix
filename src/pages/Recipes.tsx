
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RecipeDetail } from "@/components/RecipeDetail";
import { 
  BookOpenIcon, 
  ChevronRightIcon, 
  ClockIcon, 
  SearchIcon, 
  StarIcon, 
  UtensilsIcon, 
  HeartIcon 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FoodSearch } from "@/components/FoodSearch";

export default function Recipes() {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isRecipeDetailOpen, setIsRecipeDetailOpen] = useState(false);
  
  // Демо-данные для рецептов
  const recipes = [
    {
      id: 1,
      name: "Куриная грудка с овощами и киноа",
      description: "Легкое и питательное блюдо, богатое белком и клетчаткой.",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      prepTime: 35,
      calories: 425,
      protein: 38,
      carbs: 45,
      fat: 12,
      rating: 4.7,
      reviews: 124,
      category: "dinner",
      tags: ["protein", "healthy", "chicken"]
    },
    {
      id: 2,
      name: "Овсянка с ягодами и орехами",
      description: "Идеальный завтрак для энергичного начала дня.",
      image: "https://images.unsplash.com/photo-1565895405140-6b9830a88c19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      prepTime: 15,
      calories: 320,
      protein: 12,
      carbs: 55,
      fat: 8,
      rating: 4.5,
      reviews: 98,
      category: "breakfast",
      tags: ["vegetarian", "quick", "oats"]
    },
    {
      id: 3,
      name: "Греческий салат с фетой",
      description: "Свежий и легкий средиземноморский салат с оливковым маслом.",
      image: "https://images.unsplash.com/photo-1564093497595-593b96d80180?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
      prepTime: 20,
      calories: 285,
      protein: 9,
      carbs: 12,
      fat: 22,
      rating: 4.2,
      reviews: 76,
      category: "lunch",
      tags: ["vegetarian", "low-carb", "salad"]
    },
    {
      id: 4,
      name: "Смузи-боул с ягодами и гранолой",
      description: "Питательный и освежающий смузи-боул для идеального завтрака.",
      image: "https://images.unsplash.com/photo-1511690002103-4d5cdb981138?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      prepTime: 10,
      calories: 290,
      protein: 8,
      carbs: 62,
      fat: 4,
      rating: 4.6,
      reviews: 112,
      category: "breakfast",
      tags: ["vegan", "quick", "smoothie"]
    },
    {
      id: 5,
      name: "Лосось с картофельным пюре и спаржей",
      description: "Изысканный ужин, богатый Омега-3 жирными кислотами.",
      image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=690&q=80",
      prepTime: 40,
      calories: 520,
      protein: 35,
      carbs: 38,
      fat: 25,
      rating: 4.8,
      reviews: 132,
      category: "dinner",
      tags: ["fish", "protein", "gourmet"]
    },
    {
      id: 6,
      name: "Протеиновые панкейки",
      description: "Вкусный и полезный завтрак, богатый белком.",
      image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      prepTime: 25,
      calories: 380,
      protein: 28,
      carbs: 32,
      fat: 14,
      rating: 4.4,
      reviews: 92,
      category: "breakfast",
      tags: ["protein", "pancakes", "sweet"]
    }
  ];

  // Tags mapping
  const tagsMappings: Record<string, string[]> = {
    "vegetarian": ["vegetarian", "vegan"],
    "high_protein": ["protein"],
    "low_carb": ["low-carb"],
    "quick_meal": ["quick"],
    "gluten_free": ["gluten-free"],
    "dairy_free": ["dairy-free"],
  };

  // Toggle tag filter
  const toggleTag = (tag: string) => {
    if (activeTag === tag) {
      setActiveTag(null);
    } else {
      setActiveTag(tag);
    }
  };

  // Фильтрация рецептов по активной вкладке, тегу и поисковому запросу
  const filteredRecipes = recipes.filter(recipe => {
    const matchesTab = activeTab === "all" || recipe.category === activeTab;
    
    const matchesTag = !activeTag || 
      (tagsMappings[activeTag] && 
      tagsMappings[activeTag].some(mappedTag => recipe.tags.includes(mappedTag)));
    
    const matchesSearch = !searchQuery || 
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTab && matchesTag && matchesSearch;
  });

  // Функция для открытия рецепта
  const openRecipeDetail = (recipe: any) => {
    setSelectedRecipe(recipe);
    setIsRecipeDetailOpen(true);
  };

  // Функция для перехода на страницу калькулятора рецептов
  const goToRecipeCalculator = () => {
    navigate("/recipe-calculator");
  };
  
  // Обработка поиска через компонент FoodSearch
  const handleFoodSelection = (food: any) => {
    setSearchQuery(food.name);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 mb-6">
        <h1 className="text-3xl font-bold">{translate("recipes")}</h1>
        
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9 w-full md:w-[300px]" 
              placeholder={translate("search_recipes")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button onClick={goToRecipeCalculator} className="gap-2">
            <UtensilsIcon className="h-4 w-4" />
            {translate("recipe_calculator")}
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">{translate("all_recipes")}</TabsTrigger>
            <TabsTrigger value="breakfast">{translate("breakfast")}</TabsTrigger>
            <TabsTrigger value="lunch">{translate("lunch")}</TabsTrigger>
            <TabsTrigger value="dinner">{translate("dinner")}</TabsTrigger>
            <TabsTrigger value="snack">{translate("snack")}</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge 
              variant={activeTag === "vegetarian" ? "default" : "outline"} 
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => toggleTag("vegetarian")}
            >
              {translate("vegetarian")}
            </Badge>
            <Badge 
              variant={activeTag === "high_protein" ? "default" : "outline"} 
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => toggleTag("high_protein")}
            >
              {translate("high_protein")}
            </Badge>
            <Badge 
              variant={activeTag === "low_carb" ? "default" : "outline"} 
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => toggleTag("low_carb")}
            >
              {translate("low_carb")}
            </Badge>
            <Badge 
              variant={activeTag === "quick_meal" ? "default" : "outline"} 
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => toggleTag("quick_meal")}
            >
              {translate("quick_meal")}
            </Badge>
            <Badge 
              variant={activeTag === "gluten_free" ? "default" : "outline"} 
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => toggleTag("gluten_free")}
            >
              {translate("gluten_free")}
            </Badge>
            <Badge 
              variant={activeTag === "dairy_free" ? "default" : "outline"} 
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => toggleTag("dairy_free")}
            >
              {translate("dairy_free")}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{recipe.name}</CardTitle>
                    <HeartIcon className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-red-500 transition-colors" />
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground gap-4 mt-2">
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {recipe.prepTime} {translate("min")}
                    </div>
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 mr-1 text-yellow-500" />
                      {recipe.rating} ({recipe.reviews})
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center p-2 bg-muted/50 rounded-md">
                      <div className="text-sm font-medium">{recipe.calories}</div>
                      <div className="text-xs text-muted-foreground">{translate("kcal")}</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded-md">
                      <div className="text-sm font-medium">{recipe.protein}g</div>
                      <div className="text-xs text-muted-foreground">{translate("protein")}</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded-md">
                      <div className="text-sm font-medium">{recipe.carbs}g</div>
                      <div className="text-xs text-muted-foreground">{translate("carbs")}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    variant="secondary" 
                    className="w-full gap-2"
                    onClick={() => openRecipeDetail(recipe)}
                  >
                    {translate("view_recipe")}
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Tabs>
      </div>
      
      <RecipeDetail 
        recipe={selectedRecipe}
        isOpen={isRecipeDetailOpen}
        onClose={() => setIsRecipeDetailOpen(false)}
      />
    </div>
  );
}
