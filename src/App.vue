<template>
  <v-app>
    <v-app-bar app>      
      <v-toolbar-title class="headline text-uppercase">
        <span>Rehnee_v</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        v-if="isLogin"
        @click.stop="drawer = !drawer"
      >
        <v-icon>
          mdi-menu
        </v-icon>
      </v-btn>
    </v-app-bar>    
    <v-content>
      <v-sheet
      height="100%"
      class="overflow-hidden"
    >
      <v-container class="fill-height">
        <v-row
          align="center"
          justify="center"
        >
        <router-view/>
        </v-row>
      </v-container>
  
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        right
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="dr_pic"></v-img>
          </v-list-item-avatar>
  
          <v-list-item-content>
            <v-list-item-title>{{dr_name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
  
        <v-divider></v-divider>
  
        <v-list dense>
  
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    publicPath: process.env.BASE_URL,
    drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
      ],
  }),

  computed:{
    isLogin () {
      return (this.$cookies.get('isLogin')) && true 
    },
    dr_name () {
      return this.$store.getters.getName
    },
    dr_pic () {
      return this.$store.getters.getPic
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
