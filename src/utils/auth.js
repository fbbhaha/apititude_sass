import ccit from '@/utils/ccit'

export function getToken() {
  return ccit.storageGet('token')
}

export function setToken(token) {
  return ccit.storageSet({ token })
}

export function removeToken() {
  return ccit.storageRemove('token')
}

export function getLock() {
  return ccit.storageGet('lock')
}

export function setLock(lock) {
  return ccit.storageSet({ lock })
}
export function removeLock() {
  return ccit.storageRemove('lock')
}

export function getParentEvent() {
  return ccit.storageGet('parentEvent')
}
export function setParentEvent(parentEvent) {
  return ccit.storageSet({ parentEvent })
}
export function removeParentEvent() {
  return ccit.storageRemove('parentEvent')
}