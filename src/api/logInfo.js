import request from '../utils/request';

export const getLogInfo = (bot_id) => {
    return request({
        url: '/app/app/log/botId',
        method: 'POST',
        data:bot_id
    });
};