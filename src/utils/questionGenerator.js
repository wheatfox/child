export const SCENE_CONFIGS = {
  addition: {
    id: 'addition',
    name: '小松鼠摘松果',
    icon: '🌰',
    iconName: '松果',
    type: 'addition',
    operator: '+',
    color: '#FFE0B2'
  },
  subtraction: {
    id: 'subtraction',
    name: '池塘里的小鸭子',
    icon: '🦆',
    iconName: '鸭子',
    type: 'subtraction',
    operator: '-',
    color: '#B3E5FC'
  },
  'fill-blank': {
    id: 'fill-blank',
    name: '小熊的蜂蜜罐',
    icon: '🍯',
    iconName: '蜂蜜罐',
    type: 'fill-blank',
    operator: '+',
    color: '#FFF9C4'
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateIconDisplay(num, icon) {
  return icon.repeat(Math.max(0, num))
}

function generateOptions(correctAnswer, count = 4) {
  const options = new Set([correctAnswer])
  const candidates = []

  // 添加接近正确答案的干扰项
  if (correctAnswer - 1 >= 0) candidates.push(correctAnswer - 1)
  if (correctAnswer + 1 <= 20) candidates.push(correctAnswer + 1)
  if (correctAnswer - 2 >= 0) candidates.push(correctAnswer - 2)
  if (correctAnswer + 2 <= 20) candidates.push(correctAnswer + 2)
  
  // 添加一些随机干扰项
  const randomCount = correctAnswer <= 3 ? 6 : 4 // 小数字需要更多干扰项
  for (let i = 0; i < randomCount; i++) {
    const randomRangeMin = Math.max(0, correctAnswer - 5)
    const randomRangeMax = Math.min(20, correctAnswer + 5)
    const randomVal = getRandomInt(randomRangeMin, randomRangeMax)
    if (randomVal !== correctAnswer) {
      candidates.push(randomVal)
    }
  }

  // 去重并打乱
  const uniqueCandidates = [...new Set(candidates)].filter(x => x !== correctAnswer)
  shuffleArray(uniqueCandidates)
  
  // 添加到选项中
  for (const candidate of uniqueCandidates) {
    if (!options.has(candidate)) {
      options.add(candidate)
    }
    if (options.size >= count) break
  }

  // 如果还不够，继续添加随机数
  while (options.size < count) {
    const fallback = getRandomInt(0, 20)
    options.add(fallback)
  }

  return shuffleArray(Array.from(options))
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function generateAdditionQuestion(config) {
  const num1 = getRandomInt(1, 5)
  const num2 = getRandomInt(1, 5)
  const answer = num1 + num2

  return {
    sceneId: config.id,
    type: config.type,
    operator: config.operator,
    num1,
    num2,
    answer,
    blankPosition: null,
    icon: config.icon,
    iconName: config.iconName,
    questionText: `帮小松鼠数一数，树上原来有${num1}个松果，它又找到了${num2}个，现在一共有多少个松果呢？`,
    displayFormula: `${generateIconDisplay(num1, config.icon)} + ${generateIconDisplay(num2, config.icon)} = ?`,
    options: generateOptions(answer),
    hint: '数一数所有的松果'
  }
}

function generateSubtractionQuestion(config) {
  const num1 = getRandomInt(3, 10)
  const num2 = getRandomInt(1, num1 - 1)
  const answer = num1 - num2

  return {
    sceneId: config.id,
    type: config.type,
    operator: config.operator,
    num1,
    num2,
    answer,
    blankPosition: null,
    icon: config.icon,
    iconName: config.iconName,
    questionText: `池塘里有${num1}只小鸭子，游走了${num2}只，还剩几只呢？`,
    displayFormula: `${generateIconDisplay(num1, config.icon)} - ${generateIconDisplay(num2, config.icon)} = ?`,
    options: generateOptions(answer),
    hint: '数一数剩下的小鸭子'
  }
}

function generateFillBlankQuestion(config) {
  const formA = Math.random() < 0.5

  if (formA) {
    // 形式 A: ? + num2 = answer，求 num1
    const num1 = getRandomInt(1, 5)
    const num2 = getRandomInt(1, 5)
    const answer = num1 + num2
    const correctOption = num1 // 正确答案是 num1

    return {
      sceneId: config.id,
      type: config.type,
      operator: config.operator,
      num1,
      num2,
      answer,
      correctAnswer: correctOption, // 真正的正确答案
      blankPosition: 'num1',
      icon: config.icon,
      iconName: config.iconName,
      questionText: `小熊的蜂蜜罐里有一些蜂蜜，又加入了${num2}罐，现在一共有${answer}罐，原来有几罐呢？`,
      displayFormula: `? + ${generateIconDisplay(num2, config.icon)} = ${generateIconDisplay(answer, config.icon)}`,
      options: generateOptions(correctOption), // 使用正确答案生成选项
      hint: `从${answer}里面减去${num2}就是原来的数量`
    }
  } else {
    // 形式 B: num1 + ? = answer，求 num2
    const num1 = getRandomInt(1, 5)
    const answer = getRandomInt(num1 + 1, Math.min(10, num1 + 5))
    const num2 = answer - num1
    const correctOption = num2 // 正确答案是 num2

    return {
      sceneId: config.id,
      type: config.type,
      operator: config.operator,
      num1,
      num2,
      answer,
      correctAnswer: correctOption, // 真正的正确答案
      blankPosition: 'num2',
      icon: config.icon,
      iconName: config.iconName,
      questionText: `小熊原来有${num1}罐蜂蜜，现在一共有${answer}罐，又加入了几罐呢？`,
      displayFormula: `${generateIconDisplay(num1, config.icon)} + ? = ${generateIconDisplay(answer, config.icon)}`,
      options: generateOptions(correctOption), // 使用正确答案生成选项
      hint: `从${answer}里面减去${num1}就是加入的数量`
    }
  }
}

// 生成 10 以内的数学题目（根据场景决定运算类型）
export function generateQuestion(sceneId) {
  const config = SCENE_CONFIGS[sceneId]
  if (!config) {
    throw new Error(`未知场景 ID: ${sceneId}`)
  }

  // 小松鼠（加法场景）只做加法，小鸭子（减法场景）只做减法
  if (sceneId === 'addition') {
    return generateAdditionQuestion(config)
  } else if (sceneId === 'subtraction') {
    return generateSubtractionQuestion(config)
  } else {
    // 小熊的蜂蜜罐（填空场景）做加法填空
    return generateFillBlankQuestion(config)
  }
}

// 生成 10 以上、50 以内的数学题目（根据场景决定运算类型）
export function generateQuestionAdvanced(sceneId) {
  const config = SCENE_CONFIGS[sceneId]
  if (!config) {
    throw new Error(`未知场景 ID: ${sceneId}`)
  }

  // 小松鼠（加法场景）只做加法，小鸭子（减法场景）只做减法
  if (sceneId === 'addition') {
    return generateAdditionQuestionAdvanced(config)
  } else if (sceneId === 'subtraction') {
    return generateSubtractionQuestionAdvanced(config)
  } else {
    // 小熊的蜂蜜罐（填空场景）做加法填空
    return generateFillBlankQuestionAdvanced(config)
  }
}

// 生成 20 以内的数学题目（根据场景决定运算类型）
export function generateQuestion20(sceneId) {
  const config = SCENE_CONFIGS[sceneId]
  if (!config) {
    throw new Error(`未知场景 ID: ${sceneId}`)
  }

  // 小松鼠（加法场景）只做加法，小鸭子（减法场景）只做减法
  if (sceneId === 'addition') {
    return generateAdditionQuestion20(config)
  } else if (sceneId === 'subtraction') {
    return generateSubtractionQuestion20(config)
  } else {
    // 小熊的蜂蜜罐（填空场景）做加法填空
    return generateFillBlankQuestion20(config)
  }
}

// 20 以内的加法题
function generateAdditionQuestion20(config) {
  const num1 = getRandomInt(5, 15)
  const num2 = getRandomInt(5, 20 - num1) // 确保和不超过 20
  const answer = num1 + num2

  return {
    sceneId: config.id,
    type: config.type,
    operator: config.operator,
    num1,
    num2,
    answer,
    blankPosition: null,
    icon: config.icon,
    iconName: config.iconName,
    questionText: `帮小松鼠数一数，树上原来有${num1}个松果，它又找到了${num2}个，现在一共有多少个松果呢？`,
    displayFormula: `${num1} + ${num2} = ?`,
    options: generateOptionsAdvanced(answer),
    hint: '数一数所有的松果'
  }
}

// 20 以内的减法题
function generateSubtractionQuestion20(config) {
  const num1 = getRandomInt(10, 20)
  const num2 = getRandomInt(5, num1 - 1)
  const answer = num1 - num2

  return {
    sceneId: config.id,
    type: config.type,
    operator: config.operator,
    num1,
    num2,
    answer,
    blankPosition: null,
    icon: config.icon,
    iconName: config.iconName,
    questionText: `池塘里有${num1}只小鸭子，游走了${num2}只，还剩几只呢？`,
    displayFormula: `${num1} - ${num2} = ?`,
    options: generateOptionsAdvanced(answer),
    hint: '数一数剩下的小鸭子'
  }
}

// 20 以内的填空题
function generateFillBlankQuestion20(config) {
  const formA = Math.random() < 0.5

  if (formA) {
    // 形式 A: ? + num2 = answer，求 num1
    const num1 = getRandomInt(5, 15)
    const num2 = getRandomInt(5, 20 - num1)
    const answer = num1 + num2
    const correctOption = num1

    return {
      sceneId: config.id,
      type: config.type,
      operator: config.operator,
      num1,
      num2,
      answer,
      correctAnswer: correctOption,
      blankPosition: 'num1',
      icon: config.icon,
      iconName: config.iconName,
      questionText: `小熊的蜂蜜罐里有一些蜂蜜，又加入了${num2}罐，现在一共有${answer}罐，原来有几罐呢？`,
      displayFormula: `? + ${num2} = ${answer}`,
      options: generateOptionsAdvanced(correctOption),
      hint: `从${answer}里面减去${num2}就是原来的数量`
    }
  } else {
    // 形式 B: num1 + ? = answer，求 num2
    const num1 = getRandomInt(5, 15)
    const answer = getRandomInt(num1 + 5, Math.min(20, num1 + 15))
    const num2 = answer - num1
    const correctOption = num2

    return {
      sceneId: config.id,
      type: config.type,
      operator: config.operator,
      num1,
      num2,
      answer,
      correctAnswer: correctOption,
      blankPosition: 'num2',
      icon: config.icon,
      iconName: config.iconName,
      questionText: `小熊原来有${num1}罐蜂蜜，现在一共有${answer}罐，又加入了几罐呢？`,
      displayFormula: `${num1} + ? = ${answer}`,
      options: generateOptionsAdvanced(correctOption),
      hint: `从${answer}里面减去${num1}就是加入的数量`
    }
  }
}

// 10 以上、50 以内的加法题
function generateAdditionQuestionAdvanced(config) {
  const num1 = getRandomInt(10, 30)
  const num2 = getRandomInt(10, 50 - num1) // 确保和不超过 50
  const answer = num1 + num2

  return {
    sceneId: config.id,
    type: config.type,
    operator: config.operator,
    num1,
    num2,
    answer,
    blankPosition: null,
    icon: config.icon,
    iconName: config.iconName,
    questionText: `帮小松鼠数一数，树上原来有${num1}个松果，它又找到了${num2}个，现在一共有多少个松果呢？`,
    displayFormula: `${num1} + ${num2} = ?`,
    options: generateOptionsAdvanced(answer),
    hint: '数一数所有的松果'
  }
}

// 10 以上、50 以内的减法题
function generateSubtractionQuestionAdvanced(config) {
  const num1 = getRandomInt(20, 50)
  const num2 = getRandomInt(10, num1 - 1)
  const answer = num1 - num2

  return {
    sceneId: config.id,
    type: config.type,
    operator: config.operator,
    num1,
    num2,
    answer,
    blankPosition: null,
    icon: config.icon,
    iconName: config.iconName,
    questionText: `池塘里有${num1}只小鸭子，游走了${num2}只，还剩几只呢？`,
    displayFormula: `${num1} - ${num2} = ?`,
    options: generateOptionsAdvanced(answer),
    hint: '数一数剩下的小鸭子'
  }
}

// 10 以上、50 以内的填空题
function generateFillBlankQuestionAdvanced(config) {
  const formA = Math.random() < 0.5

  if (formA) {
    // 形式 A: ? + num2 = answer，求 num1
    const num1 = getRandomInt(10, 30)
    const num2 = getRandomInt(10, 50 - num1)
    const answer = num1 + num2
    const correctOption = num1

    return {
      sceneId: config.id,
      type: config.type,
      operator: config.operator,
      num1,
      num2,
      answer,
      correctAnswer: correctOption,
      blankPosition: 'num1',
      icon: config.icon,
      iconName: config.iconName,
      questionText: `小熊的蜂蜜罐里有一些蜂蜜，又加入了${num2}罐，现在一共有${answer}罐，原来有几罐呢？`,
      displayFormula: `? + ${num2} = ${answer}`,
      options: generateOptionsAdvanced(correctOption),
      hint: `从${answer}里面减去${num2}就是原来的数量`
    }
  } else {
    // 形式 B: num1 + ? = answer，求 num2
    const num1 = getRandomInt(10, 30)
    const answer = getRandomInt(num1 + 10, Math.min(50, num1 + 30))
    const num2 = answer - num1
    const correctOption = num2 // 正确答案是 num2

    return {
      sceneId: config.id,
      type: config.type,
      operator: config.operator,
      num1,
      num2,
      answer,
      correctAnswer: correctOption, // 真正的正确答案
      blankPosition: 'num2',
      icon: config.icon,
      iconName: config.iconName,
      questionText: `小熊原来有${num1}罐蜂蜜，现在一共有${answer}罐，又加入了几罐呢？`,
      displayFormula: `${num1} + ? = ${answer}`,
      options: generateOptionsAdvanced(correctOption), // 使用正确答案生成选项
      hint: `从${answer}里面减去${num1}就是加入的数量`
    }
  }
}

// 为 10-50 范围生成选项
function generateOptionsAdvanced(correctAnswer, count = 4) {
  const options = new Set([correctAnswer])
  const candidates = []

  // 添加接近正确答案的干扰项
  if (correctAnswer - 1 >= 10) candidates.push(correctAnswer - 1)
  if (correctAnswer + 1 <= 50) candidates.push(correctAnswer + 1)
  if (correctAnswer - 2 >= 10) candidates.push(correctAnswer - 2)
  if (correctAnswer + 2 <= 50) candidates.push(correctAnswer + 2)
  if (correctAnswer - 5 >= 10) candidates.push(correctAnswer - 5)
  if (correctAnswer + 5 <= 50) candidates.push(correctAnswer + 5)
  
  // 添加一些随机干扰项
  for (let i = 0; i < 8; i++) {
    const randomRangeMin = Math.max(10, correctAnswer - 10)
    const randomRangeMax = Math.min(50, correctAnswer + 10)
    const randomVal = getRandomInt(randomRangeMin, randomRangeMax)
    if (randomVal !== correctAnswer) {
      candidates.push(randomVal)
    }
  }

  // 去重并打乱
  const uniqueCandidates = [...new Set(candidates)].filter(x => x !== correctAnswer)
  shuffleArray(uniqueCandidates)
  
  // 添加到选项中
  for (const candidate of uniqueCandidates) {
    if (!options.has(candidate)) {
      options.add(candidate)
    }
    if (options.size >= count) break
  }

  // 如果还不够，继续添加随机数
  while (options.size < count) {
    const fallback = getRandomInt(10, 50)
    options.add(fallback)
  }

  return shuffleArray(Array.from(options))
}
