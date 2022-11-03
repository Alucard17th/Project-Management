<template>
  <div class="container full-cont container--fluid">
    <div id="gantt_here" style='width:100%; height:100%;'></div>
  </div>
</template>
 
<script>
import Gantt from './gantt.vue';
 
export default {
  name: 'app',
  components: {Gantt},
  data () {
    return {
      tasks: {
        data: [
         
        ],
        links: [
         {id: 1, source: 1, target: 2, type: '0'}
        ]
      },
      ganttId : ''
    }
  },
  created() {
  
  },
  watch: {
    '$route.params.id': function (id) {
      gantt.refresh("gantt_here");
    }
  },
  mounted() {
    gantt.clearAll();
    gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

    // gantt.config.autofit = true;
    // gantt.config.grid_width = 500;

    // gantt.config.autosize = "xy";
    // gantt.config.autosize_min_width = 800;
    gantt.config.layout = {
  css: "gantt_container",
  cols:[
    {
      rows:[
        {
          view: "grid",  
          scrollable:true,
          scrollX:"scrollHor1", 
          scrollY:"scrollVer"
        },
        {
          view: "scrollbar", 
          id:"scrollHor1",
          scroll:'x',
          group:'hor'
        },
      ]
    },
    {resizer: true, width: 1},
    {
      rows:[
        {
    	  view: "timeline", 
    	  scrollX:"scrollHor", 
    	  scrollY:"scrollVer"
    	},
    	{
    	  view: "scrollbar", 
    	  id:"scrollHor",
    	  scroll:'x',
    	  group:'hor'
    	},
  	  ]
	},
  	{
  	  view: "scrollbar", 
  	  id:"scrollVer"
	}
  ]    
}

    gantt.init("gantt_here");
    gantt.load("/api/ganttdata/" + this.$route.params.id);
  },

  computed: {

  }
}
</script>

<style>
  .container {
    height: 100%;
    width: 100%;
  }
  .left-container {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
</style>