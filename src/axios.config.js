import axios from 'axios';
import { getItemInLocalStorage } from './utils/utils';

const baseURL = process.env.REACT_APP_API_URL;
const TOKEN_KEY = process.env.REACT_APP_LOCAL_TOKEN || 'token';

const axiosClient = axios.create({
    baseURL,
    headers: {
        'x-auth-token': getItemInLocalStorage(TOKEN_KEY),
    },
});

export default axiosClient;
