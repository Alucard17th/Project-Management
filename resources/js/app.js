require('./bootstrap');

window.Vue = require('vue').default;

import { App, plugin } from '@inertiajs/inertia-vue'
// import vuex from 'vue'
import store from './Store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

import { abilitiesPlugin } from '@casl/vue';
import ability from './config/ability';

// import plugin
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
// don't forget to import CSS styles
import 'tiptap-vuetify/dist/main.css'
// Vuetify's CSS styles 
import 'vuetify/dist/vuetify.min.css'

import VueTippy, { TippyComponent } from "vue-tippy";
// Vuetify Object (as described in the Vuetify 2 documentation)
const vuetify = new Vuetify()
Vue.use(TiptapVuetifyPlugin, {
  // the next line is important! You need to provide the Vuetify Object to this place.
  vuetify, // same as "vuetify: vuetify"
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: 'mdi'
})

Vue.use(VueTippy);
Vue.component("tippy", TippyComponent);

import KanbanBoard from '@Component/tasks/KanbanBoard.vue'
import TableBoard from '@Component/tasks/TableBoard.vue'
import GanttBoard from '@Component/tasks/GantBoard.vue'
import Projects from '@Pages/ProjectsArchive.vue'
import Spaces from '@Pages/SpacesArchive.vue'
import Teams from '@Pages/TeamsArchive.vue'
import SingleTeam from '@Pages/SingleTeam.vue'
import UserProfile from '@Pages/Profile.vue'
import Documents from '@Component/tasks/Documents/Document.vue'
import DocumentsArchive from '@Component/tasks/Documents/DocumentArchive.vue'
import Login from '@Pages/Auth/Login.vue'
import Register from '@Pages/Auth/Register.vue'
import Dashboard from '@Pages/Dashboard.vue'
import snackbarPlugin from './plugins/snackbar'


Vue.mixin({ methods: { route } });
Vue.use(VueRouter)

Vue.use(plugin)
Vue.use(Vuetify)
Vue.use(abilitiesPlugin, ability)
Vue.use(store)
Vue.use(snackbarPlugin, { store })


// SPACES
// STAGES
Vue.component('add-stage', require('./components/stages/AddStage.vue').default);
Vue.component('edit-space', require('./components/spaces/EditSpace.vue').default);
// PROJECTS
Vue.component('projs', require('./components/projects/Projects.vue').default);
Vue.component('add-project', require('./components/projects/AddProject.vue').default);
Vue.component('edit-project', require('./components/projects/EditProject.vue').default);
Vue.component('add-space', require('./components/spaces/AddSpace.vue').default);
// TASKS
Vue.component('add-t', require('./components/tasks/AddTask.vue').default);
Vue.component('edit-t', require('./components/tasks/TaskEdit.vue').default);
Vue.component('subtasks', require('./components/tasks/Subtask.vue').default);
Vue.component('checklist', require('./components/tasks/Checklist.vue').default);
Vue.component('task-files', require('./components/tasks/TaskFiles.vue').default);
Vue.component('task-members', require('./components/tasks/TaskMembers.vue').default);
// TEAMS
Vue.component('add-team', require('./components/teams/AddTeam.vue').default);
Vue.component('edit-team', require('./components/teams/EditTeam.vue').default);
// MENU & SWITCHERS
Vue.component('v-sw', require('./Pages/Project/ViewSwitcher.vue').default);
Vue.component('filter-t', require('./components/menus/FilterMenu.vue').default);

// PLUGINS COMPONENT
// Vue.component('document-create', require('./components/tasks/Document.vue').default);
Vue.component('gant-elastic', require('./components/tasks/GantBoardElastic.vue').default);

// FRONT END SITE 
Vue.component('about', require('./components/parts/About.vue').default);
Vue.component('platform', require('./components/parts/Platform.vue').default);
Vue.component('wedo', require('./components/parts/WhatWeDo.vue').default);
Vue.component('team', require('./components/parts/Team.vue').default);
Vue.component('business', require('./components/parts/Business.vue').default);
Vue.component('sponsors', require('./components/parts/Sponsors.vue').default);
Vue.component('contact', require('./components/parts/Contact.vue').default);

function guardMyroute(to, from, next) {
  axios.get('/api/authenticated').then(() => {
    next()
  }).catch(() => {
    return next({ name: 'login' })
  })
}

const routes = [
  { path: '/kanban/:spaceId/:spaceName/:id', name: 'kanban', component: KanbanBoard, props: true, beforeEnter: guardMyroute },
  { path: '/table/:spaceId/:spaceName/:id', name: 'table', component: TableBoard, props: true, beforeEnter: guardMyroute },
  { path: '/gantt/:spaceId/:spaceName/:id', name: 'gantt', component: GanttBoard, props: true, beforeEnter: guardMyroute },

  { path: '/spaces', name: 'spaces', component: Spaces, props: true, beforeEnter: guardMyroute },
  { path: '/projects/:id/:spaceName', name: 'projects', component: Projects, props: true, beforeEnter: guardMyroute },
  { path: '/documents', name: 'documents', component: Documents, props: true, beforeEnter: guardMyroute },
  { path: '/docarchive', name: 'docarchive', component: DocumentsArchive, props: true, beforeEnter: guardMyroute },

  { path: '/profile', name: 'profile', component: UserProfile, props: true, beforeEnter: guardMyroute },
  { path: '/login', name: 'login', component: Login, props: true },
  { path: '/register', name: 'register', component: Register, props: true },
  { path: '/dashboard', name: 'dashboard', component: Dashboard, props: true, beforeEnter: guardMyroute },
  { path: '/teams', name: 'teams', component: Teams, props: true, beforeEnter: guardMyroute },
  { path: '/team/:id/:team', name: 'team', component: SingleTeam, props: true, beforeEnter: guardMyroute },
]

const router = new VueRouter({
  routes,
})

const el = document.getElementById('app')

new Vue({
  vuetify: new Vuetify({

    theme: {
      options: { customProperties: true },
      themes: {
        light: {
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
        },
      },
    },

  }),
  store: store,
  router: router
  ,
  render: h => h(App, {
    props: {
      initialPage: JSON.parse(el.dataset.page),
      resolveComponent: name => require(`./Pages/${name}`).default,
    },
  }),
}).$mount(el)
