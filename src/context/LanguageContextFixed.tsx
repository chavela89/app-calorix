
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
    recipes_label: 'Recipes',
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
    weight_label: 'Weight',
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
    age: 'Age',
    gender: 'Gender',
    
    // Misc
    getting_started: 'Getting Started',
    tips: 'Tips',
    explore: 'Explore',
    premium: 'Premium',
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
    select_gender: 'Select Gender',
    activity_level: 'Activity Level',
    sedentary: 'Sedentary',
    light_activity: 'Light Activity',
    moderate_activity: 'Moderate Activity',
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
    product_found: 'Product found',
    barcode_scanned: 'Barcode scanned',
    camera_error: 'Camera Error',
    camera_permission_denied: 'Camera permission denied',
    camera_not_supported: 'Camera not supported',
    camera_not_supported_description: 'Your device does not support camera access',
    item_duplicated: 'Item duplicated',
    item_added_to_meal: 'Item added to meal',
    added_to_favorites: 'Added to favorites',
    item_added_to_favorites: 'Item added to favorites',
    edit_food: 'Edit food',
    edit_food_description: 'Edit food information',
    item_deleted: 'Item deleted',
    item_removed_from_meal: 'Item removed from meal',
    scan_barcode: 'Scan barcode',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    weight_value: 'Weight',
    premium_activated: 'Premium activated',
    premium_activated_description: 'You now have access to all premium features',
    testimonial_1: 'CaloriX Premium has completely changed the way I track my nutrition. The photo recognition feature saves me so much time!',
    testimonial_2: 'The advanced analytics helped me understand my eating patterns and finally reach my goals.',
    photo_recognition: 'Photo Recognition',
    photo_recognition_description: 'Instantly identify foods and track calories with your camera',
    advanced_analytics_description: 'Get detailed insights about your nutrition habits',
    ad_free_description: 'Enjoy the app without any advertisements',
    voice_input: 'Voice Input',
    voice_input_description: 'Add foods to your diary using voice commands',
    custom_themes: 'Custom Themes',
    custom_themes_description: 'Personalize the app with exclusive themes and colors',
    nutritionist_consultation: 'Nutritionist Consultation',
    nutritionist_consultation_description: 'Get professional advice from certified nutritionists',
    calorie_tracking: 'Calorie Tracking',
    calorie_tracking_description: 'Track your daily calorie intake',
    meal_planning_description: 'Plan your meals ahead of time',
    progress_tracking_description: 'Monitor your progress towards your goals',
    basic_recipes: 'Basic Recipes',
    basic_recipes_description: 'Access to a library of basic recipes',
    water_tracking_description: 'Track your daily water intake',
    premium_features: 'Premium Features',
    basic_features: 'Basic Features',
    basic_features_included: 'All basic features are included with premium',
    testimonials: 'Testimonials',
    popular: 'Popular',
    subscribe_now: 'Subscribe Now',
    cancel_anytime: 'Cancel anytime. No commitment required.',
    payment_processed_by: 'Payment processed by Stripe',
    money_back_guarantee: '30-Day Money Back Guarantee',
    money_back_guarantee_description: 'If you\'re not satisfied within 30 days, we\'ll refund your payment',
    upgrade_to_premium: 'Upgrade to Premium',
    premium_description: 'Unlock powerful features to supercharge your nutrition tracking',
    monthly_subscription: 'Monthly Subscription',
    yearly_subscription: 'Yearly Subscription',
    billed_annually: 'Billed annually',
    save_30: 'Save 30%',
    month: 'month',
    go_premium: 'Go Premium',
    your_daily_goal: 'Your daily goal',
    maintaining_weight: 'maintaining weight',
    losing_weight: 'losing weight',
    these_calories_for: 'These calories are for',
    consumed: 'Consumed',
    goal: 'Goal',
    recommended_macros_balance: 'Recommended macros balance',
    upgrade: 'Upgrade',
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
    recipes_label: 'Рецепты',
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
    weight_label: 'Вес',
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
    age: 'Возраст',
    gender: 'Пол',
    
    // Misc
    getting_started: 'Начало работы',
    tips: 'Советы',
    explore: 'Исследовать',
    premium: 'Премиум',
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
    select_gender: 'Выберите пол',
    activity_level: 'Уровень активности',
    sedentary: 'Малоподвижный',
    light_activity: 'Легкая активность',
    moderate_activity: 'Умеренная активность',
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
    product_found: 'Продукт найден',
    barcode_scanned: 'Штрихкод отсканирован',
    camera_error: 'Ошибка камеры',
    camera_permission_denied: 'Доступ к камере запрещен',
    camera_not_supported: 'Камера не поддерживается',
    camera_not_supported_description: 'Ваше устройство не поддерживает доступ к камере',
    item_duplicated: 'Элемент дублирован',
    item_added_to_meal: 'Элемент добавлен в прием пищи',
    added_to_favorites: 'Добавлено в избранное',
    item_added_to_favorites: 'Элемент добавлен в избранное',
    edit_food: 'Редактировать продукт',
    edit_food_description: 'Редактировать информацию о продукте',
    item_deleted: 'Элемент удален',
    item_removed_from_meal: 'Элемент удален из приема пищи',
    scan_barcode: 'Сканировать штрихкод',
    male: 'Мужской',
    female: 'Женский',
    other: 'Другой',
    weight_value: 'Вес',
    premium_activated: 'Премиум активирован',
    premium_activated_description: 'Теперь у вас есть доступ ко всем премиум-функциям',
    testimonial_1: 'Премиум-версия CaloriX полностью изменила способ учета моего питания. Функция распознавания фотографий экономит мне столько времени!',
    testimonial_2: 'Расширенная аналитика помогла мне понять мои привычки в еде и наконец-то достичь своих целей.',
    photo_recognition: 'Распознавание фото',
    photo_recognition_description: 'Мгновенно идентифицируйте продукты и отслеживайте калории с помощью камеры',
    advanced_analytics_description: 'Получайте подробные сведения о ваших привычках питания',
    ad_free_description: 'Используйте приложение без рекламы',
    voice_input: 'Голосовой ввод',
    voice_input_description: 'Добавляйте продукты в свой дневник с помощью голосовых команд',
    custom_themes: 'Пользовательские темы',
    custom_themes_description: 'Персонализируйте приложение с эксклюзивными темами и цветами',
    nutritionist_consultation: 'Консультация диетолога',
    nutritionist_consultation_description: 'Получайте профессиональные советы от сертифицированных диетологов',
    calorie_tracking: 'Отслеживание калорий',
    calorie_tracking_description: 'Отслеживайте ежедневное потребление калорий',
    meal_planning_description: 'Планируйте приемы пищи заранее',
    progress_tracking_description: 'Следите за своим прогрессом к целям',
    basic_recipes: 'Базовые рецепты',
    basic_recipes_description: 'Доступ к библиотеке базовых рецептов',
    water_tracking_description: 'Отслеживайте ежедневное потребление воды',
    premium_features: 'Премиум-функции',
    basic_features: 'Базовые функции',
    basic_features_included: 'Все базовые функции включены в премиум',
    testimonials: 'Отзывы',
    popular: 'Популярное',
    subscribe_now: 'Подписаться сейчас',
    cancel_anytime: 'Отменить в любое время. Без обязательств.',
    payment_processed_by: 'Платеж обрабатывается Stripe',
    money_back_guarantee: 'Гарантия возврата денег в течение 30 дней',
    money_back_guarantee_description: 'Если вы не удовлетворены в течение 30 дней, мы вернем ваш платеж',
    upgrade_to_premium: 'Перейти на премиум',
    premium_description: 'Разблокируйте мощные функции для улучшения отслеживания питания',
    monthly_subscription: 'Месячная подписка',
    yearly_subscription: 'Годовая подписка',
    billed_annually: 'Списание раз в год',
    save_30: 'Экономия 30%',
    month: 'месяц',
    go_premium: 'Перейти на премиум',
    your_daily_goal: 'Ваша дневная цель',
    maintaining_weight: 'поддержания веса',
    losing_weight: 'снижения веса',
    these_calories_for: 'Эти калории для',
    consumed: 'Потреблено',
    goal: 'Цель',
    recommended_macros_balance: 'Рекомендуемый баланс макронутриентов',
    upgrade: 'Улучшить',
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
  
  const value: EnhancedLanguageContextProps = {
    isEnglish: language === 'en',
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
