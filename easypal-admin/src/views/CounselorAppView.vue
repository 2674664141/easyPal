<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

type CounselorKey = 'dashboard' | 'students' | 'alerts' | 'messages' | 'tasks' | 'resources'

const router = useRouter()
const current = ref<CounselorKey>('dashboard')
const selectedKeys = ref<string[]>([current.value])

const menuItems = [
  { key: 'dashboard', label: '工作台' },
  { key: 'students', label: '学生管理' },
  { key: 'alerts', label: '危机预警' },
  { key: 'messages', label: '咨询留言' },
  { key: 'tasks', label: '心理任务' },
  { key: 'resources', label: '资源管理' },
]

const students = [
  { name: '张三', studentId: '2021001001', college: '计算机学院', score: 35, risk: '高风险', trend: '下降', active: '10分钟前' },
  { name: '李四', studentId: '2021001002', college: '计算机学院', score: 45, risk: '中风险', trend: '稳定', active: '1小时前' },
  { name: '王五', studentId: '2021002001', college: '经济学院', score: 72, risk: '低风险', trend: '上升', active: '3小时前' },
]

const alerts = [
  { student: '张三', level: '高风险', reason: '连续7天消极情绪，文本含高危词汇', status: '待处理' },
  { student: '李四', level: '中风险', reason: '焦虑情绪占比超过30%', status: '待处理' },
  { student: '王五', level: '中风险', reason: '深夜活跃频次增加', status: '处理中' },
]

const messages = [
  { student: '张三', content: '老师，我最近总是睡不着，压力很大...', time: '10:23', unread: 2 },
  { student: '李四', content: '谢谢老师的建议，我会试试。', time: '09:15', unread: 0 },
]

const tasks = [
  { title: '每日呼吸放松练习', type: '放松训练', progress: '8/12', deadline: '2024-01-20' },
  { title: '情绪日记记录', type: '心情记录', progress: '18/25', deadline: '2024-01-25' },
]

const resources = [
  { title: '如何有效管理考试焦虑', type: '文章', views: 328, likes: 45, status: '已发布' },
  { title: '腹式呼吸放松训练', type: '音频', views: 456, likes: 89, status: '已发布' },
]

const handleMenuSelect = ({ key }: { key: string }) => {
  current.value = key as CounselorKey
  selectedKeys.value = [key]
}

const logout = () => router.push('/auth')
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider width="232" theme="light">
      <div class="logo">咨询师工作台</div>
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline" @select="handleMenuSelect">
        <a-menu-item v-for="item in menuItems" :key="item.key">
          {{ item.label }}
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="header">
        <a-input-search placeholder="搜索学生、预警、留言..." style="width: 320px" />
        <a-space>
          <a-badge count="3" />
          <a-button @click="logout">退出登录</a-button>
        </a-space>
      </a-layout-header>

      <a-layout-content style="padding: 20px">
        <div v-if="current === 'dashboard'">
          <a-row :gutter="[16, 16]">
            <a-col :span="6"><a-card><a-statistic title="负责学生" value="156" /></a-card></a-col>
            <a-col :span="6"><a-card><a-statistic title="待处理预警" value="3" /></a-card></a-col>
            <a-col :span="6"><a-card><a-statistic title="未读留言" value="5" /></a-card></a-col>
            <a-col :span="6"><a-card><a-statistic title="本周干预" value="12" /></a-card></a-col>
          </a-row>
          <a-row :gutter="[16, 16]" style="margin-top: 16px">
            <a-col :span="12">
              <a-card title="最新预警">
                <a-list :data-source="alerts">
                  <template #renderItem="{ item }">
                    <a-list-item>
                      <a-tag :color="item.level === '高风险' ? 'red' : 'orange'">{{ item.level }}</a-tag>
                      {{ item.student }} - {{ item.reason }}
                    </a-list-item>
                  </template>
                </a-list>
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card title="今日日程">
                <a-timeline>
                  <a-timeline-item>14:00 与张三进行线下咨询</a-timeline-item>
                  <a-timeline-item>15:30 查看李四本周情绪报告</a-timeline-item>
                  <a-timeline-item>17:00 回复学生咨询留言</a-timeline-item>
                </a-timeline>
              </a-card>
            </a-col>
          </a-row>
        </div>

        <a-card v-else-if="current === 'students'" title="学生管理">
          <a-table :data-source="students" row-key="studentId">
            <a-table-column title="姓名" data-index="name" key="name" />
            <a-table-column title="学号" data-index="studentId" key="studentId" />
            <a-table-column title="学院" data-index="college" key="college" />
            <a-table-column title="情绪分" data-index="score" key="score" />
            <a-table-column title="风险等级" data-index="risk" key="risk" />
            <a-table-column title="趋势" data-index="trend" key="trend" />
            <a-table-column title="最后活跃" data-index="active" key="active" />
          </a-table>
        </a-card>

        <a-card v-else-if="current === 'alerts'" title="危机预警">
          <a-table :data-source="alerts" row-key="student">
            <a-table-column title="学生" data-index="student" key="student" />
            <a-table-column title="风险等级" data-index="level" key="level" />
            <a-table-column title="触发原因" data-index="reason" key="reason" />
            <a-table-column title="状态" data-index="status" key="status" />
            <a-table-column title="操作" key="action">
              <template #default>
                <a-space>
                  <a-button size="small" type="primary">处理</a-button>
                  <a-button size="small">详情</a-button>
                </a-space>
              </template>
            </a-table-column>
          </a-table>
        </a-card>

        <a-card v-else-if="current === 'messages'" title="咨询留言">
          <a-list :data-source="messages" bordered>
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta :title="item.student" :description="item.content" />
                <a-space>
                  <a-tag v-if="item.unread" color="blue">{{ item.unread }} 未读</a-tag>
                  <span>{{ item.time }}</span>
                  <a-button size="small" type="link">回复</a-button>
                </a-space>
              </a-list-item>
            </template>
          </a-list>
        </a-card>

        <a-card v-else-if="current === 'tasks'" title="心理任务">
          <a-table :data-source="tasks" row-key="title">
            <a-table-column title="任务名称" data-index="title" key="title" />
            <a-table-column title="类型" data-index="type" key="type" />
            <a-table-column title="完成进度" data-index="progress" key="progress" />
            <a-table-column title="截止日期" data-index="deadline" key="deadline" />
          </a-table>
        </a-card>

        <a-card v-else title="资源管理">
          <a-table :data-source="resources" row-key="title">
            <a-table-column title="标题" data-index="title" key="title" />
            <a-table-column title="类型" data-index="type" key="type" />
            <a-table-column title="浏览/播放" data-index="views" key="views" />
            <a-table-column title="点赞" data-index="likes" key="likes" />
            <a-table-column title="状态" data-index="status" key="status" />
          </a-table>
        </a-card>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.logo {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-weight: 700;
  border-bottom: 1px solid #f0f0f0;
}

.header {
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 20px;
}
</style>
