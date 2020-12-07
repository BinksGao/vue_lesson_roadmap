/*
 * @Author: your name
 * @Date: 2020-05-05 13:32:53
 * @LastEditTime: 2020-12-01 20:57:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wrx/src/router/index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import List from '@/components/component/hooker/list'
import Personal from '@/components/component/hooker/personal'
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
                }
            ]
        }
    ]
})