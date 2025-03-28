
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

export function UserProfileForm() {
  const { user, updateUser } = useUser();
  const { translate } = useLanguage();
  
  const [formData, setFormData] = useState({
    height: user?.bodyMetrics?.height || 170,
    weight: user?.bodyMetrics?.weight || 70,
    targetWeight: user?.bodyMetrics?.targetWeight || 65,
    birthYear: user?.bodyMetrics?.birthYear || 1990,
    gender: user?.bodyMetrics?.gender || "male",
    activityLevel: user?.bodyMetrics?.activityLevel || "moderate"
  });
  
  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user profile
    updateUser({
      ...user!,
      bodyMetrics: formData
    });
    
    toast({
      title: translate("profile_updated"),
      description: translate("profile_update_success"),
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{translate("body_metrics")}</CardTitle>
        <CardDescription>
          {translate("body_metrics_description")}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">{translate("height")} (см)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => handleChange("height", parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">{translate("current_weight")} (кг)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => handleChange("weight", parseFloat(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetWeight">{translate("target_weight")} (кг)</Label>
              <Input
                id="targetWeight"
                type="number"
                step="0.1"
                value={formData.targetWeight}
                onChange={(e) => handleChange("targetWeight", parseFloat(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="birthYear">{translate("birth_year")}</Label>
              <Input
                id="birthYear"
                type="number"
                value={formData.birthYear}
                onChange={(e) => handleChange("birthYear", parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">{translate("gender")}</Label>
              <Select 
                value={formData.gender} 
                onValueChange={(value) => handleChange("gender", value)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder={translate("select_gender")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{translate("male")}</SelectItem>
                  <SelectItem value="female">{translate("female")}</SelectItem>
                  <SelectItem value="other">{translate("other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="activityLevel">{translate("activity_level")}</Label>
              <Select 
                value={formData.activityLevel} 
                onValueChange={(value) => handleChange("activityLevel", value)}
              >
                <SelectTrigger id="activityLevel">
                  <SelectValue placeholder={translate("select_activity_level")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">{translate("sedentary")}</SelectItem>
                  <SelectItem value="light">{translate("light_activity")}</SelectItem>
                  <SelectItem value="moderate">{translate("moderate_activity")}</SelectItem>
                  <SelectItem value="active">{translate("active")}</SelectItem>
                  <SelectItem value="very_active">{translate("very_active")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">{translate("save_changes")}</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
