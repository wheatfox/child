<template>
  <div class="word-card" :style="{ backgroundColor: bgColor }">
    <!-- Emoji/图标显示区域 -->
    <div class="card-image">
      <!-- 自定义图片优先显示 -->
      <img 
        v-if="word.image" 
        :src="word.image" 
        :alt="word.translation"
        class="custom-image"
      />
      <!-- 没有自定义图片时显示 emoji -->
      <span v-else class="emoji-display">{{ word.emoji }}</span>
    </div>
    
    <!-- 单词显示区域 -->
    <div class="card-content">
      <div class="english-word" :class="{ 'is-phrase': word.isPhrase }">{{ word.word }}</div>
      <div class="chinese-translation">{{ word.translation }}</div>
      <div class="phonetic" v-if="word.phonetic">{{ word.phonetic }}</div>
      <div class="phrase-badge" v-if="word.isPhrase">短语</div>
    </div>
    
    <!-- 控制按钮区域 -->
    <div class="card-controls">
      <button 
        class="control-btn" 
        @click="handlePlay"
        :title="'播放发音'"
      >
        <span class="btn-icon">🔊</span>
        <span class="btn-text">播放</span>
      </button>
      
      <button 
        class="control-btn repeat" 
        @click="handleRepeat"
        :title="'跟读'"
      >
        <span class="btn-icon">🎤</span>
        <span class="btn-text">跟读</span>
      </button>
      
      <button 
        class="control-btn next" 
        @click="handleNext"
        :title="'下一个'"
      >
        <span class="btn-icon">➡️</span>
        <span class="btn-text">下一个</span>
      </button>
    </div>
    
    <!-- 播放动画 -->
    <transition name="fade">
      <div v-if="isPlaying" class="playing-indicator">
        <span class="sound-wave">🔊</span>
        <span class="sound-wave delay-1">🔊</span>
        <span class="sound-wave delay-2">🔊</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { playWord, speakForRepeat, cancel, isSpeaking } from '@/utils/english/audioService'

const props = defineProps({
  word: {
    type: Object,
    required: true
  },
  bgColor: {
    type: String,
    default: '#FFF'
  },
  autoPlay: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['play', 'repeat', 'next', 'playEnd'])

const isPlaying = ref(false)

// 监听单词变化，自动播放
watch(() => props.word, (newWord) => {
  if (newWord && props.autoPlay) {
    // 短暂延迟后自动播放
    setTimeout(() => {
      handlePlay()
    }, 500)
  }
}, { immediate: true })

// 播放发音
const handlePlay = () => {
  if (isSpeaking()) {
    cancel()
  }
  
  isPlaying.value = true
  
  playWord(props.word, () => {
    isPlaying.value = false
    emit('playEnd')
  })
  
  emit('play')
}

// 跟读
const handleRepeat = () => {
  if (isSpeaking()) {
    cancel()
  }
  
  isPlaying.value = true
  
  speakForRepeat(props.word.word, () => {
    isPlaying.value = false
  })
  
  emit('repeat')
}

// 下一个
const handleNext = () => {
  if (isSpeaking()) {
    cancel()
  }
  isPlaying.value = false
  emit('next')
}

// 组件卸载时取消播放
import { onUnmounted } from 'vue'
onUnmounted(() => {
  if (isSpeaking()) {
    cancel()
  }
})
</script>

<style scoped>
.word-card {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 40px 30px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  position: relative;
  animation: cardSlideIn 0.4s ease-out;
}

@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 图片显示区域 */
.card-image {
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #F5F5F5 0%, #E8E8E8 100%);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.custom-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: imageFadeIn 0.5s ease-out;
}

@keyframes imageFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.emoji-display {
  font-size: 100px;
  line-height: 1;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  animation: emojiPop 0.5s ease-out;
}

@keyframes emojiPop {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 单词显示区域 */
.card-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.english-word {
  font-size: 56px;
  font-weight: 900;
  color: #333;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 短语的字体调整 */
.english-word.is-phrase {
  font-size: 42px;
  letter-spacing: 1px;
}

.chinese-translation {
  font-size: 28px;
  color: #666;
  font-weight: 500;
}

.phonetic {
  font-size: 18px;
  color: #999;
  font-style: italic;
  font-family: 'Courier New', monospace;
}

/* 短语标签 */
.phrase-badge {
  display: inline-block;
  padding: 6px 16px;
  background: linear-gradient(135deg, #E1BEE7 0%, #CE93D8 100%);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 20px;
  margin-top: 8px;
  box-shadow: 0 2px 8px rgba(225, 190, 231, 0.4);
}

/* 控制按钮区域 */
.card-controls {
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
}

.control-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 24px;
  background: linear-gradient(135deg, #4ECDC4 0%, #45B7AA 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(78, 205, 196, 0.3);
  min-width: 90px;
}

.control-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(78, 205, 196, 0.4);
}

.control-btn:active {
  transform: translateY(-1px);
}

.control-btn .btn-icon {
  font-size: 24px;
  line-height: 1;
}

.control-btn.repeat {
  background: linear-gradient(135deg, #FF6B9D 0%, #F05A8A 100%);
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
}

.control-btn.repeat:hover {
  box-shadow: 0 6px 18px rgba(255, 107, 157, 0.4);
}

.control-btn.next {
  background: linear-gradient(135deg, #FFE66D 0%, #FFD54F 100%);
  box-shadow: 0 4px 12px rgba(255, 230, 109, 0.3);
  color: #333;
}

.control-btn.next:hover {
  box-shadow: 0 6px 18px rgba(255, 230, 109, 0.4);
}

/* 播放动画 */
.playing-indicator {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 4px;
  align-items: center;
}

.sound-wave {
  font-size: 20px;
  animation: soundWave 0.6s ease-in-out infinite;
}

.sound-wave.delay-1 {
  animation-delay: 0.2s;
}

.sound-wave.delay-2 {
  animation-delay: 0.4s;
}

@keyframes soundWave {
  0%, 100% {
    opacity: 0.5;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 520px) {
  .word-card {
    padding: 30px 20px;
  }
  
  .card-image {
    width: 140px;
    height: 140px;
  }
  
  .emoji-display {
    font-size: 80px;
  }
  
  .english-word {
    font-size: 42px;
  }
  
  .chinese-translation {
    font-size: 22px;
  }
  
  .card-controls {
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .control-btn {
    padding: 12px 18px;
    min-width: 80px;
    font-size: 13px;
  }
  
  .control-btn .btn-icon {
    font-size: 20px;
  }
}
</style>
