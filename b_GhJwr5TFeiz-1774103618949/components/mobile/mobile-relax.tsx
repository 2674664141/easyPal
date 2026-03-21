"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Heart,
  Clock,
  Headphones,
  Volume2,
  Repeat,
  Shuffle,
  ListMusic,
  Wind,
  TreePine,
  Droplets,
  Moon
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MobileRelaxProps {
  onBack: () => void
}

export function MobileRelax({ onBack }: MobileRelaxProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [progress, setProgress] = useState(35)
  const [liked, setLiked] = useState<Set<number>>(new Set())

  const categories = [
    { id: "all", label: "全部" },
    { id: "meditation", label: "冥想" },
    { id: "breathing", label: "呼吸训练" },
    { id: "nature", label: "自然之声" },
    { id: "sleep", label: "助眠" },
  ]

  const tracks = [
    { id: 1, title: "3分钟呼吸空间", desc: "快速放松呼吸练习", duration: "3:00", category: "breathing", icon: Wind, color: "from-sky-400 to-cyan-500", plays: "2.3k" },
    { id: 2, title: "身体扫描冥想", desc: "渐进式肌肉放松引导", duration: "15:00", category: "meditation", icon: Moon, color: "from-indigo-400 to-purple-500", plays: "5.1k" },
    { id: 3, title: "森林雨声", desc: "沉浸式自然白噪音", duration: "30:00", category: "nature", icon: TreePine, color: "from-emerald-400 to-green-500", plays: "8.7k" },
    { id: 4, title: "4-7-8呼吸法", desc: "缓解焦虑的经典呼吸技巧", duration: "5:00", category: "breathing", icon: Wind, color: "from-sky-400 to-blue-500", plays: "3.9k" },
    { id: 5, title: "正念身体扫描", desc: "专注当下的冥想引导", duration: "20:00", category: "meditation", icon: Moon, color: "from-violet-400 to-purple-500", plays: "4.2k" },
    { id: 6, title: "海浪声", desc: "海边轻柔的波涛之声", duration: "45:00", category: "nature", icon: Droplets, color: "from-blue-400 to-cyan-500", plays: "12.5k" },
    { id: 7, title: "深度睡眠引导", desc: "帮助你快速进入深度睡眠", duration: "25:00", category: "sleep", icon: Moon, color: "from-indigo-500 to-slate-600", plays: "15.3k" },
    { id: 8, title: "晚间放松冥想", desc: "释放一天的压力与疲劳", duration: "10:00", category: "sleep", icon: Moon, color: "from-purple-500 to-indigo-600", plays: "6.8k" },
  ]

  const filteredTracks = activeCategory === "all" ? tracks : tracks.filter(t => t.category === activeCategory)
  const nowPlaying = currentTrack !== null ? tracks.find(t => t.id === currentTrack) : null

  const toggleLike = (id: number) => {
    const newLiked = new Set(liked)
    if (newLiked.has(id)) {
      newLiked.delete(id)
    } else {
      newLiked.add(id)
    }
    setLiked(newLiked)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="font-semibold text-foreground">放松音频</span>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 space-y-4" style={{ paddingBottom: nowPlaying ? "10rem" : "2rem" }}>
        <Card className="border-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-500/20">
                <Headphones className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">每日放松推荐</p>
                <p className="text-xs text-muted-foreground">适合当前时段的放松内容</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
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

        {/* Track List */}
        <div className="space-y-2.5">
          {filteredTracks.map((track) => (
            <Card
              key={track.id}
              className={cn(
                "border border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer",
                currentTrack === track.id && "ring-2 ring-primary border-primary/50"
              )}
              onClick={() => { setCurrentTrack(track.id); setIsPlaying(true) }}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${track.color} shrink-0`}>
                    <track.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">{track.title}</h3>
                    <p className="text-xs text-muted-foreground truncate">{track.desc}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {track.duration}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Headphones className="h-3 w-3" />
                        {track.plays}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLike(track.id) }}
                      className="p-2 rounded-full hover:bg-muted transition-colors"
                    >
                      <Heart className={cn("h-4 w-4", liked.has(track.id) ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
                    </button>
                    {currentTrack === track.id && isPlaying ? (
                      <div className="flex items-end gap-0.5 h-4 w-4">
                        <span className="w-1 bg-primary rounded-full animate-bounce" style={{ height: "60%", animationDelay: "0ms" }} />
                        <span className="w-1 bg-primary rounded-full animate-bounce" style={{ height: "100%", animationDelay: "150ms" }} />
                        <span className="w-1 bg-primary rounded-full animate-bounce" style={{ height: "40%", animationDelay: "300ms" }} />
                      </div>
                    ) : (
                      <Play className="h-4 w-4 text-primary" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Player Bar */}
      {nowPlaying && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl z-20">
          {/* Progress bar */}
          <div className="h-1 bg-muted">
            <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="px-4 py-3">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${nowPlaying.color}`}>
                <nowPlaying.icon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{nowPlaying.title}</p>
                <p className="text-xs text-muted-foreground">
                  {Math.floor(progress / 100 * 3)}:{String(Math.floor((progress / 100 * 180) % 60)).padStart(2, "0")} / {nowPlaying.duration}
                </p>
              </div>
              <button onClick={() => toggleLike(nowPlaying.id)} className="p-2">
                <Heart className={cn("h-5 w-5", liked.has(nowPlaying.id) ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" className="text-muted-foreground h-9 w-9">
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-foreground h-9 w-9">
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </Button>
              <Button variant="ghost" size="icon" className="text-foreground h-9 w-9">
                <SkipForward className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground h-9 w-9">
                <Repeat className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
