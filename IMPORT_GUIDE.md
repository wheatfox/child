# 奇妙英语角 - 自定义导入指南

欢迎使用奇妙英语角的自定义导入功能！本指南将帮助你导入自己的图片和语音资源。

***

## 📁 目录结构

首先，在项目根目录的 `public` 文件夹下创建以下目录结构：

```
public/
├── images/
│   └── words/          # 存放单词图片
│       ├── dog.png
│       ├── cat.jpg
│       └── ...
└── audio/
    └── words/          # 存放单词语音
        ├── dog.mp3
        ├── cat.mp3
        └── ...
```

**操作步骤：**

1. 在 `math-app` 目录下找到 `public` 文件夹
2. 创建 `images/words` 目录
3. 创建 `audio/words` 目录

***

## 🖼️ 导入自定义图片

### 1. 图片要求

- **支持格式**：PNG, JPG, SVG
- **推荐尺寸**：512x512 像素（正方形）
- **文件大小**：建议小于 500KB
- **背景**：透明背景或纯色背景效果最佳

### 2. 准备图片

将你的图片文件复制到 `public/images/words/` 目录，例如：

- `dog.png`
- `cat.jpg`
- `apple.svg`

### 3. 在单词库中配置

打开 `src/utils/english/wordBank.js`，在对应的单词对象中添加 `image` 字段：

```javascript
{
  id: 'dog',
  word: 'dog',
  translation: '小狗',
  emoji: '🐶',
  topic: 'animals',
  phonetic: '/dɔːɡ/',
  image: '/images/words/dog.png'  // 添加这行
}
```

**注意**：路径以 `/` 开头，表示从 public 目录开始

***

## 🔊 导入自定义语音

### 1. 语音要求

- **支持格式**：MP3, WAV, OGG
- **推荐格式**：MP3（兼容性最好）
- <br />
- **采样率**：44.1kHz 或 48kHz
- **比特率**：128kbps 或更高
- **时长**：每个单词 1-3 秒

### 2. 录制语音

**录制建议：**

- 使用清晰的发音
- 保持环境安静
- 语速适中（适合幼儿）
- 可以录制英文 + 中文，例如："dog, 小狗"

**录制工具推荐：**

- Windows: 录音机（内置）
- Mac: QuickTime Player
- 专业软件：Audacity（免费）

### 3. 准备音频文件

将录制好的音频文件复制到 `public/audio/words/` 目录，例如：

- `dog.mp3`
- `cat.mp3`
- `hello.mp3`

### 4. 在单词库中配置

打开 `src/utils/english/wordBank.js`，在对应的单词对象中添加 `audioUrl` 字段：

```javascript
{
  id: 'dog',
  word: 'dog',
  translation: '小狗',
  emoji: '🐶',
  topic: 'animals',
  phonetic: '/dɔːɡ/',
  audioUrl: '/audio/words/dog.mp3'  // 添加这行
}
```

***

## 📝 完整示例

### 示例 1：只添加图片

```javascript
{
  id: 'elephant',
  word: 'elephant',
  translation: '大象',
  emoji: '🐘',
  topic: 'animals',
  phonetic: '/ˈel..fənt/',
  image: '/images/words/elephant.png'  // 只添加图片
}
```

### 示例 2：只添加语音

```javascript
{
  id: 'elephant',
  word: 'elephant',
  translation: '大象',
  emoji: '🐘',
  topic: 'animals',
  phonetic: '/ˈel..fənt/',
  audioUrl: '/audio/words/elephant.mp3'  // 只添加语音
}
```

### 示例 3：同时添加图片和语音

```javascript
{
  id: 'elephant',
  word: 'elephant',
  translation: '大象',
  emoji: '🐘',
  topic: 'animals',
  phonetic: '/ˈel.ɪ.fənt/',
  image: '/images/words/elephant.png',     // 自定义图片
  audioUrl: '/audio/words/elephant.mp3'    // 自定义语音
}
```

***

## 🎯 优先级说明

### 图片显示优先级

1. **自定义图片** (`image` 字段) - 最高优先级
2. **Emoji** (`emoji` 字段) - 默认回退

