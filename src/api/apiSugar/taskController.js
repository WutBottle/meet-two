/*
 * 任务接口管理
 * By ZP
 */

'use strict';
import axios from '../axiosServices';
import baseUrl from '../baseUrl'; // 导入接口域名列表

const taskController = {
  // 获取任务接口
  getTaskListByUserId(params) {
    return axios.post(`${baseUrl.taskController}/getTaskListByUserId`, params);
  },
  // 添加任务接口
  addTask(params) {
    return axios.post(`${baseUrl.taskController}/addTask`, params);
  },
  // 完成打卡任务接口
  punch(params) {
    return axios.post(`${baseUrl.taskController}/punch`, params);
  },
  // 根据时间获取打卡记录
  getPunchRecordsByDate(params) {
    return axios.post(`${baseUrl.taskController}/getPunchRecordsByDate`, params);
  },
};

export default taskController;
