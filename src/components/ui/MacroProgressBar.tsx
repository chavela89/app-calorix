
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface MacroProgressBarProps {
  title: string;
  current: number;
  goal: number;
  color: string;
  unit?: string;
  className?: string;
}

export function MacroProgressBar({
  title,
  current,
  goal,
  color,
  unit = "г",
  className,
}: MacroProgressBarProps) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm">
        <span className="font-medium">{title}</span>
        <span className="text-muted-foreground">
          {current.toFixed(1)} / {goal.toFixed(1)} {unit}
        </span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2" 
        indicatorClassName={cn("transition-all", color)}
      />
    </div>
  );
}
