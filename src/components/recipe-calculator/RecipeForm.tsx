
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RecipeFormProps {
  recipeName: string;
  setRecipeName: (name: string) => void;
  servings: string;
  setServings: (servings: string) => void;
  totalWeight: string;
  setTotalWeight: (weight: string) => void;
}

export function RecipeForm({
  recipeName,
  setRecipeName,
  servings,
  setServings,
  totalWeight,
  setTotalWeight
}: RecipeFormProps) {
  const { translate } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translate("recipe_name")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="recipeName">{translate("recipe_name")}</Label>
            <Input 
              id="recipeName" 
              value={recipeName} 
              onChange={(e) => setRecipeName(e.target.value)} 
              placeholder={translate("enter_recipe_name")}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="servings">{translate("servings")}</Label>
              <Input 
                id="servings" 
                type="number" 
                value={servings} 
                onChange={(e) => setServings(e.target.value)} 
              />
            </div>
            <div>
              <Label htmlFor="totalWeight">{translate("weight")} (g)</Label>
              <Input 
                id="totalWeight" 
                type="number" 
                value={totalWeight} 
                onChange={(e) => setTotalWeight(e.target.value)} 
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
