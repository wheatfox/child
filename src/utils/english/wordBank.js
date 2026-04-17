/**
 * 奇妙英语角 - 单词库
 * 包含 4 个主题，每个主题 40 个单词/短语
 * 面向零基础 5 岁幼儿
 * 
 * 自定义导入指南：
 * 1. 图片导入：
 *    - 在 word 对象中添加 image 字段
 *    - 格式：image: '/images/words/dog.png'
 *    - 图片文件放在 public/images/words/ 目录下
 *    - 支持格式：PNG, JPG, SVG
 * 
 * 2. 语音导入：
 *    - 在 word 对象中添加 audioUrl 字段
 *    - 格式：audioUrl: '/audio/words/dog.mp3'
 *    - 音频文件放在 public/audio/words/ 目录下
 *    - 支持格式：MP3, WAV, OGG
 *    - 系统会优先使用真人发音，没有则使用浏览器语音合成
 * 
 * 3. 批量导入示例：
 *    { 
 *      id: 'dog', 
 *      word: 'dog', 
 *      translation: '小狗', 
 *      emoji: '🐶', 
 *      topic: 'animals', 
 *      phonetic: '/dɔːɡ/',
 *      image: '/images/words/dog.png',      // 自定义图片
 *      audioUrl: '/audio/words/dog.mp3'     // 自定义语音
 *    }
 */

export const ENGLISH_TOPICS = {
  basic: {
    id: 'basic',
    name: '基础认知',
    icon: '🎨',
    color: '#FFE0B2',
    description: '学习颜色、数字和形状',
    type: 'word' // 单词学习
  },
  animals: {
    id: 'animals',
    name: '动物世界',
    icon: '🦁',
    color: '#C8E6C9',
    description: '认识各种可爱的动物',
    type: 'word'
  },
  daily: {
    id: 'daily',
    name: '日常生活',
    icon: '🏠',
    color: '#B3E5FC',
    description: '学习日常生活中的英语',
    type: 'word'
  },
  phrases: {
    id: 'phrases',
    name: '常用短语',
    icon: '💬',
    color: '#E1BEE7',
    description: '学习简单的英语短语',
    type: 'phrase' // 短语学习
  },
  conversations: {
    id: 'conversations',
    name: '常用对话',
    icon: '🗣️',
    color: '#FFCCBC',
    description: '学习实用的英语对话场景',
    type: 'conversation' // 对话学习
  }
}

