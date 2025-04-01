
import { ProgressCircle } from "./ui/ProgressCircle";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { BarChart2Icon, InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/context/LanguageContextFixed";
import { useNavigate } from "react-router-dom";

interface CaloriesSummaryProps {
  consumed: number;
  goal: number;
  className?: string;
  burnedCalories?: number;
}

export function CaloriesSummary({ 
  consumed, 
  goal, 
  className,
  burnedCalories = 0
}: CaloriesSummaryProps) {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  
  const percentage = Math.min((consumed / goal) * 100, 100);
  const remaining = Math.max(goal - consumed, 0);
  const netCalories = consumed - burnedCalories;

  const handleAnalyticsClick = () => {
    navigate("/analytics");
  };

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
            <div className="text-sm text-muted-foreground">{translate("consumed")}</div>
          </div>
        </ProgressCircle>
        
        <div className="absolute top-0 right-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <InfoIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{translate("your_daily_goal")}: {goal} {translate("kcal")}</p>
                <p className="mt-1">{translate("these_calories_for")} {goal > 2000 ? translate("maintaining_weight") : translate("losing_weight")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 w-full mt-4 text-center">
        <div>
          <div className="text-sm font-medium">{Math.round(remaining)}</div>
          <div className="text-xs text-muted-foreground">{translate("remaining")}</div>
        </div>
        
        <div>
          <div className="text-sm font-medium">{goal}</div>
          <div className="text-xs text-muted-foreground">{translate("goal")}</div>
        </div>
        
        <div>
          <div className="text-sm font-medium">{burnedCalories}</div>
          <div className="text-xs text-muted-foreground">{translate("burned")}</div>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-4 w-full flex items-center justify-center gap-2"
        onClick={handleAnalyticsClick}
      >
        <BarChart2Icon className="h-4 w-4" />
        <span>{translate("nutrition_analysis")}</span>
      </Button>
    </div>
  );
}
