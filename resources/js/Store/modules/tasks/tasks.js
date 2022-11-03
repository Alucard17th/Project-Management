export const tasks = {
    state: {
        
    },
    actions: {
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
    },
    mutations: {
        DELETE_STORE_TASK(state, taskID) {
            // state.currentProject = task
            let projectFound = {}
            state.currentProject.forEach((stage) => {
              if (taskID == stage.task.id) {
                projectFound = project
              }
            });
          },
       
    },
    getters: {
      

    }
}