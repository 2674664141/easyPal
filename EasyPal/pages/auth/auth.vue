<template>
  <view class="auth">
    <scroll-view scroll-y class="auth__scroll" :show-scrollbar="false">
      <view class="auth__header">
        <view class="auth__logo-wrap">
          <view class="auth__logo">
            <svg class="auth__logo-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
              />
            </svg>
          </view>
          <view class="auth__logo-badge" aria-hidden="true">
            <svg class="auth__logo-sparkles" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M9 3l1.5 4.5L15 9l-4.5 1.5L9 15l-1.5-4.5L3 9l4.5-1.5L9 3z" />
              <path d="M18 5l.8 2.2L21 8l-2.2.8L18 11l-.8-2.2L15 8l2.2-.8L18 5z" />
            </svg>
          </view>
        </view>
        <text class="auth__title">心灵伴侣</text>
        <text class="auth__subtitle">
          {{ isLogin ? '欢迎回来，我一直在这里等你' : '开启你的心灵成长之旅' }}
        </text>
      </view>

      <view class="auth__card">
        <view class="auth__tabs">
          <view class="auth__tabs-inner">
            <view class="auth__tab" :class="{ 'auth__tab--active': isLogin }" @click="isLogin = true">
              登录
            </view>
            <view class="auth__tab" :class="{ 'auth__tab--active': !isLogin }" @click="isLogin = false">
              注册
            </view>
          </view>
        </view>

        <view v-if="isLogin" class="auth__form">
          <view class="auth__method-row">
            <view
              class="auth__method"
              :class="{ 'auth__method--active': loginMethod === 'phone' }"
              @click="loginMethod = 'phone'"
            >
              <svg class="auth__method-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
                />
              </svg>
              手机号登录
            </view>
            <view
              class="auth__method"
              :class="{ 'auth__method--active': loginMethod === 'account' }"
              @click="loginMethod = 'account'"
            >
              <svg class="auth__method-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              账号登录
            </view>
          </view>

          <template v-if="loginMethod === 'phone'">
            <view class="auth__field">
              <text class="auth__label">手机号</text>
              <view class="auth__input-wrap">
                <svg class="auth__input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
                  />
                </svg>
                <UiInput v-model="form.phone" type="number" placeholder="请输入手机号" custom-class="auth__input" />
              </view>
            </view>

            <view class="auth__field">
              <text class="auth__label">验证码</text>
              <view class="auth__code-row">
                <view class="auth__input-wrap auth__input-wrap--code">
                  <svg class="auth__input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
                    />
                  </svg>
                  <UiInput v-model="form.code" type="text" placeholder="请输入验证码" custom-class="auth__input" />
                </view>
                <UiButton
                  variant="outline"
                  size="sm"
                  custom-class="auth__code-btn"
                  :disabled="codeCooldown > 0"
                  @click="getCode"
                >
                  {{ codeCooldown > 0 ? `${codeCooldown}s` : '获取验证码' }}
                </UiButton>
              </view>
            </view>
          </template>

          <template v-else>
            <view class="auth__field">
              <text class="auth__label">账号</text>
              <view class="auth__input-wrap">
                <svg class="auth__input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <UiInput v-model="form.account" type="text" placeholder="手机号/邮箱/用户名" custom-class="auth__input" />
              </view>
            </view>

            <view class="auth__field">
              <text class="auth__label">密码</text>
              <view class="auth__input-wrap">
                <svg class="auth__input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 17v2" />
                  <path d="M5 10V8a7 7 0 0 1 14 0v2" />
                  <rect x="5" y="10" width="14" height="12" rx="2" />
                </svg>
                <UiInput
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="请输入密码"
                  custom-class="auth__input auth__input--pw"
                />
                <view class="auth__pw-toggle" @click="showPassword = !showPassword">
                  <UiIcon :name="showPassword ? 'eye-off' : 'eye'" size="sm" />
                </view>
              </view>
              <view class="auth__forgot">
                <text class="auth__link">忘记密码？</text>
              </view>
            </view>
          </template>

          <UiButton custom-class="auth__submit" @click="submitLogin">
            登录
            <UiIcon name="arrow-right" size="sm" />
          </UiButton>
        </view>

        <view v-else class="auth__form">
          <view class="auth__field">
            <text class="auth__label">昵称</text>
            <view class="auth__input-wrap">
              <svg class="auth__input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <UiInput v-model="form.nickname" type="text" placeholder="给自己取个名字吧" custom-class="auth__input" />
            </view>
          </view>

          <view class="auth__field">
            <text class="auth__label">手机号</text>
            <view class="auth__input-wrap">
              <svg class="auth__input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
                />
              </svg>
              <UiInput v-model="form.phone" type="number" placeholder="请输入手机号" custom-class="auth__input" />
            </view>
          </view>

          <view class="auth__field">
            <text class="auth__label">验证码</text>
            <view class="auth__code-row">
              <view class="auth__input-wrap auth__input-wrap--code">
                <svg class="auth__input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
                  />
                </svg>
                <UiInput v-model="form.code" type="text" placeholder="请输入验证码" custom-class="auth__input" />
              </view>
              <UiButton
                variant="outline"
                size="sm"
                custom-class="auth__code-btn"
                :disabled="codeCooldown > 0"
                @click="getCode"
              >
                {{ codeCooldown > 0 ? `${codeCooldown}s` : '获取验证码' }}
              </UiButton>
            </view>
          </view>

          <view class="auth__field">
            <text class="auth__label">设置密码</text>
            <view class="auth__input-wrap">
              <svg class="auth__input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 17v2" />
                <path d="M5 10V8a7 7 0 0 1 14 0v2" />
                <rect x="5" y="10" width="14" height="12" rx="2" />
              </svg>
              <UiInput
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="6-20位数字、字母或符号"
                custom-class="auth__input auth__input--pw"
              />
              <view class="auth__pw-toggle" @click="showPassword = !showPassword">
                <UiIcon :name="showPassword ? 'eye-off' : 'eye'" size="sm" />
              </view>
            </view>
          </view>

          <view class="auth__terms" @click="agreeTerms = !agreeTerms">
            <view class="auth__check" :class="{ 'auth__check--on': agreeTerms }">
              <view v-if="agreeTerms" class="auth__check-dot" />
            </view>
            <text class="auth__terms-text">
              我已阅读并同意
              <text class="auth__link">《用户协议》</text>
              和
              <text class="auth__link">《隐私政策》</text>
            </text>
          </view>

          <UiButton custom-class="auth__submit" :disabled="!agreeTerms" @click="submitRegister">
            注册
            <UiIcon name="arrow-right" size="sm" />
          </UiButton>
        </view>

        <view class="auth__social">
          <text class="auth__social-title">其他登录方式</text>
          <view class="auth__social-row">
            <view class="auth__social-btn auth__social-btn--wechat">
              <svg class="auth__social-icon auth__social-icon--wechat" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89l-.002-.002zm-2.746 2.96c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"
                />
              </svg>
            </view>
            <view class="auth__social-btn auth__social-btn--github">
              <svg class="auth__social-icon auth__social-icon--github" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12.003 2c-5.514 0-9.987 4.473-9.987 9.987 0 4.424 2.865 8.187 6.839 9.503.5.092.683-.217.683-.483 0-.237-.008-.867-.013-1.702-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.203 2.393.1 2.646.64.698 1.028 1.59 1.028 2.682 0 3.841-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.183 22 16.42 22 11.987 22 6.473 17.522 2 12.003 2z"
                />
              </svg>
            </view>
            <view class="auth__social-btn auth__social-btn--mail">
              <svg class="auth__social-icon auth__social-icon--mail" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
            </view>
          </view>
        </view>
      </view>

      <view class="auth__security">
        <svg class="auth__shield" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        <text>你的隐私安全是我们的首要任务</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import UiButton from '@/components/ui/Button.vue'
