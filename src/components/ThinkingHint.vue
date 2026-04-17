<template>
  <div class="thinking-hint" :class="type">
    <div class="hint-header">
      <span class="hint-icon">{{ type === 'addition' ? '💡' : '🔍' }}</span>
      <span class="hint-title">{{ title }}</span>
    </div>
    
    <div class="hint-content">
      <!-- 10-50 题目专用方法 -->
      <div v-if="isLargeNumber" class="large-number-methods">
        <!-- 加法：凑十法 -->
        <div v-if="type === 'addition'" class="method-card make-ten">
          <div class="method-header">
            <span class="method-icon">🎯</span>
            <span class="method-title">方法一：凑十法</span>
          </div>
          <div class="method-steps">
            <div class="step-title">口诀：看大数，分小数，凑成 10，加剩数</div>
            <div class="step-diagram make-ten-diagram">
              <!-- 第一行：原题目（大数在前） -->
              <div class="diagram-row top-row">
                <span class="number large">{{ largerNum }}</span>
                <span class="operator">+</span>
                <span class="number large">{{ smallerNum }}</span>
                <span class="equals">=</span>
                <span class="result large">{{ answer }}</span>
              </div>
              
              <!-- 分解线和箭头 -->
              <div class="decomposition-container">
                <div class="decomposition-lines">
                  <!-- 从大数下方的分解线（表示需要凑整） -->
                  <svg class="decomposition-line line-larger" viewBox="0 0 120 160" preserveAspectRatio="none">
                    <line x1="110" y1="0" x2="120" y2="150" />
                  </svg>
                  <!-- 从小数拆分出两条线 -->
                  <svg class="decomposition-line line-split" viewBox="0 0 100 60" preserveAspectRatio="none">
                    <line x1="35" y1="0" x2="25" y2="50" />
                    <line x1="35" y1="0" x2="50" y2="50" />
                  </svg>
                </div>
                <div class="decomposition-numbers">
                  <span class="number make-ten-result">{{ madeTen }}</span>
                  <div class="split-numbers">
                    <span class="split-part need-part">{{ needToMakeTen }}</span>
                    <span class="split-part remaining-part">{{ splitFromSmaller }}</span>
                  </div>
                </div>
              </div>
              
              <!-- 第二行：凑十后的计算 -->
              <div class="diagram-row bottom-row">
                <span class="number highlight">{{ madeTen }}</span>
                <span class="operator">+</span>
                <span class="number highlight">{{ splitFromSmaller }}</span>
                <span class="equals">=</span>
                <span class="result">{{ answer }}</span>
              </div>
            </div>
            <div class="step-explanation">
              想：把（{{ smallerNum }}）分成（{{ needToMakeTen }}）和（{{ splitFromSmaller }}），（{{ largerNum }}）和（{{ needToMakeTen }}）凑成{{ madeTen }}，{{ madeTen }}加（{{ splitFromSmaller }}）等于（{{ answer }}）。
            </div>
          </div>
        </div>

        <!-- 减法：直接相减或借十法 -->
        <div v-else-if="type === 'subtraction'" class="method-card borrow-ten">
          <div class="method-header">
            <span class="method-icon">📖</span>
            <span class="method-title">{{ getSubtractionMethodTitle() }}</span>
          </div>
          <div class="method-steps">
            <div class="step-title">{{ getSubtractionMnemonic() }}</div>
            
            <!-- 20 以内减法：使用特殊逻辑 -->
            <div v-if="isWithin20" class="step-diagram within-20-method">
              <!-- 个位够减：直接相减 -->
              <div v-if="!needBorrowTen" class="direct-subtract-section">
                <div class="diagram-row">
                  <span class="number">{{ num1 }}</span>
                  <span class="operator">−</span>
                  <span class="number">{{ num2 }}</span>
                  <span class="equals">=</span>
                  <span class="result">{{ answer }}</span>
                </div>
                <div class="step-diagram direct-subtract">
                  <div class="diagram-row middle">
                    <span class="number tens-digit">{{ num1Tens }}</span>
                    <span class="operator">−</span>
                    <span class="number tens-digit">{{ num2Tens }}</span>
                    <span class="equals">=</span>
                    <span class="result">{{ tensDiff }}</span>
                    <span class="hint-text">（十位，表示{{ tensDiff }}个十）</span>
                  </div>
                  <div class="diagram-row middle">
                    <span class="number ones-digit">{{ num1Ones }}</span>
                    <span class="operator">−</span>
                    <span class="number ones-digit">{{ num2Ones }}</span>
                    <span class="equals">=</span>
                    <span class="result">{{ onesDiff }}</span>
                    <span class="hint-text">（个位，表示{{ onesDiff }}个一）</span>
                  </div>
                  <div class="diagram-row final">
                    <span class="number highlight">{{ tensDiff }}0</span>
                    <span class="operator">+</span>
                    <span class="number highlight">{{ onesDiff }}</span>
                    <span class="equals">=</span>
                    <span class="result">{{ answer }}</span>
                  </div>
                </div>
                <div class="step-explanation">
                  十位：{{ num1Tens }} − {{ num2Tens }} = {{ tensDiff }}（表示{{ tensDiff }}个十，就是{{ tensDiff }}0），个位：{{ num1Ones }} − {{ num2Ones }} = {{ onesDiff }}（表示{{ onesDiff }}个一），{{ tensDiff }}0 + {{ onesDiff }} = {{ answer }}
                </div>
              </div>
              
              <!-- 个位不够减：借十法 -->
              <div v-else class="borrow-ten-section">
                <div class="diagram-row">
                  <span class="number">{{ num1 }}</span>
                  <span class="operator">−</span>
                  <span class="number">{{ num2 }}</span>
                  <span class="equals">=</span>
                  <span class="result">{{ answer }}</span>
                </div>
                <div class="step-diagram borrow-method">
                  <div class="diagram-row middle explanation-text">
                    <span>把 {{ num1 }} 拆成 {{ splitOnes }} 和 10</span>
                  </div>
                  <div class="decomposition-visual">
                    <div class="split-visual">
                      <span class="split-number">{{ splitOnes }}</span>
                      <span class="split-operator">+</span>
                      <span class="split-number highlight">10</span>
                    </div>
                  </div>
                  <div class="diagram-row middle">
                    <span class="number highlight">10</span>
                    <span class="operator">−</span>
                    <span class="number">{{ num2 }}</span>
                    <span class="equals">=</span>
                    <span class="result">{{ tenMinusNum2 }}</span>
                  </div>
                  <div class="diagram-row final">
                    <span class="number highlight">{{ splitOnes }}</span>
                    <span class="operator">+</span>
                    <span class="number highlight">{{ tenMinusNum2 }}</span>
                    <span class="equals">=</span>
                    <span class="result">{{ answer }}</span>
                  </div>
                </div>
                <div class="step-explanation">
                  把 {{ num1 }} 拆成 {{ splitOnes }} 和 10，先用 10 − {{ num2 }} = {{ tenMinusNum2 }}，再用 {{ splitOnes }} + {{ tenMinusNum2 }} = {{ answer }}
                </div>
              </div>
            </div>
            
            <!-- 20 以上减法：使用原来的借十法逻辑 -->
            <div v-else>
              <!-- 个位够减：直接相减法 -->
              <div v-if="!needBorrowTen" class="step-diagram">
                <div class="diagram-row">
                  <span class="number">{{ num1 }}</span>
                  <span class="operator">−</span>
                  <span class="number">{{ num2 }}</span>
                  <span class="equals">=</span>
                  <span class="result">{{ answer }}</span>
                </div>
                <div class="step-diagram direct-subtract">
                  <div class="diagram-row middle">
                    <span class="number tens-digit">{{ num1Tens }}</span>
                    <span class="operator">−</span>
                    <span class="number tens-digit">{{ num2Tens }}</span>
                    <span class="equals">=</span>
                    <span class="result">{{ tensDiff }}</span>
                    <span class="hint-text">（十位，表示{{ tensDiff }}个十）</span>
                  </div>
                  <div class="diagram-row middle">
                    <span class="number ones-digit">{{ num1Ones }}</span>
                    <span class="operator">−</span>
                    <span class="number ones-digit">{{ num2Ones }}</span>
                    <span class="equals">=</span>
                    <span class="result">{{ onesDiff }}</span>
                    <span class="hint-text">（个位，表示{{ onesDiff }}个一）</span>
                  </div>
                  <div class="diagram-row final">
                    <span class="number highlight">{{ tensDiff }}0</span>
                    <span class="operator">+</span>
                    <span class="number highlight">{{ onesDiff }}</span>
                    <span class="equals">=</span>
                    <span class="result">{{ answer }}</span>
                  </div>
                </div>
                <div class="step-explanation">
                  十位：{{ num1Tens }} − {{ num2Tens }} = {{ tensDiff }}（表示{{ tensDiff }}个十，就是{{ tensDiff }}0），个位：{{ num1Ones }} − {{ num2Ones }} = {{ onesDiff }}（表示{{ onesDiff }}个一），{{ tensDiff }}0 + {{ onesDiff }} = {{ answer }}
                </div>
              </div>
              
              <!-- 个位不够减：借十法 -->
              <div v-else class="step-diagram">
                <div class="diagram-row">
                  <span class="number">{{ num1 }}</span>
                  <span class="operator">−</span>
                  <span class="number">{{ num2 }}</span>
                  <span class="equals">=</span>
                  <span class="result">{{ answer }}</span>
                </div>
                <div class="step-diagram borrow-method">
                  <div class="diagram-row middle">
                    <span class="number">从 {{ num1 }} 的十位借 1 给个位</span>
                  </div>
                  <div class="diagram-arrows">
                    <div class="arrow-split-sub">
                      <span class="split-part">{{ num1TensMinus1 }}0</span>
                      <span class="split-part highlight">{{ onesWithBorrow }}</span>
                    </div>
                  </div>
                  <div class="diagram-row middle">
                    <span class="number ones-digit">{{ onesWithBorrow }}</span>
                    <span class="operator">−</span>
                    <span class="number ones-digit">{{ num2Ones }}</span>
                    <span class="equals">=</span>
                    <span class="result">{{ onesDiff }}</span>
                    <span class="hint-text">（个位相减）</span>
                  </div>
                  <div class="diagram-row middle">
                    <span class="number tens-digit">{{ num1TensMinus1 }}</span>
                    <span class="operator">−</span>
                    <span class="number tens-digit">{{ num2Tens }}</span>
                    <span class="equals">=</span>
                    <span class="result">{{ tensDiff }}</span>
                    <span class="hint-text">（十位相减，表示{{ tensDiff }}个十）</span>
                  </div>
                  <div class="diagram-row final">
                    <span class="number highlight">{{ tensDiff }}0</span>
                    <span class="operator">+</span>
                    <span class="number highlight">{{ onesDiff }}</span>
                    <span class="equals">=</span>
                    <span class="result">{{ answer }}</span>
                  </div>
                </div>
                <div class="step-explanation">
                  从 {{ num1 }} 的十位借 1 给个位，变成 {{ num1TensMinus1 }}0 和 {{ onesWithBorrow }}，个位 {{ onesWithBorrow }} − {{ num2Ones }} = {{ onesDiff }}，十位 {{ num1TensMinus1 }} − {{ num2Tens }} = {{ tensDiff }}（表示{{ tensDiff }}个十），最后 {{ tensDiff }}0 + {{ onesDiff }} = {{ answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 10 以内题目：显示原来的提示 -->
      <template v-else>
        <!-- 互逆思维提示 -->
        <div v-if="showInverse" class="hint-section inverse">
          <div class="section-title">
            <span class="icon">🔄</span>
            <span>互逆思维 - 反过来想一想</span>
          </div>
          <div class="section-content">
            <p>{{ inverseText }}</p>
            <div class="formula-display">{{ inverseFormula }}</div>
          </div>
        </div>

        <!-- 凑整思维提示 -->
        <div v-if="showMakingWhole" class="hint-section making-whole">
          <div class="section-title">
            <span class="icon">🎯</span>
            <span>凑整思维 - 凑成整数更简单</span>
          </div>
          <div class="section-content">
            <p>{{ makingWholeText }}</p>
            <div class="formula-display">{{ makingWholeFormula }}</div>
          </div>
        </div>

        <!-- 数与量的对应 -->
        <div v-if="showQuantity" class="hint-section quantity">
          <div class="section-title">
            <span class="icon">🍎</span>
            <span>数与量 - 数一数就知道</span>
          </div>
          <div class="section-content">
            <p>{{ quantityText }}</p>
            <div class="quantity-display">
              <span 
                v-for="i in quantityNumber" 
                :key="i" 
                class="quantity-icon"
                :style="{ animationDelay: i * 0.1 + 's' }"
              >
                {{ icon }}
              </span>
            </div>
          </div>
        </div>

        <!-- 转化思维提示 -->
        <div v-if="showTransformation" class="hint-section transformation">
          <div class="section-title">
            <span class="icon">✨</span>
            <span>转化思维 - 变个方法更容易</span>
          </div>
          <div class="section-content">
            <p>{{ transformationText }}</p>
            <div class="formula-display">{{ transformationFormula }}</div>
          </div>
        </div>
      </template>
    </div>
    
    <button class="hint-close-btn" @click="handleClose">
      我知道了，再试一次
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true, // 'addition' | 'subtraction' | 'fill-blank'
  },
  num1: {
    type: Number,
    required: true
  },
  num2: {
    type: Number,
    required: true
  },
  answer: {
    type: Number,
    required: true
  },
  userAnswer: {
    type: Number,
    required: true
  },
  blankPosition: {
    type: String,
    default: null // 'num1' | 'num2' | null
  },
  icon: {
    type: String,
    default: '🌰'
  },
  onClose: {
    type: Function,
    required: true
  }
})

