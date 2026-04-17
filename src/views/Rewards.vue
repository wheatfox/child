<template>
  <div class="rewards">
    <!-- 顶部导航 -->
    <div class="top-bar">
      <button class="back-btn" @click="goBack">
        <span class="back-arrow">←</span>
        返回首页
      </button>
      <div class="page-title">🎁 我的奖励乐园</div>
      <div class="spacer"></div>
    </div>

    <div class="rewards-container">
      <!-- 当前形象展示区 -->
      <div class="avatar-section">
        <div class="avatar-frame">
          <img 
            v-if="avatarData && avatarData.image" 
            :src="avatarData.image" 
            :alt="avatarData.name"
            class="avatar-image"
          />
          <span v-else-if="avatarData" class="avatar-emoji">{{ avatarData.emoji }}</span>
          <span v-else class="avatar-emoji">🌟</span>
        </div>
        <p class="avatar-name">{{ avatarData?.name || '小伙伴' }}</p>
      </div>

      <!-- 智慧星星总数量 -->
      <div class="stars-section">
        <div class="stars-display">
          <div class="star-icon-large">⭐</div>
          <div class="stars-info">
            <div class="stars-label">智慧星星</div>
            <div class="stars-count">{{ totalStars }}</div>
          </div>
        </div>
        <p class="stars-description">继续学习获得更多奖励！</p>
      </div>

      <!-- 学习统计 -->
      <div class="stats-section">
        <h3 class="section-title">📊 学习统计</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-value">{{ totalCorrect }}</div>
            <div class="stat-label">答对题目</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📝</div>
            <div class="stat-value">{{ totalAttempts }}</div>
            <div class="stat-label">总答题数</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-value">{{ accuracy }}%</div>
            <div class="stat-label">正确率</div>
          </div>
        </div>
      </div>

      <!-- 快捷入口 -->
      <div class="quick-actions">
        <button class="action-btn primary" @click="goToMath">
          <span class="action-icon">🌲</span>
          去学习赚星星
        </button>
        <button class="action-btn" @click="goToPet">
          <span class="action-icon">🐾</span>
          宠物中心
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getStorage } from '../utils/storage'
import { useAvatar } from '../composables/useAvatar'

const router = useRouter()
const { getAvatar } = useAvatar()

// 状态
const avatarData = ref(null)
const totalStars = ref(0)
const totalCorrect = ref(0)
const totalAttempts = ref(0)

// 计算属性
const accuracy = computed(() => {
  if (totalAttempts.value === 0) return 0
  return Math.round((totalCorrect.value / totalAttempts.value) * 100)
})

// 方法
const goBack = () => {
  router.push('/home')
}

const goToMath = () => {
  router.push('/math/scenes')
}

const goToPet = () => {
  router.push('/pet/feed')
}

const loadRewards = () => {
  // 加载形象
  avatarData.value = getAvatar()
  
  // 加载星星数量
  totalStars.value = getStorage('totalStars') || 0
  
  // 加载学习统计
  const progress = getStorage('userProgress') || {}
  totalCorrect.value = progress.totalCorrect || 0
  totalAttempts.value = progress.totalAttempts || 0
}

// 生命周期
onMounted(() => {
  loadRewards()
})
</script>

<style scoped>
.rewards {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFF9E6 0%, #FFE6F0 50%, #E8F5E9 100%);
  padding: 20px;
}

/* 顶部导航 */
.top-bar {
  display: flex;
  align-items: center;
  max-width: 700px;
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

.page-title {
  flex: 1;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  color: #333;
}

.spacer {
  width: 80px;
}

/* 奖励容器 */
.rewards-container {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 形象展示区 */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.avatar-frame {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFE6F0 0%, #FFB6C1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  border: 4px solid #FF6B9D;
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-emoji {
  font-size: 64px;
}

.avatar-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

/* 星星展示区 */
.stars-section {
  padding: 30px;
  background: linear-gradient(135deg, #FFF9C4 0%, #FFE082 100%);
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(255, 193, 7, 0.3);
  text-align: center;
}

.stars-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 12px;
}

.star-icon-large {
  font-size: 64px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  animation: starPulse 1.5s ease-in-out infinite;
}

@keyframes starPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.stars-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.stars-label {
  font-size: 16px;
  color: #666;
  margin-bottom: 4px;
}

.stars-count {
  font-size: 56px;
  font-weight: bold;
  color: #F57F17;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stars-description {
  font-size: 16px;
  color: #666;
  margin: 0;
}

/* 统计区域 */
.stats-section {
  padding: 24px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0 0 20px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, #F5F5F5 0%, #E8F5E9 100%);
  border-radius: 16px;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.stat-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: #666;
  text-align: center;
}

/* 快捷操作 */
.quick-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #FF6B9D 0%, #FF8FAB 100%);
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
}

.action-btn.primary {
  background: linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.action-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(255, 107, 157, 0.4);
}

.action-btn:active {
  transform: translateY(-2px);
}

.action-icon {
  font-size: 28px;
}

/* 响应式设计 */
@media (max-width: 520px) {
  .stars-display {
    flex-direction: column;
    gap: 12px;
  }

  .stars-info {
    align-items: center;
  }

  .stars-count {
    font-size: 48px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .action-btn {
    padding: 14px 24px;
    font-size: 16px;
  }
}
</style>
