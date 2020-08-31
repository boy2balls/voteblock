import axios from 'axios'

export default ({
    namespaced: true,

    state: {
        account: [],
    },

    getters: {
        account(state) {
            return state.account
        }
    },

    mutations: {
        NO_COMMIT() {},
        SET_ACCOUNT(state, account) {
            state.account = account
        }
    },

    actions: {
        async registerAccount({ commit }, form) {
            await axios.post('register', {
                firstName: form.firstName,
                lastName: form.lastName,
                sex: form.sex,
                email: form.email,
                password: form.password,
                type: 1,
            });
            commit('NO_COMMIT')
        },
        async getInfo({ commit }) {
            let response = await axios.get('get-info');
            commit('SET_ACCOUNT', response.data.data)
        }
    }
})