// 计算属性 - 互逆思维
const showInverse = computed(() => true) // 总是显示

const inverseText = computed(() => {
  if (props.type === 'addition') {
    return `加法可以用减法来检查哦！`
  } else if (props.type === 'subtraction') {
    return `减法可以用加法来检查哦！`
  } else {
    return `想一想，这个空应该填什么呢？`
  }
})

const inverseFormula = computed(() => {
  if (props.type === 'addition') {
    // 加法题：num1 + num2 = answer，互逆验证：answer - num2 = num1
    return `${props.answer} - ${props.num2} = ${props.num1}`
  } else if (props.type === 'subtraction') {
    // 减法题：num1 - num2 = answer，互逆验证：answer + num2 = num1
    return `${props.answer} + ${props.num2} = ${props.num1}`
  } else {
    // 填空题：如果是 num1 未知，显示 answer - num2 = ?
    if (props.blankPosition === 'num1') {
      return `${props.answer} - ${props.num2} = ?`
    } else {
      return `${props.answer} - ${props.num1} = ?`
    }
  }
})

// 计算属性 - 凑整思维（针对加法）
const showMakingWhole = computed(() => props.type === 'addition' && (props.num1 >= 5 || props.num2 >= 5))

const makingWholeText = computed(() => {
  if (props.num1 === 9 || props.num2 === 9) {
    return `看到 9，想到 1，凑成 10 好计算！`
  } else if (props.num1 === 8 || props.num2 === 8) {
    return `看到 8，想到 2，凑成 10 好计算！`
  } else {
    return `试试凑成 10，计算会更简单！`
  }
})

