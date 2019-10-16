<template>
  <!-- <a href="https://pngtree.com/free-backgrounds">free background photos from pngtree.com</a>-->
  <v-app>
    <v-app-bar app :dark="isDark">
      <v-toolbar-title class="headline text-uppercase">

        <v-card class="mx-auto" hover @click="backHome">
          <v-card-title>Rehnee_v2-{{title}}</v-card-title>
        </v-card>

      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text v-if="isLogin" @click.stop="open">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-sheet height="100%" class="overflow-hidden" :dark="isDark">
        <v-container class="fill-height background" fluid>
          <v-row align="center" justify="center">
            <router-view />
          </v-row>
        </v-container>

        <v-navigation-drawer :dark="isDark" v-model="drawer" absolute temporary right>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="user.pic"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{user.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
          <v-card-title>Chat</v-card-title>
          <v-list-item v-for="(item,index) in chatList" :key="index">
            <v-list-item-avatar>
              <v-img :src="item.profi"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.content" @click="chat(item)"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-switch v-model="dark" :label="`dark mode`"></v-switch>
          <v-btn @click="logout" width="100%">logout</v-btn>
        </v-navigation-drawer>
      </v-sheet>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'App',
  data: () => ({
    drawer: null,
    dark: true
  }),
  created: function () {
    this.dark = this.isDark
  },
  mounted: function () {
    // this.$store.dispatch("getChatList");
    // this.$forceUpdate();
  },
  watch: {
    dark: {
      handler (newVal, oldVal) {
        this.$store.dispatch('setDark', newVal)
      }
    }
  },
  computed: {
    ...mapState({
      // dr_name: state => state.user.name
      user: state => state.user,
      isDark: state => state.isDark,
      chatList: state => state.chatList,
      isLogin: state => state.isLogin,
      title: state => state.title
    })

    /* isLogin() {
      return this.$store.getters.getCookie
    },
    dr_name() {
      return this.$store.getters.getName;
    },
    dr_pic() {
      return this.$store.getters.getPic;
    },
    isDark() {
      return this.$store.getters.getDark;
    },
    chatList() {
      return this.$store.getters.getChatList;
    } */
  },

  methods: {
    ...mapActions([
      'getPatientFromChat',
      'logout',
      'setDark',
      'getChatList'
    ]),
    open: async function () {
      await this.getChatList()
      this.drawer = !this.drawer
    },
    chat: function (item) {
      console.log(item)
      this.getPatientFromChat(item)
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
  .background{
    background-image:url("../public/background.png");
    background-size:contain;
    background-position:center;
  }
</style>