// Local Storage Service
class StorageService {
  // Save data
  set(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }

  // Get data
  get(key) {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) return null;
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  // Remove data
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  }

  // Clear all data
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  // Check if key exists
  has(key) {
    return localStorage.getItem(key) !== null;
  }

  // Get all keys
  keys() {
    return Object.keys(localStorage);
  }
}

export default new StorageService();
