
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Define types for translation
type TranslationKey = string;
type Translation = Record<TranslationKey, string>;
type Language = "ru" | "en";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: TranslationKey, variables?: Record<string, string | number>) => string;
  availableLanguages: { code: Language; label: string }[];
}

// Russian translations
const ruTranslations: Translation = {
  // Common
  app_name: "CaloriX",
  settings: "Настройки",
  save: "Сохранить",
  cancel: "Отмена",
  delete: "Удалить",
  edit: "Редактировать",
  add: "Добавить",
  search: "Поиск",
  loading: "Загрузка...",
  no_results: "Нет результатов",
  profile: "Профиль",
  logout: "Выйти",
  login: "Войти",
  register: "Регистрация",
  welcome: "Добро пожаловать",
  error: "Ошибка",
  success: "Успешно",
  
  // Navigation
  home: "Главная",
  diary: "Дневник",
  analytics: "Аналитика",
  planner: "Планировщик",
  recipes: "Рецепты",
  progress: "Прогресс",
  community: "Сообщество",
  dashboard: "Панель управления",
  premium: "Премиум",
  
  // Food Diary
  breakfast: "Завтрак",
  lunch: "Обед",
  dinner: "Ужин",
  snack: "Перекус",
  water: "Вода",
  add_food: "Добавить продукт",
  calories: "Калории",
  protein: "Белки",
  fat: "Жиры",
  carbs: "Углеводы",
  water_goal: "Цель по воде",
  calorie_goal: "Цель по калориям",
  macros_goal: "Цель по макронутриентам",
  
  // Macros and analytics
  macronutrients: "Макронутриенты",
  water_balance: "Водный баланс",
  nutrition_analysis: "Анализ питания",
  
  // Recipe terms
  ingredients: "Ингредиенты",
  instructions: "Инструкции",
  prep_time: "Время подготовки",
  cook_time: "Время приготовления",
  servings: "Порции",
  difficulty: "Сложность", 
  cuisine: "Кухня",
  recipe_calculator: "Калькулятор рецептов",
  calculate_recipe: "Рассчитать рецепт",
  add_ingredient: "Добавить ингредиент",
  amount: "Количество",
  unit: "Единица измерения",
  recipe_name: "Название рецепта",
  
  // Food items
  chicken_breast: "Куриная грудка",
  buckwheat: "Гречка",
  cottage_cheese: "Творог 5%",
  apple: "Яблоко",
  
  // Settings
  account_settings: "Настройки аккаунта",
  personal_info: "Личная информация",
  change_password: "Изменить пароль",
  notification_settings: "Настройки уведомлений",
  privacy_settings: "Настройки приватности",
  app_settings: "Настройки приложения",
  theme: "Тема",
  language: "Язык",
  data_export: "Экспорт данных",
  data_import: "Импорт данных",
  
  // Privacy settings
  profile_visibility: "Видимость профиля",
  profile_visibility_description: "Настройки отображения вашего профиля для других пользователей",
  data_collection: "Сбор данных",
  data_collection_description: "Управление сбором данных о вашей активности для улучшения сервиса",
  third_party_sharing: "Передача данных третьим лицам",
  third_party_sharing_description: "Контроль над тем, какие данные могут быть доступны нашим партнерам",
  
  // Premium features
  premium_features: "Премиум функции",
  go_premium: "Перейти на премиум",
  restore_purchase: "Восстановить покупку",
  subscription: "Подписка",
  monthly: "Ежемесячно",
  yearly: "Ежегодно",
  lifetime: "Пожизненно",
  free_trial: "Бесплатный период",
  
  // Community
  feed: "Лента",
  friends: "Друзья",
  groups: "Группы",
  challenges: "Челленджи",
  events: "События",
  follow: "Подписаться",
  unfollow: "Отписаться",
  like: "Нравится",
  comment: "Комментировать",
  share: "Поделиться",
  
  // Progress
  weight: "Вес",
  height: "Рост",
  bmi: "ИМТ",
  body_fat: "Процент жира",
  muscle_mass: "Мышечная масса",
  measurements: "Измерения",
  
  // Progress achievement/habits
  achievements: "Достижения",
  habits: "Привычки",
  drink_water: "Пить 8 стаканов воды",
  eat_veggies: "Есть овощи с каждым приемом пищи",
  protein_meals: "Белок в каждый прием пищи",
  no_late_eating: "Не есть после 19:00",
  cook_at_home: "Готовить дома",
  
  // Units
  g: "г",
  ml: "мл",
  pcs: "шт",
  tbsp: "стл",
  tsp: "ч.л",
  kcal: "ккал",
  goal: "Цель",
  
  // Additional
  nutrition_goals: "Цели по питанию",
  appearance: "Внешний вид",
  data_management: "Управление данными",
};