const makingWholeFormula = computed(() => {
  if (props.num1 === 9) {
    const diff = 10 - props.num2
    return `9 + ${props.num2} = 9 + ${diff} + ${props.num2 - diff} = 10 + ${props.num2 - diff} = ${props.answer}`
  } else if (props.num2 === 9) {
    const diff = 10 - props.num1
    return `${props.num1} + 9 = ${props.num1 - diff} + 9 + ${diff} = ${props.num1 - diff} + 10 = ${props.answer}`
  } else {
    return `${props.num1} + ${props.num2} = ${props.answer}`
  }
})

// 计算属性 - 数与量的对应（仅用于 10 以内题目）
const showQuantity = computed(() => {
  // 10-50 的题目不显示数一数的提示
  return props.num1 < 10 && props.num2 < 10 && props.answer < 10
})

const quantityText = computed(() => {
  if (props.type === 'addition') {
    return `数一数，合起来一共有多少个？`
  } else if (props.type === 'subtraction') {
    return `数一数，还剩下多少个？`
  } else {
    return `数一数，想一想吧！`
  }
})

const quantityNumber = computed(() => {
  if (props.type === 'addition') {
    return props.answer
  } else if (props.type === 'subtraction') {
    return props.num1 // 被减数
  } else {
    return props.answer
  }
})

