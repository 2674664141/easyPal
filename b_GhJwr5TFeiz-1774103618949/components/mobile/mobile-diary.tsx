"use client"

import { useState } from "react"
import { 
  ArrowLeft, 
  Plus, 
  Calendar,
  Smile,
  Meh,
  Frown,
  CloudRain,
  Sun,
  Cloud,
  Image,
  Lock,
  Unlock,
  ChevronRight,
  Heart
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

interface DiaryEntry {
  id: number
  date: string
  mood: "happy" | "neutral" | "sad"
  weather: "sunny" | "cloudy" | "rainy"
  content: string
  isPrivate: boolean
  likes?: number
}

interface MobileDiaryProps {
  onBack: () => void
}

export function MobileDiary({ onBack }: MobileDiaryProps) {
  const [isWriting, setIsWriting] = useState(false)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null)
  const [diaryContent, setDiaryContent] = useState("")
  const [isPrivate, setIsPrivate] = useState(true)

  const diaryEntries: DiaryEntry[] = [
    {
      id: 1,
      date: "今天",
      mood: "happy",
      weather: "sunny",
      content: "今天和室友一起去图书馆学习，效率很高！晚上还一起吃了火锅，感觉生活充满了小确幸。",
      isPrivate: false,
      likes: 12,
    },
    {
      id: 2,
      date: "昨天",
      mood: "neutral",
      weather: "cloudy",
      content: "普通的一天，上课、作业、自习。虽然有些疲惫，但一切都在正轨上。",
      isPrivate: true,
    },
    {
      id: 3,
      date: "3月12日",
      mood: "sad",
      weather: "rainy",
      content: "考试没考好，有点失落。不过想想还有机会补救，给自己打打气吧。",
      isPrivate: true,
    },
  ]

  const moodOptions = [
    { id: "happy", icon: Smile, label: "开心", color: "text-success bg-success/10" },
    { id: "neutral", icon: Meh, label: "平静", color: "text-primary bg-primary/10" },
    { id: "sad", icon: Frown, label: "低落", color: "text-warning bg-warning/10" },
  ]

  const weatherOptions = [
    { id: "sunny", icon: Sun, label: "晴天" },
    { id: "cloudy", icon: Cloud, label: "阴天" },
    { id: "rainy", icon: CloudRain, label: "雨天" },
  ]

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "happy": return <Smile className="h-4 w-4 text-success" />
      case "neutral": return <Meh className="h-4 w-4 text-primary" />
      case "sad": return <Frown className="h-4 w-4 text-warning" />
      default: return <Meh className="h-4 w-4" />
    }
  }

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case "sunny": return <Sun className="h-4 w-4 text-accent" />
      case "cloudy": return <Cloud className="h-4 w-4 text-muted-foreground" />
      case "rainy": return <CloudRain className="h-4 w-4 text-primary" />
      default: return <Sun className="h-4 w-4" />
    }
  }

  if (isWriting) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setIsWriting(false)}>
              取消
            </Button>
            <span className="font-semibold text-foreground">写日记</span>
            <Button size="sm" disabled={!diaryContent.trim() || !selectedMood}>
              发布
            </Button>
          </div>
        </header>

        <main className="flex-1 px-4 py-4 space-y-4">
          {/* Mood Selection */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">今天的心情</p>
            <div className="flex gap-3">
              {moodOptions.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                    selectedMood === mood.id
                      ? `${mood.color} border-current`
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <mood.icon className="h-4 w-4" />
                  <span className="text-sm">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Weather Selection */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">今天的天气</p>
            <div className="flex gap-3">
              {weatherOptions.map((weather) => (
                <button
                  key={weather.id}
                  onClick={() => setSelectedWeather(weather.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                    selectedWeather === weather.id
                      ? "bg-primary/10 border-primary text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <weather.icon className="h-4 w-4" />
                  <span className="text-sm">{weather.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">写下今天的心情...</p>
            <Textarea
              value={diaryContent}
              onChange={(e) => setDiaryContent(e.target.value)}
              placeholder="今天发生了什么？你的感受如何？"
              className="min-h-[200px] resize-none"
            />
          </div>

          {/* Options */}
          <div className="flex items-center justify-between py-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Image className="h-4 w-4 mr-2" />
              添加图片
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPrivate(!isPrivate)}
              className={isPrivate ? "text-muted-foreground" : "text-primary"}
            >
              {isPrivate ? (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  仅自己可见
                </>
              ) : (
                <>
                  <Unlock className="h-4 w-4 mr-2" />
                  分享到社区
                </>
              )}
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="font-semibold text-foreground">心情日记</span>
          </div>
          <Button variant="ghost" size="icon">
            <Calendar className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Stats Card */}
      <div className="px-4 pt-4">
        <Card className="border-0 bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="p-4">
            <div className="flex justify-around text-center">
              <div>
                <p className="text-2xl font-bold text-foreground">28</p>
                <p className="text-xs text-muted-foreground">累计记录</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">7</p>
                <p className="text-xs text-muted-foreground">连续天数</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="text-2xl font-bold text-success">68%</p>
                <p className="text-xs text-muted-foreground">积极情绪</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Diary List */}
      <main className="flex-1 px-4 py-4 space-y-3 pb-24">
        {diaryEntries.map((entry) => (
          <Card key={entry.id} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{entry.date}</span>
                  {getMoodIcon(entry.mood)}
                  {getWeatherIcon(entry.weather)}
                </div>
                <div className="flex items-center gap-2">
                  {entry.isPrivate ? (
                    <Lock className="h-3 w-3 text-muted-foreground" />
                  ) : (
                    <Badge variant="secondary" className="text-[10px] flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {entry.likes}
                    </Badge>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground line-clamp-2">{entry.content}</p>
            </CardContent>
          </Card>
        ))}
      </main>

      {/* FAB */}
      <Button
        size="lg"
        className="fixed bottom-24 right-4 h-14 w-14 rounded-full shadow-lg z-20"
        onClick={() => setIsWriting(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  )
}
