
import { Badge } from "@/components/ui/badge";
import { ProgressCircle } from "@/components/ui/ProgressCircle";
import { useLanguage } from "@/context/LanguageContextFixed";

interface MacroNutritionDisplayProps {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export function MacroNutritionDisplay({ 
  calories, 
  protein, 
  fat, 
  carbs 
}: MacroNutritionDisplayProps) {
  const { translate, language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-4">
        <ProgressCircle 
          percentage={100} 
          size={160} 
          strokeWidth={15} 
          color="hsl(24, 100%, 50%)"
          className="mb-2"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{Math.round(calories)}</span>
            <span className="text-sm text-muted-foreground">{translate("kcal")}</span>
          </div>
        </ProgressCircle>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <div className="flex flex-col items-center">
          <Badge className="bg-blue-500 hover:bg-blue-600 mb-1">{translate("protein")}</Badge>
          <p className="text-2xl font-bold">{protein.toFixed(1)}г</p>
        </div>
        <div className="flex flex-col items-center">
          <Badge className="bg-yellow-500 hover:bg-yellow-600 mb-1">{translate("fat")}</Badge>
          <p className="text-2xl font-bold">{fat.toFixed(1)}г</p>
        </div>
        <div className="flex flex-col items-center">
          <Badge className="bg-green-500 hover:bg-green-600 mb-1">{translate("carbs")}</Badge>
          <p className="text-2xl font-bold">{carbs.toFixed(1)}г</p>
        </div>
      </div>
    </div>
  );
}
