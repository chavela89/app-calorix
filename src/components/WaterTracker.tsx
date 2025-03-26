
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Progress } from "./ui/progress";

interface WaterTrackerProps {
  current: number;
  goal: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function WaterTracker({ current, goal, onAdd, onRemove }: WaterTrackerProps) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="p-4 rounded-lg border bg-card">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Водный баланс</h3>
        <div className="text-sm text-muted-foreground">
          {current} / {goal} мл
        </div>
      </div>
      <Progress value={percentage} className="h-2 mb-3" indicatorClassName="bg-blue-500" />
      <div className="flex gap-2 justify-end">
        <Button variant="outline" size="icon" onClick={onRemove} disabled={current <= 0}>
          <MinusIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onAdd}>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
