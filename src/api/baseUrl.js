'use strict';

/**
 * 接口域名的管理
 */
//设置分服务设置服务器地址，蒲公英地址:http://172.15.67.120:8082/，服务器:http://49.234.136.242:8082/
const serverBaseUrl = 'http://172.15.67.120:8082/';
const distributeUrl = {
  // 用户信息
  serverBaseController: serverBaseUrl,
  tokensController: serverBaseUrl + 'tokens',
  userController: serverBaseUrl + 'user',
  wishTreeController: serverBaseUrl + 'wishTree',
};

export default distributeUrl;
