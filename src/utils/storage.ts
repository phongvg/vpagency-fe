const STORAGE_PREFIX = 'vpagency_'

class LocalStorageUtils {
  static getStorageKey(key: string) {
    return `${STORAGE_PREFIX}${key}`
  }

  static setItem(key: string, value: string) {
    localStorage.setItem(this.getStorageKey(key), value)
  }

  static getItem(key: string) {
    return localStorage.getItem(this.getStorageKey(key))
  }

  static removeItem(key: string) {
    localStorage.removeItem(this.getStorageKey(key))
  }

  static clearStorage() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
  }
}

export default LocalStorageUtils
