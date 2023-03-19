import axios from 'axios';
/*import {useCounterStore} from "../store/token.js"*/
const service = axios.create({
    timeout: 5000
});

/*service.interceptors.request.use(
    (config) => {
        if(!config.headers){
            config.headers = {} as AxiosRequestHeaders
        }
        const store=useCounterStore();
        config.headers.Authorization=store.token.access_token || "123";
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject();
    }
);*/
service.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
/*service.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return response;
        } else {
            Promise.reject();
        }
    },
    (error) => {
        console.log(error);
        return Promise.reject();
    }
);*/

service.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // console.log(response.headers)
    const {authorization } = response.headers
    authorization && localStorage.setItem("token",authorization)
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const {status} = error.response
    if(status===401){
        localStorage.removeItem("token")
        window.location.href="#/login"
    }
    return Promise.reject(error);
});


export default service;