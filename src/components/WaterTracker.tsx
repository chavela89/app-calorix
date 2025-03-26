
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, Droplet } from "lucide-react";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WaterTrackerProps {
  current: number;
  goal: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function WaterTracker({ current, goal, onAdd, onRemove }: WaterTrackerProps) {
  const percentage = Math.min((current / goal) * 100, 100);
  const formattedPercentage = Math.round(percentage);

  return (
    <Card className="p-0 border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Droplet className="h-5 w-5 text-blue-500" />
          <span>Водный баланс</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="opacity-10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--blue-500))"
                strokeWidth="6"
                strokeDasharray={`${percentage * 2.83} 283`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                className="text-blue-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{current}</span>
              <span className="text-sm text-muted-foreground">мл</span>
              <span className="text-sm text-blue-500 mt-1">{formattedPercentage}%</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="text-center md:text-left">
              <div className="text-muted-foreground">Цель: {goal} мл</div>
            </div>
            
            <div className="flex gap-2 justify-center md:justify-start">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={onRemove} 
                disabled={current <= 0}
                className="h-10 px-4"
              >
                <MinusIcon className="h-4 w-4 mr-2" /> 250 мл
              </Button>
              <Button 
                variant="default" 
                size="lg" 
                onClick={onAdd}
                className="h-10 px-4 bg-blue-500 hover:bg-blue-600"
              >
                <PlusIcon className="h-4 w-4 mr-2" /> 250 мл
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