// 计算属性 - 转化思维（针对减法）
const showTransformation = computed(() => props.type === 'subtraction')

const transformationText = computed(() => {
  return `减法可以想成"缺多少"，或者用加法来验证！`
})

const transformationFormula = computed(() => {
  return `${props.answer} + ${props.num2} = ${props.num1}`
})

// 判断是否是大数字题目（10-50 范围）
const isLargeNumber = computed(() => {
  return props.num1 >= 10 || props.num2 >= 10 || props.answer >= 10
})

const title = computed(() => {
  if (isLargeNumber.value) {
    if (props.type === 'addition') {
      return '凑十法 - 加法小窍门'
    } else {
      return '借十法 - 减法小窍门'
    }
  }
  if (props.type === 'addition') {
    return '加法小窍门'
  } else if (props.type === 'subtraction') {
    return '减法小窍门'
  } else {
    return '填空小窍门'
  }
})

// 10-50 加法的凑十法计算
// 找出大数和小数
const largerNum = computed(() => {
  if (props.type !== 'addition') return 0
  return Math.max(props.num1, props.num2)
})

const smallerNum = computed(() => {
  if (props.type !== 'addition') return 0
  return Math.min(props.num1, props.num2)
})

// 大数凑成下一个整十数需要多少
const needToMakeTen = computed(() => {
  if (props.type !== 'addition') return 0
  const ten = Math.ceil(largerNum.value / 10) * 10
  return ten - largerNum.value
})

