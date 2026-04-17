import { getStorage, setStorage, removeStorage } from '../utils/storage'

const STORAGE_KEY = 'selectedAvatar'

export function useAvatar() {
  function getAvatar() {
    return getStorage(STORAGE_KEY)
  }

  function saveAvatar(avatar) {
    return setStorage(STORAGE_KEY, avatar)
  }

  function hasAvatar() {
    return getAvatar() !== null
  }

  function clearAvatar() {
    return removeStorage(STORAGE_KEY)
  }

  return {
    getAvatar,
    saveAvatar,
    hasAvatar,
    clearAvatar
  }
}
