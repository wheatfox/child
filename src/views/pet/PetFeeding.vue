<template>
  <div class="pet-feeding">
    <!-- 顶部导航 -->
    <div class="top-bar">
      <button class="back-btn" @click="goBack">
        <span class="back-arrow">←</span>
        返回
      </button>
      <div class="page-title">🐾 宠物中心</div>
      <div class="spacer"></div>
    </div>

    <!-- 加载中提示 -->
    <div class="loading-container" v-if="!pet">
      <div class="loading-spinner">🥚</div>
      <div class="loading-text">正在加载宠物数据...</div>
    </div>

    <div class="feeding-container" v-if="pet">
      <!-- 宠物展示区 -->
      <div class="pet-display-section">
        <div class="pet-frame">
          <div class="pet-emoji" :class="{ shaking: isFeeding, glowing: isUpgrading }">
            {{ petEmoji }}
          </div>
        </div>
        <div class="pet-info">
          <div class="pet-name-display">{{ petDisplayName }}</div>
          <div class="pet-stage">{{ stageInfo.name }} · {{ stageInfo.description }}</div>
        </div>
      </div>

      <!-- 成长进度 -->
      <div class="progress-section" v-if="pet">
        <div class="progress-header">
          <span class="progress-label">成长进度</span>
          <span class="progress-text">{{ pet.feedCount }} / {{ nextStageMinFeed }} 次喂养</span>
        </div>
        <div class="progress-bar-container">
          <div 
            class="progress-bar" 
            :style="{ width: `${progressPercent}%` }"
            :class="{ 'progress-complete': progressPercent >= 100 }"
          >
          </div>
        </div>
        <div class="progress-tip" v-if="canUpgradeNow">
          ✨ 可以升级了！继续喂养即可进化！
        </div>
      </div>

      <!-- 宠物属性 -->
      <div class="stats-section" v-if="pet">
        <h3 class="section-title">📊 宠物属性</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">💪</div>
            <div class="stat-value">{{ pet.power }}</div>
            <div class="stat-label">力量值</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🍖</div>
            <div class="stat-value">{{ pet.feedCount }}</div>
            <div class="stat-label">喂养次数</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⭐</div>
            <div class="stat-value">{{ todayFeedCount }}/{{ maxFeedPerDay }}</div>
            <div class="stat-label">今日喂养</div>
          </div>
        </div>
      </div>

      <!-- 喂养操作区 -->
      <div class="feed-action-section">
        <div class="feed-info">
          <div class="star-cost">
            <span class="star-icon">⭐</span>
            <span class="cost-text">每次喂养消耗 {{ feedCost }} 颗星星</span>
          </div>
          <div class="your-stars">
            当前星星：{{ totalStars }}
          </div>
        </div>
        
        <button 
          class="feed-btn"
          :disabled="!canFeedAction"
          @click="handleFeed"
        >
          <span class="feed-btn-icon">🍖</span>
          <span class="feed-btn-text">
            {{ feedButtonText }}
          </span>
        </button>

        <div class="feed-tip" v-if="!canFeedAction && feedDisableReason">
          {{ feedDisableReason }}
        </div>
      </div>

      <!-- 宠物类型信息 -->
      <div class="pet-type-info">
        <h4 class="info-title">关于{{ petTypeName }}</h4>
        <p class="info-text">{{ petTypeDescription }}</p>
      </div>

      <!-- 重新选择宠物 -->
      <div class="reset-section">
        <button class="reset-btn" @click="confirmReset">
          <span class="reset-icon">🔄</span>
          <span class="reset-text">重新选择宠物</span>
        </button>
        <p class="reset-tip">点击后将重新从宠物蛋开始养起，之前的成长数据将被清空</p>
      </div>
    </div>

    <!-- 升级特效 -->
    <div v-if="showUpgradeEffect" class="upgrade-overlay">
      <div class="upgrade-content">
        <div class="upgrade-emoji">🎉</div>
        <div class="upgrade-title">恭喜升级！</div>
        <div class="upgrade-desc">{{ petDisplayName }}进化到{{ newStageName }}啦！</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { 
  getPetType, 
  getGrowthStage, 
  getNextStage,
  canFeed,
  feedPet,
  calculateProgress,
  getPetDisplayName,
  getPetDisplayEmoji,
  FEED_CONFIG
} from '../../utils/pet/petConfig'
import { getStorage, setStorage } from '../../utils/storage'

const router = useRouter()