// 从小数中分出 needToMakeTen，剩下的部分
const splitFromSmaller = computed(() => {
  if (props.type !== 'addition') return 0
  return smallerNum.value - needToMakeTen.value
})

// 凑成的整十数
const madeTen = computed(() => {
  if (props.type !== 'addition') return 0
  return Math.ceil(largerNum.value / 10) * 10
})

// 10-50 减法的计算逻辑
// 判断是否需要借位（个位不够减）
const needBorrowTen = computed(() => {
  if (props.type !== 'subtraction') return false
  const num1Ones = props.num1 % 10
  const num2Ones = props.num2 % 10
  return num1Ones < num2Ones
})

// 判断是否是 20 以内的减法
const isWithin20 = computed(() => {
  if (props.type !== 'subtraction') return false
  return props.num1 < 20
})

// 获取十位和个位
const num1Tens = computed(() => {
  if (props.type !== 'subtraction') return 0
  return Math.floor(props.num1 / 10)
})

const num2Tens = computed(() => {
  if (props.type !== 'subtraction') return 0
  return Math.floor(props.num2 / 10)
})

const num1Ones = computed(() => {
  if (props.type !== 'subtraction') return 0
  return props.num1 % 10
})

const num2Ones = computed(() => {
  if (props.type !== 'subtraction') return 0
  return props.num2 % 10
})

