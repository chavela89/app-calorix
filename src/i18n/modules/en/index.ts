
import { auth } from './auth';
import { dashboard } from './dashboard';
import { food } from './food';
import { analytics } from './analytics';
import { mealPlanner } from './mealPlanner';
import { recipes } from './recipes';
import { progress } from './progress';
import { community } from './community';
import { profile } from './profile';
import { general } from './general';
import { time } from './time';
import { status } from './status';
import { metrics } from './metrics';
import { misc } from './misc';
import { notifications } from './notifications';
import { premium } from './premium';

// Combine all the translations into one object
export const enTranslations = {
  ...auth,
  ...dashboard,
  ...food,
  ...analytics,
  ...mealPlanner,
  ...recipes,
  ...progress,
  ...community,
  ...profile,
  ...general,
  ...time,
  ...status,
  ...metrics,
  ...misc,
  ...notifications,
  ...premium
};
