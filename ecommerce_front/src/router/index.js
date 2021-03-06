import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'

import Product from "@/views/Product";
import Category from "@/views/Category";
import Search from "@/views/Search";
import Cart from "@/views/Cart";
import SignUp from "@/views/SignUp";
import Login from "@/views/Login";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp,
    },
    {
        path: '/log-in',
        name: 'Login',
        component: Login,
    },
    {
        path: '/:category_slug/:product_slug',
        name: 'Product',
        component: Product
    },
    {
        path: '/:category_slug',
        name: 'Category',
        component: Category
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
