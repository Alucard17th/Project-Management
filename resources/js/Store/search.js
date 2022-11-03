export default {
    state:{
        searchQuery : ''
    },
    getters: {
        QUERY_SEARCH: state => {
            return state.searchQuery
        }
    },
    mutations: {
        SET_SEARCH_QUERY: (state, payload) => {
            state.searchQuery = payload;
        }
    },
    actions: {},
}