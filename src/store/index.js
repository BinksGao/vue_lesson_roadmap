import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    login: sessionStorage.getItem('loginStatus'),

}

const getters = {
    login: state => {
        return state.login
    }
}

const mutations = {
    set_Login(state, login) {
        state.login = login
    }
}

const actions = {
    setLogin({ commit }, data) {
        commit('set_Login', data)
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})