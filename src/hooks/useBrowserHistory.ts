export type BrowserHistoryEntry = {
  url: string
  dateAdded: string
}

const STORAGE_KEY = 'ohes_browser_history'

export const useBrowserHistory = () => {
  const addEntry = (url: string) => {
    const dateAdded = new Date().toISOString()
    const historyEntry: BrowserHistoryEntry = { url, dateAdded }
    addLocalStorageEntry<BrowserHistoryEntry>(STORAGE_KEY, historyEntry)
  }

  const getHistory = () => {
    return getLocalStorageEntry<BrowserHistoryEntry>(STORAGE_KEY)
  }

  return { addEntry, getHistory }
}

// TODO: Move to shared util
function addLocalStorageEntry<T>(key: string, data: T) {
  const existingData = window.localStorage.getItem(key)

  let newDataSet
  if (existingData) {
    const existingDataSet = JSON.parse(existingData)
    newDataSet = [data, ...existingDataSet]
  } else {
    newDataSet = [data]
  }

  localStorage.setItem(key, JSON.stringify(newDataSet))
}

function getLocalStorageEntry<T>(key: string): T[] {
  const data = window.localStorage.getItem(key)

  if (data) {
    return JSON.parse(data)
  }

  return []
}
