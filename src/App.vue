<template>
  <v-app>
    <v-app-bar app :dark="isDark">
      <v-toolbar-title class="headline text-uppercase">

        <v-card class="mx-auto" hover @click="backHome">
          <v-card-title>Rehnee_v3</v-card-title>
        </v-card>

      </v-toolbar-title>

      <v-spacer/>
      <div class="appbarRight">
        <v-select
          v-if="isLogin"
          v-model="select"
          :items="system"
          item-text="name"
          item-value="value"
          label="System select"
          :change="setLoadSystem(select)"
          outlined
        ></v-select>
      </div>
      <!--<v-btn text v-if="isLogin" @click.stop="open">
        <v-icon>mdi-menu</v-icon>
      </v-btn>-->
      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{on}">
          <v-btn text v-if="isLogin" v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list width="250" max-width="100%" :dark="isDark">
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="user.pic"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{user.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-divider></v-divider>

          <v-switch v-model="dark" :label="`dark mode`"></v-switch>
          <v-btn @click="logout" width="100%">logout</v-btn>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-sheet height="100%" class="overflow-hidden" :dark="isDark">
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <router-view/>
          </v-row>
        </v-container>
      </v-sheet>
      <chat v-if="isLogin"/>
    </v-content>
    <!--<v-footer absolute fixed><chat/></v-footer>-->
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import chat from './components/chat'
export default {
  name: 'App',
  components: {
    chat
  },
  data: () => ({
    drawer: null,
    dark: true,
    system: [
      {name: 'Medical System', value: false},
      {name: 'Rehnee System', value: true}
    ],
    select: false,
    
  }),
  created: function () {
    this.dark = this.isDark
  },
  watch: {
    dark: {
      handler (newVal, oldVal) {
        this.setDark(newVal)
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      isDark: state => state.isDark,
      chatList: state => state.chatList,
      isLogin: state => state.isLogin,
      title: state => state.title
    })

  },

  methods: {
    ...mapActions([
      'logout',
      'setDark',
      'setLoadSystem'
    ]),
    open: function () {
      this.drawer = !this.drawer
    },
    backHome: function () {
      this.$router.push('/')
    },
    logout: function () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
<style>
  .appbarRight{
    width: 300px;
    height: 100%;
  }
  td{
    font-size: 16px !important;
  }
  th{
    font-size: 20px !important;
  }
</style>