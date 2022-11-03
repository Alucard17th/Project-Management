export const spaces = {
    state: {
        spaces: [],
        currentSpace: {},
    },
    actions: {
        async getSpaces({ commit }) {
            await axios.get('/spaceslist')
                .then(response => {
                    commit('SET_SPACES', response.data)
            })
        },
        async setCurrentSpace({ commit, state }, spaceId) {
            let spaceFound = {}
            state.spaces.forEach((space) => {
                if (space.id  == "1") {
                    spaceFound = space
                }
            });
            commit('SET_CURRENT_SPACE', spaceFound)
        },
        addSpace: (store, data) => {
            return axios.post('/addspace', {
                name: data.name,
                color: data.color,
                avatar: data.avatar,
                desc: data.desc,
                privacy: data.privacy,
            })
        },

        editSpace(store, data) {
            return axios.patch('/editspace/' + data.id, {
                id: data.id,
                name: data.name,
                description: data.description,
                privacy: data.privacy,
            })
        },
        deleteSpace(store, data) {
            return axios.delete('/deletespace/' + data, {
                id: data,
            })
        },
    },
    mutations: {
        SET_SPACES(state, spaces) {
            state.spaces = spaces
        },
        // I CHZNGER THE NAME OF THIS SO BE CAREFUL TO CHANGE IT IN THE ACTIONS
        SET_CURRENT_SPACE(state, space) {
            state.currentSpace = space;
        },
    },
    getters: {
        allSpaces: state => state.spaces,
        getCurrentSpace: (state) => {
            return state.currentSpace
        },
    }
}