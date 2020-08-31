import axios from 'axios'

export default ({
    namespaced: true,

    state: {
        elections: [],
    },

    getters: {
        elections(state) {
            return state.elections
        }
    },

    mutations: {
        SET_ELECTION (state, election) {
            if (state.elections == []) {
                state.elections = election
            } else {
                state.elections.push(election)
            }
        },

        SET_ELECTIONS (state, elections) {
            state.elections = elections
        },

        NO_COMMIT () {},
    },

    actions: {
        async createElection({ commit }, form) {
            let response = await axios.post('create-vote-content', {
                content: form.content,
                startDate: form.startDate,
                endDate: form.endDate,
                description: form.description
            });
            commit('SET_ELECTION', response.data.data)
        },
        async getElections({ commit }) {
            let response = await axios.get('get-vote-content');
            commit('SET_ELECTIONS', response.data.data.contents)
        },
        async voting({ commit }, form) {
            let response = await axios.post('voting', {
                receiverWallet: form.address,
                value: 1,
                description: form.description,
                currency: 'vote',
                contentId: form.contentId
            });
            commit('NO_COMMIT')
            return response.data.data;
        },
        async registerElector({ commit }, contentId) {
            await axios.post('register-elector', {
                contentId: contentId
            })
            commit('NO_COMMIT')
        }
    }
})
