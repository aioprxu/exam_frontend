import Vue from 'vue'
import Router from 'vue-router'
//使用懒加载的方式来引入,只有路由被访问的时候才加载
import home from '@/components/home'
const loginpage = resolve => require(['@/components/Login'],resolve)
import HelloWorld from '@/components/HelloWorld'
import Admin from '@/components/Admin'
import user from '@/components/user'



Vue.use(Router)
let router =  new Router({
  routes: [
    {
      path:'/login',
      name :'login',
      component:loginpage
    },
    {
      path:'/home',
      name :'home',
      component:home
    },
    {
      path:'/hello',
      name : 'HelloWorld',
      component:HelloWorld
    },
    {
      path:'/admin',
      name : 'admin',
      component:Admin
    },
    {
      path:'/user',
      name : 'user',
      component:user
    }
  ]
})
//对每次访问之前都要先看是否已经登录
// router.beforeEach((to,from,next)=>{
//   if(to.path.startsWith('/login')){
//     window.sessionStorage.removeItem('access-token');
//     next();
//   }else{
//     let token = window.sessionStorage.getItem('access-token');
//     if(!token){
//       //未登录  跳回主页面
//       next({path:'/login'});
//     }else{
//       next();
//     }
//   }
//
// });


export default router
