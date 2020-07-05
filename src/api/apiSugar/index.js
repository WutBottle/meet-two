/**
 * api接口的统一出口
 */
import tokensController from './tokensController';
import userController from './userController';
import wishTreeController from './wishTreeController';
import taskController from "./taskController";
import messageController from "./messageController";
import redeemController from "./redeemController";

// 导出接口
export default {
  tokensController: tokensController,// 登录管理
  userController: userController, // 用户管理
  wishTreeController: wishTreeController, // 许愿树管理
  taskController: taskController, // 任务打卡管理
  messageController: messageController, // 留言管理
  redeemController: redeemController, // 积分兑换管理
}