### 语音播放优先级

1. **自定义语音** (`audioUrl` 字段) - 最高优先级
2. **浏览器语音合成** - 默认回退

***

## 📦 批量导入模板

如果你需要批量导入多个单词，可以复制以下模板：

```javascript
// 在 ENGLISH_WORDS 的对应主题数组中添加
{
  id: 'word-id',
  word: 'english-word',
  translation: '中文翻译',
  emoji: '🎯',
  topic: 'topic-name',
  phonetic: '/phonetic/',
  image: '/images/words/word-id.png',      // 可选
  audioUrl: '/audio/words/word-id.mp3'     // 可选
}
```

***

## 🔧 快速测试

### 1. 创建测试文件

在 `public/images/words/` 目录放入一个测试图片，例如 `test.png`

### 2. 修改单词库

打开 `src/utils/english/wordBank.js`，找到任意一个单词，添加：

```javascript
image: '/images/words/test.png'
```

### 3. 查看效果

- 访问 <http://localhost:5174/>
- 进入"奇妙英语角"
- 选择对应主题
- 查看是否显示自定义图片

***

## 💡 最佳实践

### 图片命名规范

- 使用小写字母
- 单词之间用下划线或连字符分隔
- 例如：`good_morning.png` 或 `good-morning.png`

### 语音命名规范

- 与单词 ID 保持一致
- 例如：单词 ID 是 `good-morning`，音频文件名为 `good-morning.mp3`

### 文件管理建议

1. **按主题分类**（可选）：
   ```
   public/images/words/
   ├── basic/      # 基础认知
   ├── animals/    # 动物世界
   ├── daily/      # 日常生活
   └── phrases/    # 常用短语
   ```
2. **批量处理工具**：
   - 图片压缩：TinyPNG (<https://tinypng.com/>)
   - 音频转换：Online Audio Converter (<https://online-audio-converter.com/>)

***

## 🎨 资源推荐

### 免费图片资源

1. **Flaticon** - 免费图标和插图 (<https://www.flaticon.com/>)
2. **Unsplash** - 高质量免费图片 (<https://unsplash.com/>)
3. **Pixabay** - 免费素材图片 (<https://pixabay.com/>)

### 免费语音资源

1. **Google Text-to-Speech** - 在线语音合成
2. **NaturalReaders** - 自然语音合成 (<https://www.naturalreaders.com/>)
3. **录制真人发音** - 最推荐，更有温度

***

## ❓ 常见问题

### Q1: 图片不显示怎么办？

**检查清单：**

- [ ] 图片文件是否在正确的目录
- [ ] 路径是否正确（以 `/` 开头）
- [ ] 文件名是否匹配（区分大小写）
- [ ] 图片格式是否支持（PNG/JPG/SVG）
- [ ] 浏览器控制台是否有错误信息

### Q2: 语音不播放怎么办？

**检查清单：**

- [ ] 音频文件是否在正确的目录
- [ ] 路径是否正确
- [ ] 音频格式是否支持（MP3/WAV/OGG）
- [ ] 浏览器是否支持语音播放
- [ ] 音量是否打开

### Q3: 如何批量修改单词库？

**方法：**

1. 使用文本编辑器（如 VS Code）的批量替换功能
2. 使用 Excel 整理单词信息，然后导出为 JSON
3. 编写脚本自动生成单词库

### Q4: 可以混合使用 Emoji 和图片吗？

**可以！** 推荐做法：

- 常用单词使用 Emoji（加载快）
- 抽象概念或没有合适 Emoji 的单词使用图片
- 系统会自动处理优先级

***

## 🚀 下一步

导入自定义资源后，你可以：

1. 测试每个单词的显示和播放
2. 收集孩子的反馈
3. 根据学习效果调整资源
4. 分享你的自定义词库给其他家长

***

## 📞 技术支持

如果遇到问题：

1. 检查浏览器控制台错误信息
2. 确认文件路径和格式正确
3. 清除浏览器缓存后重试
4. 确保开发服务器正在运行

***

**祝你使用愉快！🎉**
