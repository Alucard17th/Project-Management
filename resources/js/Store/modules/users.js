export const users = {
    state: {
        user: null,
        currentUser: {},
    },
    actions: {
        async getCurrentUser({ commit }) {
            await axios.get("/api/user").then((response) => {
                commit('SET_USER', response.data)
            });
        },
        setCurrentUser: ({ commit }, userId) => {
            commit('SET_USER', response.data)
        },
        updateCurrentUser: (store, data) => {
            return axios.patch('/edituser/' + data, {
                id: data.id,
                name: data.name,
                email: data.email,
                password: data.password,
                avatar: data.avatar
            })
        },

    },
    mutations: {
        SET_USER(state, user) {
            state.currentUser = user
        },
    },
    getters: {
        getCurrentUser: state => state.currentUser,

    }
}