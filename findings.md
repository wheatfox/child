# 研究发现与记录

## 单词库设计

### 主题分类
1. **基础认知 (basic)** - 🎨 (40 词)
   - 颜色（10 词）：red, blue, green, yellow, orange, purple, pink, black, white, brown
   - 数字（10 词）：one, two, three, four, five, six, seven, eight, nine, ten
   - 形状（10 词）：circle, square, triangle, star, heart, diamond, oval, rectangle, crescent, arrow
   - 基础概念（10 词）：big, small, up, down, happy, sad, hot, cold, fast, slow

2. **动物世界 (animals)** - 🦁 (40 词)
   - 常见动物（10 词）：dog, cat, bird, fish, rabbit, turtle, butterfly, bee, ant, ladybug
   - 农场动物（8 词）：cow, pig, sheep, horse, duck, chicken, rooster, goat
   - 野生动物（12 词）：elephant, lion, tiger, monkey, panda, zebra, giraffe, hippo, kangaroo, penguin, koala, hedgehog
   - 其他动物（10 词）：bear, wolf, fox, mouse, frog, snake, octopus, crab, shark, whale

3. **日常生活 (daily)** - 🏠 (40 词)
   - 家庭成员（10 词）：mom, dad, baby, sister, brother, grandma, grandpa, uncle, aunt, cousin
   - 身体部位（10 词）：eye, nose, mouth, ear, hand, foot, leg, arm, head, hair
   - 衣物（10 词）：shirt, shoes, hat, dress, socks, pants, coat, scarf, gloves, backpack
   - 日常物品（10 词）：book, pen, cup, ball, bed, chair, table, clock, phone, key

4. **常用短语 (phrases)** - 💬 (40 条)
   - 问候语（10 条）：Hello!, Hi!, Good morning!, Good afternoon!, Good night!, How are you?, I'm fine, Thank you!, Nice to meet you, See you later
   - 礼貌用语（10 条）：Please, Sorry, Excuse me, You're welcome, No problem, That's okay, May I...?, Can you help me?, Bless you, Good job!
   - 日常表达（10 条）：I'm hungry, I'm thirsty, I'm tired, I'm happy, I'm sad, I'm sick, I'm cold, I'm hot, I'm scared, I'm excited
   - 简单对话（10 条）：What's this?, What's that?, I like it, I don't like, I want, I have, Let's go!, Wait for me, Come here, Look at this

### Emoji 映射表
- 🔴 red, 🔵 blue, 🟢 green, 🟡 yellow, 🟠 orange
- 1️⃣ one, 2️⃣ two, 3️⃣ three, 4️⃣ four, 5️⃣ five
- ⭕ circle, ◼️ square, 🔺 triangle, ⭐ star, ❤️ heart
- 🐶 dog, 🐱 cat,  bird, 🐟 fish, 🐰 rabbit
- 🐮 cow, 🐷 pig,  sheep,  horse, 🦆 duck
- 🐘 elephant, 🦁 lion,  tiger, 🐵 monkey, 🐼 panda
- 👩 mom, 👨 dad, 👶 baby,  sister, 👦 brother
- 👁️ eye, 👃 nose, 👄 mouth, 👂 ear, ✋ hand
- 👕 shirt, 👟 shoes, 🧢 hat, 👗 dress, 🧦 socks

---

## 语音合成 API

### Web Speech API 使用方式
```javascript
const utterance = new SpeechSynthesisUtterance(text)
utterance.lang = 'en-US' // 英文
utterance.lang = 'zh-CN' // 中文
utterance.rate = 0.8 // 稍慢语速，适合幼儿
utterance.pitch = 1.0 // 正常音调
window.speechSynthesis.speak(utterance)
```

### 注意事项
1. 需要等待语音加载完成：`speechSynthesis.onvoiceschanged`
2. 部分浏览器可能不支持中文语音
3. 自动播放需要用户交互后才能触发
4. 移动端可能需要特殊处理

---

## 学习流程设计

### 学习模式
```
进入主题 → 显示第 1 张卡片 → 自动播放英文 → 停顿 → 自动播放中文
→ 等待 3 秒 → 自动下一张 → ... → 学完 20 张 → 进入测验
```

### 测验模式
```
进入测验 → 显示图片和问题 → 选择答案 → 判断对错
→ 答对：星星奖励 + 自动下一题
→ 答错：显示正确答案 + 播放发音
→ 完成 20 题 → 显示成绩
```

---

## 技术要点

### 1. 自动播放控制
- 使用 `setTimeout` 控制卡片停留时间
- 使用 `SpeechSynthesisUtterance` 的 `onend` 事件触发下一个
- 需要处理用户暂停/跳过

### 2. 发音服务封装
- 单例模式管理语音实例
- 队列管理避免重叠播放
- 提供取消/暂停接口

### 3. 进度持久化
- 使用 `localStorage` 存储
- 键名：`englishProgress_{topicId}`
- 数据结构：`{ learnedWords: [], quizStars: 0 }`

---

## 待确认事项

- [ ] 卡通图标的来源（如果 emoji 不够用）
- [ ] 是否需要背景音乐
- [ ] 是否需要音效（答对/答错）
- [ ] 是否支持多个孩子独立进度

---

## 参考资料

- Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
- Vue Router: https://router.vuejs.org/
- localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