import UiInput from '@/components/ui/Input.vue'
import UiIcon from '@/components/ui/Icon.vue'
import { post } from '@/utils/api.js'

const isLogin = ref(true)
const loginMethod = ref('account') // phone | account
const showPassword = ref(false)
const agreeTerms = ref(false)

const form = ref({
  phone: '',
  code: '',
  account: '',
  password: '',
  nickname: ''
})

const codeCooldown = ref(0)
let timer = null

function startCooldown() {
  if (codeCooldown.value > 0) return
  codeCooldown.value = 60
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    codeCooldown.value -= 1
    if (codeCooldown.value <= 0) {
      clearInterval(timer)
      timer = null
    }
  }, 1000)
}

/** 注册用 register；手机号登录用 login_sms */
function getSmsScene() {
  if (!isLogin.value) return 'register'
  if (loginMethod.value === 'phone') return 'login_sms'
  return null
}

async function getCode() {
  if (codeCooldown.value > 0) return
  const scene = getSmsScene()
  if (!scene) {
    uni.showToast({ title: '当前为账号登录，无需验证码', icon: 'none' })
    return
  }
  const phone = String(form.value.phone || '').trim()
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    uni.showToast({ title: '请输入正确手机号', icon: 'none' })
    return
  }
  try {
    await post('/api/auth/sms/send', { phone, scene })
    uni.showToast({ title: '验证码已发送（开发环境请看后端日志）', icon: 'none' })
    startCooldown()
  } catch (e) {
    uni.showToast({ title: e.message || '发送失败', icon: 'none' })
  }
}

