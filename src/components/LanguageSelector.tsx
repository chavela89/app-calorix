
import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, useEnhancedLanguage } from "@/context/LanguageContextFixed";
import { GlobeIcon } from "lucide-react";

export const LanguageSelector = memo(() => {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const { isEnglish } = useEnhancedLanguage();
  
  // Оптимизированный обработчик переключения языка
  const handleLanguageChange = (langCode: string) => {
    // Предотвращаем переключение на тот же язык
    if (language === langCode) return;
    
    // Устанавливаем новый язык
    setLanguage(langCode as "ru" | "en");
    
    // Устанавливаем атрибуты документа
    document.documentElement.lang = langCode;
  };

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
});

LanguageSelector.displayName = "LanguageSelector";
