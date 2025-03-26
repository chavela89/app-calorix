
import { ProgressCircle } from "./ui/ProgressCircle";

interface CaloriesSummaryProps {
  consumed: number;
  goal: number;
}

export function CaloriesSummary({ consumed, goal }: CaloriesSummaryProps) {
  const percentage = Math.min((consumed / goal) * 100, 100);
  const remaining = Math.max(goal - consumed, 0);

  return (
    <ProgressCircle percentage={percentage}>
      <div className="text-center">
        <div className="text-3xl font-bold">{Math.round(consumed)}</div>
        <div className="text-sm text-muted-foreground">потреблено</div>
        <div className="text-sm text-muted-foreground mt-1">
          Осталось: {Math.round(remaining)} ккал
        </div>
      </div>
    </ProgressCircle>
  );
}
