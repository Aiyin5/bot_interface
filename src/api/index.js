import request from '../utils/request';


export const login = (loginInfo) => {
    return request({
        url: '/app/app/user/login',
        method: 'POST',
        data:loginInfo
    });
};
export const register = (registerInfo) => {
    return request({
        url: '/app/app/user/register',
        method: 'POST',
        data:registerInfo
    });
};
export const membersFind = (where) => {
    return request({
        url: '/app/app/user/botUser',
        method: 'POST',
        data:where
    });
};
export const botInfo = (bot_id) => {
    return request({
        url: '/app/app/bot/bot',
        method: 'POST',
        data:bot_id
    });
};

export const updateBotInfo = (botInfo) => {
    return request({
        url: '/app/app/bot/updateBotInfo',
        method: 'POST',
        data:botInfo
    });
};
