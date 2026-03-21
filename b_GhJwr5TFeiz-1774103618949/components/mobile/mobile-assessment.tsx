"use client"

import { useState } from "react"
import {
  ArrowLeft,
  ClipboardList,
  Clock,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Brain,
  HeartPulse,
  Frown,
  Zap,
  Star
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface MobileAssessmentProps {
  onBack: () => void
}

export function MobileAssessment({ onBack }: MobileAssessmentProps) {
  const [activeTest, setActiveTest] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  const tests = [
    {
      id: "phq9",
      title: "抑郁自评量表 (PHQ-9)",
      desc: "评估近两周内的抑郁症状",
      icon: Frown,
      questions: 9,
      time: "3-5分钟",
      color: "bg-blue-500",
      lightColor: "bg-blue-50 text-blue-600",
      completed: false,
    },
    {
      id: "gad7",
      title: "焦虑自评量表 (GAD-7)",
      desc: "评估近两周内的焦虑程度",
      icon: Zap,
      questions: 7,
      time: "2-4分钟",
      color: "bg-amber-500",
      lightColor: "bg-amber-50 text-amber-600",
      completed: true,
      lastScore: 8,
      lastDate: "3天前",
    },
    {
      id: "psqi",
      title: "睡眠质量评估 (PSQI)",
      desc: "评估近一个月的睡眠质量",
      icon: HeartPulse,
      questions: 10,
      time: "5-8分钟",
      color: "bg-indigo-500",
      lightColor: "bg-indigo-50 text-indigo-600",
      completed: false,
    },
    {
      id: "stress",
      title: "压力感知量表 (PSS-10)",
      desc: "评估你感受到的压力程度",
      icon: Brain,
      questions: 10,
      time: "4-6分钟",
      color: "bg-rose-500",
      lightColor: "bg-rose-50 text-rose-600",
      completed: true,
      lastScore: 15,
      lastDate: "1周前",
    },
  ]

  const sampleQuestions = [
    "做事时提不起劲或没有兴趣",
    "感到心情低落、沮丧或绝望",
    "入睡困难、睡不安稳或睡眠过多",
    "感觉疲倦或没有活力",
    "食欲不振或吃太多",
    "觉得自己很糟——或觉得自己很失败",
    "集中注意力困难",
    "行动或说话速度缓慢到别人能注意到",
    "有不如死掉或伤害自己的念头",
  ]

  const options = [
    { label: "完全不会", value: 0 },
    { label: "好几天", value: 1 },
    { label: "一半以上的天数", value: 2 },
    { label: "几乎每天", value: 3 },
  ]

  if (showResult) {
    const totalScore = answers.reduce((a, b) => a + b, 0)
    const maxScore = 27
    const percentage = (totalScore / maxScore) * 100
    let level = "正常"
    let levelColor = "text-emerald-500"
    let levelBg = "bg-emerald-50"
    let suggestion = "你目前的心理状态良好，请继续保持健康的生活方式。"

    if (totalScore >= 20) {
      level = "重度"
      levelColor = "text-red-500"
      levelBg = "bg-red-50"
      suggestion = "建议你尽快与心理咨询师预约面对面咨询，我们会为你提供专业支持。"
    } else if (totalScore >= 15) {
      level = "中重度"
      levelColor = "text-orange-500"
      levelBg = "bg-orange-50"
      suggestion = "建议你联系心理咨询师获取专业指导，同时可以尝试放松训练。"
    } else if (totalScore >= 10) {
      level = "中度"
      levelColor = "text-amber-500"
      levelBg = "bg-amber-50"
      suggestion = "建议你多关注自己的情绪变化，可以尝试放松音频和正念练习。"
    } else if (totalScore >= 5) {
      level = "轻度"
      levelColor = "text-sky-500"
      levelBg = "bg-sky-50"
      suggestion = "你可能有一些轻微的不适感，注意调节作息和情绪。"
    }

    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => { setShowResult(false); setActiveTest(null); setCurrentQuestion(0); setAnswers([]) }}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="font-semibold text-foreground">测评结果</span>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 space-y-5">
          <div className="text-center space-y-4">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${levelBg}`}>
              <span className={`text-3xl font-bold ${levelColor}`}>{totalScore}</span>
            </div>
            <div>
              <Badge className={`${levelBg} ${levelColor} border-0 text-sm px-4 py-1`}>
                {level}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">总分 {totalScore}/{maxScore}</p>
          </div>

          <Card className="border border-border/50">
            <CardContent className="p-4 space-y-3">
              <h3 className="text-sm font-semibold text-foreground">分数解读</h3>
              <div className="space-y-2">
                {[
                  { range: "0-4 分", label: "正常", color: "bg-emerald-500" },
                  { range: "5-9 分", label: "轻度", color: "bg-sky-500" },
                  { range: "10-14 分", label: "中度", color: "bg-amber-500" },
                  { range: "15-19 分", label: "中重度", color: "bg-orange-500" },
                  { range: "20-27 分", label: "重度", color: "bg-red-500" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    <span className="text-sm text-muted-foreground flex-1">{item.range}</span>
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <AlertCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">建议</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{suggestion}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => { setShowResult(false); setActiveTest(null); setCurrentQuestion(0); setAnswers([]) }}>
              返回列表
            </Button>
            <Button className="flex-1">
              联系咨询师
            </Button>
          </div>
        </main>
      </div>
    )
  }

  if (activeTest) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => { setActiveTest(null); setCurrentQuestion(0); setAnswers([]) }}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <span className="font-semibold text-foreground text-sm">抑郁自评量表 (PHQ-9)</span>
              <Progress value={(currentQuestion / sampleQuestions.length) * 100} className="h-1 mt-1.5" />
            </div>
            <span className="text-xs text-muted-foreground">{currentQuestion + 1}/{sampleQuestions.length}</span>
          </div>
        </header>

        <main className="flex-1 px-4 py-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">在过去两周里，以下症状出现的频率</p>
              <h2 className="text-lg font-semibold text-foreground leading-relaxed">
                {sampleQuestions[currentQuestion]}
              </h2>
            </div>

            <div className="space-y-3">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    const newAnswers = [...answers]
                    newAnswers[currentQuestion] = option.value
                    setAnswers(newAnswers)
                    if (currentQuestion < sampleQuestions.length - 1) {
                      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 200)
                    } else {
                      setTimeout(() => setShowResult(true), 200)
                    }
                  }}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 text-left transition-all",
                    answers[currentQuestion] === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-5 w-5 rounded-full border-2 flex items-center justify-center",
                      answers[currentQuestion] === option.value
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/30"
                    )}>
                      {answers[currentQuestion] === option.value && (
                        <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-foreground">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>

        <div className="sticky bottom-0 bg-card border-t border-border p-4 flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          >
            上一题
          </Button>
          <Button
            className="flex-1"
            disabled={answers[currentQuestion] === undefined}
            onClick={() => {
              if (currentQuestion < sampleQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1)
              } else {
                setShowResult(true)
              }
            }}
          >
            {currentQuestion === sampleQuestions.length - 1 ? "查看结果" : "下一题"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="font-semibold text-foreground">心理测评</span>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 space-y-4 pb-8">
        <Card className="border-0 bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">科学评估你的心理状态</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  以下量表均为国际认可的心理评估工具，评估结果仅供参考，如有需要请寻求专业帮助。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground px-1">选择测评量表</h2>
          {tests.map((test) => (
            <Card
              key={test.id}
              className="border border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => setActiveTest(test.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${test.color} shrink-0`}>
                    <test.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground">{test.title}</h3>
                      {test.completed && (
                        <Badge className="bg-emerald-50 text-emerald-600 border-0 text-[10px]">
                          <CheckCircle className="h-3 w-3 mr-0.5" />
                          已完成
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{test.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BarChart3 className="h-3 w-3" />
                        {test.questions} 题
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {test.time}
                      </span>
                      {test.completed && test.lastScore !== undefined && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          上次得分: {test.lastScore} ({test.lastDate})
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border border-border/50">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">我的测评记录</h3>
            <div className="space-y-3">
              {[
                { name: "GAD-7 焦虑量表", score: 8, level: "轻度", date: "2024-03-18", color: "text-sky-500 bg-sky-50" },
                { name: "PSS-10 压力量表", score: 15, level: "中度", date: "2024-03-11", color: "text-amber-500 bg-amber-50" },
              ].map((record, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">{record.name}</p>
                    <p className="text-xs text-muted-foreground">{record.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{record.score}分</span>
                    <Badge className={`${record.color} border-0 text-[10px]`}>{record.level}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
