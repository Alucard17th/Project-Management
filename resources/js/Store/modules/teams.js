export const teams = {
    state: {
        teams: [],
        teammembers: [],
    },
    actions: {
        async getTeams({ commit }) {
            await axios.get('/allteams')
                .then(response => {
                    commit('SET_TEAMS', response.data)
                })
        },
        async getTeamMembers({ commit }, teamId) {
            await axios.get('/getmembers/' + teamId)
                .then(response => {
                    commit('SET_TEAM_MEMBERS', response.data)
                })
        },
        addTeam: (store, data) => {
            return axios.post('/addteam', {
                name: data.name,
                description: data.description,
            })
        },
        editTeam(store, data) {
            return axios.patch('/editeam/' + data.id, {
                id: data.id,
                name: data.name,
                description: data.description,
            })
        },
        deleteTeam(store, data) {
            return axios.delete('/deleteteam/' + data.id, {
                id: data.id,
            })
        },
    },
    mutations: {
        SET_TEAMS: (state, teams) => {
            state.teams = teams
        },
        SET_TEAM_MEMBERS: (state, members) => {
            state.teammembers = members
        },
    },
    getters: {
        getAllTeams: (state) => {
            return state.teams
        },
        getTeamMembers: (state) => {
            return state.teammembers
        },
        currentSpacePermission: (state) => {
            return state.teammembers
        },
    }
}