// 十位差和个位差（20 以内且个位够减时使用）
const tensDiff = computed(() => {
  if (props.type !== 'subtraction') return 0
  if (needBorrowTen.value) {
    return num1Tens.value - 1 - num2Tens.value
  } else {
    return num1Tens.value - num2Tens.value
  }
})

const onesDiff = computed(() => {
  if (props.type !== 'subtraction') return 0
  if (needBorrowTen.value) {
    return (num1Ones.value + 10) - num2Ones.value
  } else {
    return num1Ones.value - num2Ones.value
  }
})

// 借位相关
const num1TensMinus1 = computed(() => {
  if (props.type !== 'subtraction') return 0
  return num1Tens.value - 1
})

const onesWithBorrow = computed(() => {
  if (props.type !== 'subtraction' || !needBorrowTen.value) return 0
  return num1Ones.value + 10
})

// 20 以内减法的拆分逻辑（借十法）
// 将大数拆分成 10 和个位数
const splitTen = computed(() => {
  if (props.type !== 'subtraction' || !isWithin20.value) return 10
  return 10
})

const splitOnes = computed(() => {
  if (props.type !== 'subtraction' || !isWithin20.value) return 0
  return props.num1 - 10
})

// 10 减去减数
const tenMinusNum2 = computed(() => {
  if (props.type !== 'subtraction' || !isWithin20.value) return 0
  return 10 - props.num2
})

// 最终结果：10-减数的结果 + 个位数
const finalResult = computed(() => {
  if (props.type !== 'subtraction' || !isWithin20.value) return 0
  return tenMinusNum2.value + splitOnes.value
})

// 获取减法方法标题
const getSubtractionMethodTitle = () => {
  if (!isWithin20.value) {
    return needBorrowTen.value ? '借十法' : '直接相减法'
  } else {
    if (needBorrowTen.value) {
      return '借十法 - 拆分更容易'
    } else {
      return '直接相减 - 十位个位分别减'
    }
  }
}

// 获取减法口诀
const getSubtractionMnemonic = () => {
  if (!isWithin20.value) {
    return needBorrowTen.value ? '口诀：个位不够减，十位借 1 当 10，10 减小数，加剩数' : '口诀：十位减十位，个位减个位，合起来就是答案'
  } else {
    if (needBorrowTen.value) {
      return '口诀：拆大数，分成 10 和个位，10 减小数，加剩数'
    } else {
      return '口诀：十位减十位，个位减个位，合起来就是答案'
    }
  }
}

const handleClose = () => {
  props.onClose()
}
</script>

<style scoped>
.thinking-hint {
  max-width: 700px;
  margin: 20px auto;
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border: 3px solid #4ECDC4;
  animation: hintSlideIn 0.4s ease-out;
}

@keyframes hintSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hint-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #F0F0F0;
}

.hint-icon {
  font-size: 32px;
}

.hint-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.hint-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hint-section {
  padding: 16px;
  border-radius: 12px;
  background: #F9F9F9;
}

.hint-section.inverse {
  background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
  border-left: 4px solid #2196F3;
}

.hint-section.making-whole {
  background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%);
  border-left: 4px solid #FF9800;
}

.hint-section.quantity {
  background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
  border-left: 4px solid #4CAF50;
}

.hint-section.transformation {
  background: linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%);
  border-left: 4px solid #9C27B0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.section-title .icon {
  font-size: 20px;
}

.section-content p {
  font-size: 15px;
  color: #555;
  margin: 0 0 12px 0;
  line-height: 1.6;
}

