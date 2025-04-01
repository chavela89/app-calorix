import { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface LanguageContextProps {
  language: 'ru' | 'en';
  setLanguage: (lang: 'ru' | 'en') => void;
  translate: (key: string, params?: { [key: string]: string }) => string;
  availableLanguages: { code: string; label: string }[];
}

interface EnhancedLanguageContextProps {
  isEnglish: boolean;
  translateCost: (cost: number) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);
const EnhancedLanguageContext = createContext<EnhancedLanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<'ru' | 'en'>((localStorage.getItem('language') as 'ru' | 'en') || 'ru');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const translations = {
    en: {
      diary: "Diary",
      analytics: "Analytics",
      planner: "Planner",
      recipes: "Recipes",
      progress: "Progress",
      community: "Community",
      profile: "Profile",
      settings: "Settings",
      premium: "Premium",
      my_account: "My Account",
      logout: "Logout",
      login: "Login",
      edit: "Edit",
      delete: "Delete",
      item_duplicated: "Item duplicated!",
      item_added_to_meal: "Item added to {meal}!",
      add_to_favorites: "Add to favorites",
      added_to_favorites: "Added to favorites!",
      item_added_to_favorites: "Item added to favorites!",
      edit_food: "Edit food",
      edit_food_description: "You can edit this food in your profile settings.",
      item_deleted: "Item deleted!",
      item_removed_from_meal: "Item removed from {meal}!",
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      snack: "Snack",
      calories: "Calories",
      protein: "Protein",
      carbs: "Carbs",
      fat: "Fat",
      kcal: "kcal",
      grams: "grams",
      search_recipes: "Search recipes...",
      all_recipes: "All Recipes",
      vegetarian: "Vegetarian",
      high_protein: "High Protein",
      low_carb: "Low Carb",
      quick_meal: "Quick Meal",
      gluten_free: "Gluten-Free",
      dairy_free: "Dairy-Free",
      view_recipe: "View Recipe",
      recipe_calculator: "Recipe Calculator",
      enter_recipe_name: "Enter recipe name",
      recipe_name: "Recipe Name",
      servings: "Servings",
      weight: "Weight",
      ingredients: "Ingredients",
      ingredient: "Ingredient",
      amount: "Amount",
      unit: "Unit",
      select_ingredient: "Select ingredient",
      no_ingredients_added: "No ingredients added",
      nutritional_value: "Nutritional Value",
      per_serving: "Per Serving",
      per_100g: "Per 100g",
      recipe_saved_successfully: "Recipe saved successfully!",
      whats_on_your_mind: "What's on your mind?",
      add_photo: "Add Photo",
      post: "Post",
      active: "Active",
      completed: "Completed",
      participants: "Participants",
      days: "days",
      left: "left",
      view_all_challenges: "View All Challenges",
      members: "Members",
      day: "day",
      join_group: "Join Group",
      find_friends: "Find Friends",
      friends_description: "Start following people to see their posts here.",
      search_community: "Search community...",
      current_weight: "Current Weight",
      target_weight: "Target Weight",
      start: "Start",
      streak: "Streak",
      best: "Best",
      active_days: "Active Days",
      tracked_calories: "Tracked Calories",
      achievements: "Achievements",
      goals_met: "Goals Met",
      weight_dynamics: "Weight Dynamics",
      target_calories: "Target Calories",
      actual_calories: "Actual Calories",
      unlocked: "Unlocked",
      add_habit: "Add Habit",
      complete_all: "Complete All",
      upgrade_to_premium: "Upgrade to Premium",
      premium_description: "Unlock exclusive features and remove ads.",
      go_premium: "Go Premium",
      monthly: "monthly",
      search_food: "Search food"
    },
    ru: {
      diary: "Дневник",
      analytics: "Аналитика",
      planner: "Планировщик",
      recipes: "Рецепты",
      progress: "Прогресс",
      community: "Сообщество",
      profile: "Профиль",
      settings: "Настройки",
      premium: "Премиум",
      my_account: "Мой аккаунт",
      logout: "Выйти",
      login: "Войти",
      edit: "Редактировать",
      delete: "Удалить",
      item_duplicated: "Пункт дублирован!",
      item_added_to_meal: "Пункт добавлен в {meal}!",
      add_to_favorites: "Добавить в избранное",
      added_to_favorites: "Добавлено в избранное!",
      item_added_to_favorites: "Пункт добавлен в избранное!",
      edit_food: "Редактировать продукт",
      edit_food_description: "Вы можете редактировать этот продукт в настройках профиля.",
      item_deleted: "Пункт удален!",
      item_removed_from_meal: "Пункт удален из {meal}!",
      breakfast: "Завтрак",
      lunch: "Обед",
      dinner: "Ужин",
      snack: "Перекус",
      calories: "Калории",
      protein: "Белки",
      carbs: "Углеводы",
      fat: "Жиры",
      kcal: "ккал",
      grams: "граммы",
      search_recipes: "Поиск рецептов...",
      all_recipes: "Все рецепты",
      vegetarian: "Вегетарианское",
      high_protein: "Высокобелковое",
      low_carb: "Низкоуглеводное",
      quick_meal: "Быстрое блюдо",
      gluten_free: "Без глютена",
      dairy_free: "Без молочных продуктов",
      view_recipe: "Посмотреть рецепт",
      recipe_calculator: "Калькулятор рецептов",
      enter_recipe_name: "Введите название рецепта",
      recipe_name: "Название рецепта",
      servings: "Порции",
      weight: "Вес",
      ingredients: "Ингредиенты",
      ingredient: "Ингредиент",
      amount: "Количество",
      unit: "Ед. изм.",
      select_ingredient: "Выберите ингредиент",
      no_ingredients_added: "Нет добавленных ингредиентов",
      nutritional_value: "Пищевая ценность",
      per_serving: "На порцию",
      per_100g: "На 100г",
      recipe_saved_successfully: "Рецепт успешно сохранен!",
      whats_on_your_mind: "Что у вас на уме?",
      add_photo: "Добавить фото",
      post: "Опубликовать",
      active: "Активно",
      completed: "Завершено",
      participants: "Участники",
      days: "дней",
      left: "осталось",
      view_all_challenges: "Посмотреть все челленджи",
      members: "Участников",
      day: "день",
      join_group: "Присоединиться к группе",
      find_friends: "Найти друзей",
      friends_description: "Начните подписываться на людей, чтобы видеть их публикации здесь.",
      search_community: "Поиск в сообществе...",
      current_weight: "Текущий вес",
      target_weight: "Целевой вес",
      start: "Старт",
      streak: "Серия",
      best: "Лучшая",
      active_days: "Активные дни",
      tracked_calories: "Отслежено калорий",
      achievements: "Достижения",
      goals_met: "Цели достигнуты",
      weight_dynamics: "Динамика веса",
      target_calories: "Целевые калории",
      actual_calories: "Фактические калории",
      unlocked: "Разблокировано",
      add_habit: "Добавить привычку",
      complete_all: "Завершить все",
      upgrade_to_premium: "Перейти на Премиум",
      premium_description: "Разблокируйте эксклюзивные функции и уберите рекламу.",
      go_premium: "Перейти на Премиум",
      monthly: "в месяц",
        
    // Additional translations
    below_goal: "ниже цели",
    above_goal: "выше цели",
    recommended_macros_balance: "Рекомендуемый баланс макронутриентов",
    nutrition_analysis: "Анализ питания",
    your_daily_goal: "Ваша цель на день",
    these_calories_for: "Это калории для",
    maintaining_weight: "поддержания веса",
    losing_weight: "снижения веса",
    consumed: "потреблено",
    remaining: "осталось",
    burned: "сожжено",
    goal: "цель",
    duplicate: "Дублировать",
    add_to_favorites: "Добавить в избранное",
    recipe_step_1: "Подготовьте все ингредиенты и разогрейте духовку до 180°C.",
    recipe_step_2: "Смешайте специи и натрите ими мясо. Оставьте мариноваться на 15 минут.",
    recipe_step_3: "Разогрейте сковороду и обжарьте мясо по 2 минуты с каждой стороны до золотистой корочки.",
    recipe_step_4: "Выложите все в форму для запекания и добавьте оставшиеся ингредиенты.",
    recipe_step_5: "Запекайте в духовке 25 минут, затем дайте отдохнуть 5 минут перед подачей.",
    added_to_favorites: "Добавлено в избранное",
    removed_from_favorites: "Удалено из избранных",
    recipe_added_to_favorites: "Рецепт добавлен в избранное",
    recipe_removed_from_favorites: "Рецепт удален из избранного",
    share_recipe: "Поделиться рецептом",
    recipe_share_success: "Ссылка на рецепт скопирована в буфер обмена",
    print_recipe: "Печать рецепта",
    recipe_print_started: "Подготовка к печати...",
    added_to_diary: "Добавлено в дневник",
    recipe_added_to_diary: "Рецепт добавлен в ваш дневник питания",
    olive_oil: "Оливковое масло",
    salt: "Соль",
    black_pepper: "Черный перец",
    garlic: "Чеснок",
    lemon: "Лимон",
    rosemary: "Розмарин",
    tbsp: "ст.л",
    cloves: "зубчика",
    sprigs: "веточки",
    to_taste: "по вкусу",
    medium: "Средний",
    servings: "порции",
    instructions: "Инструкции",
    healthy: "Полезное",
    chicken: "Куриное",
    print: "Распечатать",
    share: "Поделиться",
    search_food: "Поиск продуктов"
    }
  };

  const translate = useCallback((key: string, params: { [key: string]: string } = {}) => {
    let translatedText = translations[language as 'en' | 'ru'][key] || key;
    
    Object.keys(params).forEach(paramKey => {
      translatedText = translatedText.replace(`{${paramKey}}`, params[paramKey]);
    });

    return translatedText;
  }, [language]);

  const availableLanguages = [
    { code: 'ru', label: 'Русский' },
    { code: 'en', label: 'English' },
  ];

  const contextValue: LanguageContextProps = {
    language,
    setLanguage,
    translate,
    availableLanguages,
  };

  const isEnglish = language === 'en';

  const translateCost = (cost: number) => {
    return isEnglish ? `$${cost}` : `${cost * 90}₽`;
  };

  const enhancedContextValue: EnhancedLanguageContextProps = {
    isEnglish,
    translateCost,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      <EnhancedLanguageContext.Provider value={enhancedContextValue}>
        {children}
      </EnhancedLanguageContext.Provider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useEnhancedLanguage = () => {
  const context = useContext(EnhancedLanguageContext);
  if (!context) {
    throw new Error('useEnhancedLanguage must be used within a LanguageProvider');
  }
  return context;
};
