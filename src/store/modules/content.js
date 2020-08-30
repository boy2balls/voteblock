import axios from 'axios'

export default ({
    namespaced: true,

    state: {
        contents: [],
    },

    getters: {
        getContents(state) {
            return state.contents
        }
    },

    mutations: {
        SET_CONTENT (state, content) {
            if (state.contents == []) {
                state.contents = content
            } else {
                state.contents.push(content)
            }
        },

        NEW_CONTENT () {},
    },

    actions: {
        async createContent({ commit }, form) {
            let response = await axios.post('create-vote-content', {
                content: form.content,
                startDate: form.startDate,
                endDate: form.endDate,
                description: form.description
            });
            commit('SET_CONTENT', response.data.data)
        },
    }
})
