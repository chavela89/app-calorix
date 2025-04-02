
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the available languages
export type Language = 'en' | 'ru';

// Define the structure for translations
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Language details type
export interface LanguageOption {
  code: Language;
  label: string;
}

// Define the context properties
export interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
  loading: boolean;
  availableLanguages: LanguageOption[];
}

// Enhanced language context with additional functions
export interface EnhancedLanguageContextProps {
  isEnglish: boolean;
  translateMacro: (text: string) => string;
}

// Available languages array
const availableLanguages: LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' }
];

// Create the context with default values
const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  setLanguage: () => {},
  translate: (key: string) => key,
  loading: true,
  availableLanguages: availableLanguages,
});

const EnhancedLanguageContext = createContext<EnhancedLanguageContextProps>({
  isEnglish: true,
  translateMacro: (text: string) => text,
});

// Define the translations
const translations: Translations = {
  en: {
    // Login and Registration
    welcome: 'Welcome to CaloriX',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    confirm_password: 'Confirm Password',
    name: 'Name',
    forgot_password: 'Forgot password?',
    dont_have_account: "Don't have an account?",
    already_have_account: 'Already have an account?',
    sign_up: 'Sign up',
    sign_in: 'Sign in',
    
    // Dashboard
    dashboard: 'Dashboard',
    analytics: 'Analytics',
    planner: 'Meal Planner',
    recipes: 'Recipes',
    progress: 'Progress',
    community: 'Community',
    settings: 'Settings',
    profile: 'Profile',
    
    // Dashboard Content
    today_stats: 'Today\'s Stats',
    calories_consumed: 'Calories Consumed',
    remaining: 'Remaining',
    water: 'Water',
    glasses: 'glasses',
    steps: 'Steps',
    macronutrients: 'Macronutrients',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    diary: 'Food Diary',
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snack: 'Snack',
    add_food: 'Add Food',
    
    // Food and Nutrition
    food: 'Food',
    meal: 'Meal',
    portion: 'Portion',
    calories: 'Calories',
    kcal: 'kcal',
    nutrition: 'Nutrition',
    nutrients: 'Nutrients',
    serving: 'Serving',
    amount: 'Amount',
    unit: 'Unit',
    grams: 'grams',
    milliliters: 'milliliters',
    
    // Analytics
    calorie_consumption: 'Calorie Consumption',
    meal_distribution: 'Meal Distribution',
    top_foods: 'Top Foods',
    calories_burned: 'Calories Burned',
    burned: 'Burned',
    goals_comparison: 'Goals Comparison',
    below_goal: 'below goal',
    above_goal: 'above goal',
    
    // Meal Planning
    meal_planner: 'Meal Planner',
    day: 'Day',
    week: 'Week',
    month: 'Month',
    select_template: 'Select Template',
    daily_nutrition: 'Daily Nutrition',
    shopping_list: 'Shopping List',
    add_item: 'Add item',
    save_list: 'Save List',
    add_meal: 'Add Meal',
    
    // Recipe
    recipe: 'Recipe',
    recipes: 'Recipes',
    recipe_calculator: 'Recipe Calculator',
    ingredients: 'Ingredients',
    instructions: 'Instructions',
    preparation_time: 'Preparation Time',
    cooking_time: 'Cooking Time',
    servings: 'Servings',
    difficulty: 'Difficulty',
    tags: 'Tags',
    save_recipe: 'Save Recipe',
    edit_recipe: 'Edit Recipe',
    delete_recipe: 'Delete Recipe',
    add_ingredients: 'Add Ingredients',
    add_instructions: 'Add Instructions',
    
    // Progress
    weight: 'Weight',
    weight_dynamics: 'Weight Dynamics',
    current_weight: 'Current Weight',
    target_weight: 'Target Weight',
    goals: 'Goals',
    achievements: 'Achievements',
    habits: 'Habits',
    streak: 'Streak',
    days: 'days',
    
    // Community
    feed: 'Feed',
    challenges: 'Challenges',
    groups: 'Groups',
    friends: 'Friends',
    join_challenge: 'Join Challenge',
    create_post: 'Create Post',
    like: 'Like',
    comment: 'Comment',
    share: 'Share',
    
    // Profile & Settings
    account_settings: 'Account Settings',
    personal_info: 'Personal Information',
    notification_settings: 'Notification Settings',
    privacy_settings: 'Privacy Settings',
    appearance: 'Appearance',
    theme: 'Theme',
    language: 'Language',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    
    // General
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    remove: 'Remove',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    view: 'View',
    more: 'More',
    less: 'Less',
    
    // Time periods
    today: 'Today',
    yesterday: 'Yesterday',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
    
    // Status messages
    loading: 'Loading...',
    error_occurred: 'An error occurred',
    no_data: 'No data available',
    coming_soon: 'Coming soon',
    
    // Metrics
    height: 'Height',
    weight: 'Weight',
    age: 'Age',
    gender: 'Gender',
    
    // Misc
    getting_started: 'Getting Started',
    tips: 'Tips',
    explore: 'Explore',
    premium: 'Premium',
    upgrade: 'Upgrade',
    help: 'Help',
    support: 'Support',
    feedback: 'Feedback',
    share_app: 'Share App',
    rate_app: 'Rate App',
    visit_website: 'Visit Website',
    follow_social: 'Follow on Social Media',
    your_name: 'Your name',
    your_email: 'Your email',
    your_phone: 'Your phone',
    your_country: 'Your country',
    
    // Additional keys
    start: 'Start',
    left: 'Left',
    active: 'Active',
    completed: 'Completed',
    participants: 'Participants',
    duplicate: 'Duplicate',
    add_to_favorites: 'Add to Favorites',
    nutrition_analysis: 'Nutrition Analysis',
    per_100g: 'Per 100g',
    
    // Notifications
    food_added: 'Food Added',
    added_to: 'added to',
    settings_saved: 'Settings Saved',
    settings_saved_description: 'Your settings have been updated successfully.',
    data_export: 'Data Export',
    data_export_started: 'Your data export has been initiated. You will receive an email when it is ready to download.',
    profile_updated: 'Profile Updated',
    profile_update_success: 'Your profile information has been successfully updated.',
    password_changed: 'Password Changed',
    password_change_success: 'Your password has been successfully changed.',
    
    // User profile
    body_metrics: 'Body Metrics',
    body_metrics_description: 'Enter your physical details to get personalized recommendations',
    birth_year: 'Birth Year',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    select_gender: 'Select Gender',
    activity_level: 'Activity Level',
    sedentary: 'Sedentary',
    light_activity: 'Light Activity',
    moderate_activity: 'Moderate Activity',
    active: 'Active',
    very_active: 'Very Active',
    select_activity_level: 'Select Activity Level',
    save_changes: 'Save Changes',
    privacy_settings_description: 'Manage your privacy preferences',
    profile_visibility: 'Profile Visibility',
    profile_visibility_description: 'Allow others to view your profile in the community',
    data_collection: 'Data Collection',
    data_collection_description: 'Allow us to collect anonymous usage data to improve the app',
    third_party_sharing: 'Third Party Sharing',
    third_party_sharing_description: 'Allow sharing your data with third-party services',
    email_notifications: 'Email Notifications',
    email_notifications_description: 'Receive important updates and newsletters via email',
    app_notifications: 'App Notifications',
    app_notifications_description: 'Receive notifications within the app',
    daily_reminder: 'Daily Reminder',
    daily_reminder_description: 'Get a daily reminder to log your meals and exercise',
    weekly_report: 'Weekly Report',
    weekly_report_description: 'Receive a weekly summary of your progress',
    appearance_description: 'Customize the look and feel of the application',
    current_password: 'Current Password',
    new_password: 'New Password',
    confirm_password: 'Confirm Password',
    update_password: 'Update your account password',
    change_password: 'Change Password',
    update_personal_info: 'Update your personal information',
    data_management: 'Data Management',
    data_management_description: 'Manage your personal data',
    export_your_data: 'Export Your Data',
    export_data_description: 'Download all your data in a standard format',
    download_data: 'Download Data',
    delete_account: 'Delete Account',
    delete_account_description: 'Permanently delete your account and all associated data',
    phone: 'Phone',
    country: 'Country',
    nutrition_goals: 'Nutrition Goals',
    nutrition_goals_description: 'Set your daily nutrition targets',
    save_goals: 'Save Goals',
    waterGoal: 'Water Goal',
    unlocked: 'Unlocked',
    view_all_achievements: 'View All Achievements',
    add_habit: 'Add Habit',
    complete_all: 'Complete All',
    search_community: 'Search Community',
    whats_on_your_mind: "What's on your mind?",
    post: 'Post',
    add_photo: 'Add Photo',
    day: 'Day',
    members: 'Members',
    join_group: 'Join Group',
    find_friends: 'Find Friends',
    friends_description: 'Connect with people who share your health and fitness goals',
    view_all_challenges: 'View All Challenges',
    to: 'to',
    transfer_data: 'Transfer Data',
    delete_data: 'Delete Data',
    get_premium: 'Get Premium',
    learn_more: 'Learn More',
    monthly: 'Monthly',
    yearly: 'Yearly',
    unlock_features: 'Unlock all CaloriX features',
    advanced_analytics: 'Advanced Analytics',
    personalized_recommendations: 'Personalized Recommendations',
    premium_recipes: 'Premium Recipes',
    ad_free: 'Ad-Free Experience',
    priority_support: 'Priority Support',
    stats: 'Statistics',
    active_days: 'Active Days',
    tracked_calories: 'Tracked Calories',
    goals_met: 'Goals Met',
    logout: 'Logout',
    my_account: 'My Account',
    calories_per_day: '{{amount}} calories/day',
    billed_monthly: 'Billed monthly',
    billed_yearly: 'Billed yearly, {{amount}} total',
    days_free: '{{days}} days free',
    save_percentage: 'Save {{percent}}%',
    premium_member: 'Premium Member',
    get_started: 'Get Started',
    best_value: 'Best Value',
  },
  ru: {
    // Login and Registration
    welcome: 'Добро пожаловать в CaloriX',
    login: 'Вход',
    register: 'Регистрация',
    email: 'Email',
    password: 'Пароль',
    confirm_password: 'Подтвердите пароль',
    name: 'Имя',
    forgot_password: 'Забыли пароль?',
    dont_have_account: 'Нет аккаунта?',
    already_have_account: 'Уже есть аккаунт?',
    sign_up: 'Зарегистрироваться',
    sign_in: 'Войти',
    
    // Dashboard
    dashboard: 'Панель управления',
    analytics: 'Аналитика',
    planner: 'Планировщик питания',
    recipes: 'Рецепты',
    progress: 'Прогресс',
    community: 'Сообщество',
    settings: 'Настройки',
    profile: 'Профиль',
    
    // Dashboard Content
    today_stats: 'Статистика за сегодня',
    calories_consumed: 'Потреблено калорий',
    remaining: 'Осталось',
    water: 'Вода',
    glasses: 'стаканов',
    steps: 'Шаги',
    macronutrients: 'Макронутриенты',
    protein: 'Белки',
    carbs: 'Углеводы',
    fat: 'Жиры',
    diary: 'Дневник питания',
    breakfast: 'Завтрак',
    lunch: 'Обед',
    dinner: 'Ужин',
    snack: 'Перекус',
    add_food: 'Добавить продукт',
    
    // Food and Nutrition
    food: 'Еда',
    meal: 'Прием пищи',
    portion: 'Порция',
    calories: 'Калории',
    kcal: 'ккал',
    nutrition: 'Питание',
    nutrients: 'Питательные вещества',
    serving: 'Порция',
    amount: 'Количество',
    unit: 'Единица измерения',
    grams: 'граммы',
    milliliters: 'миллилитры',
    
    // Analytics
    calorie_consumption: 'Потребление калорий',
    meal_distribution: 'Распределение по приемам пищи',
    top_foods: 'Топ продуктов',
    calories_burned: 'Сожженные калории',
    burned: 'Сожжено',
    goals_comparison: 'Сравнение с целями',
    below_goal: 'ниже цели',
    above_goal: 'выше цели',
    
    // Meal Planning
    meal_planner: 'Планировщик питания',
    day: 'День',
    week: 'Неделя',
    month: 'Месяц',
    select_template: 'Выбрать шаблон',
    daily_nutrition: 'Ежедневное питание',
    shopping_list: 'Список покупок',
    add_item: 'Добавить позицию',
    save_list: 'Сохранить список',
    add_meal: 'Добавить прием пищи',
    
    // Recipe
    recipe: 'Рецепт',
    recipes: 'Рецепты',
    recipe_calculator: 'Калькулятор рецептов',
    ingredients: 'Ингредиенты',
    instructions: 'Инструкции',
    preparation_time: 'Время подготовки',
    cooking_time: 'Время приготовления',
    servings: 'Порции',
    difficulty: 'Сложность',
    tags: 'Теги',
    save_recipe: 'Сохранить рецепт',
    edit_recipe: 'Редактировать рецепт',
    delete_recipe: 'Удалить рецепт',
    add_ingredients: 'Добавить ингредиенты',
    add_instructions: 'Добавить инструкции',
    
    // Progress
    weight: 'Вес',
    weight_dynamics: 'Динамика веса',
    current_weight: 'Текущий вес',
    target_weight: 'Целевой вес',
    goals: 'Цели',
    achievements: 'Достижения',
    habits: 'Привычки',
    streak: 'Серия',
    days: 'дней',
    
    // Community
    feed: 'Лента',
    challenges: 'Челленджи',
    groups: 'Группы',
    friends: 'Друзья',
    join_challenge: 'Присоединиться к челленджу',
    create_post: 'Создать пост',
    like: 'Лайк',
    comment: 'Комментарий',
    share: 'Поделиться',
    
    // Profile & Settings
    account_settings: 'Настройки аккаунта',
    personal_info: 'Личная информация',
    notification_settings: 'Настройки уведомлений',
    privacy_settings: 'Настройки приватности',
    appearance: 'Внешний вид',
    theme: 'Тема',
    language: 'Язык',
    light: 'Светлая',
    dark: 'Темная',
    system: 'Системная',
    
    // General
    save: 'Сохранить',
    cancel: 'Отменить',
    delete: 'Удалить',
    edit: 'Редактировать',
    add: 'Добавить',
    remove: 'Удалить',
    search: 'Поиск',
    filter: 'Фильтр',
    sort: 'Сортировка',
    view: 'Просмотр',
    more: 'Больше',
    less: 'Меньше',
    
    // Time periods
    today: 'Сегодня',
    yesterday: 'Вчера',
    weekly: 'Еженедельно',
    monthly: 'Ежемесячно',
    yearly: 'Ежегодно',
    
    // Status messages
    loading: 'Загрузка...',
    error_occurred: 'Произошла ошибка',
    no_data: 'Нет доступных данных',
    coming_soon: 'Скоро',
    
    // Metrics
    height: 'Рост',
    weight: 'Вес',
    age: 'Возраст',
    gender: 'Пол',
    
    // Misc
    getting_started: 'Начало работы',
    tips: 'Советы',
    explore: 'Исследовать',
    premium: 'Премиум',
    upgrade: 'Улучшить',
    help: 'Помощь',
    support: 'Поддержка',
    feedback: 'Обратная связь',
    share_app: 'Поделиться приложением',
    rate_app: 'Оценить приложение',
    visit_website: 'Посетить сайт',
    follow_social: 'Подписаться в соцсетях',
    your_name: 'Ваше имя',
    your_email: 'Ваш email',
    your_phone: 'Ваш телефон',
    your_country: 'Ваша страна',
    
    // Additional keys
    start: 'Начало',
    left: 'Осталось',
    active: 'Активный',
    completed: 'Завершенный',
    participants: 'Участники',
    duplicate: 'Дублировать',
    add_to_favorites: 'Добавить в избранное',
    nutrition_analysis: 'Анализ питания',
    per_100g: 'На 100г',
    
    // Notifications
    food_added: 'Продукт добавлен',
    added_to: 'добавлен в',
    settings_saved: 'Настройки сохранены',
    settings_saved_description: 'Ваши настройки были успешно обновлены.',
    data_export: 'Экспорт данных',
    data_export_started: 'Экспорт ваших данных начат. Вы получите уведомление, когда данные будут готовы для скачивания.',
    profile_updated: 'Профиль обновлен',
    profile_update_success: 'Информация вашего профиля была успешно обновлена.',
    password_changed: 'Пароль изменен',
    password_change_success: 'Ваш пароль был успешно изменен.',
    
    // User profile
    body_metrics: 'Параметры тела',
    body_metrics_description: 'Введите ваши физические данные для получения персональных рекомендаций',
    birth_year: 'Год рождения',
    gender: 'Пол',
    male: 'Мужской',
    female: 'Женский',
    other: 'Другой',
    select_gender: 'Выберите пол',
    activity_level: 'Уровень активности',
    sedentary: 'Малоподвижный',
    light_activity: 'Легкая активность',
    moderate_activity: 'Умеренная активность',
    active: 'Активный',
    very_active: 'Очень активный',
    select_activity_level: 'Выберите уровень активности',
    save_changes: 'Сохранить изменения',
    privacy_settings_description: 'Управляйте настройками конфиденциальности',
    profile_visibility: 'Видимость профиля',
    profile_visibility_description: 'Разрешить другим пользователям видеть ваш профиль в сообществе',
    data_collection: 'Сбор данных',
    data_collection_description: 'Разрешить сбор анонимных данных об использовании для улучшения приложения',
    third_party_sharing: 'Передача данных третьим сторонам',
    third_party_sharing_description: 'Разрешить передачу ваших данных сторонним сервисам',
    email_notifications: 'Уведомления по электронной почте',
    email_notifications_description: 'Получать важные обновления и новости по электронной почте',
    app_notifications: 'Уведомления в приложении',
    app_notifications_description: 'Получать уведомления в приложении',
    daily_reminder: 'Ежедневное напоминание',
    daily_reminder_description: 'Получать ежедневное напоминание о записи приемов пищи и физической активности',
    weekly_report: 'Еженедельный отчет',
    weekly_report_description: 'Получать еженедельную сводку о вашем прогрессе',
    appearance_description: 'Настройте внешний вид приложения',
    current_password: 'Текущий пароль',
    new_password: 'Новый пароль',
    confirm_password: 'Подтвердите пароль',
    update_password: 'Обновите пароль вашего аккаунта',
    change_password: 'Изменить пароль',
    update_personal_info: 'Обновите вашу личную информацию',
    data_management: 'Управление данными',
    data_management_description: 'Управляйте вашими персональными данными',
    export_your_data: 'Экспорт ваших данных',
    export_data_description: 'Скачайте все ваши данные в стандартном формате',
    download_data: 'Скачать данные',
    delete_account: 'Удалить аккаунт',
    delete_account_description: 'Окончательно удалить ваш аккаунт и все связанные данные',
    phone: 'Телефон',
    country: 'Страна',
    nutrition_goals: 'Цели по питанию',
    nutrition_goals_description: 'Установите ваши ежедневные цели по питанию',
    save_goals: 'Сохранить цели',
    waterGoal: 'Цель по воде',
    unlocked: 'Разблокировано',
    view_all_achievements: 'Все достижения',
    add_habit: 'Добавить привычку',
    complete_all: 'Выполнить все',
    search_community: 'Поиск в сообществе',
    whats_on_your_mind: 'О чём вы думаете?',
    post: 'Опубликовать',
    add_photo: 'Добавить фото',
    day: 'День',
    members: 'Участники',
    join_group: 'Вступить в группу',
    find_friends: 'Найти друзей',
    friends_description: 'Общайтесь с людьми, которые разделяют ваши цели в здоровье и фитнесе',
    view_all_challenges: 'Все челленджи',
    to: 'в',
    transfer_data: 'Перенос данных',
    delete_data: 'Удалить данные',
    get_premium: 'Перейти на премиум',
    learn_more: 'Подробнее',
    monthly: 'Ежемесячно',
    yearly: 'Ежегодно',
    unlock_features: 'Откройте все возможности CaloriX',
    advanced_analytics: 'Расширенная аналитика',
    personalized_recommendations: 'Персональные рекомендации',
    premium_recipes: 'Премиум-рецепты',
    ad_free: 'Без рекламы',
    priority_support: 'Приоритетная поддержка',
    stats: 'Статистика',
    active_days: 'Активных дней',
    tracked_calories: 'Отслеженных калорий',
    goals_met: 'Достигнутых целей',
    logout: 'Выйти',
    my_account: 'Мой аккаунт',
    calories_per_day: '{{amount}} калорий/день',
    billed_monthly: 'Ежемесячный платеж',
    billed_yearly: 'Ежегодный платеж, всего {{amount}}',
    days_free: '{{days}} дней бесплатно',
    save_percentage: 'Экономия {{percent}}%',
    premium_member: 'Премиум-участник',
    get_started: 'Начать',
    best_value: 'Выгодное предложение',
  }
};

// Provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');
  const [loading, setLoading] = useState(true);
  
  // Load language preference from local storage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
      setLanguage(savedLanguage);
    }
    setLoading(false);
  }, []);
  
  // Save language preference to local storage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  // Translation function
  const translate = (key: string): string => {
    if (!translations[language]) {
      return key;
    }
    
    return translations[language][key] || key;
  };
  
  const value: LanguageContextProps = {
    language,
    setLanguage,
    translate,
    loading,
    availableLanguages,
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Enhanced Language Provider with additional functionality
export const EnhancedLanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const { language } = useContext(LanguageContext);
  
  // Function to translate text with embedded translation keys using macros like {{key}}
  const translateMacro = (text: string): string => {
    if (!text) return '';
    
    // Look for patterns like {{key}} and replace with translations
    return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      return translations[language]?.[key] || key;
    });
  };
  
  const value: EnhancedLanguageContextProps = {
    isEnglish: language === 'en',
    translateMacro,
  };
  
  return (
    <EnhancedLanguageContext.Provider value={value}>
      {children}
    </EnhancedLanguageContext.Provider>
  );
};

// Custom hooks for easy access to the context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useEnhancedLanguage = () => {
  const context = useContext(EnhancedLanguageContext);
  if (context === undefined) {
    throw new Error('useEnhancedLanguage must be used within an EnhancedLanguageProvider');
  }
  return context;
};