function saveSession(data) {
  if (!data || !data.token) return
  uni.setStorageSync('ep_token', data.token)
  uni.setStorageSync('ep_user', data.user || {})
  uni.setStorageSync('ep_authed', true)
}

async function submitLogin() {
  try {
    if (loginMethod.value === 'account') {
      const acc = String(form.value.account || '').trim()
      const pw = String(form.value.password || '').trim()
      if (!acc || !pw) {
        uni.showToast({ title: '请输入账号和密码', icon: 'none' })
        return
      }
      const data = await post('/api/auth/login/password', { account: acc, password: pw })
      saveSession(data)
      uni.showToast({ title: '登录成功', icon: 'success' })
      uni.switchTab({ url: '/pages/index/index' })
      return
    }
    const phone = String(form.value.phone || '').trim()
    const code = String(form.value.code || '').trim()
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      uni.showToast({ title: '请输入正确手机号', icon: 'none' })
      return
    }
    if (!code) {
      uni.showToast({ title: '请输入验证码', icon: 'none' })
      return
    }
    const data = await post('/api/auth/login/sms', { phone, code })
    saveSession(data)
    uni.showToast({ title: '登录成功', icon: 'success' })
    uni.switchTab({ url: '/pages/index/index' })
  } catch (e) {
    uni.showToast({ title: e.message || '登录失败', icon: 'none' })
  }
}

async function submitRegister() {
  if (!agreeTerms.value) return
  const nickname = String(form.value.nickname || '').trim()
  const phone = String(form.value.phone || '').trim()
  const code = String(form.value.code || '').trim()
  const password = String(form.value.password || '')
  if (!nickname) {
    uni.showToast({ title: '请输入昵称', icon: 'none' })
    return
  }
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    uni.showToast({ title: '请输入正确手机号', icon: 'none' })
    return
  }
  if (!code) {
    uni.showToast({ title: '请输入验证码', icon: 'none' })
    return
  }
  if (password.length < 6 || password.length > 20) {
    uni.showToast({ title: '密码长度为 6~20 位', icon: 'none' })
    return
  }
  try {
    await post('/api/auth/register', { nickname, phone, code, password })
    form.value.code = ''
    form.value.password = ''
    form.value.account = phone
    loginMethod.value = 'account'
    isLogin.value = true
    uni.showToast({ title: '注册成功，请登录', icon: 'success' })
  } catch (e) {
    uni.showToast({ title: e.message || '注册失败', icon: 'none' })
  }
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
  timer = null
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.auth {
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(0, 171, 147, 0.06) 0%, #f7fafc 40%, #f7fafc 100%);
}

.auth__scroll {
  height: 100vh;
}

.auth__header {
  padding: calc(86rpx + env(safe-area-inset-top)) 48rpx 24rpx;
  text-align: center;
}

.auth__logo-wrap {
  position: relative;
  display: inline-block;
  margin-bottom: 20rpx;
}

