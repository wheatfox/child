<template>
  <div class="quiz-page">
    <!-- 顶部导航栏 -->
    <div class="top-bar">
      <button class="back-btn" @click="goBack">
        <span class="back-arrow">←</span>
        返回
      </button>
      <div class="quiz-title">英语小测验</div>
      <div class="score-display">
        <span class="star-icon">⭐</span>
        <span class="score">{{ score }}</span>
      </div>
    </div>

    <!-- 题目区域 -->
    <div class="question-container" v-if="currentQuestion">
      <div class="question-image">
        <span class="question-emoji">{{ currentQuestion.word.emoji }}</span>
      </div>
      
      <div class="question-text">
        这个用英语怎么说？
      </div>
      
      <div class="chinese-hint">
        {{ currentQuestion.word.translation }}
      </div>
    </div>

    <!-- 选项按钮区域 -->
    <div class="options-container">
      <OptionButton
        v-for="(option, index) in currentOptions"
        :key="index"
        :number="option.word"
        :icon="option.emoji"
        :is-selected="selectedAnswer === option.id"
        :is-correct="isCorrect && selectedAnswer === option.id"
        :is-wrong="!isCorrect && selectedAnswer === option.id"
        :is-disabled="hasAnswered"
        @click="handleSelect(option)"
      />
    </div>

    <!-- 反馈动画层 -->
    <transition name="fade">
      <div v-if="showFeedback" class="feedback-overlay">
        <div class="feedback-content">
          <span class="feedback-icon">{{ isCorrect ? '🎉' : '💪' }}</span>
          <div class="feedback-text">{{ feedbackMessage }}</div>
          <div v-if="!isCorrect" class="correct-answer">
            正确答案：<strong>{{ currentQuestion.word.word }}</strong>
          </div>
        </div>
      </div>
    </transition>

    <!-- 完成提示 -->
    <transition name="fade">
      <div v-if="showComplete" class="complete-modal">
        <div class="modal-content">
          <span class="modal-icon">🏆</span>
          <h2>测验完成！</h2>
          <div class="score-summary">
            <p>你的得分</p>
            <div class="final-score">{{ score }} / {{ totalQuestions }}</div>
            <div class="stars-display">
              <span v-for="i in starsEarned" :key="i" class="star">⭐</span>
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn-review" @click="handleReview">
              🔁 再测一次
            </button>
            <button class="btn-home" @click="goHome">
              🏠 返回首页
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getWordsByTopic, getTopicById } from '@/utils/english/wordBank'
import { getStorage, setStorage } from '@/utils/storage'
import { speakWord, speakPraise, cancel } from '@/utils/english/audioService'
import OptionButton from '@/components/english/OptionButton.vue'

const router = useRouter()
const route = useRoute()

// 状态
const topicId = ref(route.params.topicId)
const words = ref([])
const currentQuestion = ref(null)
const currentOptions = ref([])
const selectedAnswer = ref(null)
const isCorrect = ref(false)
const hasAnswered = ref(false)
const score = ref(0)
const questionIndex = ref(0)
const showFeedback = ref(false)
const feedbackMessage = ref('')
const showComplete = ref(false)
const totalQuestions = ref(10) // 每次测验 10 题

// 计算属性
const topicName = computed(() => {
  return getTopicById(topicId.value)?.name || '英语测验'
})

const starsEarned = computed(() => {
  const percentage = score.value / totalQuestions.value
  if (percentage >= 0.9) return 3
  if (percentage >= 0.7) return 2
  if (percentage >= 0.5) return 1
  return 0
})

// 方法
const goBack = () => {
  router.push('/english/topics')
}

const goHome = () => {
  router.push('/home')
}

const loadWords = () => {
  words.value = getWordsByTopic(topicId.value)
  generateQuestion()
}

// 生成题目
const generateQuestion = () => {
  if (questionIndex.value >= totalQuestions.value || words.value.length === 0) {
    completeQuiz()
    return
  }
  
  // 随机选择一个单词作为正确答案
  const correctIndex = Math.floor(Math.random() * words.value.length)
  const correctWord = words.value[correctIndex]
  
  // 生成干扰项（3 个错误答案）
  const distractors = []
  const usedIds = new Set([correctWord.id])
  
  while (distractors.length < 3) {
    const randomIndex = Math.floor(Math.random() * words.value.length)
    const word = words.value[randomIndex]
    if (!usedIds.has(word.id)) {
      distractors.push(word)
      usedIds.add(word.id)
    }
  }
  
  // 组合所有选项并打乱
  currentQuestion.value = { word: correctWord }
  currentOptions.value = shuffleArray([correctWord, ...distractors])
  
  // 重置状态
  resetState()
  
  // 自动播放题目发音
  setTimeout(() => {
    speakWord(correctWord.word, correctWord.translation)
  }, 500)
}

// 打乱数组
const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// 重置状态
const resetState = () => {
  selectedAnswer.value = null
  isCorrect.value = false
  hasAnswered.value = false
  showFeedback.value = false
}

