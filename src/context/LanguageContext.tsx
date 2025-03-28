
import React, { createContext, useContext, useState, useEffect } from "react";

// Типы языков
export type LanguageId = "ru" | "en" | "es" | "fr" | "de" | "pt" | "zh" | "ja" | "ko" | "tr" | "it";

// Тип для информации о языке
interface Language {
  id: LanguageId;
  name: string;
  code: string;
}

// Тип для контекста языка
interface LanguageContextType {
  currentLanguage: LanguageId;
  languages: Language[];
  setLanguage: (id: LanguageId) => void;
  translate: (key: string) => string;
}

// Создаем контекст
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Список доступных языков
const availableLanguages: Language[] = [
  { id: "ru", name: "Русский", code: "ru-RU" },
  { id: "en", name: "English", code: "en-US" },
  { id: "es", name: "Español", code: "es-ES" },
  { id: "fr", name: "Français", code: "fr-FR" },
  { id: "de", name: "Deutsch", code: "de-DE" },
  { id: "pt", name: "Português", code: "pt-BR" },
  { id: "zh", name: "中文", code: "zh-CN" },
  { id: "ja", name: "日本語", code: "ja-JP" },
  { id: "ko", name: "한국어", code: "ko-KR" },
  { id: "tr", name: "Türkçe", code: "tr-TR" },
  { id: "it", name: "Italiano", code: "it-IT" },
];

