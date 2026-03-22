import { API_BASE } from '@/utils/config.js'

function parseBody(res) {
  let body = res.data
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return null
    }
  }
  return body
}

function authHeader() {
  const token = uni.getStorageSync('ep_token')
  return token ? { Authorization: 'Bearer ' + token } : {}
}

function handleSuccess(res, resolve, reject) {
  const body = parseBody(res)
  const msg = body && body.message ? body.message : '请求失败'
  if (res.statusCode >= 200 && res.statusCode < 300) {
    if (body && body.code === 0) {
      resolve(body.data)
      return
    }
    reject(new Error(msg))
    return
  }
  reject(new Error(body && body.message ? body.message : `请求失败(${res.statusCode})`))
}

/**
 * POST JSON，约定后端返回 { code, message, data }，code===0 为成功。
 */
export function post(path, data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: API_BASE + path,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data,
      success(res) {
        handleSuccess(res, resolve, reject)
      },
      fail(err) {
        reject(new Error(err.errMsg || '网络错误'))
      }
    })
  })
}

/**
 * POST JSON，自动带登录 Token（Authorization: Bearer）。
 */
export function postWithAuth(path, data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: API_BASE + path,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        ...authHeader()
      },
      data,
      success(res) {
        handleSuccess(res, resolve, reject)
      },
      fail(err) {
        reject(new Error(err.errMsg || '网络错误'))
      }
    })
  })
}

/**
 * GET，自动带登录 Token。
 */
export function getWithAuth(path) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: API_BASE + path,
      method: 'GET',
      header: {
        ...authHeader()
      },
      success(res) {
        handleSuccess(res, resolve, reject)
      },
      fail(err) {
        reject(new Error(err.errMsg || '网络错误'))
      }
    })
  })
}
