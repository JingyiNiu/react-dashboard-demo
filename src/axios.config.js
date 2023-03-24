import axios from 'axios';
import { getItemInLocalStorage, TOKEN_KEY } from './utils/utils';

const baseURL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({
    baseURL,
    headers: {
        'x-auth-token': getItemInLocalStorage(TOKEN_KEY),
    },
});

export default axiosClient;
