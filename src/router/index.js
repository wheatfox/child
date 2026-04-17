import { createRouter, createWebHashHistory } from 'vue-router'
import AvatarSelect from '../views/AvatarSelect.vue'
import Home from '../views/Home.vue'
import SceneSelect from '../views/math/SceneSelect.vue'
import QuizPage from '../views/math/QuizPage.vue'
import Rewards from '../views/Rewards.vue'
import Verify from '../views/parent/Verify.vue'
import Dashboard from '../views/parent/Dashboard.vue'
import EnglishTopicSelect from '../views/english/TopicSelect.vue'
import EnglishLearn from '../views/english/LearnPage.vue'
import EnglishQuiz from '../views/english/QuizPage.vue'
import ConversationLearn from '../views/english/ConversationLearn.vue'
import PetSelect from '../views/pet/PetSelect.vue'
import PetFeeding from '../views/pet/PetFeeding.vue'

const routes = [
  {
    path: '/',
    redirect: '/avatar-select'
  },
  {
    path: '/avatar-select',
    name: 'AvatarSelect',
    component: AvatarSelect
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/math/scenes',
    name: 'SceneSelect',
    component: SceneSelect
  },
  {
    path: '/math/quiz/:sceneId',
    name: 'QuizPage',
    component: QuizPage,
    props: true
  },
  {
    path: '/rewards',
    name: 'Rewards',
    component: Rewards
  },
  {
    path: '/parent/verify',
    name: 'ParentVerify',
    component: Verify
  },
  {
    path: '/parent/dashboard',
    name: 'ParentDashboard',
    component: Dashboard
  },
  {
    path: '/english/topics',
    name: 'EnglishTopicSelect',
    component: EnglishTopicSelect
  },
  {
    path: '/english/learn/:topicId',
    name: 'EnglishLearn',
    component: EnglishLearn,
    props: true
  },
  {
    path: '/english/quiz/:topicId',
    name: 'EnglishQuiz',
    component: EnglishQuiz,
    props: true
  },
  {
    path: '/english/conversations',
    name: 'ConversationLearn',
    component: ConversationLearn
  },
  {
    path: '/pet/select',
    name: 'PetSelect',
    component: PetSelect
  },
  {
    path: '/pet/feed',
    name: 'PetFeeding',
    component: PetFeeding
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 使用 hash 模式，支持任意子目录部署
  routes
})

router.beforeEach((to, from, next) => {
  const selectedAvatar = localStorage.getItem('selectedAvatar')
  
  // 如果有 reset=true 参数，清除形象选择并显示选择页面
  if (to.query.reset === 'true') {
    localStorage.removeItem('selectedAvatar')
    if (to.path !== '/avatar-select') {
      next('/avatar-select')
      return
    }
  }

  if (to.path !== '/avatar-select' && !selectedAvatar) {
    next('/avatar-select')
  } else if (to.path === '/avatar-select' && selectedAvatar) {
    next('/home')
  } else {
    next()
  }
})

export default router
