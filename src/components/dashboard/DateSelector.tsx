
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { ru } from "date-fns/locale";

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (days: number) => void;
}

export function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
  const { translate, language } = useLanguage();
  const [popoverOpen, setPopoverOpen] = useState(false);
  
  // Используем локализацию date-fns в зависимости от текущего языка
  const dateLocale = language === 'ru' ? ru : undefined;
  
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };
  
  const formatDate = (date: Date) => {
    // Форматируем дату в зависимости от локализации
    if (isToday(date)) {
      return translate("today");
    }
    
    return format(date, 'PPP', { locale: dateLocale });
  };
  
  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      const today = new Date();
      const diffTime = date.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      onDateChange(diffDays);
      setPopoverOpen(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onDateChange(-1)}
        title={translate("previous_day")}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="min-w-[150px]">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDate(selectedDate)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelectDate}
            initialFocus
            locale={dateLocale}
          />
        </PopoverContent>
      </Popover>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onDateChange(1)}
        title={translate("next_day")}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
