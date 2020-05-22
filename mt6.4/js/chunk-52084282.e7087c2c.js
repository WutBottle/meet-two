(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-52084282"],{"0965":function(e,t,a){e.exports=a.p+"img/hls.f405807a.png"},"41eb":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"LoginPage"},[a("div",{staticClass:"title-wrapper"},[e._v("沐光遇法 语你相识")]),a("van-tabs",{model:{value:e.paneKey,callback:function(t){e.paneKey=t},expression:"paneKey"}},[a("van-tab",{attrs:{title:"登录",name:"login"}},[a("van-form",{on:{submit:e.onSubmit}},[a("van-field",{attrs:{name:"username",required:"",label:"账户",placeholder:"请输入账户",rules:[{required:!0,message:"请输入账户!"}]},model:{value:e.login.username,callback:function(t){e.$set(e.login,"username",t)},expression:"login.username"}}),a("van-field",{attrs:{type:"password",name:"password",required:"",label:"密码",placeholder:"请输入密码",rules:[{required:!0,message:"请输入密码!"}]},model:{value:e.login.password,callback:function(t){e.$set(e.login,"password",t)},expression:"login.password"}}),a("div",{staticStyle:{margin:"16px"}},[a("van-button",{attrs:{round:"",block:"",type:"info","native-type":"submit"}},[e._v(" 登录 ")])],1)],1),a("blockquote",{staticClass:"tips"},[a("p",[e._v("Tips: 本次活动涉及的个人信息会严格保密，如有问题请加qq群：1071506342，联系群管理员！")])])],1),a("van-tab",{attrs:{title:"注册",name:"register"}},[a("van-form",{on:{submit:e.onSubmitRegister}},[a("van-field",{attrs:{name:"nickname",required:"",label:"姓名",placeholder:"请输入真实姓名",rules:[{required:!0,message:"请输入真实姓名!"}]},model:{value:e.register.nickname,callback:function(t){e.$set(e.register,"nickname",t)},expression:"register.nickname"}}),a("van-field",{attrs:{name:"schoolNumber",required:"",label:"学号",placeholder:"请输入学号",rules:[{required:!0,message:"请输入学号!"},{pattern:/^[a-zA-Z]\d{9}$/,message:"格式错误，例如：M201973007",trigger:"onBlur"}]},model:{value:e.register.schoolNumber,callback:function(t){e.$set(e.register,"schoolNumber",t)},expression:"register.schoolNumber"}}),a("van-field",{attrs:{name:"username",required:"",label:"登录账号",placeholder:"请输入登录账号",rules:[{required:!0,message:"请输入登录账号!"}]},model:{value:e.register.username,callback:function(t){e.$set(e.register,"username",t)},expression:"register.username"}}),a("van-field",{attrs:{type:"password",name:"password",required:"",label:"密码",placeholder:"请输入登录密码",rules:[{required:!0,message:"请输入登录密码!"}]},model:{value:e.register.password,callback:function(t){e.$set(e.register,"password",t)},expression:"register.password"}}),a("van-field",{attrs:{name:"gender",required:"",label:"性别",rules:[{required:!0,message:"请选择性别!"}]},scopedSlots:e._u([{key:"input",fn:function(){return[a("van-radio-group",{attrs:{direction:"horizontal"},model:{value:e.register.gender,callback:function(t){e.$set(e.register,"gender",t)},expression:"register.gender"}},[a("van-radio",{attrs:{name:"1"}},[e._v("男")]),a("van-radio",{attrs:{name:"0"}},[e._v("女")])],1)]},proxy:!0}])}),a("van-field",{attrs:{required:"",rules:[{required:!0,message:"请上传学生证或校园卡正面!"}],label:"认证图片"},scopedSlots:e._u([{key:"input",fn:function(){return[a("van-uploader",{attrs:{multiple:"","max-count":1,"before-read":e.beforeRead},model:{value:e.imgFileList,callback:function(t){e.imgFileList=t},expression:"imgFileList"}})]},proxy:!0}])}),a("div",{staticStyle:{margin:"16px"}},[a("van-button",{attrs:{round:"",block:"",disabled:e.imgLoading||e.isSubmit,loading:e.imgLoading||e.isSubmit,"loading-text":"图片上传中...",type:"info","native-type":"submit"}},[e._v(" 注册 ")])],1)],1),a("blockquote",{staticClass:"tips"},[a("p",[e._v("Tips: 为了方便快速通过审核，找到你心动的那个ta，可不要调皮哦，请如实填写信息并上传校园卡或学生证正面照一张！")])])],1)],1),a("van-grid",{staticClass:"logo-wrapper",attrs:{border:!1,"column-num":3}},[a("van-grid-item",[a("van-image",{attrs:{src:e.wnlo}})],1),a("van-grid-item",[a("van-image",{attrs:{src:e.fl}})],1),a("van-grid-item",[a("van-image",{attrs:{src:e.hls}})],1)],1)],1)},n=[],s=a("5880"),i=a("d6a1"),o=a("6be6"),l=a.n(o),u=a("3118"),c=a("c59a");function m(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function g(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?m(Object(a),!0).forEach((function(t){d(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):m(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function d(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var p={name:"LoginPage",data:function(){return{login:{username:"",password:""},register:{username:"",nickname:"",schoolNumber:"",gender:"",password:""},paneKey:"login",wnlo:a("eb21"),hls:a("0965"),fl:a("5a75"),imgFileList:[],imgLoading:!1,fileName:"",isSubmit:!1}},methods:g(g({},Object(s["mapActions"])({loginUser:"tokensOperation/login",registerUser:"userOperation/registerUser"})),{},{onSubmit:function(e){var t=this;this.loginUser({username:e.username,password:e.password}).then((function(e){e?e.data.data&&e.data.meta.success?(t.$notify({type:"success",message:"登录成功"}),"管理员"===e.data.data.role?t.$router.push({path:"/mobile/admin"}):t.$router.push({path:"/mobile/stage"})):t.$notify({type:"warning",message:e.data.meta.message}):t.$notify({type:"warning",message:"网络超时"})}))},onSubmitRegister:function(e){var t=this;this.isSubmit=!0,i["a"].userController.registerUser({username:e.username,nickname:e.nickname,schoolNumber:e.schoolNumber,gender:e.gender,password:e.password,identityImg:this.fileName}).then((function(e){e?e.data.data&&e.data.meta.success?(t.$notify({type:"success",message:"注册成功，请登录！"}),t.paneKey="login"):t.$notify({type:"warning",message:e.data.meta.message}):t.$notify({type:"warning",message:"网络超时"}),t.isSubmit=!1}))},beforeRead:function(e){var t=this;return new Promise((function(a,r){"image/png"===e.type||"image/jpg"===e.type||"image/jpeg"===e.type?(t.imgLoading=!0,l()(e).then((function(n){var s=new FormData,o=[Object(u["a"])(n.base64,"identify."+n.origin.name.split(".")[1])];o.forEach((function(e){s.append("multipartFiles",e)})),i["a"].userController.uploadAvatar(s).then((function(r){r&&r.data.data?(t.fileName=c["a"].serverBaseController+r.data.data,t.$notify({type:"success",message:"照片已上传"}),a(e),t.imgLoading=!1):(t.$notify({type:"danger",message:"上传失败,请重新上传"}),t.imgLoading=!1)})).catch((function(e){t.$notify({type:"danger",message:"上传失败"}),r()}))})).catch((function(e){this.$notify({type:"danger",message:"图片压缩失败"})}))):(t.$toast("请上传.jpg/.png/.jpeg格式图片"),r())}))}})},f=p,b=(a("ff77"),a("2877")),v=Object(b["a"])(f,r,n,!1,null,"4d4f960a",null);t["default"]=v.exports},"5a75":function(e,t,a){e.exports=a.p+"img/fl.7be3fdb3.png"},eb21:function(e,t,a){e.exports=a.p+"img/wnlo.92fb8891.png"},f3ce:function(e,t,a){},ff77:function(e,t,a){"use strict";var r=a("f3ce"),n=a.n(r);n.a}}]);