import axios from 'axios'

export default ({
    namespaced: true,

    state: {
        blocks: [],
    },

    getters: {
        blocks(state) {
            return state.blocks
        }
    },

    mutations: {
        NO_COMMIT() {},
        SET_BLOCKS(state, blocks) {
            state.blocks = blocks
        },
    },

    actions: {
        async getBlocks({ commit }) {
            let response = await axios.get('get-blocks/all');
            commit('SET_BLOCKS', response.data.data.blocks)
        },
    }
})