// Переводы для различных языков
const translations: Record<LanguageId, Record<string, string>> = {
  ru: {
    // Навигация
    dashboard: "Дашборд",
    analytics: "Аналитика",
    planner: "Планировщик",
    recipes: "Рецепты",
    recipe_calculator: "Калькулятор рецептов",
    progress: "Прогресс",
    community: "Сообщество",
    
    // Главное меню
    nutrition_diary: "Дневник питания",
    calories: "Калории",
    protein: "Белки",
    fat: "Жиры",
    carbs: "Углеводы",
    water: "Вода",
    water_goal: "Цель по воде",
    meals: "Приемы пищи",
    breakfast: "Завтрак",
    lunch: "Обед",
    dinner: "Ужин",
    snack: "Перекус",
    recently_added: "Недавно добавленные",
    
    // Продукты и питание
    add_food: "Добавить продукт",
    search_food: "Найти продукт",
    add_water: "Добавить воду",
    add_meal: "Добавить прием пищи",
    food_name: "Название продукта",
    portion: "Порция",
    gram: "грамм",
    ml: "мл",
    total: "Всего",
    remaining: "Осталось",
    consumed: "Потреблено",
    burned: "Сожжено",
    add_to_diary: "Добавить в дневник",
    add_to_favorites: "Добавить в избранное",
    save: "Сохранить",
    cancel: "Отмена",
    
    // Аналитика
    calorie_consumption: "Потребление калорий",
    macronutrients: "Макронутриенты",
    meal_distribution: "Распределение по приемам пищи",
    top_foods: "Топ продуктов",
    calories_burned: "Сожженные калории",
    goals_comparison: "Сравнение с целями",
    weekly: "Еженедельно",
    monthly: "Ежемесячно",
    yearly: "Ежегодно",
    day: "День",
    week: "Неделя",
    month: "Месяц",
    year: "Год",
    below_goal: "ниже цели",
    above_goal: "выше цели",
    target: "Цель",
    
    // Планировщик
    meal_planner: "Планировщик питания",
    daily_nutrition: "Дневное питание",
    shopping_list: "Список покупок",
    select_template: "Выбрать шаблон",
    planned: "Запланировано",
    save_list: "Сохранить список",
    add_item: "Добавить",
    items: "элементов",
    
    // Прогресс
    current_weight: "Текущий вес",
    target_weight: "Целевой вес",
    streak: "Серия",
    streak_days: "Дни подряд",
    statistics: "Статистика",
    active_days: "Активных дней",
    tracked_calories: "Отслеженных калорий",
    weight_dynamics: "Динамика веса",
    weight: "Вес",
    start: "Старт",
    left: "Осталось",
    achievements: "Достижения",
    habits: "Привычки",
    view_all_achievements: "Все достижения",
    add_habit: "Добавить привычку",
    complete_all: "Завершить все",
    days: "дней",
    calorie_goals: "Цели по калориям",
    target_calories: "Целевые калории",
    actual_calories: "Фактические калории",
    nutrition: "Питание",
    goals_met: "Целей достигнуто",
    best: "Лучший",
    unlocked: "Разблокировано",
    
    // Рецепты и калькулятор
    recipe_name: "Название рецепта",
    cooking_time: "Время приготовления",
    minutes: "минут",
    portions: "Порции",
    ingredients: "Ингредиенты",
    add_ingredient: "Добавить ингредиент",
    preparation: "Приготовление",
    cooking_steps: "Шаги приготовления",
    add_step: "Добавить шаг",
    nutritional_value: "Пищевая ценность",
    per_portion: "на порцию",
    create_recipe: "Создать рецепт",
    popular_recipes: "Популярные рецепты",
    your_recipes: "Ваши рецепты",
    favorites: "Избранное",
    all_recipes: "Все рецепты",
    recipe_calculator: "Калькулятор рецептов",
    recipe_description: "Описание рецепта",
    
    // Сообщество
    feed: "Лента",
    challenges: "Челленджи",
    groups: "Группы",
    friends: "Друзья",
    search_community: "Поиск в сообществе",
    whats_on_your_mind: "Что у вас на уме?",
    add_photo: "Добавить фото",
    post: "Опубликовать",
    active: "Активный",
    completed: "Завершено",
    
    // Профиль и настройки
    profile: "Профиль",
    settings: "Настройки",
    edit_profile: "Редактировать профиль",
    personal_info: "Личная информация",
    name: "Имя",
    email: "Email",
    password: "Пароль",
    measurement_units: "Единицы измерения",
    metric_system: "Метрическая система",
    imperial_system: "Имперская система",
    save_changes: "Сохранить изменения",
    nutritional_goals: "Цели питания",
    calorie_goal: "Цель по калориям",
    protein_goal: "Цель по белкам",
    fat_goal: "Цель по жирам",
    carb_goal: "Цель по углеводам",
    save_goals: "Сохранить цели",
    appearance: "Внешний вид",
    theme: "Тема",
    theme_light: "Светлая",
    theme_dark: "Темная",
    theme_system: "Системная",
    language: "Язык",
    
    // Премиум
    premium: "Премиум",
    premium_features: "Возможности премиум",
    subscribe: "Подписаться",
    monthly: "Ежемесячно",
    annual: "Ежегодно",
    discount: "скидка",
    current_plan: "Текущий план",
    premium_member: "Премиум-пользователь",
    subscription_expires: "Подписка истекает",
    manage_subscription: "Управление подпиской",
    
    // Подписка
    get_premium: "Получить премиум",
    premium_benefits: "Преимущества премиум",
    benefit_1: "Расширенная аналитика и отчеты",
    benefit_2: "Без рекламы",
    benefit_3: "Полный доступ к базе рецептов",
    benefit_4: "Распознавание еды по фото",
    benefit_5: "Персонализированные планы питания",
    monthly_subscription: "Месячная подписка",
    annual_subscription: "Годовая подписка",
    per_month: "в месяц",
    per_year: "в год",
    save_percent: "Экономия",
    continue: "Продолжить",
    
    // Общие
    kcal: "ккал",
    g: "г",
    ml_unit: "мл",
    kg: "кг",
    cm: "см",
    ft: "фт",
    in: "дюйм",
    lb: "фунт",
    day_1: "Пн",
    day_2: "Вт",
    day_3: "Ср",
    day_4: "Чт",
    day_5: "Пт",
    day_6: "Сб",
    day_7: "Вс",
    notifications: "Уведомления",
    about: "О приложении",
    logout: "Выйти",
    terms: "Условия использования",
    privacy: "Политика конфиденциальности"
  },
  en: {
    // Navigation
    dashboard: "Dashboard",
    analytics: "Analytics",
    planner: "Planner",
    recipes: "Recipes",
    recipe_calculator: "Recipe Calculator",
    progress: "Progress",
    community: "Community",
    
    // Main menu
    nutrition_diary: "Nutrition Diary",
    calories: "Calories",
    protein: "Protein",
    fat: "Fat",
    carbs: "Carbs",
    water: "Water",
    water_goal: "Water Goal",
    meals: "Meals",
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    snack: "Snack",
    recently_added: "Recently Added",
    
    // Foods and nutrition
    add_food: "Add Food",
    search_food: "Search Food",
    add_water: "Add Water",
    add_meal: "Add Meal",
    food_name: "Food Name",
    portion: "Portion",
    gram: "grams",
    ml: "ml",
    total: "Total",
    remaining: "Remaining",
    consumed: "Consumed",
    burned: "Burned",
    add_to_diary: "Add to Diary",
    add_to_favorites: "Add to Favorites",
    save: "Save",
    cancel: "Cancel",
    
    // Analytics
    calorie_consumption: "Calorie Consumption",
    macronutrients: "Macronutrients",
    meal_distribution: "Meal Distribution",
    top_foods: "Top Foods",
    calories_burned: "Calories Burned",
    goals_comparison: "Goals Comparison",
    weekly: "Weekly",
    monthly: "Monthly",
    yearly: "Yearly",
    day: "Day",
    week: "Week",
    month: "Month",
    year: "Year",
    below_goal: "below goal",
    above_goal: "above goal",
    target: "Target",
    
    // Planner
    meal_planner: "Meal Planner",
    daily_nutrition: "Daily Nutrition",
    shopping_list: "Shopping List",
    select_template: "Select Template",
    planned: "Planned",
    save_list: "Save List",
    add_item: "Add Item",
    items: "items",
    
    // Progress
    current_weight: "Current Weight",
    target_weight: "Target Weight",
    streak: "Streak",
    streak_days: "Streak Days",
    statistics: "Statistics",
    active_days: "Active Days",
    tracked_calories: "Tracked Calories",
    weight_dynamics: "Weight Dynamics",
    weight: "Weight",
    start: "Start",
    left: "Left",
    achievements: "Achievements",
    habits: "Habits",
    view_all_achievements: "View All Achievements",
    add_habit: "Add Habit",
    complete_all: "Complete All",
    days: "days",
    calorie_goals: "Calorie Goals",
    target_calories: "Target Calories",
    actual_calories: "Actual Calories",
    nutrition: "Nutrition",
    goals_met: "Goals Met",
    best: "Best",
    unlocked: "Unlocked",
    
    // Recipes and calculator
    recipe_name: "Recipe Name",
    cooking_time: "Cooking Time",
    minutes: "minutes",
    portions: "Portions",
    ingredients: "Ingredients",
    add_ingredient: "Add Ingredient",
    preparation: "Preparation",
    cooking_steps: "Cooking Steps",
    add_step: "Add Step",
    nutritional_value: "Nutritional Value",
    per_portion: "per portion",
    create_recipe: "Create Recipe",
    popular_recipes: "Popular Recipes",
    your_recipes: "Your Recipes",
    favorites: "Favorites",
    all_recipes: "All Recipes",
    recipe_calculator: "Recipe Calculator",
    recipe_description: "Recipe Description",
    
    // Community
    feed: "Feed",
    challenges: "Challenges",
    groups: "Groups",
    friends: "Friends",
    search_community: "Search Community",
    whats_on_your_mind: "What's on your mind?",
    add_photo: "Add Photo",
    post: "Post",
    active: "Active",
    completed: "Completed",
    
    // Profile and settings
    profile: "Profile",
    settings: "Settings",
    edit_profile: "Edit Profile",
    personal_info: "Personal Information",
    name: "Name",
    email: "Email",
    password: "Password",
    measurement_units: "Measurement Units",
    metric_system: "Metric System",
    imperial_system: "Imperial System",
    save_changes: "Save Changes",
    nutritional_goals: "Nutritional Goals",
    calorie_goal: "Calorie Goal",
    protein_goal: "Protein Goal",
    fat_goal: "Fat Goal",
    carb_goal: "Carb Goal",
    save_goals: "Save Goals",
    appearance: "Appearance",
    theme: "Theme",
    theme_light: "Light",
    theme_dark: "Dark",
    theme_system: "System",
    language: "Language",
    
    // Premium
    premium: "Premium",
    premium_features: "Premium Features",
    subscribe: "Subscribe",
    monthly: "Monthly",
    annual: "Annual",
    discount: "discount",
    current_plan: "Current Plan",
    premium_member: "Premium Member",
    subscription_expires: "Subscription Expires",
    manage_subscription: "Manage Subscription",
    
    // Subscription
    get_premium: "Get Premium",
    premium_benefits: "Premium Benefits",
    benefit_1: "Advanced Analytics & Reports",
    benefit_2: "Ad-Free Experience",
    benefit_3: "Full Recipe Database Access",
    benefit_4: "Food Recognition by Photo",
    benefit_5: "Personalized Meal Plans",
    monthly_subscription: "Monthly Subscription",
    annual_subscription: "Annual Subscription",
    per_month: "per month",
    per_year: "per year",
    save_percent: "Save",
    continue: "Continue",
    
    // General
    kcal: "kcal",
    g: "g",
    ml_unit: "ml",
    kg: "kg",
    cm: "cm",
    ft: "ft",
    in: "in",
    lb: "lb",
    day_1: "Mon",
    day_2: "Tue",
    day_3: "Wed",
    day_4: "Thu",
    day_5: "Fri",
    day_6: "Sat",
    day_7: "Sun",
    notifications: "Notifications",
    about: "About",
    logout: "Logout",
    terms: "Terms of Service",
    privacy: "Privacy Policy"
  },
  // For other languages, we'll provide at least key translations for demonstration
  es: {
    dashboard: "Panel",
    analytics: "Análisis",
    planner: "Planificador",
    recipes: "Recetas",
    recipe_calculator: "Calculadora de Recetas",
    progress: "Progreso",
    community: "Comunidad",
    profile: "Perfil",
    settings: "Configuración",
    premium: "Premium",
    // ... remaining translations
  },
  fr: {
    dashboard: "Tableau de bord",
    analytics: "Analytique",
    planner: "Planificateur",
    recipes: "Recettes",
    recipe_calculator: "Calculateur de Recettes",
    progress: "Progrès",
    community: "Communauté",
    profile: "Profil",
    settings: "Paramètres",
    premium: "Premium",
    // ... remaining translations
  },
  de: {
    dashboard: "Dashboard",
    analytics: "Analytik",
    planner: "Planer",
    recipes: "Rezepte",
    recipe_calculator: "Rezeptrechner",
    progress: "Fortschritt",
    community: "Gemeinschaft",
    profile: "Profil",
    settings: "Einstellungen",
    premium: "Premium",
    // ... remaining translations
  },
  pt: {
    dashboard: "Painel",
    analytics: "Análise",
    planner: "Planejador",
    recipes: "Receitas",
    recipe_calculator: "Calculadora de Receitas",
    progress: "Progresso",
    community: "Comunidade",
    profile: "Perfil",
    settings: "Configurações",
    premium: "Premium",
    // ... remaining translations
  },
  zh: {
    dashboard: "仪表板",
    analytics: "分析",
    planner: "规划师",
    recipes: "食谱",
    recipe_calculator: "食谱计算器",
    progress: "进展",
    community: "社区",
    profile: "个人资料",
    settings: "设置",
    premium: "高级版",
    // ... remaining translations
  },
  ja: {
    dashboard: "ダッシュボード",
    analytics: "分析",
    planner: "プランナー",
    recipes: "レシピ",
    recipe_calculator: "レシピ計算機",
    progress: "進捗",
    community: "コミュニティ",
    profile: "プロフィール",
    settings: "設定",
    premium: "プレミアム",
    // ... remaining translations
  },
  ko: {
    dashboard: "대시보드",
    analytics: "분석",
    planner: "플래너",
    recipes: "레시피",
    recipe_calculator: "레시피 계산기",
    progress: "진행",
    community: "커뮤니티",
    profile: "프로필",
    settings: "설정",
    premium: "프리미엄",
    // ... remaining translations
  },
  tr: {
    dashboard: "Gösterge Paneli",
    analytics: "Analitik",
    planner: "Planlayıcı",
    recipes: "Tarifler",
    recipe_calculator: "Tarif Hesaplayıcı",
    progress: "İlerleme",
    community: "Topluluk",
    profile: "Profil",
    settings: "Ayarlar",
    premium: "Premium",
    // ... remaining translations
  },
  it: {
    dashboard: "Dashboard",
    analytics: "Analisi",
    planner: "Pianificatore",
    recipes: "Ricette",
    recipe_calculator: "Calcolatore di Ricette",
    progress: "Progresso",
    community: "Comunità",
    profile: "Profilo",
    settings: "Impostazioni",
    premium: "Premium",
    // ... remaining translations
  }
};

