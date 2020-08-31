import axios from 'axios'

export default ({
    namespaced: true,

    state: {
        
    },

    getters: {
        
    },

    mutations: {
        NO_COMMIT() {},
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
    }
})
