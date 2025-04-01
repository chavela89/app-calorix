
import { MacroProgressBar } from "./ui/MacroProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "@/context/LanguageContextFixed";
import { Button } from "./ui/button";
import { BarChart2Icon } from "lucide-react";

interface MacrosSummaryProps {
  proteins: { current: number; goal: number };
  fats: { current: number; goal: number };
  carbs: { current: number; goal: number };
}

export function MacrosSummary({ proteins, fats, carbs }: MacrosSummaryProps) {
  const { translate } = useLanguage();

  return (
    <div className="space-y-4 w-full">
      <MacroProgressBar
        title={translate("protein")}
        current={proteins.current}
        goal={proteins.goal}
        color="bg-blue-500"
      />
      <MacroProgressBar
        title={translate("carbs")}
        current={carbs.current}
        goal={carbs.goal}
        color="bg-green-500"
      />
      <MacroProgressBar
        title={translate("fat")}
        current={fats.current}
        goal={fats.goal}
        color="bg-amber-500"
      />
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p className="mb-1">{translate("recommended_macros_balance")}:</p>
        <ul className="list-disc pl-5">
          <li>{translate("protein")}: 10-35% {translate("calories")}</li>
          <li>{translate("carbs")}: 45-65% {translate("calories")}</li>
          <li>{translate("fat")}: 20-35% {translate("calories")}</li>
        </ul>
      </div>

      <Button variant="outline" size="sm" className="mt-4 w-full flex items-center justify-center gap-2">
        <BarChart2Icon className="h-4 w-4" />
        <span>{translate("nutrition_analysis")}</span>
      </Button>
    </div>
  );
}
