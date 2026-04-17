<template>
  <div class="avatar-select">
    <div class="header">
      <h1 class="title">🌟 选择你的学习伙伴 🌟</h1>
      <p class="subtitle">Ta会陪伴你一起学习英语哦</p>
    </div>

    <div class="avatar-list">
      <AvatarCard
        v-for="(avatar, index) in presetAvatars"
        :key="avatar.id"
        :avatar="avatar"
        :is-selected="selectedId === avatar.id"
        :style="{ animationDelay: `${index * 0.1}s` }"
        @select="handleSelect"
      />
    </div>

    <div class="upload-section">
      <button class="upload-btn" @click="triggerUpload">
        📷 上传自己的图片
      </button>
      <input
        ref="fileInput"
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        style="display: none"
        @change="handleFileChange"
      />

      <div v-if="previewImage" class="preview-area">
        <div class="preview-image">
          <img :src="previewImage" alt="预览" />
        </div>
        <button class="confirm-btn" @click="confirmCustomAvatar">
          ✅ 就选这个
        </button>
        <button class="cancel-btn" @click="cancelUpload">
          ❌ 重新选择
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AvatarCard from '../components/AvatarCard.vue'
import { useAvatar } from '../composables/useAvatar'

const router = useRouter()
const { saveAvatar } = useAvatar()

const selectedId = ref(null)
const fileInput = ref(null)
const previewImage = ref(null)

const presetAvatars = [
  {
    id: 'superhero',
    name: '闪光超人',
    description: '勇敢的英雄形象',
    emoji: '🦸‍♂️',
    type: 'preset'
  },
  {
    id: 'dog',
    name: '汪汪狗',
    description: '忠诚的小狗形象',
    emoji: '🐶',
    type: 'preset'
  },
  {
    id: 'cow',
    name: '哞牛',
    description: '可爱的小牛形象',
    emoji: '🐮',
    type: 'preset'
  },
  {
    id: 'bear',
    name: '嘟嘟熊',
    description: '憨厚的熊形象',
    emoji: '🧸',
    type: 'preset'
  }
]

function handleSelect(avatar) {
  selectedId.value = avatar.id
  saveAvatar(avatar)
  router.push('/home')
}

function triggerUpload() {
  fileInput.value?.click()
}

function handleFileChange(e) {
  const file = e.target.files?.[0]
  if (!file) return

  if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
    alert('请选择 JPG 或 PNG 格式的图片')
    return
  }

  const reader = new FileReader()
  reader.onload = (event) => {
    previewImage.value = event.target.result
  }
  reader.readAsDataURL(file)
}

function confirmCustomAvatar() {
  const customAvatar = {
    id: 'custom',
    name: '我的小伙伴',
    description: '我自己上传的形象',
    image: previewImage.value,
    type: 'custom'
  }
  saveAvatar(customAvatar)
  router.push('/home')
}

function cancelUpload() {
  previewImage.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<style scoped>
.avatar-select {
  min-height: 100vh;
  background: linear-gradient(180deg, #FFF5E6, #FFE6F0);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  box-sizing: border-box;
}

.header {
  text-align: center;
  margin-bottom: 32px;
}

.title {
  font-size: 28px;
  font-weight: 800;
  color: #333;
  margin: 0 0 8px 0;
}

.subtitle {
  font-size: 17px;
  color: #888;
  margin: 0;
}

.avatar-list {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.upload-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.upload-btn {
  min-height: 44px;
  padding: 12px 28px;
  background: #fff;
  color: #FF6B9D;
  border: 2px dashed #FF6B9D;
  border-radius: 24px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.upload-btn:hover {
  background: #FFF0F5;
  transform: scale(1.03);
}

.preview-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  animation: bounceIn 0.4s ease both;
}

.preview-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #FF6B9D;
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.2);
}

.preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.confirm-btn {
  min-height: 44px;
  padding: 10px 28px;
  background: #FF6B9D;
  color: #fff;
  border: none;
  border-radius: 22px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
}

.confirm-btn:hover {
  background: #ff5585;
  transform: scale(1.05);
}

.cancel-btn {
  min-height: 36px;
  padding: 8px 20px;
  background: transparent;
  color: #999;
  border: 1px solid #ddd;
  border-radius: 18px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  color: #666;
  border-color: #bbb;
}
</style>
