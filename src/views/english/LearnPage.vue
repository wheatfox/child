<template>
  <div class="learn-page">
    <!-- 顶部导航栏 -->
    <div class="top-bar">
      <button class="back-btn" @click="goBack">
        <span class="back-arrow">←</span>
        返回
      </button>
      <div class="topic-title">{{ topicName }}</div>
      <div class="progress-indicator">
        <span>{{ currentIndex + 1 }} / {{ words.length }}</span>
      </div>
    </div>

    <!-- 单词卡片组件 -->
    <WordCard
      v-if="currentWord"
      :word="currentWord"
      :bg-color="topicColor"
      :auto-play="autoPlay"
      @play="handlePlay"
      @repeat="handleRepeat"
      @next="handleNext"
      @play-end="handlePlayEnd"
    />

    <!-- 进度条 -->
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="{ width: `${((currentIndex + 1) / words.length) * 100}%` }"
      ></div>
    </div>

    <!-- 完成提示 -->
    <transition name="fade">
      <div v-if="showComplete" class="complete-modal">
        <div class="modal-content">
          <span class="modal-icon">🎉</span>
          <h2>太棒了！</h2>
          <p>你已经学完了所有单词</p>
          <div class="modal-actions">
            <button class="btn-review" @click="handleReview">
              🔁 复习一遍
            </button>
            <button class="btn-quiz" @click="handleQuiz">
               去测验
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getTopicById, getWordsByTopic } from '@/utils/english/wordBank'
import { getStorage, setStorage } from '@/utils/storage'
import WordCard from '@/components/english/WordCard.vue'

const router = useRouter()
const route = useRoute()

// 状态
const topicId = ref(route.params.topicId)
const words = ref([])
const currentIndex = ref(0)
const autoPlay = ref(true)
const showComplete = ref(false)

// 计算属性
const topicName = computed(() => {
  return getTopicById(topicId.value)?.name || '英语学习'
})

const topicColor = computed(() => {
  return getTopicById(topicId.value)?.color || '#FFF'
})

const currentWord = computed(() => {
  return words.value[currentIndex.value] || null
})

// 方法
const goBack = () => {
  router.push('/english/topics')
}

const loadWords = () => {
  words.value = getWordsByTopic(topicId.value)
}

// 播放
const handlePlay = () => {
  // 可以在这里记录学习行为
}

// 跟读
const handleRepeat = () => {
  // 记录跟读行为
}

// 下一个
const handleNext = () => {
  if (currentIndex.value < words.value.length - 1) {
    currentIndex.value++
    autoPlay.value = true
  } else {
    // 学完了所有单词
    completeLearning()
  }
}

// 播放结束
const handlePlayEnd = () => {
  // 播放结束后可以自动下一个（可选）
  // 这里等待用户点击"下一个"按钮
}

// 完成学习
const completeLearning = () => {
  showComplete.value = true
  
  // 保存学习进度
  saveProgress()
}

// 保存进度
const saveProgress = () => {
  const progress = getStorage(`englishProgress_${topicId.value}`) || {
    learnedWords: [],
    quizStars: 0
  }
  
  // 添加已学单词
  words.value.forEach(word => {
    if (!progress.learnedWords.includes(word.id)) {
      progress.learnedWords.push(word.id)
    }
  })
  
  progress.lastLearnTime = new Date().toISOString()
  setStorage(`englishProgress_${topicId.value}`, progress)
}

// 复习
const handleReview = () => {
  showComplete.value = false
  currentIndex.value = 0
  autoPlay.value = true
}

// 去测验
const handleQuiz = () => {
  router.push(`/english/quiz/${topicId.value}`)
}

// 生命周期
onMounted(() => {
  loadWords()
})

onUnmounted(() => {
  // 清理状态
})
</script>

<style scoped>
.learn-page {
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

.topic-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.progress-indicator {
  padding: 8px 16px;
  background: linear-gradient(135deg, #FFF9C4 0%, #FFE082 100%);
  border-radius: 20px;
  font-weight: bold;
  font-size: 16px;
  color: #F57F17;
}

/* 进度条 */
.progress-bar {
  max-width: 500px;
  margin: 20px auto;
  height: 8px;
  background: #E0E0E0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4ECDC4 0%, #45B7AA 100%);
  transition: width 0.5s ease;
  border-radius: 4px;
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
  padding: 40px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
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
  font-size: 64px;
  line-height: 1;
}

.modal-content h2 {
  font-size: 28px;
  font-weight: 900;
  color: #333;
  margin: 0;
}

.modal-content p {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-review,
.btn-quiz {
  padding: 14px 28px;
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

.btn-quiz {
  background: linear-gradient(135deg, #FF6B9D 0%, #F05A8A 100%);
  color: white;
}

.btn-quiz:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(255, 107, 157, 0.3);
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
  .top-bar {
    padding: 10px 16px;
  }

  .topic-title {
    font-size: 16px;
  }

  .progress-indicator {
    font-size: 14px;
    padding: 6px 12px;
  }

  .modal-content {
    padding: 30px 24px;
  }

  .modal-content h2 {
    font-size: 24px;
  }

  .modal-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn-review,
  .btn-quiz {
    width: 100%;
  }
}
</style>
