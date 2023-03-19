import request from '../utils/request';

export const getPreInfo = (bot_id) => {
    return request({
        url: '/app/app/bot/getPreInfo',
        method: 'POST',
        data:bot_id
    });
};

export const addPreInfo = (unstInfo) => {
    return request({
        url: '/app/app/bot/addPreInfo',
        method: 'POST',
        data:unstInfo
    });
};
export const addMultPreInfo = (unstInfos) => {
    return request({
        url: '/app/app/bot/addMultPreInfo',
        method: 'POST',
        data:unstInfos
    });
};

export const deletPreInfo = (unstInfo) => {
    return request({
        url: '/app/app/bot/deletPreInfo',
        method: 'POST',
        data:unstInfo
    });
};

export const updatePreInfo = (unstInfo) => {
    return request({
        url: '/app/app/bot/updatePreInfo',
        method: 'POST',
        data:unstInfo
    });
};

export const getUnstInfo = (bot_id) => {
    return request({
        url: '/app/app/bot/getUnstInfo',
        method: 'POST',
        data:bot_id
    });
};

export const addUnstInfo = (unstInfo) => {
    return request({
        url: '/app/app/bot/addUnstInfo',
        method: 'POST',
        data:unstInfo
    });
};

export const updateUnstInfo = (unstInfo) => {
    return request({
        url: '/app/app/bot/updateUnstInfo',
        method: 'POST',
        data:unstInfo
    });
};
