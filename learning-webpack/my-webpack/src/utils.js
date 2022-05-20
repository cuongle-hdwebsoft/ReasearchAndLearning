export function getCurrentLocation() {
  return window.location;
}

export function getPort() {
  return window.location.port;
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getLocalStorage(key) {
  localStorage.getItem(key);
}

export function clearLocalStorage() {
  localStorage.clear();
}