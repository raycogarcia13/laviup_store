import axios from 'axios'
import localStorageUtil from "../utils/storage"

// const base_uri = 'http://192.168.211.245:4000/api/v1'
const base_uri = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api/v1' : 'http://localhost:4000/api/v1'
const public_uri = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/' : 'http://localhost:4000/'


let api_security = axios.create({ baseURL: base_uri});
api_security.defaults.withCredentials = true;
api_security.defaults.headers.common['Authorization'] = localStorageUtil.getToken();

let api = axios.create({ baseURL: base_uri});
api.defaults.withCredentials = true;
api.defaults.headers.common['Authorization'] = localStorageUtil.getToken();


api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        alert('Sesión expirada')
        localStorageUtil.clearToken();
        localStorageUtil.clear('user');
        window.location.reload();

    } else {
        return Promise.reject(error);
    }
});

export {
    api_security,
    api,
    base_uri,
    public_uri
};