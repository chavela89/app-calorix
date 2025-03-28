
import React from 'react';

export interface MealCardActionsProps {
  children: React.ReactNode;
}

export function MealCardActions({ children }: MealCardActionsProps) {
  return (
    <div className="flex items-center">
      {children}
    </div>
  );
}
