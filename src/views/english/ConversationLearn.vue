<template>
  <div class="conversation-learn">
    <div class="learn-container">
      <!-- 返回按钮 -->
      <header class="header">
        <button class="back-btn" @click="goBack">
          <span class="back-arrow">←</span>
          返回
        </button>
        <h1 class="title">🗣️ 常用对话</h1>
        <div class="header-actions">
          <button class="btn-refresh" @click="refreshScenes" title="随机更新 20 组对话">
            🔄 更新
          </button>
          <div class="progress-display">
            ⭐ {{ currentStars }} 星星
          </div>
        </div>
      </header>

      <!-- 统计信息 -->
      <div class="stats-bar">
        <span>📚 题库：<strong>{{ allConversations.length }}</strong> 组</span>
        <span>📖 当前显示：<strong>{{ conversations.length }}</strong> 组</span>
        <span>✅ 已完成：<strong>{{ completedCount }}</strong> 组</span>
      </div>

      <!-- 场景选择 -->
      <div v-if="!selectedScene" class="scene-grid">
        <div
          v-for="(scene, index) in conversations"
          :key="scene.id"
          class="scene-card"
          :style="{ animationDelay: `${index * 0.05}s` }"
          @click="selectScene(scene)"
        >
          <div class="scene-emoji">{{ scene.emoji || '💬' }}</div>
          <div class="scene-title">{{ scene.title }}</div>
          <div class="scene-dialogues-count">
            📝 {{ scene.dialogues.length }} 句对话
          </div>
          <div v-if="isSceneCompleted(scene.id)" class="completed-badge">
            ✅
          </div>
        </div>
      </div>

      <!-- 对话学习 -->
      <div v-else class="conversation-view">
        <!-- 场景标题 -->
        <div class="scene-header">
          <button class="back-scene-btn" @click="backToScenes">
            ← 返回场景列表
          </button>
          <h2 class="scene-title-large">
            {{ selectedScene.emoji || '💬' }} {{ selectedScene.title }}
          </h2>
        </div>

        <!-- 对话卡片 -->
        <div class="dialogue-list">
          <div
            v-for="(dialogue, idx) in selectedScene.dialogues"
            :key="idx"
            class="dialogue-card"
            :class="{ 'highlighted': highlightedLine === idx, 'has-recording': dialogueRecordings[idx] }"
          >
            <div class="speaker-badge" :class="dialogue.speaker.toLowerCase()">
              {{ dialogue.speaker }}
            </div>
            <div class="dialogue-content">
              <div class="english-text" @click="speakText(dialogue.text)">
                {{ dialogue.text }}
                <span class="speaker-icon">🔊</span>
              </div>
              <div class="chinese-translation">{{ dialogue.translation }}</div>
              
              <!-- 录音控制 -->
              <div class="recording-controls">
                <!-- 未录音时显示录音按钮 -->
                <button 
                  v-if="!dialogueRecordings[idx]"
                  class="btn-record"
                  @click="startRecording(idx)"
                  :disabled="isRecording && recordingIndex !== idx"
                >
                  🎤 跟读录音
                </button>
                
                <!-- 已录音时显示播放、重录、删除按钮 -->
                <div v-else class="recording-status">
                  <button class="btn-play-recording" @click="playRecording(idx)">
                    ▶️ 听我的录音
                  </button>
                  <button class="btn-re-record" @click="startRecording(idx)">
                    🔁 重新录制
                  </button>
                  <button class="btn-delete-recording" @click="deleteRecording(idx)">
                    🗑️ 删除
                  </button>
                </div>
                
                <!-- 录音中指示器 -->
                <div v-if="isRecording && recordingIndex === idx" class="recording-indicator">
                  <span class="recording-dot"></span>
                  正在录音... {{ recordingTime }}s
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 控制按钮 -->
        <div class="action-buttons">
          <button class="btn-listen-all" @click="playAllDialogue">
            🔊 播放全部对话
          </button>
          <button class="btn-practice" @click="startPractice" disabled title="即将推出">
            📝 开始练习（即将推出）
          </button>
        </div>

        <!-- 完成按钮 -->
        <div class="complete-section">
          <button class="btn-complete" @click="completeScene" :disabled="!canComplete">
            {{ canComplete ? '✅ 我学会了！' : '📖 请先学习对话' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getConversations } from '@/utils/english/wordBank'
import { getStorage, setStorage } from '@/utils/storage'

const router = useRouter()
const allConversations = ref([]) // 所有对话
const conversations = ref([]) // 当前显示的 20 组对话
const selectedScene = ref(null)
const currentStars = ref(0)
const highlightedLine = ref(-1)
const hasPlayedAudio = ref(false)
const completedScenes = ref([]) // 已完成的场景 ID

// 录音相关状态
const mediaRecorder = ref(null)
const isRecording = ref(false)
const recordingIndex = ref(-1)
const recordingTime = ref(0)
const recordingTimer = ref(null)
const dialogueRecordings = ref({}) // 存储每句对话的录音
const audioChunks = ref([])
const currentAudio = ref(null) // 当前播放的音频对象

// 计算已完成的数量
const completedCount = computed(() => {
  return completedScenes.value.filter(id => 
    conversations.value.some(scene => scene.id === id)
  ).length
})

// 检查场景是否已完成
const isSceneCompleted = (sceneId) => {
  const progress = getStorage(`englishProgress_conversations`) || { completedScenes: [] }
  return progress.completedScenes?.includes(sceneId) || false
}

// 是否可以完成（至少听过一次音频）
const canComplete = computed(() => {
  return hasPlayedAudio.value
})

// 加载星星
const loadStars = () => {
  const stars = getStorage('totalStars') || 0
  currentStars.value = stars
}

// 加载已完成的场景
const loadCompletedScenes = () => {
  const progress = getStorage(`englishProgress_conversations`) || { completedScenes: [] }
  completedScenes.value = progress.completedScenes || []
}

// 刷新场景（随机更新 20 组）
const refreshScenes = () => {
  // 返回场景列表
  selectedScene.value = null
  highlightedLine.value = -1
  
  // 随机选择新的 20 组
  conversations.value = selectRandomScenes()
  
  // 清空录音
  dialogueRecordings.value = {}
}

// 随机选择 20 组对话
const selectRandomScenes = () => {
  const all = [...allConversations.value]
  const selected = []
  const count = Math.min(20, all.length)
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * all.length)
    selected.push(all[randomIndex])
    all.splice(randomIndex, 1)
  }
  
  return selected
}

