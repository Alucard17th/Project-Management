
<template>
  <div>
    <v-text-field
      :items="entries"
     v-on:keyup.enter="searchTerms"
      
    ></v-text-field>

    <!-- <v-autocomplete
      v-model="newTag"
      :items="entries"
      :search-input.sync="searchInput"
    ></v-autocomplete> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      newTag: '',
      entries: [],
      queryTerm: '',
      oldSearchQuery: '',
      searchInput: null
    };
  },
  created() {
  
  },
  computed: {
  
  },
  methods: {
    searchTerms(val){
      if(val.target.value === '' && this.oldSearchQuery === ''){

        alert("Please enter a valid value !")

      }else if(val.target.value === '' && this.oldSearchQuery){

        this.$store.commit("SET_SEARCH_QUERY", val.target.value);
        this.$store.dispatch('searchByTerms', {query:val.target.value, checker: false});

      }else if(val.target.value === this.oldSearchQuery) {

        alert("Useless Search, already in Screen !")   

      }else{

        this.$store.commit("SET_SEARCH_QUERY", val.target.value);
        this.$store.dispatch('searchByTerms', {query:val.target.value, checker: true});

      }
      this.oldSearchQuery = val.target.value 
    }
  },
  watch: {
     searchInput(val){
        this.entries =  this.searchTerms(val)
    } 
  }
};
</script>
    