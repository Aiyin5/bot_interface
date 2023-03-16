import request from '../utils/request';

export const fetchData = () => {
    return request({
        url: './table.json',
        method: 'get'
    });
};

export const login = (loginInfo) => {
    return request({
        url: '/app/user/login',
        method: 'POST',
        data:loginInfo
    });
};
export const register = (registerInfo) => {
    return request({
        url: '/app/user/login',
        method: 'POST',
        data:registerInfo
    });
};