.auth__logo {
  width: 160rpx;
  height: 160rpx;
  border-radius: 80rpx;
  background: linear-gradient(135deg, #00ab93 0%, rgba(0, 171, 147, 0.65) 100%);
  box-shadow: 0 18rpx 42rpx rgba(0, 171, 147, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth__logo-heart {
  width: 80rpx;
  height: 80rpx;
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.auth__logo-badge {
  position: absolute;
  right: -8rpx;
  bottom: -8rpx;
  width: 64rpx;
  height: 64rpx;
  border-radius: 32rpx;
  background: #d6a54d;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth__logo-sparkles {
  width: 34rpx;
  height: 34rpx;
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.auth__title {
  display: block;
  font-size: 44rpx;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 10rpx;
}

.auth__subtitle {
  display: block;
  font-size: 26rpx;
  color: rgba(15, 23, 42, 0.58);
}

.auth__card {
  margin: 0 36rpx;
  background: rgba(255, 255, 255, 0.95);
  border: 1rpx solid rgba(0, 0, 0, 0.05);
  border-radius: 48rpx;
  box-shadow: 0 18rpx 48rpx rgba(0, 0, 0, 0.08);
  padding: 34rpx 34rpx 30rpx;
}

.auth__tabs {
  margin-bottom: 28rpx;
}

.auth__tabs-inner {
  display: flex;
  background: #eef2f7;
  padding: 8rpx;
  border-radius: 32rpx;
}

.auth__tab {
  flex: 1;
  text-align: center;
  padding: 18rpx 0;
  border-radius: 24rpx;
  font-size: 26rpx;
  font-weight: 600;
  color: rgba(15, 23, 42, 0.55);
}

.auth__tab--active {
  background: #fff;
  color: #0f172a;
  box-shadow: 0 8rpx 16rpx rgba(15, 23, 42, 0.06);
}

.auth__form {
  display: flex;
  flex-direction: column;
  gap: 26rpx;
}

.auth__method-row {
  display: flex;
  gap: 28rpx;
  padding: 0 6rpx;
}

.auth__method {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding-bottom: 12rpx;
  font-size: 26rpx;
  color: rgba(15, 23, 42, 0.55);
  border-bottom: 4rpx solid transparent;
}

.auth__method--active {
  color: #00ab93;
  border-bottom-color: #00ab93;
  font-weight: 700;
}

.auth__method-icon {
  width: 28rpx;
  height: 28rpx;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.auth__field {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
}

.auth__label {
  font-size: 24rpx;
  color: rgba(15, 23, 42, 0.55);
}

.auth__input-wrap {
  position: relative;
}

.auth__input-icon {
  position: absolute;
  left: 26rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 28rpx;
  height: 28rpx;
  fill: none;
  stroke: rgba(15, 23, 42, 0.4);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  pointer-events: none;
}

.auth__input {
  padding-left: 72rpx !important;
  background: rgba(15, 23, 42, 0.04) !important;
  border: 0 !important;
  border-radius: 28rpx !important;
  min-height: 88rpx !important;
}

.auth__input--pw {
  padding-right: 72rpx !important;
}

.auth__pw-toggle {
  position: absolute;
  right: 22rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 64rpx;
  height: 64rpx;
  border-radius: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(15, 23, 42, 0.55);
}

.auth__code-row {
  display: flex;
  gap: 18rpx;
  align-items: center;
}

.auth__input-wrap--code {
  flex: 1;
}

.auth__code-btn {
  height: 88rpx !important;
  border-radius: 24rpx !important;
  border-color: rgba(0, 171, 147, 0.45) !important;
  color: #00ab93 !important;
  background: transparent !important;
  padding: 0 22rpx !important;
  white-space: nowrap;
}

.auth__forgot {
  display: flex;
  justify-content: flex-end;
  margin-top: 10rpx;
}

.auth__link {
  color: #00ab93;
}

.auth__submit {
  width: 100%;
  height: 96rpx !important;
  margin-top: 10rpx;
  border-radius: 28rpx !important;
  background: #00ab93 !important;
  box-shadow: 0 18rpx 44rpx rgba(0, 171, 147, 0.25);
  font-weight: 700;
}

.auth__terms {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
  padding-top: 4rpx;
}

.auth__check {
  width: 32rpx;
  height: 32rpx;
  border-radius: 10rpx;
  border: 2rpx solid rgba(15, 23, 42, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rpx;
}

.auth__check--on {
  border-color: #00ab93;
  background: rgba(0, 171, 147, 0.12);
}

.auth__check-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 8rpx;
  background: #00ab93;
}

.auth__terms-text {
  font-size: 22rpx;
  color: rgba(15, 23, 42, 0.55);
  line-height: 1.45;
  flex: 1;
}

.auth__social {
  margin-top: 34rpx;
  padding-top: 28rpx;
  border-top: 1rpx solid rgba(0, 0, 0, 0.06);
}

.auth__social-title {
  display: block;
  text-align: center;
  font-size: 24rpx;
  color: rgba(15, 23, 42, 0.55);
  margin-bottom: 22rpx;
}

.auth__social-row {
  display: flex;
  justify-content: center;
  gap: 34rpx;
}

.auth__social-btn {
  width: 96rpx;
  height: 96rpx;
  border-radius: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth__social-btn--wechat {
  background: rgba(7, 193, 96, 0.10);
}
.auth__social-btn--github {
  background: rgba(18, 150, 219, 0.10);
}
.auth__social-btn--mail {
  background: rgba(234, 67, 53, 0.10);
}

.auth__social-icon {
  width: 48rpx;
  height: 48rpx;
}
.auth__social-icon--wechat {
  color: #07c160;
}
.auth__social-icon--github {
  color: #1296db;
}
.auth__social-icon--mail {
  fill: none;
  stroke: #ea4335;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.auth__security {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  margin: 26rpx 0 calc(20rpx + env(safe-area-inset-bottom));
  font-size: 22rpx;
  color: rgba(15, 23, 42, 0.55);
}

.auth__shield {
  width: 28rpx;
  height: 28rpx;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>

