type StorageKey = "auth" | "email" | "password";

const storage = {
  get(key: StorageKey) {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    return JSON.parse(value); // Aseguramos que devolvemos el valor parseado si es un objeto
  },

  set(key: StorageKey, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key: StorageKey) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};

export default storage;
