import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('views/home/Home.vue')
const Category = () => import('views/category/Category.vue')
const Shopcart = () => import('views/shopcart/Shopcart.vue')
const Profile = () => import('views/profile/Profile.vue')
const Detail = () => import('views/detail/Detail.vue')
const Login = () => import('views/login/Login.vue')
const Register = () => import('views/login/Register.vue')


Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home,
            meta: {footShow: true } //判断属性 加了这个的route可以显示底部的选择栏
        },
        {
            path: '/category',
            component: Category,
            meta: {footShow: true }
        },
        {
            path: '/shopcart',
            component: Shopcart,
            meta: {footShow: true }
        },
        {
            path: '/profile',
            component: Profile,
            meta: {footShow: true }
        },
        {
            // 动态地址，每个商品有独立的iid
            path: '/detail/:iid',
            component: Detail
        },
        {
            path: '/Login',
            component: Login
        },
        {
            path: '/Register',
            component: Register
        },
    ],
    mode: 'history'
})