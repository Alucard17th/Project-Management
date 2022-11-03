export const documents = {
    state: {
      documents: [],
      currentDocument: {},
    },
    actions: {
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
         
          
          addFile: (store, data) => {
            return axios.post('/addfile', data, { 'content-type': 'multipart/form-data' })
          },
           
  addDocument: (store, data) => {
    return axios.post('/adddocument', data, { 'content-type': 'multipart/form-data' })
  },

    },
    mutations: {
        setCurrentDocument(state, document) {
            state.currentDocument = document;
          },
          SET_DOCUMENTS(state, documents) {
            state.documents = documents
          },
    },
    getters: {
        allDocuments: state => state.documents,
        getCurrentDocument: (state) => {
          return state.currentDocument
        },
    }
}