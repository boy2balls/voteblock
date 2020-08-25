import axios from 'axios'

export default ({
  namespaced: true,

  state: {
      token: null,
      user: null,
  },

  getters: {
    user (state) {
      return state.user
    }
  },

  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_USER (state, user) {
      state.user = user
    }
  },

  actions: {
    async login({ dispatch }, auth) {
      let response = await axios.post('authenticate', {
        userName: auth.username,
        password: auth.password
      });

      dispatch('attempt', response.data)
    },

    async attempt ({ commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token)
      }

      if (!state.token) {
        return
      }
      
      try {
        let response = await axios.get('get-profile')
        
        if (response.data.data.role != 'CUSTOMER') {
          commit('SET_TOKEN', null)
          return
        }

        commit('SET_USER', response.data.data)
      } catch (e) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      }
    },

    signOut ({ commit }) {
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
    }
  }
})