// 状态
const pet = ref(null)
const totalStars = ref(0)
const isFeeding = ref(false)
const isUpgrading = ref(false)
const showUpgradeEffect = ref(false)
const newStageName = ref('')

// 计算属性
const petType = computed(() => pet.value ? getPetType(pet.value.petType) : null)
const stageInfo = computed(() => pet.value ? getGrowthStage(pet.value.stage || 0) : { name: '', description: '' })
const nextStage = computed(() => pet.value ? getNextStage(pet.value.stage || 0) : null)
const nextStageMinFeed = computed(() => pet.value && nextStage.value ? nextStage.value.minFeed : 0)
const progressPercent = computed(() => pet.value ? calculateProgress(pet.value) : 0)
const canUpgradeNow = computed(() => pet.value && nextStage.value && pet.value.feedCount >= nextStage.value.minFeed)
const petDisplayName = computed(() => pet.value ? getPetDisplayName(pet.value) : '')
const petEmoji = computed(() => pet.value ? getPetDisplayEmoji(pet.value) : '🥚')
const petTypeName = computed(() => petType.value?.name || '')
const petTypeDescription = computed(() => petType.value?.description || '')

const feedCost = computed(() => FEED_CONFIG.costPerFeed)
const maxFeedPerDay = computed(() => FEED_CONFIG.maxFeedPerDay)
const todayFeedCount = computed(() => {
  const today = new Date().toDateString()
  if (pet.value?.lastFeedDate !== today) {
    return 0
  }
  return pet.value?.todayFeedCount || 0
})

const canFeedAction = computed(() => {
  if (!pet.value) return false
  const result = canFeed(totalStars.value, todayFeedCount.value)
  return result.can
})

const feedDisableReason = computed(() => {
  if (!pet.value) return ''
  const result = canFeed(totalStars.value, todayFeedCount.value)
  return result.reason || ''
})

const feedButtonText = computed(() => {
  if (!canFeedAction.value) {
    return feedDisableReason.value
  }
  return '喂养宠物'
})

// 方法
const goBack = () => {
  router.push('/rewards')
}

const handleFeed = () => {
  if (!pet.value || !canFeedAction.value) return
  
  // 播放喂养动画
  isFeeding.value = true
  setTimeout(() => {
    isFeeding.value = false
    
    // 执行喂养逻辑
    const result = feedPet(pet.value, totalStars.value)
    
    if (result.success) {
      // 扣除星星
      totalStars.value -= FEED_CONFIG.costPerFeed
      
      // 保存宠物数据
      setStorage('userPet', pet.value)
      setStorage('totalStars', totalStars.value)
      
      // 如果升级了，播放升级动画
      if (result.upgraded) {
        playUpgradeEffect(result.newStage)
      }
    }
  }, 600)
}

const playUpgradeEffect = (newStageLevel) => {
  isUpgrading.value = true
  newStageName.value = getGrowthStage(newStageLevel).name
  showUpgradeEffect.value = true
  
  setTimeout(() => {
    isUpgrading.value = false
    showUpgradeEffect.value = false
  }, 2000)
}

const confirmReset = () => {
  if (confirm('确定要重新选择宠物吗？\n\n点击确定后将：\n- 清空当前宠物的所有成长数据\n- 重新从宠物蛋开始养起\n- 宠物类型也会重新选择')) {
    // 清除宠物数据
    localStorage.removeItem('userPet')
    // 跳转到宠物选择页面
    router.push('/pet/select')
  }
}

const loadPetData = () => {
  // 加载宠物数据
  pet.value = getStorage('userPet')
  
  // 如果没有宠物，跳转到选择页面
  if (!pet.value) {
    router.push('/pet/select')
    return
  }
  
  // 加载星星数量
  totalStars.value = getStorage('totalStars') || 0
  
  // 检查并重置今日喂养次数
  const today = new Date().toDateString()
  if (pet.value.lastFeedDate !== today) {
    pet.value.todayFeedCount = 0
    pet.value.lastFeedDate = today
    setStorage('userPet', pet.value)
  }
}

// 生命周期
onMounted(() => {
  loadPetData()
})
</script>

