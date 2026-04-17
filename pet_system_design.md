# 🐾 宠物喂养系统设计文档

## 一、系统概述

### 1.1 核心功能
- **宠物选择**：5 种宠物类型（小狗🐶、小猫🐱、小鸟🐦、小兔子🐰、小熊🐻）
- **宠物蛋孵化**：从蛋开始孵化宠物
- **成长阶段**：宠物从蛋→幼年→青年→成年逐步成长
- **喂养机制**：使用学习获得的星星奖励喂养宠物
- **属性成长**：宠物随成长变强，显示力量值

### 1.2 数据流
```
学习答题 → 获得星星 → 喂养宠物 → 宠物成长 → 属性提升
```

## 二、数据结构设计

### 2.1 宠物类型配置
```javascript
const PET_TYPES = [
  { id: 'dog', name: '小狗', emoji: '🐶', eggEmoji: '🥚' },
  { id: 'cat', name: '小猫', emoji: '🐱', eggEmoji: '🥚' },
  { id: 'bird', name: '小鸟', emoji: '🐦', eggEmoji: '🥚' },
  { id: 'rabbit', name: '小兔子', emoji: '🐰', eggEmoji: '🥚' },
  { id: 'bear', name: '小熊', emoji: '🐻', eggEmoji: '🥚' }
]
```

### 2.2 成长阶段
```javascript
const GROWTH_STAGES = [
  { level: 0, name: '宠物蛋', emoji: '🥚', minFeed: 0, power: 0 },
  { level: 1, name: '幼年', emoji: '🐣', minFeed: 5, power: 10 },
  { level: 2, name: '青年', emoji: '🐤', minFeed: 15, power: 30 },
  { level: 3, name: '成年', emoji: '🐕', minFeed: 30, power: 60 },
  { level: 4, name: '完全体', emoji: '🦸', minFeed: 50, power: 100 }
]
```

### 2.3 宠物数据对象
```javascript
{
  petType: 'dog',           // 宠物类型
  stage: 0,                 // 成长阶段 (0-4)
  feedCount: 0,             // 喂养次数
  power: 0,                 // 力量值
  hatchDate: null,          // 孵化日期
  lastFeedDate: null        // 最后喂养日期
}
```

### 2.4 localStorage 存储键
```javascript
// 宠物数据
'userPet': { ... }  // 当前用户宠物信息

// 可选：历史宠物记录
'petHistory': [...] // 养过的宠物记录
```

## 三、页面组件设计

### 3.1 宠物选择页 (PetSelect.vue)
- **路径**: `/pet/select`
- **功能**: 
  - 显示 5 种宠物类型
  - 用户选择后孵化宠物蛋
  - 初始化宠物数据

### 3.2 宠物喂养页 (PetFeeding.vue)
- **路径**: `/pet/feed`
- **功能**:
  - 显示当前宠物状态
  - 显示成长阶段进度条
  - 喂养按钮（消耗星星）
  - 宠物属性展示
  - 成长动画效果

### 3.3 首页入口
- 在 Rewards 页面添加"宠物喂养"入口
- 或在家园页面添加宠物中心

## 四、喂养机制

### 4.1 喂养规则
- **消耗**: 每次喂养消耗 5 颗星星
- **冷却**: 每天最多喂养 3 次（防止过度消费）
- **成长**: 每次喂养增加 feedCount
- **升级**: feedCount 达到阈值自动升级

### 4.2 阶段升级逻辑
```javascript
function checkStageUpgrade(pet) {
  const nextStage = pet.stage + 1
  if (nextStage < GROWTH_STAGES.length) {
    if (pet.feedCount >= GROWTH_STAGES[nextStage].minFeed) {
      pet.stage = nextStage
      pet.power = GROWTH_STAGES[nextStage].power
      // 播放升级动画
    }
  }
}
```

### 4.3 星星验证
```javascript
function canFeed(currentStars, lastFeedDate) {
  const today = new Date().toDateString()
  
  // 检查星星是否足够
  if (currentStars < 5) return false
  
  // 检查今日喂养次数
  if (lastFeedDate === today) {
    const feedCount = getTodayFeedCount()
    if (feedCount >= 3) return false
  }
  
  return true
}
```

## 五、动画效果

### 5.1 孵化动画
- 宠物蛋摇晃 → 裂缝 → 破壳而出
- CSS 动画 + emoji 切换

### 5.2 喂养动画
- 爱心飘起效果
- 星星减少动画
- 进度条增长动画

### 5.3 升级动画
- 闪光效果
- 宠物形象变化
- 力量值跳动增长

## 六、集成方案

### 6.1 与现有系统集成
- **星星获取**: 保持现有数学/英语答题获得星星逻辑
- **星星消耗**: 喂养时从 totalStars 扣除
- **数据持久化**: 使用 localStorage 存储宠物数据

### 6.2 路由添加
```javascript
{
  path: '/pet/select',
  name: 'PetSelect',
  component: PetSelect
},
{
  path: '/pet/feed',
  name: 'PetFeeding',
  component: PetFeeding
}
```

### 6.3 首页入口修改
在 Rewards.vue 添加：
```html
<button class="action-btn" @click="goToPet">
  <span class="action-icon">🐾</span>
  宠物中心
</button>
```

## 七、实现优先级

### Phase 1 - 核心功能
1. ✅ 数据结构定义
2. ✅ 宠物选择组件
3. ✅ 宠物展示组件
4. ✅ 喂养基础逻辑

### Phase 2 - 增强体验
5. ⏳ 成长动画
6. ⏳ 升级特效
7. ⏳ 喂养限制（每日次数）

### Phase 3 - 优化完善
8. ⏳ 宠物历史记录
9. ⏳ 成就系统
10. ⏳ 宠物互动效果

## 八、技术要点

### 8.1 状态管理
- 使用 Vue 3 Composition API
- 使用 reactive/ref 管理宠物状态
- 使用 watch 监听变化触发效果

### 8.2 数据持久化
```javascript
// 加载宠物
const petData = getStorage('userPet')

// 保存宠物
setStorage('userPet', petData)
```

### 8.3 日期处理
```javascript
// 今日日期字符串
const today = new Date().toDateString()

// 日期比较
if (lastFeedDate !== today) {
  // 重置今日喂养次数
}
```

## 九、UI 设计参考

### 9.1 配色方案
- 温暖可爱风格
- 主色调：粉色系 (#FFB6C1)、黄色系 (#FFE6F0)
- 辅助色：绿色系 (#E8F5E9)

### 9.2 卡片设计
- 圆角：24px
- 阴影：柔和阴影
- 渐变：温暖渐变

### 9.3 字体大小
- 标题：24-32px
- 正文：16-18px
- 小字：14px

## 十、预期效果

用户完成题目获得星星 → 进入宠物中心 → 选择喜欢的宠物 → 从蛋开始孵化 → 
定期喂养 → 观察宠物成长 → 宠物变强获得成就感 → 激励继续学习

---

**备注**: 本设计完全基于现有系统架构，不修改已有功能，独立扩展宠物系统。
