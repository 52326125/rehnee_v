<template>
  <v-app>
    <v-app-bar app :dark="isDark">
      <v-toolbar-title class="headline text-uppercase">

        <v-card class="mx-auto" hover @click="backHome">
          <v-card-title>Rehnee醫資平台</v-card-title>
        </v-card>

      </v-toolbar-title>

      <v-spacer/>
      <div class="appbarRight">
        <v-select
          v-if="systemSelect"
          v-model="select"
          :items="system"
          item-text="name"
          item-value="value"
          label="選擇系統"
          @change="setLoadSystem(select)"

          outlined
        ></v-select>
      </div>
      <!--<v-btn text v-if="isLogin" @click.stop="open">
        <v-icon>mdi-menu</v-icon>
      </v-btn>-->
      <v-menu offset-y :close-on-content-click="false" v-if="isLogin">
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
          <v-btn @click="logout" width="100%">登出</v-btn>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-sheet :dark="isDark" class="fill-height">
        <v-container class="fill-height bg" fluid :dark="isDark">
          <v-row align="center" justify="center">
            <router-view/>
          </v-row>
        </v-container>
      </v-sheet>
      <chat v-if="test"/>
    </v-content>
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
      { name: '醫囑系統', value: false },
      { name: '病患資訊系統', value: true }
    ],
    select: false

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
    }),
    systemSelect () {
      if (this.user.role == 0 && this.isLogin) return true
      return false
    },
    test () {
      if (this.user.name == '個案師' && this.isLogin == true) return true
      return false
    }
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
    font-size: 20px !important;
  }
  th{
    font-size: 24px !important;
  }
  .bg{
    background-image: url("./assets/Rehnee.png");
    background-size: 30%;
    background-position: 5% 50%;
  }
</style>