.formula-display {
  font-size: 20px;
  font-weight: bold;
  color: #FF6B9D;
  background: white;
  padding: 12px 16px;
  border-radius: 8px;
  text-align: center;
  font-family: 'Courier New', monospace;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.quantity-display {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  padding: 12px;
  background: white;
  border-radius: 8px;
}

.quantity-icon {
  font-size: 28px;
  animation: quantityPopIn 0.4s ease-out backwards;
}

@keyframes quantityPopIn {
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.hint-close-btn {
  display: block;
  width: 100%;
  margin-top: 20px;
  padding: 14px;
  background: linear-gradient(135deg, #4ECDC4 0%, #45B7AA 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(78, 205, 196, 0.3);
}

.hint-close-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(78, 205, 196, 0.4);
}

.hint-close-btn:active {
  transform: translateY(0);
}

/* 10-50 题目专用方法样式 */
.large-number-methods {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.method-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 3px solid;
}

.method-card.make-ten {
  border-color: #FF9800;
  background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%);
}

.method-card.borrow-ten {
  border-color: #4CAF50;
  background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
}

.method-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}

.method-icon {
  font-size: 28px;
}

.method-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.method-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.step-title {
  font-size: 15px;
  font-weight: bold;
  color: #FF6B9D;
  background: white;
  padding: 10px 14px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.step-diagram {
  background: white;
  padding: 24px 24px 16px 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.step-diagram.within-20-method {
  background: #E8F5E9;
  border: 2px solid #4CAF50;
}

.direct-subtract-section,
.borrow-ten-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.decomposition-visual {
  margin: 8px 0;
  padding: 12px;
  background: #F5F5F5;
  border-radius: 8px;
}

.split-visual {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: bold;
}

.split-number {
  padding: 6px 12px;
  background: white;
  border-radius: 6px;
  min-width: 30px;
  text-align: center;
}

.split-number.highlight {
  background: #FFEB3B;
  color: #F57F17;
}

.split-operator {
  color: #999;
}

.explanation-text {
  font-size: 16px !important;
  color: #666 !important;
  background: #FFF3E0 !important;
  padding: 8px 16px !important;
  border-radius: 8px !important;
}

.step-diagram.direct-subtract,
.step-diagram.borrow-method {
  background: #F9F9F9;
  padding: 16px;
  border-radius: 8px;
  margin-top: 8px;
  width: 100%;
}

.hint-text {
  font-size: 12px;
  color: #999;
  margin-left: 4px;
}

.tens-digit {
  background: #E3F2FD;
  color: #1976D2;
  padding: 6px 10px;
  border-radius: 6px;
  font-weight: bold;
}

.ones-digit {
  background: #FFF9C4;
  color: #F57F17;
  padding: 6px 10px;
  border-radius: 6px;
  font-weight: bold;
}

.diagram-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: bold;
  font-family: 'Courier New', monospace;
}

.diagram-row.top-row {
  margin-bottom: 4px;
  gap: 16px;
}

.diagram-row.bottom-row {
  margin-top: 8px;
  padding-top: 12px;
  border-top: 2px dashed #DDD;
  gap: 16px;
}

.diagram-row.final {
  padding-top: 12px;
  border-top: 2px dashed #DDD;
}

.diagram-row.middle {
  font-size: 20px;
  color: #666;
}

.number {
  padding: 8px 12px;
  background: #F5F5F5;
  border-radius: 8px;
  min-width: 30px;
  text-align: center;
  position: relative;
}

.number.large {
  font-size: 32px;
  padding: 10px 14px;
  min-width: 60px;
}

.number.highlight {
  background: #FFEB3B;
  color: #F57F17;
}

.number.make-ten-result {
  background: #FFEB3B;
  color: #F57F17;
  font-size: 28px;
  padding: 10px 14px;
  margin-bottom: 8px;
  min-width: 60px;
}

.operator {
  color: #999;
}

.equals {
  color: #999;
}

.result {
  color: #4CAF50;
  font-weight: bold;
}

.diagram-arrows {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
}

.arrow-left {
  width: 30px;
  height: 2px;
  background: #999;
  position: relative;
}

.arrow-left::before {
  content: '←';
  position: absolute;
  left: -5px;
  top: -10px;
  font-size: 16px;
  color: #999;
}

.arrow-split {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.arrow-split::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 15px;
  background: #999;
}

.arrow-split::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 0;
  width: 2px;
  height: 15px;
  background: #999;
  transform: rotate(30deg);
  transform-origin: top;
}

