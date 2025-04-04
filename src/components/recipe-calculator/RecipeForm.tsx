
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface RecipeFormProps {
  recipeName: string;
  setRecipeName: (name: string) => void;
  servings: string;
  setServings: (servings: string) => void;
  totalWeight: string;
  setTotalWeight: (weight: string) => void;
  recipeDescription: string;
  setRecipeDescription: (description: string) => void;
  instructions: string[];
  setInstructions: (instructions: string[]) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

export function RecipeForm({
  recipeName,
  setRecipeName,
  servings,
  setServings,
  totalWeight,
  setTotalWeight,
  recipeDescription,
  setRecipeDescription,
  instructions,
  setInstructions,
  selectedTags,
  setSelectedTags
}: RecipeFormProps) {
  const { translate } = useLanguage();
  const [currentInstruction, setCurrentInstruction] = useState("");
  
  // Available tags
  const availableTags = [
    "vegetarian", "high_protein", "low_carb", "quick_meal", 
    "gluten_free", "dairy_free", "chicken", "healthy"
  ];
  
  const handleAddInstruction = () => {
    if (currentInstruction.trim()) {
      setInstructions([...instructions, currentInstruction.trim()]);
      setCurrentInstruction("");
    }
  };
  
  const handleRemoveInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };
  
  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{translate("recipe_description")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            value={recipeDescription}
            onChange={(e) => setRecipeDescription(e.target.value)}
            placeholder={translate("recipe_description")}
            rows={3}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{translate("instructions")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input 
                value={currentInstruction}
                onChange={(e) => setCurrentInstruction(e.target.value)}
                placeholder={translate("add_instructions")}
                onKeyDown={(e) => e.key === 'Enter' && handleAddInstruction()}
              />
              <Button 
                variant="outline" 
                onClick={handleAddInstruction}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {instructions.length > 0 ? (
              <div className="space-y-2">
                {instructions.map((instruction, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border rounded">
                    <div className="flex items-start gap-2">
                      <span className="font-medium">{index + 1}.</span>
                      <p>{instruction}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveInstruction(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                {translate("add_instructions")}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{translate("tags")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleToggleTag(tag)}
              >
                {translate(tag)}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