<style scoped>
.pet-feeding {
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

/* 加载容器 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  max-width: 700px;
  margin: 0 auto;
}

.loading-spinner {
  font-size: 96px;
  animation: eggShake 1s ease-in-out infinite;
  margin-bottom: 20px;
}

@keyframes eggShake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
}

.loading-text {
  font-size: 18px;
  color: #666;
}

/* 喂养容器 */
.feeding-container {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 宠物展示区 */
.pet-display-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.pet-frame {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFE6F0 0%, #FFB6C1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border: 5px solid #FF6B9D;
  box-shadow: 0 4px 16px rgba(255, 107, 157, 0.3);
}

.pet-emoji {
  font-size: 96px;
  transition: all 0.3s ease;
}

.pet-emoji.shaking {
  animation: shake 0.6s ease-in-out;
}

.pet-emoji.glowing {
  animation: glow 1s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
}

@keyframes glow {
  0%, 100% { 
    transform: scale(1);
    filter: brightness(1);
  }
  50% { 
    transform: scale(1.2);
    filter: brightness(1.3);
  }
}

.pet-info {
  text-align: center;
}

.pet-name-display {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.pet-stage {
  font-size: 16px;
  color: #666;
}

/* 进度区域 */
.progress-section {
  padding: 24px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.progress-label {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.progress-text {
  font-size: 16px;
  color: #666;
}

.progress-bar-container {
  width: 100%;
  height: 24px;
  background: #F5F5F5;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #FF6B9D 0%, #FF8FAB 100%);
  border-radius: 12px;
  transition: width 0.5s ease;
}

.progress-bar.progress-complete {
  background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%);
}

.progress-tip {
  text-align: center;
  font-size: 16px;
  color: #FF6B9D;
  font-weight: bold;
  animation: tipPulse 1s ease-in-out infinite;
}

@keyframes tipPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

/* 属性区域 */
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
  margin: 0 0 16px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, #F5F5F5 0%, #E8F5E9 100%);
  border-radius: 16px;
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

/* 喂养操作区 */
.feed-action-section {
  padding: 24px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feed-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 12px;
  background: #FFF9C4;
  border-radius: 12px;
}

.star-cost {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #666;
}

.star-icon {
  font-size: 20px;
}

.your-stars {
  font-size: 16px;
  font-weight: bold;
  color: #F57F17;
}

.feed-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px 48px;
  background: linear-gradient(135deg, #FF6B9D 0%, #FF8FAB 100%);
  color: white;
  border: none;
  border-radius: 32px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 16px rgba(255, 107, 157, 0.3);
  width: 100%;
}

.feed-btn:not(:disabled):hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(255, 107, 157, 0.4);
}

.feed-btn:not(:disabled):active {
  transform: translateY(-2px);
}

.feed-btn:disabled {
  background: linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%);
  cursor: not-allowed;
  box-shadow: none;
}

.feed-btn-icon {
  font-size: 32px;
}

.feed-tip {
  margin-top: 12px;
  font-size: 14px;
  color: #999;
}

/* 宠物类型信息 */
.pet-type-info {
  padding: 20px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.info-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 0 12px 0;
}

.info-text {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* 升级特效 */
.upgrade-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.upgrade-content {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: popIn 0.5s ease;
}

@keyframes popIn {
  from { 
    transform: scale(0.5);
    opacity: 0;
  }
  to { 
    transform: scale(1);
    opacity: 1;
  }
}

.upgrade-emoji {
  font-size: 96px;
  margin-bottom: 16px;
  animation: bounce 1s ease-in-out;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.upgrade-title {
  font-size: 32px;
  font-weight: bold;
  color: #FF6B9D;
  margin-bottom: 8px;
}

.upgrade-desc {
  font-size: 18px;
  color: #666;
}

/* 重新选择区域 */
.reset-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background: linear-gradient(135deg, #F5F5F5 0%, #E8F5E9 100%);
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  gap: 12px;
}

.reset-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #FF9800 0%, #FFB74D 100%);
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

.reset-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(255, 152, 0, 0.4);
}

.reset-btn:active {
  transform: translateY(-2px);
}

.reset-icon {
  font-size: 28px;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.reset-text {
  line-height: 1.2;
}

.reset-tip {
  font-size: 14px;
  color: #999;
  text-align: center;
  margin: 0;
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 520px) {
  .pet-frame {
    width: 140px;
    height: 140px;
  }
  
  .pet-emoji {
    font-size: 72px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .feed-btn {
    padding: 16px 32px;
    font-size: 18px;
  }
  
  .feed-info {
    flex-direction: column;
    gap: 8px;
  }
  
  .reset-btn {
    padding: 14px 24px;
    font-size: 16px;
  }
  
  .reset-icon {
    font-size: 24px;
  }
}
</style>