export const ENGLISH_WORDS = {
  // ========== 基础认知（40 词） ==========
  basic: [
    // 颜色（10 词）
    { id: 'red', word: 'red', translation: '红色', emoji: '🔴', topic: 'basic', phonetic: '/red/' },
    { id: 'blue', word: 'blue', translation: '蓝色', emoji: '🔵', topic: 'basic', phonetic: '/bluː/' },
    { id: 'green', word: 'green', translation: '绿色', emoji: '🟢', topic: 'basic', phonetic: '/ɡriːn/' },
    { id: 'yellow', word: 'yellow', translation: '黄色', emoji: '🟡', topic: 'basic', phonetic: '/ˈjel.o/' },
    { id: 'orange', word: 'orange', translation: '橙色', emoji: '🟠', topic: 'basic', phonetic: '/ˈɔːr.ɪndʒ/' },
    { id: 'purple', word: 'purple', translation: '紫色', emoji: '🟣', topic: 'basic', phonetic: '/ˈpɜːr.pəl/' },
    { id: 'pink', word: 'pink', translation: '粉色', emoji: '🩷', topic: 'basic', phonetic: '/pɪŋk/' },
    { id: 'black', word: 'black', translation: '黑色', emoji: '⚫', topic: 'basic', phonetic: '/blæk/' },
    { id: 'white', word: 'white', translation: '白色', emoji: '⚪', topic: 'basic', phonetic: '/waɪt/' },
    { id: 'brown', word: 'brown', translation: '棕色', emoji: '🟤', topic: 'basic', phonetic: '/braʊn/' },
    
    // 数字（10 词）
    { id: 'one', word: 'one', translation: '一', emoji: '1️⃣', topic: 'basic', phonetic: '/wʌn/' },
    { id: 'two', word: 'two', translation: '二', emoji: '2️⃣', topic: 'basic', phonetic: '/tuː/' },
    { id: 'three', word: 'three', translation: '三', emoji: '3️⃣', topic: 'basic', phonetic: '/θriː/' },
    { id: 'four', word: 'four', translation: '四', emoji: '4️⃣', topic: 'basic', phonetic: '/fɔːr/' },
    { id: 'five', word: 'five', translation: '五', emoji: '5️⃣', topic: 'basic', phonetic: '/faɪv/' },
    { id: 'six', word: 'six', translation: '六', emoji: '6️⃣', topic: 'basic', phonetic: '/sɪks/' },
    { id: 'seven', word: 'seven', translation: '七', emoji: '7️⃣', topic: 'basic', phonetic: '/ˈsev.ən/' },
    { id: 'eight', word: 'eight', translation: '八', emoji: '8️⃣', topic: 'basic', phonetic: '/eɪt/' },
    { id: 'nine', word: 'nine', translation: '九', emoji: '9️⃣', topic: 'basic', phonetic: '/naɪn/' },
    { id: 'ten', word: 'ten', translation: '十', emoji: '🔟', topic: 'basic', phonetic: '/ten/' },
    
    // 形状（10 词）
    { id: 'circle', word: 'circle', translation: '圆形', emoji: '⭕', topic: 'basic', phonetic: '/ˈsɜːr.kəl/' },
    { id: 'square', word: 'square', translation: '正方形', emoji: '◼️', topic: 'basic', phonetic: '/skwer/' },
    { id: 'triangle', word: 'triangle', translation: '三角形', emoji: '🔺', topic: 'basic', phonetic: '/ˈtraɪ.æŋ.ɡəl/' },
    { id: 'star', word: 'star', translation: '星星', emoji: '⭐', topic: 'basic', phonetic: '/stɑːr/' },
    { id: 'heart', word: 'heart', translation: '心形', emoji: '❤️', topic: 'basic', phonetic: '/hɑːrt/' },
    { id: 'diamond', word: 'diamond', translation: '菱形', emoji: '💎', topic: 'basic', phonetic: '/ˈdaɪə.mənd/' },
    { id: 'oval', word: 'oval', translation: '椭圆形', emoji: '🥚', topic: 'basic', phonetic: '/ˈoʊ.vəl/' },
    { id: 'rectangle', word: 'rectangle', translation: '长方形', emoji: '▭', topic: 'basic', phonetic: '/ˈrek.tæŋ.ɡəl/' },
    { id: 'crescent', word: 'crescent', translation: '月牙形', emoji: '🌙', topic: 'basic', phonetic: '/ˈkres.ənt/' },
    { id: 'arrow', word: 'arrow', translation: '箭头形', emoji: '➡️', topic: 'basic', phonetic: '/ˈær.oʊ/' },
    
    // 基础概念（10 词）
    { id: 'big', word: 'big', translation: '大的', emoji: '🐘', topic: 'basic', phonetic: '/bɪɡ/' },
    { id: 'small', word: 'small', translation: '小的', emoji: '🐜', topic: 'basic', phonetic: '/smɔːl/' },
    { id: 'up', word: 'up', translation: '向上', emoji: '⬆️', topic: 'basic', phonetic: '/ʌp/' },
    { id: 'down', word: 'down', translation: '向下', emoji: '⬇️', topic: 'basic', phonetic: '/daʊn/' },
    { id: 'happy', word: 'happy', translation: '开心', emoji: '😊', topic: 'basic', phonetic: '/ˈhæp.i/' },
    { id: 'sad', word: 'sad', translation: '难过', emoji: '😢', topic: 'basic', phonetic: '/sæd/' },
    { id: 'hot', word: 'hot', translation: '热的', emoji: '🔥', topic: 'basic', phonetic: '/hɑːt/' },
    { id: 'cold', word: 'cold', translation: '冷的', emoji: '🧊', topic: 'basic', phonetic: '/koʊld/' },
    { id: 'fast', word: 'fast', translation: '快的', emoji: '🚀', topic: 'basic', phonetic: '/fæst/' },
    { id: 'slow', word: 'slow', translation: '慢的', emoji: '🐌', topic: 'basic', phonetic: '/sloʊ/' }
  ],
  
  // ========== 动物世界（40 词） ==========
  animals: [
    // 常见动物（10 词）
    { id: 'dog', word: 'dog', translation: '小狗', emoji: '🐶', topic: 'animals', phonetic: '/dɔːɡ/', image: '/images/words/dog.png', audioUrl: '/audio/words/dog.mp3' },
    { id: 'cat', word: 'cat', translation: '小猫', emoji: '🐱', topic: 'animals', phonetic: '/kæt/', image: '/images/words/cat.png', audioUrl: '/audio/words/cat.mp3' },
    { id: 'bird', word: 'bird', translation: '小鸟', emoji: '🐦', topic: 'animals', phonetic: '/bɜːrd/' },
    { id: 'fish', word: 'fish', translation: '小鱼', emoji: '🐟', topic: 'animals', phonetic: '/fɪʃ/' },
    { id: 'rabbit', word: 'rabbit', translation: '小兔', emoji: '🐰', topic: 'animals', phonetic: '/ˈræb.ɪt/' },
    { id: 'turtle', word: 'turtle', translation: '乌龟', emoji: '🐢', topic: 'animals', phonetic: '/ˈtɜːr.təl/' },
    { id: 'butterfly', word: 'butterfly', translation: '蝴蝶', emoji: '🦋', topic: 'animals', phonetic: '/ˈbʌt..flaɪ/' },
    { id: 'bee', word: 'bee', translation: '蜜蜂', emoji: '🐝', topic: 'animals', phonetic: '/biː/' },
    { id: 'ant', word: 'ant', translation: '蚂蚁', emoji: '🐜', topic: 'animals', phonetic: '/ænt/' },
    { id: 'ladybug', word: 'ladybug', translation: '瓢虫', emoji: '🐞', topic: 'animals', phonetic: '/ˈleɪ.di.bʌɡ/' },
    
    // 农场动物（8 词）
    { id: 'cow', word: 'cow', translation: '奶牛', emoji: '🐮', topic: 'animals', phonetic: '/kaʊ/' },
    { id: 'pig', word: 'pig', translation: '小猪', emoji: '🐷', topic: 'animals', phonetic: '/pɪɡ/' },
    { id: 'sheep', word: 'sheep', translation: '绵羊', emoji: '🐑', topic: 'animals', phonetic: '/ʃiːp/' },
    { id: 'horse', word: 'horse', translation: '小马', emoji: '🐴', topic: 'animals', phonetic: '/hɔːrs/' },
    { id: 'duck', word: 'duck', translation: '小鸭', emoji: '🦆', topic: 'animals', phonetic: '/dʌk/' },
    { id: 'chicken', word: 'chicken', translation: '小鸡', emoji: '🐔', topic: 'animals', phonetic: '/ˈtʃɪk.ɪn/' },
    { id: 'rooster', word: 'rooster', translation: '公鸡', emoji: '🐓', topic: 'animals', phonetic: '/ˈruː.stɚ/' },
    { id: 'goat', word: 'goat', translation: '山羊', emoji: '🐐', topic: 'animals', phonetic: '/ɡoʊt/' },
    
    // 野生动物（12 词）
    { id: 'elephant', word: 'elephant', translation: '大象', emoji: '🐘', topic: 'animals', phonetic: '/ˈel.ɪ.fənt/' },
    { id: 'lion', word: 'lion', translation: '狮子', emoji: '🦁', topic: 'animals', phonetic: '/ˈlaɪ.ən/' },
    { id: 'tiger', word: 'tiger', translation: '老虎', emoji: '🐯', topic: 'animals', phonetic: '/ˈtaɪ.ɡɚ/' },
    { id: 'monkey', word: 'monkey', translation: '猴子', emoji: '🐵', topic: 'animals', phonetic: '/ˈmʌŋ.ki/' },
    { id: 'panda', word: 'panda', translation: '熊猫', emoji: '🐼', topic: 'animals', phonetic: '/ˈpæn.də/' },
    { id: 'zebra', word: 'zebra', translation: '斑马', emoji: '🦓', topic: 'animals', phonetic: '/ˈziː.brə/' },
    { id: 'giraffe', word: 'giraffe', translation: '长颈鹿', emoji: '🦒', topic: 'animals', phonetic: '/dʒəˈræf/' },
    { id: 'hippo', word: 'hippo', translation: '河马', emoji: '🦛', topic: 'animals', phonetic: '/ˈhɪp.oʊ/' },
    { id: 'kangaroo', word: 'kangaroo', translation: '袋鼠', emoji: '🦘', topic: 'animals', phonetic: '/ˌkæŋ.ɡəˈruː/' },
    { id: 'penguin', word: 'penguin', translation: '企鹅', emoji: '🐧', topic: 'animals', phonetic: '/ˈpeŋ.ɡwɪn/' },
    { id: 'koala', word: 'koala', translation: '考拉', emoji: '🐨', topic: 'animals', phonetic: '/koʊˈɑː.lə/' },
    { id: 'hedgehog', word: 'hedgehog', translation: '刺猬', emoji: '🦔', topic: 'animals', phonetic: '/ˈhedʒ.hɔːɡ/' },
    
    // 其他动物（10 词）
    { id: 'bear', word: 'bear', translation: '熊', emoji: '🐻', topic: 'animals', phonetic: '/ber/' },
    { id: 'wolf', word: 'wolf', translation: '狼', emoji: '🐺', topic: 'animals', phonetic: '/wʊlf/' },
    { id: 'fox', word: 'fox', translation: '狐狸', emoji: '🦊', topic: 'animals', phonetic: '/fɑːks/' },
    { id: 'mouse', word: 'mouse', translation: '老鼠', emoji: '🐭', topic: 'animals', phonetic: '/maʊs/' },
    { id: 'frog', word: 'frog', translation: '青蛙', emoji: '🐸', topic: 'animals', phonetic: '/frɔːɡ/' },
    { id: 'snake', word: 'snake', translation: '蛇', emoji: '🐍', topic: 'animals', phonetic: '/sneɪk/' },
    { id: 'octopus', word: 'octopus', translation: '章鱼', emoji: '🐙', topic: 'animals', phonetic: '/ˈɑːk.tə.pəs/' },
    { id: 'crab', word: 'crab', translation: '螃蟹', emoji: '🦀', topic: 'animals', phonetic: '/kræb/' },
    { id: 'shark', word: 'shark', translation: '鲨鱼', emoji: '🦈', topic: 'animals', phonetic: '/ʃɑːrk/' },
    { id: 'whale', word: 'whale', translation: '鲸鱼', emoji: '🐋', topic: 'animals', phonetic: '/weɪl/' }
  ],
  
  // ========== 日常生活（40 词） ==========
  daily: [
    // 家庭成员（10 词）
    { id: 'mom', word: 'mom', translation: '妈妈', emoji: '👩', topic: 'daily', phonetic: '/mɑːm/' },
    { id: 'dad', word: 'dad', translation: '爸爸', emoji: '👨', topic: 'daily', phonetic: '/dæd/' },
    { id: 'baby', word: 'baby', translation: '宝宝', emoji: '👶', topic: 'daily', phonetic: '/ˈbeɪ.bi/' },
    { id: 'sister', word: 'sister', translation: '姐妹', emoji: '👧', topic: 'daily', phonetic: '/ˈsɪs.tɚ/' },
    { id: 'brother', word: 'brother', translation: '兄弟', emoji: '👦', topic: 'daily', phonetic: '/ˈbrʌð.ɚ/' },
    { id: 'grandma', word: 'grandma', translation: '奶奶/外婆', emoji: '👵', topic: 'daily', phonetic: '/ˈɡræn.mɑː/' },
    { id: 'grandpa', word: 'grandpa', translation: '爷爷/外公', emoji: '👴', topic: 'daily', phonetic: '/ˈɡræn.pɑː/' },
    { id: 'uncle', word: 'uncle', translation: '叔叔/舅舅', emoji: '🧔', topic: 'daily', phonetic: '/ˈʌŋ.kəl/' },
    { id: 'aunt', word: 'aunt', translation: '阿姨/姑姑', emoji: '👩‍🦰', topic: 'daily', phonetic: '/ænt/' },
    { id: 'cousin', word: 'cousin', translation: '表兄弟姐妹', emoji: '🧒', topic: 'daily', phonetic: '/ˈkʌz.ən/' },
    
    // 身体部位（10 词）
    { id: 'eye', word: 'eye', translation: '眼睛', emoji: '👁️', topic: 'daily', phonetic: '/aɪ/' },
    { id: 'nose', word: 'nose', translation: '鼻子', emoji: '👃', topic: 'daily', phonetic: '/noʊz/' },
    { id: 'mouth', word: 'mouth', translation: '嘴巴', emoji: '👄', topic: 'daily', phonetic: '/maʊθ/' },
    { id: 'ear', word: 'ear', translation: '耳朵', emoji: '👂', topic: 'daily', phonetic: '/ɪr/' },
    { id: 'hand', word: 'hand', translation: '手', emoji: '✋', topic: 'daily', phonetic: '/hænd/' },
    { id: 'foot', word: 'foot', translation: '脚', emoji: '🦶', topic: 'daily', phonetic: '/fʊt/' },
    { id: 'leg', word: 'leg', translation: '腿', emoji: '🦵', topic: 'daily', phonetic: '/leɡ/' },
    { id: 'arm', word: 'arm', translation: '手臂', emoji: '💪', topic: 'daily', phonetic: '/ɑːrm/' },
    { id: 'head', word: 'head', translation: '头', emoji: '🗣️', topic: 'daily', phonetic: '/hed/' },
    { id: 'hair', word: 'hair', translation: '头发', emoji: '💇', topic: 'daily', phonetic: '/her/' },
    
    // 衣物（10 词）
    { id: 'shirt', word: 'shirt', translation: '衬衫', emoji: '👕', topic: 'daily', phonetic: '/ʃɜːrt/' },
    { id: 'shoes', word: 'shoes', translation: '鞋子', emoji: '👟', topic: 'daily', phonetic: '/ʃuːz/' },
    { id: 'hat', word: 'hat', translation: '帽子', emoji: '🧢', topic: 'daily', phonetic: '/hæt/' },
    { id: 'dress', word: 'dress', translation: '连衣裙', emoji: '👗', topic: 'daily', phonetic: '/dres/' },
    { id: 'socks', word: 'socks', translation: '袜子', emoji: '🧦', topic: 'daily', phonetic: '/sɑːks/' },
    { id: 'pants', word: 'pants', translation: '裤子', emoji: '👖', topic: 'daily', phonetic: '/pænts/' },
    { id: 'coat', word: 'coat', translation: '外套', emoji: '🧥', topic: 'daily', phonetic: '/koʊt/' },
    { id: 'scarf', word: 'scarf', translation: '围巾', emoji: '🧣', topic: 'daily', phonetic: '/skɑːrf/' },
    { id: 'gloves', word: 'gloves', translation: '手套', emoji: '🧤', topic: 'daily', phonetic: '/ɡlʌvz/' },
    { id: 'backpack', word: 'backpack', translation: '书包', emoji: '🎒', topic: 'daily', phonetic: '/ˈbæk.pæk/' },
    
    // 日常物品（10 词）
    { id: 'book', word: 'book', translation: '书', emoji: '📕', topic: 'daily', phonetic: '/bʊk/' },
    { id: 'pen', word: 'pen', translation: '钢笔', emoji: '🖊️', topic: 'daily', phonetic: '/pen/' },
    { id: 'cup', word: 'cup', translation: '杯子', emoji: '☕', topic: 'daily', phonetic: '/kʌp/' },
    { id: 'ball', word: 'ball', translation: '球', emoji: '⚽', topic: 'daily', phonetic: '/bɔːl/' },
    { id: 'bed', word: 'bed', translation: '床', emoji: '🛏️', topic: 'daily', phonetic: '/bed/' },
    { id: 'chair', word: 'chair', translation: '椅子', emoji: '🪑', topic: 'daily', phonetic: '/tʃer/' },
    { id: 'table', word: 'table', translation: '桌子', emoji: '🪑', topic: 'daily', phonetic: '/ˈteɪ.bəl/' },
    { id: 'clock', word: 'clock', translation: '钟表', emoji: '⏰', topic: 'daily', phonetic: '/klɑːk/' },
    { id: 'phone', word: 'phone', translation: '电话', emoji: '📱', topic: 'daily', phonetic: '/foʊn/' },
    { id: 'key', word: 'key', translation: '钥匙', emoji: '🔑', topic: 'daily', phonetic: '/kiː/' }
  ],
  
  // ========== 常用短语（40 条） ==========
  phrases: [
    // 问候语（10 条）
    { id: 'hello', word: 'Hello!', translation: '你好！', emoji: '👋', topic: 'phrases', phonetic: '/həˈloʊ/', isPhrase: true },
    { id: 'hi', word: 'Hi!', translation: '嗨！', emoji: '🤗', topic: 'phrases', phonetic: '/haɪ/', isPhrase: true },
    { id: 'good-morning', word: 'Good morning!', translation: '早上好！', emoji: '🌅', topic: 'phrases', phonetic: '/ɡʊd ˈmɔːr.nɪŋ/', isPhrase: true },
    { id: 'good-afternoon', word: 'Good afternoon!', translation: '下午好！', emoji: '☀️', topic: 'phrases', phonetic: '/ɡʊd ˌæf.tɚnuːn/', isPhrase: true },
    { id: 'good-night', word: 'Good night!', translation: '晚安！', emoji: '🌙', topic: 'phrases', phonetic: '/ɡʊd naɪt/', isPhrase: true },
    { id: 'how-are-you', word: 'How are you?', translation: '你好吗？', emoji: '😊', topic: 'phrases', phonetic: '/haʊ ɑːr juː/', isPhrase: true },
    { id: 'im-fine', word: 'I\'m fine', translation: '我很好', emoji: '😄', topic: 'phrases', phonetic: '/aɪm faɪn/', isPhrase: true },
    { id: 'thank-you', word: 'Thank you!', translation: '谢谢你！', emoji: '🙏', topic: 'phrases', phonetic: '/θæŋk juː/', isPhrase: true },
    { id: 'nice-to-meet-you', word: 'Nice to meet you', translation: '很高兴见到你', emoji: '🤝', topic: 'phrases', phonetic: '/naɪs tu miːt juː/', isPhrase: true },
    { id: 'see-you-later', word: 'See you later', translation: '回头见', emoji: '👋', topic: 'phrases', phonetic: '/siː juː ˈleɪ.tɚ/', isPhrase: true },
    
    // 礼貌用语（10 条）
    { id: 'please', word: 'Please', translation: '请', emoji: '🤲', topic: 'phrases', phonetic: '/pliːz/', isPhrase: true },
    { id: 'sorry', word: 'Sorry', translation: '对不起', emoji: '😔', topic: 'phrases', phonetic: '/ˈsɔːr.i/', isPhrase: true },
    { id: 'excuse-me', word: 'Excuse me', translation: '打扰一下', emoji: '🙇', topic: 'phrases', phonetic: '/ɪkˈskjuːz miː/', isPhrase: true },
    { id: 'you-re-welcome', word: 'You\'re welcome', translation: '不客气', emoji: '😄', topic: 'phrases', phonetic: '/jʊr wel.kəm/', isPhrase: true },
    { id: 'no-problem', word: 'No problem', translation: '没问题', emoji: '👌', topic: 'phrases', phonetic: '/noʊ ˈprɑː.bləm/', isPhrase: true },
    { id: 'that-s-okay', word: 'That\'s okay', translation: '没关系', emoji: '🙂', topic: 'phrases', phonetic: '/ðæts oʊˈkeɪ/', isPhrase: true },
    { id: 'may-i', word: 'May I...?', translation: '我可以...吗？', emoji: '🙋', topic: 'phrases', phonetic: '/meɪ aɪ/', isPhrase: true },
    { id: 'can-you-help-me', word: 'Can you help me?', translation: '你能帮我吗？', emoji: '🤲', topic: 'phrases', phonetic: '/kæn juː help miː/', isPhrase: true },
    { id: 'bless-you', word: 'Bless you', translation: '保佑你（打喷嚏后）', emoji: '🤧', topic: 'phrases', phonetic: '/bles juː/', isPhrase: true },
    { id: 'good-job', word: 'Good job!', translation: '做得好！', emoji: '👍', topic: 'phrases', phonetic: '/ɡʊd dʒɑːb/', isPhrase: true },
    
    // 日常表达（10 条）
    { id: 'i-m-hungry', word: 'I\'m hungry', translation: '我饿了', emoji: '🍽️', topic: 'phrases', phonetic: '/aɪm ˈhʌŋ.ɡri/', isPhrase: true },
    { id: 'i-m-thirsty', word: 'I\'m thirsty', translation: '我渴了', emoji: '🥤', topic: 'phrases', phonetic: '/aɪm ˈθɜːr.sti/', isPhrase: true },
    { id: 'i-m-tired', word: 'I\'m tired', translation: '我累了', emoji: '😴', topic: 'phrases', phonetic: '/aɪm ˈtaɪɚd/', isPhrase: true },
    { id: 'i-m-happy', word: 'I\'m happy', translation: '我很开心', emoji: '😄', topic: 'phrases', phonetic: '/aɪm ˈhæp.i/', isPhrase: true },
    { id: 'i-m-sad', word: 'I\'m sad', translation: '我很难过', emoji: '😢', topic: 'phrases', phonetic: '/aɪm sæd/', isPhrase: true },
    { id: 'i-m-sick', word: 'I\'m sick', translation: '我生病了', emoji: '🤒', topic: 'phrases', phonetic: '/aɪm sɪk/', isPhrase: true },
    { id: 'i-m-cold', word: 'I\'m cold', translation: '我冷', emoji: '🥶', topic: 'phrases', phonetic: '/aɪm koʊld/', isPhrase: true },
    { id: 'i-m-hot', word: 'I\'m hot', translation: '我热', emoji: '🥵', topic: 'phrases', phonetic: '/aɪm hɑːt/', isPhrase: true },
    { id: 'i-m-scared', word: 'I\'m scared', translation: '我害怕', emoji: '😨', topic: 'phrases', phonetic: '/aɪm skerd/', isPhrase: true },
    { id: 'i-m-excited', word: 'I\'m excited', translation: '我很兴奋', emoji: '🤩', topic: 'phrases', phonetic: '/aɪm ɪkˈsaɪ.tɪd/', isPhrase: true },
    
    // 简单对话（10 条）
    { id: 'what-s-this', word: 'What\'s this?', translation: '这是什么？', emoji: '🤔', topic: 'phrases', phonetic: '/wʌts ðɪs/', isPhrase: true },
    { id: 'what-s-that', word: 'What\'s that?', translation: '那是什么？', emoji: '🤔', topic: 'phrases', phonetic: '/wʌts ðæt/', isPhrase: true },
    { id: 'i-like-it', word: 'I like it', translation: '我喜欢它', emoji: '😍', topic: 'phrases', phonetic: '/aɪ laɪk ɪt/', isPhrase: true },
    { id: 'i-don-t-like', word: 'I don\'t like', translation: '我不喜欢', emoji: '😒', topic: 'phrases', phonetic: '/aɪ doʊnt laɪk/', isPhrase: true },
    { id: 'i-want', word: 'I want', translation: '我想要', emoji: '🙋', topic: 'phrases', phonetic: '/aɪ wɑːnt/', isPhrase: true },
    { id: 'i-have', word: 'I have', translation: '我有', emoji: '📦', topic: 'phrases', phonetic: '/aɪ hæv/', isPhrase: true },
    { id: 'let-s-go', word: 'Let\'s go!', translation: '我们走吧！', emoji: '🏃', topic: 'phrases', phonetic: '/lets ɡoʊ/', isPhrase: true },
    { id: 'wait-for-me', word: 'Wait for me', translation: '等等我', emoji: '✋', topic: 'phrases', phonetic: '/weɪt fɔːr miː/', isPhrase: true },
    { id: 'come-here', word: 'Come here', translation: '过来', emoji: '👈', topic: 'phrases', phonetic: '/kʌm hɪr/', isPhrase: true },
    { id: 'look-at-this', word: 'Look at this', translation: '看这个', emoji: '👀', topic: 'phrases', phonetic: '/lʊk æt ðɪs/', isPhrase: true }
  ],
  
  // ========== 常用对话场景（40 个场景） ==========
  conversations: [
    // 场景 1：打招呼（8 个对话）
    { 
      id: 'greeting-1', 
      title: '见面问候',
      emoji: '',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Hello!', translation: '你好！' },
        { speaker: 'B', text: 'Hi! How are you?', translation: '嗨！你好吗？' },
        { speaker: 'A', text: 'I\'m fine, thank you!', translation: '我很好，谢谢你！' }
      ]
    },
    { 
      id: 'greeting-2', 
      title: '早上好',
      emoji: '🌅',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Good morning!', translation: '早上好！' },
        { speaker: 'B', text: 'Good morning! Did you sleep well?', translation: '早上好！睡得好吗？' },
        { speaker: 'A', text: 'Yes, very well!', translation: '是的，很好！' }
      ]
    },
    { 
      id: 'greeting-3', 
      title: '下午好',
      emoji: '☀️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Good afternoon!', translation: '下午好！' },
        { speaker: 'B', text: 'Good afternoon! How\'s your day?', translation: '下午好！今天过得怎么样？' },
        { speaker: 'A', text: 'It\'s great!', translation: '很棒！' }
      ]
    },
    { 
      id: 'greeting-4', 
      title: '晚上好',
      emoji: '🌆',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Good evening!', translation: '晚上好！' },
        { speaker: 'B', text: 'Good evening! Nice to see you!', translation: '晚上好！很高兴见到你！' },
        { speaker: 'A', text: 'Nice to see you too!', translation: '我也很高兴见到你！' }
      ]
    },
    { 
      id: 'greeting-5', 
      title: '道别',
      emoji: '👋',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Goodbye!', translation: '再见！' },
        { speaker: 'B', text: 'Bye! See you tomorrow!', translation: '拜拜！明天见！' },
        { speaker: 'A', text: 'See you!', translation: '再见！' }
      ]
    },
    { 
      id: 'greeting-6', 
      title: '晚安',
      emoji: '🌙',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Good night!', translation: '晚安！' },
        { speaker: 'B', text: 'Good night! Sweet dreams!', translation: '晚安！做个好梦！' },
        { speaker: 'A', text: 'Thank you! You too!', translation: '谢谢！你也是！' }
      ]
    },
    { 
      id: 'greeting-7', 
      title: '介绍自己',
      emoji: '😊',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Hi! I\'m Tom.', translation: '嗨！我是汤姆。' },
        { speaker: 'B', text: 'Nice to meet you, Tom. I\'m Lily.', translation: '很高兴见到你，汤姆。我是莉莉。' },
        { speaker: 'A', text: 'Nice to meet you too!', translation: '我也很高兴见到你！' }
      ]
    },
    { 
      id: 'greeting-8', 
      title: '问候朋友',
      emoji: '',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Hey! Long time no see!', translation: '嘿！好久不见！' },
        { speaker: 'B', text: 'Yeah! How have you been?', translation: '是啊！你最近怎么样？' },
        { speaker: 'A', text: 'Pretty good!', translation: '挺好的！' }
      ]
    },
    
    // 场景 2：在学校（8 个对话）
    { 
      id: 'school-1', 
      title: '借东西',
      emoji: '✏️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Can I borrow your pencil?', translation: '我能借你的铅笔吗？' },
        { speaker: 'B', text: 'Sure! Here you are.', translation: '当然！给你。' },
        { speaker: 'A', text: 'Thank you!', translation: '谢谢你！' }
      ]
    },
    { 
      id: 'school-2', 
      title: '问问题',
      emoji: '🙋',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Excuse me, what\'s this?', translation: '请问，这是什么？' },
        { speaker: 'B', text: 'This is a book.', translation: '这是一本书。' },
        { speaker: 'A', text: 'Oh, I see!', translation: '哦，我明白了！' }
      ]
    },
    { 
      id: 'school-3', 
      title: '邀请玩游戏',
      emoji: '⚽',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Do you want to play?', translation: '你想一起玩吗？' },
        { speaker: 'B', text: 'Yes! Let\'s play together!', translation: '好啊！我们一起玩吧！' },
        { speaker: 'A', text: 'Great!', translation: '太棒了！' }
      ]
    },
    { 
      id: 'school-4', 
      title: '分享玩具',
      emoji: '🧸',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Can I play with your toy?', translation: '我能玩你的玩具吗？' },
        { speaker: 'B', text: 'Of course! We can share.', translation: '当然可以！我们可以分享。' },
        { speaker: 'A', text: 'You\'re so nice!', translation: '你真好！' }
      ]
    },
    { 
      id: 'school-5', 
      title: '请求帮助',
      emoji: '🤲',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Can you help me?', translation: '你能帮我吗？' },
        { speaker: 'B', text: 'Sure! What do you need?', translation: '当然！你需要什么帮助？' },
        { speaker: 'A', text: 'I can\'t open this.', translation: '我打不开这个。' }
      ]
    },
    { 
      id: 'school-6', 
      title: '赞美朋友',
      emoji: '👍',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Your drawing is beautiful!', translation: '你的画真漂亮！' },
        { speaker: 'B', text: 'Thank you! Yours is great too!', translation: '谢谢！你的也很棒！' },
        { speaker: 'A', text: 'Let\'s draw together!', translation: '我们一起画画吧！' }
      ]
    },
    { 
      id: 'school-7', 
      title: '道歉',
      emoji: '😔',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I\'m sorry I broke your crayon.', translation: '对不起，我弄断了你的蜡笔。' },
        { speaker: 'B', text: 'That\'s okay.', translation: '没关系。' },
        { speaker: 'A', text: 'I\'ll buy you a new one.', translation: '我会给你买新的。' }
      ]
    },
    { 
      id: 'school-8', 
      title: '感谢老师',
      emoji: '👩‍',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Thank you, teacher!', translation: '谢谢您，老师！' },
        { speaker: 'B', text: 'You\'re welcome!', translation: '不客气！' },
        { speaker: 'A', text: 'I learned a lot today!', translation: '我今天学到了很多！' }
      ]
    },
    
    // 场景 3：在餐厅（8 个对话）
    { 
      id: 'restaurant-1', 
      title: '点餐',
      emoji: '🍔',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I want a hamburger, please.', translation: '我想要一个汉堡。' },
        { speaker: 'B', text: 'Okay! Anything else?', translation: '好的！还要别的吗？' },
        { speaker: 'A', text: 'No, thank you!', translation: '不用了，谢谢！' }
      ]
    },
    { 
      id: 'restaurant-2', 
      title: '要饮料',
      emoji: '🥤',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Can I have some juice?', translation: '能给我一些果汁吗？' },
        { speaker: 'B', text: 'Sure! Apple or orange?', translation: '当然！苹果汁还是橙汁？' },
        { speaker: 'A', text: 'Apple juice, please.', translation: '请给我苹果汁。' }
      ]
    },
    { 
      id: 'restaurant-3', 
      title: '询问食物',
      emoji: '🍕',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'What\'s this?', translation: '这是什么？' },
        { speaker: 'B', text: 'This is pizza.', translation: '这是披萨。' },
        { speaker: 'A', text: 'Yummy! I love pizza!', translation: '好吃！我爱吃披萨！' }
      ]
    },
    { 
      id: 'restaurant-4', 
      title: '表达喜好',
      emoji: '😋',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Do you like ice cream?', translation: '你喜欢冰淇淋吗？' },
        { speaker: 'B', text: 'Yes! It\'s delicious!', translation: '喜欢！很好吃！' },
        { speaker: 'A', text: 'Me too!', translation: '我也是！' }
      ]
    },
    { 
      id: 'restaurant-5', 
      title: '餐桌礼仪',
      emoji: '🍴',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Can you pass me the spoon?', translation: '能把勺子递给我吗？' },
        { speaker: 'B', text: 'Here you go!', translation: '给你！' },
        { speaker: 'A', text: 'Thanks!', translation: '谢谢！' }
      ]
    },
    { 
      id: 'restaurant-6', 
      title: '吃饱了',
      emoji: '😌',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I\'m full.', translation: '我吃饱了。' },
        { speaker: 'B', text: 'Me too! It was delicious!', translation: '我也是！很好吃！' },
        { speaker: 'A', text: 'Let\'s clean up.', translation: '我们收拾一下吧。' }
      ]
    },
    { 
      id: 'restaurant-7', 
      title: '买单',
      emoji: '💰',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Check, please!', translation: '买单！' },
        { speaker: 'B', text: 'Here you are!', translation: '给您！' },
        { speaker: 'A', text: 'Thank you!', translation: '谢谢！' }
      ]
    },
    { 
      id: 'restaurant-8', 
      title: '分享食物',
      emoji: '🍰',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Want to try my cake?', translation: '想尝尝我的蛋糕吗？' },
        { speaker: 'B', text: 'Yes, please!', translation: '好啊！' },
        { speaker: 'A', text: 'Here you go!', translation: '给你！' }
      ]
    },
    
    // 场景 4：在家里（8 个对话）
    { 
      id: 'home-1', 
      title: '起床',
      emoji: '⏰',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Time to wake up!', translation: '该起床了！' },
        { speaker: 'B', text: 'Okay, Mom.', translation: '好的，妈妈。' },
        { speaker: 'A', text: 'Breakfast is ready!', translation: '早餐准备好了！' }
      ]
    },
    { 
      id: 'home-2', 
      title: '穿衣服',
      emoji: '👕',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Put on your shirt.', translation: '穿上你的衬衫。' },
        { speaker: 'B', text: 'Okay! Which one?', translation: '好的！穿哪件？' },
        { speaker: 'A', text: 'The blue one.', translation: '蓝色的那件。' }
      ]
    },
    { 
      id: 'home-3', 
      title: '刷牙',
      emoji: '🪥',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Don\'t forget to brush your teeth!', translation: '别忘了刷牙！' },
        { speaker: 'B', text: 'I know!', translation: '我知道啦！' },
        { speaker: 'A', text: 'Good job!', translation: '真棒！' }
      ]
    },
    { 
      id: 'home-4', 
      title: '整理玩具',
      emoji: '🧹',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Let\'s clean up your toys.', translation: '我们来收拾玩具吧。' },
        { speaker: 'B', text: 'Okay! Where do they go?', translation: '好的！它们放哪里？' },
        { speaker: 'A', text: 'In the toy box.', translation: '放进玩具箱里。' }
      ]
    },
    { 
      id: 'home-5', 
      title: '做作业',
      emoji: '📚',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Time for homework.', translation: '该做作业了。' },
        { speaker: 'B', text: 'Can you help me?', translation: '你能帮我吗？' },
        { speaker: 'A', text: 'Of course!', translation: '当然可以！' }
      ]
    },
    { 
      id: 'home-6', 
      title: '看电视',
      emoji: '📺',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Can I watch TV?', translation: '我能看电视吗？' },
        { speaker: 'B', text: 'After homework.', translation: '做完作业后。' },
        { speaker: 'A', text: 'Okay!', translation: '好的！' }
      ]
    },
    { 
      id: 'home-7', 
      title: '洗澡',
      emoji: '🛁',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Time for a bath!', translation: '该洗澡了！' },
        { speaker: 'B', text: 'Can I play with my toys?', translation: '我能玩玩具吗？' },
        { speaker: 'A', text: 'After your bath.', translation: '洗完澡后。' }
      ]
    },
    { 
      id: 'home-8', 
      title: '睡前故事',
      emoji: '📖',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Can you read me a story?', translation: '能给我讲个故事吗？' },
        { speaker: 'B', text: 'Of course! Which one?', translation: '当然！听哪个故事？' },
        { speaker: 'A', text: 'The little duck!', translation: '小鸭子！' }
      ]
    },
    
    // 场景 5：在公园（8 个对话）
    { 
      id: 'park-1', 
      title: '邀请去公园',
      emoji: '🌳',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Let\'s go to the park!', translation: '我们去公园吧！' },
        { speaker: 'B', text: 'Great idea!', translation: '好主意！' },
        { speaker: 'A', text: 'Let\'s go!', translation: '走吧！' }
      ]
    },
    { 
      id: 'park-2', 
      title: '玩滑梯',
      emoji: '🛝',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Let\'s play on the slide!', translation: '我们玩滑梯吧！' },
        { speaker: 'B', text: 'You go first!', translation: '你先玩！' },
        { speaker: 'A', text: 'Here I go!', translation: '我来了！' }
      ]
    },
    { 
      id: 'park-3', 
      title: '荡秋千',
      emoji: '🎠',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Push me on the swing!', translation: '推我荡秋千！' },
        { speaker: 'B', text: 'Okay! Higher?', translation: '好的！要高一点吗？' },
        { speaker: 'A', text: 'Yes! Higher!', translation: '要！再高一点！' }
      ]
    },
    { 
      id: 'park-4', 
      title: '看到小动物',
      emoji: '🐿️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Look! A squirrel!', translation: '看！一只松鼠！' },
        { speaker: 'B', text: 'Where?', translation: '在哪里？' },
        { speaker: 'A', text: 'Over there!', translation: '在那里！' }
      ]
    },
    { 
      id: 'park-5', 
      title: '放风筝',
      emoji: '🪁',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Let\'s fly a kite!', translation: '我们放风筝吧！' },
        { speaker: 'B', text: 'It\'s windy today!', translation: '今天风很大！' },
        { speaker: 'A', text: 'Perfect!', translation: '太好了！' }
      ]
    },
    { 
      id: 'park-6', 
      title: '休息喝水',
      emoji: '💧',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I\'m tired.', translation: '我累了。' },
        { speaker: 'B', text: 'Let\'s take a break.', translation: '我们休息一下吧。' },
        { speaker: 'A', text: 'Good idea!', translation: '好主意！' }
      ]
    },
    { 
      id: 'park-7', 
      title: '结交新朋友',
      emoji: '👦',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Hi! I\'m new here.', translation: '嗨！我是新来的。' },
        { speaker: 'B', text: 'Welcome! Want to play?', translation: '欢迎！想一起玩吗？' },
        { speaker: 'A', text: 'Yes!', translation: '好啊！' }
      ]
    },
    { 
      id: 'park-8', 
      title: '回家',
      emoji: '🏠',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'It\'s time to go home.', translation: '该回家了。' },
        { speaker: 'B', text: 'But I want to play more!', translation: '但我想再玩一会儿！' },
        { speaker: 'A', text: 'We can come again tomorrow.', translation: '我们明天可以再来。' }
      ]
    },
    
    // ========== 新增 50 组对话场景 ==========
    // 场景 6：购物（10 组）
    { 
      id: 'shopping-1', 
      title: '买玩具',
      emoji: '🧸',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I want this teddy bear.', translation: '我想要这个泰迪熊。' },
        { speaker: 'B', text: 'How much is it?', translation: '多少钱？' },
        { speaker: 'A', text: 'It\'s 50 yuan.', translation: '50 元。' }
      ]
    },
    { 
      id: 'shopping-2', 
      title: '买书',
      emoji: '📖',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Where are the books?', translation: '书在哪里？' },
        { speaker: 'B', text: 'Over there, on the shelf.', translation: '在那边，架子上。' },
        { speaker: 'A', text: 'Thank you!', translation: '谢谢！' }
      ]
    },
    { 
      id: 'shopping-3', 
      title: '试穿衣服',
      emoji: '👕',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Can I try this on?', translation: '我能试试这个吗？' },
        { speaker: 'B', text: 'Sure! The fitting room is there.', translation: '当然！试衣间在那里。' },
        { speaker: 'A', text: 'It fits perfectly!', translation: '很合身！' }
      ]
    },
    { 
      id: 'shopping-4', 
      title: '选择颜色',
      emoji: '🎨',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Which color do you like?', translation: '你喜欢哪个颜色？' },
        { speaker: 'B', text: 'I like blue.', translation: '我喜欢蓝色。' },
        { speaker: 'A', text: 'Me too!', translation: '我也是！' }
      ]
    },
    { 
      id: 'shopping-5', 
      title: '付钱',
      emoji: '💳',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'How would you like to pay?', translation: '您想怎么付款？' },
        { speaker: 'B', text: 'By card, please.', translation: '刷卡。' },
        { speaker: 'A', text: 'Here\'s your receipt.', translation: '这是您的收据。' }
      ]
    },
    { 
      id: 'shopping-6', 
      title: '打折',
      emoji: '🏷️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Is this on sale?', translation: '这个打折吗？' },
        { speaker: 'B', text: 'Yes, 20% off!', translation: '是的，打八折！' },
        { speaker: 'A', text: 'Great! I\'ll take it.', translation: '太好了！我买了。' }
      ]
    },
    { 
      id: 'shopping-7', 
      title: '找零',
      emoji: '💰',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Here\'s 100 yuan.', translation: '这是 100 元。' },
        { speaker: 'B', text: 'Your change is 30 yuan.', translation: '找您 30 元。' },
        { speaker: 'A', text: 'Thank you!', translation: '谢谢！' }
      ]
    },
    { 
      id: 'shopping-8', 
      title: '包装',
      emoji: '🎁',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Can you wrap it?', translation: '能包装一下吗？' },
        { speaker: 'B', text: 'Of course! For a gift?', translation: '当然！是礼物吗？' },
        { speaker: 'A', text: 'Yes, for my mom.', translation: '是的，给我妈妈的。' }
      ]
    },
    { 
      id: 'shopping-9', 
      title: '退货',
      emoji: '↩️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I want to return this.', translation: '我想退货。' },
        { speaker: 'B', text: 'What\'s the problem?', translation: '有什么问题吗？' },
        { speaker: 'A', text: 'It\'s too small.', translation: '它太小了。' }
      ]
    },
    { 
      id: 'shopping-10', 
      title: '会员卡',
      emoji: '💎',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Do you have a membership card?', translation: '您有会员卡吗？' },
        { speaker: 'B', text: 'No, how can I get one?', translation: '没有，怎么办理？' },
        { speaker: 'A', text: 'Fill out this form.', translation: '填写这张表格。' }
      ]
    },
    
    // 场景 7：医院（10 组）
    { 
      id: 'hospital-1', 
      title: '挂号',
      emoji: '🏥',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I need to see a doctor.', translation: '我需要看医生。' },
        { speaker: 'B', text: 'Please fill out this form.', translation: '请填写这张表格。' },
        { speaker: 'A', text: 'Here you are.', translation: '给你。' }
      ]
    },
    { 
      id: 'hospital-2', 
      title: '描述症状',
      emoji: '🤒',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'What\'s wrong?', translation: '哪里不舒服？' },
        { speaker: 'B', text: 'I have a headache.', translation: '我头痛。' },
        { speaker: 'A', text: 'Since when?', translation: '从什么时候开始的？' }
      ]
    },
    { 
      id: 'hospital-3', 
      title: '发烧',
      emoji: '🌡️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I feel hot.', translation: '我觉得热。' },
        { speaker: 'B', text: 'Let me check your temperature.', translation: '让我量一下你的体温。' },
        { speaker: 'A', text: 'You have a fever.', translation: '你发烧了。' }
      ]
    },
    { 
      id: 'hospital-4', 
      title: '开药',
      emoji: '💊',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I\'ll prescribe some medicine.', translation: '我给你开些药。' },
        { speaker: 'B', text: 'How often should I take it?', translation: '多久吃一次？' },
        { speaker: 'A', text: 'Three times a day.', translation: '一天三次。' }
      ]
    },
    { 
      id: 'hospital-5', 
      title: '打针',
      emoji: '💉',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I need to give you a shot.', translation: '我需要给你打针。' },
        { speaker: 'B', text: 'Will it hurt?', translation: '会疼吗？' },
        { speaker: 'A', text: 'Just a little pinch.', translation: '只有一点点疼。' }
      ]
    },
    { 
      id: 'hospital-6', 
      title: '休息',
      emoji: '🛌',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'You need to rest.', translation: '你需要休息。' },
        { speaker: 'B', text: 'For how long?', translation: '多久？' },
        { speaker: 'A', text: 'At least 3 days.', translation: '至少 3 天。' }
      ]
    },
    { 
      id: 'hospital-7', 
      title: '多喝水',
      emoji: '💧',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Drink plenty of water.', translation: '多喝水。' },
        { speaker: 'B', text: 'How much?', translation: '喝多少？' },
        { speaker: 'A', text: 'At least 8 glasses.', translation: '至少 8 杯。' }
      ]
    },
    { 
      id: 'hospital-8', 
      title: '复诊',
      emoji: '',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Come back next week.', translation: '下周再来复查。' },
        { speaker: 'B', text: 'Same time?', translation: '同样的时间吗？' },
        { speaker: 'A', text: 'Yes, make an appointment.', translation: '是的，提前预约。' }
      ]
    },
    { 
      id: 'hospital-9', 
      title: '买药',
      emoji: '🏪',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Where can I buy medicine?', translation: '哪里可以买药？' },
        { speaker: 'B', text: 'There\'s a pharmacy downstairs.', translation: '楼下有药店。' },
        { speaker: 'A', text: 'Thank you!', translation: '谢谢！' }
      ]
    },
    { 
      id: 'hospital-10', 
      title: '康复',
      emoji: '💪',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I feel better now.', translation: '我现在感觉好多了。' },
        { speaker: 'B', text: 'That\'s great news!', translation: '太好了！' },
        { speaker: 'A', text: 'Thanks, doctor!', translation: '谢谢医生！' }
      ]
    },
    
    // 场景 8：交通（10 组）
    { 
      id: 'transport-1', 
      title: '等公交',
      emoji: '🚌',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Where\'s the bus stop?', translation: '公交站在哪里？' },
        { speaker: 'B', text: 'It\'s over there.', translation: '在那边。' },
        { speaker: 'A', text: 'Which bus goes to the park?', translation: '哪路车去公园？' }
      ]
    },
    { 
      id: 'transport-2', 
      title: '买票',
      emoji: '🎫',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'One ticket to Beijing, please.', translation: '一张去北京的票。' },
        { speaker: 'B', text: 'Single or return?', translation: '单程还是往返？' },
        { speaker: 'A', text: 'Return, please.', translation: '往返。' }
      ]
    },
    { 
      id: 'transport-3', 
      title: '打车',
      emoji: '🚕',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Taxi!', translation: '出租车！' },
        { speaker: 'B', text: 'Where to?', translation: '去哪里？' },
        { speaker: 'A', text: 'To the airport, please.', translation: '去机场。' }
      ]
    },
    { 
      id: 'transport-4', 
      title: '问路',
      emoji: '🗺️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Excuse me, where is the station?', translation: '请问火车站在哪里？' },
        { speaker: 'B', text: 'Go straight and turn left.', translation: '直走然后左转。' },
        { speaker: 'A', text: 'How far is it?', translation: '有多远？' }
      ]
    },
    { 
      id: 'transport-5', 
      title: '地铁',
      emoji: '🚇',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Which line should I take?', translation: '我应该坐几号线？' },
        { speaker: 'B', text: 'Line 2.', translation: '2 号线。' },
        { speaker: 'A', text: 'How many stops?', translation: '几站？' }
      ]
    },
    { 
      id: 'transport-6', 
      title: '迟到',
      emoji: '⏰',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I\'m late!', translation: '我迟到了！' },
        { speaker: 'B', text: 'What happened?', translation: '怎么了？' },
        { speaker: 'A', text: 'The bus was late.', translation: '公交车晚点了。' }
      ]
    },
    { 
      id: 'transport-7', 
      title: '让座',
      emoji: '💺',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Would you like to sit?', translation: '您请坐。' },
        { speaker: 'B', text: 'Thank you, you\'re kind.', translation: '谢谢，你真好。' },
        { speaker: 'A', text: 'It\'s my pleasure.', translation: '不客气。' }
      ]
    },
    { 
      id: 'transport-8', 
      title: '停车',
      emoji: '🅿️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Where can I park?', translation: '哪里可以停车？' },
        { speaker: 'B', text: 'There\'s a parking lot.', translation: '有个停车场。' },
        { speaker: 'A', text: 'Is it free?', translation: '免费吗？' }
      ]
    },
    { 
      id: 'transport-9', 
      title: '加油',
      emoji: '⛽',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Fill it up, please.', translation: '加满油。' },
        { speaker: 'B', text: 'Regular or premium?', translation: '普通油还是高级油？' },
        { speaker: 'A', text: 'Regular, please.', translation: '普通油。' }
      ]
    },
    { 
      id: 'transport-10', 
      title: '到达',
      emoji: '🎯',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'We\'re here!', translation: '我们到了！' },
        { speaker: 'B', text: 'That was fast.', translation: '真快。' },
        { speaker: 'A', text: 'Let\'s go!', translation: '我们走吧！' }
      ]
    },
    
    // 场景 9：天气（10 组）
    { 
      id: 'weather-1', 
      title: '晴天',
      emoji: '☀️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'It\'s sunny today!', translation: '今天天气真好！' },
        { speaker: 'B', text: 'Perfect for a picnic!', translation: '适合野餐！' },
        { speaker: 'A', text: 'Let\'s go!', translation: '我们走吧！' }
      ]
    },
    { 
      id: 'weather-2', 
      title: '下雨',
      emoji: '🌧️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'It\'s raining.', translation: '下雨了。' },
        { speaker: 'B', text: 'Do you have an umbrella?', translation: '你有伞吗？' },
        { speaker: 'A', text: 'Yes, here.', translation: '有，给。' }
      ]
    },
    { 
      id: 'weather-3', 
      title: '下雪',
      emoji: '❄️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'It\'s snowing!', translation: '下雪了！' },
        { speaker: 'B', text: 'Let\'s make a snowman!', translation: '我们堆雪人吧！' },
        { speaker: 'A', text: 'Great idea!', translation: '好主意！' }
      ]
    },
    { 
      id: 'weather-4', 
      title: '刮风',
      emoji: '💨',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'It\'s very windy.', translation: '风很大。' },
        { speaker: 'B', text: 'Hold on to your hat!', translation: '抓紧你的帽子！' },
        { speaker: 'A', text: 'It\'s flying away!', translation: '它要飞走了！' }
      ]
    },
    { 
      id: 'weather-5', 
      title: '多云',
      emoji: '☁️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'It\'s cloudy today.', translation: '今天多云。' },
        { speaker: 'B', text: 'Will it rain?', translation: '会下雨吗？' },
        { speaker: 'A', text: 'Maybe later.', translation: '可能晚点会。' }
      ]
    },
    { 
      id: 'weather-6', 
      title: '温度',
      emoji: '🌡️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'What\'s the temperature?', translation: '温度是多少？' },
        { speaker: 'B', text: 'It\'s 25 degrees.', translation: '25 度。' },
        { speaker: 'A', text: 'It\'s warm!', translation: '很暖和！' }
      ]
    },
    { 
      id: 'weather-7', 
      title: '炎热',
      emoji: '🥵',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'It\'s so hot!', translation: '太热了！' },
        { speaker: 'B', text: 'Let\'s get some ice cream.', translation: '我们去吃冰淇淋吧。' },
        { speaker: 'A', text: 'Good idea!', translation: '好主意！' }
      ]
    },
    { 
      id: 'weather-8', 
      title: '寒冷',
      emoji: '🥶',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'It\'s freezing!', translation: '冷死了！' },
        { speaker: 'B', text: 'Put on your coat.', translation: '穿上外套。' },
        { speaker: 'A', text: 'I did!', translation: '我穿了！' }
      ]
    },
    { 
      id: 'weather-9', 
      title: '天气预报',
      emoji: '📺',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'What\'s the forecast?', translation: '天气预报怎么说？' },
        { speaker: 'B', text: 'It will rain tomorrow.', translation: '明天会下雨。' },
        { speaker: 'A', text: 'We should stay home.', translation: '我们应该待在家里。' }
      ]
    },
    { 
      id: 'weather-10', 
      title: '彩虹',
      emoji: '🌈',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Look! A rainbow!', translation: '看！彩虹！' },
        { speaker: 'B', text: 'So beautiful!', translation: '好美啊！' },
        { speaker: 'A', text: 'Let\'s take a photo!', translation: '我们拍张照吧！' }
      ]
    },
    
    // 场景 10：节日（10 组）
    { 
      id: 'festival-1', 
      title: '春节',
      emoji: '🧧',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Happy New Year!', translation: '新年快乐！' },
        { speaker: 'B', text: 'Happy New Year to you!', translation: '你也新年快乐！' },
        { speaker: 'A', text: 'Here\'s a red envelope!', translation: '这是红包！' }
      ]
    },
    { 
      id: 'festival-2', 
      title: '圣诞节',
      emoji: '🎄',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Merry Christmas!', translation: '圣诞快乐！' },
        { speaker: 'B', text: 'Merry Christmas!', translation: '圣诞快乐！' },
        { speaker: 'A', text: 'What did Santa bring?', translation: '圣诞老人带了什么？' }
      ]
    },
    { 
      id: 'festival-3', 
      title: '万圣节',
      emoji: '🎃',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Trick or treat!', translation: '不给糖就捣蛋！' },
        { speaker: 'B', text: 'Here\'s some candy!', translation: '给你糖果！' },
        { speaker: 'A', text: 'Thank you!', translation: '谢谢！' }
      ]
    },
    { 
      id: 'festival-4', 
      title: '生日',
      emoji: '🎂',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Happy birthday!', translation: '生日快乐！' },
        { speaker: 'B', text: 'Thank you!', translation: '谢谢！' },
        { speaker: 'A', text: 'Make a wish!', translation: '许个愿吧！' }
      ]
    },
    { 
      id: 'festival-5', 
      title: '母亲节',
      emoji: '💐',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Happy Mother\'s Day!', translation: '母亲节快乐！' },
        { speaker: 'B', text: 'Thank you, dear!', translation: '谢谢你，亲爱的！' },
        { speaker: 'A', text: 'This is for you.', translation: '这是给你的。' }
      ]
    },
    { 
      id: 'festival-6', 
      title: '父亲节',
      emoji: '👔',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Happy Father\'s Day!', translation: '父亲节快乐！' },
        { speaker: 'B', text: 'Thanks, son!', translation: '谢谢，儿子！' },
        { speaker: 'A', text: 'I made this for you.', translation: '我为你做了这个。' }
      ]
    },
    { 
      id: 'festival-7', 
      title: '情人节',
      emoji: '💝',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Happy Valentine\'s Day!', translation: '情人节快乐！' },
        { speaker: 'B', text: 'I love you!', translation: '我爱你！' },
        { speaker: 'A', text: 'I love you too!', translation: '我也爱你！' }
      ]
    },
    { 
      id: 'festival-8', 
      title: '感恩节',
      emoji: '🦃',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Happy Thanksgiving!', translation: '感恩节快乐！' },
        { speaker: 'B', text: 'What are you thankful for?', translation: '你感谢什么？' },
        { speaker: 'A', text: 'My family!', translation: '我的家人！' }
      ]
    },
    { 
      id: 'festival-9', 
      title: '元宵节',
      emoji: '🏮',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Let\'s eat tangyuan!', translation: '我们吃汤圆吧！' },
        { speaker: 'B', text: 'What flavor?', translation: '什么馅的？' },
        { speaker: 'A', text: 'Sesame!', translation: '芝麻的！' }
      ]
    },
    { 
      id: 'festival-10', 
      title: '中秋节',
      emoji: '🥮',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Happy Mid-Autumn Festival!', translation: '中秋节快乐！' },
        { speaker: 'B', text: 'Let\'s admire the moon.', translation: '我们赏月吧。' },
        { speaker: 'A', text: 'The moon is so round!', translation: '月亮好圆啊！' }
      ]
    },
    
    // ========== 再新增 60 组对话场景 ==========
    // 场景 11：运动（10 组）
    { 
      id: 'sports-1', 
      title: '踢足球',
      emoji: '⚽',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Let\'s play soccer!', translation: '我们踢足球吧！' },
        { speaker: 'B', text: 'I\'ll be the goalkeeper.', translation: '我当守门员。' },
        { speaker: 'A', text: 'Goal!', translation: '进球了！' }
      ]
    },
    { 
      id: 'sports-2', 
      title: '打篮球',
      emoji: '🏀',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Pass me the ball!', translation: '传球给我！' },
        { speaker: 'B', text: 'Here!', translation: '给你！' },
        { speaker: 'A', text: 'I scored!', translation: '我得分了！' }
      ]
    },
    { 
      id: 'sports-3', 
      title: '游泳',
      emoji: '🏊',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Can you swim?', translation: '你会游泳吗？' },
        { speaker: 'B', text: 'Yes, I can!', translation: '是的，我会！' },
        { speaker: 'A', text: 'Let\'s race!', translation: '我们比赛吧！' }
      ]
    },
    { 
      id: 'sports-4', 
      title: '跑步',
      emoji: '🏃',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Let\'s run to the tree!', translation: '我们跑到那棵树！' },
        { speaker: 'B', text: 'Ready, set, go!', translation: '预备，开始！' },
        { speaker: 'A', text: 'I won!', translation: '我赢了！' }
      ]
    },
    { 
      id: 'sports-5', 
      title: '骑自行车',
      emoji: '🚴',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I can ride a bike!', translation: '我会骑自行车！' },
        { speaker: 'B', text: 'Me too!', translation: '我也会！' },
        { speaker: 'A', text: 'Let\'s ride together!', translation: '我们一起骑！' }
      ]
    },
    { 
      id: 'sports-6', 
      title: '跳绳',
      emoji: '🪢',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Can you jump rope?', translation: '你会跳绳吗？' },
        { speaker: 'B', text: 'Watch me!', translation: '看我！' },
        { speaker: 'A', text: 'Wow, 10 times!', translation: '哇，10 次！' }
      ]
    },
    { 
      id: 'sports-7', 
      title: '打网球',
      emoji: '🎾',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Want to play tennis?', translation: '想打网球吗？' },
        { speaker: 'B', text: 'Sure!', translation: '好啊！' },
        { speaker: 'A', text: 'Nice shot!', translation: '好球！' }
      ]
    },
    { 
      id: 'sports-8', 
      title: '打乒乓球',
      emoji: '🏓',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Let\'s play ping pong!', translation: '我们打乒乓球吧！' },
        { speaker: 'B', text: 'I love this game!', translation: '我喜欢这个运动！' },
        { speaker: 'A', text: 'You\'re good!', translation: '你打得真好！' }
      ]
    },
    { 
      id: 'sports-9', 
      title: '爬山',
      emoji: '🧗',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Let\'s climb the hill!', translation: '我们去爬山！' },
        { speaker: 'B', text: 'It\'s high!', translation: '好高啊！' },
        { speaker: 'A', text: 'We made it!', translation: '我们到了！' }
      ]
    },
    { 
      id: 'sports-10', 
      title: '瑜伽',
      emoji: '🧘',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Let\'s do yoga.', translation: '我们做瑜伽吧。' },
        { speaker: 'B', text: 'Good idea.', translation: '好主意。' },
        { speaker: 'A', text: 'I feel relaxed.', translation: '我感觉很放松。' }
      ]
    },
    
    // 场景 12：食物（10 组）
    { 
      id: 'food-1', 
      title: '早餐',
      emoji: '🍳',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'What\'s for breakfast?', translation: '早餐吃什么？' },
        { speaker: 'B', text: 'Eggs and toast.', translation: '鸡蛋和吐司。' },
        { speaker: 'A', text: 'Yummy!', translation: '好吃！' }
      ]
    },
    { 
      id: 'food-2', 
      title: '午餐',
      emoji: '🍱',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I\'m hungry.', translation: '我饿了。' },
        { speaker: 'B', text: 'Let\'s get lunch.', translation: '我们去吃午饭。' },
        { speaker: 'A', text: 'What do you want?', translation: '你想吃什么？' }
      ]
    },
    { 
      id: 'food-3', 
      title: '晚餐',
      emoji: '🍽️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Dinner is ready!', translation: '晚餐好了！' },
        { speaker: 'B', text: 'It smells good!', translation: '闻起来好香！' },
        { speaker: 'A', text: 'Enjoy your meal!', translation: '慢慢享用！' }
      ]
    },
    { 
      id: 'food-4', 
      title: '水果',
      emoji: '🍎',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Do you like apples?', translation: '你喜欢苹果吗？' },
        { speaker: 'B', text: 'Yes, they\'re sweet.', translation: '喜欢，它们很甜。' },
        { speaker: 'A', text: 'Here you go.', translation: '给你。' }
      ]
    },
    { 
      id: 'food-5', 
      title: '蔬菜',
      emoji: '🥦',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Eat your vegetables.', translation: '吃蔬菜。' },
        { speaker: 'B', text: 'I don\'t like them.', translation: '我不喜欢。' },
        { speaker: 'A', text: 'They\'re healthy!', translation: '它们很健康！' }
      ]
    },
    { 
      id: 'food-6', 
      title: '面条',
      emoji: '🍜',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I love noodles!', translation: '我爱吃面条！' },
        { speaker: 'B', text: 'Me too!', translation: '我也是！' },
        { speaker: 'A', text: 'Slurp!', translation: '吸溜！' }
      ]
    },
    { 
      id: 'food-7', 
      title: '米饭',
      emoji: '🍚',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'More rice?', translation: '还要米饭吗？' },
        { speaker: 'B', text: 'Yes, please.', translation: '好的，谢谢。' },
        { speaker: 'A', text: 'Here you are.', translation: '给你。' }
      ]
    },
    { 
      id: 'food-8', 
      title: '汤',
      emoji: '🍲',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'The soup is hot.', translation: '汤很烫。' },
        { speaker: 'B', text: 'Blow on it.', translation: '吹一吹。' },
        { speaker: 'A', text: 'It\'s delicious!', translation: '很好喝！' }
      ]
    },
    { 
      id: 'food-9', 
      title: '甜点',
      emoji: '🍰',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Want some cake?', translation: '想吃蛋糕吗？' },
        { speaker: 'B', text: 'Yes, please!', translation: '想！' },
        { speaker: 'A', text: 'It\'s sweet!', translation: '好甜！' }
      ]
    },
    { 
      id: 'food-10', 
      title: '饮料',
      emoji: '🥤',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'What would you like to drink?', translation: '你想喝什么？' },
        { speaker: 'B', text: 'Water, please.', translation: '水。' },
        { speaker: 'A', text: 'Here you go.', translation: '给你。' }
      ]
    },
    
    // 场景 13：颜色形状（10 组）
    { 
      id: 'color-1', 
      title: '认颜色',
      emoji: '🎨',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'What color is this?', translation: '这是什么颜色？' },
        { speaker: 'B', text: 'It\'s red!', translation: '是红色！' },
        { speaker: 'A', text: 'Good job!', translation: '真棒！' }
      ]
    },
    { 
      id: 'color-2', 
      title: '蓝色',
      emoji: '💙',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I like blue.', translation: '我喜欢蓝色。' },
        { speaker: 'B', text: 'Me too!', translation: '我也是！' },
        { speaker: 'A', text: 'Like the sky!', translation: '像天空一样！' }
      ]
    },
    { 
      id: 'color-3', 
      title: '绿色',
      emoji: '💚',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'The grass is green.', translation: '草是绿色的。' },
        { speaker: 'B', text: 'The trees too!', translation: '树也是！' },
        { speaker: 'A', text: 'Nature is beautiful!', translation: '大自然真美！' }
      ]
    },
    { 
      id: 'color-4', 
      title: '黄色',
      emoji: '💛',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'The sun is yellow.', translation: '太阳是黄色的。' },
        { speaker: 'B', text: 'Bananas are yellow too!', translation: '香蕉也是黄色的！' },
        { speaker: 'A', text: 'You\'re right!', translation: '你说得对！' }
      ]
    },
    { 
      id: 'color-5', 
      title: '圆形',
      emoji: '⭕',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Find something round.', translation: '找个圆形的东西。' },
        { speaker: 'B', text: 'This ball!', translation: '这个球！' },
        { speaker: 'A', text: 'Perfect!', translation: '完美！' }
      ]
    },
    { 
      id: 'color-6', 
      title: '方形',
      emoji: '🔲',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'What shape is this?', translation: '这是什么形状？' },
        { speaker: 'B', text: 'It\'s a square!', translation: '是正方形！' },
        { speaker: 'A', text: 'Correct!', translation: '对了！' }
      ]
    },
    { 
      id: 'color-7', 
      title: '三角形',
      emoji: '🔺',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'This has three sides.', translation: '这个有三条边。' },
        { speaker: 'B', text: 'It\'s a triangle!', translation: '是三角形！' },
        { speaker: 'A', text: 'Smart!', translation: '真聪明！' }
      ]
    },
    { 
      id: 'color-8', 
      title: '混合颜色',
      emoji: '🌈',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Red and yellow make...', translation: '红色加黄色变成...' },
        { speaker: 'B', text: 'Orange!', translation: '橙色！' },
        { speaker: 'A', text: 'Correct!', translation: '对了！' }
      ]
    },
    { 
      id: 'color-9', 
      title: '紫色',
      emoji: '💜',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Grapes are purple.', translation: '葡萄是紫色的。' },
        { speaker: 'B', text: 'Like my shirt!', translation: '像我的衬衫！' },
        { speaker: 'A', text: 'Pretty color!', translation: '漂亮的颜色！' }
      ]
    },
    { 
      id: 'color-10', 
      title: '白色黑色',
      emoji: '🐼',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Snow is white.', translation: '雪是白色的。' },
        { speaker: 'B', text: 'Coal is black.', translation: '煤是黑色的。' },
        { speaker: 'A', text: 'Opposite colors!', translation: '相反的颜色！' }
      ]
    },
    
    // 场景 14：时间日期（10 组）
    { 
      id: 'time-1', 
      title: '几点钟',
      emoji: '⏰',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'What time is it?', translation: '几点了？' },
        { speaker: 'B', text: 'It\'s 3 o\'clock.', translation: '3 点了。' },
        { speaker: 'A', text: 'Time to go!', translation: '该走了！' }
      ]
    },
    { 
      id: 'time-2', 
      title: '早上',
      emoji: '🌅',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Good morning!', translation: '早上好！' },
        { speaker: 'B', text: 'What time is it?', translation: '几点了？' },
        { speaker: 'A', text: 'It\'s 7 AM.', translation: '早上 7 点。' }
      ]
    },
    { 
      id: 'time-3', 
      title: '中午',
      emoji: '☀️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'It\'s noon.', translation: '中午了。' },
        { speaker: 'B', text: 'Lunch time!', translation: '午饭时间！' },
        { speaker: 'A', text: 'I\'m hungry!', translation: '我饿了！' }
      ]
    },
    { 
      id: 'time-4', 
      title: '下午',
      emoji: '🌤️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'It\'s the afternoon.', translation: '下午了。' },
        { speaker: 'B', text: 'Let\'s play outside!', translation: '我们去外面玩！' },
        { speaker: 'A', text: 'Good idea!', translation: '好主意！' }
      ]
    },
    { 
      id: 'time-5', 
      title: '晚上',
      emoji: '🌆',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'It\'s evening.', translation: '晚上了。' },
        { speaker: 'B', text: 'Time for dinner.', translation: '该吃晚饭了。' },
        { speaker: 'A', text: 'What are we eating?', translation: '我们吃什么？' }
      ]
    },
    { 
      id: 'time-6', 
      title: '睡前',
      emoji: '🌙',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'It\'s bedtime.', translation: '该睡觉了。' },
        { speaker: 'B', text: 'But I\'m not tired!', translation: '但我不困！' },
        { speaker: 'A', text: 'Just rest your eyes.', translation: '闭上眼睛休息。' }
      ]
    },
    { 
      id: 'time-7', 
      title: '今天',
      emoji: '📅',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'What day is it?', translation: '今天星期几？' },
        { speaker: 'B', text: 'It\'s Monday.', translation: '星期一。' },
        { speaker: 'A', text: 'School day!', translation: '上学的日子！' }
      ]
    },
    { 
      id: 'time-8', 
      title: '明天',
      emoji: '🗓️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'What about tomorrow?', translation: '明天呢？' },
        { speaker: 'B', text: 'It\'s weekend!', translation: '是周末！' },
        { speaker: 'A', text: 'Yay! No school!', translation: '耶！不用上学！' }
      ]
    },
    { 
      id: 'time-9', 
      title: '昨天',
      emoji: '⏮️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'What did you do yesterday?', translation: '你昨天做了什么？' },
        { speaker: 'B', text: 'I went to the park.', translation: '我去了公园。' },
        { speaker: 'A', text: 'Sounds fun!', translation: '听起来很有趣！' }
      ]
    },
    { 
      id: 'time-10', 
      title: '周末',
      emoji: '🎉',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'It\'s the weekend!', translation: '周末了！' },
        { speaker: 'B', text: 'Let\'s have fun!', translation: '我们去玩吧！' },
        { speaker: 'A', text: 'Where should we go?', translation: '我们去哪里？' }
      ]
    },
    
    // 场景 15：情感表达（10 组）
    { 
      id: 'emotion-1', 
      title: '开心',
      emoji: '😄',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I\'m happy!', translation: '我很开心！' },
        { speaker: 'B', text: 'Me too!', translation: '我也是！' },
        { speaker: 'A', text: 'Let\'s celebrate!', translation: '我们庆祝吧！' }
      ]
    },
    { 
      id: 'emotion-2', 
      title: '难过',
      emoji: '😢',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I\'m sad.', translation: '我很难过。' },
        { speaker: 'B', text: 'What\'s wrong?', translation: '怎么了？' },
        { speaker: 'A', text: 'I lost my toy.', translation: '我的玩具丢了。' }
      ]
    },
    { 
      id: 'emotion-3', 
      title: '生气',
      emoji: '😠',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I\'m angry!', translation: '我生气了！' },
        { speaker: 'B', text: 'Take a deep breath.', translation: '深呼吸。' },
        { speaker: 'A', text: 'Okay, I feel better.', translation: '好的，我感觉好点了。' }
      ]
    },
    { 
      id: 'emotion-4', 
      title: '害怕',
      emoji: '😨',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I\'m scared.', translation: '我害怕。' },
        { speaker: 'B', text: 'Don\'t worry.', translation: '别担心。' },
        { speaker: 'A', text: 'Hold my hand.', translation: '牵着我的手。' }
      ]
    },
    { 
      id: 'emotion-5', 
      title: '惊讶',
      emoji: '😲',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Surprise!', translation: '惊喜！' },
        { speaker: 'B', text: 'Wow! I didn\'t expect this!', translation: '哇！我没想到！' },
        { speaker: 'A', text: 'Happy birthday!', translation: '生日快乐！' }
      ]
    },
    { 
      id: 'emotion-6', 
      title: '累',
      emoji: '😫',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I\'m tired.', translation: '我累了。' },
        { speaker: 'B', text: 'Let\'s rest.', translation: '我们休息吧。' },
        { speaker: 'A', text: 'Good idea.', translation: '好主意。' }
      ]
    },
    { 
      id: 'emotion-7', 
      title: '兴奋',
      emoji: '🤩',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I\'m so excited!', translation: '我太兴奋了！' },
        { speaker: 'B', text: 'Me too!', translation: '我也是！' },
        { speaker: 'A', text: 'Can\'t wait!', translation: '等不及了！' }
      ]
    },
    { 
      id: 'emotion-8', 
      title: '骄傲',
      emoji: '😎',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I did it!', translation: '我做到了！' },
        { speaker: 'B', text: 'I\'m proud of you!', translation: '我为你骄傲！' },
        { speaker: 'A', text: 'Thank you!', translation: '谢谢！' }
      ]
    },
    { 
      id: 'emotion-9', 
      title: '无聊',
      emoji: '😐',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I\'m bored.', translation: '我好无聊。' },
        { speaker: 'B', text: 'Let\'s play a game.', translation: '我们玩游戏吧。' },
        { speaker: 'A', text: 'Okay! What game?', translation: '好啊！什么游戏？' }
      ]
    },
    { 
      id: 'emotion-10', 
      title: '爱',
      emoji: '❤️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'I love you!', translation: '我爱你！' },
        { speaker: 'B', text: 'I love you too!', translation: '我也爱你！' },
        { speaker: 'A', text: 'Big hug!', translation: '大大的拥抱！' }
      ]
    },
    
    // 场景 16：职业（10 组）
    { 
      id: 'job-1', 
      title: '老师',
      emoji: '👩‍🏫',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'She\'s a teacher.', translation: '她是老师。' },
        { speaker: 'B', text: 'She teaches English.', translation: '她教英语。' },
        { speaker: 'A', text: 'She\'s nice!', translation: '她很好！' }
      ]
    },
    { 
      id: 'job-2', 
      title: '医生',
      emoji: '👨‍️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'He\'s a doctor.', translation: '他是医生。' },
        { speaker: 'B', text: 'He helps sick people.', translation: '他帮助病人。' },
        { speaker: 'A', text: 'That\'s important!', translation: '那很重要！' }
      ]
    },
    { 
      id: 'job-3', 
      title: '警察',
      emoji: '👮',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'That\'s a police officer.', translation: '那是警察。' },
        { speaker: 'B', text: 'They keep us safe.', translation: '他们保护我们的安全。' },
        { speaker: 'A', text: 'I want to be one!', translation: '我想成为警察！' }
      ]
    },
    { 
      id: 'job-4', 
      title: '消防员',
      emoji: '👨‍🚒',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'Look! A firefighter!', translation: '看！消防员！' },
        { speaker: 'B', text: 'They put out fires.', translation: '他们灭火。' },
        { speaker: 'A', text: 'They\'re heroes!', translation: '他们是英雄！' }
      ]
    },
    { 
      id: 'job-5', 
      title: '厨师',
      emoji: '👨‍',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'He\'s a chef.', translation: '他是厨师。' },
        { speaker: 'B', text: 'He cooks delicious food.', translation: '他做美味的食物。' },
        { speaker: 'A', text: 'I\'m hungry!', translation: '我饿了！' }
      ]
    },
    { 
      id: 'job-6', 
      title: '护士',
      emoji: '👩‍⚕️',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'She\'s a nurse.', translation: '她是护士。' },
        { speaker: 'B', text: 'She works at a hospital.', translation: '她在医院工作。' },
        { speaker: 'A', text: 'She\'s very kind.', translation: '她很善良。' }
      ]
    },
    { 
      id: 'job-7', 
      title: '司机',
      emoji: '🚌',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'He\'s a bus driver.', translation: '他是公交司机。' },
        { speaker: 'B', text: 'He drives every day.', translation: '他每天开车。' },
        { speaker: 'A', text: 'Safe travels!', translation: '一路平安！' }
      ]
    },
    { 
      id: 'job-8', 
      title: '农民',
      emoji: '👨‍🌾',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'He\'s a farmer.', translation: '他是农民。' },
        { speaker: 'B', text: 'He grows vegetables.', translation: '他种蔬菜。' },
        { speaker: 'A', text: 'Fresh and healthy!', translation: '新鲜又健康！' }
      ]
    },
    { 
      id: 'job-9', 
      title: '科学家',
      emoji: '👩‍🔬',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'She\'s a scientist.', translation: '她是科学家。' },
        { speaker: 'B', text: 'She does experiments.', translation: '她做实验。' },
        { speaker: 'A', text: 'That\'s cool!', translation: '真酷！' }
      ]
    },
    { 
      id: 'job-10', 
      title: '艺术家',
      emoji: '🎨',
      topic: 'conversations',
      dialogues: [
        { speaker: 'A', text: 'He\'s an artist.', translation: '他是艺术家。' },
        { speaker: 'B', text: 'He paints pictures.', translation: '他画画。' },
        { speaker: 'A', text: 'Beautiful art!', translation: '美丽的艺术！' }
      ]
    }
  ]
}

