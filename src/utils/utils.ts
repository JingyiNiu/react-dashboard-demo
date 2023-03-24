export const setItemInLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
};

export const getItemInLocalStorage = (key: string) => {
    return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key: string) => {
    return localStorage.removeItem(key);
};

export const formatDate = (date: any) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const outputDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    return outputDate;
};

export const TOKEN_KEY = process.env.REACT_APP_LOCAL_TOKEN || 'token';
