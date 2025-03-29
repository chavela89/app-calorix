
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, useEnhancedLanguage } from "@/context/LanguageContextFixed";
import { GlobeIcon } from "lucide-react";
import { useEffect } from "react";

export function LanguageSelector() {
  const { language, setLanguage, availableLanguages, translate, refreshTranslations } = useLanguage();
  const { isEnglish } = useEnhancedLanguage();
  
  // Ensure translations are refreshed when language changes
  useEffect(() => {
    refreshTranslations();
  }, [language, refreshTranslations]);

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as "ru" | "en");
    // Force reload to apply all translations
    window.location.reload();
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
}
