import { getItemInLocalStorage } from './../utils/utils';
import jwt_decode from 'jwt-decode';
import axiosClient from '../axios.config';
import { removeItemFromLocalStorage, TOKEN_KEY } from '../utils/utils';

const API_END_POINT = '/api/admin/validate';

export function validateAdmin() {
    axiosClient.get(API_END_POINT).catch((err) => {
        removeItemFromLocalStorage(TOKEN_KEY);
        window.location.replace('/login');
    });
}

export function checkToken() {
    const jwtToken = getItemInLocalStorage(TOKEN_KEY);

    if (!jwtToken) {
        removeItemFromLocalStorage(TOKEN_KEY);
        window.location.replace('/login');
    } else {
        const decodedToken: { exp?: number } = jwt_decode(jwtToken);
        const { exp } = decodedToken ?? { exp: 0 };
        const isExpired = exp && exp < Date.now() / 1000;
        if (isExpired) {
            removeItemFromLocalStorage(TOKEN_KEY);
            window.location.replace('/login');
        }
    }
}
