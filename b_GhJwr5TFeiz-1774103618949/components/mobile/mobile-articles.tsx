"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Bookmark,
  Heart,
  Share2,
  Clock,
  Eye,
  ChevronRight,
  Search,
  BookOpen,
  Star,
  User
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface MobileArticlesProps {
  onBack: () => void
}

export function MobileArticles({ onBack }: MobileArticlesProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [readingArticle, setReadingArticle] = useState<number | null>(null)

  const categories = [
    { id: "all", label: "全部" },
    { id: "anxiety", label: "焦虑管理" },
    { id: "emotion", label: "情绪调节" },
    { id: "sleep", label: "睡眠改善" },
    { id: "social", label: "人际交往" },
    { id: "growth", label: "个人成长" },
  ]

  const articles = [
    {
      id: 1,
      title: "考前焦虑？这5个方法帮你快速放松",
      summary: "面对考试的紧张和焦虑，试试这些经过心理学验证的放松技巧...",
      category: "anxiety",
      author: "张老师",
      authorTitle: "心理咨询师",
      readTime: "5分钟",
      views: "3.2k",
      likes: 234,
      isBookmarked: false,
      isRecommended: true,
      content: "考试前感到紧张和焦虑是完全正常的反应，适度的焦虑甚至可以帮助我们保持警觉和专注。但如果焦虑程度过高，反而会影响发挥。以下是5个经过心理学研究验证的放松方法：\n\n1. 4-7-8呼吸法\n吸气4秒，屏住呼吸7秒，呼气8秒。重复3-4次，可以有效激活副交感神经系统，帮助身体进入放松状态。\n\n2. 渐进式肌肉放松\n从脚趾开始，依次紧张和放松身体各部位的肌肉。每组肌肉紧张5秒后放松15秒，感受紧张和放松的对比。\n\n3. 正向自我对话\n用积极的语句替代消极的想法。例如，将\"我一定考不好\"换成\"我已经做了充分的准备，我会尽力发挥\"。\n\n4. 可视化练习\n闭上眼睛，想象自己在考试中平静、自信地答题的场景。详细想象每一个细节，包括考场环境、你的姿态、你流畅书写的样子。\n\n5. 接纳焦虑\n不要试图压制或消除焦虑，而是承认它的存在。告诉自己\"我感到紧张，这是正常的\"，往往焦虑反而会减轻。",
    },
    {
      id: 2,
      title: "如何在大学建立高质量的社交关系",
      summary: "大学四年，高质量的人际关系对心理健康至关重要...",
      category: "social",
      author: "李老师",
      authorTitle: "心理咨询师",
      readTime: "8分钟",
      views: "2.8k",
      likes: 189,
      isBookmarked: true,
      isRecommended: false,
    },
    {
      id: 3,
      title: "告别失眠：建立健康的睡眠习惯",
      summary: "良好的睡眠是心理健康的基石，让我们从今天开始改善...",
      category: "sleep",
      author: "王老师",
      authorTitle: "心理咨询师",
      readTime: "6分钟",
      views: "4.5k",
      likes: 312,
      isBookmarked: false,
      isRecommended: true,
    },
    {
      id: 4,
      title: "情绪日记：记录与理解你的情绪",
      summary: "情绪日记是一种简单但强大的自我探索工具...",
      category: "emotion",
      author: "张老师",
      authorTitle: "心理咨询师",
      readTime: "4分钟",
      views: "1.9k",
      likes: 156,
      isBookmarked: false,
      isRecommended: false,
    },
    {
      id: 5,
      title: "拖延症不是你的错：理解并克服拖延",
      summary: "拖延往往源于情绪调节困难，而非时间管理问题...",
      category: "growth",
      author: "陈老师",
      authorTitle: "心理咨询师",
      readTime: "7分钟",
      views: "5.1k",
      likes: 423,
      isBookmarked: true,
      isRecommended: true,
    },
  ]

  const readArticle = articles.find(a => a.id === readingArticle)

  if (readArticle && readArticle.content) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => setReadingArticle(null)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bookmark className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 pb-8">
          <Badge className="mb-3 bg-primary/10 text-primary border-0">{categories.find(c => c.id === readArticle.category)?.label}</Badge>
          <h1 className="text-xl font-bold text-foreground mb-3 leading-tight">{readArticle.title}</h1>
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">{readArticle.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">{readArticle.author}</p>
              <p className="text-xs text-muted-foreground">{readArticle.authorTitle} &middot; {readArticle.readTime}阅读</p>
            </div>
          </div>
          <div className="prose prose-sm text-foreground leading-relaxed">
            {readArticle.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-4 text-sm text-foreground/90 leading-7">{paragraph}</p>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-border">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="text-sm">{readArticle.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Bookmark className="h-5 w-5" />
              <span className="text-sm">收藏</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Share2 className="h-5 w-5" />
              <span className="text-sm">分享</span>
            </button>
          </div>
        </main>
      </div>
    )
  }

  const filteredArticles = activeCategory === "all" ? articles : articles.filter(a => a.category === activeCategory)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="搜索文章..." className="pl-9 bg-muted/50 border-0 rounded-full h-9" />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 space-y-4 pb-8">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Recommended Section */}
        {activeCategory === "all" && (
          <Card className="border-0 bg-gradient-to-r from-primary/10 to-accent/10 overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-semibold text-foreground">编辑推荐</span>
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{articles[0].title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{articles[0].summary}</p>
              <Button size="sm" variant="secondary" className="rounded-full text-xs" onClick={() => setReadingArticle(articles[0].id)}>
                立即阅读
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="border border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => setReadingArticle(article.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-0">
                    {categories.find(c => c.id === article.category)?.label}
                  </Badge>
                  {article.isRecommended && (
                    <Badge className="text-[10px] bg-amber-50 text-amber-600 border-0">
                      <Star className="h-2.5 w-2.5 mr-0.5" />
                      推荐
                    </Badge>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{article.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{article.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="bg-primary/10 text-primary text-[10px]">{article.author[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{article.author}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{article.views}</span>
                    <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{article.likes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
