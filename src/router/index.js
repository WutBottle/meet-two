import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
import {ENVIRONMENT} from '@store/mutation-types';

// hack router push callback
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err)
};

const Pc = r => require.ensure([], () => r(require('@components/Pc/Pc')));
const LoginPage = r => require.ensure([], () => r(require('@components/Pc/LoginPage/LoginPage')));
const StagePage = r => require.ensure([], () => r(require('@components/Pc/StagePage/StagePage')));
const FirstStage = r => require.ensure([], () => r(require('@components/Pc/FirstStage/FirstStage')));

const Mobile = r => require.ensure([], () => r(require('@components/Mobile/Mobile')));
const MLoginPage = r => require.ensure([], () => r(require('@components/Mobile/LoginPage/LoginPage')));
const MStagePage = r => require.ensure([], () => r(require('@components/Mobile/StagePage/StagePage')));
const MFirstPage = r => require.ensure([], () => r(require('@components/Mobile/FirstPage/FirstPage')));
const MAdminPage = r => require.ensure([], () => r(require('@components/Mobile/AdminPage/AdminPage')));
const MTestPage = r => require.ensure([], () => r(require('@components/Mobile/TestPage/TestPage')));
const MEvaluatePage = r => require.ensure([], () => r(require('@components/Mobile/EvaluatePage/EvaluatePage')));
const MLikeList = r => require.ensure([], () => r(require('@components/Mobile/EvaluatePage/LikeList/LikeList')));
const MWishPage = r => require.ensure([], () => r(require('@components/Mobile/WishPage/WishPage')));
const MResultPage = r => require.ensure([], () => r(require('@components/Mobile/ResultPage/ResultPage')));
const MTaskPage = r => require.ensure([], () => r(require('@components/Mobile/TaskPage/TaskPage')));


const Page404 = r => require.ensure([], () => r(require('@components/Page404/Page404')));

/* 一级二级路由配置示例 */
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: localStorage.getItem(ENVIRONMENT) === 'true' ? '/mobile/stage' : '/pc/stage',
    },
    {
      path: '/pc',
      component: Pc,
      children: [{
        path: 'login',
        name: 'LoginPage',
        component: LoginPage,
      }, {
        path: 'stage',
        name: 'StagePage',
        component: StagePage,
      }, {
        path: 'stage1',
        name: 'FirstStage',
        component: FirstStage,
      }],
    },
    {
      path: '/mobile',
      component: Mobile,
      children: [{
        path: 'login',
        name: 'MLoginPage',
        component: MLoginPage,
      }, {
        path: 'stage',
        name: 'MStagePage',
        component: MStagePage,
      }, {
        path: 'stage1',
        name: 'MFirstPage',
        component: MFirstPage,
      }, {
        path: 'admin',
        name: 'MAdmin',
        component: MAdminPage,
      }, {
        path: 'test',
        name: 'MTest',
        component: MTestPage,
      }, {
        path: 'evaluate',
        name: 'MEvaluatePage',
        component: MEvaluatePage,
      }, {
        path: 'likeList',
        name: 'MLikeList',
        component: MLikeList,
      }, {
        path: 'wish',
        name: 'MWishPage',
        component: MWishPage,
      }, {
        path: 'result',
        name: 'MResultPage',
        component: MResultPage,
      }, {
        path: 'task',
        name: 'MTaskPage',
        component: MTaskPage,
      }],
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