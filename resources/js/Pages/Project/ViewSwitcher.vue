<template>
  <div class="d-flex align-center justify-space-between">
    <!-- <v-tabs v-model="activeTab">
        <v-tab v-for="tab in tabs" :key="tab.id" :to="tab.route"><v-icon>{{tab.icon}}</v-icon></v-tab>
        <v-tabs-items v-model="activeTab" @change="updateRouter($event)">
            <v-tab-item v-for="tab in tabs" :key="tab.id" :to="{name : 'tab.route'}">
            </v-tab-item>
        </v-tabs-items>
    </v-tabs> -->

    <!-- <v-tabs grow v-model="active_tab">
     <v-tab v-for="tab of tabs" :key="tab.id" :to="tab.route" v-model="active_tab">
       {{tab.name}}
     </v-tab>
   </v-tabs> -->
  
    <v-tabs color="succes" grow @change="updateRouter($event)">
      <v-tab v-for="tab of tabs" :key="tab.id" :to="tab.route" exact :class="{activeTchab: activeTchab == tab.name}" class="d-block"> 
          <v-icon color="#fff" style="background-color:rgb(73, 217, 160);border-radius:50%;">{{ tab.icon }}</v-icon>
          <v-list-item class="switcher-text">{{tab.name}}</v-list-item>
        <!-- <v-tab-item v-for="tab of tabs" :key="tab.id" :value="tab.route">
        </v-tab-item> -->
      </v-tab>
    </v-tabs>

    <!-- <v-btn><v-icon color="#fff" style="background-color:rgb(73, 217, 160);border-radius:50%;">mdi-plus</v-icon></v-btn> -->
  
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      activeTab: "/"+this.$route.name+"/"+this.$route.params.spaceId+"/"+this.$route.params.spaceName+"/"+this.$route.params.id,
      tabs: [
        { id: 1, name: "kanban", route: "/kanban/"+this.$route.params.spaceId+"/"+this.$route.params.spaceName+"/"+this.$route.params.id, icon: "mdi-reorder-vertical"},
        { id: 2, name: "table", route: "/table/"+this.$route.params.spaceId+"/"+this.$route.params.spaceName+"/"+this.$route.params.id, icon: "mdi-table" },
        { id: 3, name: 'gantt', route: "/gantt/"+this.$route.params.spaceId+"/"+this.$route.params.spaceName+"/"+this.$route.params.id, icon: "mdi-chart-gantt" }
      ]
    };
  },
//   data() {
//       return {active_tab: false,
//             tabs: [
//             { id: 1, name: 'kanban', route: "/kanban/"+this.$route.params.spaceId+"/"+this.$route.params.spaceName+"/"+this.$route.params.id, icon: "mdi-reorder-vertical"},
//             { id: 2, name: 'table', route: "/table/"+this.$route.params.spaceId+"/"+this.$route.params.spaceName+"/"+this.$route.params.id, icon: "mdi-table" },
//             { id: 3, name: 'gantt', route: "/gantt/"+this.$route.params.spaceId+"/"+this.$route.params.spaceName+"/"+this.$route.params.id, icon: "mdi-chart-gantt" }
//           ]}},
  created() {
    // alert(this.$route.params)
    console.log(this.$route);
  },
  computed: {
      activeTchab: function () {
          if(this.$route.name === 'kanban'){
            return  'kanban';
          }
          if(this.$route.name === 'table'){
            return  'table';
          }
          if(this.$route.name === 'gantt'){
            return  'gantt';
          }
    },
  },
  mounted(){
    this.$store.dispatch("getCurrentUser");
  },
  methods: {
    updateRouter(val) {
      // this.$router.push(val);
    },
  },
  watch: {
    '$route.params.id': function (id) {
      this.tabs = [
        { id: 1, name: "kanban", route: "/kanban/"+this.$route.params.spaceId+"/"+this.$route.params.spaceName+"/"+this.$route.params.id, icon: "mdi-reorder-vertical"},
        { id: 2, name: "table", route: "/table/"+this.$route.params.spaceId+"/"+this.$route.params.spaceName+"/"+this.$route.params.id, icon: "mdi-table" },
        { id: 3, name: 'gantt', route: "/gantt/"+this.$route.params.spaceId+"/"+this.$route.params.spaceName+"/"+this.$route.params.id, icon: "mdi-chart-gantt" }
      ]
    }
  },
};
</script>
<style lang="scss">

@import '../../../sass/_variables.scss';
@import '~vuetify/src/styles/styles.sass';

$tabs-item-padding: 3px;
.activeTchab{
    background-color:$lantern;
    // color:white !important;
    // border-radius:50%;
}

.v-tabs-slider-wrapper {
    display: none;
}
.switcher-text{
  margin-top:-12px;
  padding:0px 0px;
  justify-content: center;
}
</style>