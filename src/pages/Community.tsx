
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContextFixed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SearchIcon,
  ThumbsUpIcon,
  MessageSquareIcon,
  ShareIcon,
  PlusIcon,
  HeartIcon,
  UsersIcon,
  TrophyIcon,
  ImageIcon,
  FilterIcon,
  BellIcon,
  UserPlusIcon
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PremiumBanner } from "@/components/PremiumBanner";

const Community = () => {
  const { translate } = useLanguage();
  const [postContent, setPostContent] = useState("");
  const [activeTab, setActiveTab] = useState("feed");

  const handleCreatePost = () => {
    if (postContent.trim()) {
      toast({
        title: translate("success"),
        description: translate("post_created_successfully"),
      });
      setPostContent("");
    } else {
      toast({
        variant: "destructive",
        title: translate("error"),
        description: translate("post_content_required"),
      });
    }
  };

  const handleFollowUser = (name: string) => {
    toast({
      title: translate("success"),
      description: `${translate("now_following")} ${name}`,
    });
  };

  const handleJoinChallenge = (name: string) => {
    toast({
      title: translate("success"),
      description: `${translate("joined_challenge")} "${name}"`,
    });
  };

  const handleJoinGroup = (name: string) => {
    toast({
      title: translate("success"),
      description: `${translate("joined_group")} "${name}"`,
    });
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <PremiumBanner />
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-6">{translate("community")}</h1>
        
        <Tabs defaultValue="feed" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="feed">{translate("feed")}</TabsTrigger>
            <TabsTrigger value="challenges">{translate("challenges")}</TabsTrigger>
            <TabsTrigger value="groups">{translate("groups")}</TabsTrigger>
            <TabsTrigger value="friends">{translate("friends")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feed" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="User avatar" />
                    <AvatarFallback>ИП</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      placeholder={translate("whats_on_your_mind")}
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="mb-2"
                    />
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" className="gap-2">
                        <ImageIcon className="h-4 w-4" />
                        {translate("add_photo")}
                      </Button>
                      <Button size="sm" onClick={handleCreatePost}>
                        {translate("post")}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">{translate("recent_activity")}</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <FilterIcon className="h-4 w-4" />
                  {translate("sort_by")}
                </Button>
              </div>
            </div>
            
            {/* Посты пользователей */}
            {[1, 2, 3].map((post) => (
              <Card key={post} className="mb-4">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${30 + post}`} alt="User avatar" />
                        <AvatarFallback>U{post}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Пользователь {post}</div>
                        <div className="text-xs text-muted-foreground">2 часа назад</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <BellIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    {post === 1 && 'Сегодня достиг своей цели в 10 000 шагов! 🎉 #ЗдоровыйОбразЖизни'}
                    {post === 2 && 'Приготовил полезный завтрак по новому рецепту. Очень вкусно и всего 350 калорий!'}
                    {post === 3 && 'Уже третью неделю придерживаюсь плана питания. Результаты начинают появляться!'}
                  </p>
                  
                  {post === 2 && (
                    <div className="my-4 rounded-md overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1493770348161-369560ae357d" 
                        alt="Healthy breakfast" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <div className="flex items-center gap-1">
                      <HeartIcon className="h-4 w-4 text-red-500" />
                      {10 + post * 3}
                    </div>
                    <div>{post + 1} {translate("comments")}</div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex justify-between w-full">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ThumbsUpIcon className="h-4 w-4" />
                      {translate("like")}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageSquareIcon className="h-4 w-4" />
                      {translate("comment")}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ShareIcon className="h-4 w-4" />
                      {translate("share")}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="challenges" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">{translate("challenges")}</h2>
              <Button className="gap-2">
                <PlusIcon className="h-4 w-4" />
                {translate("create_challenge")}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "30 дней без сахара",
                  members: 245,
                  daysLeft: 14,
                  progress: 53,
                  image: "https://images.unsplash.com/photo-1450150205465-f0e58eacb65a"
                },
                {
                  name: "10 000 шагов каждый день",
                  members: 512,
                  daysLeft: 21,
                  progress: 30,
                  image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8"
                },
                {
                  name: "Пить 2 литра воды ежедневно",
                  members: 189,
                  daysLeft: 7,
                  progress: 77,
                  image: "https://images.unsplash.com/photo-1502740479091-635887520276"
                }
              ].map((challenge, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden relative">
                    <img 
                      src={challenge.image} 
                      alt={challenge.name} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-white font-medium text-lg">{challenge.name}</h3>
                      <div className="flex justify-between items-center text-white/80 text-sm mt-2">
                        <div className="flex items-center gap-1">
                          <UsersIcon className="h-4 w-4" />
                          {challenge.members} {translate("participants")}
                        </div>
                        <div className="flex items-center gap-1">
                          {challenge.daysLeft} {translate("days_left")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="w-full bg-muted rounded-full h-2 mb-4">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        {challenge.progress}% {translate("completed")}
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleJoinChallenge(challenge.name)}
                      >
                        {translate("join_challenge")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="groups" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">{translate("groups")}</h2>
              <Button className="gap-2">
                <PlusIcon className="h-4 w-4" />
                {translate("create_group")}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Правильное питание",
                  members: 1245,
                  description: "Группа для обсуждения принципов здорового питания",
                  image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af"
                },
                {
                  name: "Бег и кардио",
                  members: 876,
                  description: "Для любителей бега и других кардио-тренировок",
                  image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8"
                },
                {
                  name: "Рецепты низкокалорийных блюд",
                  members: 654,
                  description: "Обмен рецептами блюд с низким содержанием калорий",
                  image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352"
                }
              ].map((group, index) => (
                <Card key={index}>
                  <CardHeader className="p-0">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={group.image} 
                        alt={group.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="mb-2">{group.name}</CardTitle>
                    <div className="text-sm text-muted-foreground mb-4">
                      {group.members} {translate("members")}
                    </div>
                    <p className="text-sm line-clamp-2">{group.description}</p>
                  </CardContent>
                  <CardFooter className="px-6 py-4 border-t">
                    <Button 
                      className="w-full"
                      onClick={() => handleJoinGroup(group.name)}
                    >
                      {translate("join_group")}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="friends" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <CardTitle>{translate("find_friends")}</CardTitle>
                  <div className="relative w-full md:w-[300px]">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      className="pl-9" 
                      placeholder={translate("search_community")}
                    />
                  </div>
                </div>
                <p className="text-muted-foreground mt-2">
                  {translate("friends_description")}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: "Анна К.", duration: "3 месяца", image: "https://i.pravatar.cc/150?img=25" },
                    { name: "Михаил Д.", duration: "1 год", image: "https://i.pravatar.cc/150?img=53" },
                    { name: "Елена П.", duration: "6 месяцев", image: "https://i.pravatar.cc/150?img=47" },
                    { name: "Дмитрий С.", duration: "2 года", image: "https://i.pravatar.cc/150?img=59" },
                    { name: "Ольга В.", duration: "4 месяца", image: "https://i.pravatar.cc/150?img=32" },
                    { name: "Сергей К.", duration: "9 месяцев", image: "https://i.pravatar.cc/150?img=60" }
                  ].map((friend, index) => (
                    <div key={index} className="flex gap-4 items-center p-4 border rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={friend.image} alt={friend.name} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{friend.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {translate("active")}: {friend.duration}
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleFollowUser(friend.name)}
                        className="whitespace-nowrap gap-1"
                      >
                        <UserPlusIcon className="h-4 w-4" />
                        {translate("follow")}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between items-center mt-6 mb-4">
              <h3 className="text-lg font-medium">{translate("daily_streak")}</h3>
              <Badge className="gap-1">
                <TrophyIcon className="h-4 w-4" />
                <span>14 {translate("days")}</span>
              </Badge>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }, (_, i) => (
                <div 
                  key={i}
                  className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium ${i < 5 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-muted'}`}
                >
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i]}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
