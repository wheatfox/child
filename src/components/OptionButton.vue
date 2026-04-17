<template>
  <button 
    class="option-button" 
    :class="{ 'selected': isSelected, 'correct': isCorrect, 'wrong': isWrong, 'disabled': isDisabled }"
    @click="handleClick"
    :disabled="isDisabled"
  >
    <span class="option-icon">{{ icon }}</span>
    <span class="option-number">{{ number }}</span>
  </button>
</template>

<script setup>
const props = defineProps({
  number: {
    type: Number,
    required: true
  },
  icon: {
    type: String,
    default: '🎈'
  },
  isSelected: {
    type: Boolean,
    default: false
  },
  isCorrect: {
    type: Boolean,
    default: false
  },
  isWrong: {
    type: Boolean,
    default: false
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (!props.isDisabled) {
    emit('click')
  }
}
</script>

<style scoped>
.option-button {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  height: 100px;
  padding: 12px;
  border: 4px solid transparent;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFE6F0 0%, #FFB6C1 100%);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  font-family: inherit;
  outline: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.option-button:hover:not(:disabled) {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 6px 12px rgba(255, 107, 157, 0.3);
}

.option-button:active:not(:disabled) {
  transform: translateY(-2px) scale(0.98);
}

.option-button.selected {
  border-color: #4ECDC4;
  background: linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%);
  animation: pulse 0.5s ease;
}

.option-button.correct {
  border-color: #4CAF50;
  background: linear-gradient(135deg, #C8E6C9 0%, #A5D6A7 100%);
  animation: correctBounce 0.6s ease;
}

.option-button.wrong {
  border-color: #FF9800;
  background: linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%);
  animation: shake 0.5s ease;
}

.option-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.option-icon {
  font-size: 28px;
  margin-bottom: 4px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.option-number {
  font-size: 32px;
  font-weight: bold;
  color: #FF6B9D;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.option-button.correct .option-number,
.option-button.wrong .option-number {
  color: #333;
}

/* 动画效果 */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes correctBounce {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.15) translateY(-10px);
  }
  50% {
    transform: scale(1) translateY(0);
  }
  70% {
    transform: scale(1.1) translateY(-5px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  20%, 60% {
    transform: translateX(-8px);
  }
  40%, 80% {
    transform: translateX(8px);
  }
}

/* 响应式设计 */
@media (max-width: 520px) {
  .option-button {
    min-width: 80px;
    height: 80px;
    padding: 8px;
  }

  .option-icon {
    font-size: 22px;
  }

  .option-number {
    font-size: 26px;
  }
}
</style>