// 选择答案
const handleSelect = (option) => {
  if (hasAnswered.value) return
  
  selectedAnswer.value = option.id
  hasAnswered.value = true
  
  const correct = option.id === currentQuestion.value.word.id
  isCorrect.value = correct
  
  if (correct) {
    // 答对了
    score.value++
    feedbackMessage.value = getRandomPraise()
    showFeedback.value = true
    speakPraise(feedbackMessage.value)
    
    setTimeout(() => {
      showFeedback.value = false
      nextQuestion()
    }, 2000)
  } else {
    // 答错了
    feedbackMessage.value = '再加油！'
    showFeedback.value = true
    
    // 播放正确答案的发音
    setTimeout(() => {
      speakWord(
        currentQuestion.value.word.word,
        currentQuestion.value.word.translation,
        () => {
          setTimeout(() => {
            showFeedback.value = false
            nextQuestion()
          }, 1000)
        }
      )
    }, 1000)
  }
}

// 下一题
const nextQuestion = () => {
  questionIndex.value++
  generateQuestion()
}

// 完成测验
const completeQuiz = () => {
  showComplete.value = true
  
  // 保存成绩
  saveProgress()
}

// 保存进度
const saveProgress = () => {
  const progress = getStorage(`englishProgress_${topicId.value}`) || {
    learnedWords: [],
    quizStars: 0
  }
  
  // 增加星星
  progress.quizStars += starsEarned.value
  
  // 更新总分
  const totalStars = getStorage('totalStars') || 0
  setStorage('totalStars', totalStars + starsEarned.value)
  
  setStorage(`englishProgress_${topicId.value}`, progress)
}

// 复习
const handleReview = () => {
  showComplete.value = false
  questionIndex.value = 0
  score.value = 0
  generateQuestion()
}

// 随机表扬语
const getRandomPraise = () => {
  const praises = ['太棒了！', '真聪明！', '好厉害！', '完美！', '继续加油！']
  return praises[Math.floor(Math.random() * praises.length)]
}

// 生命周期
onMounted(() => {
  loadWords()
})

onUnmounted(() => {
  cancel()
})
</script>

<style scoped>
.quiz-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 50%, #B3E5FC 100%);
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

.quiz-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.score-display {
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

.score {
  font-size: 18px;
  color: #F57F17;
}

/* 题目区域 */
.question-container {
  max-width: 500px;
  margin: 0 auto 30px;
  padding: 30px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.question-image {
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #F5F5F5 0%, #E8E8E8 100%);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.question-emoji {
  font-size: 90px;
  line-height: 1;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  animation: emojiPop 0.5s ease-out;
}

@keyframes emojiPop {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.question-text {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.chinese-hint {
  font-size: 20px;
  color: #666;
  background: #F5F5F5;
  padding: 8px 20px;
  border-radius: 20px;
}

/* 选项区域 */
.options-container {
  max-width: 700px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 20px;
}

/* 反馈层 */
.feedback-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.feedback-content {
  background: white;
  border-radius: 24px;
  padding: 40px;
  text-align: center;
  animation: feedbackPop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes feedbackPop {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.feedback-icon {
  font-size: 64px;
  display: block;
  margin-bottom: 16px;
}

.feedback-text {
  font-size: 28px;
  font-weight: bold;
  color: #4ECDC4;
  margin-bottom: 12px;
}

.correct-answer {
  font-size: 20px;
  color: #666;
}

.correct-answer strong {
  color: #F44336;
  font-size: 24px;
}

/* 完成提示 */
.complete-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 24px;
  padding: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  max-width: 400px;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-icon {
  font-size: 72px;
}

.modal-content h2 {
  font-size: 32px;
  font-weight: 900;
  color: #333;
  margin: 0;
}

.score-summary {
  width: 100%;
  padding: 20px;
  background: linear-gradient(135deg, #FFF9C4 0%, #FFE082 100%);
  border-radius: 16px;
}

.score-summary p {
  font-size: 16px;
  color: #666;
  margin: 0 0 12px;
}

.final-score {
  font-size: 48px;
  font-weight: 900;
  color: #F57F17;
  margin-bottom: 16px;
}

.stars-display {
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 32px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  width: 100%;
}

.btn-review,
.btn-home {
  flex: 1;
  padding: 16px 24px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-review {
  background: linear-gradient(135deg, #4ECDC4 0%, #45B7AA 100%);
  color: white;
}

.btn-review:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(78, 205, 196, 0.3);
}

.btn-home {
  background: linear-gradient(135deg, #FFE66D 0%, #FFD54F 100%);
  color: #333;
}

.btn-home:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(255, 230, 109, 0.3);
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
  .options-container {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .question-container {
    padding: 20px;
  }
  
  .question-image {
    width: 120px;
    height: 120px;
  }
  
  .question-emoji {
    font-size: 70px;
  }
  
  .question-text {
    font-size: 18px;
  }
  
  .chinese-hint {
    font-size: 16px;
  }
  
  .modal-content {
    padding: 30px 24px;
  }
  
  .modal-content h2 {
    font-size: 24px;
  }
  
  .final-score {
    font-size: 36px;
  }
  
  .stars-display {
    font-size: 24px;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}
</style>
