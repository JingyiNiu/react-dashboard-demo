import axiosClient from '../axios.config';
import { removeItemFromLocalStorage, TOKEN_KEY } from '../utils/utils';

const API_END_POINT = '/api/admin/validate';

export function validateAdmin() {
    axiosClient.get(API_END_POINT).catch((err) => {
        removeItemFromLocalStorage(TOKEN_KEY);
        window.location.replace('/login');
    });
}
