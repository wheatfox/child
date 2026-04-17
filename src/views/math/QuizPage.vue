<template>
  <div class="quiz-page">
    <!-- 顶部导航栏 -->
    <div class="top-bar">
      <button class="back-btn" @click="goBack">
        <span class="back-arrow">←</span>
        返回
      </button>
      <div class="scene-title">{{ sceneName }}</div>
      <div class="stars-display">
        <span class="star-icon">⭐</span>
        <span class="star-count">{{ totalStars }}</span>
      </div>
    </div>

    <!-- 数学题目组件 -->
    <MathQuestion 
      v-if="currentQuestion"
      :question="currentQuestion"
      :show-replay="true"
      @replay="handleReplay"
      @refresh="handleRefresh"
    />

    <!-- 思维提示组件（答错时显示） -->
    <ThinkingHint
      v-if="showThinkingHint && currentQuestion"
      :type="currentQuestion.type"
      :num1="currentQuestion.num1"
      :num2="currentQuestion.num2"
      :answer="currentQuestion.answer"
      :user-answer="selectedAnswer"
      :blank-position="currentQuestion.blankPosition"
      :icon="currentQuestion.icon"
      :on-close="closeThinkingHint"
    />

    <!-- 选项按钮区域 -->
    <div class="options-container">
      <p class="options-title">请选择正确答案：</p>
      <div class="options-grid">
        <OptionButton
          v-for="(option, index) in shuffledOptions"
          :key="index"
          :number="option"
          :icon="getOptionIcon(option)"
          :is-selected="selectedAnswer === option"
          :is-correct="isCorrect && selectedAnswer === option"
          :is-wrong="!isCorrect && selectedAnswer === option"
          :is-disabled="hasAnswered && !isCorrect"
          @click="handleSelect(option)"
        />
      </div>
    </div>

    <!-- 反馈动画层 -->
    <transition name="fade">
      <div v-if="showFeedback" class="feedback-overlay">
        <FeedbackAnimation 
          :type="isCorrect ? 'correct' : 'wrong'"
          :message="feedbackMessage"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { generateQuestion, generateQuestionAdvanced, generateQuestion20, SCENE_CONFIGS } from '@/utils/questionGenerator'
import { getStorage, setStorage } from '@/utils/storage'
import MathQuestion from '@/components/MathQuestion.vue'
import OptionButton from '@/components/OptionButton.vue'
import FeedbackAnimation from '@/components/FeedbackAnimation.vue'
import ThinkingHint from '@/components/ThinkingHint.vue'

const router = useRouter()
const route = useRoute()

// 状态
const sceneId = ref(route.params.sceneId)
const currentQuestion = ref(null)
const selectedAnswer = ref(null)
const isCorrect = ref(false)
const hasAnswered = ref(false)
const totalStars = ref(0)
const showFeedback = ref(false)
const feedbackMessage = ref('')
const difficultyLevel = ref('10-add') // 默认难度

// 计算属性
const sceneName = computed(() => {
  return SCENE_CONFIGS[sceneId.value]?.name || '数学挑战'
})

const shuffledOptions = computed(() => {
  if (!currentQuestion.value) return []
  // 打乱选项顺序
  return [...currentQuestion.value.options].sort(() => Math.random() - 0.5)
})

// 答错时显示思维提示
const showThinkingHint = ref(false)

// 方法
const goBack = () => {
  router.push('/math/scenes')
}

const loadStars = () => {
  const stars = getStorage('totalStars') || 0
  totalStars.value = stars
}

const loadDifficulty = () => {
  const savedDifficulty = getStorage('difficultyLevel')
  if (savedDifficulty) {
    difficultyLevel.value = savedDifficulty
  }
}

const generateNewQuestion = () => {
  try {
    let question
    // 根据难度选择使用不同的题目生成函数（场景决定运算类型）
    if (difficultyLevel.value === '50-mixed') {
      // 10-50 以内的题目
      question = generateQuestionAdvanced(sceneId.value)
    } else if (difficultyLevel.value === '20-mixed') {
      // 20 以内的题目
      question = generateQuestion20(sceneId.value)
    } else {
      // 10 以内的题目
      question = generateQuestion(sceneId.value)
    }
    currentQuestion.value = question
    resetState()
  } catch (error) {
    console.error('生成题目失败:', error)
  }
}

