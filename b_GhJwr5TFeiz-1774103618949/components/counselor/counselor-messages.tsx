"use client"

import { useState } from "react"
import { 
  Search, 
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Star,
  Archive,
  CheckCheck,
  Clock
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

export function CounselorMessages() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [message, setMessage] = useState("")

  const conversations = [
    { 
      id: 1, 
      name: "张三", 
      avatar: "张",
      lastMessage: "老师，我最近总是睡不着觉，感觉压力很大...",
      time: "10:23",
      unread: 2,
      online: true
    },
    { 
      id: 2, 
      name: "李四", 
      avatar: "李",
      lastMessage: "谢谢老师的建议，我会试试的",
      time: "09:15",
      unread: 0,
      online: false
    },
    { 
      id: 3, 
      name: "王五", 
      avatar: "王",
      lastMessage: "老师，我想预约一次线下咨询",
      time: "昨天",
      unread: 1,
      online: true
    },
    { 
      id: 4, 
      name: "赵六", 
      avatar: "赵",
      lastMessage: "好的老师，我明白了",
      time: "昨天",
      unread: 0,
      online: false
    },
    { 
      id: 5, 
      name: "钱七", 
      avatar: "钱",
      lastMessage: "老师，关于上次说的呼吸练习...",
      time: "2天前",
      unread: 0,
      online: false
    },
  ]

  const messages = [
    { 
      id: 1, 
      sender: "student", 
      content: "老师您好，我最近感觉压力很大，晚上总是睡不着觉", 
      time: "10:15",
      read: true
    },
    { 
      id: 2, 
      sender: "counselor", 
      content: "你好，能跟我具体说说是什么让你感到压力大吗？是学业、人际关系还是其他方面？", 
      time: "10:18",
      read: true
    },
    { 
      id: 3, 
      sender: "student", 
      content: "主要是期末考试快到了，我感觉自己复习进度很慢，很焦虑", 
      time: "10:20",
      read: true
    },
    { 
      id: 4, 
      sender: "student", 
      content: "而且最近和室友的关系也不太好，经常因为小事吵架", 
      time: "10:21",
      read: true
    },
    { 
      id: 5, 
      sender: "counselor", 
      content: "我理解你现在的感受，同时面对学业压力和人际关系问题确实不容易。首先，关于考试焦虑，你可以试着把大目标分解成小目标，每天完成一点就给自己一点正向反馈。", 
      time: "10:22",
      read: true
    },
    { 
      id: 6, 
      sender: "student", 
      content: "老师，我最近总是睡不着觉，感觉压力很大...", 
      time: "10:23",
      read: false
    },
  ]

  const selectedConversation = conversations.find(c => c.id === selectedChat)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">咨询留言</h1>
        <p className="text-muted-foreground mt-1">回复学生的咨询问题，提供心理支持</p>
      </div>

      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        {/* Conversation List */}
        <Card className="border-border/60 flex flex-col">
          <CardHeader className="pb-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索对话..." className="pl-9" />
            </div>
          </CardHeader>
          <ScrollArea className="flex-1">
            <CardContent className="p-2">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  className={`w-full p-3 rounded-lg text-left transition-colors mb-1 ${
                    selectedChat === conv.id 
                      ? "bg-primary/10" 
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-11 w-11">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {conv.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {conv.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 border-2 border-card rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground">{conv.name}</span>
                        <span className="text-[10px] text-muted-foreground">{conv.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate pr-2">
                          {conv.lastMessage}
                        </p>
                        {conv.unread > 0 && (
                          <Badge className="h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                            {conv.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </ScrollArea>
        </Card>

        {/* Chat Window */}
        <Card className="col-span-2 border-border/60 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {selectedConversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.online && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 border-2 border-card rounded-full" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedConversation.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedConversation.online ? "在线" : "离线"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.sender === "counselor" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[70%] ${msg.sender === "counselor" ? "order-1" : ""}`}>
                        <div className={`p-3 rounded-2xl ${
                          msg.sender === "counselor" 
                            ? "bg-primary text-primary-foreground rounded-br-md" 
                            : "bg-muted rounded-bl-md"
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <div className={`flex items-center gap-1 mt-1 ${
                          msg.sender === "counselor" ? "justify-end" : ""
                        }`}>
                          <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                          {msg.sender === "counselor" && (
                            <CheckCheck className={`h-3 w-3 ${msg.read ? "text-primary" : "text-muted-foreground"}`} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-border">
                <div className="flex items-end gap-2">
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <Paperclip className="h-5 w-5 text-muted-foreground" />
                  </Button>
                  <Textarea 
                    placeholder="输入消息..." 
                    className="min-h-[44px] max-h-32 resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={1}
                  />
                  <Button size="icon" className="flex-shrink-0">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                    快捷回复
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                    发送文章
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                    布置任务
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              选择一个对话开始聊天
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