// English translations
const enTranslations: Translation = {
  // Common
  app_name: "CaloriX",
  settings: "Settings",
  save: "Save",
  cancel: "Cancel",
  delete: "Delete",
  edit: "Edit",
  add: "Add",
  search: "Search",
  loading: "Loading...",
  no_results: "No results",
  profile: "Profile",
  logout: "Logout",
  login: "Login",
  register: "Register",
  welcome: "Welcome",
  error: "Error",
  success: "Success",
  
  // Navigation
  home: "Home",
  diary: "Diary",
  analytics: "Analytics",
  planner: "Planner",
  recipes: "Recipes",
  progress: "Progress",
  community: "Community",
  dashboard: "Dashboard",
  premium: "Premium",
  
  // Food Diary
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
  water: "Water",
  add_food: "Add Food",
  calories: "Calories",
  protein: "Protein",
  fat: "Fat",
  carbs: "Carbs",
  water_goal: "Water Goal",
  calorie_goal: "Calorie Goal",
  macros_goal: "Macros Goal",
  
  // Macros and analytics
  macronutrients: "Macronutrients",
  water_balance: "Water balance",
  nutrition_analysis: "Nutrition Analysis",
  
  // Recipe terms
  ingredients: "Ingredients",
  instructions: "Instructions",
  prep_time: "Prep Time",
  cook_time: "Cook Time",
  servings: "Servings",
  difficulty: "Difficulty",
  cuisine: "Cuisine",
  recipe_calculator: "Recipe Calculator",
  calculate_recipe: "Calculate Recipe",
  add_ingredient: "Add Ingredient",
  amount: "Amount",
  unit: "Unit",
  recipe_name: "Recipe Name",
  
  // Food items
  chicken_breast: "Chicken breast",
  buckwheat: "Buckwheat",
  cottage_cheese: "Cottage cheese 5%",
  apple: "Apple",
  
  // Settings
  account_settings: "Account Settings",
  personal_info: "Personal Information",
  change_password: "Change Password",
  notification_settings: "Notification Settings",
  privacy_settings: "Privacy Settings",
  app_settings: "App Settings",
  theme: "Theme",
  language: "Language",
  data_export: "Export Data",
  data_import: "Import Data",
  
  // Privacy settings
  profile_visibility: "Profile Visibility",
  profile_visibility_description: "Control how your profile appears to other users",
  data_collection: "Data Collection",
  data_collection_description: "Manage how we collect data about your activity to improve service",
  third_party_sharing: "Third Party Sharing",
  third_party_sharing_description: "Control what data can be accessed by our partners",
  
  // Premium features
  premium_features: "Premium Features",
  go_premium: "Go Premium",
  restore_purchase: "Restore Purchase",
  subscription: "Subscription",
  monthly: "Monthly",
  yearly: "Yearly",
  lifetime: "Lifetime",
  free_trial: "Free Trial",
  
  // Community
  feed: "Feed",
  friends: "Friends",
  groups: "Groups",
  challenges: "Challenges",
  events: "Events",
  follow: "Follow",
  unfollow: "Unfollow",
  like: "Like",
  comment: "Comment",
  share: "Share",
  
  // Progress
  weight: "Weight",
  height: "Height",
  bmi: "BMI",
  body_fat: "Body Fat Percentage",
  muscle_mass: "Muscle Mass",
  measurements: "Measurements",
  
  // Progress achievement/habits
  achievements: "Achievements",
  habits: "Habits",
  drink_water: "Drink 8 glasses of water",
  eat_veggies: "Eat vegetables with every meal",
  protein_meals: "Protein in every meal",
  no_late_eating: "Don't eat after 7:00 PM",
  cook_at_home: "Cook at home",
  
  // Units
  g: "g",
  ml: "ml",
  pcs: "pcs",
  tbsp: "tbsp",
  tsp: "tsp",
  kcal: "kcal",
  goal: "Goal",
  
  // Additional
  nutrition_goals: "Nutrition Goals",
  appearance: "Appearance",
  data_management: "Data Management",
};

// Create language context
const LanguageContext = createContext<LanguageContextProps>({
  language: "ru",
  setLanguage: () => {},
  translate: () => "",
  availableLanguages: [
    { code: "ru", label: "Русский" },
    { code: "en", label: "English" }
  ]
});

