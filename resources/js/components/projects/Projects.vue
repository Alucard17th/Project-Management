<template>
    <div>
        <h1>All Projects</h1>
            <v-col v-for="element in allProjects" :key="element.id" class="item">
                <v-card class="pa-2" tile outlined>
                    <h2> {{ element.name }} </h2>
                <li v-for="stage in element.stages" :key="stage.id"> {{ stage.name }}
                <h4 v-for="task in stage.task" :key="task.id">{{ task.name }}</h4>    
                </li>
                </v-card>
            </v-col>
    </div>
    
</template>

<script>
    
    import Vuex from 'vuex'
    global.v = Vuex
    export default {
        components: {
         
        },
        // data() {
        //     return {
        //         todos:[],
        //     }
        // },
        computed:{
            ...Vuex.mapGetters(['allProjects']),
            ...Vuex.mapActions(['addTask']),
        },
        mounted() {
            this.$store.dispatch("getProjects");
        },
    }
</script>
