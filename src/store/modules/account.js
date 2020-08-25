import axios from 'axios'

export default ({
    namespaced: true,

    state: {
        account_payment: {

        },
        account_saving: [
            
        ],
        account_info: [

        ],
        account_pgp: [

        ],
    },

    getters: {
        accountPayment (state) {
            return state.account_payment
        },

        accountSaving (state) {
            return state.account_saving
        },

        accountInfo (state) {
            return state.account_info
        },

        accountPgp (state) {
            return state.account_pgp
        }
    },

    mutations: {
        SET_ACCOUNT_PAYMENT (state, account_payment) {
            state.account_payment = account_payment
        },

        SET_ACCOUNT_SAVING (state, account_saving) {
            state.account_saving = account_saving
        },

        NEW_PASSWORD () {},

        SET_ACCOUNT_INFO (state, account) {
            state.account_info = account
        },

        SET_ACCOUNT_PGP (state, account) {
            state.account_pgp = account
        }
    },

    actions: {
        async getAccountPayment({ commit }) {
            let response = await axios.get('get-accounts/payment');
            commit('SET_ACCOUNT_PAYMENT', response.data.data.accounts[0])
        },
        async getAccountSaving({ commit }) {
            let response = await axios.get('get-accounts/saving');
            commit('SET_ACCOUNT_SAVING', response.data.data.accounts)
        },
        async changePassword({ commit }, password) {
            let response = await axios.post('update-password', {
                password: password
            });

            commit('NEW_PASSWORD');
            return response;
        },
        async getAccountInfo({ commit }, cardNumber) {
            let response = await axios.get('get-account-info/' + cardNumber + '/1');
            commit('SET_ACCOUNT_INFO', response.data.data.account[0])
            return response;
        },
        async getAccountPGP({ commit }, cardNumber) {
            let response = await axios.get('get-account-info/' + cardNumber + '/2');
            console.log(response)
            commit('SET_ACCOUNT_PGP', response.data.data.account[0])
            return response;
        },
        async forgotPassword({ commit }, username) {
            await axios.get('forgot-password/' + username);
            commit('NEW_PASSWORD');
        }
    }
})
