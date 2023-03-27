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

export const showTextLength = (text: string = '', length: number = 0) => {
    const result = text.length < length ? text : text.slice(0, length) + '...';
    return result;
};

export const capitalizeText = (text: string) => {
    const result = text.charAt(0).toUpperCase() + text.slice(1);
    return result;
};
