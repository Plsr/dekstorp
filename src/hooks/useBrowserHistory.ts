type BrowserHistoryEntry = {
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

  return { addEntry }
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
