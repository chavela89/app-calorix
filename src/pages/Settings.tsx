
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";
import { UserProfileForm } from "@/components/UserProfileForm";
import { Button } from "@/components/ui/button";
import { ThemeSelector } from "@/components/ThemeSelector";
import { LanguageSelector } from "@/components/LanguageSelector";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  BellIcon, 
  DownloadIcon, 
  GlobeIcon, 
  KeyIcon, 
  MailIcon, 
  MoonIcon, 
  ShieldIcon, 
  SmartphoneIcon, 
  UserIcon 
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function Settings() {
  const { user, updateUser } = useUser();
  const { translate } = useLanguage();
  const [activeTab, setActiveTab] = useState("account");
  
  // Настройки уведомлений
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  
  const handleSaveGoals = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: translate("settings_saved"),
      description: translate("settings_saved_description"),
    });
  };
  
  const handleExportData = () => {
    toast({
      title: translate("data_export"),
      description: translate("data_export_started"),
    });
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: translate("password_changed"),
      description: translate("password_change_success"),
    });
  };
  
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">{translate("settings")}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Tabs 
            orientation="vertical" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex flex-col h-auto justify-start items-stretch bg-transparent space-y-1">
              <TabsTrigger 
                value="account" 
                className="justify-start"
              >
                <UserIcon className="h-4 w-4 mr-2" />
                {translate("account_settings")}
              </TabsTrigger>
              <TabsTrigger 
                value="body-metrics" 
                className="justify-start"
              >
                <UserIcon className="h-4 w-4 mr-2" />
                {translate("body_metrics")}
              </TabsTrigger>
              <TabsTrigger 
                value="goals" 
                className="justify-start"
              >
                <UserIcon className="h-4 w-4 mr-2" />
                {translate("nutrition_goals")}
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="justify-start"
              >
                <BellIcon className="h-4 w-4 mr-2" />
                {translate("notification_settings")}
              </TabsTrigger>
              <TabsTrigger 
                value="appearance" 
                className="justify-start"
              >
                <MoonIcon className="h-4 w-4 mr-2" />
                {translate("appearance")}
              </TabsTrigger>
              <TabsTrigger 
                value="privacy" 
                className="justify-start"
              >
                <ShieldIcon className="h-4 w-4 mr-2" />
                {translate("privacy_settings")}
              </TabsTrigger>
              <TabsTrigger 
                value="data" 
                className="justify-start"
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                {translate("data_management")}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          <TabsContent value="account" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>{translate("personal_info")}</CardTitle>
                <CardDescription>
                  {translate("update_personal_info")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{translate("name")}</Label>
                    <Input 
                      id="name" 
                      defaultValue={user?.name} 
                      placeholder={translate("your_name")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{translate("email")}</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue={user?.email} 
                      placeholder={translate("your_email")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{translate("phone")}</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder={translate("your_phone")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">{translate("country")}</Label>
                    <Input 
                      id="country" 
                      placeholder={translate("your_country")}
                      defaultValue="Россия"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>{translate("save_changes")}</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{translate("change_password")}</CardTitle>
                <CardDescription>
                  {translate("update_password")}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleChangePassword}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">{translate("current_password")}</Label>
                      <Input 
                        id="current-password" 
                        type="password" 
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">{translate("new_password")}</Label>
                      <Input 
                        id="new-password" 
                        type="password" 
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">{translate("confirm_password")}</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">{translate("change_password")}</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="body-metrics" className="mt-0">
            <UserProfileForm />
          </TabsContent>
          
          <TabsContent value="goals" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>{translate("nutrition_goals")}</CardTitle>
                <CardDescription>
                  {translate("nutrition_goals_description")}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSaveGoals}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="calories">{translate("calories")} ({translate("kcal")})</Label>
                      <Input 
                        id="calories" 
                        type="number" 
                        defaultValue={user?.settings?.calorieGoal || 2200}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="protein">{translate("protein")} (g)</Label>
                      <Input 
                        id="protein" 
                        type="number" 
                        defaultValue={user?.settings?.proteinGoal || 150}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="carbs">{translate("carbs")} (g)</Label>
                      <Input 
                        id="carbs" 
                        type="number" 
                        defaultValue={user?.settings?.carbGoal || 220}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fat">{translate("fat")} (g)</Label>
                      <Input 
                        id="fat" 
                        type="number" 
                        defaultValue={user?.settings?.fatGoal || 73}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="water">{translate("water")} (ml)</Label>
                      <Input 
                        id="water" 
                        type="number" 
                        defaultValue={user?.settings?.waterGoal || 2500}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">{translate("save_goals")}</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>{translate("notification_settings")}</CardTitle>
                <CardDescription>
                  {translate("notification_settings_description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">{translate("email_notifications")}</Label>
                      <p className="text-sm text-muted-foreground">
                        {translate("email_notifications_description")}
                      </p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-notifications">{translate("app_notifications")}</Label>
                      <p className="text-sm text-muted-foreground">
                        {translate("app_notifications_description")}
                      </p>
                    </div>
                    <Switch 
                      id="app-notifications" 
                      checked={appNotifications} 
                      onCheckedChange={setAppNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="daily-reminder">{translate("daily_reminder")}</Label>
                      <p className="text-sm text-muted-foreground">
                        {translate("daily_reminder_description")}
                      </p>
                    </div>
                    <Switch 
                      id="daily-reminder" 
                      checked={dailyReminder} 
                      onCheckedChange={setDailyReminder}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-report">{translate("weekly_report")}</Label>
                      <p className="text-sm text-muted-foreground">
                        {translate("weekly_report_description")}
                      </p>
                    </div>
                    <Switch 
                      id="weekly-report" 
                      checked={weeklyReport} 
                      onCheckedChange={setWeeklyReport}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>{translate("save_changes")}</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>{translate("appearance")}</CardTitle>
                <CardDescription>
                  {translate("appearance_description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-2 block">{translate("theme")}</Label>
                  <ThemeSelector />
                </div>
                
                <div>
                  <Label className="mb-2 block">{translate("language")}</Label>
                  <LanguageSelector />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>{translate("privacy_settings")}</CardTitle>
                <CardDescription>
                  {translate("privacy_settings_description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="profile-visibility">{translate("profile_visibility")}</Label>
                      <p className="text-sm text-muted-foreground">
                        {translate("profile_visibility_description")}
                      </p>
                    </div>
                    <Switch id="profile-visibility" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-collection">{translate("data_collection")}</Label>
                      <p className="text-sm text-muted-foreground">
                        {translate("data_collection_description")}
                      </p>
                    </div>
                    <Switch id="data-collection" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="third-party">{translate("third_party_sharing")}</Label>
                      <p className="text-sm text-muted-foreground">
                        {translate("third_party_sharing_description")}
                      </p>
                    </div>
                    <Switch id="third-party" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>{translate("save_changes")}</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="data" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>{translate("data_management")}</CardTitle>
                <CardDescription>
                  {translate("data_management_description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">{translate("export_your_data")}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {translate("export_data_description")}
                    </p>
                    <Button onClick={handleExportData}>
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      {translate("download_data")}
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-2">{translate("delete_account")}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {translate("delete_account_description")}
                    </p>
                    <Button variant="destructive">
                      {translate("delete_account")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </div>
    </div>
  );
}
