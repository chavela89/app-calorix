
import React, { createContext, useContext, useEffect, useState } from "react";

// Определение доступных языков
export const LANGUAGES = [
  { id: "ru", name: "Русский" },
  { id: "en", name: "English" },
  { id: "es", name: "Español" },
  { id: "fr", name: "Français" },
  { id: "de", name: "Deutsch" },
  { id: "pt", name: "Português" },
  { id: "zh", name: "中文" },
  { id: "ja", name: "日本語" },
  { id: "ko", name: "한국어" },
  { id: "tr", name: "Türkçe" },
  { id: "it", name: "Italiano" },
];

// Определение регионов СНГ
const CIS_REGIONS = ["RU", "BY", "KZ", "UA", "UZ", "TM", "TJ", "MD", "KG", "AM", "AZ"];

type LanguageContextType = {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  languages: typeof LANGUAGES;
  translate: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState("ru");
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});

  // Определение языка по региону
  useEffect(() => {
    const determineLanguage = () => {
      // Восстанавливаем язык из локального хранилища
      const savedLanguage = localStorage.getItem("app_language");
      if (savedLanguage && LANGUAGES.some((lang) => lang.id === savedLanguage)) {
        return savedLanguage;
      }

      // Определяем регион пользователя
      try {
        const userLocale = navigator.language;
        const regionCode = userLocale.split('-')[1]?.toUpperCase();
        
        // Если регион в СНГ, устанавливаем русский язык
        if (regionCode && CIS_REGIONS.includes(regionCode)) {
          return "ru";
        }
        
        // В противном случае проверяем, поддерживается ли язык пользователя
        const languageCode = userLocale.split('-')[0];
        if (LANGUAGES.some((lang) => lang.id === languageCode)) {
          return languageCode;
        }
      } catch (error) {
        console.error("Failed to determine language:", error);
      }

      // По умолчанию возвращаем английский
      return "en";
    };

    const language = determineLanguage();
    setCurrentLanguage(language);
    localStorage.setItem("app_language", language);
  }, []);

  // Загрузка переводов
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // Полный набор переводов для всех языков
        const ruTranslations = {
          // Общие
          "app_name": "CaloriX",
          "login": "Войти",
          "logout": "Выйти",
          "register": "Регистрация",
          "settings": "Настройки",
          "profile": "Профиль",
          "save": "Сохранить",
          "cancel": "Отмена",
          "delete": "Удалить",
          "edit": "Редактировать",
          "add": "Добавить",
          "search": "Поиск",
          "loading": "Загрузка...",
          "error": "Ошибка",
          "success": "Успех",
          "day": "День",
          "week": "Неделя",
          "month": "Месяц",
          "year": "Год",
          "today": "Сегодня",
          "yesterday": "Вчера",
          "tomorrow": "Завтра",
          
          // Навигация
          "diary": "Дневник",
          "analytics": "Аналитика",
          "planner": "Планировщик", 
          "recipes": "Рецепты",
          "progress": "Прогресс",
          "community": "Сообщество",
          "premium": "Premium",
          "my_account": "Мой аккаунт",
          
          // Питание и нутриенты
          "breakfast": "Завтрак",
          "lunch": "Обед",
          "dinner": "Ужин",
          "snack": "Перекус",
          "calories": "Калории",
          "protein": "Белки",
          "fat": "Жиры",
          "carbs": "Углеводы",
          "water": "Вода",
          "kcal": "ккал",
          "g": "г",
          "ml": "мл",
          "left": "Осталось",
          "consumed": "Потреблено",
          "goal": "Цель",
          "food": "Продукт",
          "meal": "Приём пищи",
          "add_food": "Добавить продукт",
          "add_meal": "Добавить приём пищи",
          "add_water": "Добавить воду",
          "add_exercise": "Добавить активность",
          
          // Аналитика
          "calorie_consumption": "Потребление калорий",
          "macronutrients": "Макронутриенты",
          "weekly": "Еженедельно",
          "monthly": "Ежемесячно",
          "yearly": "За год",
          "meal_distribution": "Распределение по приёмам пищи",
          "top_foods": "Топ продуктов",
          "calories_burned": "Сожжённые калории",
          "goals_comparison": "Сравнение с целями",
          "above_goal": "выше цели",
          "below_goal": "ниже цели",
          "burned": "Сожжено",
          
          // Планировщик
          "meal_planner": "Планировщик питания",
          "select_template": "Выбрать шаблон",
          "daily_nutrition": "Дневное питание",
          "shopping_list": "Список покупок",
          "add_item": "Добавить элемент",
          "save_list": "Сохранить список",
          "planned": "Запланировано",
          "items": "элементов",
          
          // Рецепты
          "all_recipes": "Все рецепты",
          "search_recipes": "Искать рецепты",
          "recipe_calculator": "Калькулятор рецептов",
          "vegetarian": "Вегетарианские",
          "high_protein": "Высокобелковые",
          "low_carb": "Низкоуглеводные",
          "quick_meal": "Быстрые блюда",
          "gluten_free": "Без глютена",
          "dairy_free": "Без лактозы",
          "min": "мин",
          "view_recipe": "Смотреть рецепт",
          "whats_on_your_mind": "Что у вас на уме?",
          "post": "Опубликовать",
          "add_photo": "Добавить фото",
          
          // Калькулятор рецептов
          "recipe_name": "Название рецепта",
          "enter_recipe_name": "Введите название рецепта",
          "servings": "Порции",
          "weight": "Вес",
          "ingredients": "Ингредиенты",
          "ingredient": "Ингредиент",
          "select_ingredient": "Выберите ингредиент",
          "amount": "Количество",
          "unit": "Ед. изм.",
          "quantity": "Количество",
          "no_ingredients_added": "Нет добавленных ингредиентов",
          "nutritional_value": "Пищевая ценность",
          "per_serving": "На порцию",
          "per_100g": "На 100 грамм",
          "cost": "Стоимость",
          "save_recipe": "Сохранить рецепт",
          "recipe_saved_successfully": "Рецепт успешно сохранён",
          
          // Прогресс
          "current_weight": "Текущий вес",
          "target_weight": "Целевой вес",
          "start": "Старт",
          "streak": "Серия",
          "days": "дней",
          "best": "Лучший",
          "statistics": "Статистика",
          "active_days": "Активных дней",
          "tracked_calories": "Отслежено калорий",
          "achievements": "Достижения",
          "goals_met": "Достигнуто целей",
          "weight_dynamics": "Динамика веса",
          "calorie_goals": "Цели по калориям",
          "target": "Цель",
          "weight": "Вес",
          "nutrition": "Питание",
          "habits": "Привычки",
          "unlocked": "Разблокировано",
          "view_all_achievements": "Смотреть все достижения",
          "add_habit": "Добавить привычку",
          "complete_all": "Завершить все",
          "target_calories": "Целевые калории",
          "actual_calories": "Фактические калории",
          
          // Сообщество
          "feed": "Лента",
          "challenges": "Челленджи",
          "groups": "Группы",
          "friends": "Друзья",
          "search_community": "Искать в сообществе",
          "active": "Активный",
          "completed": "Завершён",
          "progress": "Прогресс",
          "participants": "участников",
          "days_left": "дней осталось",
          "join_challenge": "Присоединиться",
          "view_results": "Смотреть результаты",
          "create_challenge": "Создать челлендж",
          "create_challenge_description": "Создайте свой челлендж и пригласите друзей",
          "members": "Участники",
          "posts_per_day": "Постов в день",
          "join_group": "Вступить в группу",
          "create_group": "Создать группу",
          "create_group_description": "Создайте свою группу по интересам",
          "active_today": "Активен сегодня",
          "days_streak": "дней подряд",
          "message": "Сообщение",
          "view_profile": "Смотреть профиль",
          "find_friends": "Найти друзей",
          
          // Premium
          "premium_activated": "Premium активирован",
          "premium_activated_description": "Теперь вам доступны все возможности Premium!",
          "monthly_subscription": "Ежемесячная подписка",
          "yearly_subscription": "Годовая подписка",
          "billed_monthly": "Оплата ежемесячно",
          "billed_annually": "Оплата раз в год",
          "save_30": "Экономия 30%",
          "photo_recognition": "Распознавание фото",
          "photo_recognition_description": "Определение состава и калорийности блюда по фотографии",
          "advanced_analytics": "Расширенная аналитика",
          "advanced_analytics_description": "Детальная статистика с корреляциями и прогнозами",
          "ad_free": "Без рекламы",
          "ad_free_description": "Полностью свободный от рекламы опыт",
          "voice_input": "Голосовой ввод",
          "voice_input_description": "Добавление продуктов с помощью голосовых команд",
          "custom_themes": "Пользовательские темы",
          "custom_themes_description": "Дополнительные темы оформления и персонализация",
          "nutritionist_consultation": "Консультации диетолога",
          "nutritionist_consultation_description": "Доступ к консультациям AI-диетолога",
          "calorie_tracking": "Отслеживание калорий",
          "calorie_tracking_description": "Отслеживание потребления калорий и макронутриентов",
          "meal_planning": "Планирование питания",
          "meal_planning_description": "Планирование приёмов пищи и создание списков покупок",
          "progress_tracking": "Отслеживание прогресса",
          "progress_tracking_description": "Отслеживание изменений веса и привычек",
          "basic_recipes": "Базовые рецепты",
          "basic_recipes_description": "Доступ к базовым рецептам и калькулятору",
          "water_tracking": "Отслеживание воды",
          "water_tracking_description": "Отслеживание потребления воды",
          "upgrade_to_premium": "Улучшите до Premium",
          "premium_description": "Разблокируйте все возможности CaloriX",
          "premium_features": "Premium функции",
          "basic_features": "Базовые функции",
          "basic_features_included": "Все базовые функции включены в Premium",
          "testimonials": "Отзывы",
          "testimonial_1": "CaloriX Premium полностью изменил мой подход к питанию. Аналитика и распознавание фото экономят столько времени!",
          "testimonial_2": "Я достиг своей цели по снижению веса на месяц раньше благодаря расширенной аналитике и персональным рекомендациям.",
          "popular": "Популярный",
          "subscribe_now": "Подписаться сейчас",
          "cancel_anytime": "Отменить можно в любой момент",
          "payment_processed_by": "Оплата обрабатывается через App Store",
          "money_back_guarantee": "Гарантия возврата средств",
          "money_back_guarantee_description": "Если вы не удовлетворены, мы вернем деньги в течение 7 дней после покупки."
        };
        
        const enTranslations = {
          // General
          "app_name": "CaloriX",
          "login": "Login",
          "logout": "Logout",
          "register": "Register",
          "settings": "Settings",
          "profile": "Profile",
          "save": "Save",
          "cancel": "Cancel",
          "delete": "Delete",
          "edit": "Edit",
          "add": "Add",
          "search": "Search",
          "loading": "Loading...",
          "error": "Error",
          "success": "Success",
          "day": "Day",
          "week": "Week",
          "month": "Month",
          "year": "Year",
          "today": "Today",
          "yesterday": "Yesterday",
          "tomorrow": "Tomorrow",
          
          // Navigation
          "diary": "Diary",
          "analytics": "Analytics",
          "planner": "Planner", 
          "recipes": "Recipes",
          "progress": "Progress",
          "community": "Community",
          "premium": "Premium",
          "my_account": "My Account",
          
          // Nutrition
          "breakfast": "Breakfast",
          "lunch": "Lunch",
          "dinner": "Dinner",
          "snack": "Snack",
          "calories": "Calories",
          "protein": "Protein",
          "fat": "Fat",
          "carbs": "Carbs",
          "water": "Water",
          "kcal": "kcal",
          "g": "g",
          "ml": "ml",
          "left": "Left",
          "consumed": "Consumed",
          "goal": "Goal",
          "food": "Food",
          "meal": "Meal",
          "add_food": "Add Food",
          "add_meal": "Add Meal",
          "add_water": "Add Water",
          "add_exercise": "Add Exercise",
          
          // Analytics
          "calorie_consumption": "Calorie Consumption",
          "macronutrients": "Macronutrients",
          "weekly": "Weekly",
          "monthly": "Monthly",
          "yearly": "Yearly",
          "meal_distribution": "Meal Distribution",
          "top_foods": "Top Foods",
          "calories_burned": "Calories Burned",
          "goals_comparison": "Goals Comparison",
          "above_goal": "above goal",
          "below_goal": "below goal",
          "burned": "Burned",
          
          // Planner
          "meal_planner": "Meal Planner",
          "select_template": "Select Template",
          "daily_nutrition": "Daily Nutrition",
          "shopping_list": "Shopping List",
          "add_item": "Add Item",
          "save_list": "Save List",
          "planned": "Planned",
          "items": "items",
          
          // Recipes
          "all_recipes": "All Recipes",
          "search_recipes": "Search Recipes",
          "recipe_calculator": "Recipe Calculator",
          "vegetarian": "Vegetarian",
          "high_protein": "High Protein",
          "low_carb": "Low Carb",
          "quick_meal": "Quick Meal",
          "gluten_free": "Gluten Free",
          "dairy_free": "Dairy Free",
          "min": "min",
          "view_recipe": "View Recipe",
          "whats_on_your_mind": "What's on your mind?",
          "post": "Post",
          "add_photo": "Add Photo",
          
          // Recipe Calculator
          "recipe_name": "Recipe Name",
          "enter_recipe_name": "Enter recipe name",
          "servings": "Servings",
          "weight": "Weight",
          "ingredients": "Ingredients",
          "ingredient": "Ingredient",
          "select_ingredient": "Select ingredient",
          "amount": "Amount",
          "unit": "Unit",
          "quantity": "Quantity",
          "no_ingredients_added": "No ingredients added",
          "nutritional_value": "Nutritional Value",
          "per_serving": "Per Serving",
          "per_100g": "Per 100g",
          "cost": "Cost",
          "save_recipe": "Save Recipe",
          "recipe_saved_successfully": "Recipe saved successfully",
          
          // Progress
          "current_weight": "Current Weight",
          "target_weight": "Target Weight",
          "start": "Start",
          "streak": "Streak",
          "days": "days",
          "best": "Best",
          "statistics": "Statistics",
          "active_days": "Active Days",
          "tracked_calories": "Tracked Calories",
          "achievements": "Achievements",
          "goals_met": "Goals Met",
          "weight_dynamics": "Weight Dynamics",
          "calorie_goals": "Calorie Goals",
          "target": "Target",
          "weight": "Weight",
          "nutrition": "Nutrition",
          "habits": "Habits",
          "unlocked": "Unlocked",
          "view_all_achievements": "View All Achievements",
          "add_habit": "Add Habit",
          "complete_all": "Complete All",
          "target_calories": "Target Calories",
          "actual_calories": "Actual Calories",
          
          // Community
          "feed": "Feed",
          "challenges": "Challenges",
          "groups": "Groups",
          "friends": "Friends",
          "search_community": "Search Community",
          "active": "Active",
          "completed": "Completed",
          "progress": "Progress",
          "participants": "participants",
          "days_left": "days left",
          "join_challenge": "Join Challenge",
          "view_results": "View Results",
          "create_challenge": "Create Challenge",
          "create_challenge_description": "Create your own challenge and invite friends",
          "members": "Members",
          "posts_per_day": "Posts per day",
          "join_group": "Join Group",
          "create_group": "Create Group",
          "create_group_description": "Create your own interest group",
          "active_today": "Active today",
          "days_streak": "days streak",
          "message": "Message",
          "view_profile": "View Profile",
          "find_friends": "Find Friends",
          
          // Premium
          "premium_activated": "Premium Activated",
          "premium_activated_description": "You now have access to all Premium features!",
          "monthly_subscription": "Monthly Subscription",
          "yearly_subscription": "Yearly Subscription",
          "billed_monthly": "Billed monthly",
          "billed_annually": "Billed annually",
          "save_30": "Save 30%",
          "photo_recognition": "Photo Recognition",
          "photo_recognition_description": "Determine dish composition and calories from photos",
          "advanced_analytics": "Advanced Analytics",
          "advanced_analytics_description": "Detailed statistics with correlations and predictions",
          "ad_free": "Ad-Free Experience",
          "ad_free_description": "Completely ad-free experience",
          "voice_input": "Voice Input",
          "voice_input_description": "Add foods using voice commands",
          "custom_themes": "Custom Themes",
          "custom_themes_description": "Additional themes and personalization",
          "nutritionist_consultation": "Nutritionist Consultation",
          "nutritionist_consultation_description": "Access to AI nutritionist consultations",
          "calorie_tracking": "Calorie Tracking",
          "calorie_tracking_description": "Track calorie and macronutrient intake",
          "meal_planning": "Meal Planning",
          "meal_planning_description": "Plan meals and create shopping lists",
          "progress_tracking": "Progress Tracking",
          "progress_tracking_description": "Track weight changes and habits",
          "basic_recipes": "Basic Recipes",
          "basic_recipes_description": "Access to basic recipes and calculator",
          "water_tracking": "Water Tracking",
          "water_tracking_description": "Track water consumption",
          "upgrade_to_premium": "Upgrade to Premium",
          "premium_description": "Unlock all CaloriX features",
          "premium_features": "Premium Features",
          "basic_features": "Basic Features",
          "basic_features_included": "All basic features are included in Premium",
          "testimonials": "Testimonials",
          "testimonial_1": "CaloriX Premium completely changed my approach to nutrition. The analytics and photo recognition save so much time!",
          "testimonial_2": "I reached my weight loss goal a month earlier thanks to the advanced analytics and personalized recommendations.",
          "popular": "Popular",
          "subscribe_now": "Subscribe Now",
          "cancel_anytime": "Cancel anytime",
          "payment_processed_by": "Payment processed by App Store",
          "money_back_guarantee": "Money Back Guarantee",
          "money_back_guarantee_description": "If you're not satisfied, we'll refund your money within 7 days of purchase."
        };
        
        // Создаем базовый объект переводов с английскими переводами по умолчанию
        const allTranslations: Record<string, Record<string, string>> = {
          ru: ruTranslations,
          en: enTranslations,
        };
        
        // Для всех остальных языков используем английские переводы
        LANGUAGES.forEach(lang => {
          if (!allTranslations[lang.id]) {
            allTranslations[lang.id] = enTranslations;
          }
        });
        
        setTranslations(allTranslations);
      } catch (error) {
        console.error("Failed to load translations:", error);
      }
    };

    loadTranslations();
  }, []);

  const setLanguage = (language: string) => {
    if (LANGUAGES.some((lang) => lang.id === language)) {
      setCurrentLanguage(language);
      localStorage.setItem("app_language", language);
    }
  };

  const translate = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, languages: LANGUAGES, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
