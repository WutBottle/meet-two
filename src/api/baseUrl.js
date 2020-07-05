'use strict';

/**
 * 接口域名的管理
 */
//设置分服务设置服务器地址，蒲公英地址:http://172.15.67.120:8083/，服务器:http://139.155.1.150:8083/
const serverBaseUrl = 'http://139.155.1.150:8083/';
const distributeUrl = {
  // 用户信息
  serverBaseController: serverBaseUrl,
  tokensController: serverBaseUrl + 'tokens',
  userController: serverBaseUrl + 'user',
  wishTreeController: serverBaseUrl + 'wishTree',
  taskController: serverBaseUrl + 'task',
  messageController: serverBaseUrl + 'message',
};

export default distributeUrl;
