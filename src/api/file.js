import request from '../utils/request';
import {} from "@/api";
export const fileInfo = (bot_id) => {
    return request({
        url: '/app/app/file/botfile',
        method: 'POST',
        data:bot_id
    });
};

export const updateBotInfo = (fileInfo) => {
    return request({
        url: '/app/app/file/creat',
        method: 'POST',
        data:fileInfo
    });
};
export const addFileInfo = (fileInfo) => {
    return request({
        url: '/app/app/file/creat',
        method: 'POST',
        data:fileInfo
    });
};

export const deleteFileInfo = (fileInfo) => {
    return request({
        url: '/app/app/file/deleteFile',
        method: 'POST',
        data:fileInfo
    });
};
