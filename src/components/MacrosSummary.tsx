
import { MacroProgressBar } from "./ui/MacroProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface MacrosSummaryProps {
  proteins: { current: number; goal: number };
  fats: { current: number; goal: number };
  carbs: { current: number; goal: number };
}

export function MacrosSummary({ proteins, fats, carbs }: MacrosSummaryProps) {
  return (
    <div className="space-y-4 w-full">
      <MacroProgressBar
        title="Белки"
        current={proteins.current}
        goal={proteins.goal}
        color="bg-blue-500"
      />
      <MacroProgressBar
        title="Углеводы"
        current={carbs.current}
        goal={carbs.goal}
        color="bg-green-500"
      />
      <MacroProgressBar
        title="Жиры"
        current={fats.current}
        goal={fats.goal}
        color="bg-amber-500"
      />
    </div>
  );
}
