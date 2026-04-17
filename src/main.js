import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'

// 检测 localStorage 是否可用
function isLocalStorageAvailable() {
  try {
    const test = '__storage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

// 如果 localStorage 不可用，提供降级方案
if (!isLocalStorageAvailable()) {
  console.warn('localStorage 不可用，部分功能可能受限')
  // 可以在这里添加降级逻辑
}

// 全局错误监听
window.addEventListener('error', (event) => {
  console.error('全局错误:', event.error)
  // 在页面上显示错误提示
  showErrorMessage('发生错误：' + event.error?.message)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('未处理的 Promise 拒绝:', event.reason)
  showErrorMessage('加载失败，请刷新重试')
})

// 在页面上显示错误提示
function showErrorMessage(message) {
  const errorDiv = document.createElement('div')
  errorDiv.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #ff4444;
    color: white;
    padding: 16px;
    font-size: 14px;
    z-index: 99999;
    text-align: center;
  `
  errorDiv.textContent = message
  document.body.appendChild(errorDiv)
}

// 添加加载状态监控
window.addEventListener('load', () => {
  console.log('页面加载完成')
  console.log('User Agent:', navigator.userAgent)
  console.log('localStorage 可用:', isLocalStorageAvailable())
})

const app = createApp(App)
app.use(router)
app.mount('#app')

console.log('应用已启动')
