<template>
  <div class="math-question">
    <!-- 猫头鹰博士向导区域 -->
    <div class="owl-guide">
      <div class="owl-avatar">🦉</div>
      <div class="owl-bubble">
        <p class="question-text">{{ question.questionText }}</p>
        <button 
          v-if="showReplay" 
          class="replay-btn" 
          @click="handleReplay"
          title="重新听题目"
        >
          🔊 重新播放
        </button>
      </div>
    </div>

    <!-- 图案化题目展示区 -->
    <div class="question-display">
      <div class="formula-container">
        <!-- 第一个数（或问号） -->
        <div v-if="question.blankPosition === 'num1'" class="blank-slot">
          <span class="question-mark">?</span>
        </div>
        <div v-else class="icon-columns" v-memo="[question.num1, question.icon, question.type]">
          <template v-for="(column, colIndex) in num1Columns" :key="'num1-col-' + colIndex">
            <!-- 省略号列 -->
            <div v-if="column.type === 'ellipsis'" class="icon-column ellipsis-column">
              <span class="ellipsis-text">···</span>
            </div>
            <!-- 正常图标列 -->
            <div v-else class="icon-column">
              <span 
                v-for="i in column.items" 
                :key="'num1-' + i" 
                class="item-icon"
                :style="{ animationDelay: i * 0.05 + 's' }"
              >
                {{ question.icon }}
              </span>
            </div>
          </template>
          <span class="item-count">{{ question.num1 }}</span>
        </div>

        <!-- 运算符 -->
        <div class="operator">{{ question.operator }}</div>

        <!-- 第二个数（或问号） -->
        <div v-if="question.blankPosition === 'num2'" class="blank-slot">
          <span class="question-mark">?</span>
        </div>
        <div v-else class="icon-columns" v-memo="[question.num2, question.icon, question.blankPosition, question.num1, question.type]">
          <template v-for="(column, colIndex) in num2Columns" :key="'num2-col-' + colIndex">
            <!-- 省略号列 -->
            <div v-if="column.type === 'ellipsis'" class="icon-column ellipsis-column">
              <span class="ellipsis-text">···</span>
            </div>
            <!-- 正常图标列 -->
            <div v-else class="icon-column">
              <span 
                v-for="i in column.items" 
                :key="'num2-' + i" 
                class="item-icon"
                :style="{ animationDelay: (question.blankPosition === 'num1' ? i : question.num1 + i) * 0.05 + 's' }"
              >
                {{ question.icon }}
              </span>
            </div>
          </template>
          <span class="item-count">{{ question.num2 }}</span>
        </div>

        <!-- 等号和结果 -->
        <div class="equals">=</div>
        <div v-if="question.type === 'fill-blank'" class="answer-slot answer-after-equals" v-memo="[question.answer, question.icon, question.type]">
          <div class="icon-columns">
            <template v-for="(column, colIndex) in answerColumns" :key="'answer-col-' + colIndex">
              <!-- 省略号列 -->
              <div v-if="column.type === 'ellipsis'" class="icon-column ellipsis-column">
                <span class="ellipsis-text">···</span>
              </div>
              <!-- 正常图标列 -->
              <div v-else class="icon-column">
                <span 
                  v-for="i in column.items" 
                  :key="'answer-' + i" 
                  class="item-icon"
                  :style="{ animationDelay: (question.num1 + question.num2 + i) * 0.05 + 's' }"
                >
                  {{ question.icon }}
                </span>
              </div>
            </template>
            <span class="item-count">{{ question.answer }}</span>
          </div>
        </div>
        <div v-else class="answer-slot answer-after-equals">
          <span class="question-mark">?</span>
        </div>
      </div>

      <!-- 提示文字 -->
      <p class="hint-text">{{ question.hint }}</p>
    </div>

    <!-- 换一题按钮 -->
    <button class="refresh-btn" @click="handleRefresh" title="换一题">
      🔄 换一题
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  showReplay: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['replay', 'refresh'])

// 将图标分组，每列最多 5 个，超过 10 个时显示省略号
const splitIntoColumns = (count, maxPerColumn = 5, maxDisplay = 10) => {
  // 如果数量超过 maxDisplay，只显示前 5 个和后 5 个，中间加省略号
  if (count > maxDisplay) {
    const columns = []
    
    // 前半部分：固定显示前 5 个
    for (let i = 0; i < 5; i += maxPerColumn) {
      const columnCount = Math.min(5 - i, maxPerColumn)
      columns.push({
        start: i + 1,
        count: columnCount,
        items: Array.from({ length: columnCount }, (_, j) => i + j + 1),
        type: 'normal'
      })
    }
    
    // 添加省略号列
    columns.push({
      start: 0,
      count: 1,
      items: ['ellipsis'],
      type: 'ellipsis'
    })
    
    // 后半部分：固定显示最后 5 个
    const last5Start = count - 5
    for (let i = 0; i < 5; i += maxPerColumn) {
      const columnCount = Math.min(5 - i, maxPerColumn)
      const actualNum = last5Start + i + 1
      columns.push({
        start: actualNum,
        count: columnCount,
        items: Array.from({ length: columnCount }, (_, j) => last5Start + i + j + 1),
        type: 'normal'
      })
    }
    
    return columns
  }
  
  // 不超过 maxDisplay，正常显示
  const columns = []
  for (let i = 0; i < count; i += maxPerColumn) {
    const columnCount = Math.min(count - i, maxPerColumn)
    columns.push({
      start: i + 1,
      count: columnCount,
      items: Array.from({ length: columnCount }, (_, j) => i + j + 1),
      type: 'normal'
    })
  }
  return columns
}

