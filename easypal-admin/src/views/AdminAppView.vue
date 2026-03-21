<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

type AdminKey = 'dashboard' | 'users' | 'counselors' | 'content' | 'analytics'
const router = useRouter()
const current = ref<AdminKey>('dashboard')
const selectedKeys = ref<string[]>([current.value])

const menuItems = [
  { key: 'dashboard', label: '数据大盘' },
  { key: 'users', label: '用户管理' },
  { key: 'counselors', label: '咨询师管理' },
  { key: 'content', label: '内容审核' },
  { key: 'analytics', label: '统计报表' },
]

const users = [
  { name: '李明', school: '计算机学院', emotion: '积极', risk: '低风险', chats: 156, diary: 28, active: '10分钟前' },
  { name: '王芳', school: '外国语学院', emotion: '中性', risk: '低风险', chats: 89, diary: 45, active: '30分钟前' },
  { name: '张伟', school: '经济管理学院', emotion: '低落', risk: '高风险', chats: 234, diary: 12, active: '1小时前' },
]

const counselors = [
  { name: '王老师', department: '心理健康中心', title: '高级心理咨询师', students: 156, alerts: 45, articles: 12, status: '在职' },
  { name: '李老师', department: '学生工作处', title: '心理咨询师', students: 98, alerts: 23, articles: 8, status: '在职' },
  { name: '张老师', department: '心理健康中心', title: '心理咨询师', students: 0, alerts: 0, articles: 0, status: '停用' },
]

const pendingContents = [
  { title: '如何应对期末考试焦虑', author: '王老师', type: '文章', time: '2024-03-20 10:30', status: '待审核' },
  { title: '深度放松冥想音频', author: '李老师', type: '音频', time: '2024-03-20 09:15', status: '待审核' },
  { title: '分享一个减压方法', author: '用户A***3', type: '帖子', time: '2024-03-19 22:15', status: '被举报' },
]

const dashboardCards = computed(() => [
  { title: '活跃用户', value: '2,847', change: '+12.5%' },
  { title: '今日对话', value: '1,234', change: '+8.2%' },
  { title: '危机预警', value: '3', change: '-2' },
  { title: '平均响应', value: '1.2s', change: '-0.3s' },
])

const handleMenuSelect = ({ key }: { key: string }) => {
  current.value = key as AdminKey
  selectedKeys.value = [key]
}

const logout = () => router.push('/auth')
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider width="232" theme="light">
      <div class="logo">心灵伴侣 · 管理中心</div>
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline" @select="handleMenuSelect">
        <a-menu-item v-for="item in menuItems" :key="item.key">
          {{ item.label }}
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="header">
        <a-space>
          <a-input-search placeholder="搜索用户、内容、记录..." style="width: 320px" />
        </a-space>
        <a-space>
          <a-badge count="5" />
          <a-button @click="logout">退出登录</a-button>
        </a-space>
      </a-layout-header>

      <a-layout-content style="padding: 20px">
        <div v-if="current === 'dashboard'">
          <a-row :gutter="[16, 16]">
            <a-col v-for="card in dashboardCards" :key="card.title" :span="6">
              <a-card>
                <a-statistic :title="card.title" :value="card.value" />
                <a-typography-text type="secondary">较昨日 {{ card.change }}</a-typography-text>
              </a-card>
            </a-col>
          </a-row>
          <a-row :gutter="[16, 16]" style="margin-top: 16px">
            <a-col :span="12">
              <a-card title="最新预警">
                <a-list :data-source="[{ user: '用户A***3', reason: '多次提及负面情绪关键词' }, { user: '用户B***7', reason: '情绪波动异常' }]">
                  <template #renderItem="{ item }">
                    <a-list-item>
                      <a-tag color="red">风险</a-tag>
                      {{ item.user }} - {{ item.reason }}
                    </a-list-item>
                  </template>
                </a-list>
              </a-card>
            </a-col>
            <a-col :span="12">
              <a-card title="最近活跃">
                <a-list :data-source="[{ name: '李同学', action: '完成AI对话' }, { name: '王同学', action: '发布心情日记' }]">
                  <template #renderItem="{ item }">
                    <a-list-item>{{ item.name }} - {{ item.action }}</a-list-item>
                  </template>
                </a-list>
              </a-card>
            </a-col>
          </a-row>
        </div>

        <div v-else-if="current === 'users'">
          <a-card title="用户管理">
            <a-table :data-source="users" :pagination="{ pageSize: 5 }" row-key="name">
              <a-table-column title="姓名" data-index="name" key="name" />
              <a-table-column title="学院" data-index="school" key="school" />
              <a-table-column title="情绪状态" data-index="emotion" key="emotion" />
              <a-table-column title="风险等级" data-index="risk" key="risk" />
              <a-table-column title="对话数" data-index="chats" key="chats" />
              <a-table-column title="日记数" data-index="diary" key="diary" />
              <a-table-column title="最后活跃" data-index="active" key="active" />
            </a-table>
          </a-card>
        </div>

        <div v-else-if="current === 'counselors'">
          <a-card title="咨询师管理">
            <a-table :data-source="counselors" row-key="name">
              <a-table-column title="咨询师" data-index="name" key="name" />
              <a-table-column title="部门" data-index="department" key="department" />
              <a-table-column title="职称" data-index="title" key="title" />
              <a-table-column title="负责学生" data-index="students" key="students" />
              <a-table-column title="处理预警" data-index="alerts" key="alerts" />
              <a-table-column title="文章数" data-index="articles" key="articles" />
              <a-table-column title="状态" data-index="status" key="status" />
            </a-table>
          </a-card>
        </div>

        <div v-else-if="current === 'content'">
          <a-card title="内容审核">
            <a-table :data-source="pendingContents" row-key="title">
              <a-table-column title="标题" data-index="title" key="title" />
              <a-table-column title="作者" data-index="author" key="author" />
              <a-table-column title="类型" data-index="type" key="type" />
              <a-table-column title="提交时间" data-index="time" key="time" />
              <a-table-column title="状态" data-index="status" key="status" />
              <a-table-column title="操作" key="action">
                <template #default>
                  <a-space>
                    <a-button size="small" type="primary">通过</a-button>
                    <a-button size="small" danger>拒绝</a-button>
                  </a-space>
                </template>
              </a-table-column>
            </a-table>
          </a-card>
        </div>

        <div v-else>
          <a-row :gutter="[16, 16]">
            <a-col :span="8"><a-card><a-statistic title="总用户数" value="12847" /></a-card></a-col>
            <a-col :span="8"><a-card><a-statistic title="总对话数" value="156234" /></a-card></a-col>
            <a-col :span="8"><a-card><a-statistic title="日均活跃" value="2456" /></a-card></a-col>
          </a-row>
          <a-card title="AI分析洞察" style="margin-top: 16px">
            <a-timeline>
              <a-timeline-item color="orange">考试季压力增加，建议增加减压内容推送。</a-timeline-item>
              <a-timeline-item color="blue">深夜活跃用户增多，建议关注睡眠问题。</a-timeline-item>
              <a-timeline-item color="green">社区互动效果良好，可继续推广。</a-timeline-item>
            </a-timeline>
          </a-card>
        </div>
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
