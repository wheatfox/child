/**
 * 奇妙英语角 - 发音服务
 * 使用 Web Speech API 实现英文和中文语音合成
 * 预留真人发音接口
 */

class EnglishAudioService {
  constructor() {
    this.synth = window.speechSynthesis
    this.voices = []
    this.isInitialized = false
    this.onReadyCallbacks = []
    
    // 初始化语音
    this.initVoices()
  }
  
  /**
   * 初始化语音列表
   */
  initVoices() {
    // 如果语音已经加载完成
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices()
        this.isInitialized = true
        this.executeReadyCallbacks()
      }
    }
    
    // 立即尝试获取语音（某些浏览器）
    this.voices = this.synth.getVoices()
    if (this.voices.length > 0) {
      this.isInitialized = true
      this.executeReadyCallbacks()
    }
  }
  
  /**
   * 执行就绪回调
   */
  executeReadyCallbacks() {
    this.onReadyCallbacks.forEach(callback => callback())
    this.onReadyCallbacks = []
  }
  
  /**
   * 注册就绪回调
   * @param {Function} callback - 语音加载完成后的回调
   */
  onReady(callback) {
    if (this.isInitialized) {
      callback()
    } else {
      this.onReadyCallbacks.push(callback)
    }
  }
  
  /**
   * 获取合适的语音
   * @param {string} lang - 语言代码：'en-US' 或 'zh-CN'
   * @returns {SpeechSynthesisVoice|null}
   */
  getVoice(lang) {
    if (!this.voices || this.voices.length === 0) {
      return null
    }
    
    // 优先查找匹配的语音
    let voice = this.voices.find(v => v.lang.includes(lang))
    
    // 如果没有找到，尝试查找类似的语言
    if (!voice) {
      if (lang === 'en-US') {
        voice = this.voices.find(v => v.lang.includes('en'))
      } else if (lang === 'zh-CN') {
        voice = this.voices.find(v => v.lang.includes('zh') || v.lang.includes('CN'))
      }
    }
    
    return voice || null
  }
  
  /**
   * 播放语音
   * @param {string} text - 要播放的文本
   * @param {string} lang - 语言代码：'en-US' 或 'zh-CN'
   * @param {Object} options - 选项：rate, pitch, volume
   * @param {Function} onEnd - 播放结束回调
   */
  speak(text, lang = 'en-US', options = {}, onEnd = null) {
    if (!this.synth) {
      console.warn('浏览器不支持语音合成')
      if (onEnd) onEnd()
      return
    }
    
    // 取消当前正在播放的语音
    this.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    
    // 设置语言
    utterance.lang = lang
    
    // 设置语音
    const voice = this.getVoice(lang)
    if (voice) {
      utterance.voice = voice
    }
    
    // 设置参数（适合幼儿的语速和音调）
    utterance.rate = options.rate || 0.8  // 稍慢的语速
    utterance.pitch = options.pitch || 1.0  // 正常音调
    utterance.volume = options.volume || 1.0  // 正常音量
    
    // 播放结束回调
    if (onEnd) {
      utterance.onend = onEnd
    }
    
    // 开始播放
    this.synth.speak(utterance)
  }
  
  /**
   * 播放英文
   * @param {string} text - 英文文本
   * @param {Object} options - 选项
   * @param {Function} onEnd - 播放结束回调
   */
  speakEnglish(text, options = {}, onEnd = null) {
    this.speak(text, 'en-US', options, onEnd)
  }
  
  /**
   * 播放中文
   * @param {string} text - 中文文本
   * @param {Object} options - 选项
   * @param {Function} onEnd - 播放结束回调
   */
  speakChinese(text, options = {}, onEnd = null) {
    this.speak(text, 'zh-CN', options, onEnd)
  }
  
  /**
   * 播放完整单词（英文 + 中文）
   * @param {string} enText - 英文
   * @param {string} zhText - 中文
   * @param {Function} onEnd - 全部播放结束回调
   */
  speakWord(enText, zhText, onEnd = null) {
    this.speakEnglish(enText, {}, () => {
      // 英文播放完后，停顿 0.5 秒再播放中文
      setTimeout(() => {
        this.speakChinese(zhText, {}, onEnd)
      }, 500)
    })
  }
  
  /**
   * 跟读模式：提示音 + 英文
   * @param {string} enText - 英文
   * @param {Function} onEnd - 播放结束回调
   */
  speakForRepeat(enText, onEnd = null) {
    // 播放提示音"跟我读"
    this.speakChinese('跟我读', { rate: 0.9 }, () => {
      setTimeout(() => {
        // 播放英文
        this.speakEnglish(enText, { rate: 0.7 }, onEnd)
      }, 800)
    })
  }
  
  /**
   * 播放鼓励语
   * @param {string} text - 鼓励语
   * @param {Function} onEnd - 播放结束回调
   */
  speakPraise(text, onEnd = null) {
    this.speakChinese(text, { rate: 0.9, pitch: 1.1 }, onEnd)
  }
  
  /**
   * 取消当前播放
   */
  cancel() {
    if (this.synth) {
      this.synth.cancel()
    }
  }
  
  /**
   * 暂停播放
   */
  pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause()
    }
  }
  
  /**
   * 恢复播放
   */
  resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume()
    }
  }
  
  /**
   * 是否正在播放
   * @returns {boolean}
   */
  isSpeaking() {
    return this.synth ? this.synth.speaking : false
  }
  
  /**
   * 播放真人发音（预留接口）
   * @param {string} audioUrl - 音频文件 URL
   * @param {Function} onEnd - 播放结束回调
   */
  playRealAudio(audioUrl, onEnd = null) {
    if (!audioUrl) {
      console.warn('未提供音频文件 URL')
      if (onEnd) onEnd()
      return
    }
    
    const audio = new Audio(audioUrl)
    
    if (onEnd) {
      audio.onended = onEnd
    }
    
    audio.play().catch(err => {
      console.error('播放音频失败:', err)
      if (onEnd) onEnd()
    })
  }
  
  /**
   * 播放单词（优先使用真人发音，否则使用语音合成）
   * @param {Object} word - 单词对象（包含 word, translation, audioUrl）
   * @param {Function} onEnd - 播放结束回调
   */
  playWord(word, onEnd = null) {
    // 如果有真人发音 URL，优先使用
    if (word.audioUrl) {
      this.playRealAudio(word.audioUrl, onEnd)
    } else {
      // 否则使用语音合成
      this.speakWord(word.word, word.translation, onEnd)
    }
  }
}

