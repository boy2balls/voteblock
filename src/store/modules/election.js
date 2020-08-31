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

        NEW_CONTENT () {},
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
        }
    }
})
