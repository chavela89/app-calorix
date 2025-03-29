import { useState } from "react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { useUser } from "@/context/UserContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, CameraIcon, BarChart3Icon, SparklesIcon, VolumeIcon, XIcon, ChevronLeftIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Premium() {
  const { translate } = useLanguage();
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  
  const activatePremium = () => {
    if (user) {
      updateUser({ ...user, isPremium: true });
      
      toast({
        title: translate("premium_activated"),
        description: translate("premium_activated_description"),
      });
      
      navigate("/");
    }
  };

  const plans = {
    monthly: {
      id: "monthly",
      name: translate("monthly_subscription"),
      price: "$5",
      perMonth: "$5",
      billing: translate("billed_monthly"),
      popular: false,
      discount: ""
    },
    yearly: {
      id: "yearly",
      name: translate("yearly_subscription"),
      price: "$42",
      perMonth: "$3.5",
      billing: translate("billed_annually"),
      popular: true,
      discount: translate("save_30")
    }
  };

  const premiumFeatures = [
    {
      title: translate("photo_recognition"),
      description: translate("photo_recognition_description"),
      icon: <CameraIcon className="h-5 w-5" />,
      isAvailable: true
    },
    {
      title: translate("advanced_analytics"),
      description: translate("advanced_analytics_description"),
      icon: <BarChart3Icon className="h-5 w-5" />,
      isAvailable: true
    },
    {
      title: translate("ad_free"),
      description: translate("ad_free_description"),
      icon: <XIcon className="h-5 w-5" />,
      isAvailable: true
    },
    {
      title: translate("voice_input"),
      description: translate("voice_input_description"),
      icon: <VolumeIcon className="h-5 w-5" />,
      isAvailable: true
    },
    {
      title: translate("custom_themes"),
      description: translate("custom_themes_description"),
      icon: <SparklesIcon className="h-5 w-5" />,
      isAvailable: true
    },
    {
      title: translate("nutritionist_consultation"),
      description: translate("nutritionist_consultation_description"),
      icon: <SparklesIcon className="h-5 w-5" />,
      isAvailable: true
    }
  ];

  const basicFeatures = [
    {
      title: translate("calorie_tracking"),
      description: translate("calorie_tracking_description"),
      isAvailable: true
    },
    {
      title: translate("meal_planning"),
      description: translate("meal_planning_description"),
      isAvailable: true
    },
    {
      title: translate("progress_tracking"),
      description: translate("progress_tracking_description"),
      isAvailable: true
    },
    {
      title: translate("basic_recipes"),
      description: translate("basic_recipes_description"),
      isAvailable: true
    },
    {
      title: translate("water_tracking"),
      description: translate("water_tracking_description"),
      isAvailable: true
    }
  ];

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl">
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{translate("premium")}</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Левая колонка - информация о Premium */}
        <div className="flex-1 space-y-6">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-amber-500/20 mb-4">
              <SparklesIcon className="h-8 w-8 text-amber-500" />
            </div>
            <h1 className="text-3xl font-bold mb-2">{translate("upgrade_to_premium")}</h1>
            <p className="text-muted-foreground">{translate("premium_description")}</p>
          </div>

          <Tabs defaultValue="premium" className="mb-6">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="premium">{translate("premium_features")}</TabsTrigger>
              <TabsTrigger value="basic">{translate("basic_features")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="premium" className="space-y-4">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 p-2 rounded-full bg-primary/20 h-10 w-10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="basic" className="space-y-4">
              {basicFeatures.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 p-2 rounded-full bg-muted h-10 w-10 flex items-center justify-center">
                    <CheckIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
              <div className="bg-muted/30 p-4 rounded-lg mt-4">
                <p className="text-sm text-center">{translate("basic_features_included")}</p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="border rounded-lg p-6 mt-6">
            <h2 className="text-lg font-medium mb-4">{translate("testimonials")}</h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted/20 rounded-lg">
                <p className="italic mb-2">"{translate("testimonial_1")}"</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-muted mr-2 overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=25" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-medium">Анна К.</div>
                    <div className="text-xs text-muted-foreground">Premium с 2022</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/20 rounded-lg">
                <p className="italic mb-2">"{translate("testimonial_2")}"</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-muted mr-2 overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=54" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-medium">Сергей П.</div>
                    <div className="text-xs text-muted-foreground">Premium с 2021</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Правая колонка - выбор плана и покупка */}
        <div className="w-full md:w-80 space-y-6">
          <div className="sticky top-24">
            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
              {Object.values(plans).map((plan) => (
                <div key={plan.id} className="relative">
                  <Card className={`border-2 ${
                    selectedPlan === plan.id ? 'border-primary' : 'border-muted'
                  }`}>
                    {plan.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-amber-500">
                        {translate("popular")}
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={plan.id} id={plan.id} />
                        <Label htmlFor={plan.id} className="font-medium text-lg">
                          {plan.name}
                        </Label>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">({plan.perMonth} / {translate("month")})</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{plan.billing}</p>
                      {plan.discount && (
                        <Badge variant="outline" className="mt-2 border-green-500 text-green-600 bg-green-50 dark:bg-green-950">
                          {plan.discount}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </RadioGroup>

            <div className="mt-6 space-y-4">
              <Button className="w-full py-6" size="lg" onClick={activatePremium}>
                <SparklesIcon className="mr-2 h-4 w-4" />
                {translate("subscribe_now")}
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                <p>{translate("cancel_anytime")}</p>
                <p className="mt-2">{translate("payment_processed_by")}</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted/20 rounded-lg">
              <h3 className="font-medium mb-2">{translate("money_back_guarantee")}</h3>
              <p className="text-sm text-muted-foreground">{translate("money_back_guarantee_description")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