// 加载对话数据
onMounted(() => {
  allConversations.value = getConversations()
  conversations.value = selectRandomScenes() // 随机选择 20 组
  loadStars()
  loadCompletedScenes()
})

// 组件卸载时清理
onUnmounted(() => {
  cleanupRecording()
})

// 选择场景
const selectScene = (scene) => {
  selectedScene.value = scene
  hasPlayedAudio.value = false
  highlightedLine.value = -1
  dialogueRecordings.value = {} // 清空当前录音对象
  loadRecordings() // 加载该场景已保存的录音
}

// 返回场景列表
const backToScenes = () => {
  selectedScene.value = null
  highlightedLine.value = -1
}

// 返回上一页
const goBack = () => {
  router.push('/english/topics')
}

// 播放文本
const speakText = (text) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.8
    utterance.pitch = 1
    window.speechSynthesis.speak(utterance)
    hasPlayedAudio.value = true
  }
}

// 播放全部对话
const playAllDialogue = () => {
  if (!selectedScene.value) return
  
  hasPlayedAudio.value = true
  let index = 0
  
  const playNext = () => {
    if (index >= selectedScene.value.dialogues.length) {
      highlightedLine.value = -1
      return
    }
    
    highlightedLine.value = index
    const dialogue = selectedScene.value.dialogues[index]
    speakText(dialogue.text)
    
    index++
    setTimeout(playNext, 1500)
  }
  
  playNext()
}

// 开始练习
const startPractice = () => {
  if (!selectedScene.value) return
  alert('🚧 练习功能即将推出！敬请期待～\n\n目前您可以：\n1. 听标准发音\n2. 跟读录音\n3. 回放对比自己的发音')
}

// 完成场景
const completeScene = () => {
  if (!selectedScene.value || !canComplete.value) return
  
  // 保存进度
  const progress = getStorage(`englishProgress_conversations`) || { completedScenes: [] }
  if (!progress.completedScenes.includes(selectedScene.value.id)) {
    progress.completedScenes.push(selectedScene.value.id)
    setStorage(`englishProgress_conversations`, progress)
    
    // 增加星星
    currentStars.value += 5
    setStorage('totalStars', currentStars.value)
    
    alert('🎉 太棒了！你又学会了 5 个句子！')
  }
}

