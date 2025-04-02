
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, useEnhancedLanguage } from "@/context/LanguageContext";
import { GlobeIcon } from "lucide-react";
import { useCallback } from "react";

export function LanguageSelector() {
  const { language, setLanguage, availableLanguages, translate } = useLanguage();
  const { isEnglish } = useEnhancedLanguage();
  
  // Мемоизируем обработчик смены языка для лучшей производительности
  const handleLanguageChange = useCallback((langCode: string) => {
    // Предотвращаем повторную установку того же языка
    if (language === langCode) return;
    
    // Устанавливаем новый язык
    setLanguage(langCode as "ru" | "en");
    
    // Сразу выполняем ключевые действия для ускорения обновления интерфейса
    document.documentElement.lang = langCode;
    document.documentElement.dir = 'ltr';
  }, [setLanguage, language]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <GlobeIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{isEnglish ? "Change language" : "Сменить язык"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center gap-2 ${language === lang.code ? "font-medium" : ""}`}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