// 计算第一个数的列
const num1Columns = computed(() => {
  if (props.question.blankPosition === 'num1') return []
  return splitIntoColumns(props.question.num1)
})

// 计算第二个数的列
const num2Columns = computed(() => {
  if (props.question.blankPosition === 'num2') return []
  return splitIntoColumns(props.question.num2)
})

// 计算答案的列
const answerColumns = computed(() => {
  if (props.question.type !== 'fill-blank') return []
  return splitIntoColumns(props.question.answer)
})

const handleReplay = () => {
  emit('replay')
}

const handleRefresh = () => {
  emit('refresh')
}
</script>

<style scoped>
.math-question {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* 猫头鹰博士向导区域 */
.owl-guide {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #FFF9E6 0%, #FFE6F0 100%);
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.owl-avatar {
  font-size: 56px;
  flex-shrink: 0;
  animation: owlBlink 3s ease-in-out infinite;
}

@keyframes owlBlink {
  0%, 45%, 55%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.1);
  }
}

.owl-bubble {
  flex: 1;
  position: relative;
}

.question-text {
  font-size: 20px;
  line-height: 1.6;
  color: #333;
  margin: 0 0 12px 0;
  font-weight: 500;
}

.replay-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #4ECDC4;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(78, 205, 196, 0.3);
}

.replay-btn:hover {
  background: #45B7AA;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(78, 205, 196, 0.4);
}

/* 图案化题目展示区 */
.question-display {
  background: white;
  border-radius: 20px;
  padding: 30px 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.formula-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.icon-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 120px;
}

/* 多列图标容器 */
.icon-columns {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin-bottom: 4px;
}

/* 单列图标 */
.icon-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
}

/* 省略号列 */
.ellipsis-column {
  justify-content: center;
  padding: 0 1px;
  min-width: 12px;
}

.ellipsis-text {
  font-size: 28px;
  font-weight: bold;
  color: #999;
  letter-spacing: 1px;
  line-height: 1;
}

.item-icon {
  font-size: 28px;
  animation: iconPopIn 0.4s ease backwards;
  line-height: 1;
}

.item-count {
  font-size: 18px;
  font-weight: bold;
  color: #666;
  background: #F5F5F5;
  padding: 4px 12px;
  border-radius: 12px;
  margin-top: 4px;
  text-align: center;
}

@keyframes iconPopIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.blank-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
  border: 3px dashed #4CAF50;
  border-radius: 16px;
}

.question-mark {
  font-size: 48px;
  font-weight: bold;
  color: #FF9800;
  animation: questionPulse 1.5s ease-in-out infinite;
}

@keyframes questionPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.equals {
  font-size: 40px;
  font-weight: bold;
  color: #FF6B9D;
  margin: 0 30px;
}

.operator {
  font-size: 40px;
  font-weight: bold;
  color: #FF6B9D;
  margin: 0 10px;
}

.answer-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 120px;
  background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%);
  border: 4px solid #FF9800;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(255, 152, 0, 0.2);
}

.hint-text {
  text-align: center;
  font-size: 16px;
  color: #888;
  margin: 0;
  font-style: italic;
}

/* 换一题按钮 */
.refresh-btn {
  display: block;
  margin: 20px auto 0;
  padding: 10px 24px;
  background: transparent;
  border: 2px solid #4ECDC4;
  color: #4ECDC4;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.refresh-btn:hover {
  background: #4ECDC4;
  color: white;
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 520px) {
  .owl-guide {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .owl-avatar {
    font-size: 48px;
  }

  .question-text {
    font-size: 18px;
  }

  .formula-container {
    gap: 12px;
  }

  .item-icon {
    font-size: 24px;
  }

  .item-count {
    font-size: 14px;
  }

  .blank-slot,
.answer-slot {
  width: 80px;
  height: 80px;
}

/* 等号后的区域增加左边距 */
.answer-after-equals {
  margin-left: 20px;
}

  .operator, .equals {
    font-size: 32px;
  }

  .question-mark {
    font-size: 36px;
  }
  
  .ellipsis-text {
    font-size: 20px;
    letter-spacing: 1px;
  }
}
</style>
