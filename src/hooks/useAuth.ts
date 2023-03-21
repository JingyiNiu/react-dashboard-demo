import { useState, useEffect } from 'react';
import axiosClient from '../axios.config';
import { getItemInLocalStorage, removeItemFromLocalStorage } from '../utils/utils';

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const TOKEN_KEY = process.env.REACT_APP_LOCAL_TOKEN || 'token';

    useEffect(() => {
        const token = getItemInLocalStorage(TOKEN_KEY);

        const API_END_POINT = '/api/user';

        if (token) {
            setIsLoggedIn(true);
            axiosClient
                .get(API_END_POINT)
                .then((res) => {
                    setIsLoggedIn(true);
                })
                .catch((err) => {
                    removeItemFromLocalStorage(TOKEN_KEY);
                });
        } else {
            removeItemFromLocalStorage(TOKEN_KEY);
        }
    }, [TOKEN_KEY]);

    return isLoggedIn;
}
