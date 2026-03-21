"use client"

import { useState } from "react"
import { 
  ArrowLeft, 
  Search,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Flame,
  Clock,
  Users,
  Bookmark,
  Send,
  TrendingUp,
  Sparkles,
  ImageIcon,
  ThumbsUp,
  Star
} from "lucide-react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

interface Post {
  id: number
  author: {
    name: string
    avatar: string
    badge?: string
    badgeColor?: string
  }
  content: string
  topic: string
  topicColor: string
  likes: number
  comments: number
  time: string
  isLiked: boolean
  images?: string[]
  isHot?: boolean
}

interface MobileCommunityProps {
  onBack: () => void
}

export function MobileCommunity({ onBack }: MobileCommunityProps) {
  const [activeTab, setActiveTab] = useState("hot")
  const [activeTopic, setActiveTopic] = useState<string | null>(null)
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: { name: "温暖小太阳", avatar: "", badge: "治愈系", badgeColor: "bg-amber-100 text-amber-700" },
      content: "今天终于鼓起勇气和导师谈了论文的困惑，没想到导师很耐心地给我解释，感觉压力小了很多！有时候主动沟通真的很重要，大家有什么困扰也可以试着说出来～",
      topic: "学业压力",
      topicColor: "bg-blue-50 text-blue-600 border-blue-200",
      likes: 42,
      comments: 8,
      time: "30分钟前",
      isLiked: false,
      isHot: true,
    },
    {
      id: 2,
      author: { name: "星星点灯", avatar: "", badge: "暖心达人", badgeColor: "bg-pink-100 text-pink-700" },
      content: "分享一个帮助我缓解焦虑的方法：每天睡前写三件让自己感恩的小事，坚持一周后感觉心情平静了很多。推荐给需要的朋友们～\n\n1. 今天阳光很好\n2. 午饭很好吃\n3. 和朋友聊了天",
      topic: "情绪调节",
      topicColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
      likes: 89,
      comments: 15,
      time: "2小时前",
      isLiked: true,
    },
    {
      id: 3,
      author: { name: "云淡风轻", avatar: "", badge: "互助达人", badgeColor: "bg-purple-100 text-purple-700" },
      content: "刚刚完成了一次正念冥想，感觉整个人都放松下来了。如果你也在经历焦虑，可以试试从5分钟的呼吸练习开始。记住，照顾好自己的情绪也是很重要的事情。",
      topic: "正念练习",
      topicColor: "bg-violet-50 text-violet-600 border-violet-200",
      likes: 156,
      comments: 23,
      time: "4小时前",
      isLiked: false,
      isHot: true,
    },
    {
      id: 4,
      author: { name: "向日葵", avatar: "" },
      content: "室友之间的小摩擦让我很困扰，但今天鼓起勇气好好沟通了一下，发现其实大家都是无心的。学会表达真的很重要！",
      topic: "人际关系",
      topicColor: "bg-orange-50 text-orange-600 border-orange-200",
      likes: 67,
      comments: 12,
      time: "5小时前",
      isLiked: false,
    },
  ])

  const topics = [
    { id: "stress", label: "学业压力", count: 328, icon: "📚", color: "bg-blue-500" },
    { id: "emotion", label: "情绪调节", count: 256, icon: "💭", color: "bg-emerald-500" },
    { id: "social", label: "人际关系", count: 189, icon: "🤝", color: "bg-orange-500" },
    { id: "mindful", label: "正念练习", count: 145, icon: "🧘", color: "bg-violet-500" },
    { id: "growth", label: "自我成长", count: 98, icon: "🌱", color: "bg-green-500" },
  ]

  const tabs = [
    { id: "hot", label: "热门", icon: Flame },
    { id: "new", label: "最新", icon: Clock },
    { id: "follow", label: "关注", icon: Users },
  ]

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        }
      }
      return post
    }))
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="搜索话题、内容或用户" 
                className="pl-10 bg-muted/50 border-0 rounded-full h-10 focus-visible:ring-primary/30"
              />
            </div>
          </div>
        </div>
        
        {/* Topics Scroll */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(activeTopic === topic.id ? null : topic.id)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                  activeTopic === topic.id
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <span className="text-base">{topic.icon}</span>
                <span className="text-sm font-medium">{topic.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTopic === topic.id 
                    ? "bg-primary-foreground/20 text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {topic.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-border">
          <div className="flex px-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 relative transition-colors ${
                  activeTab === tab.id
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? "text-primary" : ""}`} />
                <span className="text-sm">{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24">
        {/* Hot Topics Banner */}
        {activeTab === "hot" && (
          <div className="px-4 py-3">
            <Card className="border-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/20">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                      本周热议话题
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      期末季压力管理 · 已有1.2k人参与讨论
                    </p>
                  </div>
                  <Button size="sm" variant="secondary" className="rounded-full text-xs h-8">
                    参与
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Posts List */}
        <div className="px-4 space-y-3 py-2">
          {posts.map((post) => (
            <Card key={post.id} className="border border-border/60 shadow-sm overflow-hidden">
              <CardHeader className="pb-2 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-11 w-11 ring-2 ring-background shadow-sm">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-medium">
                          {post.author.name.slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      {post.isHot && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-500 flex items-center justify-center shadow-sm">
                          <Flame className="h-3 w-3 text-white" />
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-foreground">{post.author.name}</span>
                        {post.author.badge && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${post.author.badgeColor}`}>
                            {post.author.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="mb-2.5">
                  <span className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full border font-medium ${post.topicColor}`}>
                    #{post.topic}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{post.content}</p>
              </CardContent>
              <CardFooter className="pt-0 pb-3 border-t border-border/50">
                <div className="flex items-center justify-between w-full pt-3">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                        post.isLiked 
                          ? "bg-red-50 text-red-500" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                      <span className="text-xs font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-xs font-medium">{post.comments}</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                      <Bookmark className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Empty States for other tabs */}
        {activeTab === "new" && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-foreground font-medium mb-1">暂无最新动态</p>
            <p className="text-sm text-muted-foreground text-center">刷新查看最新内容</p>
          </div>
        )}

        {activeTab === "follow" && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-foreground font-medium mb-1">还没有关注任何人</p>
            <p className="text-sm text-muted-foreground text-center mb-4">关注感兴趣的用户，获取TA的最新动态</p>
            <Button variant="outline" size="sm" className="rounded-full">
              发现更多用户
            </Button>
          </div>
        )}
      </main>

      {/* FAB */}
      <Button
        size="lg"
        className="fixed bottom-24 right-4 h-14 w-14 rounded-full shadow-lg z-20 bg-primary hover:bg-primary/90"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  )
}
