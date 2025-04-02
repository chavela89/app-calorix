
import React from "react";
import { CaloriesSummary } from "@/components/CaloriesSummary";
import { MacrosSummary } from "@/components/MacrosSummary";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContextFixed";

interface NutritionSummaryProps {
  calorieData: {
    consumed: number;
    goal: number;
    burnedCalories: number;
  };
  macroData: {
    proteins: { current: number; goal: number };
    fats: { current: number; goal: number };
    carbs: { current: number; goal: number };
  };
}

export function NutritionSummary({ calorieData, macroData }: NutritionSummaryProps) {
  const { translate } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="p-6 col-span-1 lg:col-span-1">
        <CaloriesSummary 
          consumed={calorieData.consumed} 
          goal={calorieData.goal}
          burnedCalories={calorieData.burnedCalories} 
        />
      </Card>
      
      <Card className="p-6 col-span-1 lg:col-span-2">
        <h2 className="text-lg font-semibold mb-4">{translate("macronutrients")}</h2>
        <MacrosSummary
          proteins={macroData.proteins}
          fats={macroData.fats}
          carbs={macroData.carbs}
        />
      </Card>
    </div>
  );
}
