<template>
  <div class="feedback-animation" :class="type">
    <!-- 答对动画：星星和烟花 -->
    <div v-if="type === 'correct'" class="correct-animation">
      <div class="stars-container">
        <span 
          v-for="i in 8" 
          :key="i" 
          class="star"
          :style="getStarStyle(i)"
        >
          ⭐
        </span>
      </div>
      <div class="message-box correct-message">
        <span class="message-icon">🎉</span>
        <span class="message-text">{{ message }}</span>
      </div>
      <div class="fireworks">
        <span class="firework" v-for="i in 3" :key="i" :style="getFireworkStyle(i)">✨</span>
      </div>
    </div>

    <!-- 答错动画：温和提示 -->
    <div v-if="type === 'wrong'" class="wrong-animation">
      <div class="message-box wrong-message">
        <span class="message-icon">💪</span>
        <span class="message-text">{{ message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['correct', 'wrong'].includes(value)
  },
  message: {
    type: String,
    required: true
  }
})

const getStarStyle = (index) => {
  const angle = (index / 8) * Math.PI * 2
  const radius = 150 + Math.random() * 50
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius
  const delay = index * 0.1
  
  return {
    '--x': `${x}px`,
    '--y': `${y}px`,
    '--delay': `${delay}s`,
    '--size': `${20 + Math.random() * 15}px`
  }
}

const getFireworkStyle = (index) => {
  const positions = [
    { top: '20%', left: '20%' },
    { top: '20%', right: '20%' },
    { bottom: '30%', left: '50%' }
  ]
  const delay = index * 0.2
  
  return {
    ...positions[index - 1],
    '--delay': `${delay}s`
  }
}
</script>

<style scoped>
.feedback-animation {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 答对动画 */
.correct-animation {
  position: relative;
  width: 100%;
  height: 100%;
}

.stars-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
}

.star {
  position: absolute;
  font-size: var(--size);
  opacity: 0;
  animation: starFly 1.2s ease-out forwards;
  animation-delay: var(--delay);
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.8));
}

@keyframes starFly {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.3) rotate(0deg);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(var(--x), var(--y)) scale(1.2) rotate(720deg);
  }
}

.message-box {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px 60px;
  background: white;
  border-radius: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: messagePop 0.5s ease-out;
}

@keyframes messagePop {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(20px);
  }
  70% {
    transform: scale(1.1) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.correct-message {
  background: linear-gradient(135deg, #FFF9C4 0%, #FFE082 100%);
  border: 4px solid #FFD54F;
}

.wrong-message {
  background: linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%);
  border: 4px solid #FFB74D;
}

.message-icon {
  font-size: 64px;
  animation: iconBounce 0.6s ease-in-out infinite alternate;
}

@keyframes iconBounce {
  0% {
    transform: translateY(-10px) scale(1);
  }
  100% {
    transform: translateY(10px) scale(1.1);
  }
}

.message-text {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.fireworks {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.firework {
  position: absolute;
  font-size: 40px;
  opacity: 0;
  animation: fireworkExplode 1.5s ease-out infinite;
  animation-delay: var(--delay);
}

@keyframes fireworkExplode {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
  100% {
    opacity: 0;
    transform: scale(2);
  }
}

/* 响应式设计 */
@media (max-width: 520px) {
  .message-box {
    padding: 30px 40px;
  }

  .message-icon {
    font-size: 48px;
  }

  .message-text {
    font-size: 28px;
  }

  .star {
    --size: calc(var(--size) * 0.8);
  }
}
</style>
