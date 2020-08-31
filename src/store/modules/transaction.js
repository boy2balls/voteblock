import axios from 'axios'

export default ({
    namespaced: true,

    state: {
        transactions: [],
    },

    getters: {
        transactions(state) {
            return state.transactions
        }
    },

    mutations: {
        NO_COMMIT(){},
        SET_TRANSACTIONS(state, transactions) {
            state.transactions = transactions
        },
    },

    actions: {
        async getTransactions({ commit }) {
            let response = await axios('get-transactions');
            commit('SET_TRANSACTIONS', response.data.data.transactions)
        },
        async miningTransaction({ commit }, form) {
            await axios.post('mine-transaction', {
                signature: form.signature,
                transId: form.transId
            });
            commit('NO_COMMIT')
        }
    }
})
