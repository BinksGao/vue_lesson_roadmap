/*
 * @Author: your name
 * @Date: 2020-05-05 13:32:53
 * @LastEditTime: 2020-12-01 21:02:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wrx/src/router/index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import List from '@/components/component/hooker/list'
import Item from '@/components/component/hooker/item'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
            children: [{
                    path: '/list',
                    name: 'List',
                    component: List
                },
                {
                    path: '/item',
                    name: 'Item',
                    component: Item
                }
            ]
        }
    ]
})