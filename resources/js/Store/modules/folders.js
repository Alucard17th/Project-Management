export const folders = {
    state: {
        currentProject: {},
        currentFilteredProject: {},
        currentSearchedProject: {},
        currentSearchedFilteredProject: {},
        projects: [],
        userOnlyTasks: false,
        areTasksFiltered: false,
        areTasksSearched: false,
        areTasksFilteredSearched: false,
    },
    actions: {
        async getProjects({ commit }, space) {
            await axios.get('/projectslist/' + space)
                .then(response => {
                    commit('SET_PROJECTS', response.data)
                })
        },

        getUserProjects({ commit }) {
            commit('SET_USER_TASKS_ONLY')
        },

        setCurrentProject({ commit, state }, projectId) {
            let projectFound = {}
            state.projects.forEach((project) => {
                if (projectId == project.id) {
                    projectFound = project
                }
            });

            commit('setCurrentProject', projectFound)
        },

        addProject: (store, data) => {
            axios.post('/addproject', {
                name: data.name,
                color: data.color,
                desc: data.desc,
                space: data.space,
            })
                .then(response => {
                    store.commit('ADD_PROJECT', response.data)
                    store.commit('SET_SNACKBAR', {
                        showing: true,
                        text: 'Project Added'
                    })
                })
                .catch((error) => {
                    //catch the error here
                    store.commit("SET_SNACKBAR", {
                        showing: true,
                        text: 'Project Not Added'
                    })
                });
        },

        editProject(store, data) {
            axios.patch('/editproject/' + data.id, data, { 'content-type': 'multipart/form-data' })
                .then(response => {
                    store.commit('EDIT_PROJECT', response.data)
                    store.commit('SET_SNACKBAR', {
                        showing: true,
                        text: 'Project Edited'
                    })
                })
                .catch((error) => {
                    //catch the error here
                    store.commit("SET_SNACKBAR", {
                        showing: true,
                        text: 'Project Not Edited'
                    })
                });
        },

        async getCurrentProjectAfterUpdate({ commit }, projectID) {
            await axios.get('/currentproject/' + projectID)
                .then(response => {
                    commit('SET_PROJECTS', response.data)
                })
        },

        deleteProject: (store, data) => {
            return axios.delete('/deleteproject/' + data, {
                id: data,
            })
        },

        deleteStoreProject(store, data) {
            store.commit('REMOVE_PROJECT', data)
        },

        filterProjects({ commit, state, rootState }, filter) {
            if(state.areTasksFiltered && state.areTasksSearched){
                alert("LWLA")
                // FILTER SEARCH THEN RETURN RESULT
                const arr1 = state.currentProject
                const arr2 = filter.filter
                
                if(filter.filter){
                    const filterArray = (arr1,arr2) => {
                        const filtered = arr1.stages.filter(el => {
                            return arr2.indexOf(el.name) !== -1;
                        });
                        return filtered
                    }
                    const searchArray = filterArray(arr1,arr2)
                    commit("SET_SEARCHED_FILTERED_PROJECT", searchArray);
                }
                else{
                    const tft = arr1.stages.map(stage => ({...stage, task: stage.task.filter(task => task.name.includes(rootState.search.searchQuery) )}))
                    commit("SET_SEARCHED_PROJECT", tft);
                }
                
            }
            else if(state.areTasksSearched && !state.areTasksFiltered){
                // alert("TANIA")
                const arr1 = state.currentSearchedProject;
                const arr2 = filter.filter;
                const filterArray = (arr1, arr2) => {
                    const filtered = arr1.stages.filter(el => {
                        return arr2.indexOf(el.name) !== -1;
                    });
                    return filtered;
                };
                commit("SET_SEARCHED_FILTERED_PROJECT",  filterArray(arr1, arr2));
            }
            else{
                // alert("TALTA")
                const arr1 = state.currentProject;
                const arr2 = filter.filter;
                const filterArray = (arr1, arr2) => {
                    const filtered = arr1.stages.filter(el => {
                        return arr2.indexOf(el.name) !== -1;
                    });
                    return filtered;
                };
                commit("SET_FILTERED_PROJECT", { res: filterArray(arr1, arr2), original: state.currentProject });
            }
            commit("SET_TASKS_FILTERED_BOOL", filter.checker);
        },

        searchByTerms({ commit, state, rootState }, searchString) {
            if(state.areTasksFiltered && state.areTasksSearched){
                alert('SEARCH LWLA')
                const arr1 = state.currentProject
                const arr2 = rootState.filter.listSearch
                let tft = []
                const filterArray = (arr1, arr2) => {
                    const filtered = arr1.stages.filter(el => {
                        return arr2.indexOf(el.name) !== -1;
                    });
                    return filtered;
                };
                const searchArray = filterArray(arr1,arr2)
                if(searchString.query){
                    tft = searchArray.map(stage => ({...stage, task: stage.task.filter(task => task.name.includes(searchString.query) )}))
                    alert(searchString.query)
                    commit("SET_SEARCHED_FILTERED_PROJECT", tft);
                }else{
                    commit("SET_FILTERED_PROJECT", { res: searchArray, original: state.currentFilteredProject });
                }
                console.log("THE RESUlt IS ")
                console.log(tft)
               
            } 
            else if(state.areTasksFiltered && !state.areTasksSearched){
                alert('SEARCH TANIA')
                const arr1 = state.currentFilteredProject;
                const tft = arr1.stages.map(stage => ({...stage, task: stage.task.filter(task => task.name.includes(searchString.query) )}))
                commit("SET_SEARCHED_FILTERED_PROJECT", tft);
            }
            else{
                alert('SEARCH TALTA')
                const arr1 = state.currentProject;
                const tft = arr1.stages.map(stage => ({...stage, task: stage.task.filter(task => task.name.includes(searchString.query) )}))
                commit("SET_SEARCHED_PROJECT", tft);
            }
            commit("SET_TASKS_SEARCHED_BOOL", searchString.checker);
        }
    },
    mutations: {
        ADD_PROJECT: (state, resp) => {
            state.projects.push({
                id: resp.id,
                name: resp.name,
                color: resp.color,
                description: resp.description
            })
        },

        EDIT_PROJECT: (state, resp) => {
            state.projects.forEach((project) => {
                if (resp[0].id == project.id) {
                    project.name = resp[0].name
                    project.description = resp[0].description
                    project.color = resp[0].color
                    project.image = resp[0].image
                    project.avatar = resp[0].avatar
                    project.privacy = resp[0].privacy
                }
            });
        },

        SET_FILTERED_PROJECT: (state, payload) => {
            // state.currentFilteredProject = payload.original;
            state.currentFilteredProject.stages = payload.res;
        },

        SET_SEARCHED_PROJECT: (state, payload) => {
            // state.currentFilteredProject = payload.original;
            state.currentSearchedProject.stages = payload;
        },
        SET_SEARCHED_FILTERED_PROJECT: (state, payload) => {
            state.currentSearchedFilteredProject.stages = payload;
        },
        setCurrentProject(state, project) {
            state.currentProject = project;
        },
        REMOVE_PROJECT: (state, resp) => {
            state.projects = state.projects.filter(item => {
                return item.id !== resp
            })
        },
        SET_PROJECTS(state, projects) {
            state.projects = projects
        },
        SET_USER_TASKS_ONLY: (state) => {
            state.userOnlyTasks = !state.userOnlyTasks
        },
        SET_TASKS_FILTERED_BOOL: (state, filterBool) => {
            state.areTasksFiltered = filterBool
        },
        SET_TASKS_SEARCHED_BOOL: (state, searchBool) => {
            state.areTasksSearched = searchBool
        },
        SET_TASKS_SEARCHED_FILTERED_BOOL: (state) => {
            state.areTasksFilteredSearched = !state.areTasksFilteredSearched
        }

    },
    getters: {
        allProjects: state => state.projects,

        getCurrentProject(state, getters, rootState) {
            if (rootState.filter.listSearch.length === null) {
                alert("NO FILTER")
                return state.currentProject;
            } else if (rootState.search.searchQuery.length === null) {
                alert("NO SEARCH")
                return state.currentProject;
            } else if (rootState.filter.listSearch.length && !rootState.search.searchQuery.length) {
                alert("FILTER BUT NO SEARCH")
                return state.currentFilteredProject;
            }else if (rootState.search.searchQuery.length && !rootState.filter.listSearch.length) {
                alert("SEARCH BUT NO FILTER")
                return state.currentSearchedProject;
            } else if(rootState.filter.listSearch.length && rootState.search.searchQuery.length) {
                alert("FILTER AND SEARCH")
                return state.currentSearchedFilteredProject;
            }
            else {
                alert("ELSE DO ")
                return state.currentProject;
            }
        },
        getCurrentProjectData: (state) => {
            return state.currentProject
        },
        getCurrentProjectID: (state) => {
            return state.currentProject.id
        },
        userTasksOnlyBool: (state) => {
            return state.userOnlyTasks
        }
    }
}