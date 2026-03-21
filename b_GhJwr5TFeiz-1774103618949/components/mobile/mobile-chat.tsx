"use client"

import { useState, useRef, useEffect } from "react"
import { 
  ArrowLeft, 
  Send, 
  Mic, 
  Camera, 
  MoreVertical,
  Sparkles,
  Heart,
  Volume2,
  Pause
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: number
  type: "user" | "ai"
  content: string
  emotion?: string
  timestamp: Date
}

interface MobileChatProps {
  onBack: () => void
}

export function MobileChat({ onBack }: MobileChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content: "你好呀！我是你的AI心理陪伴助手小暖。今天感觉怎么样？有什么想和我聊聊的吗？🌸",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "我理解你的感受。能具体说说是什么让你有这种感觉吗？我想更好地了解你。",
        "谢谢你愿意和我分享。你的感受是完全正常的，我们一起来看看可以做些什么。",
        "听起来你今天经历了不少。深呼吸一下，我陪着你慢慢聊。",
      ]

      const aiMessage: Message = {
        id: messages.length + 2,
        type: "ai",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        emotion: "共情",
        timestamp: new Date(),
      }

      setIsTyping(false)
      setMessages((prev) => [...prev, aiMessage])
    }, 1500)
  }

  const quickReplies = [
    "我今天有点焦虑",
    "想聊聊学习压力",
    "最近睡眠不太好",
    "心情有些低落",
  ]

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9 ring-2 ring-primary/20">
              <AvatarImage src="/ai-avatar.png" alt="AI助手" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground text-sm">小暖</p>
              <p className="text-xs text-primary flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                AI心理陪伴助手
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Date Divider */}
        <div className="flex items-center gap-2 justify-center">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground px-2">今天</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 ${message.type === "user" ? "flex-row-reverse" : ""}`}
          >
            {message.type === "ai" && (
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  <Sparkles className="h-3 w-3" />
                </AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-[75%] ${message.type === "user" ? "items-end" : "items-start"}`}>
              <Card
                className={`border-0 ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card shadow-sm"
                }`}
              >
                <CardContent className="p-3">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </CardContent>
              </Card>
              <div className={`flex items-center gap-2 mt-1 px-1 ${message.type === "user" ? "justify-end" : ""}`}>
                <span className="text-[10px] text-muted-foreground">
                  {message.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                </span>
                {message.type === "ai" && message.emotion && (
                  <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                    {message.emotion}
                  </span>
                )}
                {message.type === "ai" && (
                  <button className="text-muted-foreground hover:text-primary transition-colors">
                    <Volume2 className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                <Sparkles className="h-3 w-3" />
              </AvatarFallback>
            </Avatar>
            <Card className="border-0 bg-card shadow-sm">
              <CardContent className="p-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 overflow-x-auto">
          <div className="flex gap-2">
            {quickReplies.map((reply, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className="shrink-0 text-xs rounded-full border-primary/30 text-primary hover:bg-primary/10"
                onClick={() => setInputValue(reply)}
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="sticky bottom-0 bg-card border-t border-border p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-primary">
            <Camera className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="说点什么..."
              className="pr-10 rounded-full bg-muted border-0"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`shrink-0 transition-colors ${isRecording ? "text-destructive" : "text-muted-foreground hover:text-primary"}`}
            onClick={() => setIsRecording(!isRecording)}
          >
            {isRecording ? <Pause className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="shrink-0 rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {isRecording && (
          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-destructive">
            <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
            正在录音...点击停止
          </div>
        )}
      </div>
    </div>
  )
}
