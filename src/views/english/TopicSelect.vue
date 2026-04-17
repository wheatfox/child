<template>
  <div class="topic-select">
    <div class="topic-container">
      <!-- 返回按钮 -->
      <header class="header">
        <button class="back-btn" @click="goBack">
          <span class="back-arrow">←</span>
          返回首页
        </button>
        <div class="title-area">
          <h1 class="title">🗣️ 奇妙英语角 🗣️</h1>
          <p class="subtitle">选择一个主题开始学习英语吧！</p>
        </div>
      </header>

      <!-- 主题列表 -->
      <main class="topic-list">
        <div
          v-for="(topic, index) in topics"
          :key="topic.id"
          class="topic-card"
          :style="{ backgroundColor: topic.color, animationDelay: `${index * 0.15}s` }"
          @click="selectTopic(topic)"
        >
          <div class="card-icon">{{ topic.icon }}</div>
          <div class="card-info">
            <div class="card-header">
              <span class="card-name">{{ topic.name }}</span>
            </div>
            <p class="card-desc">{{ topic.description }}</p>
            <div class="card-footer">
              <span class="word-count">📚 {{ getLearnedCount(topic.id) }} / {{ getTopicWordCount(topic.id) }} {{ topic.type === 'phrase' ? '条短语' : '词' }}</span>
              <button class="start-btn" @click.stop="selectTopic(topic)">
                开始学习 →
              </button>
            </div>
          </div>
        </div>
      </main>

      <!-- 底部星星显示 -->
      <footer class="footer">
        <div class="stars-hint" v-if="totalStars > 0">
          ⭐ 你已有 {{ totalStars }} 颗智慧星星
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAllTopics, getWordCount } from '@/utils/english/wordBank'
import { getStorage } from '@/utils/storage'

const router = useRouter()
const topics = ref([])
const totalStars = ref(0)

// 获取已学单词数
const getLearnedCount = (topicId) => {
  const progress = getStorage(`englishProgress_${topicId}`)
  return progress?.learnedWords?.length || 0
}

// 获取主题单词数
const getTopicWordCount = (topicId) => {
  const topic = getAllTopics().find(t => t.id === topicId)
  if (!topic) return 0
  // 短语主题显示为"短语"
  return topic.type === 'phrase' ? 20 : 20
}

// 加载星星总数
const loadStars = () => {
  const stars = getStorage('totalStars') || 0
  totalStars.value = stars
}

onMounted(() => {
  topics.value = getAllTopics()
  loadStars()
})

function goBack() {
  router.push('/home')
}

function selectTopic(topic) {
  // 如果是对话主题，进入对话学习页面
  if (topic.type === 'conversation') {
    router.push('/english/conversations')
  } else {
    // 其他主题进入单词学习页面
    router.push(`/english/learn/${topic.id}`)
  }
}
</script>

<style scoped>
.topic-select {
  min-height: 100vh;
  background: linear-gradient(180deg, #E8F5E9 0%, #C8E6C9 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.topic-container {
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 0;
  top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.85);
  color: #2E7D32;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.back-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.14);
}

.back-arrow {
  font-size: 18px;
  line-height: 1;
}

.title-area {
  text-align: center;
  margin-top: 36px;
}

.title {
  font-size: clamp(24px, 6vw, 34px);
  font-weight: 900;
  color: #2E7D32;
  margin: 0;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px rgba(46, 125, 50, 0.15);
}

.subtitle {
  font-size: clamp(15px, 3.5vw, 18px);
  color: #558B2F;
  margin: 8px 0 0;
  font-weight: 600;
}

.topic-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 8px 0;
}

.topic-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 28px;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  animation: cardFadeIn 0.5s ease both;
  border: 2px solid transparent;
}

.topic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.6);
}

.topic-card:active {
  transform: translateY(-2px) scale(0.98);
  transition-duration: 0.1s;
}

.card-icon {
  font-size: 64px;
  line-height: 1;
  flex-shrink: 0;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.12));
}

.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.card-name {
  font-size: 21px;
  font-weight: 800;
  color: #333;
}

.card-desc {
  font-size: 15px;
  color: #555;
  margin: 0;
  line-height: 1.5;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.word-count {
  font-size: 14px;
  font-weight: 700;
  color: #333;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 12px;
  border-radius: 12px;
}

.start-btn {
  padding: 10px 22px;
  background: #FF6B9D;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  box-shadow: 0 3px 10px rgba(255, 107, 157, 0.35);
}

.start-btn:hover {
  transform: scale(1.06);
  box-shadow: 0 5px 18px rgba(255, 107, 157, 0.45);
  opacity: 0.95;
}

.start-btn:active {
  transform: scale(0.96);
  transition-duration: 0.1s;
}

.footer {
  width: 100%;
  text-align: center;
  padding: 8px 0 4px;
}

.stars-hint {
  font-size: 17px;
  font-weight: 700;
  color: #F9A825;
  text-shadow: 0 1px 4px rgba(249, 168, 37, 0.3);
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 520px) {
  .topic-container {
    max-width: 100%;
    gap: 16px;
  }

  .header {
    padding-top: 4px;
  }

  .back-btn {
    position: static;
    align-self: flex-start;
    padding: 6px 14px;
    font-size: 14px;
  }

  .title-area {
    margin-top: 12px;
  }

  .title {
    font-size: 22px;
  }

  .subtitle {
    font-size: 14px;
  }

  .topic-card {
    flex-direction: column;
    text-align: center;
    padding: 20px 20px 24px;
    gap: 12px;
  }

  .card-icon {
    font-size: 56px;
  }

  .card-name {
    font-size: 19px;
  }

  .card-desc {
    font-size: 14px;
  }

  .card-footer {
    flex-direction: column;
    gap: 10px;
  }

  .start-btn {
    width: 100%;
    max-width: 220px;
    padding: 12px 20px;
    font-size: 16px;
  }

  .stars-hint {
    font-size: 15px;
  }
}
</style>
