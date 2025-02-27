const getSessionStorageItem = (itemName: string) =>
  JSON.parse(sessionStorage.getItem(itemName));

const setSessionStorageItem = (itemName: string, item: any) =>
  sessionStorage.setItem(itemName, JSON.stringify(item));

export { setSessionStorageItem, getSessionStorageItem };
