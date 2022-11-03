export const checklists = {
    state: {
        user: null,
        currentUser: {},
    },
    actions: {
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
       
    },
    mutations: {
     
    },
    getters: {
       
    }
}