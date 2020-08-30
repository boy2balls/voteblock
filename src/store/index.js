import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import account from './modules/account'
import transaction from './modules/transaction'
import content from './modules/content'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notifications: [],
  },

  mutations: {
    PUSH_NOTIFICATION (state, notification) {
      state.notifications.push({
          ...notification,
          id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
      })
    },
    REMOVE_NOTIFICATION (state, notificationToRemove) {
      state.notifications = state.notifications.filter(notification => {
          return notification.id != notificationToRemove.id;
      })
    }
  },

  actions: {
    removeNotification ({ commit }, notification) {
      commit('REMOVE_NOTIFICATION', notification);
    },
    addNotification ({ commit }, notification) {
      commit('PUSH_NOTIFICATION', notification);
    },
  },
  
  modules: {
    auth,
    account,
    transaction,
    content
  }
})
