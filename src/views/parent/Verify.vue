<template>
  <div class="parent-verify">
    <div class="verify-container">
      <!-- 标题区域 -->
      <div class="header">
        <h1 class="title">🔒 爸爸妈妈中心</h1>
        <p class="subtitle">请先回答下面的问题</p>
      </div>

      <!-- 验证问题区域 -->
      <div class="question-section">
        <div class="question-card">
          <p class="question-text">{{ questionText }}</p>
          
          <!-- 选项按钮 -->
          <div class="options-grid">
            <button
              v-for="(option, index) in options"
              :key="index"
              class="option-btn"
              @click="handleAnswer(option)"
            >
              {{ option }}
            </button>
          </div>

          <!-- 错误提示 -->
          <transition name="fade">
            <div v-if="showError" class="error-message">
              <span class="error-icon">😅</span>
              <span class="error-text">{{ errorText }}</span>
            </div>
          </transition>

          <!-- 锁定提示 -->
          <transition name="fade">
            <div v-if="isLocked" class="lock-message">
              <span class="lock-icon">⏰</span>
              <span class="lock-text">请等待 {{ lockCountdown }} 秒后再试</span>
            </div>
          </transition>
        </div>
      </div>

      <!-- 返回按钮 -->
      <button class="back-btn" @click="goBack">
        <span class="back-arrow">←</span>
        返回首页
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getStorage, setStorage } from '@/utils/storage'

const router = useRouter()

// 状态
const questionText = ref('')
const correctAnswer = ref(0)
const options = ref([])
const showError = ref(false)
const errorText = ref('')
const errorCount = ref(0)
const isLocked = ref(false)
const lockCountdown = ref(0)
let lockTimer = null

// 方法
const goBack = () => {
  router.push('/home')
}

const generateQuestion = () => {
  // 生成简单的加法题（5 以内）
  const num1 = Math.floor(Math.random() * 5) + 1
  const num2 = Math.floor(Math.random() * 5) + 1
  correctAnswer.value = num1 + num2
  questionText.value = `${num1} + ${num2} = ?`
  
  // 生成选项（包含正确答案）
  const opts = new Set()
  opts.add(correctAnswer.value)
  
  while (opts.size < 4) {
    const wrong = Math.floor(Math.random() * 10) + 2
    if (wrong !== correctAnswer.value) {
      opts.add(wrong)
    }
  }
  
  options.value = Array.from(opts).sort(() => Math.random() - 0.5)
}

const handleAnswer = (answer) => {
  if (isLocked.value) return
  
  if (answer === correctAnswer.value) {
    // 答对了，跳转到家长中心
    setStorage('parentVerified', true)
    router.push('/parent/dashboard')
  } else {
    // 答错了
    errorCount.value += 1
    
    if (errorCount.value >= 3) {
      // 锁定 30 秒
      isLocked.value = true
      lockCountdown.value = 30
      errorText.value = '答错 3 次啦，请等待 30 秒后再试'
      showError.value = true
      
      // 启动倒计时
      lockTimer = setInterval(() => {
        lockCountdown.value -= 1
        if (lockCountdown.value <= 0) {
          clearInterval(lockTimer)
          isLocked.value = false
          errorCount.value = 0
          showError.value = false
          generateQuestion() // 换新题目
        }
      }, 1000)
    } else {
      errorText.value = '答案不对哦，请再试一次'
      showError.value = true
      setTimeout(() => {
        showError.value = false
      }, 2000)
    }
  }
}

// 生命周期
onMounted(() => {
  generateQuestion()
})

onUnmounted(() => {
  if (lockTimer) {
    clearInterval(lockTimer)
  }
})
</script>

<style scoped>
.parent-verify {
  min-height: 100vh;
  background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.verify-container {
  width: 100%;
  max-width: 500px;
}

/* 头部 */
.header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 32px;
  font-weight: bold;
  color: #1976D2;
  margin: 0 0 10px 0;
}

.subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

/* 问题卡片 */
.question-section {
  margin-bottom: 30px;
}

.question-card {
  background: white;
  border-radius: 24px;
  padding: 40px 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.question-text {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 0 0 30px 0;
  font-family: 'Courier New', monospace;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.option-btn {
  padding: 20px;
  font-size: 28px;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #42A5F5 0%, #2196F3 100%);
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

.option-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(33, 150, 243, 0.4);
}

.option-btn:active {
  transform: translateY(-2px);
}

/* 错误提示 */
.error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: #FFF3E0;
  border-radius: 12px;
  border: 2px solid #FFB74D;
}

.error-icon {
  font-size: 32px;
}

.error-text {
  font-size: 16px;
  color: #F57C00;
  font-weight: 500;
}

/* 锁定提示 */
.lock-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: #FFEBEE;
  border-radius: 12px;
  border: 2px solid #EF9A9A;
}

.lock-icon {
  font-size: 32px;
}

.lock-text {
  font-size: 16px;
  color: #D32F2F;
  font-weight: 500;
}

/* 返回按钮 */
.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  background: white;
  border: 2px solid #1976D2;
  color: #1976D2;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.back-btn:hover {
  background: #E3F2FD;
  transform: translateY(-2px);
}

.back-arrow {
  font-size: 20px;
}

/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 520px) {
  .title {
    font-size: 26px;
  }

  .question-text {
    font-size: 28px;
  }

  .option-btn {
    padding: 16px;
    font-size: 24px;
  }
}
</style>