.arrow-split-sub {
  display: flex;
  gap: 16px;
  position: relative;
}

.arrow-split-sub::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: #999;
}

/* 分解线容器 */
.decomposition-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  width: 100%;
  margin-top: 4px;
}

.decomposition-lines {
  position: relative;
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  gap: 0;
}

.connection-line {
  position: absolute;
  stroke: #999;
  stroke-width: 2;
  fill: none;
}

.decomposition-line {
  position: absolute;
  stroke: #999;
  stroke-width: 2;
  fill: none;
}

.line-larger {
  left: 0%;
  width: 40%;
  height: 55px;
}

.line-split {
  left: 40%;
  width: 40%;
  height: 60px;
}

.decomposition-numbers {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-start;
  margin-top: 8px;
  padding-left: 0%;
}

.split-numbers {
  display: flex;
  gap: 8px;
  align-items: center;
}

.split-part {
  font-size: 18px;
  font-weight: bold;
  padding: 10px 12px;
  border-radius: 6px;
  text-align: center;
  position: relative;
}

.split-part.need-part {
  background: #fee507ff;
  color: #F57F17;
}

.split-part.remaining-part {
  background: #E3F2FD;
  color: #1976D2;
}

.split-part.highlight {
  background: #FFEB3B;
  color: #F57F17;
}

.step-explanation {
  font-size: 15px;
  color: #555;
  background: white;
  padding: 14px;
  border-radius: 8px;
  line-height: 1.6;
  border-left: 4px solid #FF9800;
}

.method-divider {
  text-align: center;
  font-size: 14px;
  color: #888;
  padding: 10px;
  background: #F5F5F5;
  border-radius: 8px;
  margin: 10px 0;
}

/* 响应式设计 */
@media (max-width: 520px) {
  .thinking-hint {
    padding: 20px 16px;
  }

  .hint-title {
    font-size: 18px;
  }

  .formula-display {
    font-size: 16px;
    padding: 10px 12px;
  }

  .quantity-icon {
    font-size: 24px;
  }

  .method-card {
    padding: 16px;
  }

  .method-title {
    font-size: 16px;
  }

  .step-title {
    font-size: 13px;
  }

  .diagram-row {
    font-size: 18px;
    gap: 8px;
  }

  .diagram-row.top-row,
  .diagram-row.bottom-row,
  .diagram-row.final,
  .diagram-row.middle {
    font-size: 16px;
    gap: 10px;
  }

  .number {
    padding: 6px 8px;
    min-width: 24px;
  }

  .number.large {
    font-size: 24px;
    padding: 8px 10px;
    min-width: 50px;
  }

  .number.make-ten-result {
    font-size: 20px;
    padding: 8px 10px;
    min-width: 50px;
  }

  .step-explanation {
    font-size: 13px;
    padding: 10px;
  }

  .split-part {
    font-size: 14px;
    padding: 4px 8px;
  }

  .split-part.need-part {
    font-size: 14px;
  }

  .split-part.remaining-part {
    font-size: 14px;
  }

  .decomposition-lines {
    height: 50px;
  }

  .line-larger {
    height: 45px;
  }

  .line-split {
    height: 50px;
  }

  .decomposition-numbers {
    padding-left: 0%;
    gap: 10px;
  }

  .split-numbers {
    gap: 6px;
  }
}
</style>