// Хук для использования языка
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Провайдер для языка
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Функция для определения языка по умолчанию
  const getDefaultLanguage = (): LanguageId => {
    try {
      // Определение региона устройства
      const userLanguage = navigator.language;
      const regionCode = userLanguage.split('-')[1]?.toUpperCase();
      
      // Проверяем, относится ли регион к СНГ
      const cis = ['RU', 'BY', 'KZ', 'UA', 'UZ', 'TJ', 'KG', 'MD', 'AZ', 'AM', 'GE'];
      
      if (cis.includes(regionCode)) {
        return "ru";
      }
      
      // Для других регионов определяем наиболее подходящий язык
      const languageCode = userLanguage.split('-')[0].toLowerCase();
      const availableLanguageCodes = availableLanguages.map(lang => lang.id);
      
      if (availableLanguageCodes.includes(languageCode as LanguageId)) {
        return languageCode as LanguageId;
      }
      
      // По умолчанию английский для всех других регионов
      return "en";
    } catch (error) {
      // При ошибке определения языка возвращаем английский
      return "en";
    }
  };

  // Состояние для текущего языка
  const [currentLanguage, setCurrentLanguage] = useState<LanguageId>(() => {
    // Пытаемся получить язык из localStorage
    const savedLanguage = localStorage.getItem("language") as LanguageId | null;
    
    // Если язык сохранен в localStorage, используем его, иначе определяем по умолчанию
    return savedLanguage || getDefaultLanguage();
  });

  // Функция для изменения языка
  const setLanguage = (id: LanguageId) => {
    setCurrentLanguage(id);
    localStorage.setItem("language", id);
  };

  // Функция для перевода строк
  const translate = (key: string): string => {
    // Получаем переводы для текущего языка
    const languageTranslations = translations[currentLanguage];
    
    // Проверяем наличие перевода
    if (languageTranslations && languageTranslations[key]) {
      return languageTranslations[key];
    }
    
    // Если перевод не найден, используем английский
    if (translations.en[key]) {
      return translations.en[key];
    }
    
    // Если и в английском нет, возвращаем ключ
    return key;
  };

  // Эффект для установки атрибута lang для HTML
  useEffect(() => {
    const language = availableLanguages.find(lang => lang.id === currentLanguage);
    if (language) {
      document.documentElement.lang = language.code;
    }
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, languages: availableLanguages, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
