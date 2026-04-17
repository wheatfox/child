<template>
  <div class="scene-select">
    <div class="scene-container">
      <header class="header">
        <button class="back-btn" @click="goBack">
          <span class="back-arrow">←</span>
          返回首页
        </button>
        <div class="title-area">
          <h1 class="title">🌲 数学森林大冒险 🌲</h1>
          <p class="subtitle">选择一个场景开始挑战吧！</p>
        </div>
      </header>

      <main class="scene-list">
        <div
          v-for="(scene, index) in scenes"
          :key="scene.id"
          class="scene-card"
          :style="{ backgroundColor: scene.bgColor, animationDelay: `${index * 0.15}s` }"
          @click="goToScene(scene)"
        >
          <div class="card-icon">{{ scene.icon }}</div>
          <div class="card-info">
            <div class="card-header">
              <span class="card-name">{{ scene.name }}</span>
              <span class="card-type">{{ scene.type }}</span>
            </div>
            <p class="card-desc">{{ scene.desc }}</p>
            <div class="card-footer">
              <span class="difficulty" :class="'diff-' + scene.diffLevel">
                {{ scene.difficulty }}
              </span>
              <button class="start-btn" @click.stop="goToScene(scene)">
                开始挑战 →
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer class="footer">
        <div class="stars-hint" v-if="starsCount !== null">
          你已有 ⭐ {{ starsCount }} 颗智慧星星
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const starsCount = ref(null)

const scenes = [
  {
    id: 'addition',
    icon: '🐿️',
    name: '小松鼠摘松果',
    type: '加法练习',
    desc: '帮助小松鼠数松果，学习加法运算',
    difficulty: '⭐ 简单',
    diffLevel: 'easy',
    bgColor: '#FFE0B2',
    route: '/math/quiz/addition'
  },
  {
    id: 'subtraction',
    icon: '🦆',
    name: '池塘里的小鸭子',
    type: '减法练习',
    desc: '数一数小鸭子，学习减法运算',
    difficulty: '⭐⭐ 中等',
    diffLevel: 'medium',
    bgColor: '#B3E5FC',
    route: '/math/quiz/subtraction'
  },
  {
    id: 'fill-blank',
    icon: '🐻',
    name: '小熊的蜂蜜罐',
    type: '填空加法',
    desc: '帮小熊填满蜂蜜罐，挑战逆向思维',
    difficulty: '⭐⭐⭐ 挑战',
    diffLevel: 'hard',
    bgColor: '#FFF9C4',
    route: '/math/quiz/fill-blank'
  }
]

onMounted(() => {
  const stored = localStorage.getItem('totalStars')
  if (stored !== null) {
    starsCount.value = parseInt(stored, 10)
  } else {
    starsCount.value = 0
  }
})

function goBack() {
  router.push('/home')
}

function goToScene(scene) {
  router.push(scene.route)
}
</script>

<style scoped>
.scene-select {
  min-height: 100vh;
  background: linear-gradient(180deg, #E8F5E9 0%, #C8E6C9 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.scene-container {
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 0;
  top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.85);
  color: #2E7D32;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.back-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.14);
}

.back-arrow {
  font-size: 18px;
  line-height: 1;
}

.title-area {
  text-align: center;
  margin-top: 36px;
}

.title {
  font-size: clamp(24px, 6vw, 34px);
  font-weight: 900;
  color: #2E7D32;
  margin: 0;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px rgba(46, 125, 50, 0.15);
}

.subtitle {
  font-size: clamp(15px, 3.5vw, 18px);
  color: #558B2F;
  margin: 8px 0 0;
  font-weight: 600;
}

.scene-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 8px 0;
}

.scene-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 28px;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  animation: cardFadeIn 0.5s ease both;
  border: 2px solid transparent;
}

.scene-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.6);
}

.scene-card:active {
  transform: translateY(-2px) scale(0.98);
  transition-duration: 0.1s;
}

.card-icon {
  font-size: 64px;
  line-height: 1;
  flex-shrink: 0;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.12));
}

.card-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.card-name {
  font-size: 21px;
  font-weight: 800;
  color: #333;
}

.card-type {
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  background: rgba(0, 0, 0, 0.18);
  padding: 3px 12px;
  border-radius: 12px;
}

.card-desc {
  font-size: 15px;
  color: #555;
  margin: 0;
  line-height: 1.5;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.difficulty {
  font-size: 14px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 12px;
}

.diff-easy {
  background: rgba(255, 152, 0, 0.2);
  color: #E65100;
}

.diff-medium {
  background: rgba(33, 150, 243, 0.2);
  color: #0D47A1;
}

.diff-hard {
  background: rgba(255, 193, 7, 0.3);
  color: #F57F17;
}

.start-btn {
  padding: 10px 22px;
  background: #FF6B9D;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  box-shadow: 0 3px 10px rgba(255, 107, 157, 0.35);
}

.start-btn:hover {
  transform: scale(1.06);
  box-shadow: 0 5px 18px rgba(255, 107, 157, 0.45);
  opacity: 0.95;
}

.start-btn:active {
  transform: scale(0.96);
  transition-duration: 0.1s;
}

.footer {
  width: 100%;
  text-align: center;
  padding: 8px 0 4px;
}

.stars-hint {
  font-size: 17px;
  font-weight: 700;
  color: #F9A825;
  text-shadow: 0 1px 4px rgba(249, 168, 37, 0.3);
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 520px) {
  .scene-container {
    max-width: 100%;
    gap: 16px;
  }

  .header {
    padding-top: 4px;
  }

  .back-btn {
    position: static;
    align-self: flex-start;
    padding: 6px 14px;
    font-size: 14px;
  }

  .title-area {
    margin-top: 12px;
  }

  .title {
    font-size: 22px;
  }

  .subtitle {
    font-size: 14px;
  }

  .scene-card {
    flex-direction: column;
    text-align: center;
    padding: 20px 20px 24px;
    gap: 12px;
  }

  .card-icon {
    font-size: 56px;
  }

  .card-header {
    justify-content: center;
  }

  .card-name {
    font-size: 19px;
  }

  .card-desc {
    font-size: 14px;
  }

  .card-footer {
    flex-direction: column;
    gap: 10px;
  }

  .start-btn {
    width: 100%;
    max-width: 220px;
    padding: 12px 20px;
    font-size: 16px;
  }

  .stars-hint {
    font-size: 15px;
  }
}
</style>
