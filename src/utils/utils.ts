export const setItemInLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
};

export const getItemInLocalStorage = (key: string) => {
    return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key: string) => {
    return localStorage.removeItem(key);
};
