const STORAGE_PREFIX = 'vpagency_'

export const localStorageUtils = {
  getStorageKey(key: string) {
    return `${STORAGE_PREFIX}${key}`
  },

  setItem(key: string, value: string) {
    localStorage.setItem(this.getStorageKey(key), value)
  },

  getItem(key: string) {
    return localStorage.getItem(this.getStorageKey(key))
  },

  removeItem(key: string) {
    localStorage.removeItem(this.getStorageKey(key))
  },

  clearStorage() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
  },
}
