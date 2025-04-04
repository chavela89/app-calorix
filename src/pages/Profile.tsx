
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PremiumBanner } from "@/components/PremiumBanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileForm } from "@/components/UserProfileForm";
import { BarChart3, CalendarDays, List, Trophy, User2, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContextFixed";
import { toast } from "@/components/ui/use-toast";

export default function Profile() {
  const { user } = useUser();
  const { translate } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  const handleEditProfile = () => {
    toast({
      title: translate("profile_edit"),
      description: translate("profile_edit_success")
    });
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">{translate("profile")}</h1>

      <PremiumBanner />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* User Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-12 w-12 text-primary" />
                )}
              </div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              
              <div className="mt-4 w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{translate("experience")}</span>
                  <span className="text-sm">98 {translate("days")}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{translate("active_days")}</span>
                  <span className="text-sm">83 {translate("days")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{translate("achievements")}</span>
                  <span className="text-sm">12</span>
                </div>
              </div>
              
              <Button 
                className="mt-6 w-full" 
                variant="outline"
                onClick={handleEditProfile}
              >
                {translate("edit_profile")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue={activeTab} className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <Card>
              <CardHeader>
                <TabsList className="grid grid-cols-4 mb-2">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <List className="w-4 h-4" />
                    <span className="hidden sm:inline">{translate("overview")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="stats" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    <span className="hidden sm:inline">{translate("statistics")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span className="hidden sm:inline">{translate("achievements")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <User2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{translate("data")}</span>
                  </TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="pt-2">
                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">{translate("recent_activity")}</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="min-w-[48px] h-12 flex items-center justify-center rounded-full bg-primary/10">
                          <CalendarDays className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{translate("food_tracking")}</p>
                          <p className="text-sm text-muted-foreground">{translate("diary_streak_7")}</p>
                          <p className="text-xs text-muted-foreground">{translate("today")}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="min-w-[48px] h-12 flex items-center justify-center rounded-full bg-primary/10">
                          <Trophy className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{translate("achievement_unlocked")}</p>
                          <p className="text-sm text-muted-foreground">{translate("first_recipe")}</p>
                          <p className="text-xs text-muted-foreground">{translate("yesterday")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">{translate("current_goals")}</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{translate("calories")}</p>
                          <p className="text-sm text-muted-foreground">{translate("daily_goal")}</p>
                        </div>
                        <p className="font-medium">{user?.settings?.calorieGoal || 2200} {translate("kcal")}</p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{translate("protein")}</p>
                          <p className="text-sm text-muted-foreground">{translate("daily_goal")}</p>
                        </div>
                        <p className="font-medium">{user?.settings?.proteinGoal || 150} {translate("g")}</p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{translate("weight_label")}</p>
                          <p className="text-sm text-muted-foreground">{translate("target_weight")}</p>
                        </div>
                        <p className="font-medium">{user?.bodyMetrics?.targetWeight || 70} {translate("kg")}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="stats" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-4">{translate("nutrition_statistics")}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-3xl font-bold">83</p>
                            <p className="text-sm text-muted-foreground">{translate("active_days")}</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-3xl font-bold">156,427</p>
                            <p className="text-sm text-muted-foreground">{translate("tracked_calories")}</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-3xl font-bold">42</p>
                            <p className="text-sm text-muted-foreground">{translate("goals_met")}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="achievements" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-4">{translate("achievements")}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex flex-col items-center border rounded-lg p-4">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                          <Trophy className="w-8 h-8 text-green-600" />
                        </div>
                        <p className="font-medium text-center">{translate("first_week")}</p>
                        <p className="text-xs text-muted-foreground text-center">{translate("diary_streak_7")}</p>
                        <Badge className="mt-2">{translate("completed")}</Badge>
                      </div>
                      <div className="flex flex-col items-center border rounded-lg p-4">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                          <Trophy className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="font-medium text-center">{translate("first_month")}</p>
                        <p className="text-xs text-muted-foreground text-center">{translate("diary_streak_30")}</p>
                        <Badge className="mt-2">{translate("completed")}</Badge>
                      </div>
                      <div className="flex flex-col items-center border rounded-lg p-4">
                        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                          <Trophy className="w-8 h-8 text-purple-600" />
                        </div>
                        <p className="font-medium text-center">{translate("first_recipe")}</p>
                        <p className="text-xs text-muted-foreground text-center">{translate("create_own_recipe")}</p>
                        <Badge className="mt-2">{translate("completed")}</Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings">
                  <UserProfileForm />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
