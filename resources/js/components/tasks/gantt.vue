<template>
  <div ref="gantt"></div>
</template>
 
<script>
import {gantt} from 'dhtmlx-gantt';
export default {
  name: 'gantt',
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    }
  },
 
  mounted: function () {
    gantt.config.xml_date = "%Y-%m-%d";
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
    gantt.init(this.$refs.gantt);
    gantt.parse(this.$props.tasks);
  }
}
</script>
 
<style>
    @import "~dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css";
</style>