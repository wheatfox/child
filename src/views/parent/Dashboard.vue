<template>
  <div class="parent-dashboard">
    <!-- 顶部导航 -->
    <div class="top-bar">
      <button class="back-btn" @click="goBack">
        <span class="back-arrow">←</span>
        返回首页
      </button>
      <div class="page-title">👨‍👩‍👧 家长中心</div>
      <div class="spacer"></div>
    </div>

    <div class="dashboard-container">
      <!-- 学习概览 -->
      <div class="overview-section">
        <h2 class="section-title">📊 孩子学习概览</h2>
        <div class="overview-grid">
          <div class="overview-card">
            <div class="overview-icon">⭐</div>
            <div class="overview-value">{{ totalStars }}</div>
            <div class="overview-label">智慧星星总数</div>
          </div>
          <div class="overview-card">
            <div class="overview-icon">✅</div>
            <div class="overview-value">{{ totalCorrect }}</div>
            <div class="overview-label">答对题目数</div>
          </div>
          <div class="overview-card">
            <div class="overview-icon">📝</div>
            <div class="overview-value">{{ totalAttempts }}</div>
            <div class="overview-label">总答题数</div>
          </div>
          <div class="overview-card">
            <div class="overview-icon">🎯</div>
            <div class="overview-value">{{ accuracy }}%</div>
            <div class="overview-label">正确率</div>
          </div>
        </div>
      </div>

      <!-- 数学难度设置 -->
      <div class="settings-section">
        <h2 class="section-title">⚙️ 数学难度设置</h2>
        <div class="setting-card">
          <label class="setting-label">选择难度级别：</label>
          <select v-model="difficultyLevel" class="difficulty-select" @change="saveDifficulty">
            <option value="10-mixed">10 以内加减法混合</option>
            <option value="20-mixed">20 以内加减法混合</option>
            <option value="50-mixed">10-50 以内加减法混合（挑战）</option>
          </select>
          <p class="setting-hint">难度变更后，下一次进入数学场景时生效</p>
        </div>
      </div>

      <!-- 关于信息 -->
      <div class="info-section">
        <div class="info-card">
          <h3 class="info-title">💡 温馨提示</h3>
          <ul class="info-list">
            <li>建议每天学习时间不超过 30 分钟</li>
            <li>鼓励孩子多次尝试，培养耐心</li>
            <li>答错时给予鼓励，不要批评</li>
            <li>适当休息，保护视力</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getStorage, setStorage } from '@/utils/storage'

const router = useRouter()

// 状态
const totalStars = ref(0)
const totalCorrect = ref(0)
const totalAttempts = ref(0)
const difficultyLevel = ref('10-add')

// 计算属性
const accuracy = computed(() => {
  if (totalAttempts.value === 0) return 0
  return Math.round((totalCorrect.value / totalAttempts.value) * 100)
})

// 方法
const goBack = () => {
  router.push('/home')
}

const loadStats = () => {
  totalStars.value = getStorage('totalStars') || 0
  const progress = getStorage('userProgress') || {}
  totalCorrect.value = progress.totalCorrect || 0
  totalAttempts.value = progress.totalAttempts || 0
  
  // 加载难度设置
  const savedDifficulty = getStorage('difficultyLevel')
  if (savedDifficulty) {
    difficultyLevel.value = savedDifficulty
  }
}

const saveDifficulty = () => {
  setStorage('difficultyLevel', difficultyLevel.value)
}

// 生命周期
onMounted(() => {
  loadStats()
})
</script>

<style scoped>
.parent-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #E8EAF6 0%, #C5CAE9 100%);
  padding: 20px;
}

/* 顶部导航 */
.top-bar {
  display: flex;
  align-items: center;
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

/* 仪表板容器 */
.dashboard-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 学习概览 */
.overview-section {
  padding: 30px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin: 0 0 24px 0;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.overview-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #F5F5F5 0%, #E8EAF6 100%);
  border-radius: 16px;
  transition: transform 0.2s ease;
}

.overview-card:hover {
  transform: translateY(-4px);
}

.overview-icon {
  font-size: 40px;
  margin-bottom: 8px;
}

.overview-value {
  font-size: 36px;
  font-weight: bold;
  color: #3F51B5;
  margin-bottom: 4px;
}

.overview-label {
  font-size: 14px;
  color: #666;
  text-align: center;
}

/* 设置区域 */
.settings-section {
  padding: 30px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.setting-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.setting-label {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.difficulty-select {
  padding: 14px 20px;
  font-size: 16px;
  border: 2px solid #3F51B5;
  border-radius: 12px;
  background: white;
  color: #333;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
}

.difficulty-select:hover {
  border-color: #5C6BC0;
}

.difficulty-select:focus {
  border-color: #5C6BC0;
  box-shadow: 0 0 0 3px rgba(63, 81, 181, 0.1);
}

.setting-hint {
  font-size: 14px;
  color: #888;
  margin: 0;
  font-style: italic;
}

/* 提示信息 */
.info-section {
  padding: 30px;
  background: linear-gradient(135deg, #FFF9C4 0%, #FFE082 100%);
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(255, 193, 7, 0.2);
}

.info-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 0;
  font-size: 15px;
  color: #555;
  line-height: 1.6;
}

.info-list li::before {
  content: '✨';
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 520px) {
  .overview-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .overview-value {
    font-size: 28px;
  }

  .overview-icon {
    font-size: 32px;
  }
}
</style>
