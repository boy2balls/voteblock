import axios from 'axios'

export default ({
  namespaced: true,

  state: {
      token: [],
      user: [],
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
      let response = await axios.post('login', {
        email: auth.username,
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
      
      // try {
      //   let response = await axios.get('get-profile')
      //   commit('SET_USER', response.data.data)
      // } catch (e) {
      //   commit('SET_TOKEN', null)
      //   commit('SET_USER', null)
      // }
    },

    signOut ({ commit }) {
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
    }
  }
})
