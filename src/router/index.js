import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardLayout from '@/views/Layout/DashboardLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import AccountInfo from '@/views/AccountInfo.vue'
import Election from '@/views/Election.vue'
import Voting from '@/views/Voting.vue'
import Transaction from '@/views/Transaction.vue'
import History from '@/views/History.vue'
import Login from '@/views/Login.vue'
import ChangePassword from '@/views/ChangePassword.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "account",
        name: "Thông Tin Tài Khoản",
        component: AccountInfo
      },
      {
        path: "election",
        name: "Cuộc Bầu Cử",
        component: Election
      },
      {
        path: "voting",
        name: "Bỏ Phiếu",
        component: Voting
      },
      {
        path: "transaction",
        name: "Xác nhận bỏ phiếu",
        component: Transaction
      },
      {
        path: "history",
        name: "Lịch Sử Bỏ Phiếu",
        component: History
      },
      {
        path: "change-password",
        name: "Đổi mật khẩu",
        component: ChangePassword
      },
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    component: Login,
    name: "login",
    meta: {
      guest: true
    }
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    name: "forgot-password",
    meta: {
      guest: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: "nav-item active"
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('token') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
        next()
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('token') == null){
          next()
      }
      else{
          next({ name: 'dashboard'})
      }
  }else {
      next()
  }
})

export default router
