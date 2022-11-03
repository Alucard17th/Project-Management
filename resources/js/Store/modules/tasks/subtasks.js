export const subtasks = {
    state: {
        user: null,
        currentUser: {},
    },
    actions: {
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
    },
    mutations: {
     
    },
    getters: {
       
    }
}