<template>
  <v-app>
    <v-app-bar app>      
      <v-toolbar-title class="headline text-uppercase">
        <span>Rehnee_v</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        v-if="isLogin"
      >
        <v-icon>
          mdi-menu
        </v-icon>
      </v-btn>
      <v-btn @click="set">testp</v-btn>
    </v-app-bar>    
    <v-content>
      <router-view/>
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

  computed:{
    isLogin () {
      return this.$cookies.get('isLogin')
    }
  },

  methods:{
    test:function(){
      axios.get('/api/test',{params:{id:5}}).then(function(res){
        console.log(res.data)
      }).catch(function(error){
        console.log('eroo')
      })
    },
    set:function(){
      //this.$cookies.set('test','content',1)
      this.$router.push('/')
    },
    get:function(){
      this.$cookies.get('test')      
    }
  }
};
</script>