/**
 * 根据主题获取单词列表
 * @param {string} topicId - 主题 ID: 'basic', 'animals', 'daily'
 * @returns {Array} 单词数组
 */
export function getWordsByTopic(topicId) {
  return ENGLISH_WORDS[topicId] || []
}

/**
 * 根据 ID 获取单词
 * @param {string} wordId - 单词 ID
 * @returns {Object|null} 单词对象
 */
export function getWordById(wordId) {
  for (const topic in ENGLISH_WORDS) {
    const word = ENGLISH_WORDS[topic].find(w => w.id === wordId)
    if (word) return word
  }
  return null
}

/**
 * 获取所有主题
 * @returns {Array} 主题数组
 */
export function getAllTopics() {
  return Object.values(ENGLISH_TOPICS)
}

/**
 * 获取主题信息
 * @param {string} topicId - 主题 ID
 * @returns {Object|null} 主题对象
 */
export function getTopicById(topicId) {
  return ENGLISH_TOPICS[topicId] || null
}

/**
 * 获取单词总数
 * @param {string} topicId - 主题 ID（可选）
 * @returns {number} 单词数量
 */
export function getWordCount(topicId) {
  if (topicId) {
    return ENGLISH_WORDS[topicId]?.length || 0
  }
  // 返回所有单词总数
  return Object.values(ENGLISH_WORDS).reduce((sum, words) => sum + words.length, 0)
}

/**
 * 获取所有对话场景
 * @returns {Array} 对话场景数组
 */
export function getConversations() {
  return ENGLISH_WORDS.conversations || []
}

/**
 * 获取指定场景的对话
 * @param {string} sceneId - 场景 ID
 * @returns {Object|null} 对话场景对象
 */
export function getConversationById(sceneId) {
  return ENGLISH_WORDS.conversations?.find(scene => scene.id === sceneId) || null
}

export default {
  ENGLISH_TOPICS,
  ENGLISH_WORDS,
  getWordsByTopic,
  getWordById,
  getAllTopics,
  getTopicById,
  getWordCount
}