// ========== 录音功能 ==========

// 开始录音
const startRecording = async (idx) => {
  try {
    // 检查浏览器支持
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('❌ 您的浏览器不支持录音功能，请使用 Chrome、Firefox 或 Edge 浏览器')
      return
    }
    
    // 停止之前的录音
    if (mediaRecorder.value && mediaRecorder.value.state === 'recording') {
      mediaRecorder.value.stop()
    }
    
    // 停止之前的音频播放
    if (currentAudio.value) {
      currentAudio.value.pause()
      currentAudio.value = null
    }
    
    // 请求麦克风权限
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    
    // 创建录音器
    mediaRecorder.value = new MediaRecorder(stream)
    audioChunks.value = []
    recordingIndex.value = idx
    isRecording.value = true
    recordingTime.value = 0
    
    // 开始计时
    recordingTimer.value = setInterval(() => {
      recordingTime.value++
    }, 1000)
    
    // 录音数据可用
    mediaRecorder.value.ondataavailable = (event) => {
      audioChunks.value.push(event.data)
    }
    
    // 录音结束
    mediaRecorder.value.onstop = () => {
      // 清除计时器
      if (recordingTimer.value) {
        clearInterval(recordingTimer.value)
        recordingTimer.value = null
      }
      
      // 创建音频 blob
      const audioBlob = new Blob(audioChunks.value, { type: 'audio/webm' })
      
      // 转换为 base64 存储
      const reader = new FileReader()
      reader.readAsDataURL(audioBlob)
      reader.onloadend = () => {
        const base64Audio = reader.result
        dialogueRecordings.value[idx] = base64Audio
        
        // 保存到 localStorage
        saveRecordingsToStorage()
        
        // 停止录音流
        stream.getTracks().forEach(track => track.stop())
      }
    }
    
    // 开始录音
    mediaRecorder.value.start()
    
    // 自动播放原音作为示范
    const dialogue = selectedScene.value.dialogues[idx]
    speakText(dialogue.text)
    
  } catch (error) {
    console.error('录音失败:', error)
    if (error.name === 'NotAllowedError') {
      alert('❌ 您拒绝了麦克风权限，无法录音。请在浏览器设置中允许麦克风访问。')
    } else if (error.name === 'NotFoundError') {
      alert('❌ 未找到麦克风设备，请连接麦克风后重试。')
    } else {
      alert('❌ 录音失败：' + error.message)
    }
    isRecording.value = false
    recordingIndex.value = -1
  }
}

// 播放录音
const playRecording = (idx) => {
  try {
    // 停止之前的播放
    if (currentAudio.value) {
      currentAudio.value.pause()
      currentAudio.value = null
    }
    
    const base64Audio = dialogueRecordings.value[idx]
    if (!base64Audio) return
    
    // 创建音频对象
    currentAudio.value = new Audio(base64Audio)
    currentAudio.value.play()
    
    currentAudio.value.onended = () => {
      currentAudio.value = null
    }
    
  } catch (error) {
    console.error('播放录音失败:', error)
    alert('❌ 播放失败：' + error.message)
  }
}

// 删除录音
const deleteRecording = (idx) => {
  if (confirm('确定要删除这句录音吗？')) {
    delete dialogueRecordings.value[idx]
    saveRecordingsToStorage()
  }
}

// 保存录音到 localStorage
const saveRecordingsToStorage = () => {
  if (!selectedScene.value) return
  
  const storageKey = `conversationRecordings_${selectedScene.value.id}`
  setStorage(storageKey, dialogueRecordings.value)
}

// 加载录音
const loadRecordings = () => {
  if (!selectedScene.value) return
  
  const storageKey = `conversationRecordings_${selectedScene.value.id}`
  const saved = getStorage(storageKey)
  if (saved) {
    dialogueRecordings.value = saved
  }
}

// 清理录音状态
const cleanupRecording = () => {
  if (mediaRecorder.value && mediaRecorder.value.state === 'recording') {
    mediaRecorder.value.stop()
  }
  if (recordingTimer.value) {
    clearInterval(recordingTimer.value)
  }
  if (currentAudio.value) {
    currentAudio.value.pause()
  }
}
</script>

<style scoped>
.conversation-learn {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFCCBC 0%, #FFE0B2 100%);
  padding: 20px;
}

