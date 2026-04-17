export function getStorage(key) {
  try {
    const value = localStorage.getItem(key)
    if (value === null) return null
    return JSON.parse(value)
  } catch {
    return null
  }
}

export function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}
