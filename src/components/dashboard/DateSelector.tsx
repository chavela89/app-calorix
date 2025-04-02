
import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useLanguage } from "@/context/LanguageContextFixed";

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (days: number) => void;
}

export function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
  const { translate } = useLanguage();
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="icon" 
        className="h-8 w-8"
        onClick={() => onDateChange(-1)}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <Button variant="outline" className="flex items-center gap-2 h-8 px-3">
        <CalendarIcon className="h-4 w-4" />
        <span className="text-sm">
          {isToday 
            ? translate("today") 
            : format(selectedDate, "EEEE, d MMMM", { locale: ru })}
        </span>
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        className="h-8 w-8"
        onClick={() => onDateChange(1)}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
