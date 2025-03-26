
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchIcon, UserPlus, MessageCircle, Heart, Share2, Trophy, Clock, UserIcon, Users } from "lucide-react";

export default function Community() {
  const { translate } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Демо-данные для публикаций
  const posts = [
    {
      id: 1,
      author: {
        name: "Елена Смирнова",
        avatar: "https://i.pravatar.cc/150?img=32",
        isPremium: true
      },
      content: "Сегодня приготовила полезный ужин из запеченной курицы с овощами по рецепту из приложения. Всего 350 ккал на порцию и так вкусно! 😋",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      likes: 47,
      comments: 12,
      time: "2 часа назад",
      achievement: "Достигла цели по белку 5 дней подряд!"
    },
    {
      id: 2,
      author: {
        name: "Алексей Петров",
        avatar: "https://i.pravatar.cc/150?img=54",
        isPremium: false
      },
      content: "Уже третью неделю следую своему плану питания и вижу прогресс! -3 кг и гораздо больше энергии. Спасибо CaloriX за помощь в структурировании рациона.",
      image: "https://images.unsplash.com/photo-1551276917-c4053dfd6d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      likes: 85,
      comments: 23,
      time: "5 часов назад",
      challenge: "Участвует в челлендже: 30 дней без сахара"
    },
    {
      id: 3,
      author: {
        name: "Мария Иванова",
        avatar: "https://i.pravatar.cc/150?img=25",
        isPremium: true
      },
      content: "Поделюсь своим любимым рецептом протеинового смузи: банан, шпинат, йогурт, протеин и немного арахисовой пасты. Идеальный перекус после тренировки!",
      image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      likes: 62,
      comments: 18,
      time: "1 день назад",
      achievement: "Достигла целевого веса!"
    }
  ];

  // Демо-данные для челленджей
  const challenges = [
    {
      id: 1,
      title: "30 дней без сахара",
      description: "Исключите добавленный сахар из рациона на 30 дней",
      participants: 1245,
      active: true,
      daysLeft: 22,
      progress: 26
    },
    {
      id: 2,
      title: "Белковый вызов",
      description: "Потребляйте минимум 1.5г белка на кг веса ежедневно",
      participants: 894,
      active: true,
      daysLeft: 14,
      progress: 53
    },
    {
      id: 3,
      title: "Водный марафон",
      description: "Выпивайте не менее 2.5л воды каждый день",
      participants: 2134,
      active: false,
      daysLeft: 0,
      progress: 100
    }
  ];

  // Демо-данные для групп
  const groups = [
    {
      id: 1,
      name: "Правильное питание",
      members: 5287,
      postsPerDay: 24,
      topics: ["питание", "рецепты", "диеты"],
      image: "https://images.unsplash.com/photo-1606791422814-1a839bb96bec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
    },
    {
      id: 2,
      name: "Спортивное питание",
      members: 3124,
      postsPerDay: 17,
      topics: ["спорт", "белок", "добавки"],
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      name: "Вегетарианство и веганство",
      members: 2896,
      postsPerDay: 12,
      topics: ["веган", "растительный", "рецепты"],
      image: "https://images.unsplash.com/photo-1540914124281-342587941389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80"
    }
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 mb-6">
        <h1 className="text-3xl font-bold">{translate("community")}</h1>
        
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9 md:w-[300px]" 
              placeholder={translate("search_community")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="feed" className="space-y-6">
        <TabsList>
          <TabsTrigger value="feed">{translate("feed")}</TabsTrigger>
          <TabsTrigger value="challenges">{translate("challenges")}</TabsTrigger>
          <TabsTrigger value="groups">{translate("groups")}</TabsTrigger>
          <TabsTrigger value="friends">{translate("friends")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feed" className="space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://i.pravatar.cc/150?img=36" alt="User" />
                  <AvatarFallback>ИП</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input 
                    placeholder={translate("whats_on_your_mind")}
                    className="mb-4"
                  />
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      {translate("add_photo")}
                    </Button>
                    <Button size="sm">
                      {translate("post")}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium mr-1">{post.author.name}</span>
                        {post.author.isPremium && (
                          <Badge className="text-xs bg-amber-500 h-5">
                            <span className="mr-1">✨</span>
                            Premium
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.time}
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
                
                {(post.achievement || post.challenge) && (
                  <div className="mt-2 mb-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {post.achievement && (
                        <>
                          <Trophy className="h-3 w-3 mr-1" />
                          {post.achievement}
                        </>
                      )}
                      {post.challenge && (
                        <>
                          <Trophy className="h-3 w-3 mr-1" />
                          {post.challenge}
                        </>
                      )}
                    </Badge>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="p-4">
                <p className="mb-4">{post.content}</p>
                {post.image && (
                  <div className="rounded-md overflow-hidden mb-4">
                    <img 
                      src={post.image} 
                      alt="Post content" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex justify-between">
                <div className="flex gap-6">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="px-2">
                  <Share2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="challenges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className={challenge.active ? "" : "opacity-70"}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <Badge variant={challenge.active ? "default" : "outline"}>
                      {challenge.active ? translate("active") : translate("completed")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{translate("progress")}</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${challenge.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm">{challenge.participants} {translate("participants")}</span>
                      </div>
                      {challenge.active && (
                        <div className="text-sm text-primary">
                          {challenge.daysLeft} {translate("days_left")}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant={challenge.active ? "default" : "outline"} className="w-full">
                    {challenge.active ? translate("join_challenge") : translate("view_results")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-muted/50 p-4 mb-4">
                <Trophy className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-2">{translate("create_challenge")}</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">{translate("create_challenge_description")}</p>
              <Button variant="outline">
                {translate("create_challenge")}
              </Button>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="groups" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <Card key={group.id} className="overflow-hidden">
                <div className="h-32 w-full overflow-hidden">
                  <img 
                    src={group.image} 
                    alt={group.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{group.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{translate("members")}</span>
                    <span>{group.members}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{translate("posts_per_day")}</span>
                    <span>{group.postsPerDay}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {group.topics.map((topic, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        #{topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    {translate("join_group")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-muted/50 p-4 mb-4">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-2">{translate("create_group")}</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">{translate("create_group_description")}</p>
              <Button variant="outline">
                {translate("create_group")}
              </Button>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="friends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${20 + index}`} />
                      <AvatarFallback>
                        <UserIcon className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">{["Анна К.", "Иван С.", "Ольга П.", "Дмитрий В.", "Наталья М."][index]}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{translate("active_today")}</p>
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">-2.5 кг</Badge>
                        <Badge variant="outline" className="text-xs">14 {translate("days_streak")}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex gap-2">
                  <Button variant="outline" className="flex-1">
                    {translate("message")}
                  </Button>
                  <Button className="flex-1">
                    {translate("view_profile")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline">
              {translate("find_friends")}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