// Create provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Get default browser language
  const getBrowserLanguage = (): Language => {
    const navigatorLanguage = navigator.language.split("-")[0];
    return navigatorLanguage === "en" ? "en" : "ru";
  };

  // Get saved language from localStorage or use browser language
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as Language) || getBrowserLanguage();
  });

  // Available languages
  const availableLanguages = [
    { code: "ru" as Language, label: "Русский" },
    { code: "en" as Language, label: "English" }
  ];

  // Set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  // Get translation by key
  const translate = (key: TranslationKey, variables?: Record<string, string | number>): string => {
    const translations = language === "ru" ? ruTranslations : enTranslations;
    let translation = translations[key] || key;
    
    // Replace variables in translation if provided
    if (variables) {
      Object.entries(variables).forEach(([varName, varValue]) => {
        translation = translation.replace(`{${varName}}`, String(varValue));
      });
    }
    
    return translation;
  };

  // Save language on change
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using language context
export const useLanguage = () => useContext(LanguageContext);

// Enhanced language functionality
interface EnhancedLanguageContextProps {
  isEnglish: boolean;
  currentLanguage: string;
  translateMacro: (key: string) => string;
  translateCost: (amount: number) => string;
  translateUnit: (unit: string) => string;
}

// Create enhanced language context
const EnhancedLanguageContext = createContext<EnhancedLanguageContextProps>({
  isEnglish: false,
  currentLanguage: "ru",
  translateMacro: (key) => key,
  translateCost: (amount) => `${amount} ₽`,
  translateUnit: (unit) => unit
});

// Hook for using enhanced language features
export const useEnhancedLanguage = () => useContext(EnhancedLanguageContext);

// Enhanced language wrapper
export function EnhancedLanguageProvider({ children }: { children: ReactNode }) {
  const { language, translate } = useLanguage();
  const isEnglish = language === "en";
  
  // Additional translations for items not covered in main translations
  const macroTranslations: Record<string, Record<string, string>> = {
    en: {
      "Белки": "Proteins",
      "Жиры": "Fats",
      "Углеводы": "Carbs",
      "Макронутриенты": "Macronutrients",
      "Водный баланс": "Water balance",
      "Анализ питания": "Nutrition Analysis",
      "Пить 8 стаканов воды": "Drink 8 glasses of water",
      "Есть овощи с каждым приемом пищи": "Eat vegetables with every meal",
      "Белок в каждый прием пищи": "Protein in every meal",
      "Не есть после 19:00": "Don't eat after 7:00 PM",
      "Готовить дома": "Cook at home",
      "Рис бурый": "Brown rice",
      "г": "g",
      "мл": "ml",
      "шт": "pcs",
      "стл": "tbsp",
      "ч.л": "tsp",
      "ккал": "kcal",
      "Цель": "Goal",
      "Достижения": "Achievements",
      "Привычки": "Habits"
    },
    ru: {
      "Proteins": "Белки",
      "Fats": "Жиры",
      "Carbs": "Углеводы",
      "Macronutrients": "Макронутриенты",
      "Water balance": "Водный баланс",
      "Nutrition Analysis": "Анализ питания",
      "Drink 8 glasses of water": "Пить 8 стаканов воды",
      "Eat vegetables with every meal": "Есть овощи с каждым приемом пищи",
      "Protein in every meal": "Белок в каждый прием пищи",
      "Don't eat after 7:00 PM": "Не есть после 19:00",
      "Cook at home": "Готовить дома",
      "Brown rice": "Рис бурый",
      "g": "г", 
      "ml": "мл",
      "pcs": "шт",
      "tbsp": "стл",
      "tsp": "ч.л",
      "kcal": "ккал",
      "Goal": "Цель",
      "Achievements": "Достижения",
      "Habits": "Привычки"
    }
  };
  
  // Function to translate macronutrients and other special terms
  const translateMacro = (key: string): string => {
    if (isEnglish && macroTranslations.en[key]) {
      return macroTranslations.en[key];
    }
    if (!isEnglish && macroTranslations.ru[key]) {
      return macroTranslations.ru[key];
    }
    
    // Try using the standard translation if available
    const translationKey = key.toLowerCase().replace(/\s+/g, '_');
    const standardTranslation = translate(translationKey);
    if (standardTranslation !== translationKey) {
      return standardTranslation;
    }
    
    return key;
  };
  
  // Function to format costs with proper currency symbol
  const translateCost = (amount: number): string => {
    if (isEnglish) {
      return `$${amount.toFixed(1)}`;
    }
    return `${amount.toFixed(1)} ₽`;
  };
  
  // Function to translate measurement units
  const translateUnit = (unit: string): string => {
    return translateMacro(unit);
  };
  
  return (
    <EnhancedLanguageContext.Provider 
      value={{ 
        isEnglish, 
        currentLanguage: language, 
        translateMacro, 
        translateCost,
        translateUnit
      }}
    >
      {children}
    </EnhancedLanguageContext.Provider>
  );
}
