import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import Search from './filter'

Vue.use(Vuex)

// import { SET_NOTE } from '@/store/mutation-types';
// une action est fonction qui permet de déclencher une mutation
const actions = {
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
  addSpace: (store, data) => {
    return axios.post('/addspace', {
      name: data.name,
      color: data.color,
      avatar: data.avatar,
      desc: data.desc,
      privacy: data.privacy,
    })
  },
  async getSpaces({ commit }) {
    await axios.get('/spaceslist')
      .then(response => {
        commit('SET_SPACES', response.data)
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

  async getProjects({ commit }, space) {
    await axios.get('/projectslist/' + space)
      .then(response => {
        commit('SET_PROJECTS', response.data)
      })
  },
  async getUserProjects({ commit }, space) {
    // let projectFound = {}
    // state.projects.forEach((project) => {
    //   if (projectId == project.id) {
    //     projectFound = project
    //   }
    // });
    await axios.get('/projectslist/' + space, {
      params: {
        userOnly: true
      }
    })
      .then(response => {
        commit('SET_PROJECTS', response.data)
        commit('SET_USER_TASKS_ONLY')
      })
  },
  async getCurrentProjectAfterUpdate({ commit }, projectID) {
    await axios.get('/currentproject/' + projectID)
      .then(response => {
        commit('SET_PROJECTS', response.data)
      })
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
  deleteProject: (store, data) => {
    return axios.delete('/deleteproject/' + data, {
      id: data,
    })
  },
  deleteStoreProject(store, data) {
    store.commit('REMOVE_PROJECT', data)
  },
  getDocuments({ commit }) {
    axios.get('/documents')
      .then(response => {
        commit('SET_DOCUMENTS', response.data)
      })
  },
  setCurrentDocument({ commit, state }, documentId) {
    let documentFound = {}
    state.documents.forEach((document) => {
      if (documentId == document.id) {
        documentFound = document
      }
    });
    commit('setCurrentDocument', documentFound)
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
  filterProjects({ commit, state }, filter) {
    
      const arr1 = state.currentProject;
      const arr2 = filter;
      const filterArray = (arr1, arr2) => {
        const filtered = arr1.stages.filter(el => {
          return arr2.indexOf(el.name) !== -1;
        });
        return filtered;
      };
      commit("setFilteredProject", { res: filterArray(arr1, arr2), original: state.currentProject });
      commit("SET_TASKS_FILTERED_BOOL");
  },
  addFile: (store, data) => {
    return axios.post('/addfile', data, { 'content-type': 'multipart/form-data' })
  },
  addTask: (store, data) => {
    return axios.post('/addtask', {
      name: data.name,
      stage: data.stage,
    })
  },
  editTask(store, data) {
    // return axios.put('/edittask', data, { 'content-type': 'multipart/form-data' })
    return axios.put('/edittask', {
      task: data.task,
      description: data.description,
      action: "task"
    })
  },
  editTaskStatu(store, data) {
    // return axios.put('/edittask', data, { 'content-type': 'multipart/form-data' })
    return axios.put('/edittask', {
      tasks: data,
      action: "taskOrder"
    })
  },
  editTaskStage(store, data) {
    // return axios.put('/edittask', data, { 'content-type': 'multipart/form-data' })
    return axios.put('/edittask', {
      tasks: data.tasks,
      newStageID: data.stageID,
      action: "taskStage",
    })
  },
  sortTasks({ commit, state }, filter) {
    var nombres = ["Banana", "Orange", "Apple", "Mango"];
    var res = nombres.sort();
  },
  deleteTask: (store, data) => {
    return axios.delete('/deletetask/' + data, {
      id: data,
    })
  },
  addStoreTask({ commit, state }, newTask, stageID) {
    commit("ADD_STORE_TASK", newTask, stageID);


    // DONT DELETE 
    // deletedTask = state.currentProject.stages.filter(function(stage){
    //   if(stage.id == stageID){
    //     stage.task.push(taskData)
    //   }
    // //   // stage.task.forEach(function (task, i) {
    // //   //   if(task.id !== taskID){
    // //   //     notDeletedTasks.push(task.name + ' Index ' + i)
    // //   //   }else{
    // //   //     stage.task.splice(i, 1)
    // //   //   }
    // //   // });

    // });
  },
  deleteStoreTask: ({ commit, state }, taskID) => {
    let deletedTask = {}
    var notDeletedTasks = []
    deletedTask = state.currentProject.stages.filter(function (stage) {

      stage.task.forEach(function (task, i) {
        if (task.id !== taskID) {
          notDeletedTasks.push(task.name + ' Index ' + i)
        } else {
          stage.task.splice(i, 1)
        }
      });

    });
  },
  addDocument: (store, data) => {
    return axios.post('/adddocument', data, { 'content-type': 'multipart/form-data' })
  },
  addStage(store, data) {
    return axios.post('/addstage', {
      name: data.name,
      project: data.project
    })
  },
  updateStage(store, data) {
    return axios.post('/statusorder', {
      status: data,
    })
  },
  addSubtask: (store, data) => {
    return axios.post('/addsubtask', {
      name: data.name,
      task: data.task
    })
  },
  markSubtaskAsDone(store, data) {
    return axios.patch('/editsubtask/' + data.id, {
      id: data.id,
      done: data.done,
      doneAction: true
    })
  },
  editSubtask(store, data) {
    return axios.patch('/editsubtask/' + data.id, {
      id: data.id,
      name: data.name,
      nameAction: true
    }, { 'content-type': 'multipart/form-data' })
  },
  deleteSubtask(store, data) {
    return axios.delete('/deletesubtask/' + data.id, {
      id: data.id,
    })
  },
  addChecklist: (store, data) => {
    return axios.post('/addchecklist', {
      name: data.name,
      task_id: data.task,
      done: 0
    })
  },
  markChecklistAsDone(store, data) {
    return axios.patch('/editchecklist/' + data.id, {
      id: data.id,
      done: data.done,
      doneAction: true
    })
  },
  editChecklist(store, data) {
    return axios.patch('/editchecklist/' + data.id, {
      id: data.id,
      name: data.name,
      nameAction: true
    })
  },
  deleteChecklist(store, data) {
    return axios.delete('/deletechecklist/' + data.id, {
      id: data.id,
    })
  },
  setSnackBar({ commit }, snackbar) {
    commit('SET_SNACKBAR', snackbar);
  },
  setCurrentSpace({ commit, state }, spaceId) {
    let spaceFound = {}
    state.spaces.forEach((space) => {
      if (spaceId == space.id) {
        spaceFound = space
      }
    });
    commit('setCurrentSpace', spaceFound)
  },
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
  TOGGLE_HOME_NAVIGATION_DRAWER({ commit }) {
    commit('TOGGLE_HOME_NAVIGATION_DRAWER');
  },
}

const mutations = {
  SET_USER(state, user) {
    state.currentUser = user
  },
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
  REMOVE_PROJECT: (state, resp) => {
    state.projects = state.projects.filter(item => {
      return item.id !== resp
    })
  },
  SET_PROJECTS(state, projects) {
    state.projects = projects
  },
  SET_SPACES(state, spaces) {
    state.spaces = spaces
  },
  DELETE_STORE_TASK(state, taskID) {
    // state.currentProject = task
    let projectFound = {}
    state.currentProject.forEach((stage) => {
      if (taskID == stage.task.id) {
        projectFound = project
      }
    });
  },
  SET_DOCUMENTS(state, documents) {
    state.documents = documents
  },
  setCurrentProject(state, project) {
    state.currentProject = project;
  },
  ADD_STORE_TASK(state, newTask, stageID) {
    state.currentProject = [];
  },
  setCurrentDocument(state, document) {
    state.currentDocument = document;
  },
  setFilteredProject: (state, payload) => {
    // state.currentFilteredProject = payload.original;
    state.currentFilteredProject.stages = payload.res;
  },
  SET_SNACKBAR(state, snackbar) {
    state.snackbar = snackbar;
  },
  setCurrentSpace(state, space) {
    state.currentSpace = space;
  },
  TOGGLE_HOME_NAVIGATION_DRAWER: (state) => {
    state.isHomeNavigationDrawerOpen = !state.isHomeNavigationDrawerOpen
  },
  SET_TEAMS: (state, teams) => {
    state.teams = teams
  },
  SET_TEAM_MEMBERS: (state, members) => {
    state.teammembers = members
  },
  SET_USER_TASKS_ONLY: (state) => {
    state.userOnlyTasks = !state.userOnlyTasks
  },
  SET_TASKS_FILTERED_BOOL: (state) => {
    state.areTasksFiltered = !state.areTasksFiltered
  }
}

const getters = {
  getCurrentUser: state => state.currentUser,
  allProjects: state => state.projects,
  allSpaces: state => state.spaces,
  allDocuments: state => state.documents,
  getCurrentProject(state, getters, rootState) {
    if (rootState.search.listSearch.length === null) {
      return state.currentProject;
    } else if (rootState.search.listSearch.length) {
      return state.currentFilteredProject;
    } else {
      return state.currentProject;
    }
  },
  getCurrentProjectData: (state) => {
    return state.currentProject
  },
  getCurrentProjectID: (state) => {
    return state.currentProject.id
  },
  getCurrentDocument: (state) => {
    return state.currentDocument
  },
  getSnackBar: (state) => {
    return state.snackbar
  },
  getCurrentSpace: (state) => {
    return state.currentSpace
  },
  getNavigationDrawer: (state) => {
    return state.isHomeNavigationDrawerOpen
  },
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

// Create a new store instance.
const store = new Vuex.Store({
  state: {
    userOnlyTasks: false,
    areTasksFiltered: false,
    currentUser: {},
    currentProject: {},
    currentFilteredProject: {},
    spaces: [],
    currentSpace: {},
    projects: [],
    documents: [],
    teams: [],
    teammembers: [],
    currentDocument: {},
    snackbar: {},
    isHomeNavigationDrawerOpen: true,
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
    search: Search,
  }
})

global.store = store
export default store;