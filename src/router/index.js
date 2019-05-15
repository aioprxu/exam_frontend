import Vue from 'vue'
import Router from 'vue-router'
//使用懒加载的方式来引入,只有路由被访问的时候才加载
import home from '@/components/home'
const loginpage = resolve => require(['@/components/Login'],resolve)
import HelloWorld from '@/components/HelloWorld'
import Admin from '@/components/Admin'
import user from '@/components/user'
import admin_question from '@/components/admin-question'
import admin_exam from '@/components/admin-exam'
import admin_paper from '@/components/admin-paper'
import admin_user from '@/components/admin-user'
import admin_answer from '@/components/admin-answer'
import my_exam from '@/components/my-exam'
import my_result from '@/components/my-result'
import exam from '@/components/exam'
Vue.use(Router)
let router =  new Router({
  routes: [
    {
      path:'/',
      name :'login',
      component:loginpage
    },
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
    },
    {
      path:'/admin-exam',
      name : 'admin-exam',
      component:admin_exam
    },
    {
      path:'/admin-question',
      name : 'admin-question',
      component:admin_question
    },
    {
      path:'/admin-paper',
      name : 'admin-paper',
      component:admin_paper
    },
    {
      path:'/admin-user',
      name : 'admin-user',
      component:admin_user
    },
    {
      path:'/admin-answer',
      name : 'admin-answer',
      component:admin_answer
    },
    {
      path:'/my-exam',
      name : 'my-exam',
      component:my_exam
    },
    {
      path:'/my-result',
      name : 'my-result',
      component:my_result
    },
    {
      path:'/exam',
      name : 'exam',
      component:exam
    }
  ]
})
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
