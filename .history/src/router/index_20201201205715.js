/*
 * @Author: your name
 * @Date: 2020-05-05 13:32:53
 * @LastEditTime: 2020-12-01 20:57:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wrx/src/router/index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/component/common/login'
import SignUp from '@/components/component/common/signup'
import List from '@/components/component/hooker/list'
import Personal from '@/components/component/hooker/personal'
import Modify from '@/components/component/hooker/modify'
import Publish from '@/components/component/hooker/publish'
import Member from '@/components/component/hooker/member'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
            children: [{
                    path: '',
                    name: 'List',
                    component: List
                },
                {
                    path: '/personal',
                    name: 'Personal',
                    component: Personal,
                    meta: {
                        requireAuth: true // 这里设置，当前路由需要校验
                    }
                },
                {
                    path: '/modify',
                    name: 'Modify',
                    component: Modify,
                    meta: {
                        requireAuth: true // 这里设置，当前路由需要校验
                    }
                },
                {
                    path: '/publish',
                    name: 'Publish',
                    component: Publish,
                    meta: {
                        requireAuth: true // 这里设置，当前路由需要校验
                    }
                },

            ]
        }
    ]
})