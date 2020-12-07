// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/css/base.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import util from "./api/util/util"
import store from "./store"
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper)
Vue.use(util);

Vue.config.productionTip = false
Vue.use(ElementUI, { size: "small" })

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (JSON.parse(sessionStorage.getItem('loginStatus'))) {
            var mo = function(e) { e.preventDefault(); };
            document.body.style.overflow = ''; //出现滚动条
            document.removeEventListener("touchmove", mo, false);
            next();
        } else {
            next({
                path: "/login" //指向为你的登录界面
            });
        }
    } else {
        next();
    }
    if (to.fullPath === "/login") {
        if (JSON.parse(sessionStorage.getItem('loginStatus'))) {
            next({
                path: from.fullPath
            });
        } else {
            next();
        }
    }
});