
import { ProgressCircle } from "./ui/ProgressCircle";
import { cn } from "@/lib/utils";

interface CaloriesSummaryProps {
  consumed: number;
  goal: number;
  className?: string;
}

export function CaloriesSummary({ consumed, goal, className }: CaloriesSummaryProps) {
  const percentage = Math.min((consumed / goal) * 100, 100);
  const remaining = Math.max(goal - consumed, 0);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative">
        <ProgressCircle 
          percentage={percentage} 
          size={200} 
          strokeWidth={15}
          color="hsl(24, 100%, 50%)"
        >
          <div className="text-center">
            <div className="text-4xl font-bold">{Math.round(consumed)}</div>
            <div className="text-sm text-muted-foreground">потреблено</div>
          </div>
        </ProgressCircle>
        <div className="text-sm text-muted-foreground text-center mt-2">
          Осталось: {Math.round(remaining)} ккал
        </div>
      </div>
      <div className="w-full text-center mt-2">
        <div className="text-sm text-muted-foreground">Цель: {goal} ккал</div>
      </div>
    </div>
  );
}
