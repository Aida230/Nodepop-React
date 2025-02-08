type StorageKey = "auth";

const storage = {
  get(key: StorageKey) {
    const value = localStorage.getItem(key);

    if (!value) {
      return null;
    }
    return value;
    //esto seria para devolver objetosJSON.parse(value);
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
