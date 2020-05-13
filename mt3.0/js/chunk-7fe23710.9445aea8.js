(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7fe23710"],{"08ff":function(e,r,t){"use strict";var a=t("589d"),n=t.n(a);n.a},"0965":function(e,r,t){e.exports=t.p+"img/hls.f405807a.png"},"41eb":function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"LoginPage"},[t("div",{staticClass:"title-wrapper"},[e._v("沐光遇法 语你相识")]),t("van-tabs",{model:{value:e.paneKey,callback:function(r){e.paneKey=r},expression:"paneKey"}},[t("van-tab",{attrs:{title:"登录",name:"login"}},[t("van-form",{on:{submit:e.onSubmit}},[t("van-field",{attrs:{name:"username",required:"",label:"账户",placeholder:"请输入账户",rules:[{required:!0,message:"请输入账户!"}]},model:{value:e.login.username,callback:function(r){e.$set(e.login,"username",r)},expression:"login.username"}}),t("van-field",{attrs:{type:"password",name:"password",required:"",label:"密码",placeholder:"请输入密码",rules:[{required:!0,message:"请输入密码!"}]},model:{value:e.login.password,callback:function(r){e.$set(e.login,"password",r)},expression:"login.password"}}),t("div",{staticStyle:{margin:"16px"}},[t("van-button",{attrs:{round:"",block:"",type:"info","native-type":"submit"}},[e._v(" 登录 ")])],1)],1)],1),t("van-tab",{attrs:{title:"注册",name:"register"}},[t("van-form",{on:{submit:e.onSubmitRegister}},[t("van-field",{attrs:{name:"nickname",required:"",label:"姓名",placeholder:"请输入真实姓名",rules:[{required:!0,message:"请输入真实姓名!"}]},model:{value:e.register.nickname,callback:function(r){e.$set(e.register,"nickname",r)},expression:"register.nickname"}}),t("van-field",{attrs:{name:"schoolNumber",required:"",label:"学号",placeholder:"请输入学号",rules:[{required:!0,message:"请输入学号!"},{pattern:/^[a-zA-Z]\d{9}$/,message:"格式错误，例如：M201973007",trigger:"onBlur"}]},model:{value:e.register.schoolNumber,callback:function(r){e.$set(e.register,"schoolNumber",r)},expression:"register.schoolNumber"}}),t("van-field",{attrs:{name:"username",required:"",label:"登录账号",placeholder:"请输入登录账号",rules:[{required:!0,message:"请输入登录账号!"}]},model:{value:e.register.username,callback:function(r){e.$set(e.register,"username",r)},expression:"register.username"}}),t("van-field",{attrs:{type:"password",name:"password",required:"",label:"密码",placeholder:"请输入登录密码",rules:[{required:!0,message:"请输入登录密码!"}]},model:{value:e.register.password,callback:function(r){e.$set(e.register,"password",r)},expression:"register.password"}}),t("van-field",{attrs:{name:"gender",required:"",label:"性别",rules:[{required:!0,message:"请选择性别!"}]},scopedSlots:e._u([{key:"input",fn:function(){return[t("van-radio-group",{attrs:{direction:"horizontal"},model:{value:e.register.gender,callback:function(r){e.$set(e.register,"gender",r)},expression:"register.gender"}},[t("van-radio",{attrs:{name:"1"}},[e._v("男")]),t("van-radio",{attrs:{name:"0"}},[e._v("女")])],1)]},proxy:!0}])}),t("div",{staticStyle:{margin:"16px"}},[t("van-button",{attrs:{round:"",block:"",type:"info","native-type":"submit"}},[e._v(" 注册 ")])],1)],1)],1)],1),t("van-grid",{staticClass:"logo-wrapper",attrs:{border:!1,"column-num":3}},[t("van-grid-item",[t("van-image",{attrs:{src:e.wnlo}})],1),t("van-grid-item",[t("van-image",{attrs:{src:e.fl}})],1),t("van-grid-item",[t("van-image",{attrs:{src:e.hls}})],1)],1)],1)},n=[],s=t("5880"),i=t("d6a1");function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){u(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function u(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var c={name:"LoginPage",data:function(){return{login:{username:"",password:""},register:{username:"",nickname:"",schoolNumber:"",gender:"",password:""},paneKey:"login",wnlo:t("eb21"),hls:t("0965"),fl:t("5a75")}},methods:l(l({},Object(s["mapActions"])({loginUser:"tokensOperation/login",registerUser:"userOperation/registerUser"})),{},{onSubmit:function(e){var r=this;this.loginUser({username:e.username,password:e.password}).then((function(e){e&&e.data.meta.success?(r.$notify({type:"success",message:"登录成功"}),"管理员"===e.data.data.role?r.$router.push({path:"/mobile/admin"}):r.$router.push({path:"/mobile/stage"})):r.$notify({type:"warning",message:e.data.meta.message})}))},onSubmitRegister:function(e){var r=this;i["a"].userController.registerUser({username:e.username,nickname:e.nickname,schoolNumber:e.schoolNumber,gender:e.gender,password:e.password}).then((function(e){e&&e.data.meta.success?(r.$notify({type:"success",message:"注册成功，请登录！"}),r.paneKey="login"):r.$notify({type:"warning",message:e.data.meta.message})}))}})},m=c,d=(t("08ff"),t("2877")),p=Object(d["a"])(m,a,n,!1,null,"efe21634",null);r["default"]=p.exports},"589d":function(e,r,t){},"5a75":function(e,r,t){e.exports=t.p+"img/fl.7be3fdb3.png"},eb21:function(e,r,t){e.exports=t.p+"img/wnlo.92fb8891.png"}}]);