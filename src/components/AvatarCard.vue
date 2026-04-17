<template>
  <div class="avatar-card" :class="{ selected: isSelected }">
    <div class="avatar-image">
      <img v-if="avatar.image" :src="avatar.image" :alt="avatar.name" />
      <span v-else class="avatar-emoji">{{ avatar.emoji }}</span>
    </div>
    <h3 class="avatar-name">{{ avatar.name }}</h3>
    <p class="avatar-desc">{{ avatar.description }}</p>
    <button class="select-btn" @click="$emit('select', avatar)">
      选择Ta
    </button>
  </div>
</template>

<script setup>
defineProps({
  avatar: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select'])
</script>

<style scoped>
.avatar-card {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: bounceIn 0.5s ease both;
}

.avatar-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
}

.avatar-card.selected {
  border: 3px solid #FF6B9D;
  box-shadow: 0 8px 24px rgba(255, 107, 157, 0.25);
}

.avatar-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFF5E6, #FFE6F0);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-emoji {
  font-size: 48px;
  line-height: 1;
}

.avatar-name {
  font-size: 22px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.avatar-desc {
  font-size: 15px;
  color: #888;
  margin: 0;
  text-align: center;
}

.select-btn {
  min-height: 44px;
  padding: 10px 32px;
  background: #FF6B9D;
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
}

.select-btn:hover {
  background: #ff5585;
  transform: scale(1.05);
}

.select-btn:active {
  transform: scale(0.97);
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.7);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
