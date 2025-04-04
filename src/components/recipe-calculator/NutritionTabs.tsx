
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContextFixed";

interface NutritionTabsProps {
  activeTab: "per_serving" | "per_100g";
  setActiveTab: (value: "per_serving" | "per_100g") => void;
  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}

export function NutritionTabs({
  activeTab,
  setActiveTab,
  nutrition
}: NutritionTabsProps) {
  const { translate, language } = useLanguage();

  return (
    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "per_serving" | "per_100g")}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="per_serving">{translate("per_serving")}</TabsTrigger>
        <TabsTrigger value="per_100g">{translate("per_100g")}</TabsTrigger>
      </TabsList>
      <TabsContent value="per_serving" className="pt-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>{translate("calories")}:</span>
            <span className="font-medium">{Math.round(nutrition.calories)} {translate("kcal")}</span>
          </div>
          <div className="flex justify-between">
            <span>{translate("protein")}:</span>
            <span className="font-medium">{nutrition.protein.toFixed(1)}г</span>
          </div>
          <div className="flex justify-between">
            <span>{translate("fat")}:</span>
            <span className="font-medium">{nutrition.fat.toFixed(1)}г</span>
          </div>
          <div className="flex justify-between">
            <span>{translate("carbs")}:</span>
            <span className="font-medium">{nutrition.carbs.toFixed(1)}г</span>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="per_100g" className="pt-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>{translate("calories")}:</span>
            <span className="font-medium">{Math.round(nutrition.calories)} {translate("kcal")}</span>
          </div>
          <div className="flex justify-between">
            <span>{translate("protein")}:</span>
            <span className="font-medium">{nutrition.protein.toFixed(1)}г</span>
          </div>
          <div className="flex justify-between">
            <span>{translate("fat")}:</span>
            <span className="font-medium">{nutrition.fat.toFixed(1)}г</span>
          </div>
          <div className="flex justify-between">
            <span>{translate("carbs")}:</span>
            <span className="font-medium">{nutrition.carbs.toFixed(1)}г</span>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