// 创建单例实例
const englishAudio = new EnglishAudioService()

// 导出工具函数
export function speakEnglish(text, options, onEnd) {
  return englishAudio.speakEnglish(text, options, onEnd)
}

export function speakChinese(text, options, onEnd) {
  return englishAudio.speakChinese(text, options, onEnd)
}

export function speakWord(enText, zhText, onEnd) {
  return englishAudio.speakWord(enText, zhText, onEnd)
}

export function speakForRepeat(enText, onEnd) {
  return englishAudio.speakForRepeat(enText, onEnd)
}

export function speakPraise(text, onEnd) {
  return englishAudio.speakPraise(text, onEnd)
}

export function cancel() {
  return englishAudio.cancel()
}

export function pause() {
  return englishAudio.pause()
}

export function resume() {
  return englishAudio.resume()
}

export function isSpeaking() {
  return englishAudio.isSpeaking()
}

export function onReady(callback) {
  return englishAudio.onReady(callback)
}

export function playRealAudio(audioUrl, onEnd) {
  return englishAudio.playRealAudio(audioUrl, onEnd)
}

export function playWord(word, onEnd) {
  return englishAudio.playWord(word, onEnd)
}

// 导出服务实例（用于访问高级功能）
export { englishAudio as EnglishAudio }
export default englishAudio
