const STORAGE_KEY = "marketplace_favourites";
const CURRENT_VERSION = 1;
const MAX_ITEMS = 200;
const CHANGED_EVENT = "favourites:changed";

const createEmptyStore = () => ({
  version: CURRENT_VERSION,
  updatedAt: new Date().toISOString(),
  items: [],
});

const isStorageAvailable = () => {
  if (typeof window === "undefined" || !window.localStorage) {
    return false;
  }
  try {
    const testKey = "__favourites_storage_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

const migrate = (raw) => {
  if (!raw || typeof raw !== "object") {
    return createEmptyStore();
  }

  if (Array.isArray(raw)) {
    return {
      version: CURRENT_VERSION,
      updatedAt: new Date().toISOString(),
      items: raw,
    };
  }

  if (!raw.version || raw.version < 1) {
    return {
      version: CURRENT_VERSION,
      updatedAt: new Date().toISOString(),
      items: Array.isArray(raw.items) ? raw.items : [],
    };
  }

  return {
    version: raw.version,
    updatedAt: raw.updatedAt || new Date().toISOString(),
    items: Array.isArray(raw.items) ? raw.items : [],
  };
};

const dispatchChanged = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new CustomEvent(CHANGED_EVENT));
};

const readStore = () => {
  if (!isStorageAvailable()) {
    return createEmptyStore();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createEmptyStore();
    }
    return migrate(JSON.parse(raw));
  } catch {
    return createEmptyStore();
  }
};

let memoryStore = createEmptyStore();

const getWritableStore = () => {
  if (isStorageAvailable()) {
    return readStore();
  }
  return memoryStore;
};

const persistStore = (store) => {
  const nextStore = {
    ...store,
    version: CURRENT_VERSION,
    updatedAt: new Date().toISOString(),
  };

  if (!isStorageAvailable()) {
    memoryStore = nextStore;
    dispatchChanged();
    return true;
  }

  const tryWrite = (items) => {
    const payload = { ...nextStore, items };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    dispatchChanged();
    return true;
  };

  try {
    return tryWrite(nextStore.items);
  } catch (error) {
    if (error?.name !== "QuotaExceededError" && error?.code !== 22) {
      return false;
    }

    let items = [...nextStore.items];
    while (items.length > 0) {
      items = items
        .slice()
        .sort(
          (a, b) => new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime()
        )
        .slice(1);

      try {
        return tryWrite(items);
      } catch (retryError) {
        if (
          retryError?.name !== "QuotaExceededError" &&
          retryError?.code !== 22
        ) {
          return false;
        }
      }
    }

    return false;
  }
};

const enforceLimit = (items) => {
  if (items.length <= MAX_ITEMS) {
    return items;
  }

  return items
    .slice()
    .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())
    .slice(0, MAX_ITEMS);
};

const writeItems = (items) => {
  const store = getWritableStore();
  return persistStore({ ...store, items: enforceLimit(items) });
};

const getAll = () => getWritableStore().items;

const isFavourited = (productId) =>
  getAll().some((item) => item.id === String(productId));

const add = (item) => {
  const id = String(item.id);
  if (isFavourited(id)) {
    return;
  }

  const items = getAll();
  writeItems([{ ...item, id }, ...items]);
};

const updateItem = (productId, patch) => {
  const id = String(productId);
  const items = getAll();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return;
  }

  const nextItems = [...items];
  nextItems[index] = { ...nextItems[index], ...patch };
  writeItems(nextItems);
};

const remove = (productId) => {
  const id = String(productId);
  writeItems(getAll().filter((item) => item.id !== id));
};

const toggle = (item) => {
  const id = String(item.id);
  if (isFavourited(id)) {
    remove(id);
    return false;
  }
  add(item);
  return true;
};

const exportAll = () => getWritableStore();

const clear = () => {
  if (isStorageAvailable()) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  memoryStore = createEmptyStore();
  dispatchChanged();
};

const favouritesService = {
  getAll,
  add,
  updateItem,
  remove,
  toggle,
  isFavourited,
  exportAll,
  clear,
};

export default favouritesService;
