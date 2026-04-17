# 奇妙英语角 - 实现计划

## 项目目标
创建面向零基础 5 岁幼儿的英语学习模块，包含 60 个英语单词（3 个主题 × 20 词），采用"卡片学习 + 选择题测验 + 跟读鼓励"的混合模式。

## 功能需求
- ✅ 三个主题：基础认知、动物世界、日常生活
- ✅ 混合模式：卡片学习 → 选择题测验
- ✅ 跟读功能：点击按钮鼓励跟读（无评测）
- ✅ 图形显示：Emoji 优先，无 emoji 使用卡通图标
- ✅ 发音方案：浏览器语音合成 + 预留真人发音接口
- ✅ 自动播放：学习模式下自动播放英文 + 中文
- ✅ 星星奖励系统
- ✅ 进度持久化（localStorage）

---

## 实现阶段

### Phase 1: 数据结构与工具类 ⏳
- [ ] 创建单词库 `src/utils/english/wordBank.js`
  - [ ] 基础认知主题（20 词）
  - [ ] 动物世界主题（20 词）
  - [ ] 日常生活主题（20 词）
- [ ] 创建发音服务 `src/utils/english/audioService.js`
  - [ ] 英文语音合成
  - [ ] 中文语音合成
  - [ ] 跟读模式
  - [ ] 预留真人发音接口

### Phase 2: 组件开发 ⏳
- [ ] 创建单词卡片组件 `src/components/english/WordCard.vue`
  - [ ] Emoji/图标显示
  - [ ] 英文单词 + 中文翻译
  - [ ] 播放/跟读按钮
- [ ] 创建选项按钮组件 `src/components/english/OptionButton.vue`
  - [ ] 类似数学模块的选项按钮
  - [ ] 正确/错误状态反馈

### Phase 3: 页面开发 ⏳
- [ ] 创建主题选择页 `src/views/english/TopicSelect.vue`
  - [ ] 3 个主题卡片
  - [ ] 显示学习进度
- [ ] 创建学习页面 `src/views/english/LearnPage.vue`
  - [ ] 卡片切换逻辑
  - [ ] 自动播放控制
  - [ ] 跟读功能
- [ ] 创建测验页面 `src/views/english/QuizPage.vue`
  - [ ] 选择题逻辑
  - [ ] 答题反馈
  - [ ] 星星奖励

### Phase 4: 路由与集成 ⏳
- [ ] 配置路由 `src/router/index.js`
  - [ ] 添加英语角路由
- [ ] 更新首页导航 `src/views/Home.vue`
  - [ ] 启用"奇妙英语角"按钮
- [ ] 添加英语角图标资源

### Phase 5: 测试与优化 ⏳
- [ ] 测试语音合成
- [ ] 测试自动播放逻辑
- [ ] 测试进度存储
- [ ] 优化动画效果
- [ ] 响应式适配

---

## 技术决策

### 1. 单词数据结构
```javascript
{
  id: 'dog',
  word: 'dog',
  translation: '小狗',
  emoji: '🐶',
  icon: null, // 卡通图标路径（无 emoji 时使用）
  topic: 'animals',
  phonetic: '/dɒɡ/',
  audioUrl: null // 真人发音预留
}
```

### 2. 发音服务 API
```javascript
// 使用浏览器 SpeechSynthesis API
speakEnglish(text)  // 英文发音
speakChinese(text)  // 中文发音
speakWord(en, zh)   // 完整播放
speakForRepeat(en)  // 跟读模式
```

### 3. 进度存储
```javascript
// localStorage 键值
englishProgress_{topicId}: {
  learnedWords: [],  // 已学单词
  quizStars: 0,      // 测验星星
  lastLearnTime: ''  // 最后学习时间
}
```

---

## 文件清单

### 新建文件
- `src/utils/english/wordBank.js` - 单词库
- `src/utils/english/audioService.js` - 发音服务
- `src/components/english/WordCard.vue` - 单词卡片
- `src/components/english/OptionButton.vue` - 选项按钮
- `src/views/english/TopicSelect.vue` - 主题选择
- `src/views/english/LearnPage.vue` - 学习页面
- `src/views/english/QuizPage.vue` - 测验页面

### 修改文件
- `src/router/index.js` - 添加路由
- `src/views/Home.vue` - 启用导航

---

## 成功标准

1. ✅ 60 个单词全部录入，包含 Emoji
2. ✅ 语音合成正常播放英文和中文
3. ✅ 学习模式自动播放流畅
4. ✅ 跟读按钮功能正常
5. ✅ 测验模式答题逻辑正确
6. ✅ 星星奖励系统正常工作
7. ✅ 进度持久化正常
8. ✅ 响应式布局适配移动端

---

## 风险与注意事项

1. **语音合成兼容性**：部分浏览器可能不支持中文语音，需要降级处理
2. **Emoji 覆盖度**：某些抽象概念可能没有合适 emoji，需要准备卡通图标
3. **自动播放限制**：浏览器可能阻止自动播放，需要用户交互触发
4. **性能优化**：60 个单词的数据量需要合理组织，避免加载缓慢

---

## 下一步行动

1. 创建 `src/utils/english/` 目录
2. 编写单词库 `wordBank.js`
3. 编写发音服务 `audioService.js`
