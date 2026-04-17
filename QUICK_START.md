# 自定义导入 - 快速开始

## 3 分钟快速上手

### 第一步：创建目录

在项目根目录的 `public` 文件夹下创建两个目录：

```powershell
# 在 math-app 目录下执行
mkdir public\images\words
mkdir public\audio\words
```

或者手动创建：
1. 打开 `math-app` 文件夹
2. 找到 `public` 目录
3. 新建文件夹 `images` 和 `audio`
4. 在 `images` 内新建 `words` 文件夹
5. 在 `audio` 内新建 `words` 文件夹

---

### 第二步：准备资源

**图片示例：**
- 找一张小狗的图片
- 重命名为 `dog.png`
- 放入 `public/images/words/` 目录

**语音示例：**
- 用手机录制"dog"的发音
- 导出为 MP3 格式
- 重命名为 `dog.mp3`
- 放入 `public/audio/words/` 目录

---

### 第三步：配置单词库

打开 `src/utils/english/wordBank.js`，找到 dog 这个单词：

```javascript
{ id: 'dog', word: 'dog', translation: '小狗', emoji: '🐶', topic: 'animals', phonetic: '/dɔːɡ/' },
```

修改为：

```javascript
{ 
  id: 'dog', 
  word: 'dog', 
  translation: '小狗', 
  emoji: '🐶', 
  topic: 'animals', 
  phonetic: '/dɔːɡ/',
  image: '/images/words/dog.png',      // 添加这行
  audioUrl: '/audio/words/dog.mp3'     // 添加这行
},
```

---

### 第四步：查看效果

1. 打开浏览器访问：http://localhost:5174/
2. 点击"奇妙英语角"
3. 选择"动物世界"
4. 找到"小狗"卡片
5. 查看是否显示自定义图片
6. 点击播放按钮听自定义语音

---

## 常见问题

### Q: 图片不显示？
**检查：**
- 文件是否在正确目录
- 文件名是否完全匹配（区分大小写）
- 路径是否正确：`/images/words/dog.png`

### Q: 语音不播放？
**检查：**
- 文件是否在正确目录
- 音频格式是否为 MP3/WAV/OGG
- 路径是否正确：`/audio/words/dog.mp3`

### Q: 如何批量导入？
参考完整文档：[IMPORT_GUIDE.md](./IMPORT_GUIDE.md)

---

## 进阶使用

### 只使用图片（不使用自定义语音）
```javascript
{
  id: 'cat',
  word: 'cat',
  translation: '小猫',
  emoji: '🐱',
  topic: 'animals',
  phonetic: '/kæt/',
  image: '/images/words/cat.png'  // 只添加图片
}
```

### 只使用自定义语音（不使用图片）
```javascript
{
  id: 'bird',
  word: 'bird',
  translation: '小鸟',
  emoji: '🐦',
  topic: 'animals',
  phonetic: '/bɜːrd/',
  audioUrl: '/audio/words/bird.mp3'  // 只添加语音
}
```

### 同时使用图片和语音
```javascript
{
  id: 'fish',
  word: 'fish',
  translation: '小鱼',
  emoji: '🐟',
  topic: 'animals',
  phonetic: '/fɪʃ/',
  image: '/images/words/fish.png',     // 图片
  audioUrl: '/audio/words/fish.mp3'    // 语音
}
```

---

## 资源推荐

### 免费图片
- **Flaticon**: https://www.flaticon.com/ （卡通图标）
- **Unsplash**: https://unsplash.com/ （高清照片）

### 语音合成（如果没有真人录音）
- **Google TTS**: 在线文本转语音
- **NaturalReaders**: https://www.naturalreaders.com/

---

## 下一步

✅ 完成快速入门后，你可以：

1. 为更多单词添加自定义资源
2. 查看详细文档 [IMPORT_GUIDE.md](./IMPORT_GUIDE.md)
3. 收集孩子的反馈优化资源
4. 与其他家长分享你的词库

**祝你使用愉快！** 🎉
