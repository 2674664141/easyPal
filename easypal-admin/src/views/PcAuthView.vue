<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const activeTab = ref<'login' | 'register'>('login')
const role = ref<'admin' | 'counselor'>('admin')

const loginForm = reactive({
  account: '',
  password: '',
  remember: true,
})

const registerForm = reactive({
  nickname: '',
  email: '',
  phone: '',
  code: '',
  password: '',
  agree: false,
})

const features = [
  { title: 'AI智能陪伴', desc: '24小时在线的心理健康助手' },
  { title: '情绪追踪', desc: '多维度分析你的情绪变化' },
  { title: '心情日记', desc: '记录每一刻的心情故事' },
  { title: '温暖社区', desc: '与同路人分享成长的力量' },
]

const goByRole = () => {
  if (!loginForm.account || !loginForm.password) {
    message.warning('请填写账号和密码')
    return
  }
  router.push(role.value === 'admin' ? '/admin' : '/counselor')
}

const createAccount = () => {
  if (!registerForm.agree) {
    message.warning('请先同意用户协议和隐私政策')
    return
  }
  message.success('注册成功，请登录')
  activeTab.value = 'login'
}
</script>

<template>
  <div class="auth-page">
    <section class="left-panel">
      <h1>心灵伴侣</h1>
      <p class="subtitle">AI驱动的心理健康陪伴平台</p>
      <a-row :gutter="[12, 12]">
        <a-col v-for="item in features" :key="item.title" :span="12">
          <a-card size="small">
            <a-typography-title :level="5" style="margin: 0 0 8px 0">{{ item.title }}</a-typography-title>
            <a-typography-text type="secondary">{{ item.desc }}</a-typography-text>
          </a-card>
        </a-col>
      </a-row>
    </section>

    <section class="right-panel">
      <a-card class="auth-card" :bordered="false">
        <a-typography-title :level="3">欢迎使用心灵伴侣</a-typography-title>
        <a-typography-paragraph type="secondary">登录或注册后进入PC端后台</a-typography-paragraph>

        <a-radio-group v-model:value="role" style="margin-bottom: 16px">
          <a-radio-button value="admin">超级管理员</a-radio-button>
          <a-radio-button value="counselor">咨询师</a-radio-button>
        </a-radio-group>

        <a-tabs v-model:activeKey="activeTab">
          <a-tab-pane key="login" tab="登录">
            <a-form layout="vertical">
              <a-form-item label="账号">
                <a-input v-model:value="loginForm.account" placeholder="手机号/邮箱/用户名" />
              </a-form-item>
              <a-form-item label="密码">
                <a-input-password v-model:value="loginForm.password" placeholder="请输入密码" />
              </a-form-item>
              <a-form-item>
                <a-checkbox v-model:checked="loginForm.remember">记住我的登录状态</a-checkbox>
              </a-form-item>
              <a-button type="primary" block @click="goByRole">登录</a-button>
            </a-form>
          </a-tab-pane>

          <a-tab-pane key="register" tab="注册">
            <a-form layout="vertical">
              <a-form-item label="昵称">
                <a-input v-model:value="registerForm.nickname" />
              </a-form-item>
              <a-form-item label="邮箱">
                <a-input v-model:value="registerForm.email" />
              </a-form-item>
              <a-form-item label="手机号">
                <a-input v-model:value="registerForm.phone" />
              </a-form-item>
              <a-form-item label="验证码">
                <a-input v-model:value="registerForm.code" />
              </a-form-item>
              <a-form-item label="设置密码">
                <a-input-password v-model:value="registerForm.password" />
              </a-form-item>
              <a-form-item>
                <a-checkbox v-model:checked="registerForm.agree">我已阅读并同意用户协议与隐私政策</a-checkbox>
              </a-form-item>
              <a-button type="primary" block @click="createAccount">创建账号</a-button>
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </section>
  </div>
</template>

<style scoped>
.auth-page {
  display: flex;
  min-height: 100vh;
}

.left-panel {
  width: 56%;
  padding: 48px;
  background: linear-gradient(135deg, #f0f7ff, #f8f2ff);
}

.left-panel h1 {
  margin: 0;
  font-size: 40px;
}

.subtitle {
  margin: 12px 0 28px;
  color: #6b7280;
}

.right-panel {
  width: 44%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.auth-card {
  width: 100%;
  max-width: 520px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08);
}
</style>
