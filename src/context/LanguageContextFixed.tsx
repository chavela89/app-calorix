
import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from "react";

// Define types for translation
type TranslationKey = string;
type Translation = Record<TranslationKey, string>;
type Language = "ru" | "en";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: TranslationKey, variables?: Record<string, string | number>) => string;
  availableLanguages: { code: Language; label: string }[];
  refreshTranslations: () => void;
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
  
  // Common date and time
  today: "Сегодня",
  yesterday: "Вчера",
  tomorrow: "Завтра",
  day: "День",
  week: "Неделя",
  month: "Месяц",
  year: "Год",
  
  // Months
  january: "Январь",
  february: "Февраль",
  march: "Март",
  april: "Апрель",
  may: "Май",
  june: "Июнь",
  july: "Июль",
  august: "Август",
  september: "Сентябрь",
  october: "Октябрь",
  november: "Ноябрь",
  december: "Декабрь",
  
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
  calorie_consumption: "Потребление калорий",
  meal_distribution: "Распределение приемов пищи",
  top_foods: "Топ продуктов",
  calories_burned: "Сожжено калорий",
  goals_comparison: "Сравнение с целями",
  meal_planner: "Планировщик питания",
  daily_nutrition: "Ежедневное питание",
  shopping_list: "Список покупок",
  
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
  all_recipes: "Все рецепты",
  vegetarian: "Вегетарианское",
  high_protein: "Высокий белок",
  low_carb: "Низкоуглеводное",
  quick_meal: "Быстрое блюдо",
  gluten_free: "Без глютена",
  dairy_free: "Без лактозы",
  enter_recipe_name: "Введите название рецепта",
  ingredient: "Ингредиент",
  select_ingredient: "Выберите ингредиент",
  quantity: "Количество",
  nutritional_value: "Пищевая ценность",
  per_serving: "На порцию",
  per_100g: "На 100г",
  save_recipe: "Сохранить рецепт",
  no_ingredients_added: "Нет добавленных ингредиентов",
  recipe_saved_successfully: "Рецепт успешно сохранен",
  cost: "Стоимость",
  view_recipe: "Посмотреть рецепт",
  weight: "Вес",
  min: "мин",
  search_recipes: "Поиск рецептов",
  
  // Food items
  chicken_breast: "Куриная грудка",
  buckwheat: "Гречка",
  cottage_cheese: "Творог 5%",
  apple: "Яблоко",
  
  // Progress page
  current_weight: "Текущий вес",
  streak: "Серия",
  days: "Дней",
  statistics: "Статистика",
  weight_dynamics: "Динамика веса",
  nutrition: "Питание",
  target: "Цель",
  target_weight: "Целевой вес",
  start: "Старт",
  left: "Осталось",
  best: "Лучший",
  active_days: "Активных дней",
  tracked_calories: "Отслежено калорий",
  goals_met: "Целей достигнуто",
  weekly: "Еженедельно",
  monthly: "Ежемесячно",
  yearly: "Ежегодно",
  calorie_goals: "Цели по калориям",
  target_calories: "Целевые калории",
  actual_calories: "Фактические калории",
  unlocked: "Разблокировано",
  add_habit: "Добавить привычку",
  complete_all: "Выполнить все",
  view_all_achievements: "Все достижения",
  
  // Community page
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
  add_photo: "Добавить фото",
  post: "Опубликовать",
  participants: "Участники",
  completed: "Завершено",
  active: "Активно",
  view_all_challenges: "Все челленджи",
  members: "Участники",
  join_group: "Вступить в группу",
  find_friends: "Найти друзей",
  friends_description: "Найдите друзей для совместного достижения целей",
  
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
  body_metrics: "Параметры тела",
  body_metrics_description: "Обновите ваши физические параметры",
  update_personal_info: "Обновите личную информацию",
  name: "Имя",
  email: "Электронная почта",
  phone: "Телефон",
  country: "Страна",
  save_changes: "Сохранить изменения",
  update_password: "Обновите пароль",
  current_password: "Текущий пароль",
  new_password: "Новый пароль",
  confirm_password: "Подтвердите пароль",
  nutrition_goals: "Цели по питанию",
  nutrition_goals_description: "Настройте ваши ежедневные цели питания",
  save_goals: "Сохранить цели",
  notification_settings_description: "Настройте как вы хотите получать уведомления",
  email_notifications: "Уведомления по email",
  email_notifications_description: "Получайте важные обновления по электронной почте",
  app_notifications: "Уведомления в приложении",
  app_notifications_description: "Получайте уведомления в приложении",
  daily_reminder: "Ежедневное напоминание",
  daily_reminder_description: "Получайте напоминание о записи приемов пищи",
  weekly_report: "Еженедельный отчет",
  weekly_report_description: "Получайте еженедельный отчет о вашем прогрессе",
  appearance: "Внешний вид",
  appearance_description: "Настройте внешний вид приложения",
  profile_visibility: "Видимость профиля",
  profile_visibility_description: "Настройки отображения вашего профиля для других пользователей",
  data_collection: "Сбор данных",
  data_collection_description: "Управление сбором данных о вашей активности для улучшения сервиса",
  third_party_sharing: "Передача данных третьим лицам",
  third_party_sharing_description: "Контроль над тем, какие данные могут быть доступны нашим партнерам",
  data_management: "Управление данными",
  data_management_description: "Управляйте вашими личными данными",
  export_your_data: "Экспорт ваших данных",
  export_data_description: "Скачайте копию всех ваших данных",
  download_data: "Скачать данные",
  delete_account: "Удалить аккаунт",
  delete_account_description: "Безвозвратно удалить ваш аккаунт и все данные",
  
  // User profile
  current_weight: "Текущий вес",
  target_weight: "Целевой вес",
  birth_year: "Год рождения",
  gender: "Пол",
  male: "Мужской",
  female: "Женский",
  other: "Другой",
  activity_level: "Уровень активности",
  sedentary: "Сидячий образ жизни",
  light_activity: "Легкая активность",
  moderate_activity: "Умеренная активность",
  active: "Активный образ жизни",
  very_active: "Очень активный образ жизни",
  your_name: "Ваше имя",
  your_email: "Ваш email",
  your_phone: "Ваш телефон",
  your_country: "Ваша страна",
  
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
  upgrade_to_premium: "Улучшить до Премиум",
  premium_description: "Разблокируйте все функции и улучшите свой опыт",
  premium_features: "Премиум функции",
  basic_features: "Базовые функции",
  testimonials: "Отзывы",
  testimonial_1: "Премиум версия полностью изменила мой подход к питанию. Рекомендую всем!",
  testimonial_2: "Аналитика и рецепты в премиум-версии стоят каждой копейки. Лучшее приложение!",
  photo_recognition: "Распознавание фото",
  photo_recognition_description: "Сфотографируйте еду для автоматического определения калорий",
  advanced_analytics: "Расширенная аналитика",
  advanced_analytics_description: "Подробные графики и индивидуальные рекомендации",
  ad_free: "Без рекламы",
  ad_free_description: "Наслаждайтесь приложением без рекламы",
  voice_input: "Голосовой ввод",
  voice_input_description: "Добавляйте продукты с помощью голосовых команд",
  custom_themes: "Пользовательские темы",
  custom_themes_description: "Выбирайте из множества тем и цветовых схем",
  nutritionist_consultation: "Консультация диетолога",
  nutritionist_consultation_description: "Получите персональную консультацию от профессионального диетолога",
  calorie_tracking: "Отслеживание калорий",
  calorie_tracking_description: "Записывайте потребление калорий и продуктов",
  meal_planning: "Планирование питания",
  meal_planning_description: "Создавайте планы питания и добавляйте их в календарь",
  progress_tracking: "Отслеживание прогресса",
  progress_tracking_description: "Отслеживайте вес и другие показатели",
  basic_recipes: "Базовые рецепты",
  basic_recipes_description: "Доступ к базовой библиотеке рецептов",
  water_tracking: "Отслеживание воды",
  water_tracking_description: "Отслеживайте потребление воды",
  basic_features_included: "Эти функции включены во все планы, включая бесплатную версию",
  popular: "Популярный",
  subscribe_now: "Подписаться сейчас",
  cancel_anytime: "Отмена в любое время без штрафа",
  payment_processed_by: "Платеж обрабатывается безопасно",
  money_back_guarantee: "Гарантия возврата денег",
  money_back_guarantee_description: "Если вы не удовлетворены, мы вернем деньги в течение 14 дней",
  monthly_subscription: "Ежемесячная подписка",
  yearly_subscription: "Годовая подписка",
  billed_monthly: "Оплата ежемесячно",
  billed_annually: "Оплата ежегодно",
  save_30: "Экономия 30%",
  month: "месяц",
  premium_activated: "Премиум активирован",
  premium_activated_description: "Вы успешно активировали премиум план",
  
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
  tbsp: "ст.л",
  tsp: "ч.л",
  kcal: "ккал",
  goal: "Цель",
  
  // My account
  my_account: "Мой аккаунт",
  settings_saved: "Настройки сохранены",
  settings_saved_description: "Ваши настройки были успешно сохранены",
  password_changed: "Пароль изменен",
  password_change_success: "Ваш пароль был успешно изменен",
  data_export_started: "Экспорт данных начат",
  calendar: "Календарь",
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
  
  // Common date and time
  today: "Today",
  yesterday: "Yesterday",
  tomorrow: "Tomorrow",
  day: "Day",
  week: "Week",
  month: "Month",
  year: "Year",
  
  // Months
  january: "January",
  february: "February",
  march: "March",
  april: "April",
  may: "May",
  june: "June",
  july: "July",
  august: "August",
  september: "September",
  october: "October",
  november: "November",
  december: "December",
  
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
  calorie_consumption: "Calorie Consumption",
  meal_distribution: "Meal Distribution",
  top_foods: "Top Foods",
  calories_burned: "Calories Burned",
  goals_comparison: "Goals Comparison",
  meal_planner: "Meal Planner",
  daily_nutrition: "Daily Nutrition",
  shopping_list: "Shopping List",
  
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
  all_recipes: "All Recipes",
  vegetarian: "Vegetarian",
  high_protein: "High Protein",
  low_carb: "Low Carb",
  quick_meal: "Quick Meal",
  gluten_free: "Gluten Free",
  dairy_free: "Dairy Free",
  enter_recipe_name: "Enter recipe name",
  ingredient: "Ingredient",
  select_ingredient: "Select ingredient",
  quantity: "Quantity",
  nutritional_value: "Nutritional Value",
  per_serving: "Per Serving",
  per_100g: "Per 100g",
  save_recipe: "Save Recipe",
  no_ingredients_added: "No ingredients added",
  recipe_saved_successfully: "Recipe saved successfully",
  cost: "Cost",
  view_recipe: "View Recipe",
  weight: "Weight",
  min: "min",
  search_recipes: "Search recipes",
  
  // Food items
  chicken_breast: "Chicken breast",
  buckwheat: "Buckwheat",
  cottage_cheese: "Cottage cheese 5%",
  apple: "Apple",
  
  // Progress page
  current_weight: "Current Weight",
  streak: "Streak",
  days: "Days",
  statistics: "Statistics",
  weight_dynamics: "Weight Dynamics",
  nutrition: "Nutrition",
  target: "Target",
  target_weight: "Target Weight",
  start: "Start",
  left: "Left",
  best: "Best",
  active_days: "Active Days",
  tracked_calories: "Tracked Calories",
  goals_met: "Goals Met",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
  calorie_goals: "Calorie Goals",
  target_calories: "Target Calories",
  actual_calories: "Actual Calories",
  unlocked: "Unlocked",
  add_habit: "Add Habit",
  complete_all: "Complete All",
  view_all_achievements: "View All Achievements",
  
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
  add_photo: "Add Photo",
  post: "Post",
  participants: "Participants",
  completed: "Completed",
  active: "Active",
  view_all_challenges: "View All Challenges",
  members: "Members",
  join_group: "Join Group",
  find_friends: "Find Friends",
  friends_description: "Find friends to achieve goals together",
  
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
  body_metrics: "Body Metrics",
  body_metrics_description: "Update your physical parameters",
  update_personal_info: "Update your personal information",
  name: "Name",
  email: "Email",
  phone: "Phone",
  country: "Country",
  save_changes: "Save Changes",
  update_password: "Update your password",
  current_password: "Current Password",
  new_password: "New Password",
  confirm_password: "Confirm Password",
  nutrition_goals: "Nutrition Goals",
  nutrition_goals_description: "Configure your daily nutrition goals",
  save_goals: "Save Goals",
  notification_settings_description: "Configure how you want to receive notifications",
  email_notifications: "Email Notifications",
  email_notifications_description: "Receive important updates via email",
  app_notifications: "App Notifications",
  app_notifications_description: "Receive notifications in the app",
  daily_reminder: "Daily Reminder",
  daily_reminder_description: "Receive reminders to log your meals",
  weekly_report: "Weekly Report",
  weekly_report_description: "Receive a weekly report of your progress",
  appearance: "Appearance",
  appearance_description: "Configure the appearance of the app",
  profile_visibility: "Profile Visibility",
  profile_visibility_description: "Control how your profile appears to other users",
  data_collection: "Data Collection",
  data_collection_description: "Manage how we collect data about your activity to improve service",
  third_party_sharing: "Third Party Sharing",
  third_party_sharing_description: "Control what data can be accessed by our partners",
  data_management: "Data Management",
  data_management_description: "Manage your personal data",
  export_your_data: "Export Your Data",
  export_data_description: "Download a copy of all your data",
  download_data: "Download Data",
  delete_account: "Delete Account",
  delete_account_description: "Permanently delete your account and all data",
  
  // User profile
  current_weight: "Current Weight",
  target_weight: "Target Weight",
  birth_year: "Birth Year",
  gender: "Gender",
  male: "Male",
  female: "Female",
  other: "Other",
  activity_level: "Activity Level",
  sedentary: "Sedentary",
  light_activity: "Light Activity",
  moderate_activity: "Moderate Activity",
  active: "Active",
  very_active: "Very Active",
  your_name: "Your name",
  your_email: "Your email",
  your_phone: "Your phone",
  your_country: "Your country",
  
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
  upgrade_to_premium: "Upgrade to Premium",
  premium_description: "Unlock all features and enhance your experience",
  premium_features: "Premium Features",
  basic_features: "Basic Features",
  testimonials: "Testimonials",
  testimonial_1: "The premium version completely changed my approach to nutrition. Recommend to everyone!",
  testimonial_2: "The analytics and recipes in the premium version are worth every penny. Best app!",
  photo_recognition: "Photo Recognition",
  photo_recognition_description: "Take photos of your food for automatic calorie detection",
  advanced_analytics: "Advanced Analytics",
  advanced_analytics_description: "Detailed charts and personalized recommendations",
  ad_free: "Ad-Free",
  ad_free_description: "Enjoy the app without any ads",
  voice_input: "Voice Input",
  voice_input_description: "Add food items using voice commands",
  custom_themes: "Custom Themes",
  custom_themes_description: "Choose from a variety of themes and color schemes",
  nutritionist_consultation: "Nutritionist Consultation",
  nutritionist_consultation_description: "Get personal consultation from a professional nutritionist",
  calorie_tracking: "Calorie Tracking",
  calorie_tracking_description: "Log your calorie and food intake",
  meal_planning: "Meal Planning",
  meal_planning_description: "Create meal plans and add them to your calendar",
  progress_tracking: "Progress Tracking",
  progress_tracking_description: "Track your weight and other metrics",
  basic_recipes: "Basic Recipes",
  basic_recipes_description: "Access to basic recipe library",
  water_tracking: "Water Tracking",
  water_tracking_description: "Track your water intake",
  basic_features_included: "These features are included in all plans, including the free version",
  popular: "Popular",
  subscribe_now: "Subscribe Now",
  cancel_anytime: "Cancel anytime with no penalty",
  payment_processed_by: "Payment securely processed",
  money_back_guarantee: "Money Back Guarantee",
  money_back_guarantee_description: "If you're not satisfied, we'll refund your payment within 14 days",
  monthly_subscription: "Monthly Subscription",
  yearly_subscription: "Yearly Subscription",
  billed_monthly: "Billed monthly",
  billed_annually: "Billed annually",
  save_30: "Save 30%",
  month: "month",
  premium_activated: "Premium Activated",
  premium_activated_description: "You have successfully activated your premium plan",
  
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
  
  // My account
  my_account: "My Account",
  settings_saved: "Settings Saved",
  settings_saved_description: "Your settings have been successfully saved",
  password_changed: "Password Changed",
  password_change_success: "Your password has been successfully changed",
  data_export_started: "Data Export Started",
  calendar: "Calendar",
};

// Create language context
const LanguageContext = createContext<LanguageContextProps>({
  language: "ru",
  setLanguage: () => {},
  translate: () => "",
  availableLanguages: [
    { code: "ru", label: "Русский" },
    { code: "en", label: "English" }
  ],
  refreshTranslations: () => {}
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

  // Function to refresh translations, used when changing language
  const refreshTranslations = useCallback(() => {
    // This function is intentionally empty as it will be used as a dependency in useEffect
    // to trigger re-renders when needed
  }, [language]);

  // Save language on change
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate, availableLanguages, refreshTranslations }}>
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
  
  // Function to translate macronutrients and other special terms
  const translateMacro = (key: string): string => {
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
    switch(unit) {
      case "г":
        return isEnglish ? "g" : "г";
      case "мл":
        return isEnglish ? "ml" : "мл";
      case "шт":
        return isEnglish ? "pcs" : "шт";
      case "ст.л":
        return isEnglish ? "tbsp" : "ст.л";
      case "ч.л":
        return isEnglish ? "tsp" : "ч.л";
      default:
        return translateMacro(unit);
    }
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
