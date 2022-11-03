export const stages = {
    state: {
        
    },
    actions: {
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
    },
    mutations: {
        
    },
    getters: {

    }
}