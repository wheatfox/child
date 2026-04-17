<template>
  <div class="home">
    <div class="home-container">
      <header class="header">
        <h1 class="title">🌲 幼儿数学英语森林 🌲</h1>
        <div class="avatar-wrapper" @click="goToAvatarSelect" title="点击更换形象">
          <!-- 自定义上传的图片 -->
          <img
            v-if="avatarData && avatarData.type === 'custom' && avatarData.image"
            :src="avatarData.image"
            :alt="avatarData.name"
            class="avatar-img"
          />
          <!-- 预设形象的 emoji -->
          <span v-else-if="avatarData && avatarData.emoji" class="avatar-emoji">
            {{ avatarData.emoji }}
          </span>
          <!-- 默认头像 -->
          <span v-else class="avatar-placeholder">👶</span>
        </div>
      </header>

      <main class="nav-grid">
        <button
          v-for="(item, index) in navItems"
          :key="item.id"
          class="nav-card"
          :class="{ disabled: item.disabled }"
          :style="{ backgroundColor: item.bgColor, animationDelay: `${index * 0.1}s` }"
          @click="handleNavClick(item)"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-title">{{ item.title }}</span>
          <span class="nav-desc">{{ item.desc }}</span>
        </button>
      </main>

      <footer class="footer">
        <div class="stars-display" v-if="starsCount !== null">
          ⭐ {{ starsCount }} 颗星星
        </div>
        <button class="music-btn" @click="toggleMusic" :title="isMuted ? '开启音乐' : '关闭音乐'">
          {{ isMuted ? '🔇' : '🔊' }}
        </button>
      </footer>
    </div>

    <div v-if="showComingSoon" class="coming-soon-modal" @click.self="showComingSoon = false">
      <div class="modal-content">
        <span class="modal-icon">🚧</span>
        <p>即将上线</p>
        <p class="modal-sub">敬请期待哦~</p>
        <button @click="showComingSoon = false">知道了</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAvatar } from '../composables/useAvatar'

const router = useRouter()
const { getAvatar } = useAvatar()

const avatarData = ref(null)
const starsCount = ref(null)
const isMuted = ref(true)
const showComingSoon = ref(false)

const navItems = [
  {
    id: 'math',
    icon: '🌲',
    title: '数学森林大冒险',
    desc: '去挑战有趣的数学题吧！',
    bgColor: '#95E1D3',
    route: '/math/scenes',
    disabled: false
  },
  {
    id: 'english',
    icon: '🗣️',
    title: '奇妙英语角',
    desc: '学习英语单词吧！',
    bgColor: '#B3E5FC',
    route: '/english/topics',
    disabled: false
  },
  {
    id: 'rewards',
    icon: '🎁',
    title: '我的奖励乐园',
    desc: '查看你收集的奖励',
    bgColor: '#FFE66D',
    route: '/rewards',
    disabled: false
  },
  {
    id: 'parent',
    icon: '👨‍👩‍👧',
    title: '爸爸妈妈中心',
    desc: '家长专用',
    bgColor: '#4ECDC4',
    route: '/parent/verify',
    disabled: false
  }
]

onMounted(() => {
  avatarData.value = getAvatar()
  const stored = localStorage.getItem('totalStars')
  if (stored !== null) {
    starsCount.value = parseInt(stored, 10)
  } else {
    starsCount.value = 0
  }
})

function goToAvatarSelect() {
  // 添加 reset 参数，清除之前的选择
  router.push('/avatar-select?reset=true')
}

function handleNavClick(item) {
  if (item.disabled) {
    showComingSoon.value = true
    return
  }
  if (item.route) {
    router.push(item.route)
  }
}

function toggleMusic() {
  isMuted.value = !isMuted.value
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(180deg, #E8F5E9 0%, #FFF9C4 50%, #FFE0E6 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.home-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.title {
  font-size: clamp(22px, 5vw, 36px);
  font-weight: 900;
  background: linear-gradient(135deg, #2E7D32, #F9A825, #E91E63);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: 2px;
}

.avatar-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.avatar-wrapper:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-emoji {
  font-size: 32px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-placeholder {
  font-size: 28px;
  line-height: 1;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 600px;
  padding: 0 10px;
}

.nav-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 160px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 20px 16px;
  position: relative;
  overflow: hidden;
}

.nav-card:not(.disabled):hover {
  transform: scale(1.05);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.18);
}

.nav-card:not(.disabled):active {
  transform: scale(0.97);
  transition-duration: 0.08s;
}

.nav-card.disabled {
  cursor: not-allowed;
  opacity: 0.65;
  filter: grayscale(0.3);
}

.nav-icon {
  font-size: 48px;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
}

.nav-title {
  font-size: 19px;
  font-weight: 800;
  color: #333;
  text-align: center;
  line-height: 1.3;
}

.nav-desc {
  font-size: 13px;
  color: #666;
  text-align: center;
  line-height: 1.3;
}

.footer {
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.stars-display {
  font-size: 17px;
  font-weight: 700;
  color: #F9A825;
  text-shadow: 0 1px 3px rgba(249, 168, 37, 0.3);
}

.music-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: #fff;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.music-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}

.coming-soon-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: fadeIn 0.2s ease both;
}

.modal-content {
  background: #fff;
  border-radius: 24px;
  padding: 40px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.modal-icon {
  font-size: 56px;
  line-height: 1;
}

.modal-content > p:first-of-type {
  font-size: 22px;
  font-weight: 800;
  color: #333;
  margin: 4px 0 0;
}

.modal-sub {
  font-size: 15px;
  color: #888;
  margin: 0 0 8px;
}

.modal-content button {
  margin-top: 8px;
  padding: 10px 32px;
  background: linear-gradient(135deg, #95E1D3, #4ECDC4);
  color: #fff;
  border: none;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.modal-content button:hover {
  transform: scale(1.05);
  opacity: 0.92;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}

@media (max-width: 520px) {
  .nav-grid {
    grid-template-columns: 1fr;
    max-width: 340px;
  }

  .nav-card {
    min-height: 120px;
    flex-direction: row;
    gap: 16px;
    padding: 20px 24px;
  }

  .nav-icon {
    font-size: 40px;
  }

  .nav-text-group {
    text-align: left;
  }

  .title {
    font-size: 18px;
  }

  .avatar-wrapper {
    width: 46px;
    height: 46px;
  }
}
</style>