.learn-container {
  max-width: 800px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-refresh {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border: none;
  border-radius: 20px;
  background: #2196F3;
  color: white;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
}

.btn-refresh:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 14px rgba(33, 150, 243, 0.4);
}

/* 统计条 */
.stats-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  font-size: 15px;
  color: #666;
}

.stats-bar strong {
  color: #4CAF50;
  font-size: 18px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border: none;
  border-radius: 20px;
  background: #4CAF50;
  color: white;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s;
}

.back-btn:hover {
  transform: scale(1.05);
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.progress-display {
  padding: 8px 16px;
  background: #FFF3E0;
  border-radius: 20px;
  font-weight: bold;
  color: #F57F17;
}

/* 场景网格 */
.scene-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.scene-card {
  background: white;
  border-radius: 16px;
  padding: 24px 16px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scene-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.scene-emoji {
  font-size: 48px;
  margin-bottom: 12px;
}

.scene-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.scene-dialogues-count {
  font-size: 14px;
  color: #666;
}

.completed-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  animation: popIn 0.3s ease-out;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 对话视图 */
.conversation-view {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.scene-header {
  text-align: center;
  margin-bottom: 24px;
}

.back-scene-btn {
  padding: 8px 16px;
  border: none;
  background: #E0E0E0;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 12px;
  font-weight: 600;
  color: #666;
}

.scene-title-large {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

/* 对话列表 */
.dialogue-list {
  margin: 24px 0;
}

.dialogue-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  margin-bottom: 16px;
  background: #F5F5F5;
  border-radius: 12px;
  transition: all 0.3s;
}

.dialogue-card.highlighted {
  background: #E3F2FD;
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2);
}

.speaker-badge {
  min-width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.speaker-badge.a {
  background: #4CAF50;
  color: white;
}

.speaker-badge.b {
  background: #2196F3;
  color: white;
}

.dialogue-content {
  flex: 1;
}

.english-text {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.english-text:hover {
  color: #4CAF50;
}

.speaker-icon {
  font-size: 16px;
}

.chinese-translation {
  font-size: 14px;
  color: #666;
}

/* 录音控制 */
.recording-controls {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.btn-record {
  padding: 8px 16px;
  border: 2px dashed #4CAF50;
  background: white;
  color: #4CAF50;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-record:hover:not(:disabled) {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.btn-record:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.recording-status {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-play-recording,
.btn-re-record,
.btn-delete-recording {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-play-recording {
  background: #2196F3;
  color: white;
}

.btn-play-recording:hover {
  background: #1976D2;
}

.btn-re-record {
  background: #FF9800;
  color: white;
}

.btn-re-record:hover {
  background: #F57C00;
}

.btn-delete-recording {
  background: #F44336;
  color: white;
}

.btn-delete-recording:hover {
  background: #D32F2F;
}

.recording-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #FFEBEE;
  border-radius: 8px;
  color: #C62828;
  font-size: 14px;
  font-weight: 600;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.recording-dot {
  width: 10px;
  height: 10px;
  background: #F44336;
  border-radius: 50%;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

/* 有录音的对话卡片 */
.dialogue-card.has-recording {
  background: #E8F5E9;
  border-left: 4px solid #4CAF50;
}

/* 按钮 */
.action-buttons {
  display: flex;
  gap: 12px;
  margin: 24px 0;
  justify-content: center;
}

.btn-listen-all,
.btn-practice {
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-listen-all {
  background: #2196F3;
  color: white;
}

.btn-practice {
  background: #4CAF50;
  color: white;
}

.btn-listen-all:hover,
.btn-practice:hover {
  transform: scale(1.05);
}

/* 完成按钮 */
.complete-section {
  text-align: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px dashed #E0E0E0;
}

.btn-complete {
  padding: 16px 48px;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-complete:enabled {
  background: linear-gradient(135deg, #FFD700 0%, #FFC107 100%);
  color: white;
  box-shadow: 0 4px 16px rgba(255, 193, 7, 0.4);
}

.btn-complete:enabled:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(255, 193, 7, 0.5);
}

.btn-complete:disabled {
  background: #E0E0E0;
  color: #999;
  cursor: not-allowed;
}

/* 响应式 */
@media (max-width: 600px) {
  .scene-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }
  
  .scene-card {
    padding: 16px 12px;
  }
  
  .scene-emoji {
    font-size: 36px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn-listen-all,
  .btn-practice {
    width: 100%;
  }
}
</style>
