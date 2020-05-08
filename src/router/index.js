import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// hack router push callback
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err)
};

const LoginPage = r => require.ensure([], () => r(require('@components/LoginPage/LoginPage')));
const StagePage = r => require.ensure([], () => r(require('@components/StagePage/StagePage')));
const FirstStage = r => require.ensure([], () => r(require('@components/FirstStage/FirstStage')));
const Page404 = r => require.ensure([], () => r(require('@components/Page404/Page404')));
/* 一级二级路由配置示例 */
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/stage',
      name: 'StagePage',
      component: StagePage,
    },
    {
      path: '/stage1',
      name: 'FirstStage',
      component: FirstStage,
    },
    {
      path: '/404',
      name: 'Page404',
      component: Page404,
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
});