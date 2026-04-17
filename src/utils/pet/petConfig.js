/**
 * 宠物系统配置
 */

// 宠物类型
export const PET_TYPES = [
  { id: 'dog', name: '小狗', emoji: '🐶', eggEmoji: '🥚', description: '忠诚可爱' },
  { id: 'cat', name: '小猫', emoji: '🐱', eggEmoji: '🥚', description: '温顺粘人' },
  { id: 'bird', name: '小鸟', emoji: '🐦', eggEmoji: '🥚', description: '活泼好动' },
  { id: 'rabbit', name: '小兔子', emoji: '🐰', eggEmoji: '🥚', description: '聪明伶俐' },
  { id: 'bear', name: '小熊', emoji: '🐻', eggEmoji: '🥚', description: '憨厚强壮' }
]

// 成长阶段
export const GROWTH_STAGES = [
  { level: 0, name: '宠物蛋', emoji: '🥚', minFeed: 0, power: 0, description: '等待孵化' },
  { level: 1, name: '幼年', emoji: '🐣', minFeed: 5, power: 10, description: '刚孵化的小家伙' },
  { level: 2, name: '青年', emoji: '🐤', minFeed: 15, power: 30, description: '快速成长中' },
  { level: 3, name: '成年', emoji: '🐕', minFeed: 30, power: 60, description: '成熟可靠' },
  { level: 4, name: '完全体', emoji: '🦸', minFeed: 50, power: 100, description: '最强形态' }
]

// 喂养配置
export const FEED_CONFIG = {
  costPerFeed: 3,        // 每次喂养消耗星星数
  maxFeedPerDay: 3,      // 每日最多喂养次数
  feedPowerBonus: 2      // 每次喂养额外增加的力量值
}

/**
 * 获取宠物类型
 */
export function getPetType(petId) {
  return PET_TYPES.find(pet => pet.id === petId)
}

/**
 * 获取成长阶段
 */
export function getGrowthStage(level) {
  return GROWTH_STAGES.find(stage => stage.level === level)
}

/**
 * 获取下一阶段
 */
export function getNextStage(currentLevel) {
  if (currentLevel >= GROWTH_STAGES.length - 1) {
    return null
  }
  return GROWTH_STAGES[currentLevel + 1]
}

/**
 * 检查是否可以升级
 */
export function canUpgrade(pet) {
  const nextStage = getNextStage(pet.stage)
  if (!nextStage) return false
  return pet.feedCount >= nextStage.minFeed
}

/**
 * 检查是否可以喂养
 */
export function canFeed(currentStars, todayFeedCount) {
  if (currentStars < FEED_CONFIG.costPerFeed) {
    return { can: false, reason: '星星不足' }
  }
  
  if (todayFeedCount >= FEED_CONFIG.maxFeedPerDay) {
    return { can: false, reason: '今日已喂满' }
  }
  
  return { can: true }
}

/**
 * 创建新宠物
 */
export function createNewPet(petType) {
  return {
    petType,
    stage: 0,
    feedCount: 0,
    power: 0,
    todayFeedCount: 0,
    lastFeedDate: null,
    hatchDate: new Date().toISOString()
  }
}

/**
 * 执行喂养
 */
export function feedPet(pet, currentStars) {
  const check = canFeed(currentStars, pet.todayFeedCount || 0)
  if (!check.can) {
    return { success: false, reason: check.reason }
  }
  
  // 检查是否需要重置今日喂养次数
  const today = new Date().toDateString()
  if (pet.lastFeedDate !== today) {
    pet.todayFeedCount = 0
  }
  
  // 执行喂养
  pet.feedCount++
  pet.todayFeedCount = (pet.todayFeedCount || 0) + 1
  pet.lastFeedDate = today
  pet.power += FEED_CONFIG.feedPowerBonus
  
  // 检查是否可以升级
  const oldStage = pet.stage
  if (canUpgrade(pet)) {
    pet.stage++
    const newStage = getGrowthStage(pet.stage)
    pet.power = newStage.power
  }
  
  return {
    success: true,
    oldStage,
    newStage: pet.stage,
    upgraded: pet.stage > oldStage
  }
}

/**
 * 获取今日日期字符串
 */
export function getTodayString() {
  return new Date().toDateString()
}

/**
 * 计算成长进度百分比
 */
export function calculateProgress(pet) {
  const currentStage = getGrowthStage(pet.stage)
  const nextStage = getNextStage(pet.stage)
  
  if (!nextStage) {
    return 100 // 已满级
  }
  
  const prevMinFeed = currentStage.minFeed
  const nextMinFeed = nextStage.minFeed
  const currentFeed = pet.feedCount
  
  const progress = ((currentFeed - prevMinFeed) / (nextMinFeed - prevMinFeed)) * 100
  return Math.min(100, Math.max(0, progress))
}

/**
 * 获取宠物显示名称
 */
export function getPetDisplayName(pet) {
  const petType = getPetType(pet.petType)
  const stage = getGrowthStage(pet.stage)
  
  if (pet.stage === 0) {
    return '宠物蛋'
  }
  
  return `${petType.name}·${stage.name}`
}

/**
 * 获取宠物显示表情
 */
export function getPetDisplayEmoji(pet) {
  const petType = getPetType(pet.petType)
  const stage = getGrowthStage(pet.stage)
  
  if (pet.stage === 0) {
    return petType.eggEmoji
  }
  
  return stage.emoji
}
