<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
        <v-btn @click="test">test</v-btn>
        <v-btn @click="set">tests</v-btn>
        <v-btn @click="get">testg</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>    
    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    //
  }),
  methods:{
    test:function(){
      axios.get('/api/test',{params:{id:5}}).then(function(res){
        console.log(res.data)
      }).catch(function(error){
        console.log('eroo')
      })
    },
    set:function(){
      this.$cookies.set('test','content',1)
    },
    get:function(){
      this.$cookies.get('test')      
    }
  }
};
</script>
