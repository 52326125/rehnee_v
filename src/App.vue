<template>
  <!-- <a href="https://pngtree.com/free-backgrounds">free background photos from pngtree.com</a>-->
  <v-app>
    <v-app-bar app :dark="isDark">
      <v-toolbar-title class="headline text-uppercase">
        <span @click="backHome">Rehnee_v2</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text v-if="isLogin" @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-sheet height="100%" class="overflow-hidden" :dark="isDark">
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <router-view />
          </v-row>
        </v-container>

        <v-navigation-drawer :dark="isDark" v-model="drawer" absolute temporary right>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="dr_pic"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{dr_name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="(item,index) in "
          >
            
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
export default {
  name: "App",
  data: () => ({
    publicPath: process.env.BASE_URL,
    drawer: null,
    dark: true,
    items: [
      { title: "Home", icon: "dashboard" },
      { title: "About", icon: "question_answer" }
    ]
  }),
  created: function() {
    this.dark = this.isDark;
  },
  watch: {
    dark: {
      handler(newVal, oldVal) {
        this.$store.dispatch("setDark", newVal);
      }
    }
  },
  computed: {
    isLogin() {
      return this.$cookies.get("isLogin") && true;
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
      return this.$store.getters.getChatList
    }
  },

  methods: {
    backHome: function() {
      this.$router.push("/");
    },
    logout: function() {
      this.$store.dispatch("logout");
    },
    chageMode: function() {
      this.$store.dispatch("setDark", !isDark);
    },
    test: function() {
      axios
        .get("/api/test", { params: { id: 5 } })
        .then(function(res) {
          console.log(res.data);
        })
        .catch(function(error) {
          console.log("eroo");
        });
    },
    set: function() {
      //this.$cookies.set('test','content',1)
      this.$router.push("/");
    },
    get: function() {
      this.$cookies.get("test");
    }
  }
};
</script>
