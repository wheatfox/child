<template>
  <button 
    class="option-button"
    :class="{ 
      'is-selected': isSelected,
      'is-correct': isCorrect,
      'is-wrong': isWrong,
      'is-disabled': isDisabled
    }"
    @click="handleClick"
    :disabled="isDisabled"
  >
    <!-- 选项图标 -->
    <span class="option-icon">{{ icon }}</span>
    
    <!-- 选项文字 -->
    <span class="option-text">{{ number }}</span>
    
    <!-- 正确/错误标记 -->
    <span v-if="isCorrect" class="mark-correct">✓</span>
    <span v-if="isWrong" class="mark-wrong">✗</span>
  </button>
</template>

<script setup>
const props = defineProps({
  number: {
    type: [String, Number],
    required: true
  },
  icon: {
    type: String,
    default: '🎯'
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 140px;
  min-height: 140px;
  padding: 20px;
  background: white;
  border: 3px solid #E0E0E0;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.option-button:hover:not(.is-disabled) {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-color: #4ECDC4;
}

.option-button:active:not(.is-disabled) {
  transform: translateY(-2px);
}

.option-icon {
  font-size: 48px;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.option-text {
  font-size: 22px;
  font-weight: 700;
  color: #333;
  text-align: center;
}

/* 选中状态 */
.option-button.is-selected {
  border-color: #4ECDC4;
  background: linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%);
  box-shadow: 0 6px 16px rgba(78, 205, 196, 0.3);
}

/* 正确状态 */
.option-button.is-correct {
  border-color: #4CAF50;
  background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.3);
  animation: correctPulse 0.6s ease;
}

@keyframes correctPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.mark-correct {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  background: #4CAF50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  animation: markPopIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes markPopIn {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 错误状态 */
.option-button.is-wrong {
  border-color: #F44336;
  background: linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%);
  box-shadow: 0 6px 16px rgba(244, 67, 54, 0.3);
  animation: wrongShake 0.5s ease;
}

@keyframes wrongShake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-8px);
  }
  75% {
    transform: translateX(8px);
  }
}

.mark-wrong {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  background: #F44336;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  animation: markPopIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* 禁用状态 */
.option-button.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
  filter: grayscale(0.3);
}

/* 响应式设计 */
@media (max-width: 520px) {
  .option-button {
    min-width: 110px;
    min-height: 110px;
    padding: 16px;
    gap: 8px;
  }
  
  .option-icon {
    font-size: 36px;
  }
  
  .option-text {
    font-size: 18px;
  }
  
  .mark-correct,
  .mark-wrong {
    width: 28px;
    height: 28px;
    font-size: 18px;
    top: 8px;
    right: 8px;
  }
}
</style>
