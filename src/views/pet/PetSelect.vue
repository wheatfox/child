<template>
  <div class="pet-select">
    <!-- 顶部导航 -->
    <div class="top-bar">
      <button class="back-btn" @click="goBack">
        <span class="back-arrow">←</span>
        返回首页
      </button>
      <div class="page-title">🐾 选择你的宠物伙伴</div>
      <div class="spacer"></div>
    </div>

    <div class="select-container">
      <!-- 说明文字 -->
      <div class="intro-section">
        <h2 class="intro-title">选择一个宠物伙伴陪伴你学习吧！</h2>
        <p class="intro-text">通过答题获得星星，喂养宠物让它从蛋孵化并逐渐成长变强哦！</p>
      </div>

      <!-- 宠物选择区 -->
      <div class="pet-grid">
        <div 
          v-for="pet in petTypes" 
          :key="pet.id"
          class="pet-card"
          :class="{ selected: selectedPet === pet.id }"
          @click="selectPet(pet.id)"
        >
          <div class="pet-emoji">{{ pet.eggEmoji }}</div>
          <div class="pet-name">{{ pet.name }}</div>
          <div class="pet-desc">{{ pet.description }}</div>
        </div>
      </div>

      <!-- 确认按钮 -->
      <div class="confirm-section">
        <button 
          class="confirm-btn"
          :disabled="!selectedPet"
          @click="confirmSelection"
        >
          <span class="btn-emoji">🥚</span>
          <span class="btn-text">
            {{ selectedPet ? `选择${getPetName(selectedPet)}，开始孵化！` : '请选择一个宠物' }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { PET_TYPES, getPetType, createNewPet } from '../../utils/pet/petConfig'
import { setStorage } from '../../utils/storage'

const router = useRouter()
const petTypes = PET_TYPES
const selectedPet = ref(null)

// 选择宠物
const selectPet = (petId) => {
  selectedPet.value = petId
}

// 获取宠物名称
const getPetName = (petId) => {
  const pet = getPetType(petId)
  return pet?.name || ''
}

// 确认选择
const confirmSelection = () => {
  if (!selectedPet.value) return
  
  // 创建新宠物
  const newPet = createNewPet(selectedPet.value)
  
  // 保存到 localStorage
  setStorage('userPet', newPet)
  
  // 跳转到喂养页面
  router.push('/pet/feed')
}

// 返回
const goBack = () => {
  router.push('/home')
}
</script>

<style scoped>
.pet-select {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFF9E6 0%, #FFE6F0 50%, #E8F5E9 100%);
  padding: 20px;
}

/* 顶部导航 */
.top-bar {
  display: flex;
  align-items: center;
  max-width: 900px;
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

/* 选择容器 */
.select-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 介绍区域 */
.intro-section {
  text-align: center;
  padding: 24px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.intro-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0 0 12px 0;
}

.intro-text {
  font-size: 16px;
  color: #666;
  margin: 0;
}

/* 宠物网格 */
.pet-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.pet-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid transparent;
}

.pet-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.pet-card.selected {
  border-color: #FF6B9D;
  background: linear-gradient(135deg, #FFE6F0 0%, #FFB6C1 100%);
  transform: scale(1.05);
}

.pet-emoji {
  font-size: 64px;
  margin-bottom: 12px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.pet-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
}

.pet-desc {
  font-size: 14px;
  color: #666;
  text-align: center;
}

/* 确认区域 */
.confirm-section {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.confirm-btn {
  display: flex;
  align-items: center;
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
}

.confirm-btn:not(:disabled):hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(255, 107, 157, 0.4);
}

.confirm-btn:not(:disabled):active {
  transform: translateY(-2px);
}

.confirm-btn:disabled {
  background: linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%);
  cursor: not-allowed;
  box-shadow: none;
}

.btn-emoji {
  font-size: 32px;
}

.btn-text {
  line-height: 1.2;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .pet-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 520px) {
  .pet-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .pet-emoji {
    font-size: 48px;
  }
  
  .pet-name {
    font-size: 18px;
  }
  
  .confirm-btn {
    padding: 16px 32px;
    font-size: 18px;
  }
  
  .btn-text {
    font-size: 16px;
  }
}
</style>