const resetState = () => {
  selectedAnswer.value = null
  isCorrect.value = false
  hasAnswered.value = false
  showFeedback.value = false
}

// 语音播放功能
const speakText = (text) => {
  if ('speechSynthesis' in window) {
    // 取消之前的语音
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN' // 中文
    utterance.rate = 0.9 // 稍慢的语速，适合儿童
    utterance.pitch = 1.1 // 稍高的音调，更亲切
    
    // 尝试选择合适的语音
    const voices = window.speechSynthesis.getVoices()
    const zhVoice = voices.find(voice => voice.lang.includes('zh') || voice.lang.includes('CN'))
    if (zhVoice) {
      utterance.voice = zhVoice
    }
    
    window.speechSynthesis.speak(utterance)
  } else {
    console.warn('浏览器不支持语音合成')
  }
}

const handleReplay = () => {
  if (currentQuestion.value) {
    speakText(currentQuestion.value.questionText)
  }
}

const handleRefresh = () => {
  // 取消当前语音
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
  resetState()
  generateNewQuestion()
}

const getOptionIcon = (option) => {
  // 根据场景返回不同的选项图标
  const icons = {
    addition: '🌰',
    subtraction: '🦆',
    'fill-blank': '🍯'
  }
  return icons[sceneId.value] || '🎈'
}

const handleSelect = (option) => {
  if (hasAnswered.value) return
  
  selectedAnswer.value = option
  hasAnswered.value = true
  
  // 对于填空题，使用 correctAnswer 字段判断；其他题型使用 answer 字段
  const correctAnswer = currentQuestion.value.correctAnswer || currentQuestion.value.answer
  const correct = option === correctAnswer
  isCorrect.value = correct
  
  if (correct) {
    // 答对了
    feedbackMessage.value = getRandomPraise()
    showFeedback.value = true
    totalStars.value += 1
    setStorage('totalStars', totalStars.value)
    
    // 播放表扬语音
    speakText(feedbackMessage.value)
    
    // 2.5 秒后自动进入下一题
    setTimeout(() => {
      showFeedback.value = false
      generateNewQuestion()
    }, 2500)
  } else {
    // 答错了 - 显示思维提示而不是立即重试
    showThinkingHint.value = true
    
    // 播放鼓励语音
    speakText('再仔细想一想，你一定可以的！')
  }
}

const closeThinkingHint = () => {
  showThinkingHint.value = false
  resetState()
}

const getRandomPraise = () => {
  const praises = ['太棒了！', '你真聪明！', '好厉害！', '继续加油！', '完美！']
  return praises[Math.floor(Math.random() * praises.length)]
}

const getRandomEncouragement = () => {
  const encouragements = ['再试一次吧！', '没关系，加油！', '你可以的！', '别放弃！']
  return encouragements[Math.floor(Math.random() * encouragements.length)]
}

// 生命周期
onMounted(() => {
  loadStars()
  loadDifficulty()
  generateNewQuestion()
  
  // 初始化语音（预加载语音列表）
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices()
  }
})

onUnmounted(() => {
  // 清理语音
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
})
</script>

<style scoped>
.quiz-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #B3E5FC 100%);
  padding: 20px;
}

/* 顶部导航栏 */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 800px;
  margin: 0 auto 20px;
  padding: 12px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #F5F5F5;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #E0E0E0;
  transform: translateY(-2px);
}

.back-arrow {
  font-size: 18px;
}

.scene-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.stars-display {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #FFF9C4 0%, #FFE082 100%);
  border-radius: 20px;
  font-weight: bold;
}

.star-icon {
  font-size: 20px;
}

.star-count {
  font-size: 18px;
  color: #F57F17;
}

/* 选项区域 */
.options-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.options-title {
  text-align: center;
  font-size: 18px;
  color: #666;
  margin: 0 0 20px 0;
  font-weight: 500;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
  justify-items: center;
}

/* 反馈层 */
.feedback-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* 响应式设计 */
@media (max-width: 520px) {
  .top-bar {
    padding: 10px 16px;
  }

  .scene-title {
    font-size: 16px;
  }

  .options-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>
