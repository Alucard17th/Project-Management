import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)


// import { SET_NOTE } from '@/store/mutation-types';
// une action est fonction qui permet de déclencher une mutation
const actions = {
  getProjects({ commit }) {
      axios.get('http://pmg.localhost/projectslist')
          .then(response => {
              commit('SET_PROJECTS', response.data)
         })
  },

  addProject: (store, data) => {
    axios.post('http://pmg.localhost/addproject',{
      name: data.name,
      color: data.color,
      avatar: data.avatar,
      privacy: data.privacy,
    })
          .then(response => {
            store.commit( 'ADD_PROJECT' , response.data)
         })
  },

  addTask: (store, data) => {
    return axios.post('http://pmg.localhost/addtask',{
          name:data.name,
          stage:data.stage,
    })
        //   .then(response => {
        //     // store.commit( 'ADD_TASK' , response.data)
        //     // store.dispatch("getProjects"),
        //     // console.log("SXS")
        //     store.commit('ADD_TASK_ERROR', 'Task Added Succesfully')
        //  })
        //  .catch(error => {
        //     // console.log("nop")
        //     store.commit('ADD_TASK_ERROR', error)

        //  })
   
  },
 

  addSubtask: (store, data) => {
    return axios.post('http://pmg.localhost/addsubtask',{
          name:data.name,
          task:data.task
    })
    // axios.post('http://pmg.localhost/addproject',{
    // })
    //       .then(response => {
    //      })
   
  },

  addChecklist: (store, data) => {
    return axios.post('http://pmg.localhost/addchecklist',{
          name:data.name,
          task_id:data.task,
          done: 0
    })
    // axios.post('http://pmg.localhost/addproject',{
    // })
    //       .then(response => {
    //      })
  },
  setCurrentProject ({commit, state}, projectId){
      let projectFound = {}
      let projectFoundStages = {}
      state.projects.forEach((project)=>{
          if (projectId == project.id){
            projectFound = project
          }
      });
      commit('setCurrentProject', projectFound)
  },
  filterProjects ({commit, state}, filter){
    const arr1 = state.currentProject.stages;
    const arr2 = filter;
    const filterArray = (arr1, arr2) => {
      const filtered = arr1.filter(el => {
        // console.log(arr2.indexOf(el.name))
        // el => stages objects from store
        // console.log(el.name)
          return arr2.indexOf(el.name) !== -1;
      });
      return filtered;
    };
    // return filterArray(arr1, arr2);

    commit('UPDATE_FILTERS', filterArray(arr1, arr2));
  },

  UPDATE_CURATED_LIST: ({ commit, state }, input) => {
    const arr1 = state.currentProject.stages;
    const arr2 = filter;
    const filterArray = (arr1, arr2) => {
      const filtered = arr1.filter(el => {
        // console.log(arr2.indexOf(el.name))
        // el => stages objects from store
        // console.log(el.name)
          return arr2.indexOf(el.name) !== -1;
      });
      return filtered;
    };
    // return filterArray(arr1, arr2);
    commit("SET_CURATED_LIST", filterArray(arr1, arr2));
  }
}

const mutations = {
    ADD_PROJECT: (state, resp) => {
      state.projects.push({
        id: resp.id,
        name: resp.name,
      })
    },
    UPDATE_FILTERS: (state, filter) => {
      state.currentFrontProject.stages = filter;
    },
    SET_PROJECTS (state, projects) {
      state.projects = projects
    },
    setCurrentProject (state, project) {
      state.currentProject = project;
      state.currentFrontProject = project;
    },
    ADD_TASK:(state, resp) => {
      
    },
    ADD_TASK_ERROR (state, error)  {
      state.errorMessage = error;
    },
    SET_CURATED_LIST: (state, payload) => {
      state.curatedLists = payload;
    },

}

const getters = {
  todos: state => state.movies,
  allProjects: state => state.projects,
  // getCurrentProjectsStages: state => state.currentProject.stages,
  getCurrentProject(state) {
    return state.currentFrontProject;
  },
  getCurrentBackProject(state) {
    return state.currentProject;
  },
  getCurrentProjectsStages(state) {
    return state.currentProject.stages;
  },
  statusList:(data) =>{
  //   axios.get('http://pmg.localhost/projectstages', 1)
  //   .then(response => {
  //     return response;
  // })
  },
  getTaskMessage(state){
    return state.errorMessage;
  },
  filterProjectByName(state){
  return state.projects.filter(item => item.name == 'Breach' )
  },
  // filtertasks(state, filter){
  //   return state.currentProject.stages.filter(item => item.name === filter );
  // },
  filtertasks: (state) => (filter) => {
    const arr1 = state.currentProject.stages;
    const arr2 = filter;
    const filterArray = (arr1, arr2) => {
      const filtered = arr1.filter(el => {
        // console.log(arr2.indexOf(el.name))
        // el => stages objects from store
        // console.log(el.name)
          return arr2.indexOf(el.name) !== -1;
      });
      return filtered;
    };
    return filterArray(arr1, arr2);
  },
  doneTofilteros: state => {
    return state.currentProject.stages.filter(stage => stage.name == 'Starting')
  },
  CURATED_LISTS: (state, input) => {
    // if (!state.curatedLists.length && input === "") {
    //   return state.currentProject;
    // } else if (
    //   state.curatedLists.length &&
    //   input !== ""
    // ) {
    //   return state.currentProject;
    // } else if (input === "") {
    //   return state.currentProject;
    // }else{
    //   return state.currentProject;
    // }

    return "state.project"
  },
}

// Create a new store instance.
const store = new Vuex.Store({
  state: {
    currentProject: {},
    currentFrontProject:{},
    curatedLists:[],
    projects:[],
    errorMessage:'',
    succesMessage:'',
    movies: [{
      id: 1,
      title: "Arrietty : Le Petit Monde des Chapardeurs",
    //   image: require('@/assets/movies/arrietty.jpg'),
      note: 3,
    },
    {
      id: 2,
      title: "Le Château Ambulant",
    //   image: require('@/assets/movies/chateau_ambulant.jpg'),
      note: 5,
    },
    {
      id: 3,
      title: "Le Voyage de Chihiro",
    //   image: require('@/assets/movies/chihiro.jpg'),
      note: 5,
    },
    {
      id: 4,
      title: "Kiki la Petite Sorcière",
    //   image: require('@/assets/movies/kiki.jpg'),
      note: 4,
    },{
      id: 5,
      title: "Le Vent se lève",
    //   image: require('@/assets/movies/le_vent_se_leve.jpg'),
      note: 5,
    },
    {
      id: 6,
      title: "Porco Rosso",
    //   image: require('@/assets/movies/porco_rosso.jpg'),
      note: 4,
    },
    {
      id: 7,
      title: "Princesse Mononoké",
    //   image: require('@/assets/movies/princesse_mononoke.jpg'),
      note: 5,
    },
    {
      id: 8,
      title: "Mon voisin Totoro",
    //   image: require('@/assets/movies/totoro.jpg'),
      note: 4,
    }]
  },
  getters: getters,
  mutations: mutations,
  actions: actions
})

global.store = store
export default store;