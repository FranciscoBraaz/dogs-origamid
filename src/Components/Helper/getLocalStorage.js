export function getLocalStorage(key, initialState) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch {
    return initialState;
  }
